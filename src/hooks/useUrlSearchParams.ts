"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";

/**
 * Filter state that lives in the query string, so a filtered view can be
 * linked, bookmarked and restored with Back.
 *
 * The URL is the single source of truth: components read it through
 * `useSyncExternalStore` and write it with `history.replaceState`, which the
 * App Router observes without a navigation or a server round-trip. The server
 * snapshot is empty, so a statically rendered page ships its unfiltered list
 * and React applies the URL's filters right after hydration without a
 * mismatch.
 */

export type SearchParamsUpdate = Record<string, string | readonly string[] | null>;

const URL_CHANGE_EVENT = "vivancedata:search-params-change";

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(URL_CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(URL_CHANGE_EVENT, onChange);
  };
}

const getSnapshot = () => window.location.search;
const getServerSnapshot = () => "";

function writeSearchParams(update: SearchParamsUpdate) {
  const url = new URL(window.location.href);

  for (const [key, value] of Object.entries(update)) {
    url.searchParams.delete(key);
    if (value === null || value === "") continue;
    if (typeof value === "string") {
      url.searchParams.set(key, value);
      continue;
    }
    for (const entry of value) url.searchParams.append(key, entry);
  }

  if (url.search === window.location.search) return;
  window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  window.dispatchEvent(new Event(URL_CHANGE_EVENT));
}

export function useUrlSearchParams(): [URLSearchParams, (update: SearchParamsUpdate) => void] {
  const search = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const params = useMemo(() => new URLSearchParams(search), [search]);
  return [params, writeSearchParams];
}

/**
 * A free-text param for a search box. Keystrokes update a local draft at once
 * and reach the URL after `delay` ms: Safari throws once `replaceState` runs
 * more than 100 times in 30 seconds, which fast typing into a URL-bound input
 * would reach.
 */
export function useUrlTextParam(
  key: string,
  delay = 300
): [string, (value: string, options?: { immediate?: boolean }) => void] {
  const [params, setParams] = useUrlSearchParams();
  const [draft, setDraft] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  const setValue = useCallback(
    (value: string, options?: { immediate?: boolean }) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = null;
      const commit = () => {
        setParams({ [key]: value.trim() === "" ? null : value });
        setDraft(null);
      };
      if (options?.immediate) {
        commit();
        return;
      }
      setDraft(value);
      timer.current = setTimeout(() => {
        timer.current = null;
        commit();
      }, delay);
    },
    [delay, key, setParams]
  );

  return [draft ?? params.get(key) ?? "", setValue];
}
