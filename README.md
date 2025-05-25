# Lion Mastra - Multi-Agent Activity Planning System

このプロジェクトは、[Mastra](https://mastra.ai/)フレームワークを使用して構築された**マルチエージェントシステム**です。天気情報とタスク管理を組み合わせた、インテリジェントな活動計画支援システムを提供します。

## 🌟 特徴

### マルチエージェントアーキテクチャ
- **AgentNetwork**: LLMベースの動的ルーティングで複数の専門エージェントを協調
- **インテリジェントルーティング**: タスクの内容に応じて最適なエージェントを自動選択
- **シームレスな連携**: エージェント間での情報共有とコンテキスト継承

### 専門エージェント

#### 🌤️ Weather & Task Management Agent
- **天気情報の取得**: Open-Meteo APIを使用した正確な天気予報
- **場所ベースのタスク管理**: 位置情報と天気を考慮したタスク分割
- **天気考慮型計画**: 天気条件に応じた準備項目の自動提案
- **自律的ワークフロー**: 場所→天気→タスク分割→動機付けの完全自動化

#### 📋 Planning Specialist Agent  
- **包括的計画立案**: 旅行・イベント・プロジェクトの構造化された計画
- **段階的タスク分解**: 論理的フェーズに基づく詳細なサブタスク作成
- **リソース最適化**: 時間配分、優先度設定、依存関係の管理
- **リスク評価**: 潜在的課題の特定と代替案の提案

## 🚀 技術スタック

| 技術 | 用途 | バージョン |
|------|------|-----------|
| **Mastra Framework** | エージェント・ワークフロー管理 | ^0.10.0 |
| **Gemini 2.5 Flash Preview** | 最新Google AI言語モデル | - |
| **Open-Meteo API** | 天気情報取得 | - |
| **LibSQL** | データストレージ | ^0.10.0 |
| **TypeScript** | 型安全な開発 | ^5.8.3 |
| **Zod** | スキーマ検証 | ^3.25.28 |

## 📁 プロジェクト構造

```
lion-mastra/
├── src/
│   ├── mastra/
│   │   ├── agents/
│   │   │   ├── weather-agent.ts      # 天気・タスク管理エージェント
│   │   │   └── planning-agent.ts     # 計画専門エージェント
│   │   ├── networks/
│   │   │   └── activity-network.ts   # マルチエージェントネットワーク
│   │   ├── tools/
│   │   │   ├── weather-tool.ts       # 天気情報取得ツール
│   │   │   └── task-tool.ts          # タスク管理ツール（CRUD操作）
│   │   ├── workflows/
│   │   │   └── weather-workflow.ts   # 天気ワークフロー
│   │   └── index.ts                  # メインエクスポート
│   └── examples/
│       └── multi-agent-example.ts    # 使用例・デモ
├── package.json                      # 依存関係・スクリプト
├── tsconfig.json                     # TypeScript設定
└── README.md                         # プロジェクト説明
```

## 🛠️ セットアップ

### 前提条件
- **Node.js**: >=20.9.0
- **Google AI API Key**: Gemini APIアクセス用

### インストール手順

1. **リポジトリのクローン**
   ```bash
   git clone <repository-url>
   cd lion-mastra
   ```

2. **依存関係のインストール**
   ```bash
   npm install
   ```

3. **環境変数の設定**
   ```bash
   # .env ファイルを作成
   echo "GOOGLE_GENERATIVE_AI_API_KEY=your-api-key-here" > .env
   
   # または環境変数として設定
   export GOOGLE_GENERATIVE_AI_API_KEY="your-api-key-here"
   ```

4. **開発サーバーの起動**
   ```bash
   npm run dev
   ```

5. **ビルド（本番用）**
   ```bash
   npm run build
   ```

## 💡 使用例

### 基本的な使用方法

```typescript
import { activityNetwork } from './src/mastra/networks/activity-network';

// 1. 天気のみの質問 → Weather Agent
const weatherResult = await activityNetwork.generate(
  "今日の東京の天気はどうですか？"
);

// 2. 計画のみの質問 → Planning Agent
const planningResult = await activityNetwork.generate(
  "来月の会社の歓送迎会を企画してください。参加者は30人です。"
);

// 3. 複合的な質問 → 両エージェントの協調
const complexResult = await activityNetwork.generate(
  "来週末に京都への2泊3日の旅行を天気を考慮して計画してください。"
);

// 4. 場所ベースのタスク → Weather Agent（自律的ワークフロー）
const taskResult = await activityNetwork.generate(
  "明日、渋谷で買い物をする予定です。タスクリストを作ってください。"
);
```

### デモの実行

```bash
# TypeScriptで直接実行
npx ts-node src/examples/multi-agent-example.ts

# または開発サーバー経由
npm run dev
```

## 🎯 主な機能

### 1. インテリジェントルーティング
- **自動判断**: ユーザーの質問内容を分析し、最適なエージェントを選択
- **動的連携**: 必要に応じて複数エージェントを順次または並行実行
- **コンテキスト保持**: エージェント間での情報継承と一貫性維持

### 2. 天気考慮型タスク管理
- **自律的ワークフロー**: 場所→天気検索→タスク分割→登録→動機付けを自動実行
- **天気適応**: 雨・雪・暑さ・寒さに応じた準備項目の自動追加
- **位置精度**: 日本語地名の英語変換とOpen-Meteo API対応

### 3. 構造化された計画立案
- **段階的分解**: 大きな目標を実行可能な小タスクに分割
- **優先度管理**: 重要度と緊急度に基づく優先順位付け
- **依存関係**: タスク間の前後関係と並行実行可能性の考慮

### 4. 動機付けとサポート
- **励ましメッセージ**: タスク完了への具体的で前向きな言葉かけ
- **実行支援**: 次のアクションが明確になる具体的アドバイス
- **成功体験**: 達成可能な目標設定でユーザーの自信向上

## 🔧 カスタマイズ

### 新しいエージェントの追加

```typescript
import { Agent } from '@mastra/core/agent';
import { google } from '@ai-sdk/google';

// 新しい専門エージェントを作成
const budgetAgent = new Agent({
  name: 'Budget Management Agent',
  instructions: `
    You are a financial planning specialist...
  `,
  model: google('gemini-2.5-flash-preview-05-20'),
  tools: { /* 予算管理ツール */ },
});

// ネットワークに追加
import { AgentNetwork } from '@mastra/core/network';

const expandedNetwork = new AgentNetwork({
  name: 'Enhanced Activity Network',
  instructions: '...',
  model: google('gemini-2.5-flash-preview-05-20'),
  agents: [weatherAgent, planningAgent, budgetAgent],
});
```

### カスタムツールの作成

```typescript
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

const restaurantTool = createTool({
  id: 'restaurant-search',
  description: 'Search for restaurants in a specific area',
  inputSchema: z.object({
    location: z.string().describe('Location to search'),
    cuisine: z.string().optional().describe('Cuisine type'),
    budget: z.enum(['low', 'medium', 'high']).optional(),
  }),
  outputSchema: z.object({
    restaurants: z.array(z.object({
      name: z.string(),
      rating: z.number(),
      priceRange: z.string(),
    })),
  }),
  execute: async ({ input }) => {
    // レストラン検索ロジック
    return { restaurants: [] };
  },
});
```

## 🧪 テスト・デバッグ

### エージェント履歴の確認

```typescript
// 個別エージェントの履歴
const weatherHistory = activityNetwork.getAgentHistory('weather-agent');

// 全エージェントの相互作用履歴
const allHistory = activityNetwork.getAgentInteractionHistory();

// 時系列サマリー
const summary = activityNetwork.getAgentInteractionSummary();
console.log(summary);
```

### ログレベルの調整

```typescript
// src/mastra/index.ts
import { PinoLogger } from '@mastra/loggers';

export const mastra = new Mastra({
  // ...
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'debug', // info, warn, error, debug
  }),
});
```

## 📊 パフォーマンス

### 推奨使用パターン

| シナリオ | 推奨アプローチ | 理由 |
|----------|---------------|------|
| 単純な天気確認 | Weather Agent直接 | 高速、低コスト |
| 複雑な旅行計画 | AgentNetwork | 包括的、高品質 |
| 日常タスク管理 | Weather Agent | 実用的、効率的 |
| イベント企画 | Planning Agent → Weather Agent | 構造化 + 天気考慮 |

### リソース使用量
- **トークン消費**: AgentNetworkはWorkflowより多めだが、品質が向上
- **レスポンス時間**: 単一エージェント < AgentNetwork < 複数エージェント連携
- **メモリ使用**: LibSQL（軽量）またはファイルベース永続化

## 📚 参考資料

- [Mastra公式ドキュメント](https://mastra.ai/docs)
- [AgentNetwork API リファレンス](https://mastra.ai/docs/reference/networks/agent-network)
- [Open-Meteo API ドキュメント](https://open-meteo.com/en/docs)
- [Google AI Gemini API](https://ai.google.dev/gemini-api/docs)
- [Zod スキーマ検証](https://zod.dev/)

## 🤝 コントリビューション

### 開発への参加
1. **Issue作成**: バグ報告や機能要望
2. **Pull Request**: コード改善や新機能追加
3. **ドキュメント**: 使用例や説明の改善

### 開発ガイドライン
- **TypeScript**: 型安全性を重視
- **Zod**: 入出力スキーマの明確な定義
- **テスト**: 新機能には使用例を含める
- **ドキュメント**: コード変更時はREADME更新

## 📄 ライセンス

このプロジェクトは**ISC License**の下で公開されています。

---

## 🚀 クイックスタート

```bash
# 1. セットアップ
npm install
echo "GOOGLE_GENERATIVE_AI_API_KEY=your-key" > .env

# 2. デモ実行
npx ts-node src/examples/multi-agent-example.ts

# 3. 開発開始
npm run dev
```

**質問やサポートが必要な場合は、Issueを作成してください！** 🙋‍♂️ 