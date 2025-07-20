import fs from 'fs';
import path from 'path';

// Comprehensive slide metadata with multilingual support
const slideMetadata = [
    {
        name: 'slidev-system',
        title: 'Slidev × Vercel Multi-Slide Management System',
        description: 'A comprehensive system for efficiently managing multiple Slidev presentations in one repository',
        date: '2025-07-19',
        author: 'Slidev Community',
        category: 'system-design',
        duration: '20 min',
        level: 'beginner',
        language: 'en',
        flag: '🇺🇸'
    },
    {
        name: 'slidev-system-ja',
        title: 'Slidev × Vercel マルチスライド管理システム',
        description: '一つのリポジトリで複数のSlidevプレゼンテーションを効率的に管理するための包括的なシステム',
        date: '2025-07-19',
        author: 'Slidev コミュニティ',
        category: 'system-design',
        duration: '20分',
        level: '初級',
        language: 'ja',
        flag: '🇯🇵'
    },
    {
        name: 'slidev-system-zh',
        title: 'Slidev × Vercel 多幻灯片管理系统',
        description: '在一个仓库中高效管理多个Slidev演示文稿的综合系统',
        date: '2025-07-19',
        author: 'Slidev 社区',
        category: 'system-design',
        duration: '20分钟',
        level: '初级',
        language: 'zh',
        flag: '🇨🇳'
    }
];

// Enhanced slide card generation with language support
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
                    ${new Date(slide.date).toLocaleDateString('en-US')}
                </div>
                <div class="absolute top-4 left-4 bg-white bg-opacity-90 text-gray-800 px-2 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    ${slide.flag} ${slide.language.toUpperCase()}
                </div>
            </div>
        </a>
        <div class="p-6">
            <h3 class="text-xl font-bold text-gray-800 mb-3">${slide.title}</h3>
            <p class="text-gray-600 mb-4 line-clamp-3">${slide.description}</p>
            <div class="flex gap-3">
                <a href="/${slide.name}/" class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-center hover:bg-blue-700 transition-colors">View Slide</a>
                <a href="/${slide.name}/presenter/" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors" title="Presenter Mode">🎤</a>
                <a href="/${slide.name}/overview/" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors" title="Overview Mode">📋</a>
            </div>
        </div>
    </div>`;
}

const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Slidev Presentations - Multilingual</title>
    <meta name="description" content="A multilingual system for managing multiple Slidev presentations in one repository">
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
                <p class="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">A multilingual system for managing multiple Slidev presentations</p>
                <div class="mt-4 flex justify-center gap-4 text-lg">
                    <span class="bg-white bg-opacity-20 px-3 py-1 rounded-full">🇺🇸 English</span>
                    <span class="bg-white bg-opacity-20 px-3 py-1 rounded-full">🇯🇵 日本語</span>
                    <span class="bg-white bg-opacity-20 px-3 py-1 rounded-full">🇨🇳 中文</span>
                </div>
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
                <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3"><span class="text-2xl">🏗️</span>System Overview</h2>
                <div class="grid md:grid-cols-3 gap-6">
                    <div class="text-center"><div class="text-4xl mb-3">🌐</div><h3 class="font-semibold text-gray-800 mb-2">Multilingual Support</h3><p class="text-gray-600 text-sm">English, Japanese, and Chinese presentations</p></div>
                    <div class="text-center"><div class="text-4xl mb-3">🚀</div><h3 class="font-semibold text-gray-800 mb-2">Auto Deploy</h3><p class="text-gray-600 text-sm">Automated deployment with Vercel</p></div>
                    <div class="text-center"><div class="text-4xl mb-3">🔄</div><h3 class="font-semibold text-gray-800 mb-2">Efficient Development</h3><p class="text-gray-600 text-sm">Streamlined workflow with workspace management</p></div>
                </div>
            </div>
        </section>

        <section id="slidesSection">
            <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">📚 Available Presentations</h2>
            <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-8" id="slidesContainer">
                ${slideMetadata.map(generateSlideCard).join('')}
            </div>
        </section>

        <section class="mt-16">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">⚙️ Tech Stack</h2>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div><div class="text-3xl mb-2">🎪</div><div class="font-semibold text-gray-800">Slidev</div><div class="text-sm text-gray-600">0.52.0</div></div>
                    <div><div class="text-3xl mb-2">⚡</div><div class="font-semibold text-gray-800">Vue.js</div><div class="text-sm text-gray-600">3.4+</div></div>
                    <div><div class="text-3xl mb-2">🌐</div><div class="font-semibold text-gray-800">Vercel</div><div class="text-sm text-gray-600">Hosting</div></div>
                    <div><div class="text-3xl mb-2">📦</div><div class="font-semibold text-gray-800">Workspace</div><div class="text-sm text-gray-600">Management</div></div>
                </div>
            </div>
        </section>

        <section class="mt-16">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">🌍 Language Versions</h2>
                <div class="grid md:grid-cols-3 gap-6">
                    <div class="text-center p-4 border border-gray-200 rounded-lg">
                        <div class="text-4xl mb-3">🇺🇸</div>
                        <h3 class="font-semibold text-gray-800 mb-2">English</h3>
                        <p class="text-gray-600 text-sm">Original presentation in English</p>
                        <a href="/slidev-system/" class="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">View English</a>
                    </div>
                    <div class="text-center p-4 border border-gray-200 rounded-lg">
                        <div class="text-4xl mb-3">🇯🇵</div>
                        <h3 class="font-semibold text-gray-800 mb-2">日本語</h3>
                        <p class="text-gray-600 text-sm">日本語版のプレゼンテーション</p>
                        <a href="/slidev-system-ja/" class="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">日本語版を見る</a>
                    </div>
                    <div class="text-center p-4 border border-gray-200 rounded-lg">
                        <div class="text-4xl mb-3">🇨🇳</div>
                        <h3 class="font-semibold text-gray-800 mb-2">中文</h3>
                        <p class="text-gray-600 text-sm">中文版演示文稿</p>
                        <a href="/slidev-system-zh/" class="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">查看中文版</a>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer class="bg-gray-800 text-white py-8 mt-16">
        <div class="max-w-6xl mx-auto px-4 text-center">
            <p class="text-gray-300">Built with ❤️ using Slidev + Vercel + Multilingual Support</p>
            <p class="text-gray-400 text-sm mt-2">© 2025 Open Source Community. All rights reserved.</p>
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
    
    console.log('✅ Generated multilingual index.html');
    console.log(`📊 Slides included: ${slideMetadata.length}`);
    slideMetadata.forEach(slide => {
        console.log(`   - ${slide.title} (/${slide.name}/) [${slide.flag} ${slide.language}]`);
    });
}

if (import.meta.url === `file://${process.argv[1]}`) {
    generateIndexPage();
}

export { generateIndexPage, slideMetadata };
