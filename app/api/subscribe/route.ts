import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function POST(request: NextRequest) {
  try {
    const { email, source = 'footer' } = await request.json()

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingSubscriber = await client.fetch(
      `*[_type == "subscriber" && email == $email][0]`,
      { email }
    )

    if (existingSubscriber) {
      // If exists and active, return message
      if (existingSubscriber.active) {
        return NextResponse.json(
          { message: 'This email is already subscribed!' },
          { status: 200 }
        )
      }
      
      // If exists but inactive, reactivate it
      await client
        .patch(existingSubscriber._id)
        .set({ active: true, subscribedAt: new Date().toISOString() })
        .commit()

      return NextResponse.json(
        { message: 'Welcome back! Your subscription has been reactivated.' },
        { status: 200 }
      )
    }

    // Create new subscriber
    const result = await client.create({
      _type: 'subscriber',
      email,
      source,
      subscribedAt: new Date().toISOString(),
      active: true,
    })

    return NextResponse.json(
      { 
        message: 'Successfully subscribed to newsletter!',
        subscriber: result 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    )
  }
}

