"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { PrimaryButton } from "@/components/ui/primary-button";
import type { Book } from "@/types";
import { urlForImage } from "@/sanity/lib/image";

interface BookCardProps {
  book: Book;
  showLongDescription?: boolean;
}

export function BookCard({ book, showLongDescription }: BookCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Handle both string URLs and Sanity image objects
  const coverImageUrl =
    typeof book.coverImage === "string"
      ? book.coverImage
      : urlForImage(book.coverImage)?.url() || "/images/articles/default-article.jpg";

  return (
    <div
      className="relative mx-auto flex w-full max-w-[632px] flex-col items-center gap-4 rounded-[4px] p-4 transition-all duration-300 md:gap-6 md:p-8"
      style={{
        boxShadow: isHovered ? "0px 4px 15px 0px rgba(190, 64, 22, 0.25)" : "none",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Pattern */}
      <div className="pointer-events-none absolute inset-0 rounded-[4px]">
        <div className="absolute inset-0 rounded-[4px] bg-white" />
        <div
          className="absolute inset-0 rounded-[4px] bg-repeat opacity-75"
          style={{
            backgroundImage: `url('/images/patterns/book-pattern.png')`,
            backgroundSize: "494.4px 360px",
            backgroundPosition: "top left",
          }}
        />
      </div>

      {/* Bookmark - top left */}
      <div className="absolute top-0 left-4 z-10 h-[72px] w-10 md:left-8">
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
      <div className="relative z-10 h-[320px] w-[216px] shrink-0 rounded-tl-[8px] rounded-bl-[8px] shadow-[0px_3px_10px_0px_rgba(190,64,22,0.25)] md:h-[400px] md:w-[270px]">
        <Image
          src={coverImageUrl}
          alt={book.title}
          fill
          className="rounded-tl-[8px] rounded-bl-[8px] object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex w-full flex-col items-center gap-2">
        <h3 className="font-gotham-medium text-center text-xl leading-[30px] text-black md:text-[28px] md:leading-[42px]">
          {book.title}
        </h3>
        <p className="font-gotham-book line-clamp-3 px-2 text-center text-base leading-[24px] text-black md:text-lg md:leading-[27px]">
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

