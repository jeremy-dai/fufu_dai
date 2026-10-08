"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useLang } from "@/lib/language-context";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", en: "Home", zh: "首页", hideOnMobile: true },
  { href: "/projects", en: "Projects", zh: "项目" },
  { href: "/blog", en: "Writing", zh: "文章" },
  { href: "/about", en: "About", zh: "关于" },
];

export function SiteNav() {
  const pathname = usePathname();
  const { lang, setLang } = useLang();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Hide on scroll down, reveal on scroll up — keeps reading distraction-free.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 8);
    setHidden(y > prev && y > 240);
  });

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <motion.header
      animate={{ y: hidden ? "-120%" : "0%" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="sticky top-0 z-50 px-3 pt-3 sm:px-6"
    >
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-2.5 py-2 transition-all duration-300 sm:px-3",
          scrolled
            ? "border-zinc-800/80 bg-zinc-950/70 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <Link href="/" className="group flex items-center gap-2.5 pl-1">
          <Image
            src="/profile.jpg"
            alt="Jeremy Dai"
            width={28}
            height={28}
            className="h-7 w-7 rounded-full object-cover ring-1 ring-zinc-700 transition group-hover:ring-sky-400/60"
          />
          <span className="hidden font-mono text-sm text-zinc-300 sm:inline">
            fufu<span className="text-accent">.dev</span>
          </span>
        </Link>

        <div className="flex items-center gap-0.5">
          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative isolate rounded-lg px-3 py-1.5 text-sm transition-colors",
                  active ? "text-zinc-50" : "text-zinc-400 hover:text-zinc-200",
                  l.hideOnMobile && "hidden sm:block",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-lg bg-zinc-800/80 ring-1 ring-zinc-700/60"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {lang === "zh" ? l.zh : l.en}
              </Link>
            );
          })}
          <span className="mx-1.5 h-4 w-px bg-zinc-800" />
          <button
            onClick={() => setLang(lang === "en" ? "zh" : "en")}
            aria-label={lang === "en" ? "切换中文" : "Switch to English"}
            className="rounded-lg px-2.5 py-1.5 font-mono text-xs text-zinc-400 transition-colors hover:bg-zinc-800/60 hover:text-zinc-100"
          >
            {lang === "en" ? "中" : "EN"}
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
