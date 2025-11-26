import { Metadata } from "next";
import Image from "next/image";
import { BookCard } from "@/components/books/BookCard";
import { getAllBooks } from "@/sanity/lib/fetch";
import { Book } from "@/types";

export const metadata: Metadata = {
  title: "Books | CivilEn Publishing",
  description:
    "Browse our collection of PE Structural Engineering practice exams and study materials",
};

// Revalidate every hour
export const revalidate = 3600;

export default async function BooksPage() {
  const books = await getAllBooks();

  return (
    <main className="relative min-h-screen w-full bg-white pb-[70px]">
      {/* Hero Section with Background Image */}
      <section className="relative h-[360px] w-full overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/hero/books.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Hero Title */}
        <div className="absolute top-[50px] left-1/2 -translate-x-1/2 bg-[rgba(234,84,34,0.5)] px-10 py-2.5 backdrop-blur-[10px]">
          <h1 className="font-gotham-bold text-5xl leading-[72px] whitespace-nowrap text-white">
            CBT Practice Exams
          </h1>
        </div>
      </section>

      {/* Books Grid Section - Overlaps hero section */}
      <section className="relative mx-auto -mt-[140px] max-w-[1440px] px-20">
        <div className="flex flex-wrap justify-start gap-4">
          {books.map((book: Book) => (
            <BookCard key={book._id} book={book} showLongDescription={true} />
          ))}
        </div>
      </section>
    </main>
  );
}
