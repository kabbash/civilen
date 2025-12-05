import { client } from "@/sanity/lib/client";
import { errataQuery, errataByBookQuery, booksWithErrataQuery } from "@/sanity/lib/queries";
import type { Book, Errata } from "@/types";

// Revalidation time in seconds (30 minutes for errata since it updates less frequently)
const REVALIDATE_TIME = 60;

/**
 * Fetch all published errata with revalidation
 */
export async function getAllErrata(): Promise<Errata[]> {
  try {
    const result = await client.fetch(
      errataQuery,
      {},
      {
        next: { revalidate: REVALIDATE_TIME },
      }
    );
    return result || [];
  } catch (error) {
    console.error("Error fetching errata:", error);
    return [];
  }
}

/**
 * Fetch errata for a specific book with revalidation
 */
export async function getErrataByBook(bookSlug: string): Promise<Errata[]> {
  try {
    const result = await client.fetch(
      errataByBookQuery,
      { bookSlug },
      {
        next: { revalidate: REVALIDATE_TIME },
      }
    );
    return result || [];
  } catch (error) {
    console.error("Error fetching errata by book:", error);
    return [];
  }
}

/**
 * Fetch all books that have published errata with revalidation
 */
export async function getBooksWithErrata(): Promise<Book[]> {
  try {
    const result = await client.fetch(
      booksWithErrataQuery,
      {},
      {
        next: { revalidate: REVALIDATE_TIME },
      }
    );
    return result || [];
  } catch (error) {
    console.error("Error fetching books with errata:", error);
    return [];
  }
}


