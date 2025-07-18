# My Slidev Presentations

📊 **複数のSlidevプレゼンテーションを管理するワークスペース**

## 🚀 Live Demo

**メインページ**: https://my-slidev-eight.vercel.app/

### 利用可能なプレゼンテーション

- **SRE NEXT 2025**: https://my-slidev-eight.vercel.app/sre-next-2025/
  - **発表者モード**: https://my-slidev-eight.vercel.app/sre-next-2025/presenter/
  - **概要モード**: https://my-slidev-eight.vercel.app/sre-next-2025/overview/

- **Slidev System**: https://my-slidev-eight.vercel.app/slidev-system/
  - **発表者モード**: https://my-slidev-eight.vercel.app/slidev-system/presenter/
  - **概要モード**: https://my-slidev-eight.vercel.app/slidev-system/overview/

## 📁 プロジェクト構成

```
my-slidev-presentations/
├── pnpm-workspace.yaml        # ワークスペース設定
├── package.json               # ルートパッケージ
├── slides/                    # スライド専用ディレクトリ
│   ├── sre-next-2025/         # 各プレゼンテーション
│   │   └── src/
│   │       ├── slides.md      # スライド内容
│   │       └── package.json   # 個別設定
│   └── slidev-system/         # 2つ目のプレゼンテーション
│       └── src/
│           ├── slides.md      # スライド内容
│           └── package.json   # 個別設定
├── scripts/
│   └── build-index.js         # インデックス生成
└── vercel.json                # Vercel設定
```

## 🔄 デプロイフロー

```mermaid
graph LR
    A[GitHub Push] --> B[Vercel Auto Deploy]
    B --> C[npm install]
    C --> D[npm run build]
    
    D --> E1[slides/sre-next-2025/src をビルド]
    D --> E2[slides/slidev-system/src をビルド]
    D --> E3[scripts/build-index.js 実行]
    
    E1 --> F1[/sre-next-2025/ に配置]
    E2 --> F2[/slidev-system/ に配置]
    E3 --> F3[/ にランディングページ配置]
    
    F1 --> G[Vercel CDN配信]
    F2 --> G
    F3 --> G
    
    G --> H1[https://my-slidev-eight.vercel.app/sre-next-2025/]
    G --> H2[https://my-slidev-eight.vercel.app/slidev-system/]
    G --> H3[https://my-slidev-eight.vercel.app/]
    
    style A fill:#e1f5fe
    style B fill:#fff3e0
    style G fill:#c8e6c9
```

## 🛠️ 開発

### ローカル開発

```bash
# 特定のプレゼンテーションを開発
npm run dev:sre-next-2025
npm run dev:slidev-system
```

### ローカルビルド（確認用）

```bash
# 全プレゼンテーションをビルド
npm run build

# 特定のプレゼンテーションのみビルド
npm run build:sre-next-2025
npm run build:slidev-system
```

> **Note**: 実際のデプロイは Vercel 上で自動実行されるため、ローカルでの `dist/` ディレクトリ生成は確認用途のみです。

## 🌐 Vercel設定

### 自動デプロイ設定

`vercel.json` でビルドとルーティングを設定：

```json
{
  "installCommand": "npm install",
  "buildCommand": "npm run build",
  "rewrites": [
    { 
      "source": "/sre-next-2025/(.*)", 
      "destination": "/sre-next-2025/index.html" 
    },
    { 
      "source": "/slidev-system/(.*)", 
      "destination": "/slidev-system/index.html" 
    },
    { 
      "source": "/", 
      "destination": "/index.html" 
    }
  ]
}
```

### デプロイトリガー

- **main ブランチへのプッシュ**: 自動的に本番デプロイ
- **feature ブランチへのプッシュ**: プレビューデプロイ
- **Pull Request**: プレビューURL自動生成

## 📝 現在のプレゼンテーション

### SRE NEXT 2025 - NoCスタッフ体験記

- **内容**: SRE NEXT 2025でNoCスタッフをやった話とSRE NEXTの講演紹介
- **トピック**: SRE, NoC, インフラ, 運用
- **更新**: 2025-07-17

### Slidev × Vercel 複数スライド管理システム

- **内容**: 1つのリポジトリで複数のSlidevプレゼンテーションを効率的に管理する仕組みの解説
- **トピック**: Slidev, Vercel, DevOps, Automation
- **更新**: 2025-07-18

## 🔧 技術スタック

- **Slidev**: スライド作成フレームワーク
- **pnpm workspace**: モノレポ管理
- **Vue.js**: フロントエンドフレームワーク  
- **Vercel**: ホスティング + CI/CD プラットフォーム
- **Markdown**: スライド記述言語

## 🆕 新しいプレゼンテーション追加方法

### Step 1: ディレクトリ作成

```bash
mkdir -p slides/{presentation-name}/src
```

### Step 2: package.json 作成

```bash
cat > slides/{presentation-name}/src/package.json << 'EOF'
{
  "name": "{presentation-name}",
  "type": "module",
  "private": true,
  "scripts": {
    "build": "slidev build --base /{presentation-name}/ --out ../../../dist/{presentation-name}",
    "dev": "slidev --open",
    "export": "slidev export"
  },
  "dependencies": {
    "@slidev/cli": "52.0.0",
    "@slidev/theme-default": "latest",
    "vue": "^3.4.31"
  },
  "devDependencies": {
    "playwright-chromium": "^1.45.1"
  }
}
EOF
```

### Step 3: slides.md 作成

```bash
cat > slides/{presentation-name}/src/slides.md << 'EOF'
---
theme: default
highlighter: shiki
lineNumbers: false
transition: slide-left
title: Your Presentation Title
---

# Your First Slide

Content goes here...

---

# Second Slide

More content...
EOF
```

### Step 4: ルート設定更新

1. **package.json** にビルドスクリプト追加:
```json
{
  "scripts": {
    "dev:{presentation-name}": "cd slides/{presentation-name}/src && npm run dev",
    "build:{presentation-name}": "cd slides/{presentation-name}/src && npm install && npm run build"
  }
}
```

2. **vercel.json** にルーティング追加:
```json
{
  "rewrites": [
    { 
      "source": "/{presentation-name}/(.*)", 
      "destination": "/{presentation-name}/index.html" 
    }
  ]
}
```

3. **scripts/build-index.js** にプレゼンテーション情報を追加

### Step 5: 開発開始

```bash
npm run dev:{presentation-name}
```

## 📚 参考リンク

- [Slidev公式ドキュメント](https://ja.sli.dev/)
- [pnpm workspace](https://pnpm.io/workspaces)
- [Vercel](https://vercel.com/)
- [参考実装](https://zenn.dev/jy8752/articles/ad565a43ba0e0a)

---

**Built with ❤️ using Slidev + pnpm workspace**
