"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { PrimaryButton } from "@/components/ui/primary-button";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, source: 'footer' }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message || 'Successfully subscribed!' });
        setEmail('');
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to subscribe' });
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="relative w-full rounded-tl-2xl rounded-tr-2xl">
      {/* Background with overlay */}
      <div className="absolute inset-0 pointer-events-none rounded-tl-2xl rounded-tr-2xl">
        <div className="absolute inset-0 bg-[#2e2d2d] rounded-tl-2xl rounded-tr-2xl" />
        <Image
          src="/images/patterns/footer-bg.png"
          alt=""
          fill
          className="object-cover opacity-5 rounded-tl-2xl rounded-tr-2xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-4 lg:px-20 pt-8 pb-0">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row items-start lg:justify-between w-full gap-8 lg:gap-0">
          {/* Newsletter Section */}
          <div className="flex flex-col gap-3.5 p-2.5 lg:p-4 w-full lg:w-[420px] bg-linear-to-r from-[rgba(234,121,34,0.15)] to-[rgba(234,84,34,0.15)]">
            <div className="flex flex-col gap-1 text-white">
              <h3 className="font-gotham-medium text-2xl leading-9">
                Stay Ahead of the Curve.
              </h3>
              <p className="font-gotham-book text-base lg:text-lg leading-6 lg:leading-[27px]">
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
                className="w-full h-12 px-4 py-2.5 bg-[#2e2d2d] border-b border-[#ea5422] text-white font-gotham-book text-base lg:text-lg leading-6 lg:leading-[27px] placeholder:text-white/80 focus:outline-none shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.1)] disabled:opacity-50"
              />
              <div className="absolute right-0 top-1/2 -translate-y-1/2">
                <PrimaryButton 
                  type="submit" 
                  className="h-12 px-2.5 lg:px-6 text-base lg:text-lg"
                  disabled={isLoading}
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe'}
                </PrimaryButton>
              </div>
            </form>
            {message && (
              <p className={`text-sm font-gotham-book mt-2 ${
                message.type === 'success' ? 'text-green-400' : 'text-red-400'
              }`}>
                {message.text}
              </p>
            )}
          </div>

          {/* Links Section */}
          <div className="flex flex-col gap-2.5 lg:gap-4">
            <h4 className="font-gotham-medium text-base lg:text-lg leading-6 lg:leading-[27px] text-white">
              Links
            </h4>
            <div className="flex flex-col gap-2 font-gotham-book text-base lg:text-lg leading-6 lg:leading-[27px] text-white">
              <Link href="/" className="hover:text-[#ea5422] transition-colors">
                Home
              </Link>
              <Link href="/books" className="hover:text-[#ea5422] transition-colors">
                Books
              </Link>
              <Link href="/online-banks" className="hover:text-[#ea5422] transition-colors">
                Online Banks
              </Link>
              <Link href="/articles" className="hover:text-[#ea5422] transition-colors">
                Articles
              </Link>
            </div>
          </div>

          {/* Support and Contact Section */}
          <div className="flex flex-col gap-2.5 lg:gap-4">
            <h4 className="font-gotham-medium text-base lg:text-lg leading-6 lg:leading-[27px] text-white">
              Support and Contact
            </h4>
            <div className="flex flex-col gap-2 font-gotham-book text-base lg:text-lg leading-6 lg:leading-[27px] text-white">
              <Link href="/errata" className="hover:text-[#ea5422] transition-colors">
                Errate Report
              </Link>
              <Link href="/contact" className="hover:text-[#ea5422] transition-colors">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Contact Info & Logo Section */}
          <div className="flex flex-col gap-8 lg:gap-6 items-start lg:items-end w-full lg:w-auto">
            <div className="flex flex-col gap-2.5 w-full">
              {/* Email */}
              <div className="flex gap-2.5 items-center">
                <Image
                  src="/images/icons/email.svg"
                  alt=""
                  width={20}
                  height={20}
                />
                <a
                  href="mailto:info@civilenpublishing.com"
                  className="font-gotham-medium text-base lg:text-lg leading-6 lg:leading-[27px] text-white underline hover:text-[#ea5422] transition-colors break-all lg:whitespace-nowrap"
                >
                  info@civilenpublishing.com
                </a>
              </div>
              {/* Address */}
              <div className="flex gap-2.5 items-start">
                <Image
                  src="/images/icons/location.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="mt-1"
                />
                <div className="font-gotham-medium text-base lg:text-lg leading-6 lg:leading-[27px] text-white whitespace-nowrap">
                  <p>CivilEn Publishing 8345 NW 66</p>
                  <p>ST MIAMI, FL 33166</p>
                </div>
              </div>
            </div>
            {/* Logo */}
            <div className="relative w-[160px] h-[69px] overflow-hidden">
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
        <div className="flex items-center justify-center p-2.5 w-full max-w-full lg:max-w-[1280px] border-t border-white/50">
          <p className="font-gotham-medium text-sm leading-[27px] text-white text-center">
            © {currentYear} CivilEn Publishing. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

