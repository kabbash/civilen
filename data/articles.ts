import { client } from "@/sanity/lib/client";
import { articlesQuery, articleBySlugQuery, featuredArticlesQuery } from "@/sanity/lib/queries";
import type { Article } from "@/types";

// Revalidation time in seconds (1 hour)
const REVALIDATE_TIME = 60;

/**
 * Fetch all articles with revalidation
 */
export async function getAllArticles(): Promise<Article[]> {
  return await client.fetch(
    articlesQuery,
    {},
    {
      next: { revalidate: REVALIDATE_TIME },
    }
  );
}

/**
 * Fetch a single article by slug with revalidation
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return await client.fetch(
    articleBySlugQuery,
    { slug },
    {
      next: { revalidate: REVALIDATE_TIME },
    }
  );
}

/**
 * Fetch featured articles with revalidation
 */
export async function getFeaturedArticles(): Promise<Article[]> {
  return await client.fetch(
    featuredArticlesQuery,
    {},
    {
      next: { revalidate: REVALIDATE_TIME },
    }
  );
}

/**
 * Generate static params for all articles (used in dynamic routes)
 */
export async function generateArticlesStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article: Article) => ({
    slug: article.slug,
  }));
}


