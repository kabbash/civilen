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
        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <div className="fixed inset-0 z-50 overflow-y-auto bg-gradient-to-b from-gray-900 to-gray-800 lg:hidden">
        {/* Header with Close Button */}
        <div className="sticky top-0 z-10 flex h-20 items-center justify-between rounded-br-2xl rounded-bl-2xl bg-white/90 px-4 shadow-[0px_4px_8px_0px_rgba(234,84,34,0.15)] backdrop-blur-[10px]">
          <Link href="/" onClick={onClose} className="relative h-[38px] w-[120px]">
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
            className="flex h-11 w-11 items-center justify-center"
            aria-label="Close menu"
          >
            <Image src="/images/icons/close-icon.svg" alt="Close" width={44} height={44} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex w-full flex-col gap-4 px-4 pt-16">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={cn(
                  "relative flex w-full items-center px-2.5 py-1.5",
                  "font-gotham-bold text-5xl leading-[72px]",
                  "transition-colors duration-200",
                  isActive ? "text-[#ea5422]" : "text-white"
                )}
              >
                {isActive && (
                  <div className="absolute top-1/2 -left-4 h-4 w-screen -translate-y-1/2 bg-gradient-to-r from-[#ea7922] to-[#ea5422] opacity-15" />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Support Links */}
        <div className="mt-auto flex flex-col items-end gap-2 px-4 pt-32 pb-8">
          {supportLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="font-gotham-medium text-2xl leading-9 text-white transition-colors hover:text-[#ea5422]"
            >
              {link.label} →
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
