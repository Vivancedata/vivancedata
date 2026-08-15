/**
 * The live demos on vivancedata subdomains, each deployed, rate-limited and
 * fed only fictional sample data. Every surface that links a demo references
 * it from here, so retiring or rewording one is a one-line change. Nothing
 * gets an entry until it is actually deployed -- a dead or fake link is worse
 * than none.
 */
export interface Demo {
  href: string;
  label: string;
}

export const demos = {
  calls: {
    href: "https://calls.vivancedata.com",
    label: "Triage a sample voicemail",
  },
  paperwork: {
    href: "https://paperwork.vivancedata.com",
    label: "Extract a sample delivery slip",
  },
  field: {
    href: "https://field.vivancedata.com",
    label: "Match a sample field note",
  },
} as const satisfies Record<string, Demo>;
