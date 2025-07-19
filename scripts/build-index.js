import fs from 'fs';
import path from 'path';

// スライド情報の設定（直接定義に戻す）
const slideMetadata = [
  {
    name: 'sre-next-2025',
    title: 'SRE NEXT 2025 - NoCスタッフ体験記',
    description: 'SRE NEXT 2025でNoCスタッフをやった話とSRE NEXTの講演紹介',
    date: '2025-07-17',
    author: 'Satoru Akita',
    tags: ['SRE', 'NoC', 'Infrastructure', 'Conference'],
    category: 'tech-talk',
    duration: '15分',
    level: 'intermediate',
    language: 'ja'
  },
  {
    name: 'slidev-system',
    title: 'Slidev × Vercel 複数スライド管理システム',
    description: '1つのリポジトリで複数のSlidevプレゼンテーションを効率的に管理する仕組みの解説',
    date: '2025-07-18',
    author: 'Satoru Akita',
    tags: ['Slidev', 'Vercel', 'DevOps', 'Automation'],
    category: 'system-design',
    duration: '20分',
    level: 'beginner',
    language: 'ja'
  }
];

// タグカテゴリとメタデータ
const tagCategories = {
  technology: {
    name: '技術',
    tags: ['Slidev', 'Vercel', 'Vue.js', 'JavaScript', 'TypeScript', 'Node.js'],
    color: 'blue'
  },
  domain: {
    name: '分野',
    tags: ['SRE', 'DevOps', 'Infrastructure', 'Frontend', 'Backend'],
    color: 'green'
  },
  event: {
    name: 'イベント',
    tags: ['Conference', 'LT', 'Meetup', 'Workshop'],
    color: 'purple'
  },
  format: {
    name: '形式',
    tags: ['Tutorial', 'Automation', 'NoC', 'Demo'],
    color: 'orange'
  }
};

/**
 * 全タグを抽出する
 */
function extractAllTags(slides = slideMetadata) {
  const allTags = new Set();
  slides.forEach(slide => {
    slide.tags.forEach(tag => allTags.add(tag));
  });
  return Array.from(allTags).sort();
}

/**
 * 検索UIのHTMLを生成する
 */
function generateSearchUI() {
  const allTags = extractAllTags(slideMetadata);
  
  return `
    <!-- 検索・フィルタセクション -->
    <section class="mb-8">
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="max-w-4xl mx-auto">
          <!-- タグ管理へのリンク -->
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold text-gray-800">🔍 検索・フィルタ</h2>
            <a href="/manage-tags.html" 
               class="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">
              🏷️ タグ管理
            </a>
          </div>
          
          <!-- 検索ボックス -->
          <div class="mb-6">
            <div class="relative">
              <input 
                type="text" 
                id="searchInput" 
                placeholder="タグ、タイトル、内容で検索（例：SRE, Vercel, DevOps）..."
                class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
              <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
          
          <!-- タグフィルタ -->
          <div class="mb-4">
            <div class="flex flex-wrap gap-2 mb-3" id="tagContainer">
              <button class="tag-filter-btn active px-4 py-2 rounded-full text-sm font-medium transition-colors border" data-tag="all">
                すべて (${slideMetadata.length})
              </button>
              ${allTags.map(tag => {
                const count = slideMetadata.filter(slide => slide.tags.includes(tag)).length;
                return `
                  <button class="tag-filter-btn px-3 py-1 rounded-full text-xs font-medium transition-colors border" data-tag="${tag}">
                    ${tag} (${count})
                  </button>
                `;
              }).join('')}
            </div>
          </div>
          
          <!-- 検索結果表示 -->
          <div id="searchResults" class="text-sm text-gray-600 flex items-center justify-between">
            <span><span id="resultCount">${slideMetadata.length}</span> 件のプレゼンテーションが見つかりました</span>
            <button id="clearFilters" class="text-blue-600 hover:text-blue-800 font-medium" style="display: none;">フィルタをクリア</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

/**
 * スライドカードのHTMLを生成する
 */
function generateSlideCard(slide) {
  return `
    <div class="slide-card bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden" 
         data-tags="${slide.tags.join(',')}" 
         data-title="${slide.title}" 
         data-description="${slide.description}">
      
      <a href="/${slide.name}/" class="block">
        <div class="h-48 relative overflow-hidden bg-gray-100 cursor-pointer">
          <img 
            src="/previews/${slide.name}.png" 
            alt="${slide.title} - Preview"
            class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
          />
          
          <div class="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center" style="display: none;">
            <div class="text-center text-white">
              <div class="text-4xl mb-2">🎯</div>
              <div class="text-lg font-semibold px-4">${slide.title}</div>
            </div>
          </div>
          
          <div class="absolute top-4 right-4 bg-white bg-opacity-90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
            ${new Date(slide.date).toLocaleDateString('ja-JP')}
          </div>
          
          <div class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
            <div class="text-white text-center">
              <svg class="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path>
              </svg>
              <div class="text-sm font-medium">スライドを見る</div>
            </div>
          </div>
        </div>
      </a>
      
      <div class="p-6">
        <h3 class="text-xl font-bold text-gray-800 mb-3">${slide.title}</h3>
        <p class="text-gray-600 mb-4 line-clamp-3">${slide.description}</p>
        
        <div class="flex flex-wrap gap-2 mb-4">
          ${slide.tags.map(tag => `
            <span class="slide-tag px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full cursor-pointer hover:bg-blue-200 transition-colors" data-tag="${tag}">
              ${tag}
            </span>
          `).join('')}
        </div>
        
        <div class="flex gap-3">
          <a href="/${slide.name}/" class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-center hover:bg-blue-700 transition-colors">
            スライドを見る
          </a>
          <a href="/${slide.name}/presenter/" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors" title="発表者モード">
            🎤
          </a>
          <a href="/${slide.name}/overview/" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors" title="概要モード">
            📋
          </a>
        </div>
      </div>
    </div>
  `;
}

/**
 * 検索・フィルタリング用JavaScriptを生成する
 */
function generateSearchScript() {
  return `
    <script>
      const slidesData = ${JSON.stringify(slideMetadata)};
      const searchInput = document.getElementById('searchInput');
      const tagFilterBtns = document.querySelectorAll('.tag-filter-btn');
      const slideCards = document.querySelectorAll('.slide-card');
      const resultCount = document.getElementById('resultCount');
      const slideTags = document.querySelectorAll('.slide-tag');
      const clearFilters = document.getElementById('clearFilters');
      
      let currentFilter = { tags: [], searchText: '' };
      
      function applyFilters() {
        let visibleCount = 0;
        
        slideCards.forEach(card => {
          const cardTags = card.dataset.tags.split(',');
          const cardTitle = card.dataset.title.toLowerCase();
          const cardDescription = card.dataset.description.toLowerCase();
          const searchText = currentFilter.searchText.toLowerCase();
          
          const tagMatch = currentFilter.tags.length === 0 || 
                          currentFilter.tags.includes('all') ||
                          currentFilter.tags.some(filterTag => cardTags.includes(filterTag));
          
          const textMatch = !searchText || 
                           cardTags.some(tag => tag.toLowerCase().includes(searchText)) ||
                           cardTitle.includes(searchText) ||
                           cardDescription.includes(searchText);
          
          if (tagMatch && textMatch) {
            card.style.display = 'block';
            visibleCount++;
          } else {
            card.style.display = 'none';
          }
        });
        
        resultCount.textContent = visibleCount;
        
        const hasFilters = currentFilter.tags.length > 0 || currentFilter.searchText;
        clearFilters.style.display = hasFilters ? 'inline-block' : 'none';
      }
      
      function updateTagButtons() {
        tagFilterBtns.forEach(btn => {
          const tag = btn.dataset.tag;
          if (currentFilter.tags.includes(tag) || (currentFilter.tags.length === 0 && tag === 'all')) {
            btn.classList.add('active');
            btn.classList.remove('border-gray-300', 'text-gray-700');
            btn.classList.add('border-blue-500', 'bg-blue-500', 'text-white');
          } else {
            btn.classList.remove('active');
            btn.classList.remove('border-blue-500', 'bg-blue-500', 'text-white');
            btn.classList.add('border-gray-300', 'text-gray-700');
          }
        });
      }
      
      searchInput.addEventListener('input', (e) => {
        currentFilter.searchText = e.target.value;
        applyFilters();
      });
      
      tagFilterBtns.forEach(btn => {
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
      
      slideTags.forEach(tag => {
        tag.addEventListener('click', (e) => {
          e.preventDefault();
          const tagName = e.target.dataset.tag;
          
          if (!currentFilter.tags.includes(tagName)) {
            currentFilter.tags = [tagName];
            updateTagButtons();
            applyFilters();
          }
        });
      });
      
      clearFilters.addEventListener('click', () => {
        currentFilter = { tags: [], searchText: '' };
        searchInput.value = '';
        updateTagButtons();
        applyFilters();
      });
      
      document.addEventListener('DOMContentLoaded', () => {
        updateTagButtons();
      });
    </script>
  `;
}

// HTMLテンプレート
const htmlTemplate = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Slidev Presentations</title>
    <meta name="description" content="複数のSlidevプレゼンテーションを1つのリポジトリで管理するシステム">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        .slide-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;
        }
        .slide-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .gradient-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        .tag-filter-btn.active {
            background-color: #3b82f6;
            border-color: #3b82f6;
            color: white;
        }
        .tag-filter-btn {
            border-color: #d1d5db;
            color: #374151;
        }
        .tag-filter-btn:hover:not(.active) {
            background-color: #f9fafb;
        }
    </style>
</head>
<body class="bg-gray-50 min-h-screen">
    <!-- ヘッダー -->
    <header class="gradient-bg text-white shadow-lg">
        <div class="max-w-6xl mx-auto px-4 py-8">
            <div class="text-center">
                <h1 class="text-4xl md:text-5xl font-bold mb-4">🎪 My Slidev Presentations</h1>
                <p class="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                    複数のSlidevプレゼンテーションを1つのリポジトリで管理するシステム
                </p>
                <div class="mt-6 flex gap-4 justify-center">
                    <a href="https://github.com/wwlapaki310/my-slidev-presentations" 
                       class="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
                       target="_blank">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"></path>
                        </svg>
                        GitHub Repository
                    </a>
                    <a href="/manage-tags.html" 
                       class="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors inline-flex items-center gap-2">
                        🏷️ タグ管理
                    </a>
                </div>
            </div>
        </div>
    </header>

    <!-- メインコンテンツ -->
    <main class="max-w-6xl mx-auto px-4 py-12">
        <!-- システム概要 -->
        <section class="mb-12">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                    <span class="text-2xl">🏗️</span>
                    システム概要
                </h2>
                <div class="grid md:grid-cols-3 gap-6">
                    <div class="text-center">
                        <div class="text-4xl mb-3">📊</div>
                        <h3 class="font-semibold text-gray-800 mb-2">統一管理</h3>
                        <p class="text-gray-600 text-sm">1つのリポジトリで複数プレゼンテーション管理</p>
                    </div>
                    <div class="text-center">
                        <div class="text-4xl mb-3">🚀</div>
                        <h3 class="font-semibold text-gray-800 mb-2">自動デプロイ</h3>
                        <p class="text-gray-600 text-sm">Vercelでの一括デプロイメント</p>
                    </div>
                    <div class="text-center">
                        <div class="text-4xl mb-3">🔄</div>
                        <h3 class="font-semibold text-gray-800 mb-2">効率開発</h3>
                        <p class="text-gray-600 text-sm">pnpm workspaceによる効率的管理</p>
                    </div>
                </div>
            </div>
        </section>

        ${generateSearchUI()}

        <!-- スライド一覧 -->
        <section id="slidesSection">
            <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">📚 Available Presentations</h2>
            <div class="grid md:grid-cols-2 gap-8" id="slidesContainer">
                ${slideMetadata.map(generateSlideCard).join('')}
            </div>
        </section>

        <!-- 技術スタック -->
        <section class="mt-16">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">⚙️ 技術スタック</h2>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div>
                        <div class="text-3xl mb-2">🎪</div>
                        <div class="font-semibold text-gray-800">Slidev</div>
                        <div class="text-sm text-gray-600">52.0.0</div>
                    </div>
                    <div>
                        <div class="text-3xl mb-2">⚡</div>
                        <div class="font-semibold text-gray-800">Vue.js</div>
                        <div class="text-sm text-gray-600">3.4+</div>
                    </div>
                    <div>
                        <div class="text-3xl mb-2">🌐</div>
                        <div class="font-semibold text-gray-800">Vercel</div>
                        <div class="text-sm text-gray-600">Hosting</div>
                    </div>
                    <div>
                        <div class="text-3xl mb-2">📦</div>
                        <div class="font-semibold text-gray-800">pnpm</div>
                        <div class="text-sm text-gray-600">Workspace</div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- フッター -->
    <footer class="bg-gray-800 text-white py-8 mt-16">
        <div class="max-w-6xl mx-auto px-4 text-center">
            <p class="text-gray-300">Built with ❤️ using Slidev + Vercel + pnpm workspace</p>
            <p class="text-gray-400 text-sm mt-2">© 2025 Satoru Akita. All rights reserved.</p>
        </div>
    </footer>

    ${generateSearchScript()}
</body>
</html>`;

// dist/index.htmlファイルを生成
function generateIndexPage() {
    const distDir = 'dist';
    
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
    }
    
    const indexPath = path.join(distDir, 'index.html');
    fs.writeFileSync(indexPath, htmlTemplate);
    
    console.log('✅ Generated index.html successfully');
    console.log(`📁 Output: ${indexPath}`);
    console.log(`📊 Slides included: ${slideMetadata.length}`);
    slideMetadata.forEach(slide => {
        console.log(`   - ${slide.title} (/${slide.name}/) - Preview: previews/${slide.name}.png`);
    });
}

// スクリプト実行
if (import.meta.url === `file://${process.argv[1]}`) {
    generateIndexPage();
}

export { generateIndexPage, slideMetadata };
