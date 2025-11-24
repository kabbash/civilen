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
    <div
      className={cn('relative min-h-[290px] min-w-[416px] mt-[120px]',className)}
    >
        <div className="absolute -top-[7%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-[170px] h-[160px]" style={{ backgroundImage: `url(${iconUrl})` }}>
            <p className="text-white font-gotham-medium text-[48px] font-bold">{count}</p>
        </div>
        <div className="text-center bg-[#FFF1EC] rounded-[4px] px-7 py-4 min-h-[190px] flex items-center justify-center text-[28px] font-gotham-medium font-medium">
            <p>{title}</p>
        </div>
    
    </div>
  );
}

