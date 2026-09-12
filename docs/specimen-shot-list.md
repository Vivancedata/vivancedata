# Specimen shot list

Four photographs. An afternoon, and about $60 of stationery.

This is the site's whole image system. Until these exist, the industry heroes
run as type only — which is deliberate and reads as finished, so there is no
deadline here and nothing is broken while the folder is empty.

## Why photographs and not anything else

The practice is pre-first-client. That rules out three of the four obvious
options and leaves one:

- **Stock photography** depicts work that did not happen. It is the same
  species of claim as the invented testimonials that were removed from this
  site, and an owner-operator identifies it on sight.
- **Photographing a real job site** is the same fabrication with a bigger
  budget, because the site would not be a client's.
- **Drawing the documents as vector art** produces a mockup. That is worse than
  no image: a wireframe pretending to be evidence, on pages arguing that this
  practice flags what it cannot read instead of guessing at it.
- **Photographing real paper you filled in yourself** is none of those. The
  paper is real, the photograph is real, and the data on it is invented in
  exactly the register the three live demos already run on and already declare.

That last point is the whole reason this works, so it has to stay true. Every
figure carries a `Sample` wall label, the same one the night-log records use.

## What to buy

Any stationer, roughly $60 the lot:

- A carbonless **delivery / docket book** (the duplicate kind with a yellow copy)
- A **message pad** — the "While You Were Out" sort, or any lined pad
- A **clipboard** and a pad of ruled paper for the QC sheet
- A **manila folder** or two, for the submittal
- A ballpoint that skips slightly, and a blunt pencil

Do not buy anything that looks new and expensive. Paper that has been in a van
is the point.

## How to shoot all four

Same setup each time, so the four read as one series:

- **Ground:** a dark surface. A desk, a closed laptop, a black jacket. It does
  not need to be black — near-black and warm is better than pure black.
- **Light:** one source, off to one side. A desk lamp or a window at an angle.
  Not overhead, not a flash. You want the paper to look lit rather than scanned.
- **Angle:** slightly off square. A few degrees of rotation and a little
  perspective. A perfectly rectangular, perfectly flat document reads as a scan,
  and a scan reads as a mockup.
- **Fill the frame.** This is the one that is easy to get wrong. The paper
  should reach the edges or bleed off them. A document floating in the middle of
  a large dark border loses the composition entirely — the dark ground is
  already supplied by the page.
- **Landscape**, roughly 4:3. Shoot at the phone's full resolution; it gets
  resized on the way in.
- **Leave the flaws in.** The crease, the coffee ring, the thumbprint, the
  correction, the signature nobody can read. Do not tidy, do not straighten, do
  not retouch. The flaws are the argument — they are what the system has to cope
  with, and no competitor will show them.

## The four

Fill each one in by hand, using the invented data below. It matches what is
already in `src/constants/nightLog.ts` and on the live demos, so a reader who
clicks through sees the same fictional world.

### 1. `construction.jpg` — a submittal transmittal

A subcontractor's transmittal, first page, in or beside a manila folder.

Write on it: a company name at the top, **spec section `03 21 00`**, a revision
number, a date, and a "Reviewed / Reviewed as noted / Revise and resubmit" row
with one box ticked. A stamp-shaped rectangle drawn by hand in the corner is
fine and looks right.

### 2. `hvac-trades.jpg` — an after-hours message

A message pad beside a phone, shot at 22:41-ish so the light looks late.

Write on it: **`22:41`**, "no heat", a phone number with one digit overwritten,
and the road name spelled two different ways on the same page — that ambiguity
is the whole point of the caption, so it has to be visible.

### 3. `logistics.jpg` — a delivery slip

A docket from the duplicate book, creased from a pocket.

Write on it: **`DR-88301`**, `KEMBROOK AGGREGATES`, `16 BDL 3/4 CLEAN`,
`GROSS 24,910`, `TARE 12,430`, and a received-by signature that is genuinely
illegible. Fold it in quarters first and then flatten it out.

### 4. `manufacturing.jpg` — a QC check sheet

A shift check sheet on the clipboard.

Write on it: a column of five-bar-gate tallies, two crossed-out corrections,
initials in a couple of boxes, and **one box left empty**. The empty box is the
exception the system would flag, so do not fill it in.

## Getting them in

Save each as `public/images/specimens/<slug>.jpg` — the slugs are exactly
`construction`, `hvac-trades`, `logistics`, `manufacturing`.

Resize before committing, so the repo does not carry a 6MB phone original:

```bash
sips -Z 1600 ~/Desktop/slip.jpg --out public/images/specimens/logistics.jpg
```

That is the entire wiring. `src/constants/specimens.ts` checks the filesystem at
build time, so a file appearing is the only signal needed — no config, no
import, nothing to register. Drop one in, run `npm run dev`, and the figure is
on the page.

Aim for **under about 250KB each** after resizing. They sit above the fold on
the four routes search traffic lands on, and the Lighthouse performance floor in
CI is 99.

## Changing the words

The label and caption for each live in `src/constants/specimens.ts`. The caption
is also the `alt` text — deliberately one sentence used twice, because writing
them separately produces two descriptions that drift apart, and the caption
written for a sighted reader is almost always the better sentence.

If a photograph ends up showing something different from what its caption
claims, change the caption. The caption describing the photograph is the part
that has to stay true.
