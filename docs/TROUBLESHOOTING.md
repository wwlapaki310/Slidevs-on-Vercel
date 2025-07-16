# 🛠️ トラブルシューティングガイド

Vercelデプロイ時によくあるエラーと解決方法をまとめています。

## 🚨 よくあるエラーと対処法

### 1. npm install エラー

#### エラー内容
```bash
npm error code ETARGET
npm error notarget No matching version found for @slidev/cli@^0.52.4
npm error notarget In most cases you or one of your dependencies are requesting
npm error notarget a package version that doesn't exist.
```

#### 原因
- Slidevのバージョン指定が間違っている
- 存在しないバージョンを指定している

#### 解決方法
```bash
# 1. 最新バージョンを確認
npm view @slidev/cli version

# 2. package.json を更新
{
  "dependencies": {
    "@slidev/cli": "^52.0.0",  // 最新バージョンに更新
    "@slidev/theme-default": "latest",
    "vue": "^3.4.31"
  }
}

# 3. コミット・プッシュ
git add package.json
git commit -m "Update Slidev to latest version"
git push origin main
```

### 2. Node.js バージョンエラー

#### エラー内容
```bash
Error: Node.js version 18.x is not supported
Slidev requires Node.js 20 or higher
```

#### 解決方法
```json
// vercel.json に追加
{
  "functions": {
    "app/**/*.js": {
      "runtime": "nodejs20.x"
    }
  }
}
```

### 3. ビルドタイムアウトエラー

#### エラー内容
```bash
Error: Command "npm run build" timed out after 300 seconds
```

#### 解決方法
```json
// vercel.json に追加
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

### 4. 依存関係エラー

#### エラー内容
```bash
npm ERR! peer dep missing: playwright-chromium@^1.45.1
```

#### 解決方法
```json
// package.json の devDependencies に追加
{
  "devDependencies": {
    "playwright-chromium": "^1.45.1"
  }
}
```

### 5. メモリ不足エラー

#### エラー内容
```bash
JavaScript heap out of memory
```

#### 解決方法
```json
// package.json の scripts に追加
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' npm run build:all"
  }
}
```

## 🔍 デバッグ手順

### Step 1: ローカルでビルド確認
```bash
# ローカルで同じビルドコマンドを実行
npm ci
npm run build

# エラーが出る場合はローカルで修正
```

### Step 2: Vercelログの確認
1. Vercelダッシュボード → プロジェクト選択
2. 「Functions」タブ → 失敗したデプロイを選択
3. 「Build Logs」でエラー詳細を確認

### Step 3: 段階的デバッグ
```bash
# 最小構成でテスト
git checkout -b debug-build

# 1. package.json のみ修正
# 2. 他のファイルは後で追加
# 3. 段階的にデプロイテスト
```

## 📋 チェックリスト

### デプロイ前確認
- [ ] package.json の依存関係バージョン確認
- [ ] ローカルでの `npm run build` 成功確認
- [ ] vercel.json の設定確認
- [ ] Node.js バージョン指定

### エラー発生時
- [ ] Vercelビルドログの確認
- [ ] ローカルでの再現確認
- [ ] 依存関係の更新確認
- [ ] キャッシュクリア (`rm -rf node_modules package-lock.json`)

## 🆘 エスカレーション手順

### 1. 自力解決できない場合
1. **GitHub Issues検索**
   - [Slidev Issues](https://github.com/slidevjs/slidev/issues)
   - [Vercel Community](https://github.com/vercel/vercel/discussions)

2. **コミュニティ相談**
   - [Slidev Discord](https://chat.sli.dev/)
   - [Vercel Discord](https://vercel.com/discord)

### 2. Issue作成時の情報
```markdown
## 環境情報
- Node.js version: 
- npm version: 
- Slidev version: 
- OS: 

## エラー内容
[ビルドログを添付]

## 再現手順
1. 
2. 
3. 

## 期待される動作
[説明]
```

## 💡 予防策

### 定期メンテナンス
```bash
# 月1回の依存関係更新
npm update
npm audit fix

# 新しいバージョンの確認
npm outdated
```

### 安定化設定
```json
// package.json
{
  "engines": {
    "node": ">=20.0.0",
    "npm": ">=10.0.0"
  }
}
```

### 監視設定
- Vercel通知の有効化
- GitHub Actions による定期チェック
- 依存関係の脆弱性監視

## 🔄 復旧手順

### 緊急時のロールバック
```bash
# 1. 前回のコミットに戻る
git revert HEAD

# 2. または安定版ブランチに切り替え
git checkout stable
git push origin main

# 3. Vercelで手動デプロイ
```

### 段階的復旧
1. **最小構成で復旧**
2. **機能を段階的に追加**
3. **各段階でテスト**
4. **問題箇所の特定・修正**

このガイドにより、多くの一般的な問題を迅速に解決できるようになります！
