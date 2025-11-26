import { client } from "@/sanity/lib/client";
import { errataQuery, errataByBookQuery, booksWithErrataQuery } from "@/sanity/lib/queries";
import type { Book, Errata } from "@/types";

// Revalidation time in seconds (30 minutes for errata since it updates less frequently)
const REVALIDATE_TIME = 60;

/**
 * Fetch all published errata with revalidation
 */
export async function getAllErrata(): Promise<Errata[]> {
  return await client.fetch(
    errataQuery,
    {},
    {
      next: { revalidate: REVALIDATE_TIME },
    }
  );
}

/**
 * Fetch errata for a specific book with revalidation
 */
export async function getErrataByBook(bookSlug: string): Promise<Errata[]> {
  return await client.fetch(
    errataByBookQuery,
    { bookSlug },
    {
      next: { revalidate: REVALIDATE_TIME },
    }
  );
}

/**
 * Fetch all books that have published errata with revalidation
 */
export async function getBooksWithErrata(): Promise<Book[]> {
  return await client.fetch(
    booksWithErrataQuery,
    {},
    {
      next: { revalidate: REVALIDATE_TIME },
    }
  );
}
