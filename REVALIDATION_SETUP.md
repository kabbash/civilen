# Sanity Revalidation Setup Guide

This guide explains how to set up automatic and manual revalidation for your Next.js site when Sanity content is updated.

## Overview

The revalidation system provides two ways to refresh your Next.js pages when content changes in Sanity:

1. **Manual Revalidation**: Click a "Revalidate" button in Sanity Studio
2. **Automatic Revalidation**: Configure webhooks to automatically revalidate when content is published

## Components

### 1. Revalidation API Routes

- **`/app/api/revalidate/route.ts`**: Manual revalidation endpoint (used by Studio)
- **`/app/api/webhook/revalidate/route.ts`**: Webhook endpoint (called by Sanity automatically)

### 2. Sanity Studio Integration

- **`/sanity/lib/revalidate.ts`**: Revalidation utility function
- **`/sanity/lib/actions/revalidateAction.ts`**: Document action for Studio UI
- **`/sanity.config.ts`**: Configured to add revalidate button to documents

## Setup Instructions

### Step 1: Environment Variables

Add these environment variables to your `.env.local` file:

```env
# Revalidation secret (generate a random string)
SANITY_REVALIDATE_SECRET=your-secret-key-here

# Webhook secret (for automatic revalidation)
SANITY_WEBHOOK_SECRET=your-webhook-secret-here

# Base URL (production URL)
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

**Generate secrets:**
```bash
# Generate a random secret
openssl rand -base64 32
```

### Step 2: Vercel Environment Variables (Production)

If deploying to Vercel, add these environment variables in your Vercel project settings:

1. Go to your project in Vercel Dashboard
2. Navigate to Settings → Environment Variables
3. Add the following variables:
   - `SANITY_REVALIDATE_SECRET`: (same as local)
   - `SANITY_WEBHOOK_SECRET`: (same as local)
   - `NEXT_PUBLIC_BASE_URL`: Your production URL (e.g., https://yoursite.vercel.app)

### Step 3: Configure Sanity Webhooks (Automatic Revalidation)

1. Go to [Sanity Manage](https://www.sanity.io/manage)
2. Select your project
3. Navigate to **API** → **Webhooks**
4. Click **Create webhook**

#### Configure Webhook:

**Name:** Revalidate Next.js Site

**URL:** `https://your-domain.com/api/webhook/revalidate`
- For production: Use your production URL
- For development: Use a tunnel service like ngrok

**Dataset:** Select your dataset (usually `production`)

**Trigger on:** Select the events:
- ✅ Create
- ✅ Update
- ✅ Delete

**Filter:** (Optional) Add filters to only trigger for specific content types:
```groq
_type == "article" || _type == "book" || _type == "errata"
```

**HTTP method:** POST

**HTTP Headers:**
- Key: `x-sanity-webhook-secret`
- Value: Your `SANITY_WEBHOOK_SECRET`

**API version:** Use your API version (e.g., `2024-11-22`)

**HTTP body:** Select **Send _id and other metadata**

**Include drafts:** ❌ (unchecked)

5. Click **Save**

### Step 4: Test the Setup

#### Test Manual Revalidation (Studio):

1. Open Sanity Studio: `http://localhost:3000/studio`
2. Open any article, book, or errata document
3. Look for the "Revalidate" button in the document actions (top right)
4. Click it to manually trigger revalidation

#### Test Webhook Revalidation:

1. Publish or update an article/book/errata in Sanity Studio
2. Check the webhook logs in Sanity Manage to see if it was triggered
3. Check your Next.js application logs for revalidation messages

#### Test API Endpoints:

**Manual revalidation endpoint:**
```bash
curl -X POST https://your-domain.com/api/revalidate \
  -H "Content-Type: application/json" \
  -H "x-sanity-revalidate-secret: your-secret-key" \
  -d '{"_type":"article","slug":"test-article"}'
```

**Webhook revalidation endpoint:**
```bash
curl -X POST https://your-domain.com/api/webhook/revalidate \
  -H "Content-Type: application/json" \
  -H "x-sanity-webhook-secret: your-webhook-secret" \
  -d '{"_type":"article","slug":"test-article","_id":"123"}'
```

**Check if endpoints are active:**
```bash
# Check manual revalidation
curl https://your-domain.com/api/revalidate

# Check webhook revalidation
curl https://your-domain.com/api/webhook/revalidate
```

## How It Works

### Revalidation Paths

When content is updated, the following paths are revalidated:

**Articles:**
- `/` (homepage)
- `/articles` (articles list)
- `/articles/[slug]` (specific article)

**Books:**
- `/` (homepage)
- `/books` (books list)
- `/books/[slug]` (specific book)

**Errata:**
- `/errata` (errata page)

## Troubleshooting

### Manual Revalidation Not Working

1. **Check environment variables**: Ensure `SANITY_REVALIDATE_SECRET` is set
2. **Check console logs**: Look for error messages in browser console
3. **Verify network request**: Check browser DevTools Network tab
4. **Check API logs**: Look at Next.js server logs

### Webhook Not Triggering

1. **Verify webhook is enabled** in Sanity Manage
2. **Check webhook logs** in Sanity dashboard
3. **Verify secret matches** between Sanity and your environment variables
4. **Test webhook URL** is accessible (not localhost for production)
5. **Check webhook filter** if using GROQ filter

### Using with Development (localhost)

For testing webhooks locally:

1. Use a tunnel service like [ngrok](https://ngrok.com/):
   ```bash
   ngrok http 3000
   ```

2. Use the ngrok URL in your Sanity webhook configuration:
   ```
   https://your-ngrok-url.ngrok.io/api/webhook/revalidate
   ```

3. Add the ngrok URL to your `.env.local`:
   ```env
   NEXT_PUBLIC_BASE_URL=https://your-ngrok-url.ngrok.io
   ```

## Security Considerations

1. **Keep secrets secure**: Never commit secrets to version control
2. **Use different secrets** for development and production
3. **Rotate secrets regularly**: Update secrets periodically
4. **Monitor webhook logs**: Check for suspicious activity

## Additional Resources

- [Next.js On-Demand Revalidation](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration#on-demand-revalidation)
- [Sanity Webhooks Documentation](https://www.sanity.io/docs/webhooks)
- [Next.js revalidatePath](https://nextjs.org/docs/app/api-reference/functions/revalidatePath)
- [Next.js revalidateTag](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)

