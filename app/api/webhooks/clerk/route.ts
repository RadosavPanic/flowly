import { prisma } from "@/utils/prisma/prisma";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const event = await verifyWebhook(req);

    if (event.type === "user.created") {
      try {
        await prisma.user.create({
          data: {
            id: event.data.id!,
            username: event.data.username!,
            email: event.data.email_addresses[0].email_address!,
          },
        });
      } catch (error) {
        return new Response(`Failed to create a user: ${error}`, {
          status: 500,
        });
      }
    }

    return new Response("Webhook received", { status: 200 });
  } catch (error) {
    console.error("Error verifying webhook:", error);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
