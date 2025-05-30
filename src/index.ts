import { FastMCP } from "fastmcp";
import { z } from "zod";
import { triggerWebhook } from "./trigger-webhook";
import { add } from "./add";
import { UserError } from "fastmcp";

const server = new FastMCP({
  name: "Addition",
  version: "1.0.0",
});

server.addTool({
  annotations: {
    openWorldHint: false, // This tool doesn't interact with external systems
    readOnlyHint: true, // This tool doesn't modify anything
    title: "Addition",
  },
  description: "Add two numbers",
  execute: async (args) => {
    return String(add(args.a, args.b));
  },
  name: "add",
  parameters: z.object({
    a: z.number().describe("The first number"),
    b: z.number().describe("The second number"),
  }),
});

const WebhookPayloadSchema = z.object({
  webhookUrl: z.string().optional().describe("The webhook URL you want to trigger. If not provided, the webhook URL from the environment variable will be used."),
  idea: z.string().describe("The idea you want to send to n8n for processing"),
});

server.addTool({
  annotations: {
    openWorldHint: true,
    readOnlyHint: true,
    title: "Trigger Webhook",
  },
  description: "Trigger a webhook with an idea as the payload",
  execute: async (args) => {
    const url = args.webhookUrl || process.env.WEBHOOK_URL;
    if (!url) {
      throw new UserError("WEBHOOK_URL is not set. Update .env file.");
    }
    return await triggerWebhook(url, { idea: args.idea });
  },
  name: "trigger-webhook",
  parameters: WebhookPayloadSchema,
});

server.start({
  transportType: "stdio",
});
