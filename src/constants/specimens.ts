import fs from "node:fs";
import path from "node:path";

/**
 * The specimens: photographs of the paperwork a build actually starts from.
 *
 * This is the site's image system, and it is deliberately narrow. The practice
 * is pre-first-client, so it cannot photograph a customer's site, and a stock
 * photograph of a hard hat is the same species of claim as the invented
 * testimonials PRODUCT.md exists to keep off this site — it depicts work that
 * did not happen.
 *
 * What it can honestly show is the *material*: a delivery slip, a submittal
 * transmittal, a voicemail, a QC sheet. Filled out by hand with the same
 * invented data the three live demos run on, photographed on a dark surface.
 * That is not a claim about a client. It is the identical synthetic register
 * the site already declares everywhere else, and it is why this is available
 * pre-first-client when every other imagery option is not.
 *
 * **The flaws are the point.** The crease, the smudge, the thumbprint, the
 * signature nobody can read. A too-clean render reads as a mockup, which is
 * worse than no image at all — it is a wireframe pretending to be evidence on
 * a page that argues this practice does not guess. Photograph real paper.
 *
 * Nothing renders until a real file exists. `specimenFor` returns null when the
 * file is absent, and the hero simply omits the figure, which is what
 * `/partners` already does and it reads as finished rather than broken.
 */
export interface Specimen {
  /** Public path, relative to `public/`. */
  readonly src: string;
  /** The mono wall label above the figure. Names the document, not the trade. */
  readonly label: string;
  /**
   * What a reader is looking at, and what the system takes off it. One
   * sentence. Doubles as the accessible description, so it has to make sense
   * read aloud with no image.
   */
  readonly caption: string;
}

const SPECIMEN_DIR = "images/specimens";

/**
 * Keyed by industry slug. Adding a trade means adding an entry and a file;
 * the entry alone renders nothing.
 */
export const specimens: Readonly<Record<string, Specimen>> = {
  construction: {
    src: `${SPECIMEN_DIR}/construction.jpg`,
    label: "Sample — submittal transmittal",
    caption:
      "A submittal transmittal as it arrives: a subcontractor's letterhead, spec section 03 21 00, a revision stamp, and a date somebody has to key into the project system by hand.",
  },
  "hvac-trades": {
    src: `${SPECIMEN_DIR}/hvac-trades.jpg`,
    label: "Sample — after-hours message",
    caption:
      "A message pad beside the phone at 22:41. No heat, a number half-written, and the road name spelled two different ways on the same page.",
  },
  logistics: {
    src: `${SPECIMEN_DIR}/logistics.jpg`,
    label: "Sample — delivery slip",
    caption:
      "A delivery slip after a day in a cab: docket DR-88301, sixteen bundles, gross 24,910 against tare 12,430, and a signature nobody is going to read back.",
  },
  manufacturing: {
    src: `${SPECIMEN_DIR}/manufacturing.jpg`,
    label: "Sample — QC check sheet",
    caption:
      "A shift's QC check sheet on a clipboard: a column of tallies, two corrections, and one box the operator left empty.",
  },
};

/**
 * The guard. Returns the specimen only when its file is actually on disk.
 *
 * Server-side only — it reads the filesystem at build time, in the same way
 * `blogPosts.ts` treats the filesystem as the source of truth. That keeps the
 * manifest and reality from drifting: a specimen cannot be "configured" into
 * existence, and a missing photograph degrades to no figure rather than to a
 * broken image or an empty frame.
 */
export function specimenFor(slug: string): Specimen | null {
  const specimen = specimens[slug];
  if (!specimen) return null;

  const filePath = path.join(process.cwd(), "public", specimen.src);
  return fs.existsSync(filePath) ? specimen : null;
}
