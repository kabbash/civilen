import { SectionHeader } from "./SectionHeader";
import { BookCard } from "@/components/books/BookCard";
import { Book } from "@/types";

interface BooksSectionProps {
  books: Book[];
}

export function BooksSection({ books }: BooksSectionProps) {
  return (
    <section className="container px-4 lg:px-20 py-12 lg:py-16 mx-auto">
      <SectionHeader>
        Your PE Exam Practice Starts Here
      </SectionHeader>
      
      {/* 2 Books side by side */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
        {books.map((book) => (
          <BookCard key={book._id || book.slug} book={book} />
        ))}
      </div>
    </section>
  );
}

