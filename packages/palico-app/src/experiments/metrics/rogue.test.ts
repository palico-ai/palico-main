import { ConversationResponse } from '@palico-ai/common';
import { RogueNMetrics } from './rogue';

describe('Test Rogue Metrics', () => {
  it('Returns the correct metric value for RogueN', async () => {
    const metric = new RogueNMetrics({
      n: 1,
      referenceSummary:
        'magnetic pulse series sent through brain may ease schizophrenic voices',
    });

    const sample1: ConversationResponse = {
      conversationId: '1',
      requestId: '1',
      message: 'pulses may ease schizophrenic voices',
    };
    const result1 = await metric.evaluate({}, sample1);
    expect(result1).toBe(0.4);
    const sample2: ConversationResponse = {
      conversationId: '1',
      requestId: '1',
      message:
        'yale finds magnetic stimulation some relief to schizophrenics imaginary voices',
    };
    const result2 = await metric.evaluate({}, sample2);
    expect(result2).toBe(0.2);
    const sample3: ConversationResponse = {
      conversationId: '1',
      requestId: '1',
      message: 'no match',
    };
    const result3 = await metric.evaluate({}, sample3);
    expect(result3).toBe(0);
  });
});
