# Ollama

Ollama lets you run various LLM models on your own machine. You can setup Ollama by following the [Ollama Installation Guide](https://github.com/ollama/ollama).

## Usage
You can communicate with Ollama using the [Ollama NPM Package](https://www.npmjs.com/package/ollama). For the most up-to-date information on how to call Ollama, please refer to the official documentation.

### Installation

```bash
npm install ollama
```

### Usage

```typescript
import { Ollama } from 'ollama';

class ChatbotAgent implements Agent {
  static readonly client = new Ollama({
    apiKey: process.env.OLLAMA_API_KEY,
  });

  async chat(
    content: ConversationRequestContent,
    context: ConversationContext
  ): Promise<LLMAgentResponse> {
    const { userMessage } = content;
    const response = await ollama.chat({
      model: 'llama3',
      messages: [{ role: 'user', content: userMessage }],
    })
    return {
      message: response.choices[0].message.content,
    };
  }
}
```

## Calling Ollama via Portkey
You can also call Ollama via Portkey. Make sure you have Portkey setup by following the [Portkey Integration Guide](./portkey.md). For the most up-to-date information on how to call Ollama via Portkey, please refer to the [Portkey Documentation](https://docs.portkey.ai/docs/welcome/integration-guides/ollama).\

### Example Usage

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
      provider: "ollama",
      customHost: "https://7cc4-3-235-157-146.ngrok-free.app" // Your Ollama ngrok URL
    });
    // Call the API
    const response = await portkey.chat.completions.create({
      messages: [{ role: 'user', content: userMessage }],
      model: 'llama3',
    });
    // Return the response
    return {
      message: response.choices[0].message.content,
    };
  }
}
```