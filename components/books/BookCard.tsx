"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { PrimaryButton } from "@/components/ui/primary-button";
import type { Book } from "@/types";
import { urlForImage } from "@/sanity/lib/image";

interface BookCardProps {
  book: Book;
  showLongDescription?: boolean
}

export function BookCard({ book, showLongDescription }: BookCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Handle both string URLs and Sanity image objects
  const coverImageUrl = typeof book.coverImage === 'string' 
    ? book.coverImage 
    : urlForImage(book.coverImage)?.url() || '/images/articles/default-article.jpg';

  return (
    <div
      className="relative flex flex-col items-center gap-6 p-8 w-full max-w-[632px] mx-auto rounded-[4px] transition-all duration-300"
      style={{
        boxShadow: isHovered
          ? "0px 4px 15px 0px rgba(190, 64, 22, 0.25)"
          : "none",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none rounded-[4px]">
        <div className="absolute inset-0 bg-white rounded-[4px]" />
        <div
          className="absolute inset-0 opacity-75 rounded-[4px] bg-repeat"
          style={{
            backgroundImage: `url('/images/patterns/book-pattern.png')`,
            backgroundSize: "494.4px 360px",
            backgroundPosition: "top left",
          }}
        />
      </div>

      {/* Bookmark - top left */}
      <div className="absolute left-8 top-0 w-10 h-[72px] z-10">
        <Image
          src={
            isHovered
              ? "/images/bookmarks/bookmark-hover.svg"
              : "/images/bookmarks/bookmark-default.svg"
          }
          alt=""
          fill
          className="object-contain"
        />
      </div>

      {/* Book Cover */}
      <div className="relative w-[270px] h-[400px] rounded-tl-[8px] rounded-bl-[8px] shadow-[0px_3px_10px_0px_rgba(190,64,22,0.25)] shrink-0 z-10">
        <Image
          src={coverImageUrl}
          alt={book.title}
          fill
          className="object-cover rounded-tl-[8px] rounded-bl-[8px]"
        />
      </div>

      {/* Content */}
      <div className="relative flex flex-col gap-2 items-center w-full z-10">
        <h3 className="font-gotham-medium text-[28px] leading-[42px] text-black text-center">
          {book.title}
        </h3>
        <p className="font-gotham-book text-lg leading-[27px] text-black text-center line-clamp-3">
          {showLongDescription ? book.longDescription : book.description}
        </p>
      </div>

      {/* Button */}
      <Link href={`/books/${book.slug}`} className="relative z-10">
        <PrimaryButton>View Details</PrimaryButton>
      </Link>
    </div>
  );
}

