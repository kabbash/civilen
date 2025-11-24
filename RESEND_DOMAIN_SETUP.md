# Resend Domain Setup Guide

## Current Status

✅ **Webhook is working!** The filesystem error is fixed.  
⚠️ **Email sending** uses Resend's test domain: `onboarding@resend.dev`

This is fine for **testing**, but for **production** you should verify your own domain.

## Option 1: Keep Using Test Domain (Quick Testing)

**Pros:**
- ✅ Works immediately
- ✅ No setup needed
- ✅ Good for testing

**Cons:**
- ❌ Emails come from `onboarding@resend.dev` (not branded)
- ❌ Limited sending (100 emails/day)
- ❌ May go to spam more often

**Current setup:** Emails are sent from `CivilEn Publishing <onboarding@resend.dev>`

This is what I just configured - it will work right away!

---

## Option 2: Verify Your Domain (Production Ready)

To send emails from `newsletter@civilenpublishing.com`:

### Step 1: Add Domain in Resend

1. Go to: https://resend.com/domains
2. Click **"Add Domain"**
3. Enter: `civilenpublishing.com`
4. Click **"Add"**

### Step 2: Add DNS Records

Resend will show you DNS records to add. You'll need to add these to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.):

**Typical records (yours will be specific):**

```
Type: TXT
Name: resend._domainkey
Value: [Resend will provide this]

Type: MX
Name: @
Value: feedback-smtp.us-east-1.amazonses.com
Priority: 10
```

### Step 3: Verify Domain

1. After adding DNS records, wait 5-10 minutes
2. Go back to Resend → Domains
3. Click **"Verify"** next to your domain
4. Once verified, you'll see a green checkmark ✓

### Step 4: Update Your Code

Once verified, update the email sender back to your domain:

```typescript
// In lib/email.ts
from: 'CivilEn Publishing <newsletter@civilenpublishing.com>',
```

Then commit and push:
```bash
git add lib/email.ts
git commit -m "chore: use verified civilenpublishing.com domain"
git push
```

---

## Testing Email Delivery

### Test the Complete Flow

1. **Subscribe** to newsletter via footer
2. **Publish** new content in Sanity
3. **Check** Vercel logs for:
   ```
   [Webhook v3.0] Successfully processed article: Your Title
   [Webhook v3.0] Notified X subscribers
   ```
4. **Check your inbox** for the email!

### Check Resend Logs

To see email delivery status:
1. Go to: https://resend.com/emails
2. You'll see all sent emails with status:
   - ✅ **Delivered** - Success
   - ⏳ **Queued** - Being sent
   - ❌ **Bounced** - Failed

---

## Current Email Templates

Your newsletters include:

### For New Articles:
- Subject: `New Article: [Article Title]`
- Branded header with CivilEn Publishing
- Article title and description
- "Read Article" button linking to full article
- Company info and unsubscribe link

### For New Books:
- Subject: `New Book Available: [Book Title]`
- Branded header with CivilEn Publishing
- Book title and description
- "View Book Details" button
- Company info and unsubscribe link

---

## Email Sending Limits

### Resend Test Domain (`onboarding@resend.dev`):
- 100 emails per day
- 1 email per second

### Verified Domain:
- Free tier: 3,000 emails/month
- Paid tiers: Up to millions/month

---

## Next Steps

### For Testing (Now):
✅ Everything is ready! Test by:
1. Subscribe to newsletter
2. Publish content in Sanity
3. Check your inbox

### For Production (Later):
1. Verify your domain in Resend
2. Update the `from` email in code
3. Redeploy

---

## Troubleshooting

### Emails Not Arriving?

1. **Check Resend logs**: https://resend.com/emails
2. **Check spam folder**: Test emails often go to spam
3. **Check Vercel logs**: Look for email sending errors
4. **Verify API key**: Make sure `RESEND_API_KEY` is set in Vercel

### Domain Verification Failing?

1. **Wait longer**: DNS changes can take up to 24 hours
2. **Check DNS**: Use https://mxtoolbox.com to verify records
3. **Contact support**: Resend has excellent support

### Emails Going to Spam?

Using your own verified domain helps, but also:
- Add SPF, DKIM records (Resend provides these)
- Warm up your domain by sending gradually
- Ask subscribers to whitelist your email
- Include unsubscribe link (already included)

---

## Summary

**Right now:**
- ✅ Webhook works perfectly
- ✅ Emails send from `onboarding@resend.dev`
- ✅ Ready for testing

**For production:**
- Verify `civilenpublishing.com` in Resend
- Update sender email in code
- Emails will be fully branded

Test it now and verify everything works! 🎉

