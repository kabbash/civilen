"use client";

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
    <main className="relative min-h-screen w-full bg-white pb-[70px]">
      {/* Hero Section with Geometric Background */}
      <section className="relative h-[360px] w-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/hero/errata.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Hero Title */}
        <div className="absolute top-[140px] left-1/2 -translate-x-1/2 bg-[rgba(234,84,34,0.5)] px-10 py-2.5 backdrop-blur-[10px]">
          <h1 className="font-gotham-bold text-5xl leading-[72px] whitespace-nowrap text-white">
            Errata and Corrections
          </h1>
        </div>
      </section>

      {/* Info Banner */}
      <div className="absolute top-[292px] left-1/2 z-10 w-[1064px] -translate-x-1/2">
        <div className="flex items-center gap-2.5 rounded-[4px] bg-[rgba(255,255,255,0.8)] px-10 py-6 shadow-[0px_3px_10px_0px_rgba(190,64,22,0.25)] backdrop-blur-[10px]">
          {/* Quality Icon */}
          <div className="h-6 w-6 shrink-0">
            <svg
              width="24"
              height="24"
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
          <p className="font-gotham-medium flex-1 text-lg leading-[27px] text-black">
            We strive to ensure the accuracy and quality of this publication. If you discover any
            errors, omissions, or ambiguities, please help us improve future editions by reporting
            them.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-[1440px] px-20">
        {!hasErrata ? (
          <div className="flex flex-col">
            {/* No Errata Message */}
            <div className="flex items-center justify-center pt-[277px] pb-[125px]">
              <h2 className="font-gotham-medium text-4xl leading-[54px] text-black">
                No Published Errata.
              </h2>
            </div>

            {/* Reporting Instructions with top border */}
            <div className="max-w-[524px] border-t border-[#ea5422] pt-6">
              <h3 className="font-gotham-medium mb-4 text-2xl leading-9 text-black">
                To report, kindly send details to:
              </h3>
              <div className="font-gotham-book space-y-1 text-lg leading-[27px] text-black">
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
          <div className="flex flex-col">
            {/* Grid Layout for Populated State */}
            <div className="grid grid-cols-[307px_1px_1fr] gap-x-[40px] pt-[120px]">
              {/* Book Tabs - Left Column */}
              <div className="flex flex-col items-end gap-10">
                {books.map((book) => {
                  const isSelected = selectedBook === book.slug;
                  return (
                    <button
                      key={book._id}
                      onClick={() => setSelectedBook(book.slug)}
                      className={`flex items-center gap-2 transition-colors ${
                        isSelected ? "text-[#ea5422]" : "text-black hover:text-[#ea5422]"
                      }`}
                    >
                      {isSelected && (
                        <div className="h-6 w-6 shrink-0">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
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
                      <span className="font-gotham-medium text-2xl leading-9">
                        {book.title.replace("PE Structural-", "Practical ")}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Vertical Border Column */}
              <div className="w-px bg-[#ea5422]" />

              {/* Errata Entries - Right Column */}
              <div className="flex flex-col gap-10">
                {filteredErrata.map((item) => (
                  <div key={item._id} className="flex flex-col gap-2.5">
                    <h3 className="font-gotham-medium text-2xl leading-9 text-black">
                      {item.title}
                    </h3>
                    <div className="flex gap-[18px]">
                      {/* Labels Column */}
                      <div className="flex w-[102px] flex-col gap-2.5">
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
                      <div className="flex max-w-[722px] flex-1 flex-col gap-2.5">
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

            {/* Reporting Instructions with top border */}
            <div className="mt-[70px] border-t border-[#ea5422] pt-6">
              <h3 className="font-gotham-medium mb-4 text-2xl leading-9 text-black">
                To report, kindly send details to:
              </h3>
              <div className="font-gotham-book space-y-1 text-lg leading-[27px] text-black">
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
