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
        console.error("Error fetching articles:", error);
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

  // Filter articles based on search query
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <main className="relative flex min-h-screen w-full items-center justify-center bg-white pb-[400px]">
        <div className="text-center">
          <p className="font-gotham-book text-xl text-[#2e2d2d]">Loading articles...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen w-full bg-white pb-[400px]">
      {/* Hero Section with Background Pattern */}
      <section className="relative h-[360px] w-full overflow-hidden">
        {/* Background with construction pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/hero/articles.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Hero Title and Search */}
        <div className="absolute top-[140px] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2.5">
          <div className="bg-[rgba(234,84,34,0.5)] px-10 py-2.5 backdrop-blur-[10px]">
            <h1 className="font-gotham-bold mb-1.5 text-5xl leading-[72px] whitespace-nowrap text-white">
              SE Exam Strategies & Resources
            </h1>
            {/* Search Bar */}
            <div className="relative w-[788px] max-w-full">
              <div className="flex h-[50px] items-center justify-between rounded-[500px] border border-[#2e2d2d] bg-white py-2 pr-1.5 pl-6">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="font-gotham-book flex-1 bg-transparent text-lg leading-[27px] text-black outline-none placeholder:opacity-70"
                />
                <button className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[500px] bg-[#2e2d2d]">
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
        </div>
      </section>

      {/* Articles Grid */}
      <section className="relative mx-auto max-w-[1440px] pt-[60px]">
        <div className="mx-auto flex w-[1282px] max-w-full flex-col gap-10">
          {filteredArticles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="font-gotham-book text-xl text-[#2e2d2d]">
                {searchQuery
                  ? `No articles found matching "${searchQuery}"`
                  : "No articles available"}
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-[17px]">
              {filteredArticles.map((article: Article) => (
                <ArticleCard
                  key={article._id}
                  article={article}
                  imageUrl={getArticleImage(article)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
