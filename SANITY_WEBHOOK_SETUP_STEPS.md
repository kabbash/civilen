# Sanity Webhook Setup - Step by Step

## The Issue You Had

The error `"Invalid signature","isValidSignature":null,"body":null` happened because the code was trying to use **signature validation** but your webhook was configured with **HTTP headers**. These are two different authentication methods.

I've fixed it to use the simpler **HTTP header** method.

---

## Complete Setup Steps

### Step 1: Get Your Vercel Domain

You need your actual deployed URL from Vercel. Find it in:
- Vercel Dashboard → Your Project → Domains
- Example: `https://your-site.vercel.app`

### Step 2: Set Environment Variable in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**

**Add this variable:**
```
Name: SANITY_WEBHOOK_SECRET
Value: [Generate a secret - see below]
Environments: ✅ Production ✅ Preview ✅ Development
```

**Generate a secret:**
```bash
openssl rand -base64 32
```

Example output: `Tk4fW8mN7VqL2rYx9cH5sB3pD1aE6gK0`

5. Click **Save**
6. **IMPORTANT:** After saving, click **Redeploy** (top right) → Use existing cache → Redeploy

⚠️ **The environment variable won't work until you redeploy!**

### Step 3: Configure Sanity Webhook

1. Go to [Sanity Manage](https://www.sanity.io/manage)
2. Select your project (should be `oyo0ijlc` based on your logs)
3. Navigate to **API** tab on the left
4. Click **Webhooks**
5. Click **+ Create webhook** (or edit existing one)

### Step 4: Webhook Configuration

Fill in these fields:

**Name:**
```
Revalidate Next.js Site
```

**Description:** (Optional)
```
Automatically revalidate Next.js pages when content is published
```

**URL:**
```
https://your-actual-vercel-domain.vercel.app/api/webhook/revalidate
```

⚠️ **IMPORTANT:** Replace `your-actual-vercel-domain.vercel.app` with your REAL Vercel domain!

**Dataset:**
- Select your dataset (usually `production`)

**Trigger on:**
- ✅ Create
- ✅ Update  
- ✅ Delete

**Filter:** (Optional but recommended)
```groq
_type == "article" || _type == "book" || _type == "errata"
```

**Projection:** (Leave default or empty)

**HTTP method:**
- Select `POST`

**API version:**
- Select `2024-11-22` (or latest)

**HTTP Headers:** ⚠️ **THIS IS CRITICAL**

Click **+ Add header**

| Header Name | Header Value |
|------------|--------------|
| `x-sanity-webhook-secret` | Paste the SAME secret you used in Vercel |

⚠️ **Common mistakes to avoid:**
- Typo in header name (must be exactly `x-sanity-webhook-secret`)
- Different secret than what's in Vercel
- Extra spaces in the secret value
- Forgetting to add the header entirely

**Include drafts:**
- ❌ Uncheck this (we only want published content)

**HTTP body:**
- Select **Include full document**

**On-demand revalidation:**
- Leave unchecked

### Step 5: Save and Test

1. Scroll to bottom and click **Save**
2. After saving, scroll down to **Recent deliveries**
3. Click **Trigger test delivery**

**Expected result:**
- Status: **200 OK**
- Response body: `{"success":true,"message":"Webhook revalidation successful",...}`

**If you get 401:**
- The secrets don't match
- Check for typos in the header name
- Make sure you redeployed Vercel after adding env var

**If you get 404:**
- Wrong URL (check your Vercel domain)
- Deployment not found (wait 1-2 minutes after deploying)

**If you get 500:**
- Environment variable not set in Vercel
- Didn't redeploy after setting env var

### Step 6: Verify in Vercel Logs

1. Go to Vercel Dashboard → Your Project → **Logs**
2. Trigger the test delivery again from Sanity
3. You should see logs like:

```
[Webhook Revalidate] Received request
[Webhook Revalidate] Processing article: test-slug
[Webhook Revalidate] Revalidated paths: ['/articles', '/articles/test-slug', '/']
```

If you see these logs, it's working! ✅

---

## Quick Test Checklist

Before triggering the webhook, verify:

- [ ] `SANITY_WEBHOOK_SECRET` exists in Vercel environment variables
- [ ] Vercel app has been redeployed after adding the env var
- [ ] Webhook URL uses your actual Vercel domain (not localhost)
- [ ] Webhook URL ends with `/api/webhook/revalidate`
- [ ] HTTP Header name is exactly `x-sanity-webhook-secret`
- [ ] HTTP Header value matches the Vercel env var exactly (no extra spaces)
- [ ] Webhook method is POST
- [ ] Trigger on: Create, Update, Delete are checked

---

## Test Your Setup

### Test 1: Check Environment Variable

Visit in browser:
```
https://your-domain.vercel.app/api/webhook/revalidate
```

Expected response:
```json
{
  "message": "Webhook revalidate API is active",
  "endpoint": "/api/webhook/revalidate",
  "version": "1.0",
  "configured": true  ← Should be true!
}
```

If `configured: false`, the env var isn't set or you haven't redeployed.

### Test 2: Manual Test with curl

```bash
curl -X POST https://your-domain.vercel.app/api/webhook/revalidate \
  -H "Content-Type: application/json" \
  -H "x-sanity-webhook-secret: YOUR_SECRET_HERE" \
  -d '{"_type":"article","slug":{"current":"test"},"_id":"test-123"}'
```

Expected response (200):
```json
{
  "success": true,
  "message": "Webhook revalidation successful",
  "revalidated": {
    "paths": ["/articles", "/articles/test", "/"]
  },
  "timestamp": "2025-11-26T20:54:05.964Z"
}
```

### Test 3: Publish Content in Sanity

1. Go to Sanity Studio
2. Publish or update an article/book/errata
3. Check Sanity webhook logs (should show 200)
4. Check Vercel logs (should show revalidation messages)

---

## Troubleshooting Previous Errors

### Error: "Invalid signature"
**Cause:** You were using `parseBody` which expects signature validation, but webhook was configured with headers.
**Fix:** ✅ Fixed in the code - now uses header validation

### Error: "DEPLOYMENT_NOT_FOUND" 
**Cause:** Webhook is trying to reach a deployment that doesn't exist or isn't ready yet.
**Fix:** 
- Wait 1-2 minutes after deploying
- Make sure URL is correct
- Don't test immediately during deployment

### Error: 401 Unauthorized
**Cause:** Secrets don't match or header is wrong
**Fix:**
- Copy secret from Vercel
- Paste EXACTLY into Sanity webhook header
- Check header name is `x-sanity-webhook-secret`

---

## After Setup

Once everything is working:

1. **Automatic revalidation**: When you publish/update content in Sanity, pages will auto-refresh
2. **Manual revalidation**: You can also use the "Revalidate" button in Studio
3. **Monitor**: Check Sanity webhook logs occasionally to ensure it's working

---

## Need Help?

1. Check Vercel logs for detailed error messages
2. Check Sanity webhook "Recent deliveries" for status codes
3. Run the debug endpoint: `/api/webhook/debug`
4. Share the error messages from Vercel logs

Your webhook should work now! 🎉





