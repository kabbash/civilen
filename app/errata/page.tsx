"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getAllErrata, getBooksWithErrata } from "@/data";
import type { Book, Errata } from "@/types";

export default function ErrataPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [errataData, setErrataData] = useState<Errata[]>([]);
  const [selectedBook, setSelectedBook] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [booksData, errataList] = await Promise.all([getBooksWithErrata(), getAllErrata()]);
        setBooks(booksData);
        setErrataData(errataList);
        if (booksData.length > 0) {
          setSelectedBook(booksData[0].slug);
        }
      } catch (error) {
        console.error("Error fetching errata data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Filter errata by selected book
  const filteredErrata = errataData.filter((item) => item.bookSlug === selectedBook);

  const hasErrata = filteredErrata.length > 0;

  if (loading) {
    return (
      <main className="relative flex min-h-screen w-full items-center justify-center bg-white pb-[400px]">
        <div className="text-center">
          <p className="font-gotham-book text-xl text-[#2e2d2d]">Loading errata...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-white pb-[70px]">
      {/* Hero Section with Geometric Background */}
      <section className="relative h-[240px] w-full overflow-hidden md:h-[360px]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/hero/errata.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Hero Title */}
        <div className="absolute top-[30px] left-1/2 max-w-[90%] -translate-x-1/2 bg-[rgba(234,84,34,0.5)] px-4 py-2 backdrop-blur-[10px] md:top-[140px] md:px-10 md:py-2.5">
          <h1 className="font-gotham-bold text-center text-2xl leading-[36px] text-white md:text-5xl md:leading-[72px] md:whitespace-nowrap">
            Errata and Corrections
          </h1>
        </div>
      </section>

      {/* Info Banner */}
      <div className="absolute top-[180px] left-1/2 z-10 w-[calc(100%-2rem)] max-w-[1064px] -translate-x-1/2 px-4 md:top-[292px] md:w-[1064px] md:px-0">
        <div className="flex items-start gap-2 rounded-[4px] bg-[rgba(255,255,255,0.8)] px-4 py-4 shadow-[0px_3px_10px_0px_rgba(190,64,22,0.25)] backdrop-blur-[10px] md:items-center md:gap-2.5 md:px-10 md:py-6">
          {/* Quality Icon */}
          <div className="mt-0.5 h-5 w-5 shrink-0 md:mt-0 md:h-6 md:w-6">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 7.5L6 21L18 21L18 16.5" stroke="#2E2D2D" strokeWidth="1.5" />
              <path d="M18 7.5L18 15L6 15" stroke="#2E2D2D" strokeWidth="1.5" />
              <circle cx="18" cy="10.5" r="3" fill="#EA5422" />
              <path
                d="M16.5 10.5L17.5 11.5L19.5 9.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="font-gotham-medium flex-1 text-sm leading-[21px] text-black md:text-lg md:leading-[27px]">
            We strive to ensure the accuracy and quality of this publication. If you discover any
            errors, omissions, or ambiguities, please help us improve future editions by reporting
            them.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-20">
        {!hasErrata ? (
          <div className="flex flex-col">
            {/* No Errata Message */}
            <div className="flex items-center justify-center px-4 pt-[120px] pb-[60px] md:pt-[277px] md:pb-[125px]">
              <h2 className="font-gotham-medium text-center text-2xl leading-[36px] text-black md:text-4xl md:leading-[54px]">
                No Published Errata.
              </h2>
            </div>

            {/* Reporting Instructions with top border */}
            <div className="w-full max-w-[524px] border-t border-[#ea5422] pt-4 md:pt-6">
              <h3 className="font-gotham-medium mb-3 text-xl leading-[30px] text-black md:mb-4 md:text-2xl md:leading-9">
                To report, kindly send details to:
              </h3>
              <div className="font-gotham-book space-y-1 text-base leading-[24px] text-black md:text-lg md:leading-[27px]">
                <p className="break-words">
                  <span className="font-gotham-medium">Email:</span>{" "}
                  <Link
                    href="mailto:errata@civilenpublishing.com"
                    className="break-all underline hover:no-underline"
                  >
                    errata@civilenpublishing.com
                  </Link>
                </p>
                <p>
                  <span className="font-gotham-medium">Subject Line:</span> &quot;Errata – [Book
                  Title]&quot;
                </p>
                <p>
                  <span className="font-gotham-medium">Include:</span> Page number, location
                  (paragraph, figure, or table), and a brief description of the issue.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex w-full flex-col">
            {/* Grid Layout for Populated State */}
            <div className="flex flex-col gap-6 pt-[100px] md:grid md:grid-cols-[307px_1px_1fr] md:gap-x-[40px] md:pt-[120px]">
              {/* Book Tabs - Left Column (Horizontal on mobile, vertical on desktop) */}
              <div className="flex flex-row items-center gap-4 overflow-x-auto border-b border-[#ea5422] pb-4 md:flex-col md:items-end md:gap-10 md:overflow-x-visible md:border-b-0 md:pb-0">
                {books.map((book) => {
                  const isSelected = selectedBook === book.slug;
                  return (
                    <button
                      key={book._id}
                      onClick={() => setSelectedBook(book.slug)}
                      className={`flex items-center gap-1.5 whitespace-nowrap transition-colors md:gap-2 ${
                        isSelected ? "text-[#ea5422]" : "text-black hover:text-[#ea5422]"
                      }`}
                    >
                      {isSelected && (
                        <div className="h-5 w-5 shrink-0 md:h-6 md:w-6">
                          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor">
                            <path
                              d="M10 6L16 12L10 18"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      )}
                      <span className="font-gotham-medium text-lg leading-[27px] md:text-2xl md:leading-9">
                        {book.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Vertical Border Column (hidden on mobile) */}
              <div className="hidden w-px bg-[#ea5422] md:block" />

              {/* Errata Entries - Right Column */}
              <div className="flex w-full flex-col gap-6 md:gap-10">
                {filteredErrata.map((item) => (
                  <div key={item._id} className="flex w-full flex-col gap-2 md:gap-2.5">
                    <h3 className="font-gotham-medium text-xl leading-[30px] break-words text-black md:text-2xl md:leading-9">
                      {item.title}
                    </h3>
                    <div className="flex flex-col gap-3 md:flex-row md:gap-[18px]">
                      {/* Labels Column */}
                      <div className="flex w-full flex-row gap-4 md:w-[102px] md:flex-col md:gap-2.5">
                        <p className="font-gotham-medium w-[100px] text-base leading-[24px] text-black md:w-auto md:text-lg md:leading-[27px]">
                          Edition:
                        </p>
                        <p className="font-gotham-book md:font-gotham-medium flex-1 text-base leading-[24px] text-black md:w-auto md:text-lg md:leading-[27px]">
                          <span className="md:hidden">{item.edition}</span>
                          <span className="hidden md:inline">Page:</span>
                        </p>
                      </div>
                      {/* Values Column - Desktop only labels */}
                      <div className="hidden max-w-[722px] flex-1 flex-col gap-2.5 md:flex">
                        <p className="font-gotham-book text-lg leading-[27px] break-words text-black">
                          {item.edition}
                        </p>
                        <p className="font-gotham-book text-lg leading-[27px] break-words text-black">
                          {item.page}
                        </p>
                        <p className="font-gotham-book text-lg leading-[27px] break-words text-black">
                          {item.statement}
                        </p>
                        <p className="font-gotham-book text-lg leading-[27px] break-words text-black">
                          {item.correction}
                        </p>
                      </div>
                      {/* Mobile Layout */}
                      <div className="flex w-full flex-col gap-3 md:hidden">
                        <div className="flex gap-4">
                          <p className="font-gotham-medium w-[100px] text-base leading-[24px] text-black">
                            Page:
                          </p>
                          <p className="font-gotham-book flex-1 text-base leading-[24px] break-words text-black">
                            {item.page}
                          </p>
                        </div>
                        <div className="flex gap-4">
                          <p className="font-gotham-medium w-[100px] text-base leading-[24px] text-black">
                            Statement:
                          </p>
                          <p className="font-gotham-book flex-1 text-base leading-[24px] break-words text-black">
                            {item.statement}
                          </p>
                        </div>
                        <div className="flex gap-4">
                          <p className="font-gotham-medium w-[100px] text-base leading-[24px] text-black">
                            Correction:
                          </p>
                          <p className="font-gotham-book flex-1 text-base leading-[24px] break-words text-black">
                            {item.correction}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reporting Instructions with top border */}
            <div className="mt-[40px] w-full border-t border-[#ea5422] pt-4 md:mt-[70px] md:pt-6">
              <h3 className="font-gotham-medium mb-3 text-xl leading-[30px] text-black md:mb-4 md:text-2xl md:leading-9">
                To report, kindly send details to:
              </h3>
              <div className="font-gotham-book space-y-1 text-base leading-[24px] text-black md:text-lg md:leading-[27px]">
                <p className="break-words">
                  <span className="font-gotham-medium">Email:</span>{" "}
                  <Link
                    href="mailto:errata@civilenpublishing.com"
                    className="break-all underline hover:no-underline"
                  >
                    errata@civilenpublishing.com
                  </Link>
                </p>
                <p>
                  <span className="font-gotham-medium">Subject Line:</span> &quot;Errata – [Book
                  Title]&quot;
                </p>
                <p>
                  <span className="font-gotham-medium">Include:</span> Page number, location
                  (paragraph, figure, or table), and a brief description of the issue.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

