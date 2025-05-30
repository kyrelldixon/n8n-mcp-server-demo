import redaxios from "redaxios";
import { UserError } from "fastmcp";

interface WebhookPayload {
  idea: string;
}

export async function triggerWebhook(webhookUrl: string, payload: WebhookPayload) {
  try {
    const response = await redaxios.post(webhookUrl, payload);
    return JSON.stringify(response.data, null, 2);
  } catch (error) {
    console.error("Error triggering webhook:", error);
    throw new UserError("Error triggering webhook");
  }
}
