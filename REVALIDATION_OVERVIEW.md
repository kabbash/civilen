# 🔄 Sanity Revalidation System - Complete Overview

## What Is This?

A comprehensive on-demand revalidation system that automatically refreshes your Next.js pages when content is updated in Sanity CMS. No need to rebuild or redeploy your entire site!

## 🎉 Features

- ✅ **Manual Revalidation** - Click a button in Sanity Studio to refresh pages
- ✅ **Automatic Revalidation** - Webhooks automatically refresh pages when content is published
- ✅ **Secure** - Protected with secret tokens
- ✅ **Comprehensive** - Revalidates homepage, list pages, and detail pages
- ✅ **Easy to Use** - Simple setup with clear documentation
- ✅ **Well-Tested** - Includes test script and troubleshooting guide

---

## 📁 Files Created

### API Routes
```
app/api/
├── revalidate/
│   └── route.ts              # Manual revalidation endpoint
└── webhook/
    └── revalidate/
        └── route.ts          # Automatic webhook endpoint
```

### Sanity Integration
```
sanity/
├── lib/
│   ├── revalidate.ts         # Core revalidation utility
│   └── actions/
│       └── revalidateAction.ts  # Studio document action
└── config.ts (updated)       # Added revalidate action
```

### Scripts & Documentation
```
scripts/
└── test-revalidation.ts      # Test script

Documentation:
├── REVALIDATION_OVERVIEW.md  # This file
├── REVALIDATION_SUMMARY.md   # Feature summary
├── REVALIDATION_SETUP.md     # Complete setup guide
├── REVALIDATION_QUICK_REFERENCE.md  # Quick reference card
└── REVALIDATION_ENV_TEMPLATE.md     # Environment variables
```

---

## 🚀 Quick Start

### Step 1: Add Environment Variables

Create or update `.env.local`:

```env
SANITY_REVALIDATE_SECRET=<your-secret-here>
SANITY_WEBHOOK_SECRET=<your-webhook-secret-here>
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Generate secrets:
```bash
openssl rand -base64 32  # Run twice for two secrets
```

### Step 2: Start Development Server

```bash
npm run dev
```

### Step 3: Test Manual Revalidation

1. Navigate to `http://localhost:3000/studio`
2. Open any article, book, or errata document
3. Look for the "Revalidate" button (top right)
4. Click it to manually trigger revalidation

### Step 4: Configure Webhooks (Production)

1. Go to [Sanity Manage](https://www.sanity.io/manage)
2. Navigate to API → Webhooks → Create webhook
3. Configure:
   - **URL:** `https://your-domain.com/api/webhook/revalidate`
   - **Secret Header:** `x-sanity-webhook-secret` = Your webhook secret
   - **Trigger on:** Create, Update, Delete
   - **Filter:** `_type == "article" || _type == "book" || _type == "errata"`

---

## 💡 How It Works

### Manual Revalidation Flow
```
User clicks "Revalidate" in Studio
        ↓
RevalidateAction calls revalidateDocument()
        ↓
POST to /api/revalidate with secret
        ↓
Next.js revalidates relevant paths
        ↓
✅ Pages refreshed
```

### Automatic Revalidation Flow
```
Content published in Sanity
        ↓
Sanity webhook triggers
        ↓
POST to /api/webhook/revalidate
        ↓
Next.js revalidates relevant paths
        ↓
✅ Pages automatically refreshed
```

---

## 🎯 Revalidation Behavior

When content is updated, the system intelligently revalidates multiple paths:

### Article Published/Updated
- Homepage (`/`)
- Articles list page (`/articles`)
- Specific article page (`/articles/[slug]`)

### Book Published/Updated
- Homepage (`/`)
- Books list page (`/books`)
- Specific book page (`/books/[slug]`)

### Errata Published/Updated
- Errata page (`/errata`)

---

## 🔒 Security

- **Two-Secret System**: Separate secrets for manual and webhook revalidation
- **Header-Based Auth**: Secrets sent via HTTP headers
- **401 Unauthorized**: Invalid/missing secrets are rejected
- **Environment Variables**: Secrets stored securely in `.env.local` and Vercel

---

## 🧪 Testing

### Test Endpoints Are Active
```bash
curl http://localhost:3000/api/revalidate
curl http://localhost:3000/api/webhook/revalidate
```

### Run Test Script
```bash
# Install tsx (if not installed)
npm install -D tsx

# Run comprehensive tests
npx tsx scripts/test-revalidation.ts
```

### Manual Testing
1. Publish/update content in Sanity Studio
2. Check the terminal for revalidation logs
3. Verify pages are updated (refresh in browser)

---

## 📦 Production Deployment

### Vercel Setup

1. **Add Environment Variables** in Vercel dashboard:
   - `SANITY_REVALIDATE_SECRET`
   - `SANITY_WEBHOOK_SECRET`
   - `NEXT_PUBLIC_BASE_URL` (your production URL)

2. **Deploy** your site:
   ```bash
   git add .
   git commit -m "Add revalidation system"
   git push
   ```

3. **Configure Sanity Webhook**:
   - URL: Your production domain + `/api/webhook/revalidate`
   - Secret: Same as `SANITY_WEBHOOK_SECRET`

4. **Test** by publishing content in Sanity

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Revalidate" button missing | Verify `sanity.config.ts` includes `RevalidateAction` |
| Unauthorized errors | Check secrets match in `.env.local` and Sanity |
| Webhook not firing | Ensure webhook is enabled in Sanity Manage |
| Local webhook testing | Use ngrok to tunnel: `ngrok http 3000` |
| Pages not updating | Check console logs for revalidation messages |

---

## 📖 Documentation

| Document | Purpose |
|----------|---------|
| **[REVALIDATION_QUICK_REFERENCE.md](./REVALIDATION_QUICK_REFERENCE.md)** | Quick reference card |
| **[REVALIDATION_SETUP.md](./REVALIDATION_SETUP.md)** | Complete setup guide |
| **[REVALIDATION_SUMMARY.md](./REVALIDATION_SUMMARY.md)** | Feature summary |
| **[REVALIDATION_ENV_TEMPLATE.md](./REVALIDATION_ENV_TEMPLATE.md)** | Env variables guide |

---

## 🎓 Learn More

- [Next.js On-Demand Revalidation](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
- [Sanity Webhooks](https://www.sanity.io/docs/webhooks)
- [revalidatePath API](https://nextjs.org/docs/app/api-reference/functions/revalidatePath)

---

## ✅ Setup Checklist

- [ ] Environment variables added to `.env.local`
- [ ] Secrets generated and configured
- [ ] Dev server running
- [ ] Manual revalidation tested
- [ ] Environment variables added to Vercel
- [ ] Site deployed to production
- [ ] Webhook configured in Sanity
- [ ] Automatic revalidation tested

---

## 🎉 You're All Set!

Your revalidation system is ready to use. Content editors can now:
- Click "Revalidate" in Studio for instant updates
- Publish content and have pages automatically refresh
- See changes live without waiting for rebuilds

Happy content editing! 🚀






