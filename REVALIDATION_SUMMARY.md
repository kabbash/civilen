# Revalidation System Summary

## What Was Added

A complete revalidation system that allows your Next.js site to automatically or manually refresh pages when Sanity content is updated.

## Files Created

### API Routes
1. **`/app/api/revalidate/route.ts`**
   - Manual revalidation endpoint
   - Used by Sanity Studio actions
   - Secured with `SANITY_REVALIDATE_SECRET`

2. **`/app/api/webhook/revalidate/route.ts`**
   - Automatic webhook revalidation endpoint
   - Called by Sanity webhooks on content changes
   - Secured with `SANITY_WEBHOOK_SECRET`

### Sanity Integration
3. **`/sanity/lib/revalidate.ts`**
   - Core revalidation utility function
   - Handles API calls to the revalidation endpoint
   - Used by Studio document actions

4. **`/sanity/lib/actions/revalidateAction.ts`**
   - Sanity Studio document action
   - Adds "Revalidate" button to documents
   - Allows manual revalidation from Studio UI

### Configuration
5. **`/sanity.config.ts`** (Updated)
   - Added `RevalidateAction` to document actions
   - Applies to: articles, books, and errata

### Documentation
6. **`/REVALIDATION_SETUP.md`**
   - Complete setup guide
   - Step-by-step instructions
   - Troubleshooting tips

7. **`/REVALIDATION_ENV_TEMPLATE.md`**
   - Environment variables template
   - Secret generation instructions
   - Development vs production setup

## How It Works

### Manual Revalidation (Studio Button)
1. User clicks "Revalidate" button in Sanity Studio
2. `RevalidateAction` calls `revalidateDocument()`
3. Request sent to `/api/revalidate` endpoint
4. Next.js revalidates relevant paths and tags

### Automatic Revalidation (Webhooks)
1. Content is published/updated in Sanity
2. Sanity webhook triggers
3. POST request sent to `/api/webhook/revalidate`
4. Next.js automatically revalidates pages

## What Gets Revalidated

### Articles
- `/` (homepage)
- `/articles` (list page)
- `/articles/[slug]` (specific article)

### Books
- `/` (homepage)
- `/books` (list page)
- `/books/[slug]` (specific book)

### Errata
- `/errata` (errata page)

## Quick Start

### 1. Add Environment Variables
Create `.env.local`:
```env
SANITY_REVALIDATE_SECRET=your-secret-here
SANITY_WEBHOOK_SECRET=your-webhook-secret-here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 2. Generate Secrets
```bash
# Generate two random secrets
openssl rand -base64 32
openssl rand -base64 32
```

### 3. Test Manual Revalidation
1. Start the dev server: `npm run dev`
2. Open Studio: `http://localhost:3000/studio`
3. Open any article/book/errata
4. Click "Revalidate" button

### 4. Configure Webhooks (Production)
1. Go to [Sanity Manage](https://www.sanity.io/manage)
2. Navigate to API → Webhooks
3. Create webhook:
   - URL: `https://your-domain.com/api/webhook/revalidate`
   - Secret: `SANITY_WEBHOOK_SECRET` value
   - Trigger on: Create, Update, Delete
   - Filter: `_type == "article" || _type == "book" || _type == "errata"`

## Testing

### Test Manual Endpoint
```bash
curl https://your-domain.com/api/revalidate
```

### Test Webhook Endpoint
```bash
curl https://your-domain.com/api/webhook/revalidate
```

### Test Revalidation
```bash
curl -X POST https://your-domain.com/api/revalidate \
  -H "Content-Type: application/json" \
  -H "x-sanity-revalidate-secret: your-secret" \
  -d '{"_type":"article","slug":"test-article"}'
```

## Benefits

1. **Instant Updates**: Pages refresh immediately when content changes
2. **No Rebuilds**: No need to redeploy the entire site
3. **User-Friendly**: Content editors can refresh pages from Studio
4. **Automatic**: Set up webhooks once, forget about it
5. **Secure**: Protected with secret tokens

## Next Steps

1. ✅ Add environment variables
2. ✅ Test manual revalidation in Studio
3. ✅ Configure Sanity webhooks
4. ✅ Test automatic revalidation
5. ✅ Deploy to production
6. ✅ Update Vercel environment variables

## Resources

- [Complete Setup Guide](./REVALIDATION_SETUP.md)
- [Environment Variables Template](./REVALIDATION_ENV_TEMPLATE.md)
- [Next.js Revalidation Docs](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
- [Sanity Webhooks Docs](https://www.sanity.io/docs/webhooks)

