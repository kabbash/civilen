"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function NavLink({ href, children, className }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center justify-center gap-2.5 px-2",
        "font-gotham-medium text-lg leading-[27px]",
        "transition-colors duration-200",
        isActive
          ? "text-[#ea5422] shadow-[0px_0px_2px_0px_#ea5422]"
          : "text-black hover:text-[#be4016]",
        className
      )}
    >
      {children}
    </Link>
  );
}


