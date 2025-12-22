import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getArticleBySlug, generateArticlesStaticParams } from "@/data";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText, portableTextComponents } from "@/sanity/lib/portableText";

interface ArticleDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all articles
export async function generateStaticParams() {
  return await generateArticlesStaticParams();
}

export async function generateMetadata({ params }: ArticleDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found | CivilEn Publishing",
    };
  }

  return {
    title: `${article.title} | CivilEn Publishing`,
    description: article.title,
  };
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Handle article image - use Sanity image if available, otherwise default
  const articleImageUrl = article.image
    ? typeof article.image === "string"
      ? article.image
      : urlForImage(article.image)?.url() || "/images/articles/default-article.jpg"
    : "/images/articles/default-article.jpg";

  // Check if content is string or Portable Text
  const isPortableText = Array.isArray(article.content);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-white">
      {/* Hero Section with Background Pattern */}
      <section className="relative h-[400px] w-full overflow-hidden md:h-[600px]">
        {/* Background with abstract pattern */}
        <div className="absolute inset-0">
          <div className="relative h-full w-full bg-gradient-to-r from-[#4a7c7e] via-[#6b4d7a] to-[#5a8b8d]">
            <Image
              src={articleImageUrl}
              alt={article.title}
              fill
              className="object-cover opacity-40"
              priority
            />
          </div>
        </div>

        {/* Article Content - Overlapping hero */}
        <div className="absolute top-[180px] left-1/2 z-10 flex w-[calc(100%-2rem)] max-w-[calc(100%-2rem)] -translate-x-1/2 flex-col gap-6 md:top-[340px] md:w-[868px] md:max-w-[calc(100%-80px)] md:gap-10">
          {/* Article Title */}
          <div className="inline-block bg-[rgba(255,255,255,0.8)] px-4 py-2 backdrop-blur-[10px] md:px-10 md:py-2.5">
            <h1 className="font-gotham-bold text-center text-2xl leading-[36px] break-words text-[#ea5422] md:text-4xl md:leading-[54px]">
              {article.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Article Content Body - Below hero */}
      <section className="relative mx-auto w-full max-w-[1440px] px-4 pb-[30px] md:px-20 md:pb-[70px]">
        <div className="mx-auto -mt-[120px] w-full max-w-full md:-mt-[160px] md:w-[868px]">
          <div className="rounded-[4px] bg-[rgba(255,255,255,0.8)] p-4 backdrop-blur-[10px] md:p-10">
            <div className="font-gotham-book text-base leading-[24px] text-black md:text-lg md:leading-[27px]">
              {/* Render article content - handle both Portable Text and string */}
              {isPortableText && Array.isArray(article.content) ? (
                <PortableText value={article.content} components={portableTextComponents} />
              ) : (
                <div className="space-y-4 md:space-y-5">
                  {String(article.content)
                    .split("\n\n")
                    .map((paragraph, index) => (
                      <p key={index} className="break-words">
                        {paragraph}
                      </p>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

