import fs from 'fs';
import path from 'path';

const presentations = [
  {
    title: 'SRE NEXT 2025 - NoCスタッフをやった話',
    description: 'SRE NEXT2025でNoCスタッフをやった話とSRE NEXTの講演紹介',
    path: '/sre-next-2025/',
    folder: 'SRE-NEXT-2025'
  }
];

const indexHtml = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Slidev Presentations</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
    }
    .container {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    }
    h1 {
      text-align: center;
      color: #2c3e50;
      margin-bottom: 2rem;
      font-size: 2.5rem;
    }
    .presentation {
      border: 1px solid #e1e8ed;
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .presentation:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    .presentation h2 {
      margin: 0 0 0.5rem 0;
      color: #2c3e50;
    }
    .presentation p {
      color: #666;
      margin: 0 0 1rem 0;
    }
    .presentation a {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 0.75rem 1.5rem;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 500;
      transition: transform 0.2s;
    }
    .presentation a:hover {
      transform: scale(1.05);
    }
    .footer {
      text-align: center;
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid #e1e8ed;
      color: #666;
    }
    .github-link {
      display: inline-block;
      margin-top: 1rem;
      color: #667eea;
      text-decoration: none;
    }
    .github-link:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📊 My Slidev Presentations</h1>
    
    ${presentations.map(p => `
    <div class="presentation">
      <h2>${p.title}</h2>
      <p>${p.description}</p>
      <a href="${p.path}">プレゼンテーションを見る →</a>
    </div>
    `).join('')}
    
    <div class="footer">
      <p>Powered by <a href="https://sli.dev" target="_blank">Slidev</a></p>
      <a href="https://github.com/wwlapaki310/my-slidev-presentations" target="_blank" class="github-link">
        🔗 GitHub Repository
      </a>
    </div>
  </div>
</body>
</html>`;

// Create dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Write index.html
fs.writeFileSync('dist/index.html', indexHtml);
console.log('Index page built successfully!');
