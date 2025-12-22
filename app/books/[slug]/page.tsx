import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBookBySlug, generateBooksStaticParams } from "@/data";
import { urlForImage } from "@/sanity/lib/image";
import { PrimaryButton } from "@/components/ui/primary-button";
import { PortableText, portableTextComponents } from "@/sanity/lib/portableText";

interface BookDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all books
export async function generateStaticParams() {
  return await generateBooksStaticParams();
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
    <main className="relative min-h-screen w-full overflow-x-hidden bg-white">
      <div className="mx-auto w-full max-w-[1440px]">
        {/* Main Grid Layout with Orange Borders */}
        <div className="flex w-full flex-col gap-0 md:grid md:grid-cols-[545px_1fr]">
          {/* Left Column - Book Cover */}
          <div className="mt-6 flex w-full justify-center pr-0 pb-6 pl-0 md:mt-10 md:block md:border-r md:border-[#ea5422] md:pr-[49px] md:pb-[160px] md:pl-20">
            <div className="relative h-[400px] w-[270px] overflow-hidden rounded-tl-[8px] rounded-bl-[8px] shadow-[0px_3px_10px_0px_rgba(190,64,22,0.25)] md:h-[600px] md:w-[416px]">
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
          <div className="mt-6 w-full pr-4 pb-8 pl-4 md:mt-20 md:pr-20 md:pb-[160px] md:pl-[75px]">
            {/* Title and Description */}
            <div className="mb-4 flex w-full flex-col gap-2 md:mb-6 md:gap-2.5">
              <h1 className="font-gotham-medium w-full text-2xl leading-[36px] break-words text-[#ea5422] md:text-4xl md:leading-[54px]">
                {book.title}
              </h1>
            </div>

            {/* Long Description */}
            {book.fullDescription && (
              <div className="w-full max-w-full md:max-w-[740px]">
                <PortableText value={book.fullDescription} components={portableTextComponents} />
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section with Top Border */}
        <div className="flex w-full flex-col gap-6 border-t border-[#ea5422] md:grid md:grid-cols-[545px_1fr] md:gap-0">
          {/* Left Column - Buy Button */}
          <div className="w-full pt-6 pr-4 pb-6 pl-4 md:border-r md:border-[#ea5422] md:pt-[30px] md:pr-[49px] md:pb-[70px] md:pl-20">
            <div className="flex w-full flex-col gap-2 md:w-[417px]">
              <Link href={book.amazonLink} target="_blank" rel="noopener noreferrer">
                <PrimaryButton className="w-full">Buy Now on Amazon.com</PrimaryButton>
              </Link>
              <p className="font-gotham-book w-full text-right text-xs leading-[18px] text-[#2e2d2d]">
                Secure purchase and fulfillment handled by Amazon.
              </p>
            </div>
          </div>

          {/* Right Column - Errata Link */}
          <div className="flex w-full justify-center pt-0 pr-4 pb-8 pl-4 md:justify-end md:pt-[51px] md:pr-20 md:pb-[70px] md:pl-[75px]">
            <Link
              href="/errata"
              className="font-gotham-medium text-center text-base leading-[24px] break-words text-[#ea5422] underline transition-all hover:no-underline md:text-left md:text-lg md:leading-[27px]"
            >
              Found an error? Check the Errata Page →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

