import { ArrowMark, VerdictMark } from "@/components/common/Marks";
import { ctaPrimary, ctaSecondary, wallLabel } from "@/components/common/controls";
import { pricingTiers } from "@/constants/pricing";

interface PricingProps {
  /**
   * The /pricing page supplies its own page-level heading, so the section
   * header is suppressed there to avoid stacking two titles on one screen.
   */
  showHeader?: boolean;
}

/**
 * The three tiers, set as one comparison table rather than three cards.
 *
 * Every tier lists the same nine capabilities in the same order — the only thing
 * that differs is which are included — so three separate cards printed those
 * nine lines three times and made the reader hold the differences in their head.
 * A shared row per capability puts the comparison on the page, which is what a
 * buyer is here to do, and it is the form this whole design is built for: a spec
 * sheet ruled by hairlines, not a deck of panels.
 *
 * The "Most Popular" badge is gone and is not coming back. This practice is
 * pre-first-client; a popularity claim with no customers behind it is exactly
 * the kind of invention PRODUCT.md exists to prevent. What replaces it is a
 * recommendation the founder can actually make in the first person.
 */

// Every tier carries the same nine capabilities in the same order — asserted
// here rather than assumed, so adding one to a single tier fails loudly instead
// of silently shifting a column out of alignment.
const capabilities = pricingTiers[0].features.map((feature) => feature.name);

function assertAligned() {
  for (const tier of pricingTiers) {
    const names = tier.features.map((feature) => feature.name);
    if (names.length !== capabilities.length || names.some((name, i) => name !== capabilities[i])) {
      throw new Error(
        `Pricing tiers no longer share one capability list; "${tier.name}" diverges. ` +
          "Either realign constants/pricing.ts or give this band a per-tier layout.",
      );
    }
  }
}
assertAligned();

function TierHead({ tier, as: Heading }: { tier: (typeof pricingTiers)[number]; as: "h2" | "h3" }) {
  return (
    <>
      <Heading className="font-display text-serif-sm text-foreground">{tier.name}</Heading>
      <p className="mt-2 max-w-[34ch] text-body-sm text-muted-foreground">{tier.description}</p>
      <p className="mt-lg font-display text-serif-sm text-foreground">{tier.price.setup}</p>
      {/* Sans, not mono, and not green. "One-off, nothing ongoing" and
        * "Custom monthly" are sentences; mono here would be costume, and the
        * green would claim a machine verified a price. */}
      <p className="mt-1 text-body-sm text-muted-foreground">{tier.price.ongoing}</p>
      {tier.popular ? (
        // Neither green nor a wall label. Green means "a system got this
        // right" and a recommendation from a person is not that; uppercase mono
        // is what every column head on this page wears, and this is the one
        // sentence on it spoken in the first person. So it takes the serif
        // italic that carries the hero's turn -- the world's own device for a
        // human voice rather than a machine one.
        <p className="mt-md font-display text-[1.0625rem] italic leading-none text-foreground">
          Where I&apos;d start
        </p>
      ) : null}
    </>
  );
}

export default function Pricing({ showHeader = true }: PricingProps) {
  const HeadingLevel = showHeader ? "h3" : "h2";

  return (
    <section className="bleed border-t border-rule" aria-labelledby={showHeader ? "pricing-heading" : undefined}>
      <div className="container mx-auto px-4 py-3xl md:py-4xl">
        {showHeader && (
          <div className="max-w-[46ch]">
            <h2 id="pricing-heading" className="font-display text-serif-lg text-foreground">
              What an engagement costs
            </h2>
            <p className="mt-lg text-body-lg text-muted-foreground">
              A build has two costs: getting it working, and keeping it working.
              Both are listed, and every figure is a starting point rather than a
              quote.
            </p>
          </div>
        )}

        {/*
          Two renderings of one dataset. A comparison grid needs a shared row to
          compare along, and there is no width at which nine rows × three columns
          and a 390px phone are the same layout. Only one is ever in the
          accessibility tree: `hidden` is display:none, so the other is not read.
        */}

        {/* Wide: the comparison table. */}
        <div className="mt-2xl hidden lg:block">
          <div className="grid grid-cols-[minmax(0,1.35fr)_repeat(3,minmax(0,1fr))] border-t border-rule">
            <div className="border-b border-rule py-xl pr-lg">
              <p className={wallLabel}>What is included</p>
            </div>
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`border-b border-l border-rule px-lg py-xl ${
                  tier.popular ? "bg-muted" : ""
                }`}
              >
                <TierHead tier={tier} as={HeadingLevel} />
              </div>
            ))}

            {capabilities.map((name, row) => (
              <div key={name} className="contents">
                <div className="border-b border-rule py-3.5 pr-lg">
                  <p className="text-body-sm text-muted-foreground">{name}</p>
                </div>
                {pricingTiers.map((tier) => {
                  // Safe by `assertAligned` above: every tier's list is the same
                  // nine capabilities in the same order.
                  const feature = tier.features[row];
                  return (
                    <div
                      key={`${tier.name}-${name}`}
                      className={`border-b border-l border-rule px-lg py-3.5 ${
                        tier.popular ? "bg-muted" : ""
                      }`}
                    >
                      <VerdictMark
                        verdict={feature.included ? "filled" : "absent"}
                        label={`${name}: ${feature.included ? "included" : "not included"} in ${tier.name}`}
                        className="mt-1"
                      />
                      {feature.tooltip ? (
                        <p className="mt-1.5 max-w-[26ch] text-caption text-mute">{feature.tooltip}</p>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ))}

            {/* The CTA row carries the table's closing rule. Without it the
              * recommended column's tint ended in mid-air as a hanging
              * rectangle on a page whose contract says nothing is a card. */}
            <div className="border-b border-rule py-lg pr-lg" />
            {pricingTiers.map((tier) => (
              <div
                key={`${tier.name}-cta`}
                className={`border-b border-l border-rule px-lg py-lg ${tier.popular ? "bg-muted" : ""}`}
              >
                <a
                  href="/contact"
                  className={`${tier.popular ? ctaPrimary : ctaSecondary} w-full`}
                  aria-label={`${tier.cta} for ${tier.name}`}
                >
                  <span>{tier.cta}</span>
                  {tier.popular ? <ArrowMark /> : null}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Narrow: one tier at a time, each with its own list. */}
        <div className="mt-2xl border-t border-rule lg:hidden">
          {pricingTiers.map((tier) => (
            <div key={tier.name} className="border-b border-rule py-xl">
              <TierHead tier={tier} as={HeadingLevel} />
              <ul className="mt-lg space-y-2.5">
                {tier.features.map((feature) => (
                  <li key={feature.name} className="flex items-start gap-3">
                    <VerdictMark
                      verdict={feature.included ? "filled" : "absent"}
                      label={feature.included ? "Included" : "Not included"}
                      className="mt-[0.4rem]"
                    />
                    <div className="min-w-0">
                      <p
                        className={
                          feature.included
                            ? "text-body-sm text-foreground"
                            : "text-body-sm text-mute"
                        }
                      >
                        {feature.name}
                      </p>
                      {feature.tooltip ? (
                        <p className="mt-1 text-caption text-mute">{feature.tooltip}</p>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
              <a
                href="/contact"
                className={`${tier.popular ? ctaPrimary : ctaSecondary} mt-lg w-full`}
                aria-label={`${tier.cta} for ${tier.name}`}
              >
                <span>{tier.cta}</span>
                {tier.popular ? <ArrowMark /> : null}
              </a>
            </div>
          ))}
        </div>

        {/* The "Delivery Confidence Guarantee" panel that sat beside this was a
            promise with nothing behind it (no SLA, no refund terms); the fixed
            price in writing is the real commitment, so that is what is said. */}
        <div className="mt-2xl grid grid-cols-1 gap-x-xl gap-y-lg md:grid-cols-12">
          <h3 className="font-display text-serif-sm text-foreground md:col-span-4">
            Does not fit one of these?
          </h3>
          <div className="md:col-span-8">
            <p className="max-w-[58ch] text-body text-muted-foreground">
              Every build is scoped around the systems you already run and how
              much of it you want to run yourself. Tell me what is going wrong and
              I will come back with a scope and a fixed price in writing.
            </p>
            <ul className="mt-lg border-t border-rule">
              {[
                "Works with the dispatch, accounting and phone systems you already have",
                "Handover-only if you would rather run it without me",
                "A fixed price in writing before anything starts",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 border-b border-rule py-3">
                  <VerdictMark verdict="filled" label="" className="mt-[0.4rem]" />
                  <span className="text-body-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
