# Data Layer - Quick Reference

## Import Syntax

```typescript
// Import from centralized data layer
import { 
  getAllBooks, 
  getBookBySlug, 
  getFeaturedBooks,
  getAllArticles,
  getArticleBySlug,
  getFeaturedArticles,
  getAllErrata,
  getErrataByBook,
  getBooksWithErrata 
} from "@/data";
```

## Function Reference

### Books

| Function | Parameters | Returns | Revalidation |
|----------|-----------|---------|--------------|
| `getAllBooks()` | none | `Book[]` | 1 hour |
| `getBookBySlug(slug)` | `slug: string` | `Book \| null` | 1 hour |
| `getFeaturedBooks()` | none | `Book[]` (max 2) | 1 hour |
| `generateBooksStaticParams()` | none | `{slug: string}[]` | - |

### Articles

| Function | Parameters | Returns | Revalidation |
|----------|-----------|---------|--------------|
| `getAllArticles()` | none | `Article[]` | 1 hour |
| `getArticleBySlug(slug)` | `slug: string` | `Article \| null` | 1 hour |
| `getFeaturedArticles()` | none | `Article[]` (max 3) | 1 hour |
| `generateArticlesStaticParams()` | none | `{slug: string}[]` | - |

### Errata

| Function | Parameters | Returns | Revalidation |
|----------|-----------|---------|--------------|
| `getAllErrata()` | none | `Errata[]` | 30 minutes |
| `getErrataByBook(bookSlug)` | `bookSlug: string` | `Errata[]` | 30 minutes |
| `getBooksWithErrata()` | none | `Book[]` | 30 minutes |

## Usage Examples

### Server Component (Recommended)
```typescript
import { getAllBooks } from "@/data";

export default async function BooksPage() {
  const books = await getAllBooks();
  return <div>{/* render books */}</div>;
}
```

### Client Component
```typescript
"use client";
import { getAllArticles } from "@/data";
import { useEffect, useState } from "react";

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  
  useEffect(() => {
    getAllArticles().then(setArticles);
  }, []);
  
  return <div>{/* render articles */}</div>;
}
```

### Dynamic Routes
```typescript
import { getBookBySlug, generateBooksStaticParams } from "@/data";

export async function generateStaticParams() {
  return await generateBooksStaticParams();
}

export default async function BookPage({ params }) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);
  return <div>{/* render book */}</div>;
}
```

## Revalidation Times

- **Books & Articles**: 3600 seconds (1 hour)
- **Errata**: 1800 seconds (30 minutes)

To modify, edit `REVALIDATE_TIME` in the respective file:
- `data/books.ts`
- `data/articles.ts`
- `data/errata.ts`

## File Structure

```
data/
├── README.md        ← You are here
├── index.ts         ← Main exports
├── books.ts         ← Book operations
├── articles.ts      ← Article operations
└── errata.ts        ← Errata operations
```

## More Information

See [`DATA_LAYER.md`](../DATA_LAYER.md) for complete documentation.






