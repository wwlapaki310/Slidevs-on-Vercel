# My Slidev Presentations

📊 **SRE NEXT 2025 - NoCスタッフをやった話**

SRE NEXT2025でNoCスタッフをやった話とSRE NEXTの講演紹介

## 🚀 Live Demo

**メインプレゼンテーション**: https://my-slidev-eight.vercel.app/

### 利用可能なモード

- **通常モード**: https://my-slidev-eight.vercel.app/
- **発表者モード**: https://my-slidev-eight.vercel.app/presenter/
- **概要モード**: https://my-slidev-eight.vercel.app/overview/
- **PDF出力**: `npm run export`

## 📁 プロジェクト構成

```
my-slidev-presentations/
├── SRE-NEXT-2025/
│   └── slides.md          # メインスライド
├── package.json
├── vercel.json            # Vercel設定（公式推奨）
└── README.md
```

## 🛠️ 開発

### ローカル開発

```bash
# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

### ビルド

```bash
# 本番用ビルド
npm run build

# ローカルプレビュー
npm run preview
```

### PDF出力

```bash
npm run export
```

## 🌐 デプロイ

Vercelに自動デプロイされます。

### Vercel設定

公式ドキュメント推奨の最小設定：

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## 📝 スライド編集

`SRE-NEXT-2025/slides.md`を編集してください。

Slidevの詳細な使い方は[公式ドキュメント](https://ja.sli.dev/)を参照してください。

## 🔧 技術スタック

- **Slidev**: スライド作成フレームワーク
- **Vue.js**: フロントエンドフレームワーク  
- **Vercel**: ホスティングプラットフォーム
- **Markdown**: スライド記述言語

## 📚 参考リンク

- [Slidev公式ドキュメント](https://ja.sli.dev/)
- [Slidev GitHub](https://github.com/slidevjs/slidev)
- [Vercel](https://vercel.com/)

---

**Built with ❤️ using Slidev**