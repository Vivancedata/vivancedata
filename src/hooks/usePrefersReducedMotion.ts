"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;
// The server cannot know; it renders the full-motion markup and React swaps to
// the reduced variant after hydration instead of reporting a mismatch.
const getServerSnapshot = () => false;

/**
 * The visitor's reduced-motion preference, safe to read in a component that is
 * server-rendered. Reading `matchMedia` in a `useState` initializer instead
 * gives the server and the client different first renders.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
