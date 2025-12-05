import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/client";
import { sendEmail, generateArticleEmail, generateBookEmail } from "@/lib/email";

// Webhook version: 4.0 (personalized unsubscribe links)
// This webhook will be called by Sanity when new content is published
export async function POST(request: NextRequest) {
  try {
    // Verify the request is from Sanity (optional but recommended)
    const secret = request.headers.get("x-sanity-webhook-secret");

    if (process.env.SANITY_WEBHOOK_SECRET && secret !== process.env.SANITY_WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { _type, title, slug, description, fullDescription } = body;

    // Validate the content type
    if (!["article", "book"].includes(_type)) {
      return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
    }

    const slugString = slug?.current || slug;

    // Fetch all active subscribers
    const subscribers = await writeClient.fetch(
      `*[_type == "subscriber" && active == true]{ email }`
    );

    if (subscribers.length === 0) {
      return NextResponse.json({ message: "No active subscribers found" }, { status: 200 });
    }

    // Send individual emails with personalized unsubscribe links
    let successCount = 0;
    let failCount = 0;

    for (const subscriber of subscribers as { email: string }[]) {
      const emailContent =
        _type === "article"
          ? generateArticleEmail({ title, slug: slugString, description }, subscriber.email)
          : generateBookEmail(
              { title, slug: slugString, description, fullDescription },
              subscriber.email
            );

      const emailResult = await sendEmail({
        to: [subscriber.email],
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text,
      });

      if (emailResult.success) {
        successCount++;
      } else {
        failCount++;
        console.error(`[Webhook v4.0] Failed to send to: ${subscriber.email}`);
      }
    }

    console.log(`[Webhook v4.0] Successfully processed ${_type}: ${title}`);
    console.log(`[Webhook v4.0] Sent: ${successCount}, Failed: ${failCount}`);

    return NextResponse.json(
      {
        message: "Notification processed successfully",
        subscriberCount: subscribers.length,
        emailsSent: successCount,
        emailsFailed: failCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Failed to process webhook" }, { status: 500 });
  }
}

// Optional: Add GET method to verify webhook is working
export async function GET() {
  return NextResponse.json({
    message: "Newsletter notification webhook is active",
    endpoint: "/api/webhook/newsletter-notify",
    version: "3.0",
  });
}
