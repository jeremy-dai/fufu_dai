"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { LANG_SWITCH_EVENT, type Lang } from "@/lib/language-context";

/** Thin progress bar pinned to the top of the viewport. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-sky-400 via-violet-400 to-amber-400"
    />
  );
}

/**
 * When the user flips the language toggle while reading a post,
 * jump to the translated version instead of leaving them on a
 * page in the "wrong" language.
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
