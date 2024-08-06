# OpenAI

You can use OpenAI models by directly calling the OpenAI API using the `openai` package from within your `Agent`, or use an AI Gateway like Portkey to connect to the OpenAI model.

## Calling OpenAI via OpenAI SDK

For the most up-to-date information on how to call OpenAI via the OpenAI SDK, please refer to the [npm package docs](https://www.npmjs.com/package/openai).

### Installation

```bash
npm install openai
```

### Usage

```typescript
import { OpenAI } from 'openai';

class ChatbotAgent implements Agent {
  static readonly client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async chat(
    content: ConversationRequestContent,
    context: ConversationContext
  ): Promise<LLMAgentResponse> {
    const { userMessage } = content;
    const client = new OpenAI({
      apiKey: process.env['OPENAI_API_KEY'],
    });

    const response = await client.chat.completions.create({
      messages: [{ role: 'user', content: userMessage }],
      model: 'gpt-3.5-turbo',
      maxTokens: 1000
    });
    return {
      message: response.choices[0].message.content,
    };
  }
}
```