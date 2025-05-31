import { FastMCP } from "fastmcp";
import { z } from "zod";
import redaxios from "redaxios";
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

export async function startWorkflow<WorkflowInput>(webhookUrl: string, payload: WorkflowInput) {
  try {
    const response = await redaxios.post(webhookUrl, payload);
    return JSON.stringify(response.data, null, 2);
  } catch (error) {
    console.error("Error triggering webhook:", error);
    throw new UserError("Error triggering webhook");
  }
}

// You can send any type of data to n8n for processing. Create different zod schemas that match the data you want to send.
const WorkflowInputSchema = z.object({
  input: z.string().describe("Some string"),
});

export type WorkflowInput = z.infer<typeof WorkflowInputSchema>;

server.addTool({
  annotations: {
    openWorldHint: true,
    readOnlyHint: true,
    title: "Start Workflow",
  },
  description: "Start a workflow by triggering a webhook with a payload",
  execute: async (webhookInput) => {
    // Make sure you set this URL to be your n8n webhook URL
    const url = ""
    if (!url) {
      throw new UserError("The webhook URL is not set. Go to ./src/index.ts and set the webhook URL.");
    }
    return await startWorkflow<WorkflowInput>(url, webhookInput);
  },
  name: "start-workflow",
  parameters: WorkflowInputSchema,
});

server.start({
  transportType: "stdio",
});
