import { PortableText, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlForImage } from './image'

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const imageUrl = urlForImage(value)?.url()
      if (!imageUrl) return null
      
      return (
        <div className="my-8">
          <Image
            src={imageUrl}
            alt={value.alt || 'Article image'}
            width={800}
            height={600}
            className="rounded-lg"
          />
        </div>
      )
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-gotham-bold text-[#ea5422] mt-10 mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-gotham-bold text-[#ea5422] mt-8 mb-3">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-gotham-bold text-[#ea5422] mt-6 mb-2">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-gotham-bold text-[#ea5422] mt-4 mb-2">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mb-5 leading-[27px]">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#ea5422] pl-4 italic my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-5 space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-5 space-y-2">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-gotham-bold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http')
        ? '_blank'
        : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noindex nofollow' : undefined}
          className="text-[#ea5422] underline hover:text-[#c74419]"
        >
          {children}
        </a>
      )
    },
  },
}

export { PortableText }

