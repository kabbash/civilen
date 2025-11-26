# Email Configuration Guide

This guide explains how to configure email addresses for newsletters and contact forms.

## Environment Variables

Add these to your `.env.local` file (development) and Vercel environment variables (production):

```env
# Resend API Key (required)
RESEND_API_KEY=re_your_key_here

# Newsletter Email Configuration
NEWSLETTER_FROM_EMAIL=CivilEn Publishing <newsletter@civilenpublishing.com>

# Contact Form Email Configuration
CONTACT_FROM_EMAIL=CivilEn Contact <contact@civilenpublishing.com>
CONTACT_TO_EMAIL=info@civilenpublishing.com

# Site URL (required for email links)
NEXT_PUBLIC_SITE_URL=https://civilenpublishing.com
```

## Email Variables Explained

### NEWSLETTER_FROM_EMAIL

- **What it is**: The sender address for newsletter emails
- **Used for**: Sending notifications when new articles/books are published
- **Format**: `Name <email@domain.com>`
- **Default**: `CivilEn Publishing <onboarding@resend.dev>` (test domain)
- **Example**: `CivilEn Publishing <newsletter@civilenpublishing.com>`

### CONTACT_FROM_EMAIL

- **What it is**: The sender address for contact form notifications
- **Used for**: Sending contact form submissions to your inbox
- **Format**: `Name <email@domain.com>`
- **Default**: `CivilEn Contact <onboarding@resend.dev>` (test domain)
- **Example**: `CivilEn Contact <contact@civilenpublishing.com>`

### CONTACT_TO_EMAIL

- **What it is**: Where contact form submissions are sent
- **Used for**: Receiving messages from website visitors
- **Format**: `email@domain.com`
- **Default**: `info@civilenpublishing.com`
- **Example**: `support@civilenpublishing.com`

## Quick Setup

### Option 1: Use Test Domain (Immediate Testing)

For immediate testing without domain verification:

```env
# .env.local
RESEND_API_KEY=re_your_key_here
NEWSLETTER_FROM_EMAIL=CivilEn Newsletter <onboarding@resend.dev>
CONTACT_FROM_EMAIL=CivilEn Contact <onboarding@resend.dev>
CONTACT_TO_EMAIL=your-personal-email@gmail.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

✅ **Pros**: Works immediately  
❌ **Cons**: Not branded, limited sending

### Option 2: Use Verified Domain (Production)

After verifying your domain in Resend:

```env
# .env.local
RESEND_API_KEY=re_your_key_here
NEWSLETTER_FROM_EMAIL=CivilEn Publishing <newsletter@civilenpublishing.com>
CONTACT_FROM_EMAIL=CivilEn Contact <contact@civilenpublishing.com>
CONTACT_TO_EMAIL=info@civilenpublishing.com
NEXT_PUBLIC_SITE_URL=https://civilenpublishing.com
```

✅ **Pros**: Fully branded, professional  
❌ **Cons**: Requires domain verification

## Testing

### Test Newsletter Subscription

1. Go to your website footer
2. Enter an email and click "Subscribe"
3. Check Sanity Studio → Newsletter Subscribers
4. Publish a test article/book in Sanity
5. Check inbox for newsletter email

### Test Contact Form

1. Go to `/contact` page
2. Fill in the form with test data
3. Click "Send Message"
4. Check the `CONTACT_TO_EMAIL` inbox for the message
5. Verify the "Reply-To" is the user's email

## Email Flow Diagram

### Newsletter Flow

```
User subscribes → Sanity CMS stores email
↓
Admin publishes article/book → Sanity webhook triggers
↓
API fetches all subscribers → Generates HTML email
↓
Resend sends emails from NEWSLETTER_FROM_EMAIL
↓
Subscribers receive beautiful HTML newsletter
```

### Contact Form Flow

```
User fills contact form → Frontend validates
↓
POST to /api/contact → Backend validates
↓
API generates HTML email → Sends via Resend
↓
Email sent from CONTACT_FROM_EMAIL → To CONTACT_TO_EMAIL
↓
You receive contact submission → Reply-To is user's email
```

## Advanced Configuration

### Multiple Recipients for Contact Form

To send contact form submissions to multiple people:

```env
CONTACT_TO_EMAIL=support@civilenpublishing.com,admin@civilenpublishing.com,sales@civilenpublishing.com
```

Then update `/app/api/contact/route.ts`:

```typescript
const toEmails = process.env.CONTACT_TO_EMAIL?.split(",") || ["info@civilenpublishing.com"];
```

### Different Emails for Different Content Types

If you want different sender addresses for articles vs books:

1. Add to `.env.local`:

```env
NEWSLETTER_ARTICLE_FROM=CivilEn Articles <articles@civilenpublishing.com>
NEWSLETTER_BOOK_FROM=CivilEn Books <books@civilenpublishing.com>
```

2. Update `/lib/email.ts` in the `sendEmail` function to check content type

### Custom Reply-To Address

The contact form automatically sets Reply-To to the user's email, so you can reply directly from your email client.

## Setting Environment Variables in Vercel

1. Go to: https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add each variable:
   - **Name**: `NEWSLETTER_FROM_EMAIL`
   - **Value**: `CivilEn Publishing <newsletter@civilenpublishing.com>`
   - **Environment**: Production, Preview, Development
5. Click **Save**
6. Repeat for all variables
7. **Redeploy** your project for changes to take effect

## Verification Checklist

- [ ] `RESEND_API_KEY` is set
- [ ] `NEWSLETTER_FROM_EMAIL` is configured
- [ ] `CONTACT_FROM_EMAIL` is configured
- [ ] `CONTACT_TO_EMAIL` is configured
- [ ] `NEXT_PUBLIC_SITE_URL` is configured
- [ ] Domain is verified in Resend (for production)
- [ ] Environment variables are set in Vercel
- [ ] Application is redeployed
- [ ] Newsletter subscription tested
- [ ] Contact form tested
- [ ] Emails received successfully

## Troubleshooting

### Emails Not Sending

1. **Check API key**: Verify `RESEND_API_KEY` is correct
2. **Check logs**: Look for errors in Vercel function logs
3. **Verify domain**: Ensure sender domain is verified in Resend
4. **Test endpoint**: Use curl to test API endpoints directly

### Wrong Sender Address

1. **Check env vars**: Verify environment variables are set correctly
2. **Restart server**: Environment variables load on startup
3. **Check Vercel**: Ensure variables are set in Vercel dashboard
4. **Redeploy**: Changes require redeployment

### Contact Form Emails Not Received

1. **Check spam**: Contact form emails might be in spam
2. **Verify CONTACT_TO_EMAIL**: Ensure it's set correctly
3. **Check Resend logs**: https://resend.com/emails
4. **Test with different email**: Try a different recipient

## Email Templates

### Newsletter Email Includes:

- Branded header with CivilEn logo
- Content title and description
- Call-to-action button
- Company information
- Unsubscribe link
- Responsive HTML design

### Contact Form Email Includes:

- Clear subject line with "Contact Form:"
- Sender's name and email
- Subject from form
- Full message content
- Reply-To header set to sender
- Professional formatting

## Best Practices

1. **Use descriptive sender names**: "CivilEn Newsletter" not just "CivilEn"
2. **Keep Reply-To functional**: Always allow recipients to reply
3. **Monitor sending**: Check Resend dashboard regularly
4. **Test before launch**: Send test emails to yourself first
5. **Verify your domain**: More professional and better deliverability
6. **Use separate addresses**: Different addresses for different purposes
7. **Check spam scores**: Use tools like mail-tester.com

## Support

- **Resend Docs**: https://resend.com/docs
- **Resend Dashboard**: https://resend.com/emails
- **Verify Domain**: https://resend.com/domains

For questions: info@civilenpublishing.com
