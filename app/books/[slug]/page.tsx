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
  const coverImageUrl =
    typeof book.coverImage === "string"
      ? book.coverImage
      : urlForImage(book.coverImage)?.url() || "/images/articles/default-article.jpg";

  return (
    <main className="relative min-h-screen w-full bg-white">
      <div className="mx-auto max-w-[1440px]">
        {/* Main Grid Layout with Orange Borders */}
        <div className="grid grid-cols-[545px_1fr] gap-0">
          {/* Left Column - Book Cover */}
          <div className="mt-10 border-r border-[#ea5422] pr-[49px] pb-[160px] pl-20">
            <div className="relative h-[600px] w-[416px] overflow-hidden rounded-tl-[8px] rounded-bl-[8px] shadow-[0px_3px_10px_0px_rgba(190,64,22,0.25)]">
              <Image
                src={coverImageUrl}
                alt={book.title}
                fill
                className="rounded-tl-[8px] rounded-bl-[8px] object-cover"
                priority
              />
            </div>
          </div>

          {/* Right Column - Book Details */}
          <div className="mt-20 pr-20 pb-[160px] pl-[75px]">
            {/* Title and Description */}
            <div className="mb-6 flex flex-col gap-2.5">
              <h1 className="font-gotham-medium text-4xl leading-[54px] text-[#ea5422]">
                {book.title}
              </h1>
            </div>

            {/* Long Description */}
            {book.fullDescription && (
              <div className="max-w-[740px]">
                <PortableText value={book.fullDescription} components={portableTextComponents} />
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section with Top Border */}
        <div className="grid grid-cols-[545px_1fr] gap-0 border-t border-[#ea5422]">
          {/* Left Column - Buy Button */}
          <div className="border-r border-[#ea5422] pt-[30px] pr-[49px] pb-[70px] pl-20">
            <div className="flex w-[417px] flex-col gap-2">
              <Link href={book.amazonLink} target="_blank" rel="noopener noreferrer">
                <PrimaryButton className="w-full">Buy Now on Amazon.com</PrimaryButton>
              </Link>
              <p className="font-gotham-book text-right text-xs leading-[18px] text-[#2e2d2d]">
                Secure purchase and fulfillment handled by Amazon.
              </p>
            </div>
          </div>

          {/* Right Column - Errata Link */}
          <div className="flex justify-end pt-[51px] pr-20 pb-[70px] pl-[75px]">
            <Link
              href="/errata"
              className="font-gotham-medium text-lg leading-[27px] text-[#ea5422] underline transition-all hover:no-underline"
            >
              Found an error? Check the Errata Page →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
