import fs from 'fs';
import path from 'path';

// シンプル化されたスライドメタデータ
const slideMetadata = [
    {
        name: 'sre-next-2025',
        title: 'SRE NEXT 2025 - NoCスタッフ体験記',
        description: 'SRE NEXT 2025でNoCスタッフをやった話とSRE NEXTの講演紹介',
        date: '2025-07-17',
        author: 'Satoru Akita',
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
        category: 'system-design',
        duration: '20分',
        level: 'beginner',
        language: 'ja'
    }
];

// シンプルなスライドカード生成
function generateSlideCard(slide) {
    return `
    <div class="slide-card bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
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
            <div class="flex gap-3">
                <a href="/${slide.name}/" class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-center hover:bg-blue-700 transition-colors">スライドを見る</a>
                <a href="/${slide.name}/presenter/" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors" title="発表者モード">🎤</a>
                <a href="/${slide.name}/overview/" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors" title="概要モード">📋</a>
            </div>
        </div>
    </div>`;
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
        .slide-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .slide-card:hover { transform: translateY(-4px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
        .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
    </style>
</head>
<body class="bg-gray-50 min-h-screen">
    <header class="gradient-bg text-white shadow-lg">
        <div class="max-w-6xl mx-auto px-4 py-8">
            <div class="text-center">
                <h1 class="text-4xl md:text-5xl font-bold mb-4">🎪 My Slidev Presentations</h1>
                <p class="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">複数のSlidevプレゼンテーションを1つのリポジトリで管理するシステム</p>
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
        </div>
    </footer>
</body>
</html>`;

function generateIndexPage() {
    const distDir = 'dist';
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
    }
    
    const indexPath = path.join(distDir, 'index.html');
    fs.writeFileSync(indexPath, htmlTemplate);
    
    console.log('✅ Generated simplified index.html');
    console.log(`📊 Slides included: ${slideMetadata.length}`);
    slideMetadata.forEach(slide => {
        console.log(`   - ${slide.title} (/${slide.name}/)`);
    });
}

if (import.meta.url === `file://${process.argv[1]}`) {
    generateIndexPage();
}

export { generateIndexPage, slideMetadata };
