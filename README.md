# SRE NEXT 2025 - NoCスタッフ体験記

📊 **SRE NEXT 2025でNoCスタッフをやった話 & 講演紹介**

## 🚀 Live Demo

**プレゼンテーション**: https://my-slidev-eight.vercel.app/

### 利用可能なモード

- **通常モード**: https://my-slidev-eight.vercel.app/
- **発表者モード**: https://my-slidev-eight.vercel.app/presenter/
- **概要モード**: https://my-slidev-eight.vercel.app/overview/

## 📁 プロジェクト構成

```
my-slidev-presentations/
├── slides.md              # メインスライド
├── package.json           # Slidev標準設定
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

### ビルド・エクスポート

```bash
# 本番用ビルド
npm run build

# PDF出力
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

## 📝 スライド内容

- **NoCスタッフ体験談**: 大規模イベントのネットワーク運用の裏側
- **SRE NEXT 2025レポート**: 注目講演・ワークショップの紹介
- **学んだこと**: SREの実践的なスキルとマインドセット

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