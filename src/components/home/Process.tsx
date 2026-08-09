import { ArrowRight } from "lucide-react";
import { processSteps } from "@/constants/process";

/**
 * The engagement sequence, set as a hairline-ruled list.
 *
 * This replaced a centre-spine zigzag: alternating cards either side of a
 * vertical rule, each in its own 5/12 column with the opposite 5/12 left empty.
 * Two things were wrong with it. Half the container width was blank at every
 * step, which squeezed the copy into a ~310px measure while 1,100px sat unused;
 * and the steps on the right were set `text-right`, so four body paragraphs ran
 * with a ragged left edge -- the edge a reader's eye returns to on every line.
 *
 * A full-width list divided by rules instead of card chrome is shorter, reads at
 * a normal measure, and matches the elevation rule in DESIGN.md: a hairline
 * before a shadow. The step number is a Geist Mono wall label rather than a
 * filled circle, which drops one more icon tile from a page that had 43 of them.
 */
const Process = () => {
  return (
    <section className="w-full bg-muted/20 py-4xl md:py-section">
      <div className="container mx-auto px-4">
        <div className="mb-3xl max-w-3xl">
          <p className="eyebrow mb-md">Our Approach</p>
          <h2 className="text-heading-1 mb-md text-foreground">How an engagement runs</h2>
          <p className="text-body-lg text-muted-foreground">
            Five steps, in order. The first two are cheap on purpose — if there is
            nothing here worth building, that should surface before you have spent
            anything much finding out.
          </p>
        </div>

        <ol className="border-t border-border">
          {processSteps.map((step) => (
            <li
              key={step.number}
              className="grid grid-cols-1 gap-md border-b border-border py-lg md:grid-cols-12 md:gap-lg md:py-xl"
            >
              <div className="md:col-span-2">
                <span className="eyebrow" aria-hidden="true">
                  Step {String(step.number).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-heading-3 text-foreground md:col-span-4">{step.title}</h3>
              <p className="text-body text-muted-foreground md:col-span-6">{step.description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-3xl flex flex-col items-start gap-lg md:flex-row md:items-center md:justify-between">
          <p className="text-body-lg max-w-xl text-foreground">
            The first step is a conversation about what your week actually looks like.
          </p>
          <a
            href="/contact"
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-pill bg-primary px-6 text-body font-medium text-primary-foreground transition-colors duration-fast hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <span>Book a call</span>
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Process;
