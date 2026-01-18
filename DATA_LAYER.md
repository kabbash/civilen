# Data Layer Architecture

This document describes the centralized data fetching layer for the CivilEn application.

## Overview

All data fetching logic has been centralized in the `/data` folder. This ensures consistent caching, revalidation behavior, and provides a single source of truth for data operations.

## Structure

```
data/
├── index.ts         # Main export file
├── books.ts         # Book-related data fetching
├── articles.ts      # Article-related data fetching
└── errata.ts        # Errata-related data fetching
```

## Features

### Automatic Revalidation

All fetch functions include Next.js ISR (Incremental Static Regeneration) configuration:

- **Books & Articles**: 1 hour (3600 seconds)
- **Errata**: 30 minutes (1800 seconds) - updates more frequently

This means:
- Content is cached for better performance
- Cached content is automatically refreshed after the revalidation period
- Users get fast page loads with fresh content

### Type Safety

All functions are fully typed with TypeScript interfaces from `/types/index.ts`.

## Usage

### In Server Components (Recommended)

Simply import and use the data fetchers:

```typescript
import { getAllBooks, getFeaturedArticles } from "@/data";

export default async function MyPage() {
  const books = await getAllBooks();
  const articles = await getFeaturedArticles();
  
  return (
    <div>
      {/* Render your data */}
    </div>
  );
}
```

### In Client Components

For pages that need client-side interactivity (search, filters, etc.), you can still use the data fetchers:

```typescript
"use client";
import { getAllArticles } from "@/data";
import { useEffect, useState } from "react";

export default function MyClientPage() {
  const [articles, setArticles] = useState([]);
  
  useEffect(() => {
    async function loadData() {
      const data = await getAllArticles();
      setArticles(data);
    }
    loadData();
  }, []);
  
  return <div>{/* Your component */}</div>;
}
```

## Available Functions

### Books (`data/books.ts`)

- `getAllBooks()` - Fetch all books
- `getBookBySlug(slug: string)` - Fetch a single book by slug
- `getFeaturedBooks()` - Fetch featured books (max 2)
- `generateBooksStaticParams()` - Generate static params for dynamic routes

### Articles (`data/articles.ts`)

- `getAllArticles()` - Fetch all articles
- `getArticleBySlug(slug: string)` - Fetch a single article by slug
- `getFeaturedArticles()` - Fetch featured articles (max 3)
- `generateArticlesStaticParams()` - Generate static params for dynamic routes

### Errata (`data/errata.ts`)

- `getAllErrata()` - Fetch all published errata
- `getErrataByBook(bookSlug: string)` - Fetch errata for a specific book
- `getBooksWithErrata()` - Fetch all books that have errata

## Benefits

1. **Centralized Logic**: All data fetching in one place, easier to maintain
2. **Consistent Caching**: Uniform revalidation strategy across the app
3. **Better Performance**: Automatic ISR reduces API calls and improves load times
4. **Type Safety**: Full TypeScript support with proper interfaces
5. **Easy Testing**: Isolated data layer makes testing easier
6. **Flexible Revalidation**: Easy to adjust cache times per entity type

## Revalidation Strategy

### On-Demand Revalidation

You can trigger on-demand revalidation from API routes or webhooks:

```typescript
import { revalidatePath, revalidateTag } from 'next/cache';

// In an API route
export async function POST(request: Request) {
  // After updating data in Sanity
  revalidatePath('/books');
  revalidatePath('/articles');
  revalidatePath('/errata');
  
  return new Response('Revalidated', { status: 200 });
}
```

### Time-Based Revalidation

Currently configured:
- Books/Articles: 1 hour
- Errata: 30 minutes

To modify, update the `REVALIDATE_TIME` constant in each data file.

## Migration Notes

All pages have been updated to use the new data layer:

- ✅ Home page (`/app/page.tsx`)
- ✅ Books list (`/app/books/page.tsx`)
- ✅ Book detail (`/app/books/[slug]/page.tsx`)
- ✅ Articles list (`/app/articles/page.tsx`)
- ✅ Article detail (`/app/articles/[slug]/page.tsx`)
- ✅ Errata page (`/app/errata/page.tsx`)

The old `/sanity/lib/fetch.ts` file is kept for backward compatibility but should not be used for new features.

## Best Practices

1. **Always import from `/data`**: Don't directly use Sanity client in pages
2. **Server components when possible**: Use server components for better performance
3. **Adjust revalidation times**: Based on how frequently your content updates
4. **Handle errors**: Always wrap async calls in try-catch blocks
5. **Type your data**: Use the TypeScript interfaces from `/types`

## Troubleshooting

### Stale Data

If you see stale data:
1. Check the revalidation time in the relevant data file
2. Trigger on-demand revalidation if needed
3. In development, try clearing Next.js cache: `rm -rf .next`

### Type Errors

If you encounter type errors:
1. Check `/types/index.ts` for the correct interface
2. Ensure your Sanity queries return all required fields
3. Update the interface if the schema changed

### Performance Issues

If pages are slow:
1. Increase revalidation time to cache longer
2. Use `generateStaticParams()` for static generation
3. Consider server components instead of client components







