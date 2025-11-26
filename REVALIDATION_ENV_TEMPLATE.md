# Environment Variables for Revalidation

Add these environment variables to your `.env.local` file:

```env
# Revalidation secret (generate a random string)
# Used by the manual revalidation endpoint
SANITY_REVALIDATE_SECRET=your-revalidate-secret-here

# Webhook secret (for automatic revalidation)
# Used by the webhook endpoint and configured in Sanity webhooks
SANITY_WEBHOOK_SECRET=your-webhook-secret-here

# Base URL (production URL)
# Used by Sanity Studio to call the revalidation API
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

## Generate Secure Secrets

Run this command to generate a random secret:

```bash
openssl rand -base64 32
```

Run it twice to generate two different secrets (one for `SANITY_REVALIDATE_SECRET` and one for `SANITY_WEBHOOK_SECRET`).

## Example Values

```env
SANITY_REVALIDATE_SECRET=abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
SANITY_WEBHOOK_SECRET=xyz987wvu654tsr321pqo098nml765kji432hgf109edc876ba
NEXT_PUBLIC_BASE_URL=https://yoursite.vercel.app
```

## Development vs Production

### Development (`.env.local`):
```env
SANITY_REVALIDATE_SECRET=dev-secret-123
SANITY_WEBHOOK_SECRET=dev-webhook-456
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Production (Vercel Environment Variables):
- Use strong, unique secrets
- Set `NEXT_PUBLIC_BASE_URL` to your production domain
- Add all three variables in Vercel project settings

