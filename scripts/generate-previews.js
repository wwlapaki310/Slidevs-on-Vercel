import { chromium } from 'playwright-chromium';
import fs from 'fs';
import path from 'path';
import { slides } from './build-index.js';

/**
 * スライドのプレビュー画像を生成する
 */
async function generatePreviews() {
  console.log('🖼️  Generating slide previews...');
  
  // プレビュー保存ディレクトリを作成
  const previewsDir = 'dist/previews';
  if (!fs.existsSync(previewsDir)) {
    fs.mkdirSync(previewsDir, { recursive: true });
  }

  let browser;
  
  try {
    // Chromiumブラウザを起動
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 }
    });

    for (const slide of slides) {
      try {
        console.log(`📸 Capturing preview for: ${slide.name}`);
        
        const page = await context.newPage();
        
        // スライドページにアクセス
        const slideUrl = `http://localhost:3000/${slide.name}/`;
        console.log(`🌐 Loading: ${slideUrl}`);
        
        await page.goto(slideUrl, { 
          waitUntil: 'networkidle',
          timeout: 30000 
        });

        // Slidevの読み込み完了を待つ
        await page.waitForSelector('.slidev-layout', { timeout: 10000 });
        
        // 少し待ってからスクリーンショット
        await page.waitForTimeout(2000);

        // プレビュー画像を生成
        const previewPath = path.join(previewsDir, `${slide.name}.png`);
        await page.screenshot({
          path: previewPath,
          clip: { x: 0, y: 0, width: 1280, height: 720 },
          type: 'png'
        });

        console.log(`✅ Preview saved: ${previewPath}`);
        await page.close();
        
      } catch (error) {
        console.error(`❌ Failed to generate preview for ${slide.name}:`, error.message);
        
        // フォールバック画像を作成
        await generateFallbackImage(slide.name, previewsDir);
      }
    }

  } catch (error) {
    console.error('❌ Failed to initialize browser:', error);
    
    // 全スライドでフォールバック画像を生成
    for (const slide of slides) {
      await generateFallbackImage(slide.name, previewsDir);
    }
    
  } finally {
    if (browser) {
      await browser.close();
    }
  }

  console.log('🎉 Preview generation completed!');
}

/**
 * フォールバック画像を生成する（HTMLキャンバス使用）
 */
async function generateFallbackImage(slideName, previewsDir) {
  console.log(`🎨 Generating fallback image for: ${slideName}`);
  
  // 簡単なSVGフォールバック画像を作成
  const slide = slides.find(s => s.name === slideName);
  const title = slide ? slide.title : slideName;
  
  const svgContent = `
    <svg width="1280" height="720" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="1280" height="720" fill="url(#grad)"/>
      <rect x="40" y="40" width="1200" height="640" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" rx="20"/>
      <text x="640" y="300" font-family="Arial, sans-serif" font-size="48" font-weight="bold" 
            text-anchor="middle" fill="white">${title}</text>
      <text x="640" y="380" font-family="Arial, sans-serif" font-size="24" 
            text-anchor="middle" fill="rgba(255,255,255,0.8)">🎯 Slidev Presentation</text>
      <text x="640" y="450" font-family="Arial, sans-serif" font-size="18" 
            text-anchor="middle" fill="rgba(255,255,255,0.6)">Preview not available</text>
    </svg>
  `;
  
  const fallbackPath = path.join(previewsDir, `${slideName}-fallback.svg`);
  fs.writeFileSync(fallbackPath, svgContent);
  
  console.log(`💾 Fallback image created: ${fallbackPath}`);
}

/**
 * 開発環境でのプレビュー生成（ローカルサーバー起動後）
 */
async function generatePreviewsWithLocalServer() {
  console.log('🚀 Starting local server for preview generation...');
  
  // 簡単なHTTPサーバーを起動する関数
  const { spawn } = await import('child_process');
  
  // distディレクトリでHTTPサーバーを起動
  const server = spawn('python3', ['-m', 'http.server', '3000'], {
    cwd: 'dist',
    stdio: 'pipe'
  });
  
  // サーバー起動を待つ
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  try {
    await generatePreviews();
  } finally {
    // サーバーを停止
    server.kill();
  }
}

// スクリプトが直接実行された場合の処理
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  
  if (args.includes('--with-server')) {
    generatePreviewsWithLocalServer();
  } else {
    generatePreviews();
  }
}

export { generatePreviews, generatePreviewsWithLocalServer };
