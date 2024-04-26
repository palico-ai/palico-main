import { LLMAgent } from "../agent";

export interface AgentItem {
  agent: LLMAgent;
  id: string;
}

export class PalicoApp {
  readonly agents: AgentItem[]

  constructor() {
    this.agents = []
  }

  addAgent(id: string, agent: LLMAgent, ) {
    this.agents.push({ agent, id })
  }
}