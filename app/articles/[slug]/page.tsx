import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getArticleBySlug, getAllArticles } from "@/sanity/lib/fetch";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText, portableTextComponents } from "@/sanity/lib/portableText";
import { Article } from "@/types";

interface ArticleDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all articles
export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article: Article) => ({
    slug: article.slug,
  }));
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
    description: article.excerpt,
  };
}

// Revalidate every hour
export const revalidate = 3600;

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
    <main className="relative min-h-screen w-full bg-white">
      {/* Hero Section with Background Pattern */}
      <section className="relative h-[600px] w-full overflow-hidden">
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
        <div className="absolute top-[340px] left-[calc(16.67%+46px)] z-10 flex w-[868px] max-w-[calc(100%-80px)] flex-col gap-10">
          {/* Article Title */}
          <div className="inline-block bg-[rgba(255,255,255,0.8)] px-10 py-2.5 backdrop-blur-[10px]">
            <h1 className="font-gotham-bold text-4xl leading-[54px] text-[#ea5422]">
              {article.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Article Content Body - Below hero */}
      <section className="relative mx-auto max-w-[1440px] px-20 pb-[100px]">
        <div className="-mt-[160px] ml-[calc(16.67%-34px)] w-[868px] max-w-full">
          <div className="rounded-[4px] bg-[rgba(255,255,255,0.8)] p-10 backdrop-blur-[10px]">
            <div className="font-gotham-book text-lg leading-[27px] text-black">
              {/* Render article content - handle both Portable Text and string */}
              {isPortableText ? (
                <PortableText value={article.content} components={portableTextComponents} />
              ) : (
                <div className="space-y-5">
                  {(article.content as string).split("\n\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
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
