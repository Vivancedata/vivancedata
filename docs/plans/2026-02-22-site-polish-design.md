# Site Polish & Completion Design
**Date:** 2026-02-22
**Status:** Approved

## Overview

Three-wave parallel execution plan to fix bugs, fill content gaps, and ship to production.

## Wave 1 — Bug Fixes (parallel)

### 1a. Integration Logo Slugs
**File:** `src/constants/integrations.ts`
Fix 4 broken jsDelivr slugs that fall back to letter initials:
- AWS: `amazonaws` → verify correct slug
- Azure: `microsoftazure` → verify correct slug
- Microsoft Dynamics: `dynamics365` → verify correct slug
- Cohere: `cohere` → verify correct slug

### 1b. Remove Dead "Read Full Case Study" Buttons
**File:** `src/app/case-studies/page.tsx`
Remove the `<Button>Read Full Case Study</Button>` elements — no individual case study pages exist and none are planned yet.

### 1c. Remove 404 Blog Posts from Constants
**File:** `src/constants/blog.ts`
Remove `ai-ethics-guide` and `ai-customer-service` entries — no MDX files exist for these slugs, causing 404s when clicked from the blog listing.

## Wave 2 — Industry Sub-Pages (parallel, 5 pages)

**Pattern:** Follow `/industries/financial-services` exactly.
**Files to create:**
- `src/app/industries/healthcare/page.tsx`
- `src/app/industries/retail/page.tsx`
- `src/app/industries/manufacturing/page.tsx`
- `src/app/industries/energy/page.tsx`
- `src/app/industries/public-sector/page.tsx`

**Wire up:** Update `src/constants/navigation.ts` and any industry card links on the `/industries` page to point to the new routes.

Each page includes:
- Hero section with industry-specific headline
- Key challenges section (3-4 bullets)
- How VivanceData helps section
- Relevant use cases
- CTA → `/contact`

## Wave 3 — Audit + Deploy

### 3a. Lighthouse Performance Audit
Run against home, blog listing, and contact pages. Fix any critical (red) issues — focus on LCP, CLS, and accessibility score.

### 3b. Deploy to Vercel
Push production build. Verify all routes resolve, no broken images, forms submit correctly.

## Success Criteria
- [ ] All 20 integration logos render actual SVGs (no letter fallbacks)
- [ ] No dead buttons or 404 links in the site
- [ ] 5 new industry pages live and linked
- [ ] Lighthouse scores: Performance ≥ 85, Accessibility ≥ 90 on home page
- [ ] Site deployed and live on Vercel
