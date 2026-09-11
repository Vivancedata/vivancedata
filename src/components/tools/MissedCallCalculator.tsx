"use client";

import { useMemo, useState } from "react";
import { ArrowMark } from "@/components/common/Marks";
import { ctaPrimary, ctaQuiet, wallLabel } from "@/components/common/controls";
import { calculateMissedCallCost } from "@/lib/missedCallModel";
import { demos } from "@/constants/demos";
import { ANALYTICS } from "@/lib/analytics";

/**
 * Three questions and a number.
 *
 * It answers live rather than behind a Calculate button: there are three inputs
 * and the arithmetic is trivial, so making someone click to see it would be
 * ceremony. The sum is printed under the answer on purpose — the whole claim of
 * this page is that the figure is the reader's own arithmetic, and a number you
 * cannot check is a number you have to take on trust, which is what the rest of
 * this site refuses to ask for.
 */

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

interface FieldProps {
  id: string;
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  prefix?: string;
  onChange: (value: number) => void;
}

function Field({ id, label, hint, value, min, max, step, suffix, prefix, onChange }: FieldProps) {
  return (
    <div className="border-b border-rule py-lg">
      <label htmlFor={id} className={`${wallLabel} block`}>
        {label}
      </label>
      <div className="mt-3 flex items-baseline gap-2">
        {prefix ? <span className="font-mono text-data text-mute">{prefix}</span> : null}
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          step={step}
          value={Number.isFinite(value) ? value : 0}
          onChange={(event) => onChange(event.target.valueAsNumber)}
          className="w-32 min-h-11 border-b border-input bg-transparent font-display text-serif-sm text-foreground focus-visible:border-brand focus-visible:outline-none"
        />
        {suffix ? <span className="text-body-sm text-mute">{suffix}</span> : null}
      </div>
      <p className="mt-2 max-w-[52ch] text-caption text-muted-foreground">{hint}</p>
    </div>
  );
}

export function MissedCallCalculator() {
  const [missedCallsPerWeek, setCalls] = useState(6);
  const [averageJobValue, setJobValue] = useState(450);
  const [bookingSharePercent, setShare] = useState(35);

  const results = useMemo(
    () => calculateMissedCallCost({ missedCallsPerWeek, averageJobValue, bookingSharePercent }),
    [missedCallsPerWeek, averageJobValue, bookingSharePercent]
  );

  const hasAnswer = results.revenueLostPerYear > 0;

  return (
    <div className="grid grid-cols-1 gap-2xl lg:grid-cols-12 lg:gap-xl">
      <div className="lg:col-span-6">
        <div className="border-t border-rule">
          <Field
            id="missed-calls"
            label="Calls a week nobody picks up"
            hint="Outside hours, at lunch, on a roof. If you do not know, this is the number worth counting for one week — the rest of this page is guesswork without it."
            value={missedCallsPerWeek}
            min={0}
            max={200}
            step={1}
            suffix="calls a week"
            onChange={setCalls}
          />
          <Field
            id="job-value"
            label="What an average job is worth"
            hint="The whole job, not the call-out fee. Use what you would invoice, before parts if that is how you think about it."
            value={averageJobValue}
            min={0}
            max={100000}
            step={50}
            prefix="$"
            onChange={setJobValue}
          />
          <Field
            id="booking-share"
            label="How many of those would have booked"
            hint="Your guess, and it is the number the whole answer swings on. Nobody knows this one, which is why the result below is a range rather than a figure."
            value={bookingSharePercent}
            min={0}
            max={100}
            step={5}
            suffix="out of every hundred"
            onChange={setShare}
          />
        </div>
      </div>

      <div className="lg:col-span-6">
        <div className="border border-rule bg-card p-lg md:p-xl">
          <p className={wallLabel}>Your arithmetic</p>

          {hasAnswer ? (
            <>
              <p className="mt-lg font-display text-serif-lg text-foreground">
                {currency.format(results.revenueLostPerYear)}
                <span className="ml-2 text-body-lg text-mute">a year</span>
              </p>
              <p className="mt-2 font-mono text-data text-muted-foreground">
                somewhere between {currency.format(results.revenueLostLow)} and{" "}
                {currency.format(results.revenueLostHigh)}
              </p>

              {/* The sum, printed. The claim of this page is that the number is
                * the reader's own arithmetic; a figure they cannot check is one
                * they have to take on trust. */}
              <dl className="mt-xl border-t border-rule">
                {[
                  ["Calls a year", `${missedCallsPerWeek} × 52 = ${missedCallsPerWeek * 52}`],
                  ["Of those, booked", `${bookingSharePercent}% = ${results.jobsLostPerYear} jobs`],
                  ["At", `${currency.format(averageJobValue)} a job`],
                  ["A month", currency.format(results.revenueLostPerMonth)],
                ].map(([term, detail]) => (
                  <div
                    key={term}
                    className="flex items-baseline justify-between gap-md border-b border-rule py-2.5"
                  >
                    <dt className={wallLabel}>{term}</dt>
                    <dd className="font-mono text-data text-foreground">{detail}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-lg max-w-[46ch] text-caption text-muted-foreground">
                This is your three numbers multiplied together. It is not a
                benchmark, it is not from anybody else&apos;s data, and the only
                one of the three I can help you check is the first.
              </p>
            </>
          ) : (
            <p className="mt-lg max-w-[46ch] text-body text-muted-foreground">
              Put a number in all three and the answer appears here.
            </p>
          )}

          <div className="mt-xl flex flex-col gap-md border-t border-rule pt-lg sm:flex-row sm:items-center">
            <a href="/contact" className={ctaPrimary}>
              <span>Book a call</span>
              <ArrowMark />
            </a>
            <a
              href={demos.calls.href}
              target="_blank"
              rel="noreferrer"
              className={ctaQuiet}
              onClick={() => ANALYTICS.demoOpened(demos.calls.label)}
            >
              <span>See one triaged</span>
              <ArrowMark className="transition-transform duration-default group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
