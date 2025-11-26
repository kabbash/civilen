import { client } from "@/sanity/lib/client";
import {
  booksQuery,
  bookBySlugQuery,
  featuredBooksQuery,
} from "@/sanity/lib/queries";
import type { Book } from "@/types";

// Revalidation time in seconds (1 hour)
const REVALIDATE_TIME = 3600;

/**
 * Fetch all books with revalidation
 */
export async function getAllBooks(): Promise<Book[]> {
  return await client.fetch(booksQuery, {}, {
    next: { revalidate: REVALIDATE_TIME }
  });
}

/**
 * Fetch a single book by slug with revalidation
 */
export async function getBookBySlug(slug: string): Promise<Book | null> {
  return await client.fetch(bookBySlugQuery, { slug }, {
    next: { revalidate: REVALIDATE_TIME }
  });
}

/**
 * Fetch featured books with revalidation
 */
export async function getFeaturedBooks(): Promise<Book[]> {
  return await client.fetch(featuredBooksQuery, {}, {
    next: { revalidate: REVALIDATE_TIME }
  });
}

/**
 * Generate static params for all books (used in dynamic routes)
 */
export async function generateBooksStaticParams() {
  const books = await getAllBooks();
  return books.map((book: Book) => ({
    slug: book.slug,
  }));
}

