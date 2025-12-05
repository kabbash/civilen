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
    // Return a simple HTML page for manual unsubscribe
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
      <head>
        <title>Unsubscribe - CivilEn Publishing</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: #f5f5f5; }
          .container { text-align: center; padding: 40px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 400px; }
          h1 { color: #ea5422; margin-bottom: 20px; }
          p { color: #666; margin-bottom: 20px; }
          a { color: #ea5422; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Unsubscribe</h1>
          <p>Invalid unsubscribe link. Please use the link from your email.</p>
          <a href="/">← Back to Homepage</a>
        </div>
      </body>
      </html>`,
      { status: 400, headers: { "Content-Type": "text/html" } }
    );
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
        return new NextResponse(
          `<!DOCTYPE html>
          <html>
          <head>
            <title>Unsubscribe Failed - CivilEn Publishing</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: #f5f5f5; }
              .container { text-align: center; padding: 40px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 400px; }
              h1 { color: #ea5422; margin-bottom: 20px; }
              p { color: #666; margin-bottom: 20px; }
              a { color: #ea5422; text-decoration: none; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Invalid Link</h1>
              <p>This unsubscribe link is invalid or has expired.</p>
              <a href="/">← Back to Homepage</a>
            </div>
          </body>
          </html>`,
          { status: 400, headers: { "Content-Type": "text/html" } }
        );
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

    // Return success page
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
      <head>
        <title>Unsubscribed - CivilEn Publishing</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: #f5f5f5; }
          .container { text-align: center; padding: 40px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 400px; }
          h1 { color: #ea5422; margin-bottom: 20px; }
          .checkmark { font-size: 48px; margin-bottom: 20px; }
          p { color: #666; margin-bottom: 20px; }
          a { color: #ea5422; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="checkmark">✓</div>
          <h1>Successfully Unsubscribed</h1>
          <p>You have been removed from our newsletter. We're sorry to see you go!</p>
          <a href="/">← Back to Homepage</a>
        </div>
      </body>
      </html>`,
      { status: 200, headers: { "Content-Type": "text/html" } }
    );
  } catch (error) {
    console.error("One-click unsubscribe error:", error);
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
      <head>
        <title>Error - CivilEn Publishing</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: #f5f5f5; }
          .container { text-align: center; padding: 40px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 400px; }
          h1 { color: #ea5422; margin-bottom: 20px; }
          p { color: #666; margin-bottom: 20px; }
          a { color: #ea5422; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Something Went Wrong</h1>
          <p>We couldn't process your unsubscribe request. Please try again later.</p>
          <a href="/">← Back to Homepage</a>
        </div>
      </body>
      </html>`,
      { status: 500, headers: { "Content-Type": "text/html" } }
    );
  }
}

