"use client";

import { useState, useEffect } from "react";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { getAllArticles } from "@/data";
import type { Article } from "@/types";
import { urlForImage } from "@/sanity/lib/image";

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const data = await getAllArticles();
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
      <main className="relative mt-20 flex min-h-screen w-full items-center justify-center bg-white pb-[400px]">
        <div className="text-center">
          <p className="font-gotham-book text-xl text-[#2e2d2d]">Loading articles...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-white pb-[70px]">
      {/* Hero Section with Background Pattern */}
      <section className="relative h-[400px] w-full overflow-hidden md:h-[360px]">
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
        <div className="absolute top-[30px] left-1/2 flex w-[calc(100%-2rem)] -translate-x-1/2 flex-col items-center gap-2 px-4 md:top-[70px] md:w-auto md:gap-2.5 md:px-0">
          <div className="w-full bg-[rgba(234,84,34,0.5)] px-4 py-3 backdrop-blur-[10px] md:px-10 md:py-2.5">
            <h1 className="font-gotham-bold mb-3 text-center text-2xl leading-[36px] text-white md:mb-1.5 md:text-5xl md:leading-[72px] md:whitespace-nowrap">
              SE Exam Strategies & Resources
            </h1>
            {/* Search Bar */}
            <div className="relative w-full max-w-full md:w-[788px]">
              <div className="flex h-[44px] items-center justify-between rounded-[500px] border border-[#2e2d2d] bg-white py-1.5 pr-1 pl-4 md:h-[50px] md:py-2 md:pr-1.5 md:pl-6">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="font-gotham-book flex-1 bg-transparent text-base leading-[24px] text-black outline-none placeholder:opacity-70 md:text-lg md:leading-[27px]"
                />
                <button className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[500px] bg-[#2e2d2d] md:h-[38px] md:w-[38px]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="md:h-6 md:w-6"
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
      <section className="relative mx-auto w-full max-w-[1440px] px-4 pt-[30px] md:px-0 md:pt-[60px]">
        <div className="mx-auto flex w-full max-w-full flex-col gap-6 md:w-[1282px] md:gap-10">
          {filteredArticles.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-4 py-12 text-center md:py-20">
              <p className="font-gotham-book text-lg text-[#2e2d2d] md:text-xl">
                {searchQuery
                  ? `No articles found matching "${searchQuery}"`
                  : "No articles available"}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:flex-wrap md:items-start md:justify-start md:gap-[17px]">
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

