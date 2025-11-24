import { client } from './client'
import { 
  booksQuery, 
  bookBySlugQuery, 
  featuredBooksQuery,
  articlesQuery,
  articleBySlugQuery,
  featuredArticlesQuery,
  errataQuery,
  errataByBookQuery,
  booksWithErrataQuery
} from './queries'

// Books
export async function getAllBooks() {
  return await client.fetch(booksQuery)
}

export async function getBookBySlug(slug: string) {
  return await client.fetch(bookBySlugQuery, { slug })
}

export async function getFeaturedBooks() {
  return await client.fetch(featuredBooksQuery)
}

// Articles
export async function getAllArticles() {
  return await client.fetch(articlesQuery)
}

export async function getArticleBySlug(slug: string) {
  return await client.fetch(articleBySlugQuery, { slug })
}

export async function getFeaturedArticles() {
  return await client.fetch(featuredArticlesQuery)
}

// Errata
export async function getAllErrata() {
  return await client.fetch(errataQuery)
}

export async function getErrataByBook(bookSlug: string) {
  return await client.fetch(errataByBookQuery, { bookSlug })
}

export async function getBooksWithErrata() {
  return await client.fetch(booksWithErrataQuery)
}

