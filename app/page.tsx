import { Metadata } from "next";
import {
  HeroSection,
  BooksSection,
  FeaturesSection,
  OnlineBanksSection,
  ArticlesSection,
} from "@/components/home";
import { getFeaturedBooks, getFeaturedArticles } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Master the PE Structural Exam | CivilEn Publishing",
  description:
    "Uncompromising practice exams designed to perfectly mirror the NCEES CBT format. Get exam-ready with materials built by practicing structural engineers.",
};

// Revalidate every hour
export const revalidate = 3600;

export default async function HomePage() {
  // Fetch featured books and articles from Sanity
  const [books, articles] = await Promise.all([getFeaturedBooks(), getFeaturedArticles()]);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Books Section */}
      <BooksSection books={books} />

      {/* Online Banks Section */}
      <OnlineBanksSection />

      {/* Articles Section */}
      <ArticlesSection articles={articles} />

      {/* Features/Stats Section - At Bottom */}
      <FeaturesSection />
    </main>
  );
}
