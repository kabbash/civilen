import { groq } from "next-sanity";

// Book queries
export const booksQuery = groq`*[_type == "book"] | order(order asc, publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  coverImage,
  description,
  amazonLink,
  featured,
  order,
  "samplePdfUrl": samplePdf.asset->url
}`;

export const bookBySlugQuery = groq`*[_type == "book" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  coverImage,
  description,
  fullDescription,
  longDescription,
  amazonLink,
  insideBook,
  perfectFor,
  publishedAt,
  "samplePdfUrl": samplePdf.asset->url
}`;

export const featuredBooksQuery = groq`*[_type == "book" && featured == true && defined(publishedAt)] | order(order asc, publishedAt desc) [0...2] {
  _id,
  title,
  "slug": slug.current,
  coverImage,
  description,
  amazonLink,
  order,
  "samplePdfUrl": samplePdf.asset->url
}`;

// Article queries
export const articlesQuery = groq`*[_type == "article"] | order(order asc, publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  image,
  excerpt,
  category,
  publishedAt,
  readTime,
  order
}`;

export const articleBySlugQuery = groq`*[_type == "article" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  image,
  excerpt,
  content,
  category,
  publishedAt,
  readTime
}`;

export const featuredArticlesQuery = groq`*[_type == "article" && featured == true] | order(order asc, publishedAt desc) [0...3] {
  _id,
  title,
  "slug": slug.current,
  image,
  excerpt,
  publishedAt,
  readTime,
  order
}`;

// Errata queries
export const errataQuery = groq`*[_type == "errata" && status == "published"] | order(order asc, dateReported desc) {
  _id,
  title,
  "bookSlug": book->slug.current,
  "bookTitle": book->title,
  edition,
  page,
  statement,
  correction,
  dateReported,
  order
}`;

export const errataByBookQuery = groq`*[_type == "errata" && book->slug.current == $bookSlug && status == "published"] | order(order asc, dateReported desc) {
  _id,
  title,
  edition,
  page,
  statement,
  correction,
  dateReported,
  order
}`;

export const booksWithErrataQuery = groq`*[_type == "book" && _id in *[_type == "errata" && status == "published"].book._ref] {
  _id,
  title,
  "slug": slug.current,
  "errataCount": count(*[_type == "errata" && book._ref == ^._id && status == "published"])
} | order(order asc, title asc)`;

// Banner queries - simple: if isActive is true, banner is shown
export const bannersQuery = groq`*[_type == "banner" && isActive == true] | order(order asc) {
  _id,
  title,
  alt,
  desktopImage,
  mobileImage,
  link,
  ctaText,
  order
}`;

export const allBannersQuery = groq`*[_type == "banner"] | order(order asc) {
  _id,
  title,
  alt,
  desktopImage,
  mobileImage,
  link,
  ctaText,
  isActive,
  order
}`;

// Promo Code queries
export const promoCodeByNameQuery = groq`*[_type == "promoCode" && lower(name.current) == lower($name) && active == true][0] {
  _id,
  "name": name.current,
  code,
  book->{
    _id,
    title,
    "slug": slug.current,
    reviewUrl
  },
  "reviewUrl": book->reviewUrl,
  "freeBookPdfUrl": freeBookPdf.asset->url,
  "freeBookPdfFilename": freeBookPdf.asset->originalFilename,
  active,
  expiresAt,
  usageLimit,
  usageCount
}`;
