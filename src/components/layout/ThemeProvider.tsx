"use client"

// The directive is load-bearing, not decoration. Without it this file is a
// server module that re-exports from the @vivancedata/ui barrel, and Next's
// client-entry collection walks that barrel and registers every "use client"
// component it finds -- the dialog, navigation menu, command palette, carousel,
// all of them -- as client code for the root layout. That was an 86 KB (gzip)
// chunk on every route, of which the home page used the theme provider and
// nothing else. `optimizePackageImports` cannot help here: its transform only
// rewrites `import` declarations, and a re-export is not one.
//
// ThemeProvider is a client component in the package already, so declaring the
// boundary here changes nothing about where it runs; it only stops the walk.
export { ThemeProvider, type ThemeProviderProps } from "@vivancedata/ui"
