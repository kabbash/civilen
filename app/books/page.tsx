import { Metadata } from "next";
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
      <section className="relative h-[240px] w-full overflow-hidden md:h-[360px]">
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
        <div className="absolute top-[30px] left-1/2 -translate-x-1/2 bg-[rgba(234,84,34,0.5)] px-4 py-2 backdrop-blur-[10px] md:top-[50px] md:px-10 md:py-2.5">
          <h1 className="font-gotham-bold text-center text-2xl leading-[36px] text-white md:text-5xl md:leading-[72px] md:whitespace-nowrap">
            CBT Practice Exams
          </h1>
        </div>
      </section>

      {/* Books Grid Section - Overlaps hero section */}
      <section className="relative mx-auto -mt-[80px] max-w-[1440px] px-4 md:-mt-[140px] md:px-20">
        <div className="flex flex-col justify-start gap-4 md:flex-row md:flex-wrap">
          {books.map((book: Book) => (
            <BookCard key={book._id} book={book} showLongDescription={true} />
          ))}
        </div>
      </section>
    </main>
  );
}
