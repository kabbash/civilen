import { Resend } from 'resend'

/**
 * Send contact form email
 */
export async function sendContactEmail({
  name,
  email,
  subject,
  message,
}: {
  name: string
  email: string
  subject: string
  message: string
}) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'CivilEn Contact <onboarding@resend.dev>'
  const toEmail = process.env.CONTACT_TO_EMAIL || 'info@civilenpublishing.com'

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #2e2d2d; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #ea5422; color: white; padding: 30px 20px; text-align: center; }
        .content { background-color: #ffffff; padding: 30px 20px; border: 1px solid #e0e0e0; }
        .field { margin-bottom: 20px; }
        .label { font-weight: bold; color: #ea5422; margin-bottom: 5px; }
        .value { color: #2e2d2d; }
        .footer { background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Contact Form Submission</h1>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">From:</div>
            <div class="value">${name}</div>
          </div>
          <div class="field">
            <div class="label">Email:</div>
            <div class="value"><a href="mailto:${email}">${email}</a></div>
          </div>
          <div class="field">
            <div class="label">Subject:</div>
            <div class="value">${subject}</div>
          </div>
          <div class="field">
            <div class="label">Message:</div>
            <div class="value">${message.replace(/\n/g, '<br>')}</div>
          </div>
        </div>
        <div class="footer">
          <p>This email was sent from the CivilEn Publishing contact form</p>
          <p>Reply to: ${email}</p>
        </div>
      </div>
    </body>
    </html>
  `

  const text = `
    New Contact Form Submission
    
    From: ${name}
    Email: ${email}
    Subject: ${subject}
    
    Message:
    ${message}
    
    ---
    Reply to: ${email}
  `.trim()

  console.log('📧 Sending contact email to:', toEmail)

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail], // Resend requires an array
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html,
      text,
    })

    if (error) {
      throw error
    }

    return { success: true, data }
  } catch (error) {
    console.error('Contact email sending failed:', error)
    return { success: false, error }
  }
}

