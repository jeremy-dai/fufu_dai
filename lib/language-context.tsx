"use client";

import { createContext, useContext, useEffect, useState } from "react";

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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored === "en" || stored === "zh") {
      setLangState(stored);
    } else {
      const browserLang = navigator.language.toLowerCase();
      setLangState(browserLang.startsWith("zh") ? "zh" : "en");
    }
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
  };

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
