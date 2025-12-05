import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/client";

/**
 * POST /api/unsubscribe
 * Unsubscribe an email from the newsletter
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Find the subscriber by email
    const subscriber = await writeClient.fetch(
      `*[_type == "subscriber" && email == $email][0]{ _id, active }`,
      { email: email.toLowerCase() }
    );

    if (!subscriber) {
      // Don't reveal if email exists or not for privacy
      return NextResponse.json({
        success: true,
        message: "If this email was subscribed, it has been unsubscribed.",
      });
    }

    if (!subscriber.active) {
      return NextResponse.json({
        success: true,
        message: "This email is already unsubscribed.",
      });
    }

    // Update the subscriber to inactive
    await writeClient.patch(subscriber._id).set({ active: false }).commit();

    console.log(`[Unsubscribe] Successfully unsubscribed: ${email}`);

    return NextResponse.json({
      success: true,
      message: "You have been successfully unsubscribed from our newsletter.",
    });
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return NextResponse.json({ error: "Failed to process unsubscribe request" }, { status: 500 });
  }
}

/**
 * GET /api/unsubscribe?email=xxx
 * Handle unsubscribe from email link (one-click unsubscribe)
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const encodedEmail = searchParams.get("email");
  const token = searchParams.get("token");

  if (!encodedEmail) {
    return NextResponse.redirect(new URL("/unsubscribe", request.url));
  }

  try {
    // Decode the email from base64
    const email = Buffer.from(encodedEmail, "base64").toString("utf-8");

    // Verify token if provided (optional security layer)
    if (token) {
      const expectedToken = Buffer.from(
        `${email}-unsubscribe-${process.env.SANITY_WEBHOOK_SECRET || "secret"}`
      )
        .toString("base64")
        .slice(0, 16);
      if (token !== expectedToken) {
        return NextResponse.redirect(new URL("/unsubscribe?error=invalid", request.url));
      }
    }

    // Find and update the subscriber
    const subscriber = await writeClient.fetch(
      `*[_type == "subscriber" && email == $email][0]{ _id, active }`,
      { email: email.toLowerCase() }
    );

    if (subscriber && subscriber.active) {
      await writeClient.patch(subscriber._id).set({ active: false }).commit();
      console.log(`[Unsubscribe] One-click unsubscribed: ${email}`);
    }

    // Redirect to success page
    return NextResponse.redirect(new URL("/unsubscribe?success=true", request.url));
  } catch (error) {
    console.error("One-click unsubscribe error:", error);
    return NextResponse.redirect(new URL("/unsubscribe?error=true", request.url));
  }
}
