# Lion Mastra - Multi-Agent Activity Planning System

このプロジェクトは、[Mastra](https://mastra.ai/)フレームワークを使用して構築されたマルチエージェントシステムです。天気情報とタスク管理を組み合わせた、インテリジェントな活動計画支援システムを提供します。

## 🌟 特徴

### マルチエージェントアーキテクチャ
- **AgentNetwork**: LLMベースのルーティングで複数の専門エージェントを協調させる
- **動的エージェント選択**: タスクの内容に応じて最適なエージェントを自動選択
- **コンテキスト共有**: エージェント間での情報共有とシームレスな連携

### 専門エージェント

#### 🌤️ Weather & Task Management Agent
- 天気情報の取得と分析
- 場所ベースのタスク管理
- 天気を考慮したタスク分割
- Open-Meteo APIを使用した正確な天気予報

#### 📋 Planning Specialist Agent  
- 包括的な計画立案
- 旅行・イベント・プロジェクト計画
- 構造化されたタスク分解
- リソース配分と最適化

## 🚀 使用技術

- **Mastra Framework**: エージェントとワークフローの管理
- **Gemini 2.5 Flash Preview**: 最新のGoogle AI言語モデル
- **Open-Meteo API**: 天気情報の取得
- **LibSQL**: データストレージ
- **TypeScript**: 型安全な開発

## 📁 プロジェクト構造

```
src/
├── mastra/
│   ├── agents/
│   │   ├── weather-agent.ts      # 天気・タスク管理エージェント
│   │   └── planning-agent.ts     # 計画専門エージェント
│   ├── networks/
│   │   └── activity-network.ts   # マルチエージェントネットワーク
│   ├── tools/
│   │   ├── weather-tool.ts       # 天気情報取得ツール
│   │   └── task-tool.ts          # タスク管理ツール
│   ├── workflows/
│   │   └── weather-workflow.ts   # 天気ワークフロー
│   └── index.ts                  # メインエクスポート
├── examples/
│   └── multi-agent-example.ts    # 使用例
└── ...
```

## 🛠️ セットアップ

1. **依存関係のインストール**
   ```bash
   npm install
   ```

2. **環境変数の設定**
   ```bash
   # Google AI API キーを設定
   export GOOGLE_GENERATIVE_AI_API_KEY="your-api-key"
   ```

3. **開発サーバーの起動**
   ```bash
   npm run dev
   ```

## 💡 使用例

### 基本的な使用方法

```typescript
import { activityNetwork } from './src/mastra/networks/activity-network';

// 天気に関する質問（Weather Agentにルーティング）
const weatherResult = await activityNetwork.generate(
  "今日の東京の天気はどうですか？"
);

// 計画に関する質問（Planning Agentにルーティング）
const planningResult = await activityNetwork.generate(
  "来月の会社イベントを企画してください"
);

// 複合的な質問（両方のエージェントを使用）
const complexResult = await activityNetwork.generate(
  "来週末の京都旅行を天気を考慮して計画してください"
);
```

### デモの実行

```bash
npx ts-node src/examples/multi-agent-example.ts
```

## 🎯 主な機能

### 1. インテリジェントルーティング
- ユーザーの質問内容を分析
- 最適なエージェントを自動選択
- 必要に応じて複数エージェントを連携

### 2. 天気考慮型タスク管理
- 場所ベースのタスクに天気情報を自動統合
- 天気に応じたタスク分割
- 適切な準備項目の提案

### 3. 構造化された計画立案
- 段階的なプロジェクト分解
- 優先度とタイムラインの設定
- リソース要件の考慮

### 4. 動機付けとサポート
- タスク完了への励ましメッセージ
- 実行可能な具体的アドバイス
- ユーザーエンゲージメントの向上

## 🔧 カスタマイズ

### 新しいエージェントの追加

```typescript
import { Agent } from '@mastra/core/agent';
import { google } from '@ai-sdk/google';

const newAgent = new Agent({
  name: 'New Specialist Agent',
  instructions: 'Your specialized instructions...',
  model: google('gemini-2.5-flash-preview-05-20'),
  tools: { /* your tools */ },
});

// ネットワークに追加
const expandedNetwork = new AgentNetwork({
  // ... existing config
  agents: [weatherAgent, planningAgent, newAgent],
});
```

### ツールの拡張

```typescript
import { createTool } from '@mastra/core/tools';

const customTool = createTool({
  id: 'custom-tool',
  description: 'Custom functionality',
  inputSchema: z.object({
    // your schema
  }),
  outputSchema: z.object({
    // your schema  
  }),
  execute: async ({ input }) => {
    // your implementation
  },
});
```

## 📚 参考資料

- [Mastra Documentation](https://mastra.ai/docs)
- [AgentNetwork Reference](https://mastra.ai/docs/reference/networks/agent-network)
- [Open-Meteo API](https://open-meteo.com/)
- [Google AI Gemini](https://ai.google.dev/)

## 🤝 コントリビューション

プルリクエストやイシューの報告を歓迎します。新機能の提案や改善案がありましたら、お気軽にお知らせください。

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。 