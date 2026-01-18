"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Banner } from "@/types";
import { urlForImage } from "@/sanity/lib/image";

interface ImageBanner {
  id: string;
  image: string;
  mobileImage?: string;
  alt: string;
  link: string;
  ctaText: string;
}

interface BannersStripProps {
  banners: Banner[];
}

export const BannersStrip = ({ banners }: BannersStripProps) => {
  // Convert Sanity banners to ImageBanner format
  const displayBanners: ImageBanner[] = banners.map((b) => ({
    id: b._id,
    image: urlForImage(b.desktopImage)?.width(1920).height(400).url() || "",
    mobileImage: urlForImage(b.mobileImage)?.width(750).height(400).url() || "",
    alt: b.alt,
    link: b.link,
    ctaText: b.ctaText,
  }));
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || displayBanners.length === 0) return;

    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % displayBanners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, displayBanners.length]);

  const prevBanner = () =>
    setCurrentBanner((prev) => (prev - 1 + displayBanners.length) % displayBanners.length);
  const nextBanner = () => setCurrentBanner((prev) => (prev + 1) % displayBanners.length);
  const goToBanner = (index: number) => setCurrentBanner(index);

  return (
    <div
      className="group relative w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Banner Images */}
      <div className="relative h-[120px] w-full md:h-[160px] lg:h-[200px]">
        {displayBanners.map((b, index) => (
          <div
            key={b.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentBanner
                ? "translate-x-0 opacity-100"
                : index < currentBanner
                  ? "-translate-x-full opacity-0"
                  : "translate-x-full opacity-0"
            }`}
          >
            {/* Responsive images: mobile vs desktop */}
            {b.mobileImage ? (
              <picture>
                <source media="(min-width: 768px)" srcSet={b.image} />
                <img
                  src={b.mobileImage}
                  alt={b.alt}
                  className="h-full w-full object-cover object-left"
                />
              </picture>
            ) : (
              <img
                src={b.image}
                alt={b.alt}
                className="h-full w-full object-cover object-left md:object-center"
              />
            )}
            {/* CTA Button */}
            <div className="absolute inset-0 flex items-center justify-end pr-4 md:pr-8 lg:pr-16">
              <Button
                asChild
                size="sm"
                className="text-foreground bg-white px-3 py-1.5 text-xs font-semibold shadow-md transition-transform hover:scale-105 hover:bg-white/90 md:px-4 md:py-2 md:text-sm"
              >
                <a href={b.link}>
                  {b.ctaText}
                  <ArrowRight className="ml-1.5 h-3 w-3 md:h-4 md:w-4" />
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={(e) => {
          e.preventDefault();
          prevBanner();
        }}
        className="absolute top-1/2 left-1 z-20 -translate-y-1/2 rounded-full bg-black/30 p-1 opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100 hover:bg-black/50 md:left-2 md:p-1.5"
        aria-label="Previous banner"
      >
        <ChevronLeft className="h-3 w-3 text-white md:h-4 md:w-4" />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          nextBanner();
        }}
        className="absolute top-1/2 right-1 z-20 -translate-y-1/2 rounded-full bg-black/30 p-1 opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100 hover:bg-black/50 md:right-2 md:p-1.5"
        aria-label="Next banner"
      >
        <ChevronRight className="h-3 w-3 text-white md:h-4 md:w-4" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/30 px-2 py-1 backdrop-blur-sm">
        {displayBanners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToBanner(index)}
            className={`h-1.5 w-1.5 rounded-full transition-all md:h-2 md:w-2 ${
              index === currentBanner ? "w-4 bg-white md:w-5" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to banner ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute right-0 bottom-0 left-0 h-1 bg-black/20">
        <div
          className={`h-full bg-white/80 transition-all ${isPaused ? "" : "duration-5000"}`}
          style={{
            width: isPaused ? `${((currentBanner + 1) / displayBanners.length) * 100}%` : "100%",
            animation: isPaused ? "none" : undefined,
          }}
        />
      </div>
    </div>
  );
};
