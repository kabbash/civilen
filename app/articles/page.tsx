"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { client } from "@/sanity/lib/client";
import { articlesQuery } from "@/sanity/lib/queries";
import type { Article } from "@/types";
import { urlForImage } from "@/sanity/lib/image";

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const data = await client.fetch(articlesQuery);
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  // Using default article image for now - can be replaced with actual article-specific images
  const getArticleImage = (article: Article) => {
    if (article.image) {
      return urlForImage(article.image)?.url() || "/images/articles/default-article.jpg";
    }
    return "/images/articles/default-article.jpg";
  };

  if (loading) {
    return (
      <main className="relative w-full min-h-screen bg-white pb-[400px] flex items-center justify-center">
        <div className="text-center">
          <p className="font-gotham-book text-xl text-[#2e2d2d]">Loading articles...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative w-full min-h-screen bg-white pb-[400px]">
      {/* Hero Section with Background Pattern */}
      <section className="relative h-[360px] w-full overflow-hidden">
        {/* Background with construction pattern */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full bg-gradient-to-r from-[#8b5a3c] via-[#6b4d3a] to-[#a0724d]">
            <Image
              src="/images/hero/engineer-construction.png"
              alt="Construction Background"
              fill
              className="object-cover mix-blend-overlay opacity-30"
              priority
            />
          </div>
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Hero Title and Search */}
        <div className="absolute left-1/2 top-[140px] -translate-x-1/2 flex flex-col items-center gap-2.5">
          <div className="backdrop-blur-[10px] bg-[rgba(234,84,34,0.5)] px-10 py-2.5">
            <h1 className="font-gotham-bold text-5xl leading-[72px] text-white whitespace-nowrap">
              SE Exam Strategies & Resources
            </h1>
          </div>

          {/* Search Bar */}
          <div className="relative w-[788px] max-w-full">
            <div className="bg-white border border-[#2e2d2d] rounded-[500px] flex items-center justify-between h-[50px] pl-6 pr-1.5 py-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 font-gotham-book text-lg leading-[27px] text-black placeholder:opacity-70 outline-none bg-transparent"
              />
              <button className="bg-[#2e2d2d] rounded-[500px] w-[38px] h-[38px] flex items-center justify-center shrink-0">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="relative max-w-[1440px] mx-auto px-20 pt-[60px]">
        <div className="flex flex-col gap-10 w-[1282px] max-w-full mx-auto">
          {/* Row 1 */}
          <div className="flex gap-[17px] items-center">
            {articles.map((article: Article) => (
              <ArticleCard
                key={article._id}
                article={article}
                imageUrl={getArticleImage(article)}
              />
            ))}
          </div>


        </div>
      </section>
    </main>
  );
}

