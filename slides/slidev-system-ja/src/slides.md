---
theme: default
background: https://source.unsplash.com/1920x1080/?technology,code,presentation
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Slidev と Vercel による複数スライド管理システム
  
  一つのリポジトリで複数のSlidevプレゼンテーションを構築・デプロイするための包括的ガイド
drawings:
  persist: false
transition: slide-left
title: Slidev 複数スライド管理システム
mdc: true
---

# Slidev × Vercel
## 複数スライド管理システム

**開発者のための効率的なプレゼンテーション管理システム**

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    システム概要を開始 <carbon:arrow-right class="inline"/>
  </span>
</div>

<div class="abs-br m-6 flex gap-2">
  <button @click="$slidev.nav.openInEditor()" title="エディターで開く" class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon:edit />
  </button>
  <a href="https://github.com/wwlapaki310/Slidevs-on-Vercel" target="_blank" alt="GitHub" title="GitHubで開く"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

---
transition: fade-out
---

# 🎯 システムの目標

一つのリポジトリで複数のSlidevプレゼンテーションを効率的に管理する

<v-clicks>

## 従来の課題
- **リポジトリの分散**: プレゼンテーションごとに個別のリポジトリ
- **デプロイの重複**: 同じ設定を何度も作成
- **管理の複雑さ**: 複数のURLとドメインの管理
- **リソースの非効率**: テーマやコンポーネントの重複

## 解決すること
- **統合管理**: 全プレゼンテーションを1つのリポジトリで
- **自動デプロイ**: Vercelでの一括デプロイ
- **URL の一貫性**: 一つのドメイン配下に複数スライド
- **効率的な開発**: 設定やコンポーネントの共有

</v-clicks>

---

# 🏗️ システムアーキテクチャ

## アーキテクチャ図

```mermaid
graph TD
    A[GitHub リポジトリ] --> B[pnpm ワークスペース]
    
    B --> C1[slidev-system-ja/src/]
    B --> C2[slidev-system/src/]
    B --> C3[slidev-system-zh/src/]
    
    C1 --> D1[ビルド: /slidev-system-ja/]
    C2 --> D2[ビルド: /slidev-system/]
    C3 --> D3[ビルド: /slidev-system-zh/]
    
    D1 --> E[Vercel 統合デプロイ]
    D2 --> E
    D3 --> E
    
    E --> F1[https://domain.com/slidev-system-ja/]
    E --> F2[https://domain.com/slidev-system/]
    E --> F3[https://domain.com/slidev-system-zh/]
    E --> F4[https://domain.com/ - ランディングページ]
    
    style A fill:#e1f5fe
    style E fill:#fff3e0
    style F4 fill:#c8e6c9
```

---

# 📁 プロジェクト構造

実際のディレクトリ構造とファイル配置

```
Slidevs-on-Vercel/
├── pnpm-workspace.yaml          # ワークスペース設定
├── package.json                 # ルートパッケージ管理
├── vercel.json                  # デプロイ・ルーティング設定
├── 
├── slides/                      # 全プレゼンテーションディレクトリ
│   ├── slidev-system-ja/        # 日本語システム概要プレゼンテーション
│   │   └── src/
│   │       ├── slides.md        # このスライドの内容！
│   │       └── package.json     # 個別ビルド設定
│   ├── slidev-system/           # 英語システム概要プレゼンテーション
│   │   └── src/
│   └── slidev-system-zh/        # 中国語システム概要プレゼンテーション
│       └── src/
│
├── dist/                        # ビルド成果物
│   ├── slidev-system-ja/        # ビルドされた日本語プレゼンテーション
│   ├── slidev-system/           # ビルドされた英語プレゼンテーション
│   ├── slidev-system-zh/        # ビルドされた中国語プレゼンテーション
│   └── index.html               # 生成されたランディングページ
│
└── scripts/
    ├── build-index.js           # ランディングページ生成器
    ├── create-slide.js          # 新規スライド作成ツール
    └── slide-metadata.json      # プレゼンテーションメタデータ
```

---

# ⚙️ 技術スタック詳細

構成要素と技術選択

<div class="grid grid-cols-2 gap-8">

<div>

## フロントエンド
- **Slidev 52.0.0**: Vue.jsベースのプレゼンテーションフレームワーク
- **Vue 3**: リアクティブコンポーネント
- **Markdown**: 直感的なスライド記述
- **Mermaid**: 図表・フローチャート

## ビルド・デプロイ
- **pnpm ワークスペース**: モノレポ管理
- **Vercel**: ホスティング + CI/CD
- **GitHub Actions**: 自動化ワークフロー

</div>

<div>

## パッケージ管理
- **npm/pnpm**: 依存関係解決
- **package-lock.json**: 決定論的ビルド
- **独立バージョニング**: スライドごとの依存関係管理

## ルーティング
- **Vercel リライト**: SPA スタイルルーティング
- **ベースパス**: 各スライドの独立パス
- **静的生成**: 高速ローディング

</div>

</div>

---

# 🔧 コア技術：pnpm ワークスペース

効率的なマルチパッケージ管理

<v-clicks>

## pnpm-workspace.yaml
```yaml
packages:
  - "slides/*/src"
```

## 個別スライドのpackage.json例
```json
{
  "name": "slidev-system-ja",
  "scripts": {
    "build": "slidev build --base /slidev-system-ja/ --out ../../../dist/slidev-system-ja"
  },
  "dependencies": {
    "@slidev/cli": "52.0.0",
    "@slidev/theme-default": "latest"
  }
}
```

## メリット
- **依存関係の共有**: 重複パッケージの削減
- **独立ビルド**: 各スライドを個別にビルド可能
- **統合管理**: 一つのルートから全てをコントロール

</v-clicks>

---

# 🌐 Vercel ルーティング設定

複数プレゼンテーションのための適切なルーティング

<v-clicks>

## vercel.json 設定
```json
{
  "rewrites": [
    { 
      "source": "/slidev-system-ja/:path*", 
      "destination": "/slidev-system-ja/:path*" 
    },
    { 
      "source": "/slidev-system/:path*", 
      "destination": "/slidev-system/:path*" 
    },
    { 
      "source": "/slidev-system-zh/:path*", 
      "destination": "/slidev-system-zh/:path*" 
    }
  ]
}
```

## URL 構造
- `https://slidevs-on-vercel.vercel.app/` - ランディングページ
- `https://slidevs-on-vercel.vercel.app/slidev-system-ja/` - この日本語プレゼンテーション
- `https://slidevs-on-vercel.vercel.app/slidev-system/` - 英語プレゼンテーション
- `https://slidevs-on-vercel.vercel.app/slidev-system-zh/` - 中国語プレゼンテーション

</v-clicks>

---

# 🏗️ ビルドプロセス詳細

ルートpackage.jsonによる統合ビルド管理

<v-clicks>

## ルート package.json
```json
{
  "name": "Slidevs-on-Vercel",
  "scripts": {
    "build": "npm run build:slidev-system-ja && npm run build:slidev-system && npm run build:slidev-system-zh && npm run build:index",
    "build:slidev-system-ja": "cd slides/slidev-system-ja/src && npm run build",
    "build:slidev-system": "cd slides/slidev-system/src && npm run build",
    "build:slidev-system-zh": "cd slides/slidev-system-zh/src && npm run build",
    "build:index": "node scripts/build-index.js",
    "dev:slidev-system-ja": "cd slides/slidev-system-ja/src && npm run dev"
  }
}
```

## ビルドフロー
1. **依存関係インストール**: `npm install`（全ワークスペース）
2. **個別ビルド**: 各スライドが`dist/`に出力
3. **インデックス生成**: `scripts/build-index.js`でランディングページ作成
4. **Vercel デプロイ**: 全ファイルを自動公開

</v-clicks>

---

# 📊 運用上のメリット

実際の開発・運用での利点

<div class="grid grid-cols-2 gap-4">

<div>

## 🚀 開発効率
<v-clicks>

- **統一環境**: 一つのIDEで全スライドを編集
- **設定共有**: ESLint、Prettierなどの統一設定
- **リアルタイムプレビュー**: `npm run dev:*`で即座にプレビュー
- **Git 履歴**: 一元化された変更管理

</v-clicks>

</div>

<div>

## 🎯 管理効率
<v-clicks>

- **単一リポジトリ**: 統一されたPRレビューとCI
- **自動デプロイ**: プッシュで全スライドが更新
- **統一ドメイン**: URL管理の簡素化
- **バックアップ**: 全プレゼンテーションの一括保護

</v-clicks>

</div>

</div>

<br>

<v-click>

## 🎪 拡張性
- **簡単追加**: 新しいディレクトリ作成で即座に新スライド
- **独立性**: 各スライドが独立してビルド・更新
- **テーマ共有**: 共通のコンポーネントやスタイルの再利用

</v-click>

---
layout: center
class: text-center
---

# まとめ

**Slidev × Vercel による効率的な複数スライド管理**

<v-clicks>

## ✨ 重要ポイント
- **単一リポジトリ**: 全プレゼンテーションの統合管理
- **自動デプロイ**: GitHubプッシュで即座に公開
- **拡張可能**: 簡単なスライド追加
- **効率的**: 設定共有とリソース再利用

## 🎯 効果
- **開発時間短縮**: 新規スライド作成30分以内
- **管理コスト削減**: 複数ドメイン運用不要
- **品質向上**: 統一されたテーマとスタイル
- **保守性向上**: 一元化された管理とバックアップ

</v-clicks>

<v-click>

### **今日から複数スライド管理を始めませんか？**

</v-click>

---
layout: center
class: text-center
---

# ありがとうございました！

<div class="pt-12">
  <span class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    ご質問・フィードバックをお待ちしています 🙋‍♂️
  </span>
</div>

<div class="abs-br m-6 flex gap-2">
  <a href="https://github.com/wwlapaki310/Slidevs-on-Vercel" target="_blank" alt="GitHub" title="リポジトリを見る"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>
