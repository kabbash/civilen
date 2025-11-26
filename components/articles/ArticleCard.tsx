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
    <div className="relative flex h-[380px] w-full max-w-[416px] flex-col items-center justify-end gap-4 rounded-[4px] p-3 md:h-[450px] md:w-[416px] md:gap-6 md:p-3.5">
      {/* Background Image with Overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-[4px]">
        <div className="absolute inset-0 overflow-hidden rounded-[4px]">
          <Image src={articleImage} alt={article.title} fill className="object-cover" />
        </div>
        <div className="absolute inset-0 rounded-[4px] bg-linear-to-b from-[rgba(0,0,0,0.1)] to-[#000000]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-end gap-4 bg-[rgba(0,0,0,0.5)] p-2 backdrop-blur-[5px] md:gap-6 md:p-2.5">
        <div className="flex w-full flex-col gap-2 text-white md:gap-2.5">
          <h3 className="font-gotham-medium text-xl leading-[30px] break-words md:text-[28px] md:leading-[42px]">
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
