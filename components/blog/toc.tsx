"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/posts";
import { cn } from "@/lib/utils";

export function TableOfContents({
  headings,
  title = "On this page",
}: {
  headings: Heading[];
  title?: string;
}) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-80px 0px -75% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <p className="mb-4 font-mono text-[11px] uppercase tracking-wider text-zinc-500">
        {title}
      </p>
      <ul className="space-y-0.5 border-l border-zinc-800 text-sm">
        {headings.map((h) => {
          const active = activeId === h.id;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={cn(
                  "-ml-px block border-l py-1 leading-snug transition-colors",
                  h.level === 3 ? "pl-7" : "pl-4",
                  active
                    ? "border-sky-400 text-zinc-100"
                    : "border-transparent text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
                )}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
