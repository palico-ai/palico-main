import {
  ConversationRequestContent,
  ConversationResponse,
  EvalMetric,
  EvalMetricOutput,
} from '@palico-ai/common';
import * as rogue from 'rouge';

interface RogueNMetricsParams {
  n: number;
  referenceSummary: string;
}

export class RogueNMetrics implements EvalMetric {
  label = 'rogue-n';

  constructor(private params: RogueNMetricsParams) {}

  async evaluate(
    _: ConversationRequestContent,
    response: ConversationResponse
  ): Promise<EvalMetricOutput> {
    const value = rogue.n(
      response.message,
      this.params.referenceSummary,
      this.params.n ?? 1
    );
    return value;
  }
}

export interface RogueLCSMetricsParams {
  referenceSummary: string;
}

export class RogueLCSMetrics implements EvalMetric {
  label = 'rogue-lcs';

  constructor(private params: RogueLCSMetricsParams) {}

  async evaluate(
    _: ConversationRequestContent,
    response: ConversationResponse
  ): Promise<EvalMetricOutput> {
    const value = rogue.l(response.message, this.params.referenceSummary);
    return value;
  }
}

export interface RogueSkipBigramMetricsParams {
  referenceSummary: string;
}

export class RogueSkipBigramMetrics implements EvalMetric {
  label = 'rogue-sbg';

  constructor(private params: RogueSkipBigramMetricsParams) {}

  async evaluate(
    _: ConversationRequestContent,
    response: ConversationResponse
  ): Promise<EvalMetricOutput> {
    const value = rogue.s(response.message, this.params.referenceSummary);
    return value;
  }
}
