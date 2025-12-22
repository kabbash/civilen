# Contact Form Troubleshooting Guide

## Issue: Form shows success but no email received

If the contact form shows "Message sent successfully" but you don't receive any email, follow these steps:

## Step 1: Check Vercel Environment Variables

The most common issue is missing environment variables in Vercel.

### Required Environment Variables:

```env
RESEND_API_KEY=re_your_key_here
CONTACT_FROM_EMAIL=CivilEn Contact <onboarding@resend.dev>
CONTACT_TO_EMAIL=your-email@example.com
```

### How to Add/Check in Vercel:

1. Go to: https://vercel.com/dashboard
2. Select your project
3. Click **Settings** → **Environment Variables**
4. Verify these variables exist:
   - ✅ `RESEND_API_KEY`
   - ✅ `CONTACT_FROM_EMAIL`
   - ✅ `CONTACT_TO_EMAIL`

5. If missing, add them:
   - Click **"Add New"**
   - Enter variable name
   - Enter value
   - Select: **Production, Preview, Development**
   - Click **Save**

6. **Important**: After adding variables, you MUST redeploy!
   - Go to **Deployments** tab
   - Click on the latest deployment
   - Click **"Redeploy"** (three dots menu)
   - **Uncheck** "Use existing Build Cache"
   - Click **"Redeploy"**

## Step 2: Check Vercel Function Logs

### View Real-Time Logs:

1. Go to Vercel Dashboard → Your Project
2. Click **Logs** tab (or **Functions** tab)
3. Filter by `/api/contact`
4. Submit the contact form
5. Look for these log entries:

**Good logs (working):**

```
[Contact Form] Processing message from John Doe (john@example.com)
[Contact Form] Subject: Test Message
📧 Sending contact email to: info@civilenpublishing.com
[Contact Form] ✅ Message sent successfully
```

**Bad logs (not working):**

```
[Contact Form] RESEND_API_KEY not configured
Contact form error: Email service not configured
```

Or:

```
Email sending failed: { statusCode: 403, message: 'Domain not verified' }
```

## Step 3: Check Resend Dashboard

1. Go to: https://resend.com/emails
2. Look for recent emails
3. Check the status:
   - ✅ **Delivered** = Success
   - ⏳ **Queued** = In progress
   - ❌ **Bounced** = Failed

If you don't see any emails at all, the API key might not be set or is invalid.

## Step 4: Test the API Endpoint Directly

Test with curl to see the actual error:

```bash
curl -X POST https://your-app.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message"
  }'
```

**Expected successful response:**

```json
{
  "message": "Message sent successfully! We will get back to you soon.",
  "success": true
}
```

**If environment variables missing:**

```json
{
  "error": "Failed to send message. Please try again later."
}
```

## Step 5: Verify API Key

Make sure your Resend API key is valid:

1. Go to: https://resend.com/api-keys
2. Check if your key exists
3. If needed, create a new one:
   - Click **"Create API Key"**
   - Name: `Production API Key`
   - Permission: **Sending access**
   - Click **"Add"**
   - **Copy the key immediately**
4. Update the key in Vercel environment variables
5. Redeploy

## Step 6: Check Email Addresses

Verify your email configuration:

### Using Test Domain (Default):

```env
CONTACT_FROM_EMAIL=CivilEn Contact <onboarding@resend.dev>
CONTACT_TO_EMAIL=your-actual-email@gmail.com
```

The test domain `onboarding@resend.dev` works without verification.

### Using Custom Domain:

```env
CONTACT_FROM_EMAIL=CivilEn Contact <contact@civilenpublishing.com>
CONTACT_TO_EMAIL=info@civilenpublishing.com
```

If using a custom domain, it MUST be verified in Resend first!

## Step 7: Check Spam Folder

Contact form emails sometimes go to spam, especially when using:

- Test domains (`onboarding@resend.dev`)
- Unverified custom domains
- First-time senders

Check your spam/junk folder for emails from the configured sender.

## Common Issues & Solutions

### Issue: "Email service not configured"

**Cause**: `RESEND_API_KEY` is not set in Vercel  
**Solution**: Add the API key to Vercel environment variables and redeploy

### Issue: "Domain not verified"

**Cause**: Using custom domain that isn't verified in Resend  
**Solution**: Either:

- Use test domain: `onboarding@resend.dev`
- Or verify your domain in Resend: https://resend.com/domains

### Issue: Form succeeds but no logs appear

**Cause**: Old deployment is running without new code  
**Solution**: Redeploy without build cache

### Issue: API key invalid

**Cause**: Wrong API key or expired key  
**Solution**: Generate new API key in Resend and update Vercel

### Issue: Email not in Resend logs

**Cause**: API key not configured or email function failed silently  
**Solution**: Check Vercel function logs for errors

## Quick Fix Checklist

Run through this checklist:

- [ ] `RESEND_API_KEY` is set in Vercel
- [ ] `CONTACT_FROM_EMAIL` is set in Vercel
- [ ] `CONTACT_TO_EMAIL` is set in Vercel (your actual email!)
- [ ] All variables are applied to "Production"
- [ ] Application has been redeployed AFTER adding variables
- [ ] Resend API key is valid (check https://resend.com/api-keys)
- [ ] If using custom domain, it's verified in Resend
- [ ] Checked spam folder
- [ ] Checked Vercel function logs
- [ ] Checked Resend dashboard

## Testing After Fix

1. **Redeploy** the application (MUST do this after adding env vars)
2. **Wait 2 minutes** for deployment to complete
3. **Submit contact form** with test data
4. **Check Vercel logs** immediately (should see `[Contact Form]` entries)
5. **Check Resend dashboard** (https://resend.com/emails)
6. **Check your inbox** (and spam folder)

## Still Not Working?

### Get Detailed Logs:

After redeploying with the new logging code:

1. Submit the contact form
2. Go to Vercel → Logs
3. Look for `[Contact Form]` entries
4. Screenshot or copy the error
5. Check if you see:

   ```
   [Contact Form] RESEND_API_KEY not configured
   ```

   → API key not set in Vercel

   ```
   Email sending failed: { statusCode: 403 }
   ```

   → Domain not verified or invalid API key

### Manual Test:

Test locally to verify it works:

```bash
# In your project directory
npm run dev

# Add to .env.local:
RESEND_API_KEY=re_your_key
CONTACT_FROM_EMAIL=CivilEn Contact <onboarding@resend.dev>
CONTACT_TO_EMAIL=your-email@gmail.com

# Test the form at http://localhost:3000/contact
```

If it works locally but not on Vercel, the issue is definitely environment variables.

## Need More Help?

Provide these details:

1. Screenshot of Vercel environment variables (hide values)
2. Screenshot of Vercel function logs after form submission
3. Screenshot of Resend dashboard
4. What error messages appear in logs

---

**Most likely fix**: Add `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL` to Vercel environment variables, then redeploy!




