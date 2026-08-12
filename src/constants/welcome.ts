/**
 * `icon` is a union rather than `string` on purpose. It was `string`, and
 * Welcome.tsx resolved it through a lookup with a `?? Brain` fallback -- so a
 * typo here rendered the wrong glyph silently and nothing failed. Adding a key
 * to this union without adding it to `featureIcons` is now a type error.
 */
export type FeatureIcon = "phone" | "fileText" | "camera" | "checkCircle";

export interface Feature {
  icon: FeatureIcon;
  title: string;
  description: string;
  /** Live demo on a vivancedata subdomain. Only promises with a working,
   * rate-limited demo get one -- a dead or fake link here is worse than
   * none. */
  demoHref?: string;
  demoLabel?: string;
}

/**
 * The four tiles under the hero headline.
 *
 * These name the problem, not the technology. The previous set -- "AI-Powered
 * Solutions", "Data-Driven Insights", "Rapid Implementation" -- described a
 * category rather than this practice, and would have sat unchanged on any AI
 * agency's homepage. They also contradicted the page directly below them, which
 * commits to blue-collar and local services.
 *
 * An owner-operator scanning this on a phone should recognise their own week in
 * it within about four seconds. Keep these as things that go wrong on a job, in
 * the words the trade would use.
 */
export const features: Feature[] = [
  {
    icon: "phone",
    title: "Calls after you close",
    demoHref: "https://calls.vivancedata.com",
    demoLabel: "Triage a sample voicemail",
    description: "The 9pm no-heat call gets picked up, written down and booked, instead of going to voicemail and then to a competitor."
  },
  {
    icon: "fileText",
    title: "Paperwork typed twice",
    demoHref: "https://paperwork.vivancedata.com",
    demoLabel: "Extract a sample delivery slip",
    description: "Permits, submittals, invoices and delivery slips read once and turned into records, rather than re-keyed by someone who should be on site."
  },
  {
    icon: "camera",
    title: "What comes back from the field",
    demoHref: "https://field.vivancedata.com",
    demoLabel: "Match a sample field note",
    description: "Photos, signed slips and scrawled field notes matched to the right job, with the illegible ones flagged rather than guessed at."
  },
  {
    icon: "checkCircle",
    title: "Yours at the end of it",
    description: "Code, prompts and credentials transfer to you on delivery. Keep me on to run it, or run it yourself."
  }
];
