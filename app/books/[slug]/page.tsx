import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBookBySlug, getAllBooks } from "@/sanity/lib/fetch";
import { urlForImage } from "@/sanity/lib/image";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Book } from "@/types";
import { PortableText, portableTextComponents } from "@/sanity/lib/portableText";

interface BookDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all books
export async function generateStaticParams() {
  const books = await getAllBooks();
  return books.map((book: Book) => ({
    slug: book.slug,
  }));
}

export async function generateMetadata({ params }: BookDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = await getBookBySlug(slug);

  if (!book) {
    return {
      title: "Book Not Found | CivilEn Publishing",
    };
  }

  return {
    title: `${book.title} | CivilEn Publishing`,
    description: book.description,
  };
}

// Revalidate every hour
export const revalidate = 3600;

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);

  if (!book) {
    notFound();
  }

  // Handle both string URLs and Sanity image objects
  const coverImageUrl = typeof book.coverImage === 'string' 
    ? book.coverImage 
    : urlForImage(book.coverImage)?.url() || '/images/articles/default-article.jpg';

  return (
    <main className="relative w-full min-h-screen bg-white pb-[400px]">
      {/* Decorative Lines */}
      <div className="absolute left-0 top-[750px] w-full h-px bg-[#ea5422]" />
      <div className="absolute left-1/3 top-[44px] h-[706px] w-px bg-[#ea5422]" />

      {/* Content Container */}
      <div className="relative max-w-[1440px] mx-auto px-20">
        {/* Book Cover - Left Side */}
        <div className="absolute left-20 top-[120px] w-[416px] h-[600px] rounded-tl-[8px] rounded-bl-[8px] shadow-[0px_3px_10px_0px_rgba(190,64,22,0.25)]">
          <Image
            src={coverImageUrl}
            alt={book.title}
            fill
            className="object-cover rounded-tl-[8px] rounded-bl-[8px]"
            priority
          />
        </div>

        {/* Book Details - Right Side */}
        <div className="ml-[calc(33.33%+85px)] pt-[160px] max-w-[740px]">
          {/* Title and Description */}
          <div className="flex flex-col gap-2.5 mb-6">
            <h1 className="font-gotham-medium text-4xl leading-[54px] text-[#ea5422]">
              {book.title}
            </h1>
          </div>


          {/* Long Description */}
          {book.fullDescription && (
              <PortableText 
                value={book.fullDescription} 
                components={portableTextComponents}
              />
          )}

        </div>

        {/* Bottom Section - Button and Errata Link */}
        <div className="absolute left-20 top-[780px] w-[calc(100%-160px)]">
          {/* Buy Button */}
          <div className="flex flex-col gap-2 w-[417px]">
            <Link href={book.amazonLink} target="_blank" rel="noopener noreferrer">
              <PrimaryButton className="w-full">
                Buy Now on Amazon.com
              </PrimaryButton>
            </Link>
            <p className="font-gotham-book text-xs leading-[18px] text-[#2e2d2d] text-right">
              Secure purchase and fulfillment handled by Amazon.
            </p>
          </div>

          {/* Errata Link */}
          <Link
            href="/errata"
            className="absolute right-0 top-5 font-gotham-medium text-lg leading-[27px] text-[#ea5422] underline hover:no-underline transition-all"
          >
            Found an error? Check the Errata Page →
          </Link>
        </div>
      </div>
    </main>
  );
}

