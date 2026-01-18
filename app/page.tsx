import { Metadata } from "next";
import { Suspense } from "react";
import {
  HeroSection,
  BooksSection,
  FeaturesSection,
  OnlineBanksSection,
  ArticlesSection,
  PromoCodeWrapper,
} from "@/components/home";
import {
  getFeaturedBooks,
  getFeaturedArticles,
  getActiveBanners,
  getPromoCodeByName,
} from "@/data";
import { BannersStrip } from "@/components/home/BannersStrip";

export const metadata: Metadata = {
  title: "Master the PE Structural Exam | CivilEn Publishing",
  description:
    "Uncompromising practice exams designed to perfectly mirror the NCEES CBT format. Get exam-ready with materials built by practicing structural engineers.",
};

interface HomePageProps {
  searchParams: Promise<{ code?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const code = params.code;

  // Fetch featured books, articles, banners, and promo code from Sanity with revalidation
  const [books, articles, banners, promoCode] = await Promise.all([
    getFeaturedBooks(),
    getFeaturedArticles(),
    getActiveBanners(),
    code ? getPromoCodeByName(code) : Promise.resolve(null),
  ]);

  return (
    <main className="min-h-screen">
      {/* Promo Code Popup */}
      <Suspense fallback={null}>
        <PromoCodeWrapper promoCode={promoCode} />
      </Suspense>

      {/* Banners Strip - Only show if banners exist in Sanity */}
      {banners.length > 0 && <BannersStrip banners={banners} />}

      {/* Hero Section */}
      <HeroSection />

      {/* Books Section */}
      <BooksSection books={books} />

      {/* Online Banks Section */}
      <OnlineBanksSection />

      {/* Articles Section */}
      {articles.length > 0 && <ArticlesSection articles={articles} />}

      {/* Features/Stats Section - At Bottom */}
      <FeaturesSection />
    </main>
  );
}
