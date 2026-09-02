import { Camera, CheckCircle2, ChevronRight, FileText, PhoneCall } from "lucide-react";
import { DemoLink } from "@/components/common/DemoLink";
import { features, type FeatureIcon } from "@/constants/welcome";

// Keys are exhaustive over FeatureIcon: adding a variant there without adding it
// here fails the build, which is what replaced the old `?? Brain` fallback.
const featureIcons: Record<FeatureIcon, typeof PhoneCall> = {
  phone: PhoneCall,
  fileText: FileText,
  camera: Camera,
  checkCircle: CheckCircle2,
} as const;

// Marketing CTAs are pills; the primary is an ink fill, the secondary a white
// pill with a hairline. See DESIGN.md for why the shape differs from app chrome.
const primaryCtaClass =
  "inline-flex min-h-12 items-center justify-center rounded-pill bg-primary px-6 text-body font-medium text-primary-foreground transition-colors duration-fast hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const secondaryCtaClass =
  "inline-flex min-h-12 items-center justify-center rounded-pill border border-border bg-card px-6 text-body font-medium text-foreground transition-colors duration-fast hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export default function Welcome() {
  return (
    <section className="hero-mesh w-full">
      {/*
        Asymmetric vertical padding, deliberately.

        The mesh's three radial stops are centred at -10%, -5% and 0% of this
        band's height, so the wash is at its strongest along the top edge. With
        128px of symmetric padding the brightest part of the only decoration
        this design system permits itself landed in dead space above the
        eyebrow -- a soft coloured stripe between the header and the first
        word, doing no work. Pulling the top padding in puts the eyebrow and
        headline inside the wash, which is what a hero mesh is for. The bottom
        padding is unchanged: it is what separates the hero from ClientLogos.
      */}
      <div className="container mx-auto px-4 pb-4xl pt-2xl md:pb-section md:pt-3xl">
        <div className="mb-3xl flex flex-col items-center justify-center gap-lg text-center">
          {/* The uppercase Geist Mono eyebrow, labelling the band like a spec sheet. */}
          <p className="eyebrow">AI for trades and field operations</p>
          {/*
            The headline names the two jobs this practice actually does. It read
            "Transforming Businesses Through Intelligent Automation" -- a sentence
            with no subject, no industry and no claim, interchangeable with every
            competitor's. A contractor has about four seconds here; spend them on
            something they recognise rather than on the category name.
          */}
          {/*
            An h1, not an h2. The page shipped with no h1 at all -- the hero
            headline was an h2 and nothing above it -- so screen readers and
            search engines were handed a document whose top level was missing.
          */}
          <h1 className="text-display-xl text-foreground">
            Someone has to answer the phone and{" "}
            <span className="text-brand">key in the paperwork</span>
          </h1>
          <p className="mx-auto max-w-[60ch] text-body-lg text-muted-foreground">
            It does not have to be a person on your payroll. I build small,
            specific systems for construction, HVAC, logistics and manufacturing
            businesses — one workflow at a time, proved on your own documents
            before you pay for a build.
          </p>
        </div>

        <div className="mb-3xl grid grid-cols-1 gap-lg md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = featureIcons[feature.icon];

            return (
              /* Level 0: hairline card, no shadow, no hover lift. */
              <article
                key={feature.title}
                className="flex h-full flex-col rounded-md border border-border bg-card p-lg transition-colors duration-default hover:border-brand/40"
              >
                <div className="mb-lg w-fit rounded-sm border border-border bg-muted p-3">
                  <Icon className="h-5 w-5 text-brand" aria-hidden="true" />
                </div>
                {/* h2, not h3. Promoting the hero headline to h1 left these
                    tiles skipping a level straight from h1, which is a
                    heading-order violation and cost the homepage its
                    Lighthouse accessibility floor (95 against a floor of 96). */}
                <h2 className="mb-sm text-heading-3 text-foreground">
                  {feature.title}
                </h2>
                <p className="text-body-sm text-muted-foreground">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>

        {/*
          The demos used to be 12px mono links buried at the bottom of the four
          tiles. They are the site's core claim -- "proved on your own documents
          before you pay" -- made clickable, and the only thing here a visitor
          can check without talking to anyone, so they get their own band and
          the secondary pill rather than the smallest text on the page.
        */}
        <div className="mb-3xl rounded-md border border-border bg-card p-lg">
          <p className="mb-md max-w-[60ch] text-body-sm text-muted-foreground">
            Each of these runs on sample data, right now, with nothing to install
            and no one to talk to.
          </p>
          <div className="flex flex-col gap-md sm:flex-row sm:flex-wrap">
            {features
              .filter((feature) => feature.demo)
              .map((feature) => (
                <DemoLink key={feature.title} demo={feature.demo!} />
              ))}
          </div>
        </div>

        <div className="mt-xl flex flex-col items-center justify-center gap-md sm:flex-row">
          <a href="/services" className={primaryCtaClass}>
            <span>Explore Our Services</span>
            <ChevronRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </a>
          <a href="/contact" className={secondaryCtaClass}>
            Book a call
          </a>
        </div>
      </div>
    </section>
  );
}
