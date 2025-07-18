#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

// コマンドライン引数を解析
const args = process.argv.slice(2);
if (args.length < 2) {
    console.error('❌ Usage: npm run create-slide <slide-name> <title>');
    console.error('Example: npm run create-slide my-presentation "My Awesome Presentation"');
    process.exit(1);
}

const slideName = args[0];
const title = args.slice(1).join(' ');

// スライド名のバリデーション
if (!/^[a-z0-9-]+$/.test(slideName)) {
    console.error('❌ Slide name must contain only lowercase letters, numbers, and hyphens');
    process.exit(1);
}

// スライドテンプレートを生成
function generateSlideTemplate(title) {
    return `---
theme: default
background: https://source.unsplash.com/1920x1080/?technology
title: ${title}
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## ${title}
  
  Created by Satoru Akita
  
  Learn more at [Slidev](https://sli.dev)
drawings:
  persist: false
transition: slide-left
mdc: true
---

# ${title}

Presentation subtitle

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space for next page <carbon:arrow-right class="inline"/>
  </span>
</div>

<div class="abs-br m-6 flex gap-2">
  <button @click="$slidev.nav.openInEditor()" title="Open in Editor" class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon:edit />
  </button>
  <a href="https://github.com/wwlapaki310/my-slidev-presentations" target="_blank" alt="GitHub" title="Open in GitHub"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

---

# What is ${title}?

- 📝 Your first point
- 🎨 Your second point  
- 🚀 Your third point

---

# Getting Started

Add your content here...

\`\`\`javascript
// Example code
console.log('Hello, ${title}!');
\`\`\`

---

# Thank You!

Questions?

<div class="abs-br m-6 text-xl">
  <carbon-logo-github /> wwlapaki310
</div>
`;
}

// package.jsonを生成
function generatePackageJson(slideName) {
    return JSON.stringify({
        "name": slideName,
        "type": "module",
        "private": true,
        "scripts": {
            "build": `slidev build --base /${slideName}/ --out ../../dist/${slideName}`,
            "dev": "slidev --open",
            "export": "slidev export"
        },
        "dependencies": {
            "@slidev/cli": "^0.52.8",
            "@slidev/theme-default": "latest",
            "vue": "^3.4.31"
        }
    }, null, 2);
}

// build-index.jsにメタデータを追加
function updateBuildIndex(slideName, title) {
    const buildIndexPath = 'scripts/build-index.js';
    let content = fs.readFileSync(buildIndexPath, 'utf8');
    
    const today = new Date().toISOString().split('T')[0];
    
    const newSlide = `  {
    name: '${slideName}',
    title: '${title}',
    description: '${title}の解説プレゼンテーション',
    date: '${today}',
    author: 'Satoru Akita',
    tags: ['Slidev', 'Presentation']
  }`;

    // slidesアレイに新しいスライドを追加
    const slidesMatch = content.match(/(const slides = \[)([\s\S]*?)(\];)/);
    if (slidesMatch) {
        const existingSlides = slidesMatch[2].trim();
        const newSlidesContent = existingSlides ? 
            `${existingSlides},\n${newSlide}` : 
            newSlide;
        
        content = content.replace(
            /(const slides = \[)([\s\S]*?)(\];)/,
            `$1\n${newSlidesContent}\n$3`
        );
        
        fs.writeFileSync(buildIndexPath, content);
    }
}

// ルートpackage.jsonのビルドスクリプトを更新
function updateRootPackageJson(slideName) {
    const packageJsonPath = 'package.json';
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // 新しいビルドスクリプトを追加
    const newBuildScript = `cd ${slideName}/src && npm install && npm run build`;
    packageJson.scripts[`build:${slideName}`] = newBuildScript;
    
    // メインビルドスクリプトを更新
    const buildCommands = Object.keys(packageJson.scripts)
        .filter(key => key.startsWith('build:') && key !== 'build:index')
        .map(key => `npm run ${key}`)
        .join(' && ');
    
    packageJson.scripts.build = `${buildCommands} && npm run build:index`;
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

// vercel.jsonを更新
function updateVercelJson(slideName) {
    const vercelJsonPath = 'vercel.json';
    const vercelJson = JSON.parse(fs.readFileSync(vercelJsonPath, 'utf8'));
    
    // 新しいリライトルールを追加
    const newRewrite = {
        "source": `/${slideName}/(.*)`,
        "destination": `/${slideName}/index.html`
    };
    
    // ルートパスのリライトルールを除いて新しいルールを追加
    const rootRewrite = vercelJson.rewrites.find(r => r.source === "/");
    vercelJson.rewrites = vercelJson.rewrites.filter(r => r.source !== "/");
    vercelJson.rewrites.push(newRewrite);
    if (rootRewrite) {
        vercelJson.rewrites.push(rootRewrite);
    }
    
    fs.writeFileSync(vercelJsonPath, JSON.stringify(vercelJson, null, 2));
}

// メイン実行関数
function createSlide(slideName, title) {
    const slideDir = `${slideName}/src`;
    
    // 既存チェック
    if (fs.existsSync(slideName)) {
        console.error(`❌ Slide "${slideName}" already exists!`);
        process.exit(1);
    }
    
    try {
        console.log(`🚀 Creating slide: ${slideName}`);
        
        // ディレクトリ作成
        fs.mkdirSync(slideDir, { recursive: true });
        console.log(`📁 Created directory: ${slideDir}`);
        
        // slides.md作成
        const slideTemplate = generateSlideTemplate(title);
        fs.writeFileSync(`${slideDir}/slides.md`, slideTemplate);
        console.log(`📝 Created slides.md`);
        
        // package.json作成
        const packageJson = generatePackageJson(slideName);
        fs.writeFileSync(`${slideDir}/package.json`, packageJson);
        console.log(`📦 Created package.json`);
        
        // build-index.jsにメタデータ追加
        updateBuildIndex(slideName, title);
        console.log(`🔧 Updated build-index.js`);
        
        // ルートpackage.jsonのビルドスクリプト更新
        updateRootPackageJson(slideName);
        console.log(`📦 Updated root package.json`);
        
        // vercel.json更新
        updateVercelJson(slideName);
        console.log(`🌐 Updated vercel.json`);
        
        console.log(`\n✅ Successfully created slide: ${slideName}`);
        console.log(`\n🎯 Next steps:`);
        console.log(`   1. cd ${slideName}/src`);
        console.log(`   2. npm run dev`);
        console.log(`   3. Edit slides.md`);
        console.log(`   4. npm run build (from root directory)`);
        console.log(`\n🚀 Your slide will be available at: /${slideName}/`);
        
    } catch (error) {
        console.error(`❌ Error creating slide: ${error.message}`);
        process.exit(1);
    }
}

// スクリプト実行
if (import.meta.url === `file://${process.argv[1]}`) {
    createSlide(slideName, title);
}

export { createSlide };
