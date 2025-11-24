"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { errataQuery, booksWithErrataQuery } from "@/sanity/lib/queries";
import type { Book, Errata } from "@/types";

export default function ErrataPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [errataData, setErrataData] = useState<Errata[]>([]);
  const [selectedBook, setSelectedBook] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [booksData, errataList] = await Promise.all([
          client.fetch(booksWithErrataQuery),
          client.fetch(errataQuery),
        ]);
        setBooks(booksData);
        setErrataData(errataList);
        if (booksData.length > 0) {
          setSelectedBook(booksData[0].slug);
        }
      } catch (error) {
        console.error('Error fetching errata data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Filter errata by selected book
  const filteredErrata = errataData.filter(
    (item) => item.bookSlug === selectedBook
  );

  const hasErrata = filteredErrata.length > 0;

  if (loading) {
    return (
      <main className="relative w-full min-h-screen bg-white pb-[400px] flex items-center justify-center">
        <div className="text-center">
          <p className="font-gotham-book text-xl text-[#2e2d2d]">Loading errata...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative w-full min-h-screen bg-white pb-[400px]">
      {/* Hero Section with Geometric Background */}
      <section className="relative h-[360px] w-full overflow-hidden">
        {/* Background with geometric pattern */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full bg-gradient-to-r from-[#8b5a3c] via-[#6b4d3a] to-[#a0724d]">
            <Image
              src="/images/hero/engineer-construction.png"
              alt="Background"
              fill
              className="object-cover mix-blend-overlay opacity-30"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Hero Title */}
        <div className="absolute left-1/2 top-[140px] -translate-x-1/2 backdrop-blur-[10px] bg-[rgba(234,84,34,0.5)] px-10 py-2.5">
          <h1 className="font-gotham-bold text-5xl leading-[72px] text-white whitespace-nowrap">
            Errata and Corrections
          </h1>
        </div>
      </section>

      {/* Info Banner */}
      <div className="absolute left-1/2 top-[292px] -translate-x-1/2 w-[1064px] z-10">
        <div className="backdrop-blur-[10px] bg-[rgba(255,255,255,0.8)] rounded-[4px] shadow-[0px_3px_10px_0px_rgba(190,64,22,0.25)] px-10 py-6 flex items-center gap-2.5">
          {/* Quality Icon */}
          <div className="shrink-0 w-6 h-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 7.5L6 21L18 21L18 16.5" stroke="#2E2D2D" strokeWidth="1.5"/>
              <path d="M18 7.5L18 15L6 15" stroke="#2E2D2D" strokeWidth="1.5"/>
              <circle cx="18" cy="10.5" r="3" fill="#EA5422"/>
              <path d="M16.5 10.5L17.5 11.5L19.5 9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="flex-1 font-gotham-medium text-lg leading-[27px] text-black">
            We strive to ensure the accuracy and quality of this publication. If you discover any errors, omissions, or ambiguities, please help us improve future editions by reporting them.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-[1440px] mx-auto px-20">
        {!hasErrata ? (
          <>
            {/* No Errata Message */}
            <div className="flex items-center justify-center pt-[277px] pb-[125px]">
              <h2 className="font-gotham-medium text-4xl leading-[54px] text-black">
                No Published Errata.
              </h2>
            </div>

            {/* Horizontal Divider */}
            <div className="w-full h-px bg-[#ea5422] mb-6" />

            {/* Reporting Instructions */}
            <div className="max-w-[524px]">
              <h3 className="font-gotham-medium text-2xl leading-9 text-black mb-4">
                To report, kindly send details to:
              </h3>
              <div className="font-gotham-book text-lg leading-[27px] text-black space-y-1">
                <p>
                  <span className="font-gotham-medium">Email:</span>{" "}
                  <Link 
                    href="mailto:errata@civilenpublishing.com"
                    className="underline hover:no-underline"
                  >
                    errata@civilenpublishing.com
                  </Link>
                </p>
                <p>
                  <span className="font-gotham-medium">Subject Line:</span> "Errata – [Book Title]"
                </p>
                <p>
                  <span className="font-gotham-medium">Include:</span> Page number, location (paragraph, figure, or table), and a brief description of the issue.
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Populated State with Book Tabs and Errata Entries */}
            <div className="relative pt-[174px]">
              {/* Book Tabs - Left Sidebar */}
              <div className="absolute left-0 top-[174px] w-[307px] flex flex-col gap-10">
                {books.map((book) => {
                  const isSelected = selectedBook === book.slug;
                  return (
                    <button
                      key={book._id}
                      onClick={() => setSelectedBook(book.slug)}
                      className={`flex items-center gap-2 text-right transition-colors ${
                        isSelected ? "text-[#ea5422]" : "text-black hover:text-[#ea5422]"
                      }`}
                    >
                      {isSelected && (
                        <div className="shrink-0 w-6 h-6">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M5.5 12L10 16.5L18.5 8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      )}
                      <span className="font-gotham-medium text-2xl leading-9 flex-1 text-right">
                        {book.title.replace("PE Structural-", "Practical ")}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Vertical Divider */}
              <div className="absolute left-[347px] top-0 w-px h-full bg-[#ea5422]" />

              {/* Errata Entries */}
              <div className="ml-[387px] flex flex-col gap-10">
                {filteredErrata.map((item) => (
                  <div key={item._id} className="flex flex-col gap-2.5">
                    <h3 className="font-gotham-medium text-2xl leading-9 text-black">
                      {item.title}
                    </h3>
                    <div className="flex gap-[18px]">
                      {/* Labels Column */}
                      <div className="flex flex-col gap-2.5 w-[102px]">
                        <p className="font-gotham-medium text-lg leading-[27px] text-black">
                          Edition:
                        </p>
                        <p className="font-gotham-medium text-lg leading-[27px] text-black">
                          Page:
                        </p>
                        <p className="font-gotham-medium text-lg leading-[27px] text-black">
                          Statement:
                        </p>
                        <p className="font-gotham-medium text-lg leading-[27px] text-black">
                          Correction:
                        </p>
                      </div>
                      {/* Values Column */}
                      <div className="flex flex-col gap-2.5 flex-1 max-w-[722px]">
                        <p className="font-gotham-book text-lg leading-[27px] text-black">
                          {item.edition}
                        </p>
                        <p className="font-gotham-book text-lg leading-[27px] text-black">
                          {item.page}
                        </p>
                        <p className="font-gotham-book text-lg leading-[27px] text-black">
                          {item.statement}
                        </p>
                        <p className="font-gotham-book text-lg leading-[27px] text-black">
                          {item.correction}
                        </p>
                      </div>
              </div>
            </div>
          ))}
        </div>
      </div>

            {/* Horizontal Divider */}
            <div className="w-full h-px bg-[#ea5422] mt-[168px] mb-6" />

            {/* Reporting Instructions */}
            <div className="max-w-[524px]">
              <h3 className="font-gotham-medium text-2xl leading-9 text-black mb-4">
                To report, kindly send details to:
              </h3>
              <div className="font-gotham-book text-lg leading-[27px] text-black space-y-1">
                <p>
                  <span className="font-gotham-medium">Email:</span>{" "}
                  <Link 
                    href="mailto:errata@civilenpublishing.com"
                    className="underline hover:no-underline"
                  >
                    errata@civilenpublishing.com
                  </Link>
                </p>
                <p>
                  <span className="font-gotham-medium">Subject Line:</span> "Errata – [Book Title]"
                </p>
                <p>
                  <span className="font-gotham-medium">Include:</span> Page number, location (paragraph, figure, or table), and a brief description of the issue.
                </p>
              </div>
            </div>
          </>
        )}
    </div>
    </main>
  );
}

