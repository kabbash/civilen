# Sanity API Token Setup Guide

## The Issue

You're getting a permissions error because the Sanity client needs a **write token** to create subscribers. By default, Sanity only allows read operations without authentication.

## Step-by-Step Solution

### Step 1: Create a Sanity API Token with Write Permissions

1. **Go to Sanity Management Console**
   - Visit: https://www.sanity.io/manage
   - Select your project (CivilEn)

2. **Navigate to API Settings**
   - Click on **API** in the left sidebar
   - Click on **Tokens** tab

3. **Create New Token**
   - Click the **"Add API token"** button
   - Fill in the details:
     - **Name**: `Newsletter API Token` (or any descriptive name)
     - **Permissions**: Select **Editor** (this gives read and write access)
     - **Note**: You can use "Editor" for full access, or create a custom role if you want to limit permissions

4. **Copy the Token**
   - ⚠️ **IMPORTANT**: Copy the token immediately! You won't be able to see it again.
   - The token will look like: `skXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`

### Step 2: Add Token to Your Environment Variables

1. **Open your `.env.local` file** in the project root
2. **Add the token**:

   ```env
   # Sanity Configuration
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production

   # Sanity API Token with write permissions (keep this secret!)
   SANITY_API_TOKEN=skXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

   # Newsletter Webhook Secret
   SANITY_WEBHOOK_SECRET=your_webhook_secret

   # Email Service
   RESEND_API_KEY=re_your_key

   # Site URL
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. **Save the file**

### Step 3: Restart Your Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 4: Test the Newsletter Subscription

1. Go to your website footer
2. Enter an email address
3. Click "Subscribe"
4. You should see: "Successfully subscribed to newsletter!"
5. Check Sanity Studio → Newsletter Subscribers to verify

## Security Best Practices

### ⚠️ Important Security Notes:

1. **Never commit `.env.local` to git** - It's already in `.gitignore`
2. **Never expose the token in client-side code** - We're only using it in API routes (server-side)
3. **Use different tokens for development and production**
4. **Rotate tokens periodically** for security
5. **Use minimum required permissions** - Editor is fine, but you can create custom roles

### For Production Deployment

When deploying to Vercel, Netlify, or other platforms:

1. Add the environment variables in your hosting platform's dashboard
2. Don't paste them in your code
3. Use different tokens for different environments

**Example for Vercel:**

- Go to: Project Settings → Environment Variables
- Add each variable separately
- Set the appropriate environment (Production, Preview, Development)

## Troubleshooting

### Still Getting Permission Errors?

1. **Check the token is correct**

   ```bash
   # In your terminal, check if the token is set:
   echo $SANITY_API_TOKEN
   ```

2. **Verify token permissions**
   - Go back to Sanity Dashboard → API → Tokens
   - Make sure the token has "Editor" permissions
   - If not, delete it and create a new one

3. **Restart the server**
   - Environment variables are only loaded on server start
   - Press Ctrl+C and run `npm run dev` again

4. **Check the token in the API route**
   - Add temporary logging to verify:
   ```typescript
   console.log("Token exists:", !!process.env.SANITY_API_TOKEN);
   ```

### Token Not Found?

If you see `Token exists: false`:

- Make sure `.env.local` is in the project root (same folder as `package.json`)
- Check for typos in the variable name
- Make sure there are no spaces around the `=` sign
- Restart your dev server

## What We Fixed

### Code Changes Made:

1. **Created a separate write client** in `sanity/lib/client.ts`
   - Regular `client` for public reads (CDN cached)
   - New `writeClient` with token for writes (API routes only)

2. **Updated API routes** to use `writeClient`:
   - `app/api/subscribe/route.ts` - Now uses authenticated client
   - `app/api/webhook/notify-subscribers/route.ts` - Now uses authenticated client

## Next Steps

After setting up the token:

1. ✅ Test newsletter subscription
2. ✅ Verify subscriber appears in Sanity Studio
3. ✅ Set up Sanity webhook (see NEWSLETTER_SETUP.md)
4. ✅ Configure email service (Resend)
5. ✅ Test the complete flow

## Need Help?

If you're still having issues:

1. Check the console for error messages
2. Verify all environment variables are set
3. Make sure you restarted the server after adding the token
4. Check Sanity Dashboard → API → Tokens to verify the token is active

---

**Remember**: The API token is like a password - keep it secret and never share it publicly!






