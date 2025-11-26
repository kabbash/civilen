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
    <div className="relative flex h-[450px] w-[416px] flex-col items-center justify-end gap-6 rounded-[4px] p-3.5">
      {/* Background Image with Overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-[4px]">
        <div className="absolute inset-0 overflow-hidden rounded-[4px]">
          <Image src={articleImage} alt={article.title} fill className="object-cover" />
        </div>
        <div className="absolute inset-0 rounded-[4px] bg-linear-to-b from-[rgba(0,0,0,0.1)] to-[#000000]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-end gap-6 bg-[rgba(0,0,0,0.5)] p-2.5 backdrop-blur-[5px]">
        <div className="flex w-full flex-col gap-2.5 text-white">
          <h3 className="font-gotham-medium text-[28px] leading-[42px]">{article.title}</h3>
        </div>
        <Link href={`/articles/${article.slug}`} className="w-full">
          <PrimaryButton className="w-full">Read Article</PrimaryButton>
        </Link>
      </div>
    </div>
  );
}
