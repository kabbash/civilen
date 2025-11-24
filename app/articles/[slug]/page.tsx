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
    ? (typeof article.image === 'string' 
        ? article.image 
        : urlForImage(article.image)?.url() || '/images/articles/default-article.jpg')
    : '/images/articles/default-article.jpg';

  // Check if content is string or Portable Text
  const isPortableText = Array.isArray(article.content);

  return (
    <main className="relative w-full min-h-screen bg-white">
      {/* Hero Section with Background Pattern */}
      <section className="relative h-[600px] w-full overflow-hidden">
        {/* Background with abstract pattern */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full bg-gradient-to-r from-[#4a7c7e] via-[#6b4d7a] to-[#5a8b8d]">
            <Image
              src={articleImageUrl}
              alt={article.title}
              fill
              className="object-cover mix-blend-overlay opacity-40"
              priority
            />
          </div>
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Article Content - Overlapping hero */}
        <div className="absolute left-[calc(16.67%+46px)] top-[340px] w-[868px] max-w-[calc(100%-80px)] flex flex-col gap-10 z-10">
          {/* Article Title */}
          <div className="backdrop-blur-[10px] bg-[rgba(255,255,255,0.8)] px-10 py-2.5 inline-block">
            <h1 className="font-gotham-bold text-4xl leading-[54px] text-[#ea5422]">
              {article.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Article Content Body - Below hero */}
      <section className="relative max-w-[1440px] mx-auto px-20 pb-[100px]">
        <div className="ml-[calc(16.67%-34px)] w-[868px] max-w-full -mt-[160px]">
          <div className="backdrop-blur-[10px] bg-[rgba(255,255,255,0.8)] rounded-[4px] p-10">
            <div className="font-gotham-book text-lg leading-[27px] text-black">
              {/* Render article content - handle both Portable Text and string */}
              {isPortableText ? (
                <PortableText 
                  value={article.content as any} 
                  components={portableTextComponents}
                />
              ) : (
                <div className="space-y-5">
                  {(article.content as string).split('\n\n').map((paragraph, index) => (
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

