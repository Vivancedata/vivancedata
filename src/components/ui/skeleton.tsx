"use client"

// `use client` here is a bundle boundary, not a runtime choice: Skeleton is a
// plain div and renders identically on either side. The root `loading.tsx` is
// a server file, and a server file re-exporting from the @vivancedata/ui barrel
// makes Next register every client component in that barrel as client code for
// the route (see layout/ThemeProvider.tsx for the mechanism). Declaring the
// boundary at the shim stops the walk, and the client bundle then tree-shakes
// the barrel down to Skeleton itself.
export {
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonInput,
  SkeletonButton,
  SkeletonAvatar,
  skeletonVariants,
  type SkeletonProps,
} from "@vivancedata/ui"
