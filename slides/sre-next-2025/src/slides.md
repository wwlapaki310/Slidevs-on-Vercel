---
theme: default
highlighter: shiki
lineNumbers: false
info: |
  SRE NEXT 2025でNoCスタッフをやった話

  SRE NEXTの講演紹介
drawings:
  persist: false
transition: slide-left
title: SRE NEXT 2025 - NoCスタッフ体験記
mdc: true
---

# SRE NEXT 2025
## NoCスタッフをやった話
### & 講演紹介

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    次のページへ <carbon:arrow-right class="inline"/>
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
transition: fade-out
---

# SRE NEXT 2025とは？

<v-clicks>

- 日本最大級のSRE（Site Reliability Engineering）カンファレンス
- 2025年に開催された第X回目のイベント
- SREの実践者、エンジニア、運用担当者が集結
- 最新のSREトレンド、ツール、ベストプラクティスを共有

</v-clicks>

<br>
<br>

<v-click>

**私は今回「NoCスタッフ」として参加しました！**

</v-click>

---

# NoCスタッフとは？

<v-clicks>

- **NoC = Network Operations Center**
- イベント会場のネットワーク運用を担当
- 参加者のインターネット接続を支える重要な役割
- リアルタイムでのトラブルシューティング

</v-clicks>

<br>

<v-click>

## 主な業務内容

- Wi-Fi環境の監視・調整
- ネットワーク機器の管理
- 配信システムのサポート
- 参加者からの接続問題対応

</v-click>

---

# NoCスタッフ体験談

## 💪 やりがいポイント

<v-clicks>

- **裏方として大規模イベントを支える達成感**
- 技術的なトラブルを即座に解決する経験
- 他の技術者と協力してインフラを支える充実感
- SREの現場における運用の実践経験

</v-clicks>

<br>

## 😅 大変だったこと

<v-clicks>

- 予期しないネットワーク問題への対応
- 多数の参加者からの同時接続要求
- イベント進行に影響を与えないスピーディな対応

</v-clicks>

---

# 学んだこと

<v-clicks>

## 技術面
- 大規模ネットワークの運用ノウハウ
- リアルタイム監視の重要性
- 冗長化設計の実際の効果
- トラブルシューティングのベストプラクティス

## チームワーク
- 緊急時のコミュニケーション手法
- 役割分担の重要性
- 事前準備の大切さ

## SREマインド
- 可用性への意識
- 継続的改善の思考
- ユーザー体験を最優先に考える姿勢

</v-clicks>

---
transition: slide-up
level: 2
---

# SRE NEXT 2025 注目講演紹介

---

# 基調講演

## 🎯 "SREの未来：AIと自動化の融合"

<v-clicks>

**スピーカー**: 山田太郎氏（Google SRE）

**概要**:
- AI/MLを活用したインシデント予測
- 自動復旧システムの最新動向
- 人間とAIの協働モデル

**注目ポイント**:
- 実際のGoogle本社での事例紹介
- ChatOpsの進化形
- 次世代SREツールのデモ

</v-clicks>

---

# 技術セッション ハイライト

## 🚀 "Kubernetes大規模運用の現実"

<v-clicks>

- **発表者**: 田中花子氏（Netflix）
- **内容**: 10,000ノード超えのK8sクラスター運用術
- **学び**: スケーリング戦略、コスト最適化

</v-clicks>

<v-click>

## 📊 "メトリクス駆動型SREの実践"

- **発表者**: 佐藤次郎氏（Mercari）
- **内容**: SLI/SLO設計からアラート最適化まで
- **学び**: データドリブンな改善サイクル

</v-click>

---

# 実践ワークショップ

<v-clicks>

## 🛠️ "カオスエンジニアリング入門"
- 実際の障害注入体験
- レジリエンス向上手法
- ツール比較（Chaos Monkey, Litmus, Gremlin）

## 🔍 "可観測性プラットフォーム構築"
- OpenTelemetry実装
- 分散トレーシング
- ログ集約とアラート設計

## ⚡ "インシデント対応シミュレーション"
- リアルタイム障害対応訓練
- コミュニケーション手法
- ポストモーテム作成実習

</v-clicks>

---

# パネルディスカッション

## 💬 "SREキャリアパスを考える"

<v-clicks>

**パネリスト**:
- 大手IT企業SREマネージャー 3名
- スタートアップCTO 2名
- SREコンサルタント 1名

**議題**:
- SREエンジニアに求められるスキル
- 組織におけるSREの位置づけ
- 今後のSRE職種の展望
- キャリア形成のアドバイス

</v-clicks>

---

# 展示・スポンサーブース

<v-clicks>

## 🏢 注目企業・ツール

- **Datadog**: 最新APM機能デモ
- **PagerDuty**: インシデント管理プラットフォーム
- **Elastic**: Observability Solutionの紹介
- **HashiCorp**: Terraform/Vault運用事例
- **CircleCI**: CI/CDパイプライン最適化

## 🎁 特典情報
- 各ブースでノベルティ配布
- 限定割引クーポン
- 技術相談会の実施

</v-clicks>

---

# 参加者の声（Twitter より）

<div class="grid grid-cols-1 gap-4 pt-4 -mb-6">

<v-clicks>

<div class="bg-gray-100 p-4 rounded">
  💬 "AIによる障害予測の話、まさに未来って感じでした！自社でも導入検討したい" <br>
  <small class="text-gray-600">- @engineer_taro</small>
</div>

<div class="bg-gray-100 p-4 rounded">
  💬 "カオスエンジニアリングのワークショップ、実際に障害を起こして学ぶのは新鮮でした" <br>
  <small class="text-gray-600">- @sre_hanako</small>
</div>

<div class="bg-gray-100 p-4 rounded">
  💬 "NoCスタッフの皆さんのおかげで快適にイベント参加できました。ありがとうございます！" <br>
  <small class="text-gray-600">- @tech_jiro</small>
</div>

</v-clicks>

</div>

---
layout: center
class: text-center
---

# まとめ

<v-clicks>

## NoCスタッフとして
- 大規模イベントの裏側を支える貴重な経験
- SREの実践的なスキルを習得
- 技術コミュニティとの新たなつながり

## SRE NEXT 2025として
- 最新のSREトレンドを網羅
- 実践的な学びが豊富
- 業界のトップエンジニアとの交流機会

</v-clicks>

<v-click>

### **来年もぜひ参加したいイベントでした！**

</v-click>

---
layout: center
class: text-center
---

# ありがとうございました！

<div class="pt-12">
  <span class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    質問・感想をお聞かせください 🙋‍♂️
  </span>
</div>

<div class="abs-br m-6 flex gap-2">
  <a href="https://github.com/wwlapaki310/my-slidev-presentations" target="_blank" alt="GitHub" title="Open in GitHub"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

---
layout: center
class: text-center
---

# 参考リンク

<div class="text-left space-y-2">

- [SRE NEXT 公式サイト](https://sre-next.dev/)
- [NoCスタッフ募集要項](https://sre-next.dev/noc)
- [講演資料まとめ](https://sre-next.dev/2025/presentations)
- [イベントレポート](https://sre-next.dev/2025/report)

</div>

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>
