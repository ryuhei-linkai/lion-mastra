import { Mastra } from '@mastra/core';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { weatherWorkflow } from './workflows/weather-workflow';
import { weatherAgent } from './agents/weather-agent';
import { planningAgent } from './agents/planning-agent';
import { activityNetwork } from './networks/activity-network';

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { 
    weatherAgent,
    planningAgent,
  },
  networks: {
    activityNetwork,
  },
  storage: new LibSQLStore({
    // stores telemetry, evals, ... into memory storage, if it needs to persist, change to file:../mastra.db
    url: ":memory:",
  }),
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
});

// Export individual components for direct access
export { weatherAgent } from './agents/weather-agent';
export { planningAgent } from './agents/planning-agent';
export { activityNetwork } from './networks/activity-network';
