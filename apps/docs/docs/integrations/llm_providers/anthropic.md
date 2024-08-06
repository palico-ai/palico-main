# Anthropic

If you are using an Anthropic model, you can directly call the Anthropic model using the `@anthropic-ai/sdk` package from within your `Agent`, or use an AI Gateway like `Portkey` to connect to the Anthropic model.

## Calling Anthropic via Anthropic SDK

### Installation

```bash
npm install @anthropic-ai/sdk
```

### Usage

```typescript
class ChatbotAgent implements Agent {
  static readonly client = new AnthropicClient({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  async chat(
    content: ConversationRequestContent,
    context: ConversationContext
  ): Promise<LLMAgentResponse> {
    const { userMessage } = content;
    const response = await client.messages.create({
      messages: [{ role: 'user', content: userMessage }],
      model: 'claude-3-opus-20240229',
      max_tokens: 1000
    });
    return {
      message: response.content,
    };
  }
}
```

## Calling Anthropic via Portkey

Make sure you have portkey setup by following the [Portkey Integration Guide](./portkey.md). For the post up-to-date information on how to call Anthropic via Portkey, please refer to the [Portkey Documentation](https://docs.portkey.ai/docs/welcome/integration-guides/anthropic).

### Usage

```typescript
class ChatbotAgent implements Agent {
  async chat(
    content: ConversationRequestContent,
    context: ConversationContext
  ): Promise<LLMAgentResponse> {
    const { userMessage } = content;
    // Create Portkey client
    const portkey = new Portkey({
      apiKey: "PORTKEY_API_KEY",
      virtualKey: "ANTHROPIC_VIRTUAL_KEY"
    });
    // Call the API
    const response = await portkey.chat.completions.create({
      messages: [{ role: 'user', content: userMessage }],
      model: 'anthropic.claude-3-opus-20240229',
      maxTokens: 1000
    });
    // Return the response
    return {
      message: response.choices[0].message.content,
    };
  }
}
```