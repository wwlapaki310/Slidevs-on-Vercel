import { chromium } from 'playwright-chromium';
import fs from 'fs';
import path from 'path';
import { slideMetadata } from './build-index.js';

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

  // 本番環境での簡易チェック
  const isProduction = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';
  
  if (isProduction) {
    console.log('🏭 Production environment detected');
    // 本番環境では軽量なフォールバック画像のみ生成
    for (const slide of slideMetadata) {
      await generateFallbackImage(slide.name, previewsDir);
    }
    return;
  }

  let browser;
  
  try {
    // Chromiumブラウザを起動
    browser = await chromium.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });

    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 }
    });

    for (const slide of slideMetadata) {
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
    for (const slide of slideMetadata) {
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
 * フォールバック画像を生成する（SVG形式）
 */
async function generateFallbackImage(slideName, previewsDir) {
  console.log(`🎨 Generating fallback image for: ${slideName}`);
  
  // スライド情報を取得
  const slide = slideMetadata.find(s => s.name === slideName);
  const title = slide ? slide.title : slideName;
  const description = slide ? slide.description : 'Slidev Presentation';
  
  // SVGフォールバック画像を作成
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
      
      <!-- タイトル -->
      <text x="640" y="280" font-family="Arial, sans-serif" font-size="42" font-weight="bold" 
            text-anchor="middle" fill="white">${title}</text>
      
      <!-- 説明 -->
      <text x="640" y="340" font-family="Arial, sans-serif" font-size="18" 
            text-anchor="middle" fill="rgba(255,255,255,0.8)">${description.length > 60 ? description.substring(0, 60) + '...' : description}</text>
      
      <!-- アイコン -->
      <text x="640" y="450" font-family="Arial, sans-serif" font-size="64" 
            text-anchor="middle" fill="rgba(255,255,255,0.9)">🎯</text>
      
      <!-- フッター -->
      <text x="640" y="520" font-family="Arial, sans-serif" font-size="16" 
            text-anchor="middle" fill="rgba(255,255,255,0.6)">Slidev Presentation</text>
    </svg>
  `;
  
  // PNG形式として保存（SVGだがPNG拡張子で統一）
  const fallbackPath = path.join(previewsDir, `${slideName}.png`);
  fs.writeFileSync(fallbackPath, svgContent);
  
  console.log(`💾 Fallback image created: ${fallbackPath}`);
}

/**
 * 本番環境用の軽量プレビュー生成
 */
async function generateProductionPreviews() {
  console.log('🏭 Generating production previews (fallback only)...');
  
  const previewsDir = 'dist/previews';
  if (!fs.existsSync(previewsDir)) {
    fs.mkdirSync(previewsDir, { recursive: true });
  }
  
  for (const slide of slideMetadata) {
    await generateFallbackImage(slide.name, previewsDir);
  }
  
  console.log('✅ Production previews generated!');
}

// スクリプト実行
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  
  if (args.includes('--production')) {
    generateProductionPreviews();
  } else {
    generatePreviews();
  }
}

export { generatePreviews, generateProductionPreviews };
