# Portkey

Portkey is an AI Gateway that allows you to connect to multiple AI models and providers using a single API. You can setup Portkey [locally](https://github.com/Portkey-AI/gateway), or use the hosted version at [https://portkey.ai](https://portkey.ai).

## Installation

```bash
npm install portkey
```

## Usage

### Example Usage

```typescript
import { Portkey } from 'portkey';

class ChatbotAgent implements Agent {
  async chat(
    content: ConversationRequestContent,
    context: ConversationContext
  ): Promise<LLMAgentResponse> {
    const { userMessage } = content;
    // Create Portkey client
    const portkey = new Portkey({
      Authorization: "Bearer sk-xxxxx",
      provider: "openai",
    });
    // Call the API
    const response = await portkey.chat.completions.create({
      messages: [{ role: 'user', content: userMessage }],
      model: 'gpt-3.5-turbo',
    });
    return {
      message: response.choices[0].message.content,
    };
  }
}
```