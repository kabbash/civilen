# 🚀 Quick Start - CivilEn Components

## ✅ What's Ready

All Figma components have been implemented and **all assets are now local** (no more external URLs!).

## 📦 Available Components

### Layout Components

```tsx
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

<Header />  // Sticky navigation with logo
<Footer />  // Full footer with newsletter
```

### UI Components

```tsx
import {
  PrimaryButton,
  NavLink,
  PageHeader,
  FeatureCard
} from "@/components/ui";

<PrimaryButton onClick={handleClick}>Click Me</PrimaryButton>
<NavLink href="/books">Books</NavLink>
<PageHeader>Your Title Here</PageHeader>
<FeatureCard title="Practice Questions" count="80+" />
```

### Content Components

```tsx
import { BookCard } from "@/components/books/BookCard";
import { ArticleCard } from "@/components/articles/ArticleCard";

<BookCard book={bookData} />
<ArticleCard article={articleData} />
```

## 🎨 Assets Location

All images are in `/public/images/`:

```
images/
├── logo/           → CivilEn logos
├── icons/          → SVG icons
├── patterns/       → Background patterns
├── bookmarks/      → Bookmark icons
└── articles/       → Article images
```

## 🏃 Running Your App

```bash
npm run dev
# Visit http://localhost:3000
```

**No configuration needed!** All images work out of the box.

## 📚 Full Documentation

- `FIGMA_COMPONENTS.md` - Complete component API reference
- `COMPONENT_EXAMPLES.tsx` - Copy-paste code examples
- `ASSETS_README.md` - Asset directory guide
- `FIGMA_MCP_GUIDE.md` - How to use Figma MCP for new components
- `MIGRATION_SUMMARY.md` - What was changed and why

## 🎯 Next Steps

1. **Test the app**: Run `npm run dev` and check all pages
2. **Customize colors**: Edit `app/globals.css` design tokens
3. **Add content**: Update your data files with real books/articles
4. **Add Gotham fonts**: Or use alternatives (Montserrat, Inter)
5. **Make responsive**: Add mobile breakpoints to components

## 💡 Common Tasks

### Adding a New Page

```tsx
// app/new-page/page.tsx
import { PageHeader } from "@/components/ui";

export default function NewPage() {
  return (
    <>
      <PageHeader>New Page Title</PageHeader>
      {/* Your content */}
    </>
  );
}
```

### Using Custom Images

```tsx
// Put image in /public/images/
<ArticleCard article={article} imageUrl="/images/my-custom-image.jpg" />
```

### Customizing Styles

```tsx
// All components accept className
<PrimaryButton className="w-full text-xl">Custom Styled Button</PrimaryButton>
```

## 🆘 Troubleshooting

### Images not showing?

- Check path: `/images/category/filename.ext` (no `/public/`)
- Verify file exists in `/public/images/`
- Clear Next.js cache: `rm -rf .next && npm run dev`

### Styling issues?

- Ensure Tailwind is working: Check `app/globals.css`
- Check for conflicting CSS classes
- Use browser DevTools to inspect elements

### TypeScript errors?

- Run `npm run type-check` (if available)
- Check `types/index.ts` for type definitions

## 🤝 Need Help?

Ask me anything:

- "How do I make BookCard responsive?"
- "Create a new component from this Figma URL: ..."
- "Why isn't my image showing?"
- "How do I customize the orange color?"

---

**Ready to build! 🎉**

Start your dev server and see your Figma designs come to life!
