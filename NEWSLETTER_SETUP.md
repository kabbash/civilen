# Newsletter Subscription System

This document explains how to set up and use the newsletter subscription system in the CivilEn Publishing website.

## Overview

The newsletter system consists of:

1. **Subscriber Management** - Store subscriber emails in Sanity CMS
2. **Subscription API** - Allow users to subscribe via the website
3. **Webhook API** - Notify subscribers when new content is published
4. **Email Templates** - Beautiful HTML emails for articles and books

## Features

- ✅ Newsletter subscription form in the footer
- ✅ Store subscribers in Sanity CMS
- ✅ Prevent duplicate subscriptions
- ✅ Reactivate inactive subscribers
- ✅ Webhook endpoint for Sanity to trigger notifications
- ✅ Save notification logs to files
- ✅ Email templates for articles and books
- ✅ Ready for integration with email services (Resend, SendGrid, etc.)

## Setup Instructions

### 1. Deploy Your Changes

The Sanity schema for subscribers has been added. You need to restart your development server or rebuild:

```bash
npm run dev
```

### 2. Set Up Sanity Webhook (Important!)

To automatically notify subscribers when you publish new articles or books in Sanity:

1. Go to your Sanity project dashboard: https://www.sanity.io/manage
2. Navigate to **API** → **Webhooks**
3. Click **Create webhook**
4. Configure the webhook:
   - **Name**: Newsletter Notifications
   - **URL**: `https://your-domain.com/api/webhook/notify-subscribers`
   - **Dataset**: production (or your dataset name)
   - **Trigger on**: `Create` and `Update`
   - **Filter**:
     ```groq
     _type == "article" || _type == "book"
     ```
   - **Projection** (GROQ):
     ```groq
     {
       _type,
       title,
       slug,
       description
     }
     ```
   - **HTTP method**: POST
   - **API version**: v2024-01-01
   - **Secret**: (Generate a random secret and save it)

5. Add the webhook secret to your `.env.local`:
   ```env
   SANITY_WEBHOOK_SECRET=your_webhook_secret_here
   ```

### 3. Configure Email Service (Optional but Recommended)

Currently, emails are logged to console. To send actual emails:

#### Option A: Using Resend (Recommended)

1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Install Resend:
   ```bash
   npm install resend
   ```
4. Add to `.env.local`:
   ```env
   RESEND_API_KEY=re_your_key_here
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```
5. Uncomment the Resend implementation in `/lib/email.ts`

#### Option B: Using SendGrid

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Get your API key
3. Install SendGrid:
   ```bash
   npm install @sendgrid/mail
   ```
4. Add to `.env.local`:
   ```env
   SENDGRID_API_KEY=SG.your_key_here
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```
5. Uncomment the SendGrid implementation in `/lib/email.ts`

## Testing

### Test Newsletter Subscription

1. Go to your website footer
2. Enter an email address
3. Click "Subscribe"
4. Check Sanity Studio → Newsletter Subscribers to see the new subscriber

### Test Webhook Locally

You can test the webhook using curl:

```bash
curl -X POST http://localhost:3000/api/webhook/notify-subscribers \
  -H "Content-Type: application/json" \
  -H "x-sanity-webhook-secret: your_secret_here" \
  -d '{
    "_type": "article",
    "title": "Test Article",
    "slug": "test-article",
    "description": "This is a test article"
  }'
```

### Test Webhook with Sanity

1. Publish a new article or book in Sanity Studio
2. Check the `notifications` folder in your project root
3. A JSON file will be created with the notification details
4. Check console logs for email sending status

## API Endpoints

### POST /api/subscribe

Subscribe a user to the newsletter.

**Request:**

```json
{
  "email": "user@example.com",
  "source": "footer"
}
```

**Response (Success):**

```json
{
  "message": "Successfully subscribed to newsletter!",
  "subscriber": { ... }
}
```

**Response (Already Subscribed):**

```json
{
  "message": "This email is already subscribed!"
}
```

### POST /api/webhook/notify-subscribers

Webhook endpoint for Sanity to trigger notifications.

**Headers:**

- `x-sanity-webhook-secret`: Your webhook secret

**Request:**

```json
{
  "_type": "article",
  "title": "New Article Title",
  "slug": "article-slug",
  "description": "Article description"
}
```

**Response:**

```json
{
  "message": "Notification processed successfully",
  "notificationFile": "notification-1234567890.json",
  "subscriberCount": 42,
  "emailSent": true
}
```

### GET /api/webhook/notify-subscribers

Check if the webhook is active.

**Response:**

```json
{
  "message": "Newsletter notification webhook is active",
  "endpoint": "/api/webhook/notify-subscribers"
}
```

## File Structure

```
app/
├── api/
│   ├── subscribe/
│   │   └── route.ts          # Subscription endpoint
│   └── webhook/
│       └── notify-subscribers/
│           └── route.ts      # Webhook endpoint
lib/
└── email.ts                  # Email utilities and templates
sanity/
└── schemas/
    └── subscriber.ts         # Subscriber schema
components/
└── layout/
    └── Footer.tsx           # Newsletter form
notifications/                # Notification logs (gitignored)
```

## Managing Subscribers in Sanity

1. Go to Sanity Studio: `http://localhost:3000/studio`
2. Navigate to "Newsletter Subscribers"
3. You can:
   - View all subscribers
   - Manually add subscribers
   - Activate/deactivate subscriptions
   - See subscription dates and sources
   - Export subscriber list

## Notification Files

When content is published, a JSON file is saved in the `notifications` folder:

```json
{
  "timestamp": "2024-11-24T12:00:00.000Z",
  "contentType": "article",
  "title": "New Article Title",
  "slug": "article-slug",
  "description": "Article description",
  "subscribers": ["email1@example.com", "email2@example.com"],
  "subscriberCount": 2
}
```

These files are useful for:

- Auditing notification history
- Debugging issues
- Tracking subscriber growth
- Manual email sending if needed

## Security Notes

- The webhook uses a secret to verify requests are from Sanity
- Subscriber emails are stored securely in Sanity
- Email addresses are validated before storage
- Duplicate subscriptions are prevented
- The notifications folder is gitignored

## Next Steps

1. ✅ Set up Sanity webhook (see step 2 above)
2. ✅ Configure email service (see step 3 above)
3. Consider adding:
   - Unsubscribe functionality
   - Email preferences (articles only, books only, both)
   - Welcome email on subscription
   - Email analytics and tracking
   - Batch sending for large subscriber lists

## Troubleshooting

### Webhook not triggering

- Verify the webhook URL is correct
- Check webhook secret matches `.env.local`
- Ensure your site is deployed and accessible
- Check Sanity webhook logs in dashboard

### Emails not sending

- Check email service API key
- Verify email service is configured in `/lib/email.ts`
- Check console logs for errors
- Ensure sender email is verified with your email service

### Subscribers not appearing in Sanity

- Restart development server
- Clear browser cache
- Check API endpoint response in browser console
- Verify Sanity client configuration

## Support

For issues or questions, contact: info@civilenpublishing.com
