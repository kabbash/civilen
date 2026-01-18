# Revalidation Quick Reference Card

## 🚀 Quick Setup (5 minutes)

### 1. Environment Variables
```bash
# .env.local
SANITY_REVALIDATE_SECRET=<generate-with-openssl>
SANITY_WEBHOOK_SECRET=<generate-with-openssl>
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Generate secrets:
```bash
openssl rand -base64 32
```

### 2. Start Dev Server
```bash
npm run dev
```

### 3. Test Manual Revalidation
1. Open `http://localhost:3000/studio`
2. Open any article/book/errata
3. Click "Revalidate" button

### 4. Test API Endpoints
```bash
# Check if endpoints are active
curl http://localhost:3000/api/revalidate
curl http://localhost:3000/api/webhook/revalidate
```

### 5. Run Test Script (Optional)
```bash
# Install tsx if not installed
npm install -D tsx

# Run test
npx tsx scripts/test-revalidation.ts
```

---

## 📍 API Endpoints

### Manual Revalidation
**URL:** `/api/revalidate`
**Method:** POST
**Header:** `x-sanity-revalidate-secret: <your-secret>`
**Body:**
```json
{
  "_type": "article",
  "_id": "doc-id",
  "slug": "article-slug"
}
```

### Webhook Revalidation
**URL:** `/api/webhook/revalidate`
**Method:** POST
**Header:** `x-sanity-webhook-secret: <your-secret>`
**Body:** (Same as above)

---

## 🔧 Sanity Webhook Configuration

1. Go to [Sanity Manage](https://www.sanity.io/manage)
2. Select project → API → Webhooks → Create webhook

**Settings:**
- **URL:** `https://your-domain.com/api/webhook/revalidate`
- **Method:** POST
- **Secret Header:** `x-sanity-webhook-secret` = `<your-webhook-secret>`
- **Trigger on:** Create, Update, Delete
- **Filter:** `_type == "article" || _type == "book" || _type == "errata"`

---

## 🎯 What Gets Revalidated

| Content Type | Paths Revalidated |
|--------------|-------------------|
| Article | `/`, `/articles`, `/articles/[slug]` |
| Book | `/`, `/books`, `/books/[slug]` |
| Errata | `/errata` |

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Revalidate" button not showing | Check `sanity.config.ts` includes `RevalidateAction` |
| "Unauthorized" error | Verify `SANITY_REVALIDATE_SECRET` matches |
| Webhook not triggering | Check webhook is enabled in Sanity Manage |
| Local webhook testing | Use ngrok: `ngrok http 3000` |

---

## ✅ Checklist

- [ ] Environment variables added to `.env.local`
- [ ] Environment variables added to Vercel (production)
- [ ] Dev server started
- [ ] Manual revalidation tested in Studio
- [ ] Webhook configured in Sanity Manage
- [ ] Webhook tested (publish/update content)
- [ ] Production deployment tested

---

## 📚 Full Documentation

- **Complete Guide:** [REVALIDATION_SETUP.md](./REVALIDATION_SETUP.md)
- **Summary:** [REVALIDATION_SUMMARY.md](./REVALIDATION_SUMMARY.md)
- **Env Template:** [REVALIDATION_ENV_TEMPLATE.md](./REVALIDATION_ENV_TEMPLATE.md)

---

## 🆘 Support

**Test Endpoints:**
```bash
# Local
curl http://localhost:3000/api/revalidate
curl http://localhost:3000/api/webhook/revalidate

# Production
curl https://your-domain.com/api/revalidate
curl https://your-domain.com/api/webhook/revalidate
```

**Check Logs:**
- Next.js console for revalidation messages
- Sanity Manage → Webhooks → Logs
- Vercel logs (if deployed)







