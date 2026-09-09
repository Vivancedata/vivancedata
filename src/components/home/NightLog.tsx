"use client";

import { useRef, useState } from "react";
import { ArrowMark, VerdictMark } from "@/components/common/Marks";
import { ctaQuiet, wallLabel } from "@/components/common/controls";
import { nightLog, promiseFor, type LogRecord } from "@/constants/nightLog";
import { ANALYTICS } from "@/lib/analytics";

/**
 * The night log — the page's signature element and its only real evidence.
 *
 * The reference this design follows opens with a product screenshot floating on
 * a photograph. That works when the product is a screen. This practice's product
 * is three small systems that read a call, a slip and a field note, so the
 * equivalent artifact is what they send back: a record, in mono, on a dot
 * matrix, with the brand green spent only on values a system actually filled.
 *
 * Three deliberate choices worth keeping:
 *
 * 1. The "held" verdict is styled as prominently as the successes. A system that
 *    refuses to read an illegible word is the difference between this and a
 *    demo, and hiding that under an error style would sell the opposite.
 * 2. Switching tabs re-runs the settle animation via `runKey`. The motion is the
 *    page's one authored moment and it belongs to the act of reading a record,
 *    not to scrolling past a section.
 * 3. Nothing is a card. The panel is bounded by a hairline on a shared sheet,
 *    which is what keeps this from becoming the dashboard screenshot the whole
 *    direction refuses.
 */

function Record({ record, runKey }: { record: LogRecord; runKey: number }) {
  return (
    <div className="border border-rule bg-card">
      <div className="flex flex-wrap items-baseline justify-between gap-x-md gap-y-xs border-b border-rule px-md py-3 md:px-lg">
        <p className="font-mono text-data text-foreground">
          {record.stamp}
          <span className="px-2 text-faint" aria-hidden="true">
            /
          </span>
          <span className="text-mute">{record.source}</span>
        </p>
        <p className={wallLabel}>Sample</p>
      </div>

      {/* What went in. Set as a quotation rather than as a field, because the
       * reader has to see the mess before the tidy version means anything. */}
      <blockquote className="border-b border-rule px-md py-lg md:px-lg">
        <p className="max-w-[52ch] text-body text-muted-foreground">
          <span aria-hidden="true">“</span>
          {record.input}
          <span aria-hidden="true">”</span>
        </p>
      </blockquote>

      <dl key={runKey} className="divide-y divide-rule">
        {record.fields.map((field, index) => (
          <div
            key={field.label}
            className="settle grid grid-cols-[1fr] gap-x-md gap-y-1 px-md py-3 md:grid-cols-[8rem_1fr] md:px-lg"
            style={{ animationDelay: `${index * 70}ms` }}
          >
            <dt className={`${wallLabel} md:pt-0.5`}>{field.label}</dt>
            <dd className="min-w-0">
              <p className="flex items-start gap-2.5 font-mono text-data text-foreground">
                <span className="pt-0.5">
                  <VerdictMark verdict={field.verdict} />
                </span>
                <span className="min-w-0">{field.value}</span>
              </p>
              {field.note ? (
                <p className="mt-1 max-w-[46ch] pl-[1.375rem] text-caption text-muted-foreground">{field.note}</p>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function NightLog() {
  const [active, setActive] = useState(0);
  const [runKey, setRunKey] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const select = (index: number) => {
    setActive(index);
    setRunKey((key) => key + 1);
  };

  // Arrow keys move between tabs, which is what a tablist owes a keyboard user;
  // roving tabindex keeps Tab itself moving past the group to the demo link.
  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const last = nightLog.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = active === last ? 0 : active + 1;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = active === 0 ? last : active - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  };

  const record = nightLog[active];
  const promise = promiseFor(record.promise);

  return (
    <section className="bleed border-t border-rule" aria-labelledby="night-log-heading">
      <div className="container relative mx-auto px-4 py-3xl md:py-4xl">
        <div
          className="field-dots field-dots-fade pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-1/2 lg:block"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 gap-2xl lg:grid-cols-12 lg:gap-xl">
          <div className="lg:col-span-5 lg:pr-lg">
            <h2 id="night-log-heading" className="font-display text-serif-lg text-foreground">
              Nothing on this page is a <em className="italic">claim</em>
            </h2>
            <p className="mt-lg max-w-[46ch] text-body-lg text-muted-foreground">
              Three systems are deployed and running right now on sample data. What
              follows is what they send back. Open any one of them and run the
              sample yourself — nothing to install, and no one to talk to first.
            </p>

            {/* The legend earns its place: it teaches the mark system the
              * records use, and the third line is the practice's whole
              * argument stated as a rule rather than as a promise. */}
            <dl className="mt-2xl border-t border-rule">
              {(
                [
                  ["filled", "Read from the source, and matched"],
                  ["flag", "Noticed, and flagged for a person"],
                  ["held", "Refused to guess, and said so"],
                ] as const
              ).map(([verdict, text]) => (
                <div key={verdict} className="flex items-baseline gap-3 border-b border-rule py-3">
                  <dt className="pt-0.5">
                    <VerdictMark verdict={verdict} />
                  </dt>
                  <dd className="text-body-sm text-muted-foreground">{text}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-7">
            <div
              role="tablist"
              aria-label="Sample records"
              className="mb-md flex flex-wrap gap-2"
            >
              {nightLog.map((item, index) => {
                const selected = index === active;
                return (
                  <button
                    key={item.tab}
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    id={`night-log-tab-${index}`}
                    aria-selected={selected}
                    aria-controls={`night-log-panel-${index}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => select(index)}
                    onKeyDown={onKeyDown}
                    className={`inline-flex min-h-11 items-center rounded-pill border px-4 text-label uppercase transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                      selected
                        ? "border-transparent bg-primary text-primary-foreground"
                        : "border-rule text-mute hover:border-mute hover:text-foreground"
                    }`}
                  >
                    {item.tab}
                  </button>
                );
              })}
            </div>

            <div
              role="tabpanel"
              id={`night-log-panel-${active}`}
              aria-labelledby={`night-log-tab-${active}`}
              tabIndex={-1}
            >
              {/* The promise this record is evidence for, in the practice's own
                * words. An h3 under the section h2 -- the heading order on this
                * page has cost the Lighthouse accessibility floor once already. */}
              <h3 className="font-display text-serif-sm text-foreground">{promise.title}</h3>
              <p className="mb-lg mt-2 max-w-[58ch] text-body-sm text-muted-foreground">
                {promise.description}
              </p>
              <Record record={record} runKey={runKey} />
            </div>

            <div className="mt-md flex flex-wrap items-center justify-between gap-md">
              <p className="max-w-[42ch] text-caption text-muted-foreground">
                Invented names, addresses and job numbers, in the same register the
                demos themselves run on.
              </p>
              <a
                href={record.demo.href}
                target="_blank"
                rel="noreferrer"
                className={ctaQuiet}
                onClick={() => ANALYTICS.demoOpened(record.demo.label)}
              >
                <span>{record.demo.label}</span>
                <ArrowMark className="transition-transform duration-default group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
