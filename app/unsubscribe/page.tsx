"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const error = searchParams.get("error");

  // Success state
  if (success === "true") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-4">
        <div className="w-full max-w-md text-center">
          {/* Success Icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-10 w-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="font-gotham-bold mb-4 text-3xl text-[#2e2d2d]">
            Successfully Unsubscribed
          </h1>

          <p className="font-gotham-book mb-8 text-lg text-[#666]">
            You have been removed from our newsletter. We&apos;re sorry to see you go!
          </p>

          <Link
            href="/"
            className="font-gotham-medium inline-block rounded-[4px] bg-[#ea5422] px-8 py-3 text-white transition-colors hover:bg-[#d14a1e]"
          >
            Back to Homepage
          </Link>
        </div>
      </main>
    );
  }

  // Error state
  if (error) {
    const errorMessage =
      error === "invalid"
        ? "This unsubscribe link is invalid or has expired."
        : "We couldn't process your unsubscribe request. Please try again later.";

    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-4">
        <div className="w-full max-w-md text-center">
          {/* Error Icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-10 w-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <h1 className="font-gotham-bold mb-4 text-3xl text-[#2e2d2d]">
            {error === "invalid" ? "Invalid Link" : "Something Went Wrong"}
          </h1>

          <p className="font-gotham-book mb-8 text-lg text-[#666]">{errorMessage}</p>

          <Link
            href="/"
            className="font-gotham-medium inline-block rounded-[4px] bg-[#ea5422] px-8 py-3 text-white transition-colors hover:bg-[#d14a1e]"
          >
            Back to Homepage
          </Link>
        </div>
      </main>
    );
  }

  // Default state - no email parameter (shouldn't normally happen)
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md text-center">
        {/* Info Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#ea5422]/10">
          <svg
            className="h-10 w-10 text-[#ea5422]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="font-gotham-bold mb-4 text-3xl text-[#2e2d2d]">Unsubscribe</h1>

        <p className="font-gotham-book mb-8 text-lg text-[#666]">
          To unsubscribe from our newsletter, please use the link provided in your email.
        </p>

        <Link
          href="/"
          className="font-gotham-medium inline-block rounded-[4px] bg-[#ea5422] px-8 py-3 text-white transition-colors hover:bg-[#d14a1e]"
        >
          Back to Homepage
        </Link>
      </div>
    </main>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-white">
          <p className="font-gotham-book text-lg text-[#666]">Loading...</p>
        </main>
      }
    >
      <UnsubscribeContent />
    </Suspense>
  );
}



