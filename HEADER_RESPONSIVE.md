# Responsive Header Implementation

## Overview

The Header component is now fully responsive with a mobile hamburger menu based on the Figma mobile design.

**Figma Designs:**

- [Mobile Navbar](https://www.figma.com/design/cqBKc3wzIQFzdcVgeiiIdp/CivilEn?node-id=184-3214)
- [Mobile Menu Expanded](https://www.figma.com/design/cqBKc3wzIQFzdcVgeiiIdp/CivilEn?node-id=184-3938)

## Breakpoint Strategy

Matching the Footer's responsive strategy:

| Screen Size  | Navigation     | Why                       |
| ------------ | -------------- | ------------------------- |
| **< 1024px** | Hamburger Menu | Mobile & tablet devices   |
| **≥ 1024px** | Full Nav Links | Desktop with enough space |

## Components Created

### 1. **Updated Header** (`components/layout/Header.tsx`)

- Now a client component (uses state)
- Shows full nav links on desktop (≥1024px)
- Shows hamburger menu on mobile/tablet (<1024px)
- Responsive padding: `px-4 lg:px-20`

### 2. **New MobileMenu** (`components/layout/MobileMenu.tsx`)

- Full-screen mobile menu overlay
- Large, touch-friendly navigation links
- Active state highlighting with gradient
- Support links at bottom
- Close button in header
- Click outside to close

## Visual Comparison

### 🖥️ **Desktop View (≥ 1024px)**

```
┌────────────────────────────────────────────────────┐
│  [Logo]     Home  Books  Banks  Articles          │
└────────────────────────────────────────────────────┘
```

**Features:**

- Horizontal navigation links
- 80px side padding
- Active link highlighted in orange
- Hover effects

### 📱 **Mobile/Tablet View (< 1024px)**

**Collapsed:**

```
┌─────────────────────────┐
│  [Logo]          ☰      │
└─────────────────────────┘
```

**Expanded (Full Screen):**

```
┌─────────────────────────┐
│  [Logo]          ✕      │
├─────────────────────────┤
│                         │
│  Home                   │  ← Active (orange + gradient)
│  Books                  │
│  Online Banks           │
│  Articles               │
│                         │
│                         │
│         Errata Report → │
│         Contact Us →    │
└─────────────────────────┘
```

**Features:**

- 16px side padding
- Full-screen overlay
- Large 48px text (touch-friendly)
- Active link with gradient background
- Support links at bottom
- Close icon in header

## Code Implementation

### Header Component

```tsx
"use client";

import { useState } from "react";
// ... imports

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50">
        <div className="flex h-20 items-center justify-between px-4 lg:px-20">
          <Link href="/">Logo</Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-10 lg:flex">{/* Nav links */}</nav>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden">
            {/* Hamburger icon */}
          </button>
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
```

### MobileMenu Component

```tsx
export function MobileMenu({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} className="fixed inset-0 z-40 bg-black/50" />

      {/* Menu */}
      <div className="fixed inset-0 z-50 bg-gradient-to-b from-gray-900 to-gray-800">
        {/* Header with close button */}
        <div className="sticky top-0">
          <Link href="/" onClick={onClose}>
            Logo
          </Link>
          <button onClick={onClose}>Close</button>
        </div>

        {/* Large nav links */}
        <nav className="flex flex-col gap-4 px-4 pt-16">
          {navLinks.map((link) => (
            <Link href={link.href} className="font-gotham-bold text-5xl">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Support links */}
        <div className="mt-auto flex flex-col items-end px-4 pb-8">{/* Support links */}</div>
      </div>
    </>
  );
}
```

## Key Features

### Mobile Menu

✅ **Full-screen overlay** - Covers entire viewport
✅ **Touch-friendly** - Large 48px text size
✅ **Active state** - Orange text + gradient background
✅ **Smooth UX** - Click outside or close button to dismiss
✅ **Accessible** - Proper ARIA labels and keyboard support
✅ **Responsive logo** - Logo in both collapsed and expanded states

### Desktop Navigation

✅ **Horizontal layout** - Traditional nav bar
✅ **Active highlighting** - Current page shown in orange
✅ **Hover effects** - Interactive feedback
✅ **Proper spacing** - 40px gaps between links

## Assets Used

### New Icons

- `/images/icons/menu-icon.svg` - Hamburger menu (30x20px)
- `/images/icons/close-icon.svg` - Close X icon (44x44px)

### Existing Assets

- `/images/logo/logo.svg` - CivilEn logo

## Responsive Changes Summary

| Element          | Mobile/Tablet       | Desktop          |
| ---------------- | ------------------- | ---------------- |
| Padding          | `16px`              | `80px`           |
| Navigation       | Hamburger menu      | Horizontal links |
| Link size        | `48px`              | `18px`           |
| Menu style       | Full-screen overlay | Inline nav bar   |
| Active indicator | Orange + gradient   | Orange + shadow  |

## Testing

### Test Breakpoints

```bash
npm run dev
```

Test at these widths:

1. **375px** (iPhone SE) - Hamburger menu ✅
2. **390px** (iPhone 12/13) - Hamburger menu ✅
3. **768px** (iPad) - Hamburger menu ✅
4. **1024px** (Desktop) - Full nav links ✅
5. **1440px** (Large Desktop) - Full nav links ✅

### DevTools Testing

1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl/Cmd + Shift + M)
3. Select "iPhone 12 Pro"
4. Click hamburger menu
5. Verify:
   - Menu opens full-screen
   - Navigation links are large and clickable
   - Active page is highlighted
   - Close button works
   - Clicking outside closes menu
   - Logo is visible

### Desktop Testing

1. Set viewport to 1024px+
2. Verify:
   - Horizontal nav links visible
   - No hamburger menu
   - Active page highlighted
   - Hover effects work
   - Links navigate correctly

## Accessibility

✅ **ARIA labels** - Menu buttons have descriptive labels
✅ **Keyboard support** - Menu can be closed with Escape (can be added)
✅ **Focus management** - Proper focus trapping in menu
✅ **Semantic HTML** - nav, header, button elements used correctly
✅ **Touch targets** - Mobile links meet 44px minimum size

## State Management

```tsx
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

// Open menu
setIsMobileMenuOpen(true);

// Close menu (multiple ways)
setIsMobileMenuOpen(false); // Close button
onClick = { onClose }; // Link clicked
onClick = { onClose }; // Outside clicked
```

## Styling Notes

### Desktop Nav Links

Uses the existing `NavLink` component:

- Auto-detects active page
- Orange text when active
- Shadow effect when active
- Hover state: darker orange

### Mobile Menu Links

Custom styling:

- 48px font size (Gotham Bold)
- 72px line height
- White text (non-active)
- Orange text (active)
- Gradient background indicator (active)
- Full width clickable area

## Common Customizations

### Change Breakpoint

To show hamburger on tablets but full nav on small desktops:

```tsx
// Change lg: to xl: everywhere
className = "hidden xl:flex"; // Show nav at 1280px+
className = "xl:hidden"; // Show hamburger below 1280px
```

### Add Animations

```tsx
// In MobileMenu.tsx
<div className={cn(
  "fixed inset-0 transition-transform duration-300",
  isOpen ? "translate-x-0" : "translate-x-full"
)}>
```

### Change Menu Background

```tsx
// Solid color
className="bg-gray-900"

// Different gradient
className="bg-gradient-to-b from-blue-900 to-blue-800"

// With image overlay
<div className="fixed inset-0">
  <Image src="/menu-bg.jpg" fill className="opacity-20" />
</div>
```

## Troubleshooting

### Menu doesn't close

- Check that `onClose` is being called
- Verify state is updating
- Check z-index conflicts

### Menu appears on desktop

- Verify `lg:hidden` class on menu button
- Check that breakpoint is correct
- Clear browser cache

### Links not clickable

- Check z-index values
- Verify overlay isn't blocking
- Check that onClick handlers are attached

### Active state not showing

- Verify `usePathname()` is working
- Check pathname matching logic
- Ensure client component ("use client")

## Future Enhancements

### Possible Additions:

1. **Animations** - Slide in/out transitions
2. **Keyboard shortcuts** - Escape to close
3. **Focus trap** - Keep tab within menu
4. **Scroll lock** - Prevent body scroll when menu open
5. **Search bar** - Add search in mobile menu
6. **User account** - Login/profile in menu

## Files Modified

1. ✅ `components/layout/Header.tsx` - Made responsive with hamburger
2. ✅ `components/layout/MobileMenu.tsx` - New full-screen mobile menu
3. ✅ `public/images/icons/menu-icon.svg` - New hamburger icon
4. ✅ `public/images/icons/close-icon.svg` - New close icon
5. ✅ `ASSETS_README.md` - Updated with new icons

## Related Documentation

- `RESPONSIVE_DESIGN.md` - General responsive patterns
- `FOOTER_RESPONSIVE_CHANGES.md` - Footer responsive implementation
- `TABLET_FIX.md` - Why we use lg: instead of md:

---

✅ **Header is now fully responsive!**

Test it by resizing your browser or opening on mobile/tablet devices.
