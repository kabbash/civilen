"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { NavLink } from "@/components/ui/nav-link";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/books", label: "Books" },
    { href: "/online-banks", label: "Online Banks" },
    { href: "/articles", label: "Articles" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        <div className="flex h-20 items-center justify-between rounded-br-2xl rounded-bl-2xl bg-white/90 px-4 py-0 shadow-[0px_4px_8px_0px_rgba(234,84,34,0.15)] backdrop-blur-[10px] lg:px-20">
          {/* Logo */}
          <Link href="/" className="relative h-[38px] w-[120px] overflow-hidden">
            <Image
              src="/images/logo/logo.svg"
              alt="CivilEn Logo"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-10 lg:flex">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex h-12 w-12 items-center justify-center px-3 py-4 lg:hidden"
            aria-label="Open menu"
          >
            <Image src="/images/icons/menu-icon.svg" alt="Menu" width={30} height={20} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}

