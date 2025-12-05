"use client";

import Link from "next/link";
import Image from "next/image";
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
    <div className="relative flex h-[380px] w-full max-w-[416px] flex-col items-center justify-end rounded-[4px] overflow-hidden md:h-[450px] md:w-[416px]">
      {/* Background Image - No dark overlay, image fully visible */}
      <div className="pointer-events-none absolute inset-0">
        <Image src={articleImage} alt={article.title} fill className="object-cover" />
      </div>

      {/* Content - Positioned at bottom with frosted glass effect */}
      <div className="relative z-10 w-full p-3 md:p-4">
        {/* Frosted glass card for text */}
        <div className="rounded-lg bg-white/85 p-4 shadow-lg backdrop-blur-md md:p-5">
          <h3 className="font-gotham-medium mb-3 text-lg leading-[26px] break-words text-[#2e2d2d] md:mb-4 md:text-xl md:leading-[30px]">
            {article.title}
          </h3>
          <Link href={`/articles/${article.slug}`} className="block">
            <PrimaryButton className="w-full">Read Article</PrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
