# VivanceData - Product Requirements Document

This document outlines the current state of the VivanceData website, identified issues, and requirements for completion.

## Executive Summary

The VivanceData marketing website is a Next.js 16 application showcasing AI consulting services. While the site has a solid foundation with good architecture and design patterns, there are several critical bugs preventing production deployment and missing integrations that need to be completed.

---

## Critical Issues (P0 - Blocking Production)

### 1. ~~Build Failure - Missing Component Import~~ FIXED

**Status**: ~~Build fails with 2 errors~~ RESOLVED

**Issue**: Case sensitivity mismatch in component imports.

**Solution Applied**: Renamed `question.tsx` to `Question.tsx` and removed duplicate lowercase component files (`welcome.tsx`, `banner.tsx`, `overview.tsx`, `icons.tsx`).

---

### 2. ~~ESLint Configuration Broken~~ FIXED

**Status**: ~~`npm run lint` fails~~ RESOLVED

**Solution Applied**: Created new `eslint.config.mjs` with ESLint 9 flat config format. Updated lint command to use `eslint .` directly. Installed required ESLint plugins.

---

### 3. ~~Contact Page Shows Wrong Content~~ FIXED

**Status**: ~~Bug - Displays Career content~~ RESOLVED

**Solution Applied**: Completely rewrote contact page with proper layout including contact information sidebar, business hours, and professional contact form framing.

---

## High Priority Issues (P1 - Required for Launch)

### 4. ~~API Routes Not Functional~~ FIXED

**Status**: ~~Contact form FIXED, Newsletter still pending~~ BOTH RESOLVED

#### Contact Form API (`/api/contact`) - FIXED
- Implemented Resend email integration
- Sends notification email to admin with formatted HTML
- Sends confirmation email to user
- Gracefully handles missing API key (logs in development)

#### Newsletter API (`/api/newsletter`) - FIXED
- Implemented dual-provider support (ConvertKit + Mailchimp)
- Tries ConvertKit first, falls back to Mailchimp
- Handles "already subscribed" gracefully
- Supports optional firstName field
- Gracefully handles missing credentials (logs in development)

---

### 5. ~~Career Page Placeholder Content~~ FIXED

**Status**: ~~Incomplete~~ RESOLVED

**Solution Applied**: Rewrote career page with:
- "Why Work With Us" benefits section
- Professional "No Open Positions" state with email contact
- CTA to contact page for project inquiries

---

### 6. ~~Static Sitemap Missing Pages~~ FIXED

**Status**: ~~Incomplete~~ RESOLVED

**Solution Applied**:
- Created dynamic sitemap generator at `src/app/sitemap.ts`
- Automatically discovers blog posts from MDX files
- Includes all pages: services, industries, tools, etc.
- Removed static `public/sitemap.xml`

---

### 7. ~~Case Sensitivity Issues in Components~~ FIXED

**Status**: ~~Potential issues~~ RESOLVED

**Solution Applied**: Removed duplicate lowercase files:
- `question.tsx` → kept `Question.tsx`
- `icons.tsx` → kept `Icons.tsx`
- `welcome.tsx`, `banner.tsx`, `overview.tsx` → removed duplicates

---

## Medium Priority Issues (P2 - Should Have)

### 8. ~~Blog Content Mismatch~~ FIXED

**Status**: ~~Content inconsistency~~ RESOLVED

**Solution Applied**: Updated `src/constants/blog.ts` to only include posts with existing MDX files:
- `future-of-generative-ai`
- `ai-implementation-guide`
- `ai-roi-business-case`
- `data-preparation-for-ai`
- `ai-ethics-guide`
- `ai-customer-service`

Removed non-existent posts from constants.

---

### 9. ~~Missing Analytics Integration~~ FIXED

**Status**: ~~Not implemented~~ RESOLVED

**Solution Applied**:
- Created `src/components/analytics/GoogleAnalytics.tsx` component
- Added to root layout
- Configurable via `NEXT_PUBLIC_GA_MEASUREMENT_ID` environment variable
- Includes helper functions for event tracking
- Only loads in production when configured

---

### 10. ~~Missing Error Tracking~~ FIXED

**Status**: ~~Not implemented~~ RESOLVED

**Solution Applied**:
- Installed `@sentry/nextjs` package
- Created Sentry configuration files:
  - `sentry.client.config.ts`
  - `sentry.server.config.ts`
  - `sentry.edge.config.ts`
  - `src/instrumentation.ts`
- Updated `next.config.mjs` with Sentry webpack plugin
- Configurable via environment variables (SENTRY_DSN, etc.)
- Only enabled in production

---

### 11. ~~Resources Page Missing~~ FIXED

**Status**: ~~Navigation references non-existent page~~ RESOLVED

**Solution Applied**: Created `/resources` page with:
- Grid layout showcasing all resources (Blog, ROI Calculator, AI Readiness, Innovation Hub, Responsible AI)
- Professional cards with icons and descriptions
- Proper metadata for SEO
- Added to sitemap

---

## Low Priority Issues (P3 - Nice to Have)

### 12. Search Functionality

**Status**: Not implemented

**Requirements**:
- Add blog search functionality
- Consider global site search

---

### 13. Newsletter Double Opt-in

**Status**: Not implemented

**Requirements**:
- Implement email confirmation flow
- Send verification email before subscription

---

### 14. Loading States & Skeletons

**Status**: Partially implemented

**Requirements**:
- Add loading skeletons to blog listing
- Add loading states to tool calculators

---

### 15. Image Optimization

**Status**: Could be improved

**Requirements**:
- Add proper `alt` text to all images
- Ensure all above-fold images use `priority` prop
- Add placeholder blur images

---

## Feature Requests / Backlog

### New Features to Consider

1. **Blog Categories Page** - `/blog/category/[category]`
2. **Blog Tags Page** - `/blog/tag/[tag]`
3. **Author Pages** - `/blog/author/[name]`
4. **Services Individual Pages** - Expand services content
5. **More Industry Pages** - Healthcare, Retail, Manufacturing
6. **Client Portal** - Protected area for clients
7. **Chatbot Widget** - AI-powered customer support
8. **Webinar/Events Section** - Upcoming AI workshops
9. **Resource Downloads** - Whitepapers, guides (gated content)
10. **Case Study Detail Pages** - Expandable case studies

---

## Technical Debt

### Code Quality
- [ ] Fix all ESLint warnings
- [ ] Add unit tests for components
- [ ] Add E2E tests for critical flows (contact form, tools)
- [ ] Add TypeScript strict mode compliance

### Performance
- [ ] Audit Core Web Vitals
- [ ] Implement ISR for blog posts
- [ ] Add caching headers optimization
- [ ] Bundle size analysis and optimization

### Security
- [ ] Add rate limiting to API routes
- [ ] Implement CSRF protection
- [ ] Add Content Security Policy headers
- [ ] Security audit of form inputs

### Accessibility
- [ ] WCAG 2.1 AA compliance audit
- [ ] Screen reader testing
- [ ] Keyboard navigation testing
- [ ] Color contrast verification

---

## Environment Variables Required

### Production Required
```env
RESEND_API_KEY=           # For contact form emails
CONTACT_FORM_TO_EMAIL=    # Recipient for contact form
CONTACT_FORM_FROM_EMAIL=  # Sender address for contact form
```

### Optional Integrations
```env
# Newsletter
CONVERTKIT_API_KEY=
CONVERTKIT_FORM_ID=

# Analytics
GOOGLE_ANALYTICS_ID=

# Error Tracking
SENTRY_DSN=
```

---

## Recommended Priority Order

### Week 1 - Critical Fixes
1. Fix `Question` component case sensitivity (P0)
2. Fix ESLint configuration (P0)
3. Fix contact page content bug (P0)
4. Implement contact form email integration (P1)

### Week 2 - Launch Readiness
5. Update sitemap with all pages (P1)
6. Fix blog content mismatch (P2)
7. Implement newsletter integration (P1)
8. Fix/complete career page (P1)

### Week 3 - Polish
9. Add analytics integration (P2)
10. Add error tracking (P2)
11. Fix remaining case sensitivity issues (P1)
12. Accessibility audit and fixes (P2)

### Post-Launch
13. Search functionality (P3)
14. Additional blog features (P3)
15. Performance optimization (P3)
16. New feature development (Backlog)

---

## Success Metrics

### Launch Criteria
- [ ] Build completes without errors
- [ ] All pages render correctly
- [ ] Contact form sends emails
- [ ] Newsletter subscription works
- [ ] All navigation links work
- [ ] Lighthouse performance score > 90
- [ ] No critical accessibility issues

### Post-Launch KPIs
- Contact form submissions per week
- Newsletter subscription rate
- Blog engagement metrics
- Tool usage (ROI Calculator, AI Readiness)
- Page load times
- Error rate < 0.1%

---

*Document generated: January 2026*
*Next review: Before production deployment*
