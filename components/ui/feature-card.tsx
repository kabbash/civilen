"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface FeatureCardProps {
  title: string;
  count: string;
  iconUrl?: string;
  className?: string;
}

export function FeatureCard({
  title,
  count,
  iconUrl = "/images/icons/feature-icon.svg",
  className,
}: FeatureCardProps) {
  return (
    <div className={cn("relative mt-[120px] min-h-[290px] min-w-[416px]", className)}>
      <div
        className="absolute -top-[7%] left-1/2 flex h-[160px] w-[170px] -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        style={{ backgroundImage: `url(${iconUrl})` }}
      >
        <p className="font-gotham-medium text-[48px] font-bold text-white">{count}</p>
      </div>
      <div className="font-gotham-medium flex min-h-[190px] items-center justify-center rounded-[4px] bg-[#FFF1EC] px-7 py-4 text-center text-[28px] font-medium">
        <p>{title}</p>
      </div>
    </div>
  );
}
