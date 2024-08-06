# AWS Bedrock

To use a model hosted on AWS Bedrock, you can either use the [AWS Bedrock SDK](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/javascript_bedrock-runtime_code_examples.html) or use an AI Gateway like [Portkey](./portkey.md) to connect to the AWS Bedrock model.

## Calling AWS Bedrock via AWS Bedrock SDK

### Installation

```bash
npm install @aws-sdk/client-bedrock-runtime
```

### Usage

```typescript
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

class ChatbotAgent implements Agent {
  static readonly client = new BedrockRuntimeClient({ region: process.env.AWS_REGION });

  async chat(
    content: ConversationRequestContent,
    context: ConversationContext
  ): Promise<LLMAgentResponse> {
    const { userMessage } = content;
    // Create request parameters
    const payload = {
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: 1000,
      messages: [{ role: "user", content: [{ type: "text", text: userMessage }] }],
    };

    // Call the API
    const apiResponse = await client.send(
      new InvokeModelCommand({
        contentType: "application/json",
        body: JSON.stringify(payload),
        modelId: "anthropic.claude-3-haiku-20240307-v1:0",
      }),
    );

    // Parse the response
    const decodedResponseBody = new TextDecoder().decode(apiResponse.body);
    const responseBody = JSON.parse(decodedResponseBody);

    // Return the response
    return {
      message: responseBody.content[0].text,
    };
  }
}
```

## Calling AWS Bedrock via Portkey
Make sure you have Portkey setup by following the [Portkey Integration Guide](./portkey.md). For the most up-to-date information on how to call AWS Bedrock via Portkey, please refer to the [Portkey Documentation](https://docs.portkey.ai/docs/welcome/integration-guides/aws-bedrock).

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
      virtualKey: "AWS_BEDROCK_VIRTUAL_KEY"
    });
    // Call the API
    const response = await portkey.chat.completions.create({
      messages: [{ role: 'user', content: userMessage }],
      model: 'anthropic.claude-3-haiku-20240307-v1:0',
      maxTokens: 1000
    });
    // Return the response
    return {
      message: response.choices[0].message.content,
    };
  }
}
```