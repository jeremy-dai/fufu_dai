"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/language-context";

const links = [
  { href: "/", en: "Home", zh: "首页" },
  { href: "/blog", en: "Writing", zh: "文章" },
  { href: "/projects", en: "Projects", zh: "项目" },
  { href: "/about", en: "About", zh: "关于" },
];

export function SiteNav() {
  const pathname = usePathname();
  const { lang, setLang } = useLang();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="jd-bar">
      <Link href="/" className="jd-brand">
        <Image src="/mark.svg" width={30} height={30} alt="" className="jd-brand-mark" />
        Jeremy Dai
      </Link>

      <nav className="jd-nav" aria-label="Primary">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={isActive(l.href) ? "on" : undefined}
          >
            {lang === "zh" ? l.zh : l.en}
          </Link>
        ))}
      </nav>

      <div className="jd-bar-end">
        <button
          type="button"
          onClick={() => setLang(lang === "en" ? "zh" : "en")}
          aria-label={lang === "en" ? "切换中文" : "Switch to English"}
          className="jd-chip"
        >
          {lang === "en" ? "中文" : "English"}
        </button>
      </div>
    </header>
  );
}
