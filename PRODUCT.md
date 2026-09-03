# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Open decision — the single highest-value unknown in this record.** The owner
states the business plan was written recently and it is not yet established
whether its audience assumption still holds, or whether the practice is
profitable at that audience. No user research has been done. Do not treat the
site's current copy as validation.

What the site currently *assumes*, so that the bet is at least legible:

- An owner-operator or hands-on principal at a small construction, HVAC/trades,
  logistics/fleet or manufacturing business.
- Phone-first, reading between jobs rather than at a desk. The contact form
  offers a phone number for this reason, and the message placeholder asks
  "Which job goes wrong, and how often?"
- Feels the pain personally: after-hours calls going to voicemail, the same
  paperwork typed twice, exceptions found only when a customer phones.

Unvalidated adjacent possibility, neither adopted nor ruled out: the office or
operations manager who performs the work, finds the site, and forwards it to the
owner who decides. That reading would change copy, IA and CTA placement.

## Product Purpose

A founder-led AI consulting practice that builds small, specific systems for
trade and industrial operations — taking the after-hours call and the
twice-typed paperwork off a business — and then stays on to keep them running as
the surrounding systems change.

Success is a booked call from a qualified operator, then an engagement that
survives contact with the client's real documents.

## Positioning

- **Founder-led with no hand-off.** One person is senior on every engagement.
  The person who scopes the work builds it and answers the phone afterwards.
  Specialist collaborators join project by project when the technical domain
  calls for one.
- **Priced as build *and* run, not project-only.** Setup fee plus monthly
  retainer, because an automation is not a deliverable that stays delivered:
  upstream APIs change, document formats drift, and an unattended workflow
  degrades within months. `src/constants/pricing.ts` records this reasoning and
  requires every tier to state its ongoing cost honestly, including "nothing
  ongoing" where true.
- **Proved on the client's own documents before they pay for a build**, and run
  beside the existing way first rather than replacing it on day one.
- **Deliberately narrow.** Blue-collar and local services only.

## Operating Context

Buyers work in construction, HVAC/trades, logistics/fleet and manufacturing.
The recurring material of their day, and of any engagement:

- Submittals, RFIs and daily reports arriving as emailed PDFs in no consistent
  format, re-keyed by hand into a project system.
- After-hours calls going to voicemail, where the customer books whoever answers
  first by morning.
- Delivery slips, field notes, and loads drifting off plan that surface only
  when a customer calls.
- Existing systems that work must be integrated with, not replaced: project
  systems, MES, dispatch boards.

## Capabilities and Constraints

- Marketing site only. No authenticated product, no customer account area.
- Four industry pages: construction, HVAC/trades, logistics, manufacturing.
  Financial services, healthcare, retail, energy and public sector were removed
  deliberately and 308-redirect to `/industries`. Re-adding an enterprise
  vertical reopens the positioning decision.
- Three service pages: consulting, generative AI, training.
- Three interactive tools: ROI calculator, AI readiness assessment, use-case
  explorer. Each computes from visitor input and can email a report.
- Contact and tool reports send via Resend; the newsletter uses ConvertKit or
  Mailchimp; rate limiting uses Upstash with an in-memory fallback. Reporting
  success without sending requires an explicit `EMAIL_DRY_RUN=1` and is
  otherwise a 503 in every environment.
- The blog's source of truth is the filesystem: MDX under
  `src/app/blog/posts/`, read at build time.
- The `/methodology` surface documents the six phases an engagement runs
  through. The RAPID acronym was retired 2026-09-03; see Brand Commitments.

## Brand Commitments

- **Name: "Vivancedata"** — one capital V. The older "VivanceData" casing was
  retired across the site.
- **Founder: Lorenzo Scaturchio.** Named publicly, on the about page and in
  outbound email.
- **First person, singular.** "You'll hear back from me, not an account
  manager." "I build it on your own documents." The voice is the positioning:
  a plural corporate voice would contradict the no-hand-off claim.
- **One conversion verb: "Book a call."** Applied across the site; the
  consulting page's "Schedule a Strategy Session" and "Book a Consultation"
  remain deliberate exceptions not yet reconciled.
- Links: LinkedIn (`lorenzo-scaturchio`), GitHub (`gr8monk3ys`).
- **No named proprietary framework.** The "RAPID AI Framework" was retired
  2026-09-03 on delegated judgement. It was a backronym for "Realize AI
  Potential In Days" — a speed promise nothing supported — and it never even
  spelled its own phases, which are Discover, Architect, Prototype, Implement,
  Deploy, Scale: *DAPIDS*. A named framework is enterprise-consultancy
  furniture and contradicts the plain-spoken, founder-led voice.
  **The six phases are kept and are the substance**; the surface is now called
  "How an engagement runs". The tagline is "One workflow at a time, proved on
  your own documents" — a description rather than a promise. Do not reintroduce
  a branded methodology name.

## Evidence on Hand

**The practice is pre-first-client. There are no delivered engagements.** This
governs what may ever appear on the site and is the most load-bearing fact in
this record.

Real and usable:

- **Three live demos**, deployed on subdomains, rate-limited, fed only fictional
  sample data: `calls.` (triage a sample voicemail), `paperwork.` (extract a
  sample delivery slip), `field.` (match a sample field note). Recorded in
  `src/constants/demos.ts`, which requires a demo be actually deployed before it
  earns an entry. **These are the only real proof the site has.**
- **Published pricing** with concrete figures, in `src/constants/pricing.ts`.
- **Three measured actions**, added 2026-09-03: a demo opened, a contact form
  submitted, and a tool report requested (`src/lib/analytics.ts`). Before this
  the site measured page views and nothing else, so the demos — the only real
  proof it has — produced no signal at all. All three are gated on analytics
  consent. This is the cheapest instrument available for the open audience
  question above; it does not answer it, but nothing could while no action was
  recorded.

Absences future work must not fabricate:

- No testimonials. Four invented ones were removed; `testimonials.ts`
  deliberately does not exist.
- No client logos. `clients.ts` holds industries and what gets built in them,
  never company names.
- No named case studies. The four entries in `caseStudies.ts` are illustrative
  engagements with an unnamed "Illustrative …" client and deliberately
  qualitative results. Its own comment states the rule: **no number goes in
  without a named client who has agreed in writing to publish it.**
- No metrics, benchmarks, latency figures or outcome percentages anywhere. Two
  invented figures were removed from the services pages on 2026-09-02.

**Enforced on the methodology surface, 2026-09-03.** An audit prompted by
recording "pre-first-client" found the `/methodology` surface still written in
the pre-repositioning voice, making claims no such practice can make: a
"proven" methodology (eight places), a framework "refined through dozens of
successful implementations ... delivering consistent, measurable results", a
plural "Our team" and "Our engineers" against a one-person practice, "From Our
Experts" on the blog, a "Realize AI Potential In Days" speed promise, and an
"ensure compliance with GDPR, CCPA" claim for a service not offered. All were
removed or replaced with true statements. Two apparent hits were left alone
deliberately: "Compare Against Your Own Track Record" addresses the reader's
record, and "decision provenance" is not the word "proven".

## Product Principles

1. **Never publish a claim the practice has not earned.** No client is named, no
   outcome is quantified, and no methodology is called proven until a named
   client has agreed in writing to that specific wording. This has already cost
   the site invented testimonials, invented statistics and a fabricated
   guarantee; it is the practice's most consistently applied rule.
2. **The running cost is part of the offer.** Anything that presents a build as
   finished when it ships misrepresents how automations behave.
3. **Prove on the buyer's own material.** Demos use fictional data; engagements
   start on the client's real documents, running beside the old way.
4. **Stay narrow.** Blue-collar and local services. Breadth was removed once
   already and should not return by accident.
5. **Fail visibly rather than quietly.** A form that cannot send says so and
   hands over a direct address; a silent success that destroys a lead is the
   worse outcome. This is enforced in code, not only in copy.

## Accessibility & Inclusion

CI enforces per-route Lighthouse floors, and a drop below any of them fails the
build: performance 99, **accessibility 96**, SEO 100. The accessibility floor
sits at 96 rather than 100 because of known colour-contrast defects tracked in
issue #26 — an accepted, recorded debt, not a standard. Raising the floor when
the real score improves is the documented expectation.

Heading order is treated as a real constraint: a heading-order violation on the
homepage cost the accessibility floor once already and was fixed by promoting
the hero to `h1` and the feature tiles to `h2`.
