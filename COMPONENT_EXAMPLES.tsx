// This file contains example usage of all Figma components
// Copy the relevant sections to your actual pages

import { PageHeader } from "@/components/ui/page-header";
import { PrimaryButton } from "@/components/ui/primary-button";
import { FeatureCard } from "@/components/ui/feature-card";
import { BookCard } from "@/components/books/BookCard";
import { ArticleCard } from "@/components/articles/ArticleCard";

export default function ComponentExamples() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* Example 1: Page Header */}
      <section className="py-16 px-8">
        <PageHeader>Your PE Exam Practice Starts Here</PageHeader>
      </section>

      {/* Example 2: Feature Cards Section */}
      <section className="py-16 px-8">
        <h2 className="text-3xl font-gotham-medium text-center mb-12">
          What We Offer
        </h2>
        <div className="flex justify-center gap-8 flex-wrap">
          <FeatureCard
            title="CBT-Style Practice Questions"
            count="80+"
          />
          <FeatureCard
            title="Practice Exams"
            count="10+"
          />
          <FeatureCard
            title="Study Guides"
            count="15+"
          />
        </div>
      </section>

      {/* Example 3: Books Section */}
      <section className="py-16 px-8 bg-gray-50">
        <PageHeader>Available Books</PageHeader>
        <div className="flex justify-center gap-8 flex-wrap mt-12">
          <BookCard
            book={{
              title: "PE Structural-Gravity Exams",
              description:
                "Get exam-ready with two full-length, high-quality practice exams designed to mirror the actual NCEES...",
              coverImage: "/path/to/book-cover.jpg",
              slug: "pe-structural-gravity",
              author: "CivilEn Publishing",
              amazonLink: "https://amazon.com/...",
            }}
          />
          <BookCard
            book={{
              title: "SE Lateral Forces Practice",
              description:
                "Master lateral forces with comprehensive practice problems and detailed solutions...",
              coverImage: "/path/to/book-cover-2.jpg",
              slug: "se-lateral-forces",
              author: "CivilEn Publishing",
              amazonLink: "https://amazon.com/...",
            }}
          />
        </div>
      </section>

      {/* Example 4: Articles Section */}
      <section className="py-16 px-8">
        <PageHeader>Latest Articles</PageHeader>
        <div className="flex justify-center gap-8 flex-wrap mt-12">
          <ArticleCard
            article={{
              title: "Beating the PE Structural (SE) CBT Gravity Breadth Exam",
              excerpt:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero...",
              slug: "beating-pe-exam",
              author: "John Doe",
              publishedDate: "2024-01-15",
            }}
            imageUrl="/path/to/article-image.jpg"
          />
          <ArticleCard
            article={{
              title: "Top 10 Study Tips for the PE Exam",
              excerpt:
                "Discover proven strategies that successful PE exam takers use to pass on their first attempt...",
              slug: "top-10-study-tips",
              author: "Jane Smith",
              publishedDate: "2024-01-20",
            }}
            imageUrl="/path/to/article-image-2.jpg"
          />
        </div>
      </section>

      {/* Example 5: Call to Action Section */}
      <section className="py-16 px-8 bg-gray-50 text-center">
        <h2 className="font-gotham-medium text-4xl mb-6">
          Ready to Start Your Journey?
        </h2>
        <p className="font-gotham-book text-xl mb-8 text-gray-700">
          Join thousands of engineers who have passed their PE exam with our materials
        </p>
        <div className="flex justify-center gap-4">
          <PrimaryButton onClick={() => console.log("Browse Books")}>
            Browse Books
          </PrimaryButton>
          <PrimaryButton onClick={() => console.log("View Articles")}>
            View Articles
          </PrimaryButton>
        </div>
      </section>

      {/* Example 6: Using Primary Button with Links */}
      <section className="py-16 px-8 text-center">
        <h3 className="font-gotham-medium text-2xl mb-6">
          Different Button Styles
        </h3>
        <div className="flex justify-center gap-4 flex-wrap">
          {/* As a button */}
          <PrimaryButton onClick={() => alert("Clicked!")}>
            Click Me
          </PrimaryButton>
          
          {/* As a link (wrap in Link component) */}
          <PrimaryButton as="a" href="/books">
            Go to Books
          </PrimaryButton>
          
          {/* Disabled state */}
          <PrimaryButton disabled>
            Disabled Button
          </PrimaryButton>
        </div>
      </section>

      {/* Example 7: Newsletter Signup (like in Footer) */}
      <section className="py-16 px-8 bg-gradient-to-r from-[rgba(234,121,34,0.15)] to-[rgba(234,84,34,0.15)]">
        <div className="max-w-md mx-auto">
          <h3 className="font-gotham-medium text-2xl mb-2">
            Stay Ahead of the Curve
          </h3>
          <p className="font-gotham-book text-lg mb-4">
            Top SE exam strategies and crucial code announcements.
          </p>
          <form className="relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full h-12 px-4 py-2.5 bg-white border-b-2 border-[#ea5422] focus:outline-none"
            />
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <PrimaryButton type="submit">Subscribe</PrimaryButton>
            </div>
          </form>
        </div>
      </section>

    </div>
  );
}

/**
 * USAGE IN YOUR ACTUAL PAGES:
 * 
 * 1. Home Page (app/page.tsx):
 *    - Use PageHeader for hero section
 *    - Use FeatureCard to showcase offerings
 *    - Use PrimaryButton for CTAs
 * 
 * 2. Books Page (app/books/page.tsx):
 *    - Use PageHeader for page title
 *    - Map through books array with BookCard
 * 
 * 3. Articles Page (app/articles/page.tsx):
 *    - Use PageHeader for page title
 *    - Map through articles array with ArticleCard
 * 
 * 4. Layout (app/layout.tsx):
 *    - Header and Footer are already implemented
 *    - They wrap your page content
 * 
 * EXAMPLE IMPORT PATTERN:
 * ```tsx
 * import { PageHeader, PrimaryButton, FeatureCard } from "@/components/ui";
 * import { BookCard } from "@/components/books/BookCard";
 * import { ArticleCard } from "@/components/articles/ArticleCard";
 * ```
 */


