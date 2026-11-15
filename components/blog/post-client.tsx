"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { LANG_SWITCH_EVENT, type Lang } from "@/lib/language-context";

/** Thin lime scroll progress bar pinned to the top edge of the viewport. */
export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const el = barRef.current;
      if (!el) return;
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      const ratio = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
      el.style.transform = `scaleX(${ratio})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden
      style={{ transform: "scaleX(0)" }}
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-[#E3F96A]"
    />
  );
}

/**
 * When the user flips the language toggle while reading a post,
 * jump to the other-language version instead of leaving them on a
 * page in the wrong language.
 */
export function PostLangSync({
  postLang,
  translationSlug,
}: {
  postLang: Lang;
  translationSlug: string | null;
}) {
  const router = useRouter();

  useEffect(() => {
    if (!translationSlug) return;
    const onSwitch = (e: Event) => {
      const next = (e as CustomEvent<Lang>).detail;
      if (next !== postLang) router.push(`/blog/${translationSlug}`);
    };
    window.addEventListener(LANG_SWITCH_EVENT, onSwitch);
    return () => window.removeEventListener(LANG_SWITCH_EVENT, onSwitch);
  }, [postLang, translationSlug, router]);

  return null;
}
