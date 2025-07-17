import fs from 'fs';
import path from 'path';

const presentations = [
  {
    title: 'SRE NEXT 2025 - NoCスタッフをやった話',
    description: 'SRE NEXT2025でNoCスタッフをやった話とSRE NEXTの講演紹介',
    path: '/sre-next-2025/',
    folder: 'SRE-NEXT-2025',
    lastUpdated: '2025-07-16',
    tags: ['SRE', 'NoC', 'インフラ', '運用']
  },
  {
    title: 'Slidev複数プレゼンテーション - 自動デプロイシステム',
    description: 'GitHub + Vercel で実現する完全自動化されたCI/CDワークフローの解説',
    path: '/slidev-system/',
    folder: 'SLIDEV-SYSTEM',
    lastUpdated: '2025-07-17',
    tags: ['Slidev', 'CI/CD', 'Vercel', 'GitHub', '自動化']
  }
  // 新しいプレゼンテーション追加時はここに追加
];

// ファイル構造をデバッグするための関数
const debugFileStructure = (dir, prefix = '') => {
  try {
    if (!fs.existsSync(dir)) {
      console.log(`❌ Directory does not exist: ${dir}`);
      return;
    }
    
    const items = fs.readdirSync(dir);
    console.log(`📁 ${prefix}${path.basename(dir)}/`);
    
    items.forEach(item => {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        debugFileStructure(itemPath, prefix + '  ');
      } else {
        console.log(`📄 ${prefix}  ${item} (${stat.size} bytes)`);
      }
    });
  } catch (error) {
    console.log(`❌ Error reading directory ${dir}:`, error.message);
  }
};

const generateIndexPage = () => {
  console.log('🚀 Building index page...');
  
  // デバッグ: ビルド後のディレクトリ構造を確認
  console.log('\n🔍 Checking dist directory structure:');
  debugFileStructure('dist');
  
  const indexHtml = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Slidev Presentations</title>
  <meta name="description" content="Slidevで作成された技術プレゼンテーション集">
  <meta name="keywords" content="Slidev, プレゼンテーション, 技術, SRE, 開発, CI/CD, 自動化">
  <meta property="og:title" content="My Slidev Presentations">
  <meta property="og:description" content="Slidevで作成された技術プレゼンテーション集">
  <meta property="og:type" content="website">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📊</text></svg>">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
      line-height: 1.6;
      color: #333;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 2rem 1rem;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      border-radius: 16px;
      padding: 3rem;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }
    
    header {
      text-align: center;
      margin-bottom: 3rem;
    }
    
    h1 {
      font-size: 3rem;
      color: #2c3e50;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .subtitle {
      font-size: 1.2rem;
      color: #666;
      margin-bottom: 2rem;
    }
    
    .debug-info {
      background: #f8f9fa;
      border: 1px solid #e9ecef;
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 2rem;
      font-family: monospace;
      font-size: 0.9rem;
      color: #495057;
    }
    
    .stats {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-bottom: 2rem;
    }
    
    .stat {
      text-align: center;
    }
    
    .stat-number {
      font-size: 2rem;
      font-weight: bold;
      color: #667eea;
    }
    
    .stat-label {
      font-size: 0.9rem;
      color: #666;
    }
    
    .presentations {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }
    
    .presentation-card {
      border: 1px solid #e1e8ed;
      border-radius: 12px;
      padding: 2rem;
      background: #fafafa;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .presentation-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    .presentation-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 25px rgba(0,0,0,0.15);
      border-color: #667eea;
    }
    
    .presentation-card h2 {
      font-size: 1.5rem;
      color: #2c3e50;
      margin-bottom: 1rem;
      line-height: 1.3;
    }
    
    .description {
      color: #666;
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }
    
    .meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .date {
      font-size: 0.9rem;
      color: #888;
    }
    
    .tags {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    
    .tag {
      background: #667eea;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 500;
    }
    
    .actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
    
    .btn {
      padding: 0.75rem 1.5rem;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 500;
      text-align: center;
      transition: all 0.2s ease;
      display: inline-block;
      min-width: 160px;
    }
    
    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    
    .btn-primary:hover {
      transform: scale(1.05);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }
    
    .btn-secondary {
      background: #f8f9fa;
      color: #667eea;
      border: 2px solid #667eea;
    }
    
    .btn-secondary:hover {
      background: #667eea;
      color: white;
    }
    
    footer {
      text-align: center;
      padding-top: 2rem;
      border-top: 1px solid #e1e8ed;
      color: #666;
    }
    
    footer a {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
    }
    
    footer a:hover {
      text-decoration: underline;
    }
    
    .github-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 1rem;
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
    }
    
    .github-link:hover {
      text-decoration: underline;
    }
    
    @media (max-width: 768px) {
      body {
        padding: 1rem;
      }
      
      .container {
        padding: 2rem;
      }
      
      h1 {
        font-size: 2rem;
      }
      
      .presentations {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
      
      .stats {
        flex-direction: column;
        gap: 1rem;
      }
      
      .actions {
        flex-direction: column;
      }
      
      .btn {
        min-width: auto;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>📊 My Slidev Presentations</h1>
      <p class="subtitle">技術プレゼンテーション集 - Powered by Slidev & Vercel</p>
      
      <div class="debug-info">
        <strong>🔍 Debug Info:</strong><br>
        Build Time: ${new Date().toISOString()}<br>
        Presentations: ${presentations.length}<br>
        Expected Paths: ${presentations.map(p => p.path).join(', ')}
      </div>
      
      <div class="stats">
        <div class="stat">
          <div class="stat-number">${presentations.length}</div>
          <div class="stat-label">プレゼンテーション</div>
        </div>
        <div class="stat">
          <div class="stat-number">${presentations.reduce((sum, p) => sum + p.tags.length, 0)}</div>
          <div class="stat-label">トピック</div>
        </div>
        <div class="stat">
          <div class="stat-number">${new Date().getFullYear()}</div>
          <div class="stat-label">更新年</div>
        </div>
      </div>
    </header>
    
    <main class="presentations">
      ${presentations.map(p => `
        <article class="presentation-card">
          <h2>${p.title}</h2>
          <p class="description">${p.description}</p>
          <div class="meta">
            <span class="date">更新: ${p.lastUpdated}</span>
            <div class="tags">
              ${p.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
          </div>
          <div class="actions">
            <a href="${p.path}" class="btn btn-primary">プレゼンテーションを見る</a>
            <a href="${p.path}presenter/" class="btn btn-secondary">発表者モード</a>
          </div>
        </article>
      `).join('')}
    </main>
    
    <footer>
      <p>Powered by <a href="https://sli.dev" target="_blank">Slidev</a> & <a href="https://vercel.com" target="_blank">Vercel</a></p>
      <a href="https://github.com/wwlapaki310/my-slidev-presentations" target="_blank" class="github-link">
        📱 GitHub Repository
      </a>
      <p style="margin-top: 1rem; font-size: 0.9rem;">
        最終ビルド: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}
      </p>
    </footer>
  </div>
</body>
</html>`;

  try {
    // Create dist directory if it doesn't exist
    if (!fs.existsSync('dist')) {
      fs.mkdirSync('dist', { recursive: true });
    }

    // Write index.html
    fs.writeFileSync('dist/index.html', indexHtml);
    console.log('✅ Index page built successfully!');
    console.log(`📊 Generated index for ${presentations.length} presentations`);
    
    // Create a simple robots.txt for SEO
    const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: https://your-domain.vercel.app/sitemap.xml`;
    fs.writeFileSync('dist/robots.txt', robotsTxt);
    
    console.log('🤖 robots.txt created');
    
    // Generate sitemap.xml for SEO
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://your-domain.vercel.app/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  ${presentations.map(p => `
  <url>
    <loc>https://your-domain.vercel.app${p.path}</loc>
    <lastmod>${p.lastUpdated}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;
    fs.writeFileSync('dist/sitemap.xml', sitemap);
    console.log('🗺️ sitemap.xml created');
    
    // 最終的なファイル構造を再度確認
    console.log('\n📋 Final dist structure:');
    debugFileStructure('dist');
    
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1); // ビルド失敗時はデプロイ停止
  }
};

// エラーハンドリング付きで実行
try {
  generateIndexPage();
  console.log('🎉 Build completed successfully');
} catch (error) {
  console.error('💥 Fatal error during build:', error);
  process.exit(1);
}
