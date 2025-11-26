import * as React from "react";
import { cn } from "@/lib/utils";

export interface PageHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function PageHeader({ children, className }: PageHeaderProps) {
  return (
    <div className={cn("relative h-[54px] w-full", className)}>
      <div className="absolute top-1/2 left-1/2 h-4 w-[662px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#ea7922] to-[#ea5422] opacity-10" />
      <h1 className="font-gotham-medium absolute inset-0 flex items-center justify-center text-center text-4xl leading-[54px] whitespace-pre-wrap text-[#ea5422]">
        {children}
      </h1>
    </div>
  );
}
