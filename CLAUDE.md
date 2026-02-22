# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VivanceData is a Next.js 16 App Router marketing website for an AI consultancy. Content is data-driven (TypeScript constants, not a CMS). Stack: TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, React 19.

## Development Commands

```bash
npm run dev          # Dev server at http://localhost:3000 (Turbopack)
npm run build        # Production build (Webpack, telemetry disabled)
npm run lint         # ESLint
npm run lint:fix     # ESLint with auto-fix
npm run type-check   # tsc --noEmit

# Tests
npm run test:unit        # Vitest unit tests (tests/unit/)
npm run test:integration # Vitest integration tests (tests/integration/)
npm run test:e2e         # Playwright e2e (builds + starts server first)
npm run test             # All three suites

# Single test file
npx vitest run tests/unit/utils.test.ts

# Bundle analysis
npm run analyze
```

E2E tests run against port `4317` (not 3000). The `PLAYWRIGHT_BASE_URL` env var skips the built-in webserver.

## Architecture

### Data-Driven Content

All page content lives in `src/constants/` as typed TypeScript objects. **When adding content, edit the constants file — do not create a CMS or fetch from an external API.**

Key constants files:
- `navigation.ts` — header dropdowns, footer links, social links (update this when adding pages)
- `blog.ts` — blog post metadata list (must stay in sync with MDX files in `src/app/blog/posts/`)
- `clients.ts`, `partners.ts`, `testimonials.ts`, `team.ts` — logo/people data
- `integrations.ts` — integration logos (uses jsDelivr CDN for Simple Icons; not all brands exist in the package)
- `caseStudies.ts`, `services.ts`, `pricing.ts`, `faq.ts`, `welcome.ts`, `banner.ts`, `process.ts`, `methodology.ts`, `resources.ts`, `trust.ts`, `useCases.ts`

### Route Structure

```
src/app/
├── page.tsx                          # Home
├── layout.tsx                        # Root layout — MainNav, Footer, Sentry, ThemeProvider
├── about/, blog/, career/, case-studies/, contact/
├── industries/
│   ├── page.tsx
│   ├── financial-services/, healthcare/, retail/
│   ├── manufacturing/, energy/, public-sector/
├── innovation-hub/, methodology/, resources/, responsible-ai/
├── services/
│   ├── page.tsx
│   ├── consulting/, generative-ai/, training/
├── tools/
│   ├── roi-calculator/, ai-readiness/, use-cases/
└── api/
    ├── contact/route.ts              # Resend email + Upstash rate limiting
    ├── newsletter/route.ts           # Newsletter subscription
    └── observability/               # Sentry test endpoint
```

### Industry Page Pattern

Each industry page follows a two-file pattern — a server component (`page.tsx`) that defines metadata and data, and a client component (`client.tsx`) that handles animations. When adding a new industry:
1. Create `src/app/industries/[name]/page.tsx` + `client.tsx` mirroring an existing industry (e.g. `healthcare/`)
2. Add entries to `navItems` dropdowns and `footerLinks` in `src/constants/navigation.ts`

### Component Organization

Feature-organized, not type-organized:
```
src/components/
├── about/, blog/, contact/, home/, services/, tools/  # Feature-specific
├── common/     # Cross-feature shared components
├── layout/     # MainNav, Footer, PageWrapper, ThemeProvider
└── ui/         # shadcn/ui primitives
```

### Blog System

Two parallel blog systems coexist:
1. **MDX files** — `src/app/blog/posts/[slug]/page.mdx` or `page.tsx`. `src/lib/blogPosts.ts` reads these from the filesystem at build time to generate the blog listing.
2. **Dynamic route** — `src/app/blog/[slug]/page.tsx` renders posts whose metadata is in `src/constants/blog.ts` but have no MDX file (currently none active).

**Pitfall:** Adding a slug to `src/constants/blog.ts` without a corresponding MDX file will create a 404. Always create the file first.

### API Routes

Both API routes use `src/lib/rateLimit.ts` (Upstash Redis) for IP-based rate limiting. The contact route also XSS-escapes all user input before embedding it in the email template.

Required env vars:
- `RESEND_API_KEY` — contact form email delivery
- `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` — rate limiting (if absent, rate limiting is skipped)

### Styling & Theming

- Tailwind with HSL CSS variables for all colors — use `bg-background`, `text-foreground`, `border-border`, etc., never hardcoded hex values
- Light/dark mode via `next-themes`
- `cn()` from `@/lib/utils` for conditional class merging (clsx + tailwind-merge)
- All imports use `@/` alias (maps to `src/`)

### Key Files

- `src/config/site.ts` — site name, URL, social links
- `src/app/layout.tsx` — root metadata (OG, Twitter, robots), Sentry initialization
- `next.config.mjs` — image optimization (AVIF/WebP), security headers, SWC minification, `console.log` stripped in production
- `tailwind.config.ts` — theme token definitions

### Testing Layout

```
tests/
├── unit/           # Vitest + jsdom; covers src/lib utilities
├── integration/    # Vitest + node; covers src/lib/blogPosts.ts filesystem logic
└── e2e/            # Playwright; smoke tests against built production server
```

Unit/integration coverage threshold is 95% for the files listed in each vitest config. Add new `src/lib/` utilities to the appropriate coverage `include` list.

### Observability

Sentry is integrated via `@sentry/nextjs`. The `src/app/api/observability/` route provides a test endpoint. Sentry config lives in `sentry.client.config.ts` / `sentry.server.config.ts` at the root.
