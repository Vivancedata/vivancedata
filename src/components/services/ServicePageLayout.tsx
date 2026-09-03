import React from "react";
import Link from "next/link";
import { Heading } from "@/components/common/Heading";
import { Paragraph } from "@/components/common/Paragraph";
import { Button } from "@/components/ui/button";

/**
 * The shell the three service detail pages share, verbatim: a centred page
 * header, a two-column hero split, a section wrapper, and a closing call to
 * action whose markup was byte-identical in all three.
 *
 * Deliberately four small pieces rather than one config-driven module. The
 * pages look alike from a distance and are not: three bespoke hero visuals
 * sharing only an outer frame, and six different card shapes -- including
 * training's course card, which carries an audience, a duration, a checked
 * topic list and its own footer action. A single ServicePageConfig would need
 * a discriminated union of card kinds plus a visual escape hatch, which is a
 * wide interface bought for three callers.
 *
 * `src/app/services/page.tsx` already composes ServicesStack, ServicesList
 * and ServicesCases this way; this follows that, not IndustryPage. See
 * docs/adr/0001-services-pages-compose-rather-than-configure.md.
 */

export function ServicePageHeader({
  title,
  intro,
}: {
  title: string;
  intro: string;
}): React.ReactElement {
  return (
    <div className="text-center mb-16">
      <Heading className="text-4xl md:text-5xl mb-4">{title}</Heading>
      <Paragraph className="max-w-2xl mx-auto text-lg">{intro}</Paragraph>
    </div>
  );
}

/**
 * `visual` is rendered as-is: each page's hero illustration is its own, and
 * the frames differ (the generative-ai terminal is monospaced and padded
 * differently). Only the split is shared.
 */
export function ServiceHeroSplit({
  visual,
  children,
}: {
  visual: React.ReactNode;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div className="flex flex-col md:flex-row gap-12 mb-20">
      <div className="w-full md:w-1/2">{visual}</div>
      <div className="w-full md:w-1/2 flex flex-col justify-center">{children}</div>
    </div>
  );
}

export function ServiceSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div className="mb-20">
      <h2 className="text-heading-1 mb-8 text-center">{heading}</h2>
      {children}
    </div>
  );
}

export function ServiceCTA({
  heading,
  body,
  actionLabel,
  actionHref = "/contact",
}: {
  heading: string;
  body: string;
  actionLabel: string;
  actionHref?: string;
}): React.ReactElement {
  return (
    <div className="bg-muted rounded-xl p-8 md:p-12 text-center">
      <h2 className="text-heading-1 mb-4">{heading}</h2>
      <p className="text-lg mb-8 max-w-2xl mx-auto">{body}</p>
      <Button asChild size="lg">
        <Link href={actionHref}>{actionLabel}</Link>
      </Button>
    </div>
  );
}
