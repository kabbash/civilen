# Fix 401 Unauthorized Webhook Error

## Problem
Your Sanity webhook is getting a 401 Unauthorized error, which means the secret validation is failing.

## Solution Steps

### Step 1: Verify Vercel Environment Variable

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Look for `SANITY_WEBHOOK_SECRET`
   - ❌ **If it doesn't exist:** Add it now
   - ✅ **If it exists:** Note the value (or regenerate it)

**To add/update:**
```
Variable Name: SANITY_WEBHOOK_SECRET
Value: <your-secret-value>
Environments: ✅ Production, ✅ Preview, ✅ Development
```

5. **Important:** After adding/updating, you MUST redeploy:
   - Go to **Deployments** tab
   - Click the "..." menu on your latest deployment
   - Click **Redeploy** → **Use existing Build Cache** → **Redeploy**

### Step 2: Check Sanity Webhook Configuration

1. Go to [Sanity Manage](https://www.sanity.io/manage)
2. Select your project
3. Go to **API** → **Webhooks**
4. Click on your webhook (should be the revalidate one)
5. Scroll to **HTTP Headers** section

**Check the header configuration:**

| Field | Expected Value |
|-------|---------------|
| **Key** | `x-sanity-webhook-secret` |
| **Value** | `<same-value-as-vercel-env-var>` |

⚠️ **Common mistakes:**
- Header key is wrong (should be exactly `x-sanity-webhook-secret`)
- Value doesn't match what's in Vercel
- Extra spaces in the value
- Missing the header entirely

### Step 3: Test the Configuration

**Option A: Quick Test via Sanity**
1. In Sanity Webhooks, click on your webhook
2. Scroll down and click **"Trigger test delivery"**
3. Check the result - should show 200 status

**Option B: Manual Test with curl**
```bash
# Replace with your actual values
curl -X POST https://your-domain.vercel.app/api/webhook/revalidate \
  -H "Content-Type: application/json" \
  -H "x-sanity-webhook-secret: YOUR_ACTUAL_SECRET" \
  -d '{"_type":"article","slug":"test","_id":"test-123"}'
```

**Expected response (200):**
```json
{
  "success": true,
  "message": "Webhook revalidation successful",
  "revalidated": {
    "paths": ["/", "/articles", "/articles/test"]
  },
  "timestamp": "2025-11-26T19:47:32.993Z"
}
```

### Step 4: Check Vercel Logs

1. Go to Vercel Dashboard → Your Project → **Logs**
2. Trigger a test webhook from Sanity
3. Look for logs like:
   - `[Webhook Revalidate] Received webhook for article: test`
   - Or error messages

**If you see "Webhook secret not configured" (500):**
- The environment variable is not set in Vercel
- Redeploy after setting it

**If you see nothing in the logs:**
- The request is not reaching Vercel
- Check the webhook URL is correct

### Step 5: Generate a New Secret (If needed)

If you're unsure about the current secret, generate a new one:

```bash
# Generate a new secret
openssl rand -base64 32
```

Then:
1. Update `SANITY_WEBHOOK_SECRET` in Vercel
2. Redeploy your Vercel app
3. Update the header value in Sanity webhook

## Quick Checklist

- [ ] `SANITY_WEBHOOK_SECRET` exists in Vercel environment variables
- [ ] Vercel app redeployed after adding/updating env var
- [ ] Sanity webhook has header `x-sanity-webhook-secret` (exact spelling)
- [ ] Header value in Sanity matches Vercel env var (no extra spaces)
- [ ] Webhook URL is `https://your-domain.vercel.app/api/webhook/revalidate`
- [ ] Test delivery returns 200 status

## Still Not Working?

### Debug: Check if endpoint is configured

Visit this URL in your browser:
```
https://your-domain.vercel.app/api/webhook/revalidate
```

**Expected response:**
```json
{
  "message": "Webhook revalidate API is active",
  "endpoint": "/api/webhook/revalidate",
  "version": "1.0",
  "configured": true
}
```

If `"configured": false`, the environment variable is not set.

### Common Issues

1. **Environment variable not applied:**
   - Solution: Redeploy the app after setting env vars

2. **Typo in header name:**
   - Solution: Use exactly `x-sanity-webhook-secret` (all lowercase, with hyphens)

3. **Wrong secret value:**
   - Solution: Generate new secret, update both Vercel and Sanity

4. **Multiple deployments:**
   - Solution: Make sure you're testing against the latest deployment

## Need More Help?

Share the following:
1. Response from: `curl https://your-domain.vercel.app/api/webhook/revalidate`
2. Screenshot of Sanity webhook HTTP Headers section
3. Vercel logs when triggering the webhook







