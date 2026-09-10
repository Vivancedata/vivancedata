import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { MissedCallCalculator } from "@/components/tools/MissedCallCalculator";

export const metadata: Metadata = {
  title: "What are missed calls costing you? - Vivancedata",
  description:
    "Three questions and a number, worked out from your own figures: how many after-hours calls go unanswered, what a job is worth, and how many of those callers would have booked.",
  keywords: [
    "missed calls cost calculator",
    "after hours calls HVAC",
    "missed call revenue",
    "trades answering service",
    "plumber missed calls",
    "contractor after hours calls",
  ],
  openGraph: {
    title: "What are missed calls costing you?",
    description:
      "Three questions and a number, from your own figures. Not a benchmark, not anybody else's data.",
    type: "website",
    url: "https://vivancedata.com/tools/missed-calls",
  },
};

/**
 * The one page here built to be forwarded rather than browsed.
 *
 * A contractor will send another contractor a link that answers a question
 * about their own business. They will not send a consultancy homepage. That is
 * the whole reason this exists as its own route with its own title: it has to
 * survive being pasted into a trade group with no context around it.
 *
 * So it takes three inputs, not ten, and it prints the sum. Nothing is stored,
 * nothing is gated behind an address, and no figure comes from anywhere but the
 * reader — the moment it asks for an email before answering, it becomes the
 * thing people forward warnings about instead.
 */
export default function MissedCallsPage() {
  return (
    <div className="w-full">
      <PageHero
        title={
          <>
            What are the calls you miss <em className="italic">actually</em> costing?
          </>
        }
        description="Three questions, your own numbers, and a figure you can check on paper. Nothing is stored and there is no form in the way."
      />

      <section className="container mx-auto px-4 py-3xl md:py-4xl">
        <MissedCallCalculator />

        <div className="mt-3xl grid grid-cols-1 gap-x-xl gap-y-lg border-t border-rule pt-2xl md:grid-cols-12">
          <h2 className="font-display text-serif-sm text-foreground md:col-span-4">
            If the first number is a guess
          </h2>
          <div className="md:col-span-8">
            <p className="max-w-[62ch] text-body text-muted-foreground">
              Most owners do not know how many calls they miss, because a missed
              call leaves no record worth the name. Voicemail catches the ones
              who bother to leave a message, and the ones who do not are
              invisible — they ring the next name on the list and you never learn
              it happened.
            </p>
            <p className="mt-lg max-w-[62ch] text-body text-muted-foreground">
              If you want the real figure, your phone provider&apos;s call log
              has it. Pull one week, count the calls outside your hours that went
              unanswered, and put that number in above. It takes about ten
              minutes and it is the only part of this page I cannot do for you.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
