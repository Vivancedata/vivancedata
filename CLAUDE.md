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
- `clients.ts`, `team.ts` — logo/people data. There is deliberately
  no `testimonials.ts`: the practice has no clients who have agreed to be quoted,
  and the file that used to exist held four invented quotes. Do not re-add a
  testimonial, a client logo, or a named case study until a real client has
  agreed in writing to that specific wording.
- `integrations.ts` — integration logos (uses jsDelivr CDN for Simple Icons; not all brands exist in the package)
- `caseStudies.ts`, `services.ts`, `pricing.ts`, `faq.ts`, `welcome.ts`, `process.ts`, `methodology.ts`, `resources.ts`, `trust.ts`, `useCases.ts`

### Route Structure

```
src/app/
├── page.tsx                          # Home
├── layout.tsx                        # Root layout — MainNav, Footer, Sentry, ThemeProvider
├── about/, blog/, career/, case-studies/, contact/
├── industries/
│   ├── page.tsx
│   ├── construction/, hvac-trades/
│   ├── logistics/, manufacturing/
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

**One shared client component, not one per industry.** `src/components/industries/IndustryPage.tsx`
renders every industry page from an `IndustryPageConfig` object. Each industry is a
single server component (`page.tsx`) holding metadata plus that config — there is
no per-industry `client.tsx`, and adding one re-introduces the ~355-line
duplication this replaced.

To add an industry:
1. Create `src/app/industries/[slug]/page.tsx` mirroring an existing one (e.g. `construction/`)
2. Add entries to `navItems` dropdowns and `footerLinks` in `src/constants/navigation.ts`

Populate `process[].checks` — the phase descriptions are slogans without them.

**Scope:** the site targets blue-collar and local services only — construction,
HVAC/trades, logistics, manufacturing. Financial services, healthcare, retail,
energy and public sector were removed deliberately; their paths 308 to
`/industries` via `redirects()` in `next.config.mjs`. Do not re-add an
enterprise vertical without revisiting that positioning decision.

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

**There is one blog system, and the filesystem is its source of truth.** Posts
live at `src/app/blog/posts/[slug]/page.mdx` (or `page.tsx`), and
`src/lib/blogPosts.ts` reads their frontmatter at build time —
`getBlogSlugs`, `findBlogPostPath`, `getAllBlogPosts`. Both the listing
(`src/app/blog/page.tsx`) and the dynamic route (`src/app/blog/[slug]/page.tsx`,
whose `generateStaticParams` enumerates the same slugs) go through it. Adding
a post means adding the file; nothing else needs updating.

This used to be described as two parallel systems kept in sync by hand, with
`src/constants/blog.ts` as a second metadata list and a documented 404 pitfall
if the two drifted. That file had no importers and the pitfall could not
happen; it was deleted rather than kept as a trap for the next reader.

### API Routes

All three routes use `src/lib/rateLimit.ts` (Upstash Redis) for IP-based rate limiting.

`src/lib/email.ts` is the one module that knows how this site sends email: the
`emailAddress` field (trim, lowercase, 254 cap), `escapeHtml`, the team inbox,
and `sendCritical`/`sendCourtesy`. Templates live in `src/emails/`; routes
parse, build, send and respond, and no HTTP type crosses into `src/lib`.
`newsletter` delivers through ConvertKit or Mailchimp rather than Resend, so it
shares only the address field and the dry-run decision.

**A send whose failure the caller must not swallow is `sendCritical`; one it
must not fail the request over is `sendCourtesy`.** Resend resolves with
`{ data, error }` instead of rejecting, so an unchecked send reports success
while nothing arrives. Do not call `resend.emails.send` from a route.

**Never report success for an email that was not sent.** Reporting success
without sending requires `EMAIL_DRY_RUN=1` and nothing else — in particular
not `NODE_ENV`. That inference is how the original bug happened: the
non-production path logged the submission and returned success, `next.config`
strips `console.log` from production builds, and a prospect saw "we will get
back to you soon" while their message was destroyed. Unconfigured without the
flag is a 503, in every environment.

Required env vars:
- `RESEND_API_KEY` — contact form and tool-report email delivery
- `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` — rate limiting (if absent, rate limiting is skipped)
- `CONTACT_FORM_TO_EMAIL` / `CONTACT_FORM_FROM_EMAIL` — optional; default to `info@` and `noreply@vivancedata.com`
- `EMAIL_DRY_RUN=1` — local only; report success without sending

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

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
