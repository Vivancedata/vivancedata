import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { ArrowMark, VerdictMark } from "@/components/common/Marks";
import { ctaPrimary, ctaSecondary, wallLabel } from "@/components/common/controls";
import { partnerAudiences, partnerCommitments, partnerTerms } from "@/constants/partners";
import { demos } from "@/constants/demos";

export const metadata: Metadata = {
  title: "For people who already serve trades - Vivancedata",
  description:
    "Your customers are asking about AI and you do not want to own a model you did not train. I build the workflow, you keep the relationship.",
  keywords: [
    "field service software partner",
    "AI implementation partner trades",
    "MSP AI partner",
    "white label AI automation",
    "ServiceTitan partner AI",
  ],
  openGraph: {
    title: "For people who already serve trades",
    description: "I build the workflow. You keep the relationship.",
    type: "website",
    url: "https://vivancedata.com/partners",
  },
};

/**
 * The partner argument.
 *
 * Everything else on this site is written to an owner-operator. This one page
 * is written to whoever already has that owner's trust, because that is how
 * this buyer actually finds anyone — a name from someone they already pay,
 * never a website they happened to read.
 *
 * It is deliberately not a rewrite of the homepage in a business-development
 * voice. A reseller's question is not "does this work", it is "what does this
 * do to my relationship with my customer, and what breaks on my desk when it
 * goes wrong". The commitments section answers that and the second half of it
 * matters more than the first.
 */
export default function PartnersPage() {
  return (
    <div className="w-full">
      <PageHero
        title={
          <>
            I build the workflow. You keep the <em className="italic">relationship</em>.
          </>
        }
        description="Your customers are asking you about AI. Building it yourself means owning a model you did not train and a failure mode you cannot explain at 9pm. This is the other option."
      />

      <section className="container mx-auto px-4 py-3xl md:py-4xl" aria-labelledby="who-heading">
        <div className="max-w-[46ch]">
          <h2 id="who-heading" className="font-display text-serif-lg text-foreground">
            Who this is for
          </h2>
          <p className="mt-lg text-body-lg text-muted-foreground">
            An owner-operator does not find a consultant by reading a website.
            They get a name from someone they already pay. That is you, and it is
            the part I cannot do myself.
          </p>
        </div>

        <dl className="mt-2xl border-t border-rule">
          {partnerAudiences.map((audience) => (
            <div
              key={audience.who}
              className="grid grid-cols-1 gap-x-lg gap-y-2 border-b border-rule py-lg md:grid-cols-12"
            >
              <dt className="font-display text-serif-sm text-foreground md:col-span-5">
                {audience.who}
              </dt>
              <dd className="max-w-[58ch] text-body text-muted-foreground md:col-span-7">
                {audience.why}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section
        className="bleed border-t border-rule"
        aria-labelledby="commitments-heading"
      >
        <div className="container mx-auto px-4 py-3xl md:py-4xl">
          <div className="max-w-[46ch]">
            <h2 id="commitments-heading" className="font-display text-serif-lg text-foreground">
              What I will and will not do
            </h2>
            <p className="mt-lg text-body-lg text-muted-foreground">
              The second half of this list matters more than the first. Your
              question is not whether the work is any good — it is what happens
              to your customer, and what lands on your desk when something goes
              wrong.
            </p>
          </div>

          <ul className="mt-2xl border-t border-rule">
            {partnerCommitments.map((commitment) => (
              <li
                key={commitment.title}
                className="grid grid-cols-1 gap-x-lg gap-y-2 border-b border-rule py-lg md:grid-cols-12"
              >
                <div className="flex items-start gap-3 md:col-span-5">
                  <VerdictMark verdict="filled" label="" className="mt-[0.45rem]" />
                  <h3 className="font-display text-serif-sm text-foreground">
                    {commitment.title}
                  </h3>
                </div>
                <p className="max-w-[58ch] text-body text-muted-foreground md:col-span-7">
                  {commitment.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bleed border-t border-rule" aria-labelledby="proof-heading">
        <div className="container mx-auto px-4 py-3xl md:py-4xl">
          <div className="grid grid-cols-1 gap-2xl lg:grid-cols-12 lg:gap-xl">
            <div className="lg:col-span-5">
              <h2 id="proof-heading" className="font-display text-serif-lg text-foreground">
                Check it before you put your name on it
              </h2>
              <p className="mt-lg max-w-[46ch] text-body-lg text-muted-foreground">
                You are being asked to introduce me to someone who trusts you,
                so you should be able to see the work first without talking to
                anyone. Three systems are deployed and running on sample data.
                Open them.
              </p>
            </div>

            <ul className="lg:col-span-7 lg:border-t lg:border-rule">
              {Object.values(demos).map((demo) => (
                <li key={demo.href} className="border-b border-rule">
                  <a
                    href={demo.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex min-h-16 items-center justify-between gap-md py-lg text-body text-foreground transition-colors duration-fast hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <span>{demo.label}</span>
                    <ArrowMark className="transition-transform duration-default group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bleed border-t border-rule" aria-labelledby="terms-heading">
        <div className="container mx-auto px-4 py-3xl md:py-4xl">
          <div className="grid grid-cols-1 gap-x-xl gap-y-lg md:grid-cols-12">
            <h2 id="terms-heading" className="font-display text-serif-lg text-foreground md:col-span-4">
              {partnerTerms.heading}
            </h2>
            <div className="md:col-span-8">
              <dl className="border-t border-rule">
                {partnerTerms.items.map((item) => (
                  <div
                    key={item.term}
                    className="flex flex-wrap items-baseline justify-between gap-md border-b border-rule py-3.5"
                  >
                    <dt className={wallLabel}>{item.term}</dt>
                    <dd className="font-mono text-data text-warning">{item.detail}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-lg max-w-[58ch] text-body-sm text-muted-foreground">
                {partnerTerms.note}
              </p>
            </div>
          </div>

          <div className="mt-3xl flex flex-col gap-md sm:flex-row sm:items-center">
            <a href="/contact" className={ctaPrimary}>
              <span>Book a call</span>
              <ArrowMark />
            </a>
            <a href="/methodology" className={ctaSecondary}>
              See how an engagement runs
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
