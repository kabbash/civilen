import { NextResponse } from "next/server";
import { Resend } from "resend";
import { client } from "@/sanity/lib/client";

const resend = new Resend(process.env.RESEND_API_KEY);

interface Purchaser {
  email: string;
}

interface Book {
  title: string;
  reviewUrl: string | null;
}

export async function POST(request: Request) {
  try {
    const { bookId } = await request.json();

    if (!bookId) {
      return NextResponse.json({ error: "Book ID is required" }, { status: 400 });
    }

    // Get book details including reviewUrl
    const book = await client.fetch<Book | null>(
      `*[_type == "book" && _id == $bookId][0] { title, reviewUrl }`,
      { bookId }
    );

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    if (!book.reviewUrl) {
      return NextResponse.json(
        { error: "This book does not have a review URL configured" },
        { status: 400 }
      );
    }

    // Get all purchasers for this book
    const purchasers = await client.fetch<Purchaser[]>(
      `*[_type == "purchaser" && book._ref == $bookId] { email }`,
      { bookId }
    );

    if (purchasers.length === 0) {
      return NextResponse.json({ error: "No purchasers found for this book" }, { status: 404 });
    }

    const fromEmail =
      process.env.CONTACT_FROM_EMAIL || "CivilEn Publishing <info@civilenpublishing.com>";
    let emailsSent = 0;
    const errors: string[] = [];
    const reviewUrl = book.reviewUrl;

    // Send emails to all purchasers
    for (const purchaser of purchasers) {
      try {
        await resend.emails.send({
          from: fromEmail,
          to: [purchaser.email],
          subject: `How did you like "${book.title}"? Leave a review! ⭐`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #2e2d2d; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #ea5422; color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
                .content { background-color: #ffffff; padding: 30px 20px; border: 1px solid #e5e5e5; border-top: none; }
                .button { display: inline-block; background-color: #ea5422; color: white; padding: 14px 35px; text-decoration: none; border-radius: 4px; margin: 20px 0; font-weight: bold; }
                .footer { background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
                .stars { font-size: 32px; margin: 20px 0; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>We'd Love Your Feedback! ⭐</h1>
                </div>
                <div class="content">
                  <h2>Hi there!</h2>
                  <p>We hope you've been enjoying <strong>"${book.title}"</strong>!</p>
                  <p>Your opinion matters to us and helps other engineers discover quality resources. Would you take a moment to share your thoughts?</p>
                  
                  <div class="stars">⭐⭐⭐⭐⭐</div>
                  
                  <p style="text-align: center;">
                    <a href="${reviewUrl}" class="button">Leave a Review on Amazon</a>
                  </p>
                  
                  <p>It only takes a minute, and it means the world to us!</p>
                  <p>Thank you for being part of our community.</p>
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
        });
        emailsSent++;
      } catch (emailError) {
        console.error(`Failed to send email to ${purchaser.email}:`, emailError);
        errors.push(`Failed to send to ${purchaser.email}`);
      }
    }

    return NextResponse.json({
      success: true,
      emailsSent,
      totalPurchasers: purchasers.length,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("Review reminder error:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
