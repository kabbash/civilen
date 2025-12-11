# Sanity CMS Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Create Sanity Project

1. Go to [sanity.io](https://www.sanity.io) and sign up
2. Click "Create new project"
3. Choose a name (e.g., "CivilEn Publishing")
4. Select dataset: "production"
5. Copy your **Project ID**

### Step 2: Add Environment Variables

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=paste_your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-11-22
```

### Step 3: Deploy Schema

Run this command in your terminal:

```bash
npx sanity deploy
```

When prompted:

- Select your project
- Confirm deployment

### Step 4: Start Development Server

```bash
npm run dev
```

### Step 5: Access Sanity Studio

Open your browser and go to:

```
http://localhost:3001/studio
```

### Step 6: Add Your First Book

1. In Sanity Studio, click "Book" in the sidebar
2. Click "Create new Book"
3. Fill in:
   - Title: "PE Structural-Gravity Exams"
   - Slug: Click "Generate" button
   - Description: Your book description
   - Upload cover image
   - Amazon Link: Your Amazon URL
   - Check "Featured" to show on homepage
4. Click "Publish"

### Step 7: Add Your First Article

1. Click "Article" in the sidebar
2. Click "Create new Article"
3. Fill in:
   - Title: Your article title
   - Slug: Click "Generate"
   - Excerpt: Short preview
   - Content: Write your article (supports rich text!)
   - Check "Featured" for homepage
4. Click "Publish"

### Step 8: View Your Content

1. Go back to your website: `http://localhost:3001`
2. Wait up to 1 hour for content to appear, OR
3. Restart the dev server to see changes immediately:
   ```bash
   # Stop the server (Ctrl+C)
   npm run dev
   ```

## 🎉 That's It!

Your website is now powered by Sanity CMS!

## 📝 Common Tasks

### Add More Books

1. Go to `/studio`
2. Click "Book" → "Create new Book"
3. Fill in details and publish

### Add Articles

1. Go to `/studio`
2. Click "Article" → "Create new Article"
3. Write content using the rich text editor
4. Publish

### Add Errata

1. Go to `/studio`
2. Click "Errata" → "Create new Errata"
3. Link to a book
4. Fill in details and publish

### Edit Content

1. Go to `/studio`
2. Find your content in the list
3. Click to edit
4. Make changes and click "Publish"

## ⚡ Pro Tips

1. **Quick Refresh**: Restart dev server to see changes immediately
2. **Featured Content**: Check "Featured" to show on homepage
3. **Display Order**: Use "Order" field to control book display order
4. **Rich Text**: Articles support headings, lists, links, and images
5. **Preview**: Use split-pane view in Studio to preview as you edit

## 🆘 Troubleshooting

### Content not showing?

- Check if you published (not just saved as draft)
- Restart dev server
- Wait up to 1 hour for ISR revalidation

### Studio not loading?

- Verify `.env.local` has correct project ID
- Check that you ran `npx sanity deploy`
- Clear browser cache

### Images not displaying?

- Verify images are uploaded in Studio
- Check image file size (keep under 10MB)
- Try different image format (JPG, PNG)

## 📚 Next Steps

1. Migrate existing books from `/data/books.ts`
2. Migrate articles from `/data/articles.ts`
3. Set up errata for your books
4. Customize Sanity Studio (optional)
5. Deploy to production (see SANITY_SETUP.md)

## 🔗 Helpful Links

- Full Setup Guide: See `SANITY_SETUP.md`
- Integration Summary: See `SANITY_INTEGRATION_SUMMARY.md`
- Sanity Docs: https://www.sanity.io/docs
- Support: https://www.sanity.io/help



