# Production Go-Live Checklist

This checklist is intentionally strict. A release should not be marked production-ready until every `Release Blocker` item passes.

## Release Blockers

| Gate | Pass Criteria | Verification Command / Check | Current Status |
|---|---|---|---|
| Build reliability | Production build succeeds in CI and local release pipeline | `npm run build` | Pass |
| Static quality | Lint + typecheck pass with no errors | `npm run lint && npm run type-check` | Pass |
| Unit coverage | Unit test coverage >= 85% lines/branches/functions/statements | `npm run test:unit` + coverage report | Pass |
| Integration coverage | Integration test coverage >= 85% on critical flows | `npm run test:integration` + coverage report | Pass |
| E2E baseline | Critical user journeys pass (home, contact, blog, tools) | `npm run test:e2e` | Pass |
| Content credibility | No placeholder or unverifiable trust claims | Manual review of `team`, `testimonials`, `case studies`, `contact` | In progress |
| Blog publishing integrity | Same post discovery logic for list, slug page, sitemap | Code review + tests in `tests/integration/blogPosts.test.ts` | Pass |
| Privacy/compliance | Analytics scripts load only after explicit consent | Manual test + code review | Pass (code-level) |
| Security baseline | No high/critical runtime vulnerabilities without explicit exception | `npm audit --omit=dev` | Pass |
| Observability | Error tracking configured and tested in production env | Verify Sentry DSN + test event | In progress |
| Production smoke monitoring | Hourly checks across critical URLs and contact API behavior | GitHub Actions: `Production Smoke Checks` | Pass |

## Go-Live Sequence (Do in Order)

1. Stabilize build + CI
2. Lock quality gates (`lint`, `type-check`, tests)
3. Close coverage gap to >=85% (unit/integration/e2e)
4. Complete content/credibility review
5. Complete privacy/security review
6. Run final release dry-run

## Critical Journeys (E2E)

1. Homepage loads and primary CTA works
2. Contact form validation + submission success/error paths
3. Blog list loads and article detail pages render
4. Core tools load (`roi-calculator`, `ai-readiness`, `use-cases`)
5. Legal and privacy routes are reachable

## Required Sign-Off

1. Engineering: build/test/security gates
2. Product/Marketing: content accuracy and claims
3. Operations: monitoring + incident response readiness
