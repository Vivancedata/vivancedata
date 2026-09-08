import { demos, type Demo } from "./demos";
import { features, type FeatureIcon } from "./welcome";

/**
 * The three records the homepage opens with.
 *
 * This practice is pre-first-client. It has no testimonials, no named case
 * studies and no outcome figures, and PRODUCT.md forbids inventing any of them.
 * What it does have is three deployed demos running on fictional sample data —
 * `calls.`, `paperwork.` and `field.` — and those are the only real proof on the
 * site. So the page opens with what those systems actually return rather than
 * with a claim about them.
 *
 * Everything here is SYNTHETIC, in the same register as the demos' own sample
 * data: invented names, invented addresses, invented job numbers. That is stated
 * on the page, in the record footer, not buried here. Nothing in this file may
 * become a real client, a real address or a real figure without the written
 * agreement PRODUCT.md requires.
 *
 * The four promises that used to sit under the hero as icon-and-text tiles now
 * live here instead of being restated: three of them describe exactly these
 * three systems, so each record carries its own promise verbatim from
 * `welcome.ts` rather than paraphrasing it a second time on the same page. The
 * fourth ("Yours at the end of it") has no system to show and is already the
 * fifth step of the engagement and one of the three commitments under the
 * industry grid, so it is not duplicated here either.
 *
 * `fields[].verdict` is what earns the green. `filled` means a system read it
 * off the source and got it right; `flag` means it noticed something wrong and
 * said so; `held` means it refused to guess. The third one is the point of the
 * whole page — a system that flags an illegible word instead of inventing one is
 * the difference between this and a demo — so it is styled as prominently as
 * the successes rather than as an error state.
 */
export type FieldVerdict = "filled" | "flag" | "held" | "plain";

export interface LogField {
  label: string;
  value: string;
  verdict: FieldVerdict;
  /** Rendered under the value, in the muted tier. Keep to one short clause. */
  note?: string;
}

export interface LogRecord {
  /** The tab label. Mono, uppercase, short enough for a 390px viewport. */
  tab: string;
  /** The promise this record is evidence for, named in `welcome.ts`. */
  promise: FeatureIcon;
  /** The source the system was handed, named the way the trade names it. */
  source: string;
  /** Wall-clock stamp. Fictional, and deliberately outside office hours. */
  stamp: string;
  /** A line of the raw input, quoted, so the reader sees what went in. */
  input: string;
  fields: LogField[];
  demo: Demo;
}

export const nightLog: LogRecord[] = [
  {
    tab: "Call",
    promise: "phone",
    source: "Voicemail · 41s",
    stamp: "22:41",
    input:
      "…there's no heat at all, the whole upstairs, and they're saying it drops below freezing tonight. Anyway. Call me back.",
    fields: [
      {
        label: "Caller",
        value: "Marisol Reyes",
        verdict: "filled",
        note: "Matched to an existing account on the number alone",
      },
      { label: "Address", value: "118 Harlow Ave", verdict: "filled", note: "Carried from last year's install" },
      { label: "Fault", value: "No heat, occupied home", verdict: "filled" },
      { label: "Urgency", value: "Overnight", verdict: "flag", note: "Freezing forecast; escalated above the morning queue" },
      { label: "Booked", value: "Tue 06:30", verdict: "filled", note: "First slot, confirmed back by text at 22:42" },
    ],
    demo: demos.calls,
  },
  {
    tab: "Paperwork",
    promise: "fileText",
    source: "Delivery slip · photographed",
    stamp: "07:12",
    input: "DR-88301 — KEMBROOK AGGREGATES — 16 BDL 3/4 CLEAN — GROSS 24,910 / TARE 12,430",
    fields: [
      { label: "Supplier", value: "Kembrook Aggregates", verdict: "filled" },
      { label: "Against PO", value: "PO-2291-B", verdict: "filled", note: "Matched on supplier and date, not on a barcode" },
      { label: "Net weight", value: "12,480 lb", verdict: "filled" },
      {
        label: "Count",
        value: "14 of 16 bundles",
        verdict: "flag",
        note: "Two short of the order. Held for someone to look at before it posts",
      },
      { label: "Signature", value: "Present, unreadable", verdict: "held", note: "Not matched to a name — the slip does not support it" },
    ],
    demo: demos.paperwork,
  },
  {
    tab: "Field note",
    promise: "camera",
    source: "Photo · IMG_4471.jpg",
    stamp: "17:56",
    input: "riser clash at gridline C — held pending arch — see mk?? on sleeve",
    fields: [
      { label: "Crew", value: "D. Okafor", verdict: "filled" },
      { label: "Job", value: "Level 3 mechanical riser", verdict: "filled" },
      { label: "Attached to", value: "RFI-0412", verdict: "filled", note: "The open RFI on that gridline, not a new one" },
      { label: "Status read", value: "Held pending architect", verdict: "filled" },
      {
        label: "One word",
        value: "Not read",
        verdict: "held",
        note: "“mk??” is illegible in the photo. Flagged for a human rather than guessed at",
      },
    ],
    demo: demos.field,
  },
];

/**
 * The promise a record is evidence for, resolved once so the copy has a single
 * home. A record naming an icon `welcome.ts` does not is a type error, not a
 * silent blank.
 */
export function promiseFor(icon: FeatureIcon) {
  const feature = features.find((entry) => entry.icon === icon);
  if (!feature) {
    throw new Error(`nightLog references an unknown promise: ${icon}`);
  }
  return { title: feature.title, description: feature.description };
}

/**
 * The drifting strip under the log. These are the identifiers this work is made
 * of — the things that get typed twice — set as material rather than as data.
 * Decorative and `aria-hidden`; nothing here is readable content.
 */
export const ledgerMarks = [
  "RFI-0412",
  "22:41",
  "PO-2291-B",
  "DR-88301",
  "SUBMITTAL 03-21",
  "07:12",
  "IMG_4471",
  "WO-5518",
  "12,480 lb",
  "NO HEAT",
  "PERMIT B-2209",
  "17:56",
  "BOL-77204",
  "GRIDLINE C",
  "TICKET 4412",
  "06:30",
];
