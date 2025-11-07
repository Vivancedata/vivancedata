# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VivanceData is a Next.js 13+ App Router-based marketing website showcasing AI solutions for businesses. The site uses TypeScript, Tailwind CSS, shadcn/ui components, and Framer Motion for animations.

## Development Commands

```bash
# Development
npm run dev          # Start dev server at http://localhost:3000

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint

# Adding shadcn/ui components
npx shadcn-ui@latest add [component-name]
```

## Architecture

### Data-Driven Content Model

All page content is centralized in `src/constants/` as TypeScript objects, not in a CMS:

- **Pattern**: Each constant file exports a typed interface and data array
- **Files**: `banner.ts`, `blog.ts`, `caseStudies.ts`, `faq.ts`, `navigation.ts`, `partners.ts`, `pricing.ts`, `services.ts`, `process.ts`, `team.ts`, `testimonials.ts`, `welcome.ts`
- **Usage**: Components import and render this data

Example structure:
```typescript
// src/constants/services.ts
export interface Service {
  id: string;
  title: string;
  // ... other fields
}

export const services: Service[] = [
  { id: "generative-ai", title: "...", ... }
];
```

**When adding content**: Edit the appropriate constants file, don't create new content management systems.

### App Router Structure

Routes are defined in `src/app/` using Next.js 13+ App Router:

```
src/app/
├── page.tsx                           # Home page
├── layout.tsx                         # Root layout (MainNav + Footer)
├── about/page.tsx
├── blog/
│   ├── page.tsx                      # Blog listing
│   ├── [slug]/page.tsx               # Dynamic blog post
│   └── posts/ai-ethics-guide/page.tsx
├── case-studies/page.tsx
├── contact/page.tsx
├── industries/
│   ├── page.tsx
│   └── financial-services/page.tsx
└── services/
    ├── page.tsx
    ├── consulting/page.tsx
    ├── generative-ai/page.tsx
    └── training/page.tsx
```

### Component Organization

Components are organized by feature area, not by type:

```
src/components/
├── about/          # About page specific components
├── blog/           # Blog page specific components
├── common/         # Shared components used across features
├── contact/        # Contact page specific components
├── home/           # Home page sections (banner, CTASection, FAQSection, etc.)
├── layout/         # Layout components (MainNav, Footer, PageWrapper, ThemeProvider)
├── services/       # Services page specific components
└── ui/             # shadcn/ui primitives (button, card, dialog, etc.)
```

**When creating components**: Place them in the appropriate feature directory, not in a generic "components" folder.

### Navigation Configuration

Navigation is centrally managed in `src/constants/navigation.ts`:

- `navItems[]` - Full navigation with dropdown menus
- `mainNavItems[]` - Simplified main navigation
- `footerLinks[]` - Footer link sections
- `socialLinks[]` - Social media links

**When adding pages**: Update `navigation.ts` to add links to the navigation menus.

### TypeScript Configuration

- Path alias: `@/*` maps to `src/*`
- Strict mode enabled
- All imports use the `@/` alias, not relative paths

Example: `import { Button } from "@/components/ui/button"` (not `../ui/button`)

### Styling

- **Tailwind CSS** with CSS variables for theming
- **Theme system**: Light/dark mode via `next-themes`
- **Color tokens**: Defined in `tailwind.config.ts` and `globals.css` as HSL CSS variables
- **Component styling**: Uses `cn()` utility from `@/lib/utils` for conditional classes
- **shadcn/ui**: Components use Radix UI primitives with Tailwind styling

Color system example:
```tsx
<div className="bg-background text-foreground border-border">
  <Button variant="default">Uses primary colors</Button>
</div>
```

### Performance & SEO

The site is heavily optimized in `next.config.mjs`:

- **Images**: AVIF/WebP formats, multiple device sizes, remote patterns enabled
- **Security headers**: X-Content-Type-Options, X-Frame-Options, CSP, etc.
- **Caching**: Font caching (1 year), image caching (1 day with stale-while-revalidate)
- **Optimization**: SWC minification, console.log removal in production
- **Font loading**: Inter font with swap display, fallbacks, and font adjustment

SEO features in `src/app/layout.tsx`:
- OpenGraph and Twitter card metadata
- Structured data ready (add JSON-LD in individual pages)
- Robots meta tags
- Canonical URLs via `metadataBase`

## Key Files

- `src/app/layout.tsx` - Root layout with navigation, theme provider, and SEO metadata
- `src/components/layout/MainNav.tsx` - Main navigation component
- `src/constants/navigation.ts` - Navigation structure and links
- `next.config.mjs` - Next.js configuration with optimization settings
- `tailwind.config.ts` - Tailwind configuration with theme tokens
- `src/lib/utils.ts` - Utility function `cn()` for merging Tailwind classes

## Common Patterns

### Adding a New Page

1. Create route file: `src/app/[route]/page.tsx`
2. Add metadata export for SEO
3. Create feature components in `src/components/[feature]/`
4. Add page link to `src/constants/navigation.ts`
5. If the page needs data, add to appropriate constants file or create new one

### Adding New Content Section

1. Define TypeScript interface in constants file
2. Export typed data array
3. Create component in appropriate feature folder
4. Import and render data in component

### Working with Images

```typescript
import Image from "next/image";
import myImage from "@/public/images/my-image.png";

<Image
  src={myImage}
  alt="Description"
  className="..."
  priority={false} // Set true for above-fold images
/>
```

Images are automatically optimized per `next.config.mjs` settings.

## Blog System

Blog posts can be:
1. Static MDX files in `src/app/blog/posts/[post-name]/page.tsx`
2. Dynamic routes via `src/app/blog/[slug]/page.tsx`

Blog metadata interface in `src/types/blog.ts`:
```typescript
interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string;
  tags: string[];
  content?: string;
}
```

Blog post list in `src/constants/blog.ts`.

## File Naming Conventions

- React components: PascalCase (e.g., `MainNav.tsx`, `CTASection.tsx`)
- Utility files: camelCase (e.g., `utils.ts`, `formatDate.ts`)
- Constants files: camelCase (e.g., `navigation.ts`, `caseStudies.ts`)
- Type files: camelCase (e.g., `blog.ts`, `nav.ts`)

Recent case sensitivity fixes were applied - ensure consistent casing in file references.

## Important Notes

- The site is primarily static with data in constants - it's not connected to a CMS
- All routes are file-based using App Router conventions
- Components are feature-organized, not type-organized
- Always use `@/` path alias for imports
- Theme colors use CSS variables - reference design tokens, not hardcoded colors
- Navigation structure is centralized in one file for easy maintenance
