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
        <div 
          className="flex h-20 items-center justify-between px-4 lg:px-20 py-0 bg-white/90 backdrop-blur-[10px] rounded-bl-2xl rounded-br-2xl shadow-[0px_4px_8px_0px_rgba(234,84,34,0.15)]"
        >
          {/* Logo */}
          <Link href="/" className="relative w-[120px] h-[38px] overflow-hidden">
            <Image
              src="/images/logo/logo.svg"
              alt="CivilEn Logo"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden w-12 h-12 flex items-center justify-center px-3 py-4"
            aria-label="Open menu"
          >
            <Image
              src="/images/icons/menu-icon.svg"
              alt="Menu"
              width={30}
              height={20}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  );
}

