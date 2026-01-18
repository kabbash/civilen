import { PortableTextBlock } from "next-sanity";
import type { Image as SanityImageType } from "sanity";

export interface Book {
  id?: string;
  _id?: string;
  slug: string;
  title: string;
  author?: string;
  description: string;
  coverImage: string | SanityImageType;
  amazonLink: string;
  reviewUrl?: string;
  publishedDate?: string;
  publishedAt?: string;
  isbn?: string;
  fullDescription?: PortableTextBlock[];
  longDescription?: string;
  featured?: boolean;
  order?: number;
  samplePdf?: SanityFileAsset;
  samplePdfUrl?: string;
}

export interface Article {
  id?: string;
  _id?: string;
  slug: string;
  title: string;
  content: PortableTextBlock[]; // Can be string or Portable Text blocks
  image?: SanityImageType;
  publishedDate?: string;
  publishedAt?: string;
  featured?: boolean;
  order?: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
}

export interface Errata {
  id?: string;
  _id?: string;
  bookSlug: string;
  bookTitle?: string;
  title: string;
  edition: string;
  page: string;
  statement: string;
  correction: string;
  dateReported: string;
  status?: string;
  order?: number;
}

export interface Banner {
  _id: string;
  title: string;
  alt: string;
  desktopImage: SanityImageType;
  mobileImage: SanityImageType;
  link: string;
  ctaText: string;
  isActive?: boolean;
  order?: number;
}

export interface SanityFileAsset {
  _type: "file";
  asset: {
    _ref: string;
    _type: "reference";
    url?: string;
  };
}

export interface PromoCode {
  _id: string;
  name: string;
  code: string;
  book: {
    _id: string;
    title: string;
    slug: string;
    reviewUrl?: string;
  };
  reviewUrl?: string; // Derived from book.reviewUrl
  freeBookPdf: SanityFileAsset;
  freeBookPdfUrl?: string;
  freeBookPdfFilename?: string; // Original filename from Sanity asset
  active: boolean;
  expiresAt?: string;
  usageLimit?: number;
  usageCount: number;
}
