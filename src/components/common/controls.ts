/**
 * The control vocabulary of the `nightshift` world.
 *
 * Every control on this site is a pill with a Geist Mono uppercase label. That
 * is not decoration: the page's whole argument is that a machine is doing a
 * clerical job, and mono is the voice both the machine and the person operating
 * it write in. Sentence-case sans controls read as marketing furniture beside
 * the records they sit under.
 *
 * Heights are 44px and up. That is the hit-target floor, and this audience is
 * on a phone in a truck, not a mouse at a desk.
 *
 * These are class strings rather than a component because the call sites are
 * `<a>`, `<button>` and shadcn `<Button asChild>` in roughly equal measure, and
 * wrapping all three costs more than it saves.
 */

const base =
  "inline-flex min-h-11 shrink-0 items-center justify-center gap-2.5 rounded-pill px-5 text-label uppercase transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/** The cream pill. One per band, at most — it marks the only thing to do next. */
export const ctaPrimary = `${base} bg-primary text-primary-foreground hover:bg-primary/85`;

/** The hairline pill. Everything that is a real alternative, not a fallback. */
export const ctaSecondary = `${base} border border-rule bg-transparent text-foreground hover:border-mute hover:bg-accent`;

/**
 * The inline mono link with a trailing rule. Used where a control would be too
 * loud for what it does — a demo link inside a record, a "see all" beside a
 * heading.
 */
export const ctaQuiet =
  "group inline-flex min-h-11 items-center gap-2 text-label uppercase text-brand transition-colors duration-fast hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/** The wall label: a mono column head or a field name. Never above a heading. */
export const wallLabel = "text-label uppercase text-mute";
