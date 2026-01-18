"use client";

import { useState } from "react";
import Image from "next/image";
import { PrimaryButton } from "@/components/ui/primary-button";

interface SampleDownloadPopupProps {
  bookId: string;
  bookTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export function SampleDownloadPopup({
  bookId,
  bookTitle,
  isOpen,
  onClose,
}: SampleDownloadPopupProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/download-sample", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, bookId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send sample");
      }

      setMessage({ type: "success", text: data.message });
      setEmail("");
      
      // Close popup after 3 seconds on success
      setTimeout(() => {
        onClose();
        setMessage(null);
      }, 3000);
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Popup */}
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg
            className="h-6 w-6"
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
        </button>

        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Image
              src="/images/icons/download-icon.svg"
              alt=""
              width={32}
              height={32}
              className="text-primary"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <svg
              className="h-8 w-8 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h2 className="font-gotham-medium text-xl text-black md:text-2xl">
            Get Your Free Sample
          </h2>
          <p className="font-gotham-book mt-2 text-sm text-gray-600 md:text-base">
            Enter your email to receive a free sample of{" "}
            <span className="font-gotham-medium text-primary">&quot;{bookTitle}&quot;</span>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="sample-email" className="sr-only">
              Email address
            </label>
            <input
              id="sample-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="font-gotham-book w-full rounded-md border border-gray-300 px-4 py-3 text-base placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Message */}
          {message && (
            <div
              className={`rounded-md p-3 text-sm ${
                message.type === "success"
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {message.type === "success" ? "✅ " : "❌ "}
              {message.text}
            </div>
          )}

          <PrimaryButton
            type="submit"
            className="w-full justify-center"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Me the Sample"}
          </PrimaryButton>

          <p className="font-gotham-book text-center text-xs text-gray-500">
            By subscribing, you&apos;ll also receive updates about new books and articles.
            You can unsubscribe at any time.
          </p>
        </form>
      </div>
    </div>
  );
}

