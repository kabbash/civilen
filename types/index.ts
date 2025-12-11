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
  publishedDate?: string;
  publishedAt?: string;
  isbn?: string;
  fullDescription?: PortableTextBlock[];
  longDescription?: string;
  featured?: boolean;
  order?: number;
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
