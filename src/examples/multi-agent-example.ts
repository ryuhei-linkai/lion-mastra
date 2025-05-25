import { activityNetwork } from '../mastra/networks/activity-network';

// Example usage of the Activity Planning Network
async function demonstrateMultiAgentSystem() {
  console.log('🌐 Activity Planning Network Demo\n');

  // Example 1: Weather-focused query (should route to Weather Agent)
  console.log('📍 Example 1: Weather-focused query');
  try {
    const weatherResult = await activityNetwork.generate(
      "今日の東京の天気はどうですか？"
    );
    console.log('Response:', weatherResult.text);
  } catch (error) {
    console.error('Error:', error);
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Example 2: Planning-focused query (should route to Planning Agent)
  console.log('📋 Example 2: Planning-focused query');
  try {
    const planningResult = await activityNetwork.generate(
      "来月の会社の歓送迎会を企画してください。参加者は30人程度です。"
    );
    console.log('Response:', planningResult.text);
  } catch (error) {
    console.error('Error:', error);
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Example 3: Complex query requiring both agents
  console.log('🎯 Example 3: Complex query requiring both agents');
  try {
    const complexResult = await activityNetwork.generate(
      "来週末に京都への2泊3日の旅行を計画してください。天気も考慮して詳細なプランを作ってください。"
    );
    console.log('Response:', complexResult.text);
  } catch (error) {
    console.error('Error:', error);
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Example 4: Location-based task with weather considerations
  console.log('🛍️ Example 4: Location-based task with weather considerations');
  try {
    const taskResult = await activityNetwork.generate(
      "明日、渋谷で買い物をする予定です。タスクリストを作ってください。"
    );
    console.log('Response:', taskResult.text);
  } catch (error) {
    console.error('Error:', error);
  }

  // Show agent interaction history
  console.log('\n📊 Agent Interaction Summary:');
  console.log(activityNetwork.getAgentInteractionSummary());
}

// Export for use in other files
export { demonstrateMultiAgentSystem };

// Run demo if this file is executed directly
if (require.main === module) {
  demonstrateMultiAgentSystem()
    .then(() => console.log('\n✅ Demo completed successfully!'))
    .catch(error => console.error('❌ Demo failed:', error));
} 