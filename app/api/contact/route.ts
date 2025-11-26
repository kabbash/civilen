import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email-contact";

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("[Contact Form] RESEND_API_KEY not configured");
      throw new Error("Email service not configured");
    }

    console.log(`[Contact Form] Processing message from ${name} (${email})`);
    console.log(`[Contact Form] Subject: ${subject}`);

    // Send email
    const result = await sendContactEmail({
      name,
      email,
      subject,
      message,
    });

    console.log(`[Contact Form] Email send result:`, result);

    if (!result.success) {
      console.error("[Contact Form] Failed to send email:", result.error);
      throw new Error("Failed to send email");
    }

    console.log(`[Contact Form] ✅ Message sent successfully from ${name} (${email})`);

    return NextResponse.json(
      {
        message: "Message sent successfully! We will get back to you soon.",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}

// Optional: Add GET method to verify endpoint is working
export async function GET() {
  return NextResponse.json({
    message: "Contact form endpoint is active",
    endpoint: "/api/contact",
  });
}
