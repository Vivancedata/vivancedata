import React from "react";
import Link from "next/link";
import { Heading } from "@/components/common/Heading";
import { Paragraph } from "@/components/common/Paragraph";
import { ArrowMark } from "@/components/common/Marks";
import { ctaPrimary } from "@/components/common/controls";

/**
 * The shell the three service detail pages share, verbatim: a page
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
 * `src/app/services/page.tsx` already composes ServicesList
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
    <div className="mb-16">
      <Heading className="text-4xl md:text-5xl mb-4">{title}</Heading>
      <Paragraph className="max-w-[62ch] text-body-lg">{intro}</Paragraph>
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
      <h2 className="mb-8 font-display text-serif-lg">{heading}</h2>
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
    // A ruled band, not a tinted card. The rounded panel was the last place a
    // service page still built its own surface, and its generic <Button> was
    // the last control on these pages not drawn from the control vocabulary.
    <div className="border-t border-rule pt-xl">
      <h2 className="mb-4 font-display text-serif-lg">{heading}</h2>
      <p className="mb-8 max-w-[62ch] text-body-lg text-muted-foreground">{body}</p>
      <Link href={actionHref} className={ctaPrimary}>
        <span>{actionLabel}</span>
        <ArrowMark />
      </Link>
    </div>
  );
}
