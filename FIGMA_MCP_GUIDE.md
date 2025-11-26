# Figma MCP Guide for CivilEn Project

## ✅ What Was Implemented

I've successfully extracted and implemented all reusable components from your Figma design file:

### Components Created:

1. ✅ **PrimaryButton** - Orange gradient button with hover/active states
2. ✅ **NavLink** - Navigation link with active state detection
3. ✅ **PageHeader** - Section header with decorative gradient
4. ✅ **FeatureCard** - Stats/feature showcase card
5. ✅ **Header (Navbar)** - Main navigation with logo and links
6. ✅ **Footer** - Complete footer with newsletter, links, and contact
7. ✅ **BookCard** - Book display card with hover effects
8. ✅ **ArticleCard** - Article preview card with image overlay

### Design System:

- ✅ Orange color palette (#ea5422, #ea7922, #be4016)
- ✅ Gotham font family (Medium, Book, Bold)
- ✅ Gradient utilities
- ✅ Consistent spacing and shadows

## 📁 Files Created/Modified

### New Components:

```
components/
├── ui/
│   ├── primary-button.tsx      ← New
│   ├── nav-link.tsx            ← New
│   ├── page-header.tsx         ← New
│   ├── feature-card.tsx        ← New
│   └── index.ts                ← New (exports)
├── layout/
│   ├── Header.tsx              ← Updated
│   └── Footer.tsx              ← Updated
├── books/
│   └── BookCard.tsx            ← Updated
└── articles/
    └── ArticleCard.tsx         ← Updated
```

### Configuration:

```
app/
└── globals.css                 ← Updated (design tokens)

FIGMA_COMPONENTS.md             ← New (documentation)
COMPONENT_EXAMPLES.tsx          ← New (usage examples)
FIGMA_MCP_GUIDE.md             ← This file
```

## 🎨 How to Use Figma MCP (Step-by-Step)

### 1. Finding Components in Figma

1. Open your Figma file
2. Navigate to the component you want
3. Right-click on the layer
4. Select "Copy link"

The URL will look like:

```
https://www.figma.com/design/cqBKc3wzIQFzdcVgeiiIdp/CivilEn?node-id=26-1334
```

### 2. Prompting with Figma URLs

Simply paste the Figma URL and tell me what you want:

**Example Prompts:**

```
"Generate a React component from this Figma design:
https://www.figma.com/design/cqBKc3wzIQFzdcVgeiiIdp/CivilEn?node-id=123-456"
```

```
"Create a card component based on this Figma node:
https://www.figma.com/design/cqBKc3wzIQFzdcVgeiiIdp/CivilEn?node-id=789-012"
```

```
"Extract design tokens (colors, fonts) from:
https://www.figma.com/design/cqBKc3wzIQFzdcVgeiiIdp/CivilEn?node-id=26-1334"
```

### 3. Available Figma MCP Commands

The Figma MCP server provides these capabilities:

#### **Get Design Context** (Most useful)

Extracts component code and styling:

```
"Generate code for [Figma URL]"
"Create a component from [Figma URL]"
```

#### **Get Screenshot**

Visual preview of a design:

```
"Show me a screenshot of [Figma URL]"
```

#### **Get Metadata**

Structure and hierarchy:

```
"Show me the structure of [Figma URL]"
"What layers are in [Figma URL]"
```

#### **Get Variables**

Design tokens and variables:

```
"Get the color palette from [Figma URL]"
"Extract design variables from [Figma URL]"
```

### 4. Workflow for New Components

**Step 1:** Find the component in Figma and copy the link

**Step 2:** Ask me to generate it:

```
"Create a [component name] based on this Figma design: [URL]"
```

**Step 3:** I will:

- Fetch the design from Figma
- Generate TypeScript/React code
- Match your project's styling (Tailwind CSS)
- Create the component file
- Update documentation

**Step 4:** Review and customize as needed

### 5. Common Use Cases

#### Creating a New Component

```
"I need a pricing card component from:
https://www.figma.com/design/cqBKc3wzIQFzdcVgeiiIdp/CivilEn?node-id=XXX-YYY"
```

#### Updating an Existing Component

```
"Update the BookCard component to match this new design:
https://www.figma.com/design/cqBKc3wzIQFzdcVgeiiIdp/CivilEn?node-id=XXX-YYY"
```

#### Extracting Design Tokens

```
"Get all the colors and typography from:
https://www.figma.com/design/cqBKc3wzIQFzdcVgeiiIdp/CivilEn?node-id=26-1334"
```

#### Getting Component Variants

```
"Show me all the button variants from:
https://www.figma.com/design/cqBKc3wzIQFzdcVgeiiIdp/CivilEn?node-id=9-296"
```

## 🎯 Quick Reference

### Component Import Examples

```tsx
// Import individual components
import { PrimaryButton } from "@/components/ui/primary-button";
import { NavLink } from "@/components/ui/nav-link";
import { PageHeader } from "@/components/ui/page-header";
import { FeatureCard } from "@/components/ui/feature-card";

// Or import from index
import { PrimaryButton, NavLink, PageHeader, FeatureCard } from "@/components/ui";

// Layout components
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Content components
import { BookCard } from "@/components/books/BookCard";
import { ArticleCard } from "@/components/articles/ArticleCard";
```

### Usage Examples

```tsx
// Button
<PrimaryButton onClick={handleClick}>
  Click Me
</PrimaryButton>

// Navigation Link
<NavLink href="/books">Books</NavLink>

// Page Header
<PageHeader>Your PE Exam Practice Starts Here</PageHeader>

// Feature Card
<FeatureCard
  title="CBT-Style Practice Questions"
  count="80+"
/>

// Book Card
<BookCard book={{
  title: "PE Structural-Gravity Exams",
  description: "Get exam-ready...",
  coverImage: "/book-cover.jpg",
  slug: "pe-structural-gravity"
}} />

// Article Card
<ArticleCard
  article={{
    title: "Beating the PE Exam",
    excerpt: "Lorem ipsum...",
    slug: "beating-pe-exam"
  }}
  imageUrl="/article-image.jpg"
/>
```

## 🔧 Customization Tips

### Extending Components

All components accept a `className` prop for customization:

```tsx
<PrimaryButton className="w-full">
  Full Width Button
</PrimaryButton>

<PageHeader className="my-12">
  Custom Spacing
</PageHeader>
```

### Overriding Styles

Use Tailwind classes to override:

```tsx
<FeatureCard title="Custom Feature" count="100+" className="bg-blue-100" />
```

### Creating Variants

Extend the components for specific use cases:

```tsx
// components/ui/secondary-button.tsx
import { PrimaryButton } from "./primary-button";

export function SecondaryButton(props) {
  return <PrimaryButton {...props} className="bg-gray-500 hover:bg-gray-600" />;
}
```

## 📝 Important Notes

### Image URLs

⚠️ **The Figma image URLs are temporary (7 days)!**

For production:

1. Download images from the URLs
2. Save to `/public/images/`
3. Update component image sources

### Fonts

The components reference Gotham fonts. Options:

1. Purchase Gotham font license
2. Use Google Fonts alternative (Montserrat, Inter)
3. Update font classes in `globals.css`

### Responsive Design

Current components use fixed widths from Figma. Add responsive classes:

```tsx
<div className="w-full md:w-[632px] lg:w-[800px]">
  <BookCard book={book} />
</div>
```

## 🚀 Next Steps

1. **Replace temporary image URLs** with local assets
2. **Test components** on your actual pages
3. **Add responsive breakpoints** for mobile
4. **Implement any missing components** from Figma
5. **Create more variants** as needed

## 💡 Pro Tips

### Batch Component Generation

You can ask me to generate multiple components at once:

```
"Generate components for these Figma nodes:
1. Button - node-id=9-296
2. Card - node-id=21-1216
3. Input - node-id=45-678"
```

### Component Libraries

Ask me to create a Storybook setup:

```
"Create a Storybook configuration for all these Figma components"
```

### Theme Variations

Request different color schemes:

```
"Create a dark mode version of these components"
```

## 📚 Additional Resources

- **Figma Design File:** https://www.figma.com/design/cqBKc3wzIQFzdcVgeiiIdp/CivilEn?node-id=26-1334
- **Component Documentation:** See `FIGMA_COMPONENTS.md`
- **Usage Examples:** See `COMPONENT_EXAMPLES.tsx`
- **Figma MCP Docs:** https://www.figma.com/mcp

## ❓ Need Help?

Just ask! Example questions:

- "How do I make the BookCard responsive?"
- "Can you create a mobile menu component?"
- "Generate a form component from this Figma design: [URL]"
- "How do I customize the Footer colors?"
- "Create a testimonial card from: [Figma URL]"

---

**Your Figma MCP is configured and ready to use! 🎉**

Simply paste any Figma URL and tell me what you need.
