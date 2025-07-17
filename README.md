# My Slidev Presentations

📊 **複数のSlidevプレゼンテーションを管理するワークスペース**

## 🚀 Live Demo

**メインページ**: https://my-slidev-eight.vercel.app/

### 利用可能なプレゼンテーション

- **SRE NEXT 2025**: https://my-slidev-eight.vercel.app/sre-next-2025/
  - **発表者モード**: https://my-slidev-eight.vercel.app/sre-next-2025/presenter/
  - **概要モード**: https://my-slidev-eight.vercel.app/sre-next-2025/overview/

## 📁 プロジェクト構成（Phase 2 - ワークスペース構造）

```
my-slidev-presentations/
├── pnpm-workspace.yaml        # ワークスペース設定
├── package.json               # ルートパッケージ
├── sre-next-2025/             # 各プレゼンテーション
│   └── src/
│       ├── slides.md          # スライド内容
│       └── package.json       # 個別設定
├── dist/                      # ビルド成果物
│   ├── index.html             # インデックスページ
│   └── sre-next-2025/         # ビルドされたスライド
├── scripts/
│   └── build-index.js         # インデックス生成
└── vercel.json                # Vercel設定
```

## 🛠️ 開発

### ローカル開発

```bash
# 特定のプレゼンテーションを開発
npm run dev:sre-next-2025
```

### ビルド

```bash
# 全プレゼンテーションをビルド
npm run build

# 特定のプレゼンテーションのみビルド
npm run build:sre-next-2025
```

## 🌐 デプロイ

Vercelに自動デプロイされます。複数スライド対応のルーティング設定：

```json
{
  "rewrites": [
    { 
      "source": "/sre-next-2025/(.*)", 
      "destination": "/sre-next-2025/index.html" 
    },
    { 
      "source": "/", 
      "destination": "/index.html" 
    }
  ]
}
```

## 📝 現在のプレゼンテーション

### SRE NEXT 2025 - NoCスタッフ体験記

- **内容**: SRE NEXT 2025でNoCスタッフをやった話とSRE NEXTの講演紹介
- **トピック**: SRE, NoC, インフラ, 運用
- **更新**: 2025-07-17

## 🔧 技術スタック

- **Slidev**: スライド作成フレームワーク
- **pnpm workspace**: モノレポ管理
- **Vue.js**: フロントエンドフレームワーク  
- **Vercel**: ホスティングプラットフォーム
- **Markdown**: スライド記述言語

## 📈 開発ロードマップ

- ✅ **Phase 1**: 基盤安定化（単一スライド）
- ✅ **Phase 2**: ワークスペース構成への移行
- 🚧 **Phase 3**: 2つ目のスライド追加
- 📋 **Phase 4**: インデックスページと完成

## 🆕 新しいプレゼンテーション追加方法

1. 新しいディレクトリを作成: `{presentation-name}/src/`
2. `{presentation-name}/src/package.json` と `slides.md` を作成
3. ルート `package.json` にビルドスクリプトを追加
4. `scripts/build-index.js` にプレゼンテーション情報を追加
5. `vercel.json` にルーティング設定を追加

## 📚 参考リンク

- [Slidev公式ドキュメント](https://ja.sli.dev/)
- [pnpm workspace](https://pnpm.io/workspaces)
- [Vercel](https://vercel.com/)
- [参考実装](https://zenn.dev/jy8752/articles/ad565a43ba0e0a)

---

**Built with ❤️ using Slidev + pnpm workspace**
