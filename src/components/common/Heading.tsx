// Re-export from the design system. The local implementation this replaces
// hardcoded `text-3xl font-bold tracking-tight`, bypassing the DESIGN.md type
// ladder the package's Heading renders. Call sites that pass explicit size
// classes keep their look (caller classes win in cn()); sites without them
// move onto the ladder, which is the point.
export { Heading, headingVariants, type HeadingProps } from "@vivancedata/ui";
