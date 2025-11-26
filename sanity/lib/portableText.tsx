import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlForImage } from "./image";

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const imageUrl = urlForImage(value)?.url();
      if (!imageUrl) return null;

      return (
        <div className="my-8">
          <Image
            src={imageUrl}
            alt={value.alt || "Article image"}
            width={800}
            height={600}
            className="rounded-lg"
          />
        </div>
      );
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="font-gotham-bold mt-10 mb-4 text-4xl text-[#ea5422]">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-gotham-bold mt-8 mb-3 text-3xl text-[#ea5422]">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-gotham-bold mt-6 mb-2 text-2xl text-[#ea5422]">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-gotham-bold mt-4 mb-2 text-xl text-[#ea5422]">{children}</h4>
    ),
    normal: ({ children }) => <p className="mb-5 leading-[27px]">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-[#ea5422] pl-4 italic">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mb-5 list-inside list-disc space-y-2">{children}</ul>,
    number: ({ children }) => (
      <ol className="mb-5 list-inside list-decimal space-y-2">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-gotham-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">{children}</code>
    ),
    link: ({ value, children }) => {
      const target = (value?.href || "").startsWith("http") ? "_blank" : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === "_blank" ? "noindex nofollow" : undefined}
          className="text-[#ea5422] underline hover:text-[#c74419]"
        >
          {children}
        </a>
      );
    },
  },
};

export { PortableText };
