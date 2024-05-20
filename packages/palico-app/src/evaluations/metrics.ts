import {
  AgentRequestContent,
  AgentResponse,
} from '@palico-ai/common';
import { EvalMetric, EvalMetricOutput } from './types';

export interface ExactMatchParams {
  expected: Pick<AgentResponse, 'message' | 'data'>;
}

export class ExactMatchEvalMetric implements EvalMetric {
  private params: ExactMatchParams;

  constructor(params: ExactMatchParams) {
    this.params = params;
  }

  async evaluate(
    _: AgentRequestContent,
    response: AgentResponse,
  ): Promise<EvalMetricOutput> {
    if (response.message !== this.params.expected.message) {
      return false;
    }
    if (response.data !== this.params.expected.data) {
      return false;
    }
    return true;
  }
}

export class ProfessionalismEvalMetric implements EvalMetric {
  name = 'professionalism';

  async evaluate(): Promise<EvalMetricOutput> {
    const random = Math.random() * 100;
    return parseInt(random.toFixed(2));
  }
}