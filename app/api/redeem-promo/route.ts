import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getPromoCodeByName } from "@/data/promoCodes";
import { writeClient } from "@/sanity/lib/client";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, code, name } = await request.json();

    // Validate input
    if (!email || !code || !name) {
      return NextResponse.json(
        { error: "Email, promo code, and name are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Get promo code from Sanity by name
    const promoCode = await getPromoCodeByName(name);

    if (!promoCode) {
      return NextResponse.json({ error: "This promotion is no longer available" }, { status: 400 });
    }

    // Validate the entered code matches the stored code
    if (promoCode.code !== code.toUpperCase()) {
      return NextResponse.json(
        { error: "Wrong promo code. Please check and try again." },
        { status: 400 }
      );
    }

    // Check if PDF URL exists
    if (!promoCode.freeBookPdfUrl) {
      console.error("No PDF URL found for promo code:", name);
      return NextResponse.json(
        { error: "Book file not available. Please contact support." },
        { status: 500 }
      );
    }

    // Download the PDF file
    const pdfResponse = await fetch(promoCode.freeBookPdfUrl);
    if (!pdfResponse.ok) {
      console.error("Failed to fetch PDF:", promoCode.freeBookPdfUrl);
      return NextResponse.json(
        { error: "Failed to retrieve book file. Please try again." },
        { status: 500 }
      );
    }

    const pdfBuffer = await pdfResponse.arrayBuffer();
    const pdfBase64 = Buffer.from(pdfBuffer).toString("base64");

    // Send email with PDF attachment
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL || "CivilEn Publishing <info@civilenpublishing.com>";

    const { error: emailError } = await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: `Your Free Book: ${promoCode.book.title}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #2e2d2d; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #ea5422; color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #ffffff; padding: 30px 20px; border: 1px solid #e5e5e5; border-top: none; }
            .button { display: inline-block; background-color: #ea5422; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; margin: 20px 0; }
            .footer { background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
            .highlight { background-color: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 4px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Your Free Book is Here!</h1>
            </div>
            <div class="content">
              <h2>Hi there!</h2>
              <p>Thank you for redeeming your promo code!</p>
              <p>We're excited to share <strong>"${promoCode.freeBookPdfFilename || promoCode.book.title}"</strong> with you. You'll find the PDF attached to this email.</p>
              
              <div class="highlight">
                <strong>⭐ Enjoyed the book?</strong>
                <p style="margin: 10px 0 0 0;">We'd love to hear your thoughts! Your review helps other engineers discover our resources.</p>
                <a href="${promoCode.reviewUrl}" style="color: #ea5422; font-weight: bold;">Leave a Review →</a>
              </div>
              
              <p>Happy reading!</p>
              <p><strong>The CivilEn Publishing Team</strong></p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} CivilEn Publishing. All Rights Reserved.</p>
              <p>CivilEn Publishing 8345 NW 66 ST MIAMI, FL 33166</p>
            </div>
          </div>
        </body>
        </html>
      `,
      attachments: [
        {
          filename:
            promoCode.freeBookPdfFilename ||
            `${promoCode.book.title.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`,
          content: pdfBase64,
        },
      ],
    });

    if (emailError) {
      console.error("Email sending failed:", emailError);
      return NextResponse.json(
        { error: "Failed to send email. Please try again." },
        { status: 500 }
      );
    }

    // Increment usage count and save purchaser in Sanity
    try {
      // Update usage count
      await writeClient.patch(promoCode._id).inc({ usageCount: 1 }).commit();

      // Check if purchaser already exists with this email and promo code
      const existingPurchaser = await writeClient.fetch(
        `*[_type == "purchaser" && email == $email && promoCode._ref == $promoCodeId][0]`,
        { email, promoCodeId: promoCode._id }
      );

      if (existingPurchaser) {
        // Update existing purchaser's redemption timestamp
        await writeClient
          .patch(existingPurchaser._id)
          .set({ redeemedAt: new Date().toISOString() })
          .commit();
      } else {
        // Create new purchaser record
        await writeClient.create({
          _type: "purchaser",
          email: email,
          promoCode: {
            _type: "reference",
            _ref: promoCode._id,
          },
          promoCodeUsed: code.toUpperCase(),
          book: {
            _type: "reference",
            _ref: promoCode.book._id,
          },
          redeemedAt: new Date().toISOString(),
        });
      }

      // Add purchaser to subscribers if they don't already exist
      const existingSubscriber = await writeClient.fetch(
        `*[_type == "subscriber" && email == $email][0]`,
        { email }
      );

      if (existingSubscriber) {
        // Reactivate if inactive
        if (!existingSubscriber.active) {
          await writeClient
            .patch(existingSubscriber._id)
            .set({ active: true, subscribedAt: new Date().toISOString() })
            .commit();
        }
      } else {
        // Create new subscriber
        await writeClient.create({
          _type: "subscriber",
          email,
          source: "promo-redeem",
          subscribedAt: new Date().toISOString(),
          active: true,
        });
      }
    } catch (patchError) {
      // Log but don't fail the request
      console.error(
        "Failed to update usage count, create purchaser, or add subscriber:",
        patchError
      );
    }

    return NextResponse.json({
      success: true,
      message: "Free book sent to your email!",
    });
  } catch (error) {
    console.error("Promo redemption error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
