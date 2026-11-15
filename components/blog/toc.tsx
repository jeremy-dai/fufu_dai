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
      { rootMargin: "-80px 0px -75% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label={title} className="max-h-[calc(100vh-11rem)] overflow-y-auto">
      <p className="jd-lab">{title}</p>
      <div className="jd-toc-links">
        {headings.map((h) => {
          const active = activeId === h.id;
          return (
            <a
              key={h.id}
              href={`#${h.id}`}
              className={cn(h.level === 3 && "jd-toc-h3", active && "on")}
            >
              {h.text}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
