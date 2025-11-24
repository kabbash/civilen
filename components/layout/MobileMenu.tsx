"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/books", label: "Books" },
    { href: "/online-banks", label: "Online Banks" },
    { href: "/articles", label: "Articles" },
  ];

  const supportLinks = [
    { href: "/errata", label: "Errate Report" },
    { href: "/contact", label: "Contact Us" },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <div className="fixed inset-0 bg-gradient-to-b from-gray-900 to-gray-800 z-50 lg:hidden overflow-y-auto">
        {/* Header with Close Button */}
        <div className="sticky top-0 z-10 backdrop-blur-[10px] bg-white/90 flex h-20 items-center justify-between px-4 rounded-bl-2xl rounded-br-2xl shadow-[0px_4px_8px_0px_rgba(234,84,34,0.15)]">
          <Link href="/" onClick={onClose} className="relative w-[120px] h-[38px]">
            <Image
              src="/images/logo/logo.svg"
              alt="CivilEn Logo"
              fill
              className="object-contain"
              priority
            />
          </Link>
          <button
            onClick={onClose}
            className="w-11 h-11 flex items-center justify-center"
            aria-label="Close menu"
          >
            <Image
              src="/images/icons/close-icon.svg"
              alt="Close"
              width={44}
              height={44}
            />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-4 px-4 pt-16 w-full">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={cn(
                  "relative flex items-center px-2.5 py-1.5 w-full",
                  "font-gotham-bold text-5xl leading-[72px]",
                  "transition-colors duration-200",
                  isActive ? "text-[#ea5422]" : "text-white"
                )}
              >
                {isActive && (
                  <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-screen h-4 bg-gradient-to-r from-[#ea7922] to-[#ea5422] opacity-15" />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Support Links */}
        <div className="flex flex-col gap-2 items-end px-4 mt-auto pb-8 pt-32">
          {supportLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="font-gotham-medium text-2xl leading-9 text-white hover:text-[#ea5422] transition-colors"
            >
              {link.label} →
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

