"use client";

import { useCallback, useSyncExternalStore } from "react";

// Lightweight URL query-param state (no Suspense needed, SSR-safe).
// Server render sees `null`, so statically generated pages show the
// unfiltered view; the client then picks up ?param=… from the URL.
const EVENT = "querychange";

function subscribe(cb: () => void) {
  window.addEventListener("popstate", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("popstate", cb);
    window.removeEventListener(EVENT, cb);
  };
}

export function useQueryParam(key: string): [string | null, (v: string | null) => void] {
  const value = useSyncExternalStore(
    subscribe,
    () => new URLSearchParams(window.location.search).get(key),
    () => null,
  );

  const setValue = useCallback(
    (v: string | null) => {
      const url = new URL(window.location.href);
      if (v) url.searchParams.set(key, v);
      else url.searchParams.delete(key);
      window.history.replaceState(window.history.state, "", url);
      window.dispatchEvent(new Event(EVENT));
    },
    [key],
  );

  return [value, setValue];
}
