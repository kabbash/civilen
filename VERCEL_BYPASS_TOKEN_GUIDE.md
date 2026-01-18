# How to Get Vercel Automation Bypass Token

## What is it?

The `VERCEL_AUTOMATION_BYPASS_SECRET` is a token provided by Vercel that allows automated services (like Sanity webhooks) to bypass deployment protection and access your preview/production deployments.

## Step-by-Step: Get Your Bypass Token

### Method 1: Via Vercel Dashboard (Easiest)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Select your project

2. **Navigate to Settings**
   - Click on **Settings** tab
   - Click on **Deployment Protection** in the left sidebar

3. **Find the Bypass Token**
   - Scroll down to **"Protection Bypass for Automation"** section
   - You'll see: **"Vercel Authentication"**
   - Click **"Create Token"** or **"View Token"** if one exists
   - The token will look like: `X3bXXXXXXXXXXXXXXXXXXXXXXXX`

4. **Copy the Token**
   - Copy the entire token string
   - Save it securely

### Method 2: Via Vercel CLI

If you have Vercel CLI installed:

```bash
# Login to Vercel
vercel login

# Get project info
vercel project ls

# The token is available in project settings
# You'll need to use the dashboard for the actual token
```

## How to Use the Bypass Token with Sanity Webhook

Once you have the token, you need to configure your Sanity webhook to include it in the URL.

### Option A: Add as URL Parameter (Recommended)

Update your Sanity webhook URL to include the token:

```
https://your-domain.vercel.app/api/webhook/notify-subscribers?x-vercel-protection-bypass=YOUR_TOKEN_HERE
```

**Steps:**

1. Go to Sanity Dashboard: https://www.sanity.io/manage
2. Navigate to: **API** → **Webhooks**
3. Edit your webhook
4. Update the URL to:
   ```
   https://your-vercel-app.vercel.app/api/webhook/notify-subscribers?x-vercel-protection-bypass=X3bXXXXXXXXXXXXXXXXX
   ```
5. Save

### Option B: Add as Header (Alternative)

Some webhook systems support custom headers. If Sanity supports it:

**Header Name**: `x-vercel-protection-bypass`  
**Header Value**: `YOUR_TOKEN_HERE`

However, Sanity's webhook UI might not support custom headers easily, so Option A (URL parameter) is simpler.

## Important Security Notes

⚠️ **This token is sensitive!**

- ✅ Only use it in webhook URLs (server-to-server)
- ❌ Never expose it in client-side code
- ❌ Never commit it to git
- ✅ Rotate it periodically for security
- ✅ Only share with trusted automation services

## Complete Webhook URL Example

Here's what your final Sanity webhook URL should look like:

```
https://your-app-git-main-your-team.vercel.app/api/webhook/notify-subscribers?x-vercel-protection-bypass=X3bYourActualTokenHere
```

**Breaking it down:**

- Base URL: `https://your-app-git-main-your-team.vercel.app`
- Endpoint: `/api/webhook/notify-subscribers`
- Bypass parameter: `?x-vercel-protection-bypass=X3bYourToken`

## Testing Your Configuration

### Test 1: Check Endpoint is Accessible

```bash
# Without token (should fail with 401)
curl https://your-app.vercel.app/api/webhook/notify-subscribers

# With token (should succeed)
curl "https://your-app.vercel.app/api/webhook/notify-subscribers?x-vercel-protection-bypass=YOUR_TOKEN"
```

### Test 2: Full Webhook Test

```bash
curl -X POST "https://your-app.vercel.app/api/webhook/notify-subscribers?x-vercel-protection-bypass=YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -H "x-sanity-webhook-secret: your_webhook_secret" \
  -d '{
    "_type": "article",
    "title": "Test Article",
    "slug": "test-article",
    "description": "Testing webhook"
  }'
```

Expected response (200 OK):

```json
{
  "message": "Notification processed successfully",
  "notificationFile": "notification-1234567890.json",
  "subscriberCount": 2,
  "emailSent": true
}
```

## Alternative Solutions (If You Don't Want to Use Bypass Token)

### Solution 1: Use Production Domain (Recommended)

Production deployments typically don't have deployment protection:

```
https://your-custom-domain.com/api/webhook/notify-subscribers
```

**No bypass token needed!**

### Solution 2: Disable Deployment Protection

1. Go to Vercel → Settings → Deployment Protection
2. Turn off protection (not recommended for production)

### Solution 3: Use ngrok for Local Testing

For development/testing:

```bash
# Start your dev server
npm run dev

# In another terminal
ngrok http 3000

# Use the ngrok URL in Sanity webhook
https://abc123.ngrok.io/api/webhook/notify-subscribers
```

## Recommended Setup for Each Environment

### Development (Local Testing)

```
Use: ngrok
URL: https://random.ngrok.io/api/webhook/notify-subscribers
Protection: None needed
```

### Staging/Preview (Vercel Preview)

```
Use: Bypass token
URL: https://app-git-branch.vercel.app/api/webhook/notify-subscribers?x-vercel-protection-bypass=TOKEN
Protection: Enabled with bypass
```

### Production

```
Use: Custom domain
URL: https://civilenpublishing.com/api/webhook/notify-subscribers
Protection: Usually disabled or use bypass token
```

## Troubleshooting

### Can't Find Bypass Token in Vercel Dashboard?

1. Make sure you're in the correct project
2. Check you have appropriate permissions (Owner/Admin)
3. Look under: Settings → Deployment Protection → Protection Bypass for Automation
4. If no token exists, click "Enable" or "Create Token"

### Token Not Working?

1. **Check the format**: Should be `?x-vercel-protection-bypass=TOKEN`
2. **URL encode if needed**: If token has special characters
3. **Verify it's the correct token**: Copy it again from Vercel dashboard
4. **Check token hasn't expired**: Tokens can be revoked/rotated

### Still Getting 401 Errors?

1. **Verify deployment protection is enabled**: Settings → Deployment Protection
2. **Check you're using the right URL**: Should be your Vercel deployment URL
3. **Test with curl first**: Before configuring Sanity webhook
4. **Check Vercel function logs**: For more detailed error messages

## My Recommendation for Your Setup

Based on your current situation, I recommend:

### For Now (Testing & Development):

**Use ngrok** - No bypass token needed, works immediately

```bash
ngrok http 3000
```

### For Production:

**Use your custom domain** - No bypass token needed if protection is disabled on production

```
https://civilenpublishing.com/api/webhook/notify-subscribers
```

This way you avoid dealing with bypass tokens entirely!

## Summary

| Method        | Pros                              | Cons                      | Best For            |
| ------------- | --------------------------------- | ------------------------- | ------------------- |
| Bypass Token  | Works with all Vercel deployments | Requires token management | Preview deployments |
| Custom Domain | No token needed, clean URLs       | Requires domain setup     | Production          |
| ngrok         | Easy local testing                | Temporary URLs            | Development         |

Choose the method that best fits your workflow!

---

Need help with any of these steps? Let me know!






