# Slidevs-on-Vercel

🎪 **単一リポジトリで複数のSlidevプレゼンテーションを管理するシステム**

このプロジェクトは、pnpmワークスペースとVercelでの自動デプロイを使用して、単一のリポジトリ内で複数の[Slidev](https://sli.dev/)プレゼンテーションを効率的に管理する方法を実演します。

[English](README.md) | [简体中文](README.zh-CN.md) | **日本語**

## 🌐 ライブデモ

- **メインサイト**: *新しいVercel URLに更新予定*
- **Slidev システムデモ（英語）**: *新しいVercel URL/slidev-system/ に更新予定*
- **Slidev システムデモ（中文）**: *新しいVercel URL/slidev-system-zh/ に更新予定*
- **Slidev システムデモ（日本語）**: *新しいVercel URL/slidev-system-ja/ に更新予定*

## ✨ 機能

- 🏗️ **複数プレゼンテーション管理**: 一つのリポジトリで複数のSlidevプレゼンテーションを管理
- 🚀 **自動デプロイ**: GitHub → Vercel 連携による自動デプロイ
- 🎤 **発表者モード**: `/{slide-name}/presenter/` で発表者モードアクセス
- 📋 **概要モード**: `/{slide-name}/overview/` で概要モードアクセス
- 🌍 **多言語対応**: 英語、中国語、日本語でのプレゼンテーション
- 📱 **レスポンシブデザイン**: モバイル・デスクトップ最適化
- 🔄 **効率的な開発**: pnpmワークスペースによる合理化されたワークフロー

## 🏗️ アーキテクチャ

```
Slidevs-on-Vercel/
├── slides/
│   ├── slidev-system/           # プレゼンテーション: システム概要（英語）
│   │   └── src/
│   │       ├── slides.md        # Slidev マークダウンコンテンツ
│   │       └── package.json     # プレゼンテーション固有の設定
│   ├── slidev-system-zh/        # プレゼンテーション: システム概要（中文）
│   │   └── src/
│   └── slidev-system-ja/        # プレゼンテーション: システム概要（日本語）
│       └── src/
├── scripts/
│   ├── build-index.js          # メインランディングページ生成
│   ├── create-slide.js         # 新規プレゼンテーション作成スクリプト
│   └── slide-metadata.json     # プレゼンテーションメタデータ
├── dist/                       # ビルド出力ディレクトリ
├── package.json               # ルートパッケージ設定
├── pnpm-workspace.yaml        # pnpmワークスペース設定
└── vercel.json               # Vercelデプロイ設定
```

## 🚀 クイックスタート

### 前提条件

- Node.js 18+
- pnpm 8+

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/wwlapaki310/Slidevs-on-Vercel.git
cd Slidevs-on-Vercel

# 依存関係をインストール
pnpm install
```

### 開発

```bash
# slidev-system プレゼンテーション（英語）の開発サーバーを開始
pnpm dev:slidev-system

# slidev-system プレゼンテーション（中文）の開発サーバーを開始
pnpm dev:slidev-system-zh

# slidev-system プレゼンテーション（日本語）の開発サーバーを開始
pnpm dev:slidev-system-ja

# プレゼンテーションは以下で利用可能になります:
# http://localhost:3030
```

### ビルド

```bash
# 全プレゼンテーションをビルドしてインデックスページを生成
pnpm build

# ビルド出力は ./dist/ にあります
```

## 📝 新規プレゼンテーションの追加

### 方法1: create-slideスクリプトを使用

```bash
pnpm create-slide
```

### 方法2: 手動セットアップ

1. 新しいディレクトリを作成: `slides/{your-slide-name}/src/`
2. `slides.md` と `package.json` を追加
3. ルート `package.json` スクリプトを更新:
   ```json
   {
     "scripts": {
       "build": "npm run build:{your-slide-name} && npm run build:index",
       "build:{your-slide-name}": "cd slides/{your-slide-name}/src && npm run build",
       "dev:{your-slide-name}": "cd slides/{your-slide-name}/src && npm run dev"
     }
   }
   ```
4. `vercel.json` にルーティングを追加:
   ```json
   {
     "rewrites": [
       { "source": "/{your-slide-name}/:path*", "destination": "/{your-slide-name}/:path*" }
     ]
   }
   ```
5. `scripts/slide-metadata.json` にプレゼンテーション情報を更新

## ⚙️ 技術スタック

- **フロントエンド**: [Slidev](https://sli.dev/) (Vue.jsベース)
- **ホスティング**: [Vercel](https://vercel.com/)
- **パッケージマネージャー**: [pnpm](https://pnpm.io/) with workspace
- **ビルドシステム**: カスタムNode.jsスクリプト
- **スタイリング**: [Tailwind CSS](https://tailwindcss.com/)

## 🔧 設定

### pnpm ワークスペース

プロジェクトはpnpmワークスペースを使用して複数のプレゼンテーションを管理します：

```yaml
# pnpm-workspace.yaml
packages:
  - "slides/*/src"
```

### Vercel デプロイ

以下を通じて自動デプロイが設定されています：

- **ビルドコマンド**: `pnpm build`
- **出力ディレクトリ**: `dist`
- **Node.jsバージョン**: 18.x

## 📊 プレゼンテーション構造

各プレゼンテーションは以下の構造に従います：

```
slides/{presentation-name}/
└── src/
    ├── slides.md           # メインプレゼンテーションコンテンツ
    ├── package.json        # ビルド設定
    ├── components/         # オプション: カスタムVueコンポーネント
    └── assets/            # オプション: 画像とリソース
```

プレゼンテーション用の `package.json` 例：

```json
{
  "name": "your-presentation",
  "private": true,
  "scripts": {
    "build": "slidev build --base /your-presentation/ --out ../../../dist/your-presentation",
    "dev": "slidev --open",
    "export": "slidev export"
  },
  "dependencies": {
    "@slidev/cli": "^0.49.0",
    "@slidev/theme-default": "latest"
  }
}
```

## 🌍 多言語対応

このプロジェクトは完全な多言語対応を提供します：

- **英語版**: `/slidev-system/` - メイン言語
- **中国語版**: `/slidev-system-zh/` - 简体中文
- **日本語版**: `/slidev-system-ja/` - 日本語

各言語版は独立してビルド・更新され、統一されたアーキテクチャの下で管理されます。

## 🎯 ユースケース

- **技術カンファレンス**: 複数の会議プレゼンテーションを管理
- **研修資料**: コース教材とワークショップの整理
- **チームプレゼンテーション**: チーム間での知識共有
- **ポートフォリオ**: プレゼンテーションスキルの披露
- **ドキュメント**: インタラクティブなドキュメントとチュートリアル

## 🤝 コントリビューション

コントリビューションを歓迎します！プルリクエストの提出をお気軽にどうぞ。

## 📄 ライセンス

このプロジェクトはMITライセンスの下でライセンスされています - 詳細は[LICENSE](LICENSE)ファイルをご覧ください。

## 🔗 リンク

- **Slidev ドキュメント**: https://sli.dev/
- **Vercel ドキュメント**: https://vercel.com/docs
- **pnpm ワークスペース**: https://pnpm.io/workspaces

---

**❤️ Slidev + Vercel + pnpm workspace で構築**