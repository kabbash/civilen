# Responsive Design Implementation

## Overview
The Footer and Header components have been made fully responsive based on the Figma mobile design specifications.

**Figma Design:** [Mobile Footer Design](https://www.figma.com/design/cqBKc3wzIQFzdcVgeiiIdp/CivilEn?node-id=184-2836)

## Breakpoints

We're using Tailwind's default breakpoints:
- **Mobile**: `< 768px` (default, no prefix)
- **Tablet**: `768px - 1023px` (uses mobile layout)
- **Desktop**: `>= 1024px` (lg: prefix)

## Responsive Changes

### 1. **Container Padding**
```tsx
// Before: px-20 (80px on all screens)
// After:  px-4 lg:px-20 (16px mobile/tablet, 80px desktop)
```

### 2. **Main Layout**
```tsx
// Desktop: Horizontal layout (flex-row)
// Mobile & Tablet: Vertical stack (flex-col)

className="flex flex-col lg:flex-row items-start lg:justify-between w-full gap-8 lg:gap-0"
```

### 3. **Newsletter Section**

#### Width
```tsx
// Desktop: Fixed 420px width
// Mobile & Tablet: Full width
w-full lg:w-[420px]
```

#### Padding
```tsx
// Desktop: 16px padding
// Mobile & Tablet: 10px padding
p-2.5 lg:p-4
```

#### Text Size
```tsx
// Desktop: 18px (text-lg)
// Mobile & Tablet: 16px (text-base)
text-base lg:text-lg leading-6 lg:leading-[27px]
```

#### Subscribe Button
```tsx
// Desktop: 24px horizontal padding
// Mobile & Tablet: 10px horizontal padding
className="h-12 px-2.5 lg:px-6 text-base lg:text-lg"
```

### 4. **Links Sections**

#### Font Size
```tsx
// Headings: 16px mobile/tablet → 18px desktop
text-base lg:text-lg leading-6 lg:leading-[27px]

// Body text: Same responsive sizing
text-base lg:text-lg leading-6 lg:leading-[27px]
```

#### Spacing
```tsx
// Desktop: 16px gap
// Mobile & Tablet: 10px gap
gap-2.5 lg:gap-4
```

### 5. **Contact Info Section**

#### Alignment
```tsx
// Desktop: Right-aligned (items-end)
// Mobile & Tablet: Left-aligned (items-start)
items-start lg:items-end
```

#### Width
```tsx
// Desktop: Auto width
// Mobile & Tablet: Full width
w-full lg:w-auto
```

#### Email Text
```tsx
// Desktop: No wrap (whitespace-nowrap)
// Mobile & Tablet: Break on all characters (break-all)
className="... break-all lg:whitespace-nowrap"
```

### 6. **Copyright**
```tsx
// Added text-center for better mobile alignment
text-center
```

## Visual Changes Summary

### Mobile & Tablet (< 1024px)
- **Padding**: 16px sides
- **Layout**: Vertical stack
- **Newsletter**: Full width, 10px padding
- **Font sizes**: 16px body, 24px headings
- **Subscribe button**: Smaller padding
- **Contact info**: Left-aligned, full width
- **Email**: Breaks on long screens

### Desktop (>= 1024px)
- **Padding**: 80px sides
- **Layout**: Horizontal (4 columns)
- **Newsletter**: 420px fixed width, 16px padding
- **Font sizes**: 18px body, 24px headings
- **Subscribe button**: Normal padding
- **Contact info**: Right-aligned, auto width
- **Email**: No wrap

## Testing

Test the responsive design at different viewport widths:

```bash
# Start dev server
npm run dev

# Test at these widths:
# - 375px (Mobile - iPhone SE)
# - 390px (Mobile - iPhone 12/13)
# - 768px (Tablet - iPad) - Uses mobile layout
# - 1024px (Desktop - Small) - Switches to horizontal layout
# - 1440px (Desktop - Large)
```

### Browser DevTools
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl/Cmd + Shift + M)
3. Test different device presets
4. Verify layout changes at 1024px breakpoint
5. Tablets (768px-1023px) should use vertical layout

## Key Features

✅ **Fluid layout** - Adapts from 320px to 1920px+
✅ **Readable text** - Font sizes adjust for device
✅ **Touch-friendly** - Larger tap targets on mobile
✅ **No horizontal scroll** - Content fits viewport
✅ **Optimized spacing** - Appropriate gaps for screen size

## Next Steps

### Components Already Responsive

1. ✅ **Header/Navbar** - Complete with mobile hamburger menu
   - Full-screen mobile menu
   - Large touch-friendly links
   - Desktop horizontal navigation
   - See `HEADER_RESPONSIVE.md` for details

### Other Components to Make Responsive

2. **BookCard**
   - Adjust width: `w-full md:w-[632px]`
   - Stack elements differently on mobile

3. **ArticleCard**
   - Adjust width: `w-full md:w-[416px]`
   - Smaller image on mobile

4. **FeatureCard**
   - Adjust width: `w-full md:w-[416px]`
   - Smaller icon and text

5. **PageHeader**
   - Smaller font: `text-2xl md:text-4xl`
   - Adjust gradient width for mobile

### Suggested Breakpoints

```tsx
// Example: Make BookCard responsive
<div className="w-full sm:w-[400px] md:w-[632px]">
  <BookCard book={book} />
</div>

// Or use grid for automatic layout
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {books.map(book => (
    <BookCard key={book.slug} book={book} />
  ))}
</div>
```

## Common Patterns

### Responsive Text
```tsx
// Mobile/Tablet: 16px, Desktop: 18px
className="text-base lg:text-lg"

// Mobile/Tablet: 24px, Desktop: 36px
className="text-2xl lg:text-4xl"
```

### Responsive Spacing
```tsx
// Mobile/Tablet: 16px, Desktop: 32px
className="gap-4 lg:gap-8"

// Mobile/Tablet: 8px, Desktop: 16px
className="gap-2 lg:gap-4"
```

### Responsive Layout
```tsx
// Mobile/Tablet: Vertical, Desktop: Horizontal
className="flex flex-col lg:flex-row"

// Mobile/Tablet: 1 column, Desktop: 3 columns
className="grid grid-cols-1 lg:grid-cols-3"
```

### Responsive Width
```tsx
// Mobile/Tablet: Full width, Desktop: Fixed
className="w-full lg:w-[420px]"

// Mobile/Tablet: Full width, Desktop: Auto
className="w-full lg:w-auto"
```

### Responsive Padding
```tsx
// Mobile/Tablet: 16px, Desktop: 80px
className="px-4 lg:px-20"

// Mobile/Tablet: 8px, Desktop: 32px
className="p-2 lg:p-8"
```

## Tailwind Breakpoint Reference

```tsx
sm:  // >= 640px  (Large phones)
md:  // >= 768px  (Tablets)
lg:  // >= 1024px (Small laptops)
xl:  // >= 1280px (Desktops)
2xl: // >= 1536px (Large desktops)
```

## Mobile-First Approach

We're using a **mobile-first** approach:
1. Default styles are for mobile & tablet (< 1024px)
2. Add `lg:` prefix for desktop overrides (>= 1024px)
3. This ensures good mobile and tablet experience

```tsx
// ✅ Good: Mobile-first
className="px-4 lg:px-20"

// ❌ Bad: Desktop-first (don't do this)
className="px-20 lg:px-4"
```

## Why lg: instead of md:?

The 4-column horizontal layout needs ~1024px minimum width to display properly. Using `lg:` (1024px) instead of `md:` (768px) means:
- ✅ Tablets (768px-1023px) get the mobile vertical layout
- ✅ No cramped or broken layout on iPad/tablet devices
- ✅ Desktop (1024px+) gets the full horizontal layout

---

✅ **Footer is now fully responsive!**

Test it by resizing your browser or using DevTools device emulation.

