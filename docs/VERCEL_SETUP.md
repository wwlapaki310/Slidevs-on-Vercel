# 🚀 Vercel自動デプロイセットアップガイド

このガイドでは、GitHubプッシュからVercel自動デプロイまでの完全なCI/CDフローをセットアップする手順を説明します。

## 📋 前提条件

- ✅ GitHubアカウント
- ✅ Vercelアカウント（GitHubと連携済み）
- ✅ このリポジトリの準備完了

## 🎯 完成イメージ

**デプロイフロー:**
```
git push → GitHub → Vercel Webhook → 自動ビルド → 本番デプロイ → 🎉
```

**完成後のURL構成:**
```
https://your-app.vercel.app/                    # インデックスページ
https://your-app.vercel.app/sre-next-2025/     # SRE NEXTプレゼン
https://your-app.vercel.app/sre-next-2025/presenter/ # 発表者モード
```

## 🔧 Step 1: Vercelプロジェクト作成

### 1-1. Vercelダッシュボードにアクセス
1. [Vercel Dashboard](https://vercel.com/dashboard) にアクセス
2. 「Import Project」または「Add New...」→「Project」をクリック

### 1-2. GitHubリポジトリを選択
1. 「Import Git Repository」セクションで
2. `wwlapaki310/my-slidev-presentations` を検索
3. 「Import」をクリック

### 1-3. プロジェクト設定
```bash
# Project Name
my-slidev-presentations

# Framework Preset
Other

# Build and Output Settings
Build Command: npm run build
Output Directory: dist
Install Command: npm ci

# Environment Variables (任意)
NODE_VERSION=20
```

### 1-4. デプロイ実行
「Deploy」ボタンをクリック → 初回デプロイ開始

## ⚙️ Step 2: デプロイ設定の確認

### 2-1. ビルドログの確認
```bash
# 期待されるビルドログ
✅ Running "npm ci"
✅ Running "npm run build"
✅ Cleaning dist directory
✅ Building SRE NEXT presentation
✅ Generating index page
✅ Build completed successfully
```

### 2-2. 生成されるファイル構成
```
dist/
├── index.html              # メインインデックス
├── robots.txt               # SEO用
├── sitemap.xml             # サイトマップ
└── sre-next-2025/          # プレゼンテーション
    ├── index.html
    ├── assets/
    └── ...
```

## 🌐 Step 3: カスタムドメイン設定（任意）

### 3-1. ドメイン追加
1. Vercelダッシュボード → プロジェクト選択
2. 「Settings」→「Domains」
3. 「Add Domain」で独自ドメインを追加

### 3-2. DNS設定例
```dns
# CNAME レコード
slides.yourdomain.com → cname.vercel-dns.com

# または A レコード
slides.yourdomain.com → 76.76.19.61
```

## 🔄 Step 4: 自動デプロイの動作確認

### 4-1. テスト用変更を作成
```bash
# ローカルでテスト変更を作成
echo "# テスト更新 $(date)" >> README.md
git add README.md
git commit -m "Test auto deployment"
git push origin main
```

### 4-2. Vercelでの自動デプロイ確認
1. Vercelダッシュボードの「Deployments」タブで進行状況確認
2. ビルド完了後、サイトにアクセスして反映確認

## 📊 Step 5: 新しいプレゼンテーション追加のテスト

### 5-1. 新プレゼンテーション作成
```bash
# 新しいプレゼンテーションフォルダ作成
mkdir SAMPLE-PRESENTATION

# サンプルスライド作成
cat > SAMPLE-PRESENTATION/slides.md << 'EOF'
---
theme: default
title: サンプルプレゼンテーション
---

# サンプルプレゼンテーション
## CI/CDテスト用

---

# 内容
- 自動デプロイのテスト
- Vercel連携の確認
- 完璧！ 🎉
EOF
```

### 5-2. ビルド設定更新
```json
// package.json の scripts セクション更新
{
  "build:all": "npm run build:sre-next && npm run build:sample",
  "build:sample": "slidev build SAMPLE-PRESENTATION/slides.md --out dist/sample-presentation --base /sample-presentation/"
}
```

### 5-3. インデックス更新
```javascript
// scripts/build-index.js の presentations 配列に追加
{
  title: 'サンプルプレゼンテーション',
  description: 'CI/CDテスト用のサンプルプレゼンテーション',
  path: '/sample-presentation/',
  folder: 'SAMPLE-PRESENTATION',
  lastUpdated: '2025-07-16',
  tags: ['テスト', 'CI/CD', 'Vercel']
}
```

### 5-4. デプロイ実行
```bash
git add .
git commit -m "Add sample presentation for CI/CD testing"
git push origin main
```

## 🛡️ Step 6: エラー対応

### よくあるビルドエラーと対処法

#### エラー1: Node.js バージョン不一致
```bash
# エラー内容
Error: Node.js version 18.x is not supported

# 対処法
# vercel.json に以下を追加
{
  "functions": {
    "app/**/*.js": {
      "runtime": "nodejs20.x"
    }
  }
}
```

#### エラー2: 依存関係エラー
```bash
# エラー内容
npm ERR! peer dep missing

# 対処法
# package.json の devDependencies に追加
"playwright-chromium": "^1.45.1"
```

#### エラー3: ビルドタイムアウト
```bash
# 対処法: vercel.json に追加
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/node",
      "config": {
        "maxLambdaSize": "50mb"
      }
    }
  ]
}
```

## 📈 Step 7: 監視・運用設定

### 7-1. GitHub統合設定
```json
// vercel.json に追加済み
{
  "github": {
    "deploymentStatus": true,
    "deploymentChecks": true
  }
}
```

### 7-2. 通知設定（任意）
1. Vercelダッシュボード → Settings → Notifications
2. Slack/Discord/メール通知を設定
3. デプロイ成功/失敗時の通知を有効化

## 🎉 完了！

### ✅ 達成できたこと
- **ワンプッシュデプロイ**: `git push`するだけで本番反映
- **複数プレゼンテーション対応**: フォルダ単位で管理
- **美しいインデックスページ**: 自動生成される一覧ページ
- **SEO対応**: robots.txt、sitemap.xml自動生成
- **高速デプロイ**: Vercelの最適化された環境

### 🚀 今後の運用フロー
```bash
# 1. 新しいプレゼンテーション作成
mkdir MY-NEW-TALK

# 2. スライド作成
# MY-NEW-TALK/slides.md を編集

# 3. 設定ファイル更新
# package.json と scripts/build-index.js を更新

# 4. デプロイ
git add .
git commit -m "Add new presentation"
git push origin main

# 5. 数分後に本番サイトに反映！ 🎊
```

## 💡 Tips & Best Practices

### Performance Optimization
- 画像は WebP 形式を使用
- スライド数が多い場合は lazy loading 検討
- Vercel Analytics の活用

### Security
- HTTPS 自動対応（Vercel標準）
- セキュリティヘッダー設定済み
- 依存関係の定期更新

### Monitoring
- Vercel Dashboardでパフォーマンス監視
- エラーログの定期確認
- アクセス解析の活用

この設定により、**プレゼンテーション作成に集中**でき、**インフラ運用は完全自動化**される理想的な環境が完成します！