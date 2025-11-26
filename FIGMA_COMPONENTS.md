# CivilEn Figma Components Implementation

## Overview

This document describes all the reusable components implemented from the Figma design file.

**Figma File:** [CivilEn Design](https://www.figma.com/design/cqBKc3wzIQFzdcVgeiiIdp/CivilEn?node-id=26-1334)

## Components Implemented

### 1. **PrimaryButton**

**Location:** `components/ui/primary-button.tsx`

A styled button component with the CivilEn orange gradient theme.

**Features:**

- Orange gradient background (Default state)
- Reverse gradient on hover
- Solid color on press/active
- Disabled state support

**Usage:**

```tsx
import { PrimaryButton } from "@/components/ui/primary-button";

<PrimaryButton onClick={handleClick}>Button Text</PrimaryButton>;
```

### 2. **NavLink**

**Location:** `components/ui/nav-link.tsx`

Navigation link component with active/hover states.

**Features:**

- Automatic active state detection based on current route
- Orange text and shadow when active
- Hover state with darker orange
- Gotham Medium font styling

**Usage:**

```tsx
import { NavLink } from "@/components/ui/nav-link";

<NavLink href="/books">Books</NavLink>;
```

### 3. **PageHeader**

**Location:** `components/ui/page-header.tsx`

Page section header with decorative orange gradient underline.

**Features:**

- Large title text (36px)
- Orange gradient background bar
- Centered alignment

**Usage:**

```tsx
import { PageHeader } from "@/components/ui/page-header";

<PageHeader>Your PE Exam Practice Starts Here</PageHeader>;
```

### 4. **FeatureCard**

**Location:** `components/ui/feature-card.tsx`

Feature/stats card with icon, count, and title.

**Features:**

- Icon with count overlay
- Light orange background
- Hover state (text turns orange)
- Perfect for displaying statistics or features

**Usage:**

```tsx
import { FeatureCard } from "@/components/ui/feature-card";

<FeatureCard title="CBT-Style Practice Questions" count="80+" iconUrl="/path/to/icon.svg" />;
```

### 5. **Header (Navbar)**

**Location:** `components/layout/Header.tsx`

Main navigation bar with logo and navigation links.

**Features:**

- CivilEn logo
- Navigation links with active state highlighting
- Sticky positioning
- Glassmorphism effect (backdrop blur)
- Rounded bottom corners
- Orange shadow

**Usage:**

```tsx
import { Header } from "@/components/layout/Header";

// In your layout
<Header />;
```

### 6. **Footer**

**Location:** `components/layout/Footer.tsx`

Comprehensive footer with newsletter signup, links, and contact info.

**Features:**

- Newsletter subscription form
- Link sections (Links, Support and Contact)
- Contact information (email, address)
- CivilEn logo
- Dark background with texture overlay
- Responsive layout

**Usage:**

```tsx
import { Footer } from "@/components/layout/Footer";

// In your layout
<Footer />;
```

### 7. **BookCard**

**Location:** `components/books/BookCard.tsx`

Card component for displaying book information.

**Features:**

- Book cover image
- Decorative bookmark
- Background pattern
- Hover state with elevated shadow
- Title and description
- "View Details" button

**Usage:**

```tsx
import { BookCard } from "@/components/books/BookCard";

<BookCard
  book={{
    title: "PE Structural-Gravity Exams",
    description: "Get exam-ready with two full-length...",
    coverImage: "/path/to/cover.jpg",
    slug: "pe-structural-gravity",
  }}
/>;
```

### 8. **ArticleCard**

**Location:** `components/articles/ArticleCard.tsx`

Card component for displaying article previews.

**Features:**

- Full-bleed background image
- Dark gradient overlay
- Glassmorphism content area
- Title and excerpt
- "Read Article" button
- Hover effects

**Usage:**

```tsx
import { ArticleCard } from "@/components/articles/ArticleCard";

<ArticleCard
  article={{
    title: "Beating the PE Structural Exam",
    excerpt: "Lorem ipsum dolor sit amet...",
    slug: "beating-pe-exam",
  }}
  imageUrl="/path/to/article-image.jpg"
/>;
```

## Design Tokens

### Colors

```css
--primary: #ea5422 /* Main orange */ --primary-600: #be4016 /* Darker orange (hover) */
  --color-white: #ffffff --color-black: #000000 --color-grey-600: #2e2d2d /* Dark grey (footer) */
  --color-grey-light: #fff1ec /* Light orange/beige */;
```

### Gradients

- **Primary Gradient:** `linear-gradient(to right, #ea7922, #ea5422)`
- **Reverse Gradient:** `linear-gradient(to right, #ea5422, #ea7922)`

### Typography

The design uses the Gotham font family:

- **Gotham Medium** - 500 weight (headings, buttons, labels)
- **Gotham Book** - 400 weight (body text)
- **Gotham Bold** - 700 weight (emphasis, stats)

**Font Classes:**

```css
.font-gotham-medium  /* 500 weight */
.font-gotham-book    /* 400 weight */
.font-gotham-bold    /* 700 weight */
```

### Utility Classes

```css
.bg-orange-gradient          /* Primary gradient */
.bg-orange-gradient-reverse  /* Reverse gradient */
```

## Implementation Notes

### Image Assets

✅ **All images have been downloaded and are now local!**

All assets are organized in `/public/images/` with the following structure:

- `/images/logo/` - CivilEn logos
- `/images/icons/` - SVG icons
- `/images/patterns/` - Background patterns
- `/images/bookmarks/` - Bookmark icons
- `/images/articles/` - Article images

See `ASSETS_README.md` for complete details on all available assets.

### Fonts

The components reference Gotham fonts. To use the actual Gotham fonts:

1. **Obtain Gotham font files** (requires license)
2. **Add font files** to `/public/fonts/`
3. **Update globals.css** with proper `@font-face` declarations

### Responsive Design

The current implementation uses fixed widths from the Figma design. Consider adding responsive breakpoints:

```tsx
// Example: Make BookCard responsive
<div className="w-full md:w-[632px]">
  <BookCard book={book} />
</div>
```

## Next Steps

1. ✅ ~~Replace temporary image URLs with local assets~~ - **DONE!**
2. **Add Gotham fonts** or suitable alternatives
3. **Implement responsive breakpoints** for mobile/tablet
4. **Add animations** (optional) using Framer Motion or CSS transitions
5. **Test all components** in different browsers
6. **Add accessibility features** (ARIA labels, keyboard navigation)

## Component Props Reference

### PrimaryButton

```typescript
interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
```

### NavLink

```typescript
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}
```

### PageHeader

```typescript
interface PageHeaderProps {
  children: React.ReactNode;
  className?: string;
}
```

### FeatureCard

```typescript
interface FeatureCardProps {
  title: string;
  count: string;
  iconUrl?: string;
  className?: string;
}
```

### BookCard

```typescript
interface BookCardProps {
  book: {
    title: string;
    description: string;
    coverImage: string;
    slug: string;
    author?: string;
    amazonLink?: string;
  };
}
```

### ArticleCard

```typescript
interface ArticleCardProps {
  article: {
    title: string;
    excerpt: string;
    slug: string;
    author?: string;
    publishedDate?: string;
  };
  imageUrl?: string;
}
```

## Support

For questions about these components or the Figma design implementation, refer to the original Figma file:
https://www.figma.com/design/cqBKc3wzIQFzdcVgeiiIdp/CivilEn?node-id=26-1334
