# 1. Service detail pages compose shared chrome; they are not config-driven

Date: 2026-09-02

## Status

Accepted

## Context

`src/components/industries/IndustryPage.tsx` renders all four industry pages
from a single `IndustryPageConfig`. It works: each industry `page.tsx` is
metadata plus one config object, and it deleted roughly 355 lines of
duplication.

The three service detail pages — `consulting` (220 lines), `generative-ai`
(202) and `training` (243) — look like the same problem. They share a page
shell, a hero split, section headings and a closing call to action whose
markup is byte-identical in all three. An architecture review flagged them as
"IndustryPage's before picture" and proposed a matching `ServicePageConfig`.

Read closely, they are not the same problem.

**The hero visuals share nothing but an outer frame.** Consulting draws a
four-step numbered framework over a checklist; generative-ai draws a
monospaced terminal with a prompt and a response; training lists the course
catalogue. Three bespoke illustrations of 25–35 lines, and even the frame
differs — the terminal is monospaced and padded differently.

**The content blocks are six shapes, not one.** icon + title + description in
a three-column grid; title + description in two columns; numbered circle +
title + description in four; an industry pill + title + description in two;
and training's course card — a 45-line layout carrying an audience, a
duration, a checkmarked topic list and its own footer action bar.

The four industry pages were genuinely alike, which is why one config was
deep there. Here a single config would need a discriminated union of five
card kinds plus a `heroVisual` escape hatch: an interface nearly as complex
as the markup it replaces, bought for three callers. That is the definition
of a shallow module, and it would be harder to read than the duplication.

## Decision

Extract only what is actually shared, as small composable modules in
`src/components/services/ServicePageLayout.tsx`: `ServicePageHeader`,
`ServiceHeroSplit`, `ServiceSection` and `ServiceCTA`.

Each page keeps its own hero visual and its own card markup, and composes the
chrome around them.

This follows a pattern that already exists in the same directory:
`src/app/services/page.tsx` composes `ServicesStack`, `ServicesList` and
`ServicesCases` rather than configuring one module.

## Consequences

The duplicated markup that genuinely repeated is gone — three page headers,
three hero splits, seven section wrappers and three call-to-action bands now
have one definition each. A styling change to any of them lands once.

The card markup stays duplicated where the shapes differ, which is honest: it
is not duplication of the same thing, it is three different things that
happen to be rectangles.

A future page can adopt the chrome without adopting a config type.

**Do not re-propose `ServicePageConfig` on the strength of line counts.** The
similarity is real at the page level and absent at the block level; the line
counts do not distinguish the two. If the pages' content blocks ever converge
on one shape, revisit this — the argument here is about the shapes, not about
config-driven rendering as a technique, which this repo uses successfully one
directory over.
