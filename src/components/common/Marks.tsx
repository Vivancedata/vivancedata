/**
 * The drawn marks of the `nightshift` world.
 *
 * One grammar: a square viewBox, 1.25–1.5px stroke, round caps and joins, and
 * `currentColor` throughout so a mark inherits the tier of the text it sits in.
 * They are here rather than pulled from the icon library because at 12–14px the
 * library's 2px stroke fills in, and because the three verdicts have to read as
 * one family — a library check beside a library alert does not.
 */

/** The one arrow on the site. Every control that goes somewhere uses it. */
export function ArrowMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`h-3.5 w-3.5 shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 8h11" />
      <path d="M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

/** The check, shared by the machine verdict and the neutral list mark below. */
const CHECK_PATH = "M2 6.4 4.8 9.2 10 3.4";

/** Absence is a rule, not a cross — see the note in `VerdictMark`. */
const DASH_PATH = "M2.4 6h7.2";

/**
 * The mark for an ordinary list — what a tier includes, what a page promises.
 *
 * It is deliberately NOT green, and that is the whole point of it existing.
 * Green means one thing on this site: a machine read something and got it
 * right. `VerdictMark verdict="filled"` used to draw every marketing bullet
 * too, which meant a reader met roughly forty green checks attached to claims
 * no machine had verified before reaching the three in the night log that were
 * the entire argument. The colour arrived already spent.
 *
 * So: if a person is asserting it, it is a `ListMark`. If a machine decided it,
 * it is a `VerdictMark`. The split is enforced by having two names.
 */
export function ListMark({
  included = true,
  label,
  className = "",
}: {
  included?: boolean;
  label?: string;
  className?: string;
}) {
  const decorative = label === "";

  return (
    <svg
      viewBox="0 0 12 12"
      className={`h-3 w-3 shrink-0 text-mute ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...(decorative
        ? { "aria-hidden": true as const }
        : { role: "img", "aria-label": label ?? (included ? "Included" : "Not included") })}
    >
      <path d={included ? CHECK_PATH : DASH_PATH} />
    </svg>
  );
}

export type Verdict = "filled" | "flag" | "held" | "absent" | "plain";

const verdictMeta: Record<Verdict, { className: string; label: string } | null> = {
  filled: { className: "text-brand", label: "Read from the source and matched" },
  flag: { className: "text-warning", label: "Noticed and flagged for a person" },
  held: { className: "text-foreground", label: "Refused to guess" },
  absent: { className: "text-mute", label: "Not included" },
  plain: null,
};

/**
 * `label` overrides the default accessible name — the same check means "matched
 * it" in a record and "included" in the price table, and a screen reader should
 * hear the one that fits. Pass `label=""` where the mark is purely decorative
 * because the sentence beside it already says everything; that renders it
 * hidden rather than announcing an empty image.
 */
export function VerdictMark({
  verdict,
  label,
  className = "",
}: {
  verdict: Verdict;
  label?: string;
  className?: string;
}) {
  const meta = verdictMeta[verdict];
  if (!meta) return <span className={`block h-3 w-3 ${className}`} aria-hidden="true" />;

  const decorative = label === "";

  return (
    <svg
      viewBox="0 0 12 12"
      className={`h-3 w-3 shrink-0 ${meta.className} ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...(decorative
        ? { "aria-hidden": true as const }
        : { role: "img", "aria-label": label ?? meta.label })}
    >
      {verdict === "filled" && <path d={CHECK_PATH} />}
      {verdict === "flag" && (
        <>
          <path d="M6 1.6 11 10.4H1z" />
          <path d="M6 5v2.1" />
          <path d="M6 9h.01" />
        </>
      )}
      {verdict === "held" && (
        <>
          <circle cx="6" cy="6" r="4.6" />
          <path d="M3.6 6h4.8" />
        </>
      )}
      {/* Absence is a rule, not a cross. A red X on a cheaper tier scolds the
        * reader for reading the cheaper column; a dash just says "not this one". */}
      {verdict === "absent" && <path d={DASH_PATH} />}
    </svg>
  );
}
