// Re-export from the design system. The local implementation hardcoded
// `text-base leading-7 text-muted-foreground`; the package Paragraph renders
// the DESIGN.md body ladder with the same muted-by-default colour. Callers
// passing explicit sizes (text-lg etc.) keep their look until converted.
export { Paragraph, paragraphVariants, type ParagraphProps } from "@vivancedata/ui";
