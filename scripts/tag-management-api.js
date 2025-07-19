/**
 * タグ管理用のGitHub API連携スクリプト
 * 
 * このスクリプトは、manage-tags.htmlから使用され、
 * タグの変更を直接GitHubリポジトリに永続化する機能を提供します。
 */

class TagPersistenceManager {
    constructor() {
        this.owner = 'wwlapaki310';
        this.repo = 'my-slidev-presentations';
        this.metadataPath = 'scripts/slide-metadata.json';
        this.currentSha = null;
        this.githubToken = null;
        
        // 環境変数またはローカルストレージからトークンを取得
        this.initializeToken();
    }

    /**
     * GitHub APIトークンを初期化
     */
    initializeToken() {
        // まずは環境変数から試行（デプロイ時）
        this.githubToken = window.GITHUB_TOKEN || null;
        
        // ローカル開発時はローカルストレージから
        if (!this.githubToken) {
            this.githubToken = localStorage.getItem('github-token');
        }
        
        // トークンが設定されていない場合は警告
        if (!this.githubToken) {
            console.warn('🔐 GitHub API token not found. Tag persistence will not work.');
            console.warn('Please set GITHUB_TOKEN environment variable or store in localStorage as "github-token"');
        }
    }

    /**
     * GitHub APIトークンを設定
     * @param {string} token - GitHub Personal Access Token
     */
    setToken(token) {
        this.githubToken = token;
        localStorage.setItem('github-token', token);
        console.log('✅ GitHub API token set successfully');
    }

    /**
     * 現在のメタデータファイルを取得
     * @returns {Promise<Object>} メタデータオブジェクト
     */
    async fetchCurrentMetadata() {
        if (!this.githubToken) {
            throw new Error('GitHub API token not configured');
        }

        try {
            const response = await fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/contents/${this.metadataPath}`, {
                headers: {
                    'Authorization': `token ${this.githubToken}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            this.currentSha = data.sha;
            
            // Base64エンコードされたコンテンツをデコード
            const content = atob(data.content);
            return JSON.parse(content);
        } catch (error) {
            console.error('❌ Failed to fetch metadata:', error);
            throw error;
        }
    }

    /**
     * メタデータをGitHubに保存
     * @param {Object} metadata - 更新されたメタデータオブジェクト
     * @param {string} commitMessage - コミットメッセージ
     * @returns {Promise<Object>} GitHub APIレスポンス
     */
    async saveMetadata(metadata, commitMessage = 'Update slide metadata via tag management') {
        if (!this.githubToken) {
            throw new Error('GitHub API token not configured');
        }

        if (!this.currentSha) {
            await this.fetchCurrentMetadata();
        }

        try {
            // メタデータに更新日時を追加
            metadata.metadata.lastUpdated = new Date().toISOString();
            metadata.metadata.totalSlides = metadata.slides.length;

            const content = JSON.stringify(metadata, null, 2);
            const encodedContent = btoa(content);

            const response = await fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/contents/${this.metadataPath}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${this.githubToken}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: commitMessage,
                    content: encodedContent,
                    sha: this.currentSha
                })
            });

            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            this.currentSha = result.content.sha;
            
            console.log('✅ Metadata saved successfully to GitHub');
            return result;
        } catch (error) {
            console.error('❌ Failed to save metadata:', error);
            throw error;
        }
    }

    /**
     * スライドにタグを追加
     * @param {string} slideName - スライド名
     * @param {string} tag - 追加するタグ
     */
    async addTagToSlide(slideName, tag) {
        try {
            const metadata = await this.fetchCurrentMetadata();
            const slide = metadata.slides.find(s => s.name === slideName);
            
            if (!slide) {
                throw new Error(`Slide '${slideName}' not found`);
            }
            
            if (!slide.tags.includes(tag)) {
                slide.tags.push(tag);
                await this.saveMetadata(metadata, `Add tag '${tag}' to slide '${slideName}'`);
                return true;
            }
            
            return false; // Tag already exists
        } catch (error) {
            console.error('❌ Failed to add tag:', error);
            throw error;
        }
    }

    /**
     * スライドからタグを削除
     * @param {string} slideName - スライド名
     * @param {string} tag - 削除するタグ
     */
    async removeTagFromSlide(slideName, tag) {
        try {
            const metadata = await this.fetchCurrentMetadata();
            const slide = metadata.slides.find(s => s.name === slideName);
            
            if (!slide) {
                throw new Error(`Slide '${slideName}' not found`);
            }
            
            const tagIndex = slide.tags.indexOf(tag);
            if (tagIndex > -1) {
                slide.tags.splice(tagIndex, 1);
                await this.saveMetadata(metadata, `Remove tag '${tag}' from slide '${slideName}'`);
                return true;
            }
            
            return false; // Tag not found
        } catch (error) {
            console.error('❌ Failed to remove tag:', error);
            throw error;
        }
    }

    /**
     * カテゴリに新しいタグを追加
     * @param {string} category - カテゴリ名
     * @param {string} tag - 追加するタグ
     */
    async addTagToCategory(category, tag) {
        try {
            const metadata = await this.fetchCurrentMetadata();
            
            if (!metadata.tagCategories[category]) {
                throw new Error(`Category '${category}' not found`);
            }
            
            if (!metadata.tagCategories[category].tags.includes(tag)) {
                metadata.tagCategories[category].tags.push(tag);
                await this.saveMetadata(metadata, `Add tag '${tag}' to category '${category}'`);
                return true;
            }
            
            return false; // Tag already exists in category
        } catch (error) {
            console.error('❌ Failed to add tag to category:', error);
            throw error;
        }
    }

    /**
     * カテゴリからタグを削除
     * @param {string} category - カテゴリ名
     * @param {string} tag - 削除するタグ
     */
    async removeTagFromCategory(category, tag) {
        try {
            const metadata = await this.fetchCurrentMetadata();
            
            if (!metadata.tagCategories[category]) {
                throw new Error(`Category '${category}' not found`);
            }
            
            const tagIndex = metadata.tagCategories[category].tags.indexOf(tag);
            if (tagIndex > -1) {
                metadata.tagCategories[category].tags.splice(tagIndex, 1);
                await this.saveMetadata(metadata, `Remove tag '${tag}' from category '${category}'`);
                return true;
            }
            
            return false; // Tag not found in category
        } catch (error) {
            console.error('❌ Failed to remove tag from category:', error);
            throw error;
        }
    }

    /**
     * メタデータ全体をバックアップ
     * @returns {Promise<Object>} バックアップデータ
     */
    async backupMetadata() {
        try {
            const metadata = await this.fetchCurrentMetadata();
            const backup = {
                ...metadata,
                backupDate: new Date().toISOString(),
                sha: this.currentSha
            };
            
            // ローカルストレージにバックアップを保存
            localStorage.setItem('metadata-backup', JSON.stringify(backup));
            console.log('✅ Metadata backed up successfully');
            
            return backup;
        } catch (error) {
            console.error('❌ Failed to backup metadata:', error);
            throw error;
        }
    }

    /**
     * バックアップからメタデータを復元
     * @param {Object} backup - バックアップデータ
     */
    async restoreFromBackup(backup) {
        try {
            const { backupDate, sha, ...metadata } = backup;
            await this.saveMetadata(metadata, `Restore metadata from backup (${backupDate})`);
            console.log('✅ Metadata restored from backup successfully');
        } catch (error) {
            console.error('❌ Failed to restore metadata:', error);
            throw error;
        }
    }

    /**
     * API接続テスト
     * @returns {Promise<boolean>} 接続成功/失敗
     */
    async testConnection() {
        try {
            if (!this.githubToken) {
                return false;
            }

            const response = await fetch(`https://api.github.com/repos/${this.owner}/${this.repo}`, {
                headers: {
                    'Authorization': `token ${this.githubToken}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            return response.ok;
        } catch (error) {
            console.error('❌ GitHub API connection test failed:', error);
            return false;
        }
    }
}

// UIヘルパー関数
class TagManagementUI {
    constructor(persistenceManager) {
        this.persistenceManager = persistenceManager;
        this.isConnected = false;
        this.init();
    }

    async init() {
        this.isConnected = await this.persistenceManager.testConnection();
        this.showConnectionStatus();
        this.setupTokenInput();
    }

    showConnectionStatus() {
        const statusHtml = this.isConnected
            ? '<div class="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm font-medium">🟢 GitHub API Connected</div>'
            : '<div class="bg-red-100 text-red-800 px-3 py-2 rounded-lg text-sm font-medium">🔴 GitHub API Disconnected</div>';
        
        // ページに接続ステータスを表示
        const header = document.querySelector('header .max-w-6xl');
        if (header && !document.getElementById('connection-status')) {
            const statusDiv = document.createElement('div');
            statusDiv.id = 'connection-status';
            statusDiv.className = 'text-center mt-4';
            statusDiv.innerHTML = statusHtml;
            header.appendChild(statusDiv);
        }
    }

    setupTokenInput() {
        if (!this.isConnected) {
            this.showTokenInputModal();
        }
    }

    showTokenInputModal() {
        const modalHtml = `
            <div id="tokenModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 p-6">
                    <h3 class="text-lg font-bold text-gray-800 mb-4">🔐 GitHub API Setup</h3>
                    <p class="text-gray-600 mb-4">
                        タグの永続化にはGitHub Personal Access Tokenが必要です。<br>
                        <a href="https://github.com/settings/tokens" target="_blank" class="text-blue-600 underline">こちら</a>でトークンを作成してください。
                    </p>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">GitHub Token</label>
                        <input 
                            type="password" 
                            id="githubToken" 
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                        />
                    </div>
                    <div class="flex gap-3">
                        <button 
                            id="saveToken" 
                            class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                            保存して接続
                        </button>
                        <button 
                            id="skipToken" 
                            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                        >
                            スキップ
                        </button>
                    </div>
                    <div class="text-xs text-gray-500 mt-3">
                        トークンはローカルストレージに保存され、外部に送信されません。
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);

        document.getElementById('saveToken').addEventListener('click', async () => {
            const token = document.getElementById('githubToken').value.trim();
            if (token) {
                this.persistenceManager.setToken(token);
                this.isConnected = await this.persistenceManager.testConnection();
                this.showConnectionStatus();
                document.getElementById('tokenModal').remove();
                
                if (this.isConnected) {
                    this.showMessage('GitHub API接続に成功しました！タグの変更が永続化されます。', 'success');
                } else {
                    this.showMessage('GitHub API接続に失敗しました。トークンを確認してください。', 'error');
                }
            }
        });

        document.getElementById('skipToken').addEventListener('click', () => {
            document.getElementById('tokenModal').remove();
            this.showMessage('GitHub API接続をスキップしました。タグ変更は一時的のみです。', 'warning');
        });
    }

    showMessage(message, type = 'info') {
        const colors = {
            success: 'bg-green-500 text-white',
            error: 'bg-red-500 text-white',
            warning: 'bg-yellow-500 text-white',
            info: 'bg-blue-500 text-white'
        };

        const messageDiv = document.createElement('div');
        messageDiv.className = `fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg z-50 ${colors[type]} fade-in`;
        messageDiv.textContent = message;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// グローバルに公開
window.TagPersistenceManager = TagPersistenceManager;
window.TagManagementUI = TagManagementUI;

// 自動初期化
document.addEventListener('DOMContentLoaded', () => {
    window.tagManager = new TagPersistenceManager();
    window.tagUI = new TagManagementUI(window.tagManager);
});
