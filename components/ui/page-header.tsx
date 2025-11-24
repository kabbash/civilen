import * as React from "react";
import { cn } from "@/lib/utils";

export interface PageHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function PageHeader({ children, className }: PageHeaderProps) {
  return (
    <div className={cn("relative w-full h-[54px]", className)}>
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[662px] h-4 bg-gradient-to-r from-[#ea7922] to-[#ea5422] opacity-10" />
      <h1 className="absolute inset-0 flex items-center justify-center font-gotham-medium text-4xl leading-[54px] text-[#ea5422] text-center whitespace-pre-wrap">
        {children}
      </h1>
    </div>
  );
}


