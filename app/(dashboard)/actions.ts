"use server";

import { PubSub } from "@google-cloud/pubsub";

const pubSubClient = new PubSub({ projectId: "autofeed-ai" });

export async function sendPubSubMessage(taskId: string) {
  const dataBuffer = Buffer.from(taskId);

  try {
    console.log("LOADING...");
    const messageId = await pubSubClient
      .topic("video-generation-requests")
      .publishMessage({ data: dataBuffer });
    console.log(`Message ${messageId} published.`);
  } catch (error) {
    console.error(
      `Received error while publishing: ${(error as Error).message}`,
    );
    process.exitCode = 1;
  }
}
