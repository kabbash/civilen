# Webhook 401 Debug Guide

## 🔍 You're Getting a 401 Error - Let's Debug It!

I've added a debug endpoint and enhanced logging to help diagnose the exact issue.

## Step 1: Test the Debug Endpoint

### Check Your Deployment URL

First, visit this URL in your browser:

```
https://your-vercel-domain.vercel.app/api/webhook/debug
```

**What to look for:**

```json
{
  "message": "Webhook Debug Info",
  "environment": {
    "hasSecret": true, // ✅ Should be true
    "secretLength": 44, // ✅ Should be > 0
    "secretPreview": "abc12...xyz78"
  }
}
```

❌ **If `hasSecret: false`:**

- Your `SANITY_WEBHOOK_SECRET` is NOT set in Vercel
- Go to Vercel → Settings → Environment Variables
- Add `SANITY_WEBHOOK_SECRET`
- **REDEPLOY** your app

## Step 2: Test with Your Actual Secret

Copy the secret value from your Sanity webhook and test it:

```bash
# Replace YOUR_DOMAIN and YOUR_SECRET with actual values
curl -X POST https://YOUR_DOMAIN.vercel.app/api/webhook/debug \
  -H "Content-Type: application/json" \
  -H "x-sanity-webhook-secret: YOUR_SECRET" \
  -d '{"test": true}'
```

**Expected response:**

```json
{
  "message": "Webhook Debug - POST Request",
  "environment": {
    "hasEnvSecret": true,
    "envSecretLength": 44,
    "envSecretPreview": "abc12...xyz78"
  },
  "request": {
    "hasHeaderSecret": true,
    "headerSecretLength": 44,
    "headerSecretPreview": "abc12...xyz78"
  },
  "validation": {
    "secretsMatch": true, // ✅ This should be TRUE
    "lengthsMatch": true, // ✅ This should be TRUE
    "bothExist": true // ✅ This should be TRUE
  }
}
```

### What the Debug Response Tells You

| Field             | What It Means            | Fix If False               |
| ----------------- | ------------------------ | -------------------------- |
| `hasEnvSecret`    | Env var is set in Vercel | Add env var and redeploy   |
| `hasHeaderSecret` | Header is being sent     | Fix Sanity webhook header  |
| `secretsMatch`    | Values are identical     | Check for typos/whitespace |
| `lengthsMatch`    | Lengths are the same     | Remove extra spaces        |
| `bothExist`       | Both are present         | Check both sides           |

## Step 3: Check Vercel Deployment Logs

After deploying the changes, trigger a test webhook from Sanity and check Vercel logs:

You should see detailed logs like:

```
[Webhook Revalidate] Received request
[Webhook Revalidate] Has secret header: true
[Webhook Revalidate] Secret header length: 44
[Webhook Revalidate] Env var configured: true
[Webhook Revalidate] Env var length: 44
```

### If You See Different Lengths

```
[Webhook Revalidate] Header length: 46
[Webhook Revalidate] Env length: 44
```

**This means:** You have extra characters (likely whitespace) somewhere!

**Fix:**

1. Go to Vercel → Environment Variables
2. Click edit on `SANITY_WEBHOOK_SECRET`
3. Copy the value and paste it in a text editor
4. Remove ALL whitespace (spaces, newlines, tabs)
5. Copy the clean value back
6. Save and REDEPLOY

OR

1. Go to Sanity → Webhooks → Your webhook
2. Edit the header value
3. Remove ALL whitespace
4. Save

## Step 4: Generate a Fresh Secret

If nothing works, start fresh:

```bash
# Generate a new secret
openssl rand -base64 32
```

**Copy the output (e.g., `abc123def456ghi789...`)**

### Update Vercel:

1. Go to Vercel → Settings → Environment Variables
2. Edit `SANITY_WEBHOOK_SECRET`
3. Paste the new secret (no extra spaces!)
4. Save for all environments
5. **Redeploy**

### Update Sanity:

1. Go to Sanity Manage → API → Webhooks
2. Edit your webhook
3. Find HTTP Headers section
4. Update the value for `x-sanity-webhook-secret`
5. Paste the same secret (no extra spaces!)
6. Save

## Step 5: Final Test

1. Go to Sanity webhook page
2. Click **"Trigger test delivery"**
3. Check the response

**Expected:**

- Status: 200
- Response body: `{"success": true, ...}`

## Common Issues & Solutions

### Issue 1: "hasSecret: false" in debug

**Cause:** Environment variable not set or not deployed
**Fix:**

1. Add `SANITY_WEBHOOK_SECRET` in Vercel
2. Must REDEPLOY (env changes don't apply without redeploying)

### Issue 2: "secretsMatch: false" but lengths match

**Cause:** Different characters in the secret
**Fix:**

1. Copy secret from Vercel
2. Paste EXACTLY in Sanity (or vice versa)
3. Don't type it manually

### Issue 3: Different lengths

**Cause:** Hidden whitespace (spaces, newlines, tabs)
**Fix:**

1. Copy to text editor
2. Look for hidden characters at start/end
3. Clean and re-paste
4. I've added `.trim()` to handle this, so redeploy

### Issue 4: Still 401 after everything

**Cause:** Using wrong deployment or old cache
**Fix:**

1. Hard refresh Sanity page (Cmd/Ctrl + Shift + R)
2. Force redeploy in Vercel (don't use cache)
3. Wait 1-2 minutes for deployment to propagate

## Quick Checklist

- [ ] Visited `/api/webhook/debug` - shows `hasSecret: true`
- [ ] Tested POST to `/api/webhook/debug` - shows `secretsMatch: true`
- [ ] Checked Vercel logs - see "[Webhook Revalidate] Received request"
- [ ] Lengths match (e.g., both 44 characters)
- [ ] No extra whitespace in secret values
- [ ] Redeployed after changing env vars
- [ ] Header name is exactly `x-sanity-webhook-secret`
- [ ] Test delivery from Sanity returns 200

## Still Stuck?

Share the output of:

1. `https://your-domain.vercel.app/api/webhook/debug` (GET)
2. The curl command output from Step 2
3. Screenshot of Sanity webhook headers section
4. Vercel logs after triggering webhook

This will show exactly what's different! 🕵️






