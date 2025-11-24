import { SectionHeader } from "./SectionHeader";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { Article } from "@/types";

interface ArticlesSectionProps {
  articles: Article[];
}

export function ArticlesSection({ articles }: ArticlesSectionProps) {
  return (
    <section className="container px-4 lg:px-20 py-12 lg:py-16 mx-auto">
      <SectionHeader>
        Insider Strategies & Exam Insights
      </SectionHeader>
      
      {/* 3 Articles on the same line */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
        {articles.map((article) => (
          <ArticleCard 
            key={article._id || article.slug} 
            article={article}
            // Add custom image URLs if available
          />
        ))}
      </div>
    </section>
  );
}

