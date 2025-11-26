"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { PrimaryButton } from "@/components/ui/primary-button";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setMessage({ type: "error", text: "Please enter a valid email address" });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, source: "footer" }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: data.message || "Successfully subscribed!" });
        setEmail("");
      } else {
        setMessage({ type: "error", text: data.error || "Failed to subscribe" });
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setMessage({ type: "error", text: "An error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="relative w-full rounded-tl-2xl rounded-tr-2xl">
      {/* Background with overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-tl-2xl rounded-tr-2xl">
        <div className="absolute inset-0 rounded-tl-2xl rounded-tr-2xl bg-[#2e2d2d]" />
        <Image
          src="/images/patterns/footer-bg.png"
          alt=""
          fill
          className="rounded-tl-2xl rounded-tr-2xl object-cover opacity-5"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-4 pt-8 pb-0 lg:px-20">
        {/* Main Footer Content */}
        <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:justify-between lg:gap-0">
          {/* Newsletter Section */}
          <div className="flex w-full flex-col gap-3.5 bg-linear-to-r from-[rgba(234,121,34,0.15)] to-[rgba(234,84,34,0.15)] p-2.5 lg:w-[420px] lg:p-4">
            <div className="flex flex-col gap-1 text-white">
              <h3 className="font-gotham-medium text-2xl leading-9">Stay Ahead of the Curve.</h3>
              <p className="font-gotham-book text-base leading-6 lg:text-lg lg:leading-[27px]">
                Top SE exam strategies and crucial code announcements.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="relative w-full">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                disabled={isLoading}
                className="font-gotham-book h-12 w-full border-b border-[#ea5422] bg-[#2e2d2d] px-4 py-2.5 text-base leading-6 text-white shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.1)] placeholder:text-white/80 focus:outline-none disabled:opacity-50 lg:text-lg lg:leading-[27px]"
              />
              <div className="absolute top-1/2 right-0 -translate-y-1/2">
                <PrimaryButton
                  type="submit"
                  className="h-12 px-2.5 text-base lg:px-6 lg:text-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </PrimaryButton>
              </div>
            </form>
            {message && (
              <p
                className={`font-gotham-book mt-2 text-sm ${
                  message.type === "success" ? "text-green-400" : "text-red-400"
                }`}
              >
                {message.text}
              </p>
            )}
          </div>

          {/* Links Section */}
          <div className="flex flex-col gap-2.5 lg:gap-4">
            <h4 className="font-gotham-medium text-base leading-6 text-white lg:text-lg lg:leading-[27px]">
              Links
            </h4>
            <div className="font-gotham-book flex flex-col gap-2 text-base leading-6 text-white lg:text-lg lg:leading-[27px]">
              <Link href="/" className="transition-colors hover:text-[#ea5422]">
                Home
              </Link>
              <Link href="/books" className="transition-colors hover:text-[#ea5422]">
                Books
              </Link>
              <Link href="/online-banks" className="transition-colors hover:text-[#ea5422]">
                Online Banks
              </Link>
              <Link href="/articles" className="transition-colors hover:text-[#ea5422]">
                Articles
              </Link>
            </div>
          </div>

          {/* Support and Contact Section */}
          <div className="flex flex-col gap-2.5 lg:gap-4">
            <h4 className="font-gotham-medium text-base leading-6 text-white lg:text-lg lg:leading-[27px]">
              Support and Contact
            </h4>
            <div className="font-gotham-book flex flex-col gap-2 text-base leading-6 text-white lg:text-lg lg:leading-[27px]">
              <Link href="/errata" className="transition-colors hover:text-[#ea5422]">
                Errate Report
              </Link>
              <Link href="/contact" className="transition-colors hover:text-[#ea5422]">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Contact Info & Logo Section */}
          <div className="flex w-full flex-col items-start gap-8 lg:w-auto lg:items-end lg:gap-6">
            <div className="flex w-full flex-col gap-2.5">
              {/* Email */}
              <div className="flex items-center gap-2.5">
                <Image src="/images/icons/email.svg" alt="" width={20} height={20} />
                <a
                  href="mailto:info@civilenpublishing.com"
                  className="font-gotham-medium text-base leading-6 break-all text-white underline transition-colors hover:text-[#ea5422] lg:text-lg lg:leading-[27px] lg:whitespace-nowrap"
                >
                  info@civilenpublishing.com
                </a>
              </div>
              {/* Address */}
              <div className="flex items-start gap-2.5">
                <Image
                  src="/images/icons/location.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="mt-1"
                />
                <div className="font-gotham-medium text-base leading-6 whitespace-nowrap text-white lg:text-lg lg:leading-[27px]">
                  <p>CivilEn Publishing 8345 NW 66</p>
                  <p>ST MIAMI, FL 33166</p>
                </div>
              </div>
            </div>
            {/* Logo */}
            <div className="relative h-[69px] w-[160px] overflow-hidden">
              <Image
                src="/images/logo/logo-white.png"
                alt="CivilEn Publishing"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex w-full max-w-full items-center justify-center border-t border-white/50 p-2.5 lg:max-w-[1280px]">
          <p className="font-gotham-medium text-center text-sm leading-[27px] text-white">
            © {currentYear} CivilEn Publishing. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
