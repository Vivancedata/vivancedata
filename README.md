# VivanceData - AI Solutions for Modern Businesses

![VivanceData](public/images/banner.png)

## Overview

VivanceData is a leading provider of AI solutions that transform businesses through intelligent automation. We combine cutting-edge AI technology with deep industry expertise to deliver solutions that drive real business outcomes. Our website showcases our services, case studies, and expertise in the AI space.

## Key Features

- **Comprehensive AI Solutions**: Presenting our AI services including Generative AI, Strategy Consulting, and more
- **Industry-Specific Solutions**: Tailored AI implementations for Finance, Healthcare, Retail, Manufacturing, etc.
- **Case Studies Showcase**: Real-world examples of successful AI implementations
- **Team Highlights**: Introducing our expert team of AI professionals
- **Client Testimonials**: Success stories from our satisfied clients
- **Interactive Tools**: ROI Calculator, AI Readiness Quiz, and Use Case Explorer
- **Blog with MDX**: Technical blog with reading progress, filters, and related posts
- **Responsive Design**: Fully optimized for all devices
- **Modern UI Components**: Using shadcn/ui and Tailwind CSS for a polished interface
- **Dark/Light Mode**: Theme switching via `next-themes`

## Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| Framework | Next.js (App Router + Turbopack) | ^16.0.1 |
| Language | TypeScript (strict mode) | ^5 |
| Runtime | React | ^19.0.0 |
| Styling | Tailwind CSS | ^3.4.1 |
| UI Components | shadcn/ui (Radix UI primitives) | -- |
| Animation | Framer Motion | ^12.4.7 |
| Forms | React Hook Form + Zod | ^7.52.1 / ^3.23.8 |
| Email | Resend | ^6.7.0 |
| Rate Limiting | Upstash Redis | ^1.36.2 |
| Image Processing | Sharp | ^0.33.4 |
| Observability | Sentry (`@sentry/nextjs`) | ^10.34.0 |
| MDX | `next-mdx-remote` + `@mdx-js/react` | ^6.0.0 / ^3.0.1 |
| Icons | Lucide React | ^0.476.0 |
| Carousel | Embla Carousel React | ^8.1.6 |
| CSS Inlining | Critters | ^0.0.25 |
| Toast | Sonner | ^2.0.7 |
| Unit Testing | Vitest + Testing Library | ^4.0.18 |
| E2E Testing | Playwright | ^1.58.2 |
| Coverage | `@vitest/coverage-v8` | ^4.0.18 |
| Linting | ESLint + `eslint-config-next` | ^9.39.1 |
| Bundle Analysis | `@next/bundle-analyzer` | 16.1.6 |
| AI Development | Model Context Protocol (MCP) + 6 Specialized Agents | -- |
| Deployment | Vercel (recommended) | -- |

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, or bun package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/vivancedata.git
cd vivancedata
```

2. Copy the environment file and fill in your values
```bash
cp .env.example .env.local
```

3. Install dependencies
```bash
npm install
# or
yarn
# or
bun install
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the site

## Environment Variables

Copy `.env.example` to `.env.local` and configure the variables below. Only `RESEND_API_KEY` is required for the contact form to work; all others are optional.

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_APP_URL` | No | Public site URL (default: `http://localhost:3000`) |
| **Email (Resend)** | | |
| `RESEND_API_KEY` | Yes | Resend API key for contact form delivery |
| `CONTACT_FORM_TO_EMAIL` | No | Recipient email (default: `info@vivancedata.com`) |
| `CONTACT_FORM_FROM_EMAIL` | No | Sender email (default: `noreply@vivancedata.com`) |
| **Rate Limiting** | | |
| `UPSTASH_REDIS_REST_URL` | No | Upstash Redis URL for distributed rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | No | Upstash Redis token (falls back to in-memory if unset) |
| **Analytics** | | |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | Google Analytics 4 measurement ID |
| `GOOGLE_TAG_MANAGER_ID` | No | Google Tag Manager container ID |
| **Observability (Sentry)** | | |
| `SENTRY_DSN` | No | Sentry DSN for server-side error tracking |
| `NEXT_PUBLIC_SENTRY_DSN` | No | Sentry DSN for client-side error tracking |
| `SENTRY_ORG` | No | Sentry organization slug |
| `SENTRY_PROJECT` | No | Sentry project slug |
| `SENTRY_AUTH_TOKEN` | No | Auth token for source map uploads in CI |
| `OBSERVABILITY_TEST_TOKEN` | No | Authorizes `POST /api/observability/sentry-test` |
| **MCP (optional)** | | |
| `BRAVE_API_KEY` | No | Brave Search API key for web search capabilities |
| `GITHUB_PERSONAL_ACCESS_TOKEN` | No | GitHub PAT for repository integration |

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with Turbopack on port 3000 |
| `npm run build` | Production build (Webpack, telemetry disabled) |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint across the project |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run type-check` | TypeScript type checking (`tsc --noEmit`) |
| `npm test` | Full release gate: unit + integration + e2e |
| `npm run test:unit` | Vitest unit tests with coverage |
| `npm run test:integration` | Vitest integration tests with coverage |
| `npm run test:coverage` | Unit + integration tests (no e2e) |
| `npm run test:e2e` | Playwright end-to-end tests |
| `npm run react-doctor:ci` | React code health score check |
| `npm run analyze` | Bundle analysis (opens report in browser) |
| `npm run clean` | Remove `.next` and module caches |

## Testing

The project enforces a **95% coverage threshold** on all measured files through three test suites.

### Unit Tests (Vitest + jsdom)

Located in `tests/unit/`. Covers utility modules in `src/lib/`:

- `api.ts` -- API helpers
- `cookieConsent.ts` -- Cookie consent logic
- `formatDate.ts` -- Date formatting utilities
- `utils.ts` -- General utilities (`cn()`, etc.)
- `validation.ts` -- Zod-based input validation

```bash
npm run test:unit

# Run a single test file
npx vitest run tests/unit/utils.test.ts
```

### Integration Tests (Vitest + Node)

Located in `tests/integration/`. Covers filesystem-dependent logic:

- `blogPosts.ts` -- MDX file discovery and metadata extraction at build time

```bash
npm run test:integration
```

### End-to-End Tests (Playwright)

Located in `tests/e2e/`. Smoke tests run against a built production server on port **4317** (not 3000). Playwright automatically builds the app and starts the server unless `PLAYWRIGHT_BASE_URL` is set.

Critical routes tested: `/`, `/contact`, `/blog`, `/tools/roi-calculator`, `/tools/ai-readiness`, `/tools/use-cases`, `/privacy-policy`, `/terms-of-service`.

Coverage threshold: 85% of critical routes must be visited.

```bash
# Full e2e suite (builds the app first)
npm run test:e2e

# Skip build if you already have a running server
PLAYWRIGHT_BASE_URL=http://localhost:3000 npx playwright test
```

### Full Release Gate

```bash
# Runs unit + integration + e2e sequentially
npm test
```

Production release gates are documented in `docs/production-go-live-checklist.md`.

## Project Structure

```
vivancedata/
├── public/                          # Static assets
│   ├── favicon.ico                  # Site favicon
│   ├── manifest.json                # PWA manifest
│   ├── robots.txt                   # Crawler rules
│   ├── icons/                       # App icons
│   └── images/                      # Site images (banner, etc.)
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── layout.tsx               # Root layout (MainNav, Footer, Sentry, ThemeProvider)
│   │   ├── page.tsx                 # Home page
│   │   ├── globals.css              # Global styles + CSS variables
│   │   ├── sitemap.ts               # Dynamic sitemap generation
│   │   ├── robots.ts                # Dynamic robots.txt
│   │   ├── loading.tsx              # Global loading skeleton
│   │   ├── error.tsx                # Global error boundary
│   │   ├── not-found.tsx            # 404 page
│   │   ├── about/                   # About page
│   │   ├── blog/                    # Blog index + MDX posts
│   │   │   ├── page.tsx             # Blog listing page
│   │   │   ├── [slug]/page.tsx      # Dynamic blog post route
│   │   │   └── posts/              # MDX blog content
│   │   ├── career/                  # Careers page
│   │   ├── case-studies/            # Case studies page
│   │   ├── contact/                 # Contact page
│   │   ├── industries/              # Industry solutions hub
│   │   │   ├── page.tsx             # Industries overview
│   │   │   ├── financial-services/  # Finance industry page
│   │   │   ├── healthcare/          # Healthcare industry page
│   │   │   ├── retail/              # Retail industry page
│   │   │   ├── manufacturing/       # Manufacturing industry page
│   │   │   ├── energy/              # Energy industry page
│   │   │   └── public-sector/       # Public sector industry page
│   │   ├── innovation-hub/          # Innovation hub page
│   │   ├── methodology/             # Methodology page
│   │   ├── privacy-policy/          # Privacy policy
│   │   ├── resources/               # Resources page
│   │   ├── responsible-ai/          # Responsible AI page
│   │   ├── services/                # Services hub
│   │   │   ├── page.tsx             # Services overview
│   │   │   ├── consulting/          # Strategy consulting
│   │   │   ├── generative-ai/       # Generative AI services
│   │   │   └── training/            # AI training programs
│   │   ├── terms-of-service/        # Terms of service
│   │   ├── tools/                   # Interactive tools
│   │   │   ├── roi-calculator/      # ROI calculator
│   │   │   ├── ai-readiness/        # AI readiness quiz
│   │   │   └── use-cases/           # Use case explorer
│   │   └── api/                     # API routes
│   │       ├── contact/             # Contact form endpoint (Resend + rate limiting)
│   │       ├── newsletter/          # Newsletter subscription endpoint
│   │       └── observability/       # Sentry test endpoint
│   ├── components/                  # React components
│   │   ├── about/                   # AboutHero, AboutDescription, AboutTeam, AboutValue
│   │   ├── analytics/               # GoogleAnalytics
│   │   ├── blog/                    # Blog, BlogCard, BlogFilters, BlogLayout, Prose, ReadingProgress, RelatedPosts
│   │   ├── common/                  # Animations, Avatar, Breadcrumb, Container, CookieConsent, Heading, Icons, LoadingSkeleton, ModeToggle, MotionProvider, NotFoundContent, Paragraph, Question, ScrollToTop, SearchInput
│   │   ├── contact/                 # Form (React Hook Form + Zod)
│   │   ├── home/                    # Banner, CaseStudies, ClientLogos, ContactSection, CTASection, DemoBooking, FAQSection, Integrations, Overview, Partners, Pricing, Process, ResourcesSection, StatsSection, Team, Testimonials, TrustSection, Welcome
│   │   ├── layout/                  # Footer, Header, MainNav, Newsletter, PageWrapper, ThemeProvider
│   │   ├── services/                # ServicesCases, ServicesHero, ServicesList, ServicesStack
│   │   ├── tools/                   # AIReadinessQuiz, ROICalculator, UseCasesExplorer
│   │   └── ui/                      # shadcn/ui primitives (accordion, alert, alert-dialog, avatar, badge, button, card, carousel, checkbox, command, dialog, dropdown-menu, form, header, input, label, navigation-menu, progress, radio-group, select, skeleton, tabs, textarea, toast, toaster)
│   ├── config/
│   │   └── site.ts                  # Site name, URL, social links
│   ├── constants/                   # Data-driven content (TypeScript objects)
│   │   ├── navigation.ts            # Header dropdowns, footer links, social links
│   │   ├── blog.ts                  # Blog post metadata
│   │   ├── services.ts              # Service definitions
│   │   ├── caseStudies.ts           # Case study data
│   │   ├── team.ts                  # Team member profiles
│   │   ├── testimonials.ts          # Client testimonials
│   │   ├── clients.ts              # Client logos
│   │   ├── partners.ts             # Partner logos
│   │   ├── integrations.ts         # Integration logos (jsDelivr CDN)
│   │   ├── pricing.ts              # Pricing tiers
│   │   ├── faq.ts                  # FAQ entries
│   │   ├── methodology.ts          # Methodology steps
│   │   ├── process.ts              # Process steps
│   │   ├── resources.ts            # Resource links
│   │   ├── trust.ts                # Trust indicators
│   │   ├── useCases.ts             # Use case data
│   │   ├── welcome.ts              # Welcome section content
│   │   └── banner.ts               # Banner content
│   ├── hooks/
│   │   └── useAnimateOnScroll.tsx   # Scroll-driven animation hook
│   ├── lib/                         # Utility functions
│   │   ├── api.ts                   # API helpers
│   │   ├── blogPosts.ts             # MDX file discovery + metadata extraction
│   │   ├── cookieConsent.ts         # Cookie consent management
│   │   ├── formatDate.ts            # Date formatting
│   │   ├── performance.ts           # Performance utilities
│   │   ├── rateLimit.ts             # Upstash Redis rate limiter (fallback: in-memory)
│   │   ├── utils.ts                 # `cn()` helper (clsx + tailwind-merge)
│   │   └── validation.ts            # Zod schemas for input validation
│   └── types/                       # TypeScript type definitions
│       ├── blog.ts                  # Blog post types
│       ├── images.d.ts              # Image module declarations
│       └── nav.ts                   # Navigation types
├── tests/
│   ├── unit/                        # Vitest unit tests (jsdom)
│   ├── integration/                 # Vitest integration tests (node)
│   └── e2e/                         # Playwright smoke tests
├── docs/                            # Internal documentation
│   └── production-go-live-checklist.md
├── sentry.client.config.ts          # Sentry browser configuration
├── sentry.server.config.ts          # Sentry server configuration
├── sentry.edge.config.ts            # Sentry edge runtime configuration
├── next.config.mjs                  # Next.js configuration
├── tailwind.config.ts               # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript configuration
├── vitest.unit.config.ts            # Unit test configuration
├── vitest.integration.config.ts     # Integration test configuration
├── playwright.config.ts             # E2E test configuration
├── postcss.config.js                # PostCSS configuration
└── package.json                     # Dependencies and scripts
```

## Route Map

### Marketing Pages

| Route | Description |
|-------|-------------|
| `/` | Home page -- hero banner, overview, services, case studies, pricing, team, testimonials, FAQ, CTA |
| `/about` | Company overview, values, team, and description |
| `/contact` | Contact form (React Hook Form + Zod + Resend) |
| `/career` | Career opportunities |
| `/case-studies` | AI implementation case studies |
| `/methodology` | Our delivery methodology |
| `/resources` | Downloadable resources and guides |
| `/responsible-ai` | Responsible AI practices and principles |
| `/innovation-hub` | Innovation and research showcase |
| `/privacy-policy` | Privacy policy |
| `/terms-of-service` | Terms of service |

### Services

| Route | Description |
|-------|-------------|
| `/services` | Services overview hub |
| `/services/consulting` | Strategy consulting services |
| `/services/generative-ai` | Generative AI solutions |
| `/services/training` | AI training programs |

### Industries

Each industry page uses a two-file server/client pattern for SEO metadata and client-side animations.

| Route | Description |
|-------|-------------|
| `/industries` | Industries overview hub |
| `/industries/financial-services` | Finance and banking AI solutions |
| `/industries/healthcare` | Healthcare AI solutions |
| `/industries/retail` | Retail and e-commerce AI solutions |
| `/industries/manufacturing` | Manufacturing AI solutions |
| `/industries/energy` | Energy sector AI solutions |
| `/industries/public-sector` | Government and public sector AI solutions |

### Interactive Tools

| Route | Description |
|-------|-------------|
| `/tools/roi-calculator` | Calculate AI implementation ROI |
| `/tools/ai-readiness` | AI readiness assessment quiz |
| `/tools/use-cases` | Use case explorer |

### Blog

| Route | Description |
|-------|-------------|
| `/blog` | Blog index with filters and search |
| `/blog/[slug]` | Individual blog post (dynamic route) |
| `/blog/posts/*` | MDX blog post content |

### API Endpoints

| Route | Method | Description |
|-------|--------|-------------|
| `/api/contact` | POST | Contact form submission (Resend email + rate limiting) |
| `/api/newsletter` | POST | Newsletter subscription |
| `/api/observability/sentry-test` | GET | Sentry configuration status |
| `/api/observability/sentry-test` | POST | Manual Sentry event verification (requires `OBSERVABILITY_TEST_TOKEN`) |

## AI-Powered Development

This project leverages **Model Context Protocol (MCP)** and **specialized AI agents** for enhanced development workflows.

### MCP Setup (8 Servers Configured)

The project includes 8 MCP servers for different capabilities:

- **next-devtools** - Real-time Next.js debugging and error detection
- **sequential-thinking** - Advanced reasoning for complex problem-solving
- **filesystem** - Secure file operations in project directory
- **git** - Version control operations and history
- **memory** - Persistent knowledge graph across sessions
- **brave-search** - Web search for research and current information
- **github** - GitHub repository management
- **fetch** - HTTP requests and API testing

See [MCP_SETUP.md](./MCP_SETUP.md) for detailed setup and usage.

### Specialized AI Agents (6 Configured)

Work with specialized agents for different aspects of development:

1. **content-creator** - AI content strategist for blog posts and case studies
2. **developer** - Full-stack Next.js specialist
3. **qa-tester** - Quality assurance and testing expert
4. **ui-designer** - UI/UX design and component specialist
5. **seo-optimizer** - SEO and search visibility expert
6. **integration-manager** - Third-party services and API specialist

See [AGENTS_GUIDE.md](./AGENTS_GUIDE.md) for agent workflows and examples.

### Quick Start with Agents

```bash
# Using Claude Code or MCP-compatible client

# Invoke specific agent
"Developer: Create a new AI pricing calculator tool"
"Content Creator: Write a blog post about AI ROI"
"QA Tester: Test all API endpoints"

# Multi-agent workflows
"All agents: Launch a new blog post about AI trends"
```

## Performance and SEO

### Image Optimization

- AVIF and WebP format support via `next/image` with Sharp
- Responsive `deviceSizes`: 640, 750, 828, 1080, 1200, 1920, 2048
- 1-year cache TTL for optimized images (`minimumCacheTTL: 31536000`)
- Static asset caching headers for `/fonts/` (immutable, 1 year) and `/images/` (1 day + stale-while-revalidate)

### Security Headers

All responses include the following security headers configured in `next.config.mjs`:

| Header | Value |
|--------|-------|
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `X-XSS-Protection` | `1; mode=block` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |
| `X-Powered-By` | Removed (`poweredByHeader: false`) |

### SEO Features

- Per-page meta titles and descriptions
- JSON-LD structured data for rich search results
- Dynamic `sitemap.ts` and `robots.ts` generation
- Open Graph and Twitter Card metadata in root layout
- `console.log` stripped in production builds (keeps `error` and `warn`)

### Build Optimizations

- Turbopack for development, Webpack for production
- React strict mode enabled
- Gzip compression enabled
- ETag generation for caching
- Package import optimization for `lucide-react`, `framer-motion`, and `@radix-ui/react-icons`
- Scroll restoration enabled
- Critters for critical CSS inlining
- Production source maps disabled for smaller bundles
- Sentry tree-shakes logger statements and hides source maps

## Deployment

### Vercel (Recommended)

The project is optimized for deployment on Vercel:

1. Push the repository to GitHub
2. Import the project in the [Vercel Dashboard](https://vercel.com/new)
3. Configure environment variables in the Vercel project settings (see [Environment Variables](#environment-variables))
4. Deploy -- Vercel auto-detects Next.js and applies optimal settings

Subsequent pushes to `main` trigger production deployments. Pull request branches get preview deployments automatically.

### Manual Deployment

```bash
# Build the production bundle
npm run build

# Start the production server
npm start
```

The production server runs on port 3000 by default. Set the `PORT` environment variable to change it.

### Bundle Analysis

To inspect the production bundle size and identify optimization opportunities:

```bash
npm run analyze
```

This generates an interactive treemap of all bundled modules.

## Adding New Content

### New Page

1. Create `src/app/[page-name]/page.tsx` with metadata export
2. Add navigation entries in `src/constants/navigation.ts` (`navItems` and/or `footerLinks`)

### New Industry Page

1. Create `src/app/industries/[name]/page.tsx` (server component with metadata) and `client.tsx` (client component with animations), mirroring an existing industry such as `healthcare/`
2. Add entries to `navItems` dropdowns and `footerLinks` in `src/constants/navigation.ts`

### New Blog Post

1. Create `src/app/blog/posts/[slug]/page.mdx` with frontmatter
2. Add metadata to `src/constants/blog.ts` -- the slug must match the directory name
3. Verify the post appears at `/blog` and `/blog/[slug]`

> **Pitfall:** Adding a slug to `src/constants/blog.ts` without a corresponding MDX file will create a 404. Always create the file first.

### New shadcn/ui Component

```bash
npx shadcn-ui@latest add [component-name]
```

## Production Ops Notes

- API rate limiting uses Upstash Redis when `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are configured.
- If Upstash credentials are not set, API routes fall back to in-memory rate limiting (acceptable for local/dev only).
- Contact form input is XSS-escaped before embedding in email templates.
- Observability verification endpoint:
  - `GET /api/observability/sentry-test` for configuration status
  - `POST /api/observability/sentry-test` for protected manual event verification (`OBSERVABILITY_TEST_TOKEN` required)
- Sentry tunnel route (`/monitoring`) proxies browser error reports through Next.js to bypass ad blockers.

## Contributing

1. Create a feature branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes following the project conventions:
   - TypeScript strict mode, no `any`
   - 2-space indentation, single quotes, no semicolons
   - Components in PascalCase, utilities in camelCase
   - Use `@/` import alias for all `src/` imports
   - Use semantic Tailwind color tokens (`bg-background`, `text-foreground`), never hardcoded hex
3. Add or update tests to maintain the 95% coverage threshold
4. Run the full check suite:
   ```bash
   npm run lint
   npm run type-check
   npm run test:coverage
   ```
5. Commit using [Conventional Commits](https://www.conventionalcommits.org/) (e.g., `feat:`, `fix:`, `docs:`):
   ```bash
   git commit -m "feat: add new industry page for telecom"
   ```
6. Open a pull request against `main`

## Contact

For any inquiries, please reach out to us through the contact form on the website or email us at info@vivancedata.com.

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.
