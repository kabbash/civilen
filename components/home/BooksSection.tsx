import { SectionHeader } from "./SectionHeader";
import { BookCard } from "@/components/books/BookCard";
import { Book } from "@/types";
import Link from "next/link";

interface BooksSectionProps {
  books: Book[];
}

export function BooksSection({ books }: BooksSectionProps) {
  return (
    <section className="container mx-auto px-4 py-12 lg:px-20 lg:py-16">
      <SectionHeader>Your PE Exam Practice Starts Here</SectionHeader>

      {/* 2 Books side by side */}
      <div className="flex flex-col items-center justify-center gap-6 lg:flex-row lg:gap-8">
        {books.map((book) => (
          <BookCard key={book._id || book.slug} book={book} />
        ))}
      </div>
      <div className="mt-8 flex w-full justify-end">
        <Link href="/books" className="font-gotham-medium text-lg leading-[27px] text-[#ea5422]">
          See all CivilEn Publishing resources →
        </Link>
      </div>
    </section>
  );
}
