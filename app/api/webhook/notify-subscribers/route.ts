import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/client'
import { sendEmail, generateArticleEmail, generateBookEmail } from '@/lib/email'

// Webhook version: 2.0 (no filesystem operations)
// This webhook will be called by Sanity when new content is published
export async function POST(request: NextRequest) {
  try {
    // Verify the request is from Sanity (optional but recommended)
    const secret = request.headers.get('x-sanity-webhook-secret')
    
    if (process.env.SANITY_WEBHOOK_SECRET && secret !== process.env.SANITY_WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { _type, title, slug, description } = body

    // Validate the content type
    if (!['article', 'book'].includes(_type)) {
      return NextResponse.json(
        { error: 'Invalid content type' },
        { status: 400 }
      )
    }

    const slugString = slug?.current || slug

    // Fetch all active subscribers
    const subscribers = await writeClient.fetch(
      `*[_type == "subscriber" && active == true]{ email }`
    )

    if (subscribers.length === 0) {
      return NextResponse.json(
        { message: 'No active subscribers found' },
        { status: 200 }
      )
    }
    // Send email notifications
    const emails = subscribers.map((s: { email: string }) => s.email)
    const emailContent = _type === 'article' 
      ? generateArticleEmail({ title, slug: slugString, description })
      : generateBookEmail({ title, slug: slugString, description })

    const emailResult = await sendEmail({
      to: emails,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    })

    console.log(`[Webhook v2.0] Successfully processed ${_type}: ${title}`)
    console.log(`[Webhook v2.0] Notified ${subscribers.length} subscribers`)

    return NextResponse.json(
      { 
        message: 'Notification processed successfully',
        subscriberCount: subscribers.length,
        emailSent: emailResult.success 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    )
  }
}

// Optional: Add GET method to verify webhook is working
export async function GET() {
  return NextResponse.json({
    message: 'Newsletter notification webhook is active',
    endpoint: '/api/webhook/notify-subscribers'
  })
}

