/**
 * Centralized data fetching layer
 * 
 * This module exports all data fetching functions with revalidation logic.
 * All fetch operations should go through this layer to ensure consistent
 * caching and revalidation behavior.
 */

// Books
export {
  getAllBooks,
  getBookBySlug,
  getFeaturedBooks,
  generateBooksStaticParams,
} from "./books";

// Articles
export {
  getAllArticles,
  getArticleBySlug,
  getFeaturedArticles,
  generateArticlesStaticParams,
} from "./articles";

// Errata
export {
  getAllErrata,
  getErrataByBook,
  getBooksWithErrata,
} from "./errata";

// Banners
export {
  getActiveBanners,
  getAllBanners,
} from "./banners";

// Promo Codes
export {
  getPromoCodeByName,
} from "./promoCodes";

