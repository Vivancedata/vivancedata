import { ArrowMark } from "@/components/common/Marks";
import { ctaPrimary, wallLabel } from "@/components/common/controls";
import { processSteps } from "@/constants/process";

/**
 * The engagement sequence, set as a hairline-ruled list.
 *
 * This replaced a centre-spine zigzag: alternating cards either side of a
 * vertical rule, each in its own 5/12 column with the opposite 5/12 left empty.
 * Half the container width was blank at every step, which squeezed the copy into
 * a ~310px measure while 1,100px sat unused, and the right-hand steps were set
 * `text-right`, so four body paragraphs ran with a ragged left edge — the edge a
 * reader's eye returns to on every line.
 *
 * The step numbers stay. Numbers on a section are usually furniture, but here
 * the order is the argument: the first two steps are cheap on purpose and the
 * point is that they come first, which a reader cannot see without the count.
 */
const Process = () => {
  return (
    <section className="bleed border-t border-rule" aria-labelledby="process-heading">
      <div className="container mx-auto px-4 py-3xl md:py-4xl">
        <div className="max-w-[46ch]">
          <h2 id="process-heading" className="font-display text-serif-lg text-foreground">
            How an engagement runs
          </h2>
          <p className="mt-lg text-body-lg text-muted-foreground">
            Five steps, in order. The first two are cheap on purpose — if there is
            nothing here worth building, that should surface before you have spent
            anything much finding out.
          </p>
        </div>

        <ol className="mt-2xl border-t border-rule">
          {processSteps.map((step) => (
            <li
              key={step.number}
              className="grid grid-cols-1 gap-x-lg gap-y-sm border-b border-rule py-lg md:grid-cols-12 md:py-xl"
            >
              <p className={`${wallLabel} md:col-span-2 md:pt-2`} aria-hidden="true">
                {String(step.number).padStart(2, "0")}
              </p>
              <h3 className="font-display text-serif-sm text-foreground md:col-span-4">
                {step.title}
              </h3>
              {/* 56ch, not the 60ch used elsewhere: this band sets `text-body`
                  larger than the surrounding copy, and 60ch still measured 88
                  characters a line here. The cap is on the measured result. */}
              <p className="max-w-[56ch] text-body text-muted-foreground md:col-span-6">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-2xl flex flex-col items-start gap-lg md:flex-row md:items-center md:justify-between">
          <p className="max-w-[48ch] font-display text-serif-sm text-foreground">
            The first step is a conversation about what your week actually looks like.
          </p>
          <a href="/contact" className={ctaPrimary}>
            <span>Book a call</span>
            <ArrowMark />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Process;
