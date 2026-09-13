---
name: Vivancedata (nightshift)
description: >
  The night log: a warm near-black sheet under cream ink, structure as a 1px
  hairline grid and a dot matrix, Instrument Serif for the human voice, Geist
  Sans for prose, Geist Mono for every machine fact, and one green that means
  "a system got this right". This site consumes the `nightshift` world of
  @vivancedata/ui v0.5.0 (data-world="nightshift" on <html>, dark by default).
colors:
  # Dark is canonical in this world; the `-light` sibling is the daylight
  # counterpart. Values are HSL triplets in @vivancedata/ui, consumed as
  # hsl(var(--token)) through the Tailwind preset.
  background: "hsl(60 8% 5%)"
  background-light: "hsl(44 24% 96%)"
  foreground: "hsl(38 18% 91%)"
  foreground-light: "hsl(48 12% 9%)"
  card: "hsl(60 6% 7%)"
  card-light: "hsl(40 30% 98%)"
  popover: "hsl(60 6% 8%)"
  muted: "hsl(55 6% 11%)"
  muted-light: "hsl(44 20% 92%)"
  muted-foreground: "hsl(40 5% 66%)"
  muted-foreground-light: "hsl(45 6% 34%)"
  accent: "hsl(60 5% 12%)"
  accent-light: "hsl(44 20% 93%)"
  # The CTA pill: cream on the night sheet, ink on the paper one
  primary: "hsl(38 18% 91%)"
  primary-light: "hsl(48 12% 9%)"
  primary-foreground: "hsl(60 8% 5%)"
  primary-foreground-light: "hsl(44 24% 96%)"
  # Evidence green: the one hue, and it marks affirmative machine state only
  brand: "hsl(152 42% 58%)"
  brand-light: "hsl(152 52% 24%)"
  brand-foreground: "hsl(60 8% 5%)"
  brand-foreground-light: "hsl(44 24% 96%)"
  ring: "hsl(152 42% 58%)"
  ring-light: "hsl(152 52% 24%)"
  # Wall labels, nav links and the ledger strip: a readable tier (5.4:1 dark, 4.6:1 light)
  mute: "hsl(45 4% 52%)"
  mute-light: "hsl(45 5% 42%)"
  # Decorative only: quotation marks and separators, always aria-hidden
  faint: "hsl(45 4% 33%)"
  faint-light: "hsl(45 5% 62%)"
  # The structural material: the hairline and the dot matrix
  rule: "hsl(55 7% 14%)"
  rule-light: "hsl(42 16% 86%)"
  border: "hsl(55 7% 14%)"
  border-light: "hsl(42 16% 86%)"
  input: "hsl(55 7% 18%)"
  input-light: "hsl(42 16% 82%)"
  dot: "hsl(50 6% 31%)"
  dot-light: "hsl(45 8% 74%)"
  # Status. Warning is the `flag` verdict; destructive is form validation.
  warning: "hsl(38 78% 62%)"
  warning-light: "hsl(32 76% 38%)"
  warning-foreground: "hsl(60 8% 5%)"
  destructive: "hsl(8 72% 62%)"
  destructive-light: "hsl(8 68% 42%)"
  destructive-foreground: "hsl(60 8% 5%)"
  success: "hsl(152 42% 58%)"
  success-light: "hsl(152 52% 24%)"
  info: "hsl(194 42% 62%)"
  info-light: "hsl(200 46% 32%)"
  chart-1: "hsl(152 42% 58%)"
  chart-2: "hsl(168 34% 50%)"
  chart-3: "hsl(194 38% 56%)"
  chart-4: "hsl(38 78% 62%)"
  chart-5: "hsl(45 4% 52%)"
typography:
  # Instrument Serif, one weight, with its true italic as the emphasis mechanism
  serif-xl:
    fontFamily: "Instrument Serif, Iowan Old Style, Palatino Linotype, Palatino, Georgia, serif"
    fontSize: "clamp(2.75rem, 7vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.02em"
  serif-lg:
    fontFamily: "Instrument Serif, Iowan Old Style, Palatino Linotype, Palatino, Georgia, serif"
    fontSize: "clamp(2.125rem, 4.5vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.018em"
  serif-md:
    fontFamily: "Instrument Serif, Iowan Old Style, Palatino Linotype, Palatino, Georgia, serif"
    fontSize: "clamp(1.75rem, 3vw, 2.375rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.015em"
  serif-sm:
    fontFamily: "Instrument Serif, Iowan Old Style, Palatino Linotype, Palatino, Georgia, serif"
    fontSize: "1.375rem"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  # Geist Sans: prose
  body-lg:
    fontFamily: "Geist, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0"
  body:
    fontFamily: "Geist, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0"
  body-sm:
    fontFamily: "Geist, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: "0"
  caption:
    fontFamily: "Geist, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.333
    letterSpacing: "0"
  # Geist Mono: what the machine wrote down, and the controls that operate it
  label:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.09em"
  data:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.005em"
  code:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: "0"
  # The transactional email (src/lib/email.ts). Mail clients do not load web
  # fonts, so this is the nearest system pairing with the same character:
  # a serif for the one heading, a system sans for prose, a system mono for labels.
  email-display:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "26px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0"
  email-body:
    fontFamily: "Helvetica, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0"
  email-label:
    fontFamily: "Menlo, Consolas, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.09em"
  email-caption:
    fontFamily: "Helvetica, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0"
rounded:
  sm: "6px"
  md: "12px"
  lg: "16px"
  xl: "16px"
  2xl: "20px"
  pill-category: "64px"
  pill: "100px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "40px"
  3xl: "64px"
  4xl: "96px"
  section: "128px"
components:
  cta-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "44px"
  cta-primary-hover:
    backgroundColor: "hsl(38 18% 91% / 0.85)"
    textColor: "{colors.primary-foreground}"
  cta-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "44px"
  cta-secondary-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.foreground}"
  cta-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.brand}"
    typography: "{typography.label}"
    height: "44px"
  cta-quiet-hover:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
  wall-label:
    backgroundColor: "transparent"
    textColor: "{colors.mute}"
    typography: "{typography.label}"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.mute}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  nav-link-hover:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
  record-panel:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "0px"
    padding: "0px"
  record-row:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    typography: "{typography.data}"
    padding: "12px 24px"
  tab-rest:
    backgroundColor: "transparent"
    textColor: "{colors.mute}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "44px"
  tab-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "44px"
  input:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
    height: "44px"
  ledger-strip:
    backgroundColor: "transparent"
    textColor: "{colors.mute}"
    typography: "{typography.data}"
    padding: "14px 0"
  email-button:
    backgroundColor: "{colors.primary-light}"
    textColor: "{colors.background-light}"
    typography: "{typography.email-label}"
    rounded: "{rounded.pill}"
    padding: "13px 22px"
---

# Design System: Vivancedata

This site runs the **nightshift** world of the shared `@vivancedata/ui` package
(pinned at v0.5.0 in `package.json`). The package's own `DESIGN.md` is the
contract for the tokens; `tailwind.preset.ts` and `src/styles/globals.css` there
implement them. This file records what **this site** actually consumes, so an
agent working here does not have to read the other five apps' world to know
this one. When this file and the package disagree, one of them is wrong; fix it
in the package and re-pin.

**How the site opts in:** `data-world="nightshift"` on `<html>`, Instrument
Serif loaded as `--font-display`, and `defaultTheme="dark"`. Dark is the design;
the light block is its daylight counterpart, not a second identity.

## Overview

**Creative North Star: "The Night Log"**

A night log is the record a system leaves behind while nobody is watching: a
timestamp, a source, the mess that came in, and the fields something managed to
fill. That is this site. The sheet is a warm near-black (`background`) under
cream ink (`foreground`); the structure is a 1px hairline grid (`rule`) and a
dot matrix (`dot`); the display voice is Instrument Serif at one weight; every
machine fact (a time, a job number, an extracted value, a price, a control
label) is set in Geist Mono; and the green (`brand`) is spent only where a
system actually did something right.

The scene the dark ground was chosen from is the argument for the whole world:
an owner-operator reading on a phone at 9pm, in a truck cab or a shop office
after the lights are off. It refuses the AI-consultancy hero (gradient wash,
capability cards, logo wall) and it equally refuses the stark white platform
sheet this site used to be.

Density is quiet and ruled: 64px between bands on a phone and 96px from `md`,
hairlines instead of card edges, one measure per column set in `ch` on the
element that carries the type. Weight is not an instrument here; the serif has
one weight and the mono has two, so scale, italic and the hairline do the work
that bold does elsewhere.

**Key Characteristics:**
- Warm near-black sheet under cream ink; dark is canonical, light is its counterpart
- Nothing is a card and nothing casts a shadow; depth is a 1px `rule`
- A dot matrix as atmosphere, masked so no copy is ever set on texture
- Three faces with three jobs: Instrument Serif display, Geist Sans prose, Geist Mono facts
- Green marks affirmative machine state only; never emphasis, prices, or links in general
- Emphasis is the serif's italic; one word of a sentence turns
- Every control is a mono uppercase pill, 44px minimum
- Browser surfaces (selection, caret, scrollbar, accent) are themed by the package

## Colors

Two warm neutrals carry the page and one green appears at small scale as
evidence. Tokens are HSL triplets in CSS custom properties, consumed as
`hsl(var(--token))` through the preset, so `bg-background`, `text-mute` and
`border-rule` re-skin per world without edits. The frontmatter is normative
with the **dark column canonical**; this section names the roles.

### Primary
- **Warm near-black** (`background`, `hsl(60 8% 5%)`): the sheet. Its hue is
  pushed off neutral so it reads as a room with the lights off, not a black
  rectangle. Panels sit two points above it at `card`; that two-point step and
  a hairline are the entire depth model.
- **Cream** (`foreground`, `hsl(38 18% 91%)`): display type, filled values,
  the primary pill. Not white; white on this ground glares at 9pm.

### Secondary
- **Evidence Green** (`brand`, `hsl(152 42% 58%)`; light `hsl(152 52% 24%)`):
  the only hue in the world. The same 152 hue as the fleet's Job Ticket green;
  only lightness moved. On the home surface it appears in exactly three roles:
  the `filled` verdict mark, the mono links that open a running demo, and the
  focus ring. It is ink, never light: no glow, no large fill, no tinted panel.

### Tertiary
- **Warning amber** (`warning`, `hsl(38 78% 62%)`): the `flag` verdict mark; a
  system noticed something and handed it to a person.
- **Destructive** (`destructive`, `hsl(8 72% 62%)`): form validation messages.
  Nothing else on a marketing surface.
- **Charts** (`chart-1..5`): green, teal, cyan, amber, grey. Data only.

### Neutral
- **Prose grey** (`muted-foreground`, `hsl(40 5% 66%)`): every paragraph, lead
  and note. 8.3:1 on the sheet, because it is read in the dark.
- **Wall grey** (`mute`, `hsl(45 4% 52%)`): column heads, field names, footer
  column titles, nav links, the resting tab, and the ledger strip. **A readable
  tier in this world**: 5.4:1 on the sheet, 5.2:1 on `card`, 4.6:1 on the light
  sheet.
- **Texture grey** (`faint`, `hsl(45 4% 33%)`): the quotation marks around a
  sample input and the `/` separator in a record header. 2.6:1, and therefore
  only ever on `aria-hidden` glyphs that carry no words.
- **Hairline** (`rule`, `hsl(55 7% 14%)`): every divider, panel edge, band
  boundary and grid cell edge. `border` and `input` resolve to the same family.
- **Dot** (`dot`, `hsl(50 6% 31%)`): the radial-gradient matrix, 0.75px dots on
  a 12px pitch, judged rendered on the dark sheet.
- **Well** (`muted`, `hsl(55 6% 11%)`): the one tinted column (the recommended
  pricing tier). **Hover wash** (`accent`, `hsl(60 5% 12%)`): the secondary
  pill's hover fill. Neither is ever the green.

### Contrast constraints (measured, sRGB, WCAG 2.1, dark sheet)

| Pair | Ratio | Verdict |
|---|---|---|
| `foreground` on `background` | 16.0:1 | AAA |
| `muted-foreground` on `background` | 8.3:1 | AAA |
| `brand` on `background` | 8.9:1 | AAA |
| `mute` on `background` | 5.4:1 | AA |
| `mute` on `card` | 5.2:1 | AA |
| `mute` on `muted` (the tinted column) | 4.7:1 | AA |
| `faint` on `background` | 2.6:1 | Glyphs only, `aria-hidden` |

### Named Rules

**The Evidence Green Rule.** Green means one thing: *a machine got this right*.
A value a system read and matched, a capability a tier includes, a link that
opens one of those running systems, and the focus ring. It is not emphasis, not
a price, not a heading accent, not links in general, not an icon tint. Audit
test: if you cannot name the machine that verified the thing you just coloured,
it is not green.

**The Wall-Label Floor Rule.** `mute` carries wall labels, nav links and the
ledger strip, so it is a readable tier and must clear 4.5:1 against `background`,
`card` and the tinted `muted` column. `faint` is below that floor and is
therefore reserved for `aria-hidden` glyphs that carry no words: a quotation
mark, a separator. Any strip of text a person could read, even a decorative
one, is `mute`, because an accessibility audit does not exempt words on the
grounds that they are atmosphere.

**The Hover-Wash Rule.** `accent` is a neutral hover wash, never the green.
Putting the brand there would turn every hover on the site solid green.

## Typography

**Display font:** Instrument Serif 400 with its true italic (fallbacks: Iowan
Old Style, Palatino Linotype, Palatino, Georgia, serif)
**Body font:** Geist Sans (fallbacks: Inter, ui-sans-serif, system-ui)
**Label / data font:** Geist Mono (fallbacks: ui-monospace, SFMono-Regular, Menlo)

**Character:** three voices with three jobs, and the split is the argument of
the page. The serif is the human speaking; the sans explains; the mono is what
the machine wrote down. All three load through `next/font/google` in
`src/app/layout.tsx` and are exposed as `--font-display`, `--font-geist-sans`
and `--font-geist-mono`, which the preset maps to `font-display`, `font-sans`
and `font-mono`. The serif is loaded *with* its italic because the italic is
the emphasis mechanism, in place of a second weight the face does not have.

### Hierarchy
- **Serif XL** (400, `clamp(2.75rem, 7vw, 6rem)`, 0.98, `-0.02em`): the home
  page's one `h1`, left-set, capped at 17ch on the element itself.
- **Serif LG** (400, `clamp(2.125rem, 4.5vw, 3.5rem)`, 1.04, `-0.018em`):
  band headlines and interior page titles.
- **Serif MD** (400, `clamp(1.75rem, 3vw, 2.375rem)`, 1.1, `-0.015em`): the
  hero's second beat, the italic turn under the headline.
- **Serif SM** (400, `1.375rem`, 1.25, `-0.01em`): the wordmark in the nav and
  footer, tier names, closing lines.
- **Body LG** (Geist 400, `1.125rem`, 1.6): leads under a headline, at
  `muted-foreground`, capped 34 to 62ch. Also the first-person aside on the
  recommended pricing tier, set in the serif italic.
- **Body** (`1rem`, 1.5): the sample input in a record, capped at 52ch.
- **Body SM** (`0.875rem`, 1.43): verdict legends, footer links, form fields.
- **Caption** (`0.75rem`, 1.333): notes under a record value.
- **Label** (Geist Mono 500, `0.6875rem`, 1.2, `+0.09em`, uppercase): every
  control, column head, field name, nav link and footer column title. Never
  above a heading.
- **Data** (Geist Mono 400, `0.8125rem`, 1.5, `+0.005em`, tabular): times, job
  numbers, extracted values, the ledger strip, the contact address. The
  package sets `tabular-nums` and `calt 0` on every mono element in this world.
- **Code** (Geist Mono 400, `0.875rem`): inline and block code in resources.

Headings take `-0.015em` tracking and 1.1 line-height at the base layer; a
high-contrast serif closes up on its own at display size.

### The email
The transactional email in `src/lib/email.ts` cannot load web fonts, so it uses
the nearest system pairing with the same character: Georgia for its one 26px
heading, Helvetica/Arial for 16px prose and 12px captions, Menlo/Consolas for
11px uppercase labels at `+0.09em`. Its colours are the **light** nightshift
tokens written out as hex, because an email client has no custom properties.
It is the one surface where those faces and literals are correct.

### Named Rules

**The Italic Turn Rule.** Emphasis is the serif's italic, on one word or one
short phrase, never more than once per band. Colouring the emphasis green is
the obvious move and the wrong one. Bold does not exist here.

**The Mono-Is-Machine Rule.** Geist Mono is for things a machine produced or a
machine operator types. A sentence a person would speak is set in the sans or
the serif. Mono on a human sentence is costume.

**The Measure-On-The-Type Rule.** `ch` resolves against the element's own font,
so every measure cap (`max-w-[52ch]`, `max-w-[17ch]`) goes on the element that
carries the type, never on a wrapper.

**The Ramp Rule.** Every size is a named step from the preset (`text-serif-*`,
`text-body*`, `text-label`, `text-data`, `text-caption`). An arbitrary
`text-[…]` value is only ever a step restated (the wordmark's `1.375rem` is
`serif-sm`); a size between steps is a defect.

## Layout

The spatial model is a ruled sheet, not a stack of panels. Every band is a
full-bleed `section.bleed` separated from the next by `border-t border-rule`;
inside it the standard centred `container` with 16px side padding (`px-4`)
carries a 12-column grid from `lg`. Bands run `py-3xl` (64px) on a phone and
`py-4xl` (96px) from `md`. Spacing is the 4px scale in the frontmatter;
breakpoints are Tailwind's defaults with the container capped at 1400px.

Structure is expressed as hairlines rather than containers: lists take
`border-t` on the parent and `border-b` per row; grids let cells borrow their
neighbours' edges so no line is ever doubled; the pricing comparison is one
grid ruled on every cell rather than three cards.

**The Bleed-Pair Rule.** `.bleed` (`margin-inline: -1rem`) cancels the app
shell's `px-4` so a band's rules and dot fields reach the viewport edge. They
are a pair and must move together; change one without the other and every
band rule stops 16px short, which reads as a stack of wide cards.

The dot matrix occupies the half of a viewport the type leaves empty (42 to
50% width, right-aligned, `-z-10`, `lg` and up), behind a vertical hairline
where it needs something to stand on. It is masked top and bottom
(`.field-dots-fade`) so no copy is ever set on texture, and it is `aria-hidden`.

## Elevation & Depth

**There is no elevation in this world.** Nothing is a card and nothing casts a
shadow. Depth is a 1px `rule` and a two-point tonal step from `background` to
`card`; everything sits on the same sheet. The package's `--shadow-1` and
`--shadow-2` are defined so shared components resolve, but no nightshift
surface uses them, and the package's `.hero-mesh` flourish is disabled here.
The nav floats on `bg-background/85` with `backdrop-blur-md` (70% where
`backdrop-filter` is supported); that translucency is the only thing that
reads as depth.

### Named Rules

**The Hairline-Only Rule.** A panel is bounded by `border-rule` on all four
edges, or it is not a panel. No shadow, no glow, no lift on hover.

**The Bounded Tint Rule.** The one filled surface on the page, the recommended
pricing column at `bg-muted`, is closed by a rule on every edge including the
final CTA row. A tint is a region of a ruled sheet, never a floating object.

## Shapes

Two shapes and one drawn mark set.

| Form | Value | Use |
|---|---|---|
| Pill | `100px` (`rounded-pill`) | Every control: primary, secondary, tab, demo link |
| Tight square | `6px` (`rounded-sm`) | Inputs, icon buttons, nav links, focus targets |
| Square | `0px` | Record panels, grid cells, bands: everything structural |

Panels and grid cells have no radius; a ruled sheet has corners. Borders are
always 1px and always `rule`. Focus is a 2px `ring` (`brand`) offset 2px,
stated at the base layer so it applies to anything focusable.

**Marks.** The site draws its own small marks (`src/components/common/marks`)
rather than pulling verdicts from the icon library, because at 12 to 14px the
library's 2px stroke fills in. One grammar: square viewBox, 1.25 to 1.5px
stroke, round caps and joins, `currentColor` throughout. The set is one arrow
(every control that goes somewhere) and four verdicts: `filled` (check,
`brand`), `flag` (triangle, `warning`), `held` (circle-minus, `foreground`),
`absent` (a dash, `mute`). Lucide is used at 1.5px stroke for the nav's search
icon and the footer's social marks only.

**The Dash-Not-Cross Rule.** Absence is a dash, not a cross. A red X on a
cheaper tier scolds the reader for reading the cheaper column.

## Components

Controls feel like the buttons on a machine: mono, uppercase, pill-shaped, and
quiet until touched. Every state change is a colour transition over
`duration-fast` (150ms). Nothing lifts, scales or glows. Minimum height is
44px everywhere; the audience is on a phone in a truck cab. The class strings
live in `src/components/common/controls.ts`.

### Buttons
- **Shape:** pill, uppercase Label type, 20px horizontal padding, 44px floor.
- **Primary (`ctaPrimary`):** cream fill (`primary`) with sheet-coloured text;
  hover drops to 85%. One per band at most.
- **Secondary (`ctaSecondary`):** transparent with a `rule` hairline; hover
  raises the border to `mute` and takes the `accent` wash.
- **Quiet (`ctaQuiet`):** no container. Mono uppercase `brand` text with the
  arrow mark, which slides 2px on hover; hover moves the text to `foreground`.
  Only legitimate when the link opens a running system.
- **Focus:** 2px `ring`, 2px offset, offset colour `background`.

### Record panel (signature)
The night log's record (`NightLog.tsx`): a `card`-filled rectangle bounded by
`rule`, square-cornered, with a mono header row (timestamp, a `faint` `/`, the
source in `mute`, and a wall label on the right), a quoted sample input in
prose grey capped at 52ch, and a definition list of extracted fields divided by
`divide-rule`. Field names are wall labels in an 8rem column; values are mono
Data in `foreground` preceded by a verdict mark; notes sit under a value in
Caption. The `held` verdict is styled as prominently as `filled`: a system that
refuses to guess is the evidence.

### Tabs
Pills, not a well. Resting: `rule` hairline, `mute` label; hover to `mute`
border and `foreground` text. Selected: `primary` fill, transparent border.
Roving tabindex, and selecting re-fires the panel's settle animation.

### Inputs / Fields
6px square, 1px `input` hairline, sheet-coloured fill (`background`, not
`card`, so a field reads as cut into the sheet), 44px tall, label above in
uppercase Label at `mute`. Placeholder is `mute` by the package's base rule.
Error state swaps the border and ring to `destructive` and prints the message
in Body SM `destructive` below.

### Navigation
Sticky, 64px, `border-b border-rule`, over the translucent sheet. Links are
uppercase Label at `mute`, moving to `foreground` on hover; no wash, no
underline, no dropdown chrome. The wordmark is Serif SM beside a 28px logo
mark. The nav's one control is the primary pill; a 44px square icon button
opens search. Mobile collapses to the same tokens in a sheet.

### Footer
Same hairline grid: column titles are wall labels, links are Body SM prose grey
moving to `foreground`. The contact address is mono Data at `foreground`,
underlined with `decoration-rule` at a 4px offset, not green, because an email
address is not a running system. Social marks are 44px icon squares at `mute`.

### Ledger strip (signature)
A full-width band of mono paperwork marks (RFI numbers, delivery notes, permit
codes) between two rules, 14px of padding, drifting horizontally as texture. It
is `aria-hidden`, duplicated once so the loop closes seamlessly, and paused by
an IntersectionObserver when it leaves the viewport. It is set in `mute`, not
`faint`: the marks are words, and words on the page clear 4.5:1 whether or not
a screen reader is told to skip them.

### Motion
One authored moment and one ambient drift.
- **`.settle`** (620ms, `cubic-bezier(0.16, 1, 0.3, 1)`): machine-filled
  values settle into place, opacity 0.32 to 1, a 3px rise, 2px blur to none,
  staggered 70ms per row. It animates from an already-visible default and
  re-fires on tab selection.
- **`.drift`** (90s linear, infinite): the ledger strip only.
- `prefers-reduced-motion: reduce` kills both outright, and `MotionProvider`
  respects the same preference for any Framer Motion entrance.

## Do's and Don'ts

### Do:
- **Do** build structure out of `border-rule` hairlines and let cells borrow
  neighbours' edges.
- **Do** spend `brand` only on affirmative machine state: a filled value, an
  included capability, a link that opens a running system, the focus ring.
- **Do** carry emphasis with the serif's italic, on one word or phrase, once
  per band.
- **Do** set every machine fact in Geist Mono with tabular figures, and every
  human sentence in the sans or the serif.
- **Do** put measure caps in `ch` on the element that carries the type.
- **Do** keep every control at a 44px minimum height.
- **Do** keep `.bleed`'s `-1rem` and the app shell's `px-4` in step.
- **Do** set any readable text, decorative or not, in `mute` or darker-on-light;
  `faint` is for wordless glyphs.

### Don't:
- **Don't** put the green on emphasis, prices, headings, icons or links in
  general. If no machine verified it, it is not green.
- **Don't** add a card, a shadow, a hover lift or a rounded panel.
- **Don't** set words in `faint` (2.6:1), even in an `aria-hidden` strip.
- **Don't** put an eyebrow or kicker above a heading. The uppercase mono label
  is a column head or a field name, never a stacked pre-title.
- **Don't** use bold, a second display weight, or a library glyph in place of
  the drawn verdict marks.
- **Don't** pick a size between the ramp's steps with `text-[…]`.
- **Don't** carry a nightshift token into another app in the workspace.
