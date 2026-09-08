import { ArrowMark } from "@/components/common/Marks";
import { ctaPrimary, ctaSecondary } from "@/components/common/controls";
import { ledgerMarks } from "@/constants/nightLog";

/**
 * The hero.
 *
 * Two beats of serif and nothing else above the fold. It used to be a centred
 * headline, a grey lead paragraph, four icon-and-text tiles, a bordered demo
 * panel and two CTAs — five competing things in one viewport, on a page whose
 * whole argument is that it does not claim anything it cannot show.
 *
 * What went, and where it went:
 *
 * - The four promise tiles are not deleted; they are the framing on the three
 *   records in NightLog, verbatim from `welcome.ts` (see `nightLog.ts` for why
 *   the fourth has no record). Restating them here and again below would have
 *   been the same claim in two typefaces.
 * - The demo panel became the night log itself, which shows the demos' output
 *   rather than linking to it from a box of grey text.
 *
 * The headline is left-set, not centred: it is a sentence someone should read
 * as a sentence, and a 96px centred headline forces the eye back across the
 * viewport on every line.
 */
export default function Welcome() {
  return (
    <section className="bleed">
      <div className="container relative mx-auto px-4 pb-3xl pt-3xl md:pb-4xl md:pt-4xl">
        {/* The dot matrix, on the half of the viewport the headline leaves
          * empty, behind a full-height vertical hairline.
          *
          * The rule is the point. This world's structural signature is a ruled
          * sheet, and the build had horizontal rules everywhere and vertical
          * ones only inside two grids — so the right of the first viewport had
          * nothing to stand on and read as unfinished rather than as quiet.
          * Atmosphere, not pattern: the field fades top and bottom and never
          * sits under copy. */}
        <div
          className="field-dots field-dots-fade pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[42%] border-l border-rule lg:block"
          aria-hidden="true"
        />
        <div>
          {/*
            An h1, not an h2. The page shipped with no h1 at all -- the hero
            headline was an h2 and nothing above it -- so screen readers and
            search engines were handed a document whose top level was missing.

            The headline names the two jobs this practice actually does. It read
            "Transforming Businesses Through Intelligent Automation" -- a
            sentence with no subject, no industry and no claim, interchangeable
            with every competitor's. A contractor has about four seconds here.
          */}
          {/* The measure sits on the h1, not on a wrapper: `ch` resolves
            * against the element's own font, and on the wrapper it was
            * measuring the 16px body sans while the heading set at 96px —
            * a 176px column that broke the headline one word to a line. */}
          <h1 className="max-w-[17ch] font-display text-serif-xl text-balance text-foreground">
            Someone has to answer the phone and key in the paperwork
          </h1>
        </div>

        {/*
          The turn, in the serif's italic rather than in green.

          Colouring the emphasis brand green is the obvious move and the wrong
          one: green is this design's evidence mark, spent on values a system
          actually filled, and spending it on a headline would make it mean
          "important" instead of "verified" everywhere else on the page. The
          face has one weight and a real italic, so the italic carries emphasis.
        */}
        <p className="mt-lg max-w-[26ch] font-display text-serif-md italic text-muted-foreground">
          It does not have to be a person on your payroll.
        </p>

        <p className="mt-2xl max-w-[62ch] text-body-lg text-muted-foreground">
          I build small, specific systems for construction, HVAC, logistics and
          manufacturing businesses — one workflow at a time, proved on your own
          documents before you pay for a build.
        </p>

        <div className="mt-2xl flex flex-col gap-md sm:flex-row sm:items-center">
          <a href="/contact" className={ctaPrimary}>
            <span>Book a call</span>
            <ArrowMark />
          </a>
          <a href="#night-log-heading" className={ctaSecondary}>
            See what it sends back
          </a>
        </div>
      </div>

      {/*
        The ledger strip: the material of the work, drifting, as texture.

        The reference this design follows runs a field of currency symbols under
        its hero, because it is a bank. The equivalent material here is the
        paperwork — the RFI numbers, delivery notes, timestamps and permit codes
        that are the thing being typed twice. It is decoration and it is marked
        as such: aria-hidden, in the decorative grey tier, and duplicated only so
        the loop closes seamlessly. Reduced motion stops it dead.
      */}
      <div
        className="relative overflow-hidden border-y border-rule py-3.5"
        aria-hidden="true"
      >
        <div className="drift flex w-max gap-0">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center gap-0">
              {ledgerMarks.map((mark) => (
                <li
                  key={`${copy}-${mark}`}
                  className="whitespace-nowrap px-6 font-mono text-data text-faint"
                >
                  {mark}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
