# Sanity CMS Integration Guide

This project uses Sanity CMS to manage books, articles, and errata content.

## Setup Instructions

### 1. Create a Sanity Account

1. Go to [sanity.io](https://www.sanity.io) and sign up for a free account
2. Create a new project in the Sanity dashboard
3. Note down your **Project ID** and **Dataset name** (usually "production")

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-11-22
```

Replace `your_project_id_here` with your actual Sanity project ID.

### 3. Deploy Sanity Schema

Deploy your schema to Sanity:

```bash
npx sanity deploy
```

This will deploy the content schemas (Book, Article, Errata) to your Sanity project.

### 4. Access Sanity Studio

The Sanity Studio is available at:

```
http://localhost:3001/studio
```

Or in production:

```
https://your-domain.com/studio
```

### 5. Add Content

1. Navigate to the Sanity Studio
2. Start creating content:
   - **Books**: Add your PE Structural exam books
   - **Articles**: Create exam strategies and resources
   - **Errata**: Link errata to specific books

## Content Schemas

### Book Schema

- **Title**: Book title
- **Slug**: URL-friendly identifier
- **Cover Image**: Book cover image
- **Description**: Short description for cards
- **Full Description**: Detailed description
- **Long Description**: Additional details
- **Inside Book**: Array of bullet points
- **Perfect For**: Array of target audience points
- **Amazon Link**: Purchase link
- **Featured**: Display on homepage
- **Order**: Display order

### Article Schema

- **Title**: Article title
- **Slug**: URL-friendly identifier
- **Image**: Article header image
- **Excerpt**: Short preview text
- **Content**: Portable Text editor for rich content
- **Category**: Article category
- **Featured**: Display on homepage
- **Read Time**: Estimated reading time

### Errata Schema

- **Title**: Errata title
- **Book**: Reference to book
- **Edition**: Book edition
- **Page**: Page number
- **Statement**: Incorrect statement
- **Correction**: Corrected statement
- **Date Reported**: When reported
- **Status**: Published/Draft/Resolved

## Data Migration

To migrate your existing data to Sanity:

1. Access the Sanity Studio at `/studio`
2. Manually create content based on your existing data files:
   - `/data/books.ts`
   - `/data/articles.ts`
   - `/data/errata.ts`

## Content Delivery

The application fetches content from Sanity with:

- **Server-side rendering** for books and article detail pages
- **Incremental Static Regeneration (ISR)** with 1-hour revalidation
- **Client-side fetching** for interactive pages (articles list, errata)

## API Queries

All queries are located in `/sanity/lib/queries.ts`:

- `booksQuery` - Get all books
- `bookBySlugQuery` - Get single book
- `featuredBooksQuery` - Get featured books for homepage
- `articlesQuery` - Get all articles
- `articleBySlugQuery` - Get single article
- `featuredArticlesQuery` - Get featured articles
- `errataQuery` - Get all published errata
- `booksWithErrataQuery` - Get books that have errata

## Image Handling

Sanity images are automatically optimized using `@sanity/image-url`. The helper function `urlForImage()` is available in `/sanity/lib/image.ts`.

## Portable Text

Article content uses Portable Text for rich text editing. Custom components and styling are configured in `/sanity/lib/portableText.tsx`.

## Development vs Production

### Development

- Content changes appear after 1 hour (revalidation period)
- Use `useCdn: true` for faster reads

### Production

- Deploy to Vercel with environment variables set
- Content is cached and revalidated automatically
- Sanity Studio available at `/studio`

## Troubleshooting

### Content not updating

- Clear Next.js cache: `rm -rf .next`
- Check revalidation time in page configs
- Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct

### Studio not loading

- Ensure all environment variables are set
- Check browser console for errors
- Verify Sanity dependencies are installed

### Images not displaying

- Check image URLs in Sanity Studio
- Verify images are properly uploaded
- Check browser console for CORS errors

## Additional Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js + Sanity Guide](https://www.sanity.io/guides/nextjs)
- [Portable Text Guide](https://www.sanity.io/docs/portable-text)






