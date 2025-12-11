import { SectionHeader } from "./SectionHeader";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { Article } from "@/types";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";

interface ArticlesSectionProps {
  articles: Article[];
}

export function ArticlesSection({ articles }: ArticlesSectionProps) {
  // Get article image URL from Sanity
  const getArticleImage = (article: Article) => {
    if (article.image) {
      return urlForImage(article.image)?.url() || "/images/articles/default-article.jpg";
    }
    return "/images/articles/default-article.jpg";
  };

  return (
    <section className="container mx-auto px-4 py-12 lg:px-20 lg:py-16">
      <SectionHeader>Insider Strategies & Exam Insights</SectionHeader>

      {/* 3 Articles on the same line */}
      <div className="flex flex-col items-center justify-center gap-4 lg:flex-row">
        {articles.map((article) => (
          <ArticleCard
            key={article._id || article.slug}
            article={article}
            imageUrl={getArticleImage(article)}
          />
        ))}
      </div>
      <div className="mt-8 flex w-full justify-end">
        <Link href="/articles" className="font-gotham-medium text-lg leading-[27px] text-[#ea5422]">
          View the Full Library of Articles →
        </Link>
      </div>
    </section>
  );
}
