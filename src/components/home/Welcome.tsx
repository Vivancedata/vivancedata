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
          <h2 className="text-display-xl text-foreground">
            Someone has to answer the phone and{" "}
            <span className="text-brand">key in the paperwork</span>
          </h2>
          <p className="mx-auto max-w-3xl text-body-lg text-muted-foreground">
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
                <h3 className="mb-sm text-heading-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-body-sm text-muted-foreground">
                  {feature.description}
                </p>
                {feature.demo ? (
                  /* The site's core claim is "proved on your own documents
                     before you pay" -- these links are that claim made
                     clickable, so they sit on the promise they prove. */
                  <DemoLink demo={feature.demo} className="mt-auto pt-md" />
                ) : null}
              </article>
            );
          })}
        </div>

        <div className="mt-xl flex flex-col items-center justify-center gap-md sm:flex-row">
          <a href="/services" className={primaryCtaClass}>
            <span>Explore Our Services</span>
            <ChevronRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </a>
          <a href="/contact" className={secondaryCtaClass}>
            Schedule a Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
