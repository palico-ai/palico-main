# GCP Vertex AI

If you are using a model hosted on GCP Vertex AI, you can directly call the GCP Vertex AI model using the `@google-cloud/vertexai` package from within your `Agent`, or use an AI Gateway like `Portkey` to connect to the GCP Vertex AI model.

## Calling GCP Vertex AI via GCP Vertex AI SDK

For the most up-to-date information on how to call GCP Vertex AI via the GCP Vertex AI SDK, please refer to the [npm package docs](https://www.npmjs.com/package/@google-cloud/vertexai).

### Installation

```bash
npm install @google-cloud/vertexai
```

### Usage

```typescript
import {
  FunctionDeclarationSchemaType,
  HarmBlockThreshold,
  HarmCategory,
  VertexAI
} from '@google-cloud/vertexai';

class ChatbotAgent implements Agent {

  async chat(
    content: ConversationRequestContent,
    context: ConversationContext
  ): Promise<LLMAgentResponse> {
    const { userMessage } = content;
    // Create VertexAI client
    const client = new VertexAI({
      project: "PROJECT_ID",
      location: "LOCATION",
    });
    const model = client.getGenerativeModel({
      model: textModel,
      // The following parameters are optional
      // They can also be passed to individual content generation requests
      safetySettings: [{category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE}],
      generationConfig: {maxOutputTokens: 1000},
    });


    const response = await model.generateContent({
      contents: [{role: 'user', content: parts: [{text: userMessage}]}],
    });
    return {
      message: response.contents[0].parts[0].text,
    };
  }
}
```

## Calling GCP Vertex AI via Portkey

Make sure you have Portkey setup by following the [Portkey Integration Guide](./portkey.md). For the most up-to-date information on how to call GCP Vertex AI via Portkey, please refer to the [Portkey Documentation](https://docs.portkey.ai/docs/welcome/integration-guides/vertex-ai).

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
      virtualKey: "VERTEX_AI_VIRTUAL_KEY"
    });
    // Call the API
    const response = await portkey.chat.completions.create({
      messages: [{ role: 'user', content: userMessage }],
      model: 'gemini-pro',
      maxTokens: 1000
    },
    {
      authorization: "VERTEX_AI_ACCESS_KEY"
    });
    return {
      message: response.choices[0].message.content,
    };
  }
}
```
