import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlForImage } from "./image";

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const imageUrl = urlForImage(value)?.url();
      if (!imageUrl) return null;

      const alignment = value.alignment || "center";

      // Define alignment classes
      const alignmentClasses = {
        left: "mr-auto",
        center: "mx-auto",
        right: "ml-auto",
        full: "w-full",
      };

      // Define width classes based on alignment
      const widthClasses = {
        left: "max-w-[300px] md:max-w-[400px]",
        center: "max-w-full",
        right: "max-w-[300px] md:max-w-[400px]",
        full: "w-full max-w-full",
      };

      // Define caption alignment
      const captionAlignment = {
        left: "text-left",
        center: "text-center",
        right: "text-right",
        full: "text-center",
      };

      return (
        <figure
          className={`my-6 md:my-10 ${alignmentClasses[alignment as keyof typeof alignmentClasses]} ${widthClasses[alignment as keyof typeof widthClasses]}`}
        >
          <div className="relative w-full overflow-hidden rounded-lg">
            <Image
              src={imageUrl}
              alt={value.alt || "Article image"}
              width={1200}
              height={800}
              className="h-auto w-full object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 868px, 868px"
            />
          </div>
          {value.caption && (
            <figcaption
              className={`mt-2 text-sm text-gray-600 italic md:text-base ${captionAlignment[alignment as keyof typeof captionAlignment]}`}
            >
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="font-gotham-bold mt-6 mb-3 text-2xl break-words text-[#ea5422] md:mt-10 md:mb-4 md:text-4xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-gotham-bold mt-5 mb-2 text-xl break-words text-[#ea5422] md:mt-8 md:mb-3 md:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-gotham-bold mt-4 mb-2 text-lg break-words text-[#ea5422] md:mt-6 md:text-2xl">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-gotham-bold mt-3 mb-2 text-base break-words text-[#ea5422] md:mt-4 md:text-xl">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-base leading-[24px] break-words md:mb-5 md:text-lg md:leading-[27px]">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-4 border-[#ea5422] pl-3 text-sm break-words italic md:my-6 md:pl-4 md:text-base">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-inside list-disc space-y-1.5 text-base break-words md:mb-5 md:space-y-2 md:text-lg">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-inside list-decimal space-y-1.5 text-base break-words md:mb-5 md:space-y-2 md:text-lg">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-gotham-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-xs break-all md:px-2 md:py-1 md:text-sm">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const target = (value?.href || "").startsWith("http") ? "_blank" : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === "_blank" ? "noindex nofollow" : undefined}
          className="break-words text-[#ea5422] underline hover:text-[#c74419]"
        >
          {children}
        </a>
      );
    },
  },
};

export { PortableText };
