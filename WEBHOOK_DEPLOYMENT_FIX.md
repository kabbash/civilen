# Fixing Sanity Webhook 401 Error on Vercel

## The Problem

You're getting a 401 (Authentication Required) error because:

- Your Sanity webhook is trying to reach a Vercel deployment
- Vercel has **Deployment Protection** enabled (default for preview deployments)
- Sanity's webhook can't bypass this protection

## Solutions (Choose One)

### Solution 1: Use Production URL (Recommended)

The simplest solution is to configure the webhook to use your **production** URL, which typically doesn't have deployment protection.

1. Go to Sanity Dashboard: https://www.sanity.io/manage
2. Navigate to: **API** → **Webhooks**
3. Edit your webhook
4. Change the URL to your **production domain**:

   ```
   https://your-production-domain.com/api/webhook/notify-subscribers
   ```

   (Not the preview URL like `your-app-git-branch.vercel.app`)

5. Save the webhook

**When to use**: If you have a production deployment and want webhooks to only trigger on production.

---

### Solution 2: Disable Deployment Protection (For Testing)

If you need to test with preview deployments:

1. Go to Vercel Dashboard: https://vercel.com
2. Select your project
3. Go to **Settings** → **Deployment Protection**
4. Under "Protection Bypass for Automation", enable:
   - **Standard Protection Bypass**
5. Or, add Sanity's IP addresses to the allowlist

**When to use**: For testing webhooks on preview deployments.

⚠️ **Note**: This reduces security for preview deployments.

---

### Solution 3: Test Locally with ngrok (Best for Development)

For local testing without deploying:

#### Step 1: Install ngrok

```bash
# Using npm
npm install -g ngrok

# Or using Homebrew (Mac)
brew install ngrok/ngrok/ngrok
```

#### Step 2: Start Your Local Server

```bash
npm run dev
# Server running on http://localhost:3000
```

#### Step 3: Expose Local Server with ngrok

```bash
# In a new terminal window:
ngrok http 3000
```

You'll see output like:

```
Forwarding    https://abc123.ngrok.io -> http://localhost:3000
```

#### Step 4: Configure Sanity Webhook

1. Go to Sanity Dashboard → API → Webhooks
2. Edit your webhook
3. Set URL to: `https://abc123.ngrok.io/api/webhook/notify-subscribers`
4. Save

#### Step 5: Test by Publishing Content

Now when you publish an article or book in Sanity, the webhook will reach your local server!

**When to use**: During development and testing before deployment.

---

### Solution 4: Configure Webhook Secret (Production Ready)

For production, ensure your webhook has proper security:

1. **Generate a secure secret**:

   ```bash
   # Generate a random secret
   openssl rand -hex 32
   ```

2. **Add to Sanity Webhook**:
   - Go to Sanity Dashboard → API → Webhooks
   - Edit your webhook
   - Add the secret in the "Secret" field

3. **Add to Vercel Environment Variables**:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add: `SANITY_WEBHOOK_SECRET` = `your_secret_here`
   - Apply to: Production, Preview, Development

4. **Redeploy** your application for changes to take effect

---

## Testing the Webhook

### Test with curl (Local Development)

```bash
curl -X POST http://localhost:3000/api/webhook/notify-subscribers \
  -H "Content-Type: application/json" \
  -H "x-sanity-webhook-secret: your_secret_here" \
  -d '{
    "_type": "article",
    "title": "Test Article",
    "slug": "test-article",
    "description": "This is a test"
  }'
```

### Check Webhook Logs in Sanity

1. Go to: https://www.sanity.io/manage
2. Select your project
3. Go to: **API** → **Webhooks**
4. Click on your webhook
5. View the **Delivery Log** tab
6. You should see:
   - ✅ Green checkmark = Success (200 status)
   - ❌ Red X = Failure (with error details)

### Check Vercel Logs

If using Vercel:

1. Go to Vercel Dashboard → Your Project
2. Click on **Functions** tab
3. Look for logs from `/api/webhook/notify-subscribers`
4. Check for any errors or successful executions

---

## My Recommendation

For your current setup, I recommend:

### During Development:

1. ✅ Use **ngrok** to test webhooks locally
2. ✅ This lets you develop and test without deploying

### For Production:

1. ✅ Use your **production domain** in the webhook URL
2. ✅ Add `SANITY_WEBHOOK_SECRET` to Vercel environment variables
3. ✅ Test by publishing content and checking:
   - Sanity webhook logs
   - Vercel function logs
   - `/notifications` folder for new files
   - Subscriber emails being sent

---

## Quick Check: Is Your Webhook Working?

Run this command to check if your endpoint is accessible:

```bash
# Replace with your actual URL
curl https://your-domain.com/api/webhook/notify-subscribers

# Expected response:
# {
#   "message": "Newsletter notification webhook is active",
#   "endpoint": "/api/webhook/notify-subscribers"
# }
```

If you get a 401 error, follow Solution 1 or 3 above.

---

## Complete Setup Checklist

- [ ] Sanity API Token added to `.env.local` / Vercel env vars
- [ ] Webhook secret added to `.env.local` / Vercel env vars
- [ ] Resend API key added to `.env.local` / Vercel env vars
- [ ] Webhook URL configured in Sanity (using production URL)
- [ ] Webhook secret configured in Sanity (matching your env var)
- [ ] Application redeployed (if using Vercel)
- [ ] Test subscription working (footer form)
- [ ] Test webhook by publishing content
- [ ] Verify notification files created
- [ ] Verify emails sent (check logs)

---

## Troubleshooting

### Still Getting 401?

1. **Check the webhook URL** - Make sure it's not a preview deployment URL
2. **Use production URL** - `yourdomain.com` not `yourdomain-git-branch.vercel.app`
3. **Check Vercel protection settings** - Might need to disable for automation

### Webhook Returns 500?

1. Check Vercel function logs for errors
2. Verify all environment variables are set
3. Check that SANITY_API_TOKEN has write permissions
4. Verify email service (Resend) is configured

### No Subscribers Found?

1. Test the subscription form first
2. Check Sanity Studio → Newsletter Subscribers
3. Make sure at least one subscriber exists and is active
4. Check the webhook query in the code

### Emails Not Sending?

1. Check Resend API key is valid
2. Verify sender domain is configured in Resend
3. Check function logs for email errors
4. Test Resend API separately

---

## Need More Help?

1. Check Sanity webhook delivery logs
2. Check Vercel function logs
3. Use ngrok for local testing
4. Test each component separately (subscription, webhook, email)

For questions: info@civilenpublishing.com


