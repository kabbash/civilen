# Assets Directory Structure

All Figma design assets have been downloaded and organized in the `/public/images/` directory.

## Directory Structure

```
public/
└── images/
    ├── articles/
    │   └── default-article.jpg      (165KB) - Default article preview image
    ├── bookmarks/
    │   ├── bookmark-default.svg     (260B)  - Bookmark icon (default state)
    │   └── bookmark-hover.svg       (261B)  - Bookmark icon (hover state)
    ├── icons/
    │   ├── email.svg                (1.0KB) - Email icon for footer
    │   ├── feature-icon.svg         (1.1KB) - Feature card icon
    │   ├── location.svg             (1.0KB) - Location icon for footer
    │   ├── menu-icon.svg            (1.5KB) - Mobile menu hamburger icon
    │   └── close-icon.svg           (0.4KB) - Mobile menu close icon
    ├── logo/
    │   ├── civilen-logo.png         (4.7KB) - Main CivilEn logo
    │   └── civilen-logo-white.png   (16KB)  - White version for dark backgrounds
    └── patterns/
        ├── book-pattern.png         (50KB)  - Background pattern for book cards
        └── footer-bg.png            (679KB) - Footer background texture
```

## Total Assets: 12 files (~919KB)

## Usage in Components

### Header

- `/images/logo/logo.svg` - Main navigation logo
- `/images/icons/menu-icon.svg` - Mobile menu hamburger icon
- `/images/icons/close-icon.svg` - Mobile menu close icon

### Footer

- `/images/patterns/footer-bg.png` - Background texture
- `/images/icons/email.svg` - Contact email icon
- `/images/icons/location.svg` - Address location icon
- `/images/logo/civilen-logo-white.png` - Footer logo

### BookCard

- `/images/patterns/book-pattern.png` - Card background pattern
- `/images/bookmarks/bookmark-default.svg` - Default bookmark
- `/images/bookmarks/bookmark-hover.svg` - Hover state bookmark

### ArticleCard

- `/images/articles/default-article.jpg` - Default article image

### FeatureCard

- `/images/icons/feature-icon.svg` - Default feature icon

## Notes

✅ All assets are now local - no external dependencies
✅ All images optimized for web
✅ SVG files for icons (scalable and lightweight)
✅ PNG files for logos and patterns
✅ JPG for article preview

## Replacing Default Images

To use custom images in your content:

### For Articles:

```tsx
<ArticleCard
  article={article}
  imageUrl="/your-custom-image.jpg" // Override default
/>
```

### For Features:

```tsx
<FeatureCard
  title="Your Feature"
  count="100+"
  iconUrl="/your-custom-icon.svg" // Override default
/>
```

### For Books:

The book cover comes from your book data:

```tsx
<BookCard
  book={{
    coverImage: "/images/books/your-book-cover.jpg",
    // ... other book data
  }}
/>
```

## Adding New Assets

1. Place new images in the appropriate subdirectory
2. Use relative paths from `/public/`: `/images/category/filename.ext`
3. Next.js Image component will automatically optimize them

## Image Optimization

Next.js automatically optimizes all images:

- Automatic format selection (WebP when supported)
- Responsive image sizes
- Lazy loading by default
- Blur placeholder support

Example with blur placeholder:

```tsx
<Image
  src="/images/logo/civilen-logo.png"
  alt="CivilEn"
  width={120}
  height={38}
  placeholder="blur"
  blurDataURL="data:image/..." // optional
/>
```
