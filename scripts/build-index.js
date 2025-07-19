import fs from 'fs';
import path from 'path';

// JSONファイルからメタデータを読み込み
function loadSlideMetadata() {
    try {
        const metadataPath = path.join(process.cwd(), 'scripts', 'slide-metadata.json');
        const rawData = fs.readFileSync(metadataPath, 'utf8');
        const metadata = JSON.parse(rawData);
        
        console.log(`📚 Loaded ${metadata.slides.length} slides from metadata file`);
        return metadata;
    } catch (error) {
        console.error('❌ Error loading slide metadata:', error.message);
        return {
            slides: [],
            tagCategories: {},
            metadata: { version: "1.0.0", lastUpdated: new Date().toISOString(), totalSlides: 0 }
        };
    }
}

const slideData = loadSlideMetadata();
const slideMetadata = slideData.slides;
const tagCategories = slideData.tagCategories;

function extractAllTags(slides = slideMetadata) {
    const allTags = new Set();
    slides.forEach(slide => {
        slide.tags.forEach(tag => allTags.add(tag));
    });
    return Array.from(allTags).sort();
}

function generateSearchUI() {
    const allTags = extractAllTags(slideMetadata);
    return `
    <section class="mb-8">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="max-w-4xl mx-auto">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-lg font-semibold text-gray-800">🔍 検索・フィルタ</h2>
                </div>
                <div class="mb-6">
                    <div class="relative">
                        <input type="text" id="searchInput" placeholder="タグ、タイトル、内容で検索..."
                            class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"/>
                        <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                </div>
                <div class="mb-4">
                    <div class="flex flex-wrap gap-2 mb-3" id="tagContainer">
                        <button class="tag-filter-btn active px-4 py-2 rounded-full text-sm font-medium transition-colors border" data-tag="all">
                            すべて (${slideMetadata.length})
                        </button>
                        ${allTags.map(tag => {
                            const count = slideMetadata.filter(slide => slide.tags.includes(tag)).length;
                            return `<button class="tag-filter-btn px-3 py-1 rounded-full text-xs font-medium transition-colors border" data-tag="${tag}">${tag} (${count})</button>`;
                        }).join('')}
                    </div>
                </div>
                <div id="searchResults" class="text-sm text-gray-600 flex items-center justify-between">
                    <span><span id="resultCount">${slideMetadata.length}</span> 件のプレゼンテーションが見つかりました</span>
                    <button id="clearFilters" class="text-blue-600 hover:text-blue-800 font-medium" style="display: none;">フィルタをクリア</button>
                </div>
            </div>
        </div>
    </section>`;
}

// 編集可能なタグ付きスライドカード
function generateSlideCard(slide) {
    return `
    <div class="slide-card bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden" 
         data-slide-name="${slide.name}" data-tags="${slide.tags.join(',')}" data-title="${slide.title}" data-description="${slide.description}">
        <a href="/${slide.name}/" class="block">
            <div class="h-48 relative overflow-hidden bg-gray-100 cursor-pointer">
                <img src="/previews/${slide.name}.png" alt="${slide.title} - Preview"
                    class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"/>
                <div class="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center" style="display: none;">
                    <div class="text-center text-white">
                        <div class="text-4xl mb-2">🎯</div>
                        <div class="text-lg font-semibold px-4">${slide.title}</div>
                    </div>
                </div>
                <div class="absolute top-4 right-4 bg-white bg-opacity-90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    ${new Date(slide.date).toLocaleDateString('ja-JP')}
                </div>
            </div>
        </a>
        <div class="p-6">
            <h3 class="text-xl font-bold text-gray-800 mb-3">${slide.title}</h3>
            <p class="text-gray-600 mb-4 line-clamp-3">${slide.description}</p>
            <div class="mb-4">
                <div class="flex flex-wrap gap-2" id="tagContainer-${slide.name}">
                    ${slide.tags.map(tag => `
                        <span class="editable-tag inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full cursor-pointer hover:bg-red-100 hover:text-red-800 transition-colors group" 
                              data-slide="${slide.name}" data-tag="${tag}" title="クリックして削除">
                            ${tag}
                            <span class="text-blue-600 group-hover:text-red-600 ml-1 opacity-0 group-hover:opacity-100 transition-opacity">×</span>
                        </span>
                    `).join('')}
                    <button class="add-tag-btn px-3 py-1 border border-dashed border-gray-400 text-gray-600 rounded-full text-xs font-medium hover:bg-gray-50 hover:border-blue-400 hover:text-blue-600 transition-colors"
                            data-slide="${slide.name}" title="タグを追加">+ タグ追加</button>
                </div>
            </div>
            <div class="flex gap-3">
                <a href="/${slide.name}/" class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-center hover:bg-blue-700 transition-colors">スライドを見る</a>
                <a href="/${slide.name}/presenter/" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors" title="発表者モード">🎤</a>
                <a href="/${slide.name}/overview/" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors" title="概要モード">📋</a>
            </div>
        </div>
    </div>`;
}

function generateTagManagementScript() {
    return `
    <script>
        let slidesData = ${JSON.stringify(slideMetadata)};
        let currentFilter = { tags: [], searchText: '' };

        document.addEventListener('DOMContentLoaded', () => {
            setupEventListeners();
            updateTagButtons();
        });

        function setupEventListeners() {
            document.getElementById('searchInput').addEventListener('input', (e) => {
                currentFilter.searchText = e.target.value;
                applyFilters();
            });

            document.querySelectorAll('.tag-filter-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const tag = e.target.dataset.tag;
                    if (tag === 'all') {
                        currentFilter.tags = [];
                    } else {
                        if (currentFilter.tags.includes(tag)) {
                            currentFilter.tags = currentFilter.tags.filter(t => t !== tag);
                        } else {
                            currentFilter.tags.push(tag);
                            currentFilter.tags = currentFilter.tags.filter(t => t !== 'all');
                        }
                    }
                    updateTagButtons();
                    applyFilters();
                });
            });

            document.getElementById('clearFilters').addEventListener('click', () => {
                currentFilter = { tags: [], searchText: '' };
                document.getElementById('searchInput').value = '';
                updateTagButtons();
                applyFilters();
            });

            // タグ編集イベント
            document.addEventListener('click', async (e) => {
                if (e.target.closest('.editable-tag')) {
                    e.preventDefault();
                    const tagElement = e.target.closest('.editable-tag');
                    const slideName = tagElement.dataset.slide;
                    const tagName = tagElement.dataset.tag;
                    if (confirm(\`"\${tagName}" タグを削除しますか？\`)) {
                        removeTagFromSlide(slideName, tagName);
                    }
                }
                if (e.target.closest('.add-tag-btn')) {
                    e.preventDefault();
                    const button = e.target.closest('.add-tag-btn');
                    const slideName = button.dataset.slide;
                    showAddTagModal(slideName);
                }
            });
        }

        function removeTagFromSlide(slideName, tagName) {
            const slide = slidesData.find(s => s.name === slideName);
            if (slide) {
                slide.tags = slide.tags.filter(t => t !== tagName);
                updateSlideTagsUI(slideName);
                showMessage(\`"\${tagName}" を削除しました\`, 'success');
            }
        }

        function showAddTagModal(slideName) {
            const slide = slidesData.find(s => s.name === slideName);
            if (!slide) return;

            const newTag = prompt(\`"\${slide.title}" に追加するタグを入力してください:\`);
            
            if (newTag && newTag.trim()) {
                const tagName = newTag.trim();
                if (!slide.tags.includes(tagName)) {
                    addTagToSlide(slideName, tagName);
                } else {
                    alert('そのタグは既に追加されています。');
                }
            }
        }

        function addTagToSlide(slideName, tagName) {
            const slide = slidesData.find(s => s.name === slideName);
            if (slide && !slide.tags.includes(tagName)) {
                slide.tags.push(tagName);
                updateSlideTagsUI(slideName);
                showMessage(\`"\${tagName}" を追加しました\`, 'success');
            }
        }

        function updateSlideTagsUI(slideName) {
            const slide = slidesData.find(s => s.name === slideName);
            if (!slide) return;

            const container = document.getElementById(\`tagContainer-\${slideName}\`);
            if (!container) return;

            container.innerHTML = \`
                \${slide.tags.map(tag => \`
                    <span class="editable-tag inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full cursor-pointer hover:bg-red-100 hover:text-red-800 transition-colors group" 
                          data-slide="\${slideName}" data-tag="\${tag}" title="クリックして削除">
                        \${tag}
                        <span class="text-blue-600 group-hover:text-red-600 ml-1 opacity-0 group-hover:opacity-100 transition-opacity">×</span>
                    </span>
                \`).join('')}
                <button class="add-tag-btn px-3 py-1 border border-dashed border-gray-400 text-gray-600 rounded-full text-xs font-medium hover:bg-gray-50 hover:border-blue-400 hover:text-blue-600 transition-colors"
                        data-slide="\${slideName}" title="タグを追加">+ タグ追加</button>
            \`;

            const card = document.querySelector(\`[data-slide-name="\${slideName}"]\`);
            if (card) {
                card.dataset.tags = slide.tags.join(',');
            }
        }

        function applyFilters() {
            let visibleCount = 0;
            document.querySelectorAll('.slide-card').forEach(card => {
                const cardTags = card.dataset.tags.split(',');
                const cardTitle = card.dataset.title.toLowerCase();
                const cardDescription = card.dataset.description.toLowerCase();
                const searchText = currentFilter.searchText.toLowerCase();
                
                const tagMatch = currentFilter.tags.length === 0 || currentFilter.tags.includes('all') ||
                                currentFilter.tags.some(filterTag => cardTags.includes(filterTag));
                const textMatch = !searchText || cardTags.some(tag => tag.toLowerCase().includes(searchText)) ||
                                 cardTitle.includes(searchText) || cardDescription.includes(searchText);
                
                if (tagMatch && textMatch) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            document.getElementById('resultCount').textContent = visibleCount;
            const hasFilters = currentFilter.tags.length > 0 || currentFilter.searchText;
            document.getElementById('clearFilters').style.display = hasFilters ? 'inline-block' : 'none';
        }
        
        function updateTagButtons() {
            document.querySelectorAll('.tag-filter-btn').forEach(btn => {
                const tag = btn.dataset.tag;
                if (currentFilter.tags.includes(tag) || (currentFilter.tags.length === 0 && tag === 'all')) {
                    btn.classList.add('active', 'border-blue-500', 'bg-blue-500', 'text-white');
                    btn.classList.remove('border-gray-300', 'text-gray-700');
                } else {
                    btn.classList.remove('active', 'border-blue-500', 'bg-blue-500', 'text-white');
                    btn.classList.add('border-gray-300', 'text-gray-700');
                }
            });
        }

        function showMessage(message, type = 'info') {
            const colors = { 
                success: 'bg-green-500 text-white', 
                error: 'bg-red-500 text-white', 
                warning: 'bg-yellow-500 text-white', 
                info: 'bg-blue-500 text-white' 
            };
            const messageDiv = document.createElement('div');
            messageDiv.className = \`fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg z-50 \${colors[type]}\`;
            messageDiv.textContent = message;
            document.body.appendChild(messageDiv);
            setTimeout(() => messageDiv.remove(), 3000);
        }
    </script>`;
}

const htmlTemplate = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Slidev Presentations</title>
    <meta name="description" content="複数のSlidevプレゼンテーションを1つのリポジトリで管理するシステム">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        .slide-card { transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease; }
        .slide-card:hover { transform: translateY(-4px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
        .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .tag-filter-btn.active { background-color: #3b82f6; border-color: #3b82f6; color: white; }
        .tag-filter-btn { border-color: #d1d5db; color: #374151; }
        .tag-filter-btn:hover:not(.active) { background-color: #f9fafb; }
        .editable-tag:hover { transform: scale(1.05); }
    </style>
</head>
<body class="bg-gray-50 min-h-screen">
    <header class="gradient-bg text-white shadow-lg">
        <div class="max-w-6xl mx-auto px-4 py-8">
            <div class="text-center">
                <h1 class="text-4xl md:text-5xl font-bold mb-4">🎪 My Slidev Presentations</h1>
                <p class="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">複数のSlidevプレゼンテーションを1つのリポジトリで管理するシステム</p>
                <p class="text-sm text-blue-200 mt-2">💡 各スライドのタグをクリックして編集できます</p>
                <div class="mt-6">
                    <a href="https://github.com/wwlapaki310/my-slidev-presentations" class="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2" target="_blank">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"></path></svg>
                        GitHub Repository
                    </a>
                </div>
            </div>
        </div>
    </header>

    <main class="max-w-6xl mx-auto px-4 py-12">
        <section class="mb-12">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3"><span class="text-2xl">🏗️</span>システム概要</h2>
                <div class="grid md:grid-cols-3 gap-6">
                    <div class="text-center"><div class="text-4xl mb-3">📊</div><h3 class="font-semibold text-gray-800 mb-2">統一管理</h3><p class="text-gray-600 text-sm">1つのリポジトリで複数プレゼンテーション管理</p></div>
                    <div class="text-center"><div class="text-4xl mb-3">🚀</div><h3 class="font-semibold text-gray-800 mb-2">自動デプロイ</h3><p class="text-gray-600 text-sm">Vercelでの一括デプロイメント</p></div>
                    <div class="text-center"><div class="text-4xl mb-3">🔄</div><h3 class="font-semibold text-gray-800 mb-2">効率開発</h3><p class="text-gray-600 text-sm">pnpm workspaceによる効率的管理</p></div>
                </div>
            </div>
        </section>

        ${generateSearchUI()}

        <section id="slidesSection">
            <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">📚 Available Presentations</h2>
            <div class="grid md:grid-cols-2 gap-8" id="slidesContainer">
                ${slideMetadata.map(generateSlideCard).join('')}
            </div>
        </section>

        <section class="mt-16">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">⚙️ 技術スタック</h2>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div><div class="text-3xl mb-2">🎪</div><div class="font-semibold text-gray-800">Slidev</div><div class="text-sm text-gray-600">52.0.0</div></div>
                    <div><div class="text-3xl mb-2">⚡</div><div class="font-semibold text-gray-800">Vue.js</div><div class="text-sm text-gray-600">3.4+</div></div>
                    <div><div class="text-3xl mb-2">🌐</div><div class="font-semibold text-gray-800">Vercel</div><div class="text-sm text-gray-600">Hosting</div></div>
                    <div><div class="text-3xl mb-2">📦</div><div class="font-semibold text-gray-800">pnpm</div><div class="text-sm text-gray-600">Workspace</div></div>
                </div>
            </div>
        </section>
    </main>

    <footer class="bg-gray-800 text-white py-8 mt-16">
        <div class="max-w-6xl mx-auto px-4 text-center">
            <p class="text-gray-300">Built with ❤️ using Slidev + Vercel + pnpm workspace</p>
            <p class="text-gray-400 text-sm mt-2">© 2025 Satoru Akita. All rights reserved.</p>
            <div class="text-xs text-gray-500 mt-2">Metadata version: ${slideData.metadata.version} | Last updated: ${new Date(slideData.metadata.lastUpdated).toLocaleDateString('ja-JP')}</div>
        </div>
    </footer>

    ${generateTagManagementScript()}
</body>
</html>`;

function generateIndexPage() {
    const distDir = 'dist';
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
    }
    
    const indexPath = path.join(distDir, 'index.html');
    fs.writeFileSync(indexPath, htmlTemplate);
    
    console.log('✅ Generated index.html with simple tag editing');
    console.log(`📊 Slides included: ${slideMetadata.length}`);
    slideMetadata.forEach(slide => {
        console.log(`   - ${slide.title} (/${slide.name}/)`);
    });
}

if (import.meta.url === `file://${process.argv[1]}`) {
    generateIndexPage();
}

export { generateIndexPage, slideMetadata, tagCategories };