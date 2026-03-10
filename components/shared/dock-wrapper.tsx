"use client";

import { Home, User, FolderOpen, Pen } from "lucide-react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { useLang } from "@/lib/language-context";

export function DockWrapper() {
  const { lang, setLang } = useLang();

  const items = [
    { title: "Home", icon: <Home size={18} />, href: "/" },
    { title: "About", icon: <User size={18} />, href: "/about" },
    { title: "Projects", icon: <FolderOpen size={18} />, href: "/projects" },
    { title: "Blog", icon: <Pen size={18} />, href: "/blog" },
    {
      title: lang === "en" ? "切换中文" : "Switch to EN",
      icon: (
        <span className="font-mono text-xs font-semibold leading-none">
          {lang === "en" ? "中" : "EN"}
        </span>
      ),
      onClick: () => setLang(lang === "en" ? "zh" : "en"),
    },
  ];

  return <FloatingDock items={items} />;
}
