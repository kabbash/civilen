import { NextResponse } from "next/server";
import { Resend } from "resend";
import { client, writeClient } from "@/sanity/lib/client";

const resend = new Resend(process.env.RESEND_API_KEY);

interface BookWithSample {
  _id: string;
  title: string;
  samplePdfUrl: string | null;
  samplePdfFilename: string | null;
}

export async function POST(request: Request) {
  try {
    const { email, bookId } = await request.json();

    // Validate input
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    if (!bookId) {
      return NextResponse.json(
        { error: "Book ID is required" },
        { status: 400 }
      );
    }

    // Get book with sample PDF
    const book = await client.fetch<BookWithSample | null>(
      `*[_type == "book" && _id == $bookId][0] {
        _id,
        title,
        "samplePdfUrl": samplePdf.asset->url,
        "samplePdfFilename": samplePdf.asset->originalFilename
      }`,
      { bookId }
    );

    if (!book) {
      return NextResponse.json(
        { error: "Book not found" },
        { status: 404 }
      );
    }

    if (!book.samplePdfUrl) {
      return NextResponse.json(
        { error: "No sample PDF available for this book" },
        { status: 404 }
      );
    }

    // Check if email already exists as subscriber
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
        source: "book-sample",
        subscribedAt: new Date().toISOString(),
        active: true,
      });
    }

    // Download the PDF from Sanity
    const pdfResponse = await fetch(book.samplePdfUrl);
    if (!pdfResponse.ok) {
      throw new Error("Failed to fetch PDF file");
    }
    const pdfBuffer = await pdfResponse.arrayBuffer();
    const pdfBase64 = Buffer.from(pdfBuffer).toString("base64");

    // Send email with PDF attachment
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "CivilEn Publishing <info@civilenpublishing.com>";
    
    await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: `Your Free Sample of "${book.title}" 📚`,
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
            .book-title { font-size: 18px; font-weight: bold; color: #ea5422; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Your Free Sample is Here! 📚</h1>
            </div>
            <div class="content">
              <h2>Hi there!</h2>
              <p>Thank you for your interest in <span class="book-title">"${book.title}"</span>!</p>
              <p>We've attached a free sample chapter to this email. We hope you enjoy it and find it valuable for your engineering studies.</p>
              
              <p><strong>What's next?</strong></p>
              <ul>
                <li>Check out the attached PDF to explore the content</li>
                <li>Visit our website for more engineering resources</li>
                <li>If you love it, consider getting the full book!</li>
              </ul>
              
              <p>As a subscriber, you'll also receive updates about new books, articles, and exclusive offers.</p>
              
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
          filename: book.samplePdfFilename || `${book.title.replace(/[^a-zA-Z0-9]/g, "_")}_Sample.pdf`,
          content: pdfBase64,
        },
      ],
    });

    return NextResponse.json({
      success: true,
      message: "Sample sent to your email! Check your inbox.",
    });
  } catch (error) {
    console.error("Download sample error:", error);
    return NextResponse.json(
      { error: "Failed to send sample. Please try again later." },
      { status: 500 }
    );
  }
}

