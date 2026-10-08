"use client";

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from "react";

export type Lang = "en" | "zh";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
});

const STORAGE_KEY = "preferred-lang";

/** Fired on window only when the user explicitly switches language. */
export const LANG_SWITCH_EVENT = "lang-switch";

// Tiny external store backed by localStorage. Using useSyncExternalStore
// avoids hydration mismatches (server always renders "en") without
// calling setState inside an effect.
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) cb();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): Lang {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "zh") return stored;
  return navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
}

function getServerSnapshot(): Lang {
  return "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLang = useCallback((newLang: Lang) => {
    localStorage.setItem(STORAGE_KEY, newLang);
    listeners.forEach((l) => l());
    window.dispatchEvent(new CustomEvent<Lang>(LANG_SWITCH_EVENT, { detail: newLang }));
  }, []);

  // Keep <html lang> in sync for accessibility / fonts.
  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): LanguageContextValue {
  return useContext(LanguageContext);
}

export function pick<T>(lang: Lang, en: T, zh: T | undefined): T {
  return lang === "zh" && zh !== undefined ? zh : en;
}
