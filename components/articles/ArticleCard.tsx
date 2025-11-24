"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { PrimaryButton } from "@/components/ui/primary-button";
import type { Article } from "@/types";

interface ArticleCardProps {
  article: Article;
  imageUrl?: string;
}

export function ArticleCard({ article, imageUrl }: ArticleCardProps) {
  
  // Default image if none provided
  const articleImage = imageUrl || "/images/articles/default-article.jpg";

  return (
    <div
      className="relative flex flex-col items-center justify-end gap-6 p-3.5 w-[416px] h-[450px] rounded-[4px]"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 pointer-events-none rounded-[4px]">
        <div className="absolute inset-0 overflow-hidden rounded-[4px]">
          <Image
            src={articleImage}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-[rgba(0,0,0,0.1)] to-[#000000] rounded-[4px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 items-center justify-end gap-6 p-2.5 w-full backdrop-blur-[5px] bg-[rgba(0,0,0,0.5)]">
        <div className="flex flex-col gap-2.5 text-white w-full">
          <h3 className="font-gotham-medium text-[28px] leading-[42px]">
            {article.title}
          </h3>
        </div>
        <Link href={`/articles/${article.slug}`} className="w-full">
          <PrimaryButton className="w-full">Read Article</PrimaryButton>
        </Link>
      </div>
    </div>
  );
}

