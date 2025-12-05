/**
 * Email notification utility
 *
 * This file contains functions to send email notifications to subscribers.
 * To enable actual email sending, you need to:
 *
 * 1. Install an email service package (choose one):
 *    - Resend: npm install resend
 *    - SendGrid: npm install @sendgrid/mail
 *    - Nodemailer: npm install nodemailer
 *
 * 2. Add API key to .env.local:
 *    RESEND_API_KEY=your_key_here
 *    or
 *    SENDGRID_API_KEY=your_key_here
 *
 * 3. Uncomment and configure the sendEmail function below
 */

import { Resend } from "resend";

interface EmailData {
  to: string[];
  subject: string;
  html: string;
  text?: string;
}

/**
 * Send email to multiple recipients
 * Currently logs to console. Uncomment implementation below to enable actual sending.
 */
export async function sendEmail({ to, subject, html, text }: EmailData) {
  console.log("📧 Email would be sent:");
  console.log("To:", to.join(", "));
  console.log("Subject:", subject);
  console.log("HTML:", html.substring(0, 100) + "...");

  const resend = new Resend(process.env.RESEND_API_KEY);

  // Use environment variable or fallback to test domain
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL || "CivilEn Publishing <info@civilenpublishing.com>";

  // Debug logging
  console.log("📨 From Email Address:", fromEmail);
  console.log("📨 Environment Variable Set:", !!process.env.NEWSLETTER_FROM_EMAIL);

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to,
      subject,
      html,
      text,
    });

    if (error) {
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, error };
  }

  // ===== OPTION 2: Using SendGrid =====
  // import sgMail from '@sendgrid/mail'
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY!)
  //
  // try {
  //   await sgMail.sendMultiple({
  //     from: 'newsletter@civilenpublishing.com',
  //     to,
  //     subject,
  //     html,
  //     text,
  //   })
  //   return { success: true }
  // } catch (error) {
  //   console.error('Email sending failed:', error)
  //   return { success: false, error }
  // }

  return { success: true, mock: true };
}

/**
 * Generate unsubscribe URL with encoded email
 */
export function generateUnsubscribeUrl(email: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const encodedEmail = Buffer.from(email).toString("base64");
  const token = Buffer.from(`${email}-unsubscribe-${process.env.SANITY_WEBHOOK_SECRET || "secret"}`)
    .toString("base64")
    .slice(0, 16);
  return `${baseUrl}/api/unsubscribe?email=${encodedEmail}&token=${token}`;
}

/**
 * Generate email HTML for new article notification
 */
export function generateArticleEmail(
  article: {
    title: string;
    slug: string;
    description?: string;
  },
  recipientEmail?: string
) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const articleUrl = `${baseUrl}/articles/${article.slug}`;
  const unsubscribeUrl = recipientEmail
    ? generateUnsubscribeUrl(recipientEmail)
    : `${baseUrl}/api/unsubscribe`;

  return {
    subject: `New Article: ${article.title}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #2e2d2d; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #ea5422; color: white; padding: 30px 20px; text-align: center; }
          .content { background-color: #ffffff; padding: 30px 20px; }
          .button { display: inline-block; background-color: #ea5422; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; margin: 20px 0; }
          .footer { background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>CivilEn Publishing</h1>
          </div>
          <div class="content">
            <h2>New Article Published!</h2>
            <h3>${article.title}</h3>
            ${article.description ? `<p>${article.description}</p>` : ""}
            <a href="${articleUrl}" class="button">Read Article</a>
            <p>Stay ahead with the latest insights and strategies for civil engineering excellence.</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} CivilEn Publishing. All Rights Reserved.</p>
            <p>CivilEn Publishing 8345 NW 66 ST MIAMI, FL 33166</p>
            <p><a href="${unsubscribeUrl}">Unsubscribe</a></p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      New Article Published!
      
      ${article.title}
      ${article.description || ""}
      
      Read the full article: ${articleUrl}
      
      Unsubscribe: ${unsubscribeUrl}
      
      © ${new Date().getFullYear()} CivilEn Publishing
    `.trim(),
  };
}

/**
 * Convert Portable Text blocks to simple HTML for emails
 */
interface PortableTextBlock {
  _type: string;
  style?: string;
  children?: Array<{
    _type: string;
    text?: string;
    marks?: string[];
  }>;
  listItem?: string;
}

function portableTextToHtml(blocks: PortableTextBlock[] | undefined): string {
  if (!blocks || !Array.isArray(blocks)) return "";

  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) return "";

      const text = block.children
        .map((child) => {
          if (child._type !== "span") return "";
          let content = child.text || "";

          // Apply marks (bold, italic, etc.)
          if (child.marks?.includes("strong")) {
            content = `<strong>${content}</strong>`;
          }
          if (child.marks?.includes("em")) {
            content = `<em>${content}</em>`;
          }

          return content;
        })
        .join("");

      // Apply block styles
      switch (block.style) {
        case "h1":
          return `<h1>${text}</h1>`;
        case "h2":
          return `<h2>${text}</h2>`;
        case "h3":
          return `<h3>${text}</h3>`;
        case "h4":
          return `<h4>${text}</h4>`;
        case "blockquote":
          return `<blockquote style="border-left: 3px solid #ea5422; padding-left: 15px; margin: 10px 0; color: #555;">${text}</blockquote>`;
        default:
          // Handle list items
          if (block.listItem === "bullet") {
            return `<li>${text}</li>`;
          }
          if (block.listItem === "number") {
            return `<li>${text}</li>`;
          }
          return `<p>${text}</p>`;
      }
    })
    .join("\n");
}

function portableTextToPlainText(blocks: PortableTextBlock[] | undefined): string {
  if (!blocks || !Array.isArray(blocks)) return "";

  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) return "";
      return block.children
        .map((child) => (child._type === "span" ? child.text || "" : ""))
        .join("");
    })
    .join("\n\n");
}

/**
 * Generate email HTML for new book notification
 */
export function generateBookEmail(
  book: {
    title: string;
    slug: string;
    description?: string;
    fullDescription?: PortableTextBlock[];
  },
  recipientEmail?: string
) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const bookUrl = `${baseUrl}/books/${book.slug}`;
  const unsubscribeUrl = recipientEmail
    ? generateUnsubscribeUrl(recipientEmail)
    : `${baseUrl}/api/unsubscribe`;

  // Convert fullDescription to HTML, fall back to description
  const descriptionHtml = book.fullDescription
    ? portableTextToHtml(book.fullDescription)
    : book.description
      ? `<p>${book.description}</p>`
      : "";

  const descriptionText = book.fullDescription
    ? portableTextToPlainText(book.fullDescription)
    : book.description || "";

  return {
    subject: `New Book Available: ${book.title}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #2e2d2d; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #ea5422; color: white; padding: 30px 20px; text-align: center; }
          .content { background-color: #ffffff; padding: 30px 20px; }
          .content h1, .content h2, .content h3, .content h4 { color: #2e2d2d; margin: 15px 0 10px 0; }
          .content p { margin: 10px 0; }
          .content ul, .content ol { margin: 10px 0; padding-left: 20px; }
          .button { display: inline-block; background-color: #ea5422; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; margin: 20px 0; }
          .footer { background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666; }
          .description { margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-radius: 4px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>CivilEn Publishing</h1>
          </div>
          <div class="content">
            <h2>New Book Available!</h2>
            <h3>${book.title}</h3>
            ${descriptionHtml ? `<div class="description">${descriptionHtml}</div>` : ""}
            <a href="${bookUrl}" class="button">View Book Details</a>
            <p>Discover the latest resources to advance your civil engineering career.</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} CivilEn Publishing. All Rights Reserved.</p>
            <p>CivilEn Publishing 8345 NW 66 ST MIAMI, FL 33166</p>
            <p><a href="${unsubscribeUrl}">Unsubscribe</a></p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      New Book Available!
      
      ${book.title}
      
      ${descriptionText}
      
      View book details and purchase: ${bookUrl}
      
      Unsubscribe: ${unsubscribeUrl}
      
      © ${new Date().getFullYear()} CivilEn Publishing
    `.trim(),
  };
}
