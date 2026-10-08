"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Search, X } from "lucide-react";
import type { PostMeta } from "@/lib/posts";
import { useLang } from "@/lib/language-context";
import { useQueryParam } from "@/lib/use-query-param";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { cn } from "@/lib/utils";

export function BlogFilter({ posts }: { posts: PostMeta[] }) {
  const { lang } = useLang();
  const zh = lang === "zh";
  const [tagParam, setTag] = useQueryParam("tag");
  const [query, setQuery] = useState("");

  const langPosts = posts.filter((p) => p.lang === lang);

  // Tags present in this language, most-used first.
  const counts = new Map<string, number>();
  langPosts.forEach((p) => p.tags.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)));
  const tagCounts = [...counts.entries()].sort((a, b) => b[1] - a[1]);

  // A tag from the URL that doesn't exist in this language is ignored.
  const activeTag = tagCounts.some(([t]) => t === tagParam) ? tagParam : null;
  const q = query.trim().toLowerCase();

  const filtered = langPosts.filter(
    (p) =>
      (!activeTag || p.tags.includes(activeTag as PostMeta["tags"][number])) &&
      (!q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)),
  );

  const isFiltering = Boolean(activeTag || q);
  const featured = !isFiltering ? filtered[0] : undefined;
  const rest = featured ? filtered.slice(1) : filtered;

  const groups = new Map<string, PostMeta[]>();
  rest.forEach((p) => {
    const y = p.date.slice(0, 4) || "—";
    groups.set(y, [...(groups.get(y) ?? []), p]);
  });
  const byYear = [...groups.entries()];

  return (
    <>
      {/* Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-100">
            {zh ? "文章" : "Writing"}
          </h1>
          <p className="mt-3 max-w-xl text-zinc-400">
            {zh
              ? "写写 RAG、Agent、生产踩坑，和一些翻车记录。"
              : "On RAG, agents, AI in production, and things that break."}
          </p>
        </div>
        <label className="relative block w-full sm:w-64">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={zh ? "搜索文章…" : "Search posts…"}
            aria-label={zh ? "搜索文章" : "Search posts"}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 py-2 pl-9 pr-8 text-sm text-zinc-200 placeholder:text-zinc-600 outline-none backdrop-blur transition focus:border-zinc-600"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-zinc-500 hover:text-zinc-200"
            >
              <X size={13} />
            </button>
          )}
        </label>
      </div>

      {/* Tag filter */}
      <div className="mt-8 flex flex-wrap gap-1.5">
        {[["__all", langPosts.length] as const, ...tagCounts].map(([tag, count]) => {
          const value = tag === "__all" ? null : tag;
          const active = activeTag === value;
          return (
            <button
              key={tag}
              onClick={() => setTag(active ? null : value)}
              className={cn(
                "relative isolate rounded-full px-3 py-1 text-xs transition-colors",
                active ? "text-zinc-50" : "text-zinc-500 hover:text-zinc-200",
              )}
            >
              {active && (
                <motion.span
                  layoutId="blog-tag-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-zinc-800 ring-1 ring-zinc-700"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              {value ?? (zh ? "全部" : "All")}
              <span className="ml-1.5 font-mono text-[10px] text-zinc-600">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Featured latest */}
      {featured && (
        <Link href={`/blog/${featured.slug}`} className="mt-10 block">
          <SpotlightCard className="p-7 sm:p-9">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider">
              <span className="rounded-full bg-sky-400/10 px-2 py-0.5 text-sky-300">
                {zh ? "最新" : "Latest"}
              </span>
              <time dateTime={featured.date} className="text-zinc-500">{featured.date}</time>
            </div>
            <div className="mt-4 flex items-start justify-between gap-6">
              <h2 className="text-2xl font-semibold leading-snug tracking-tight text-zinc-100 sm:text-3xl">
                {featured.title}
              </h2>
              <ArrowUpRight
                size={22}
                className="mt-1 shrink-0 text-zinc-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sky-300"
              />
            </div>
            {featured.description && (
              <p className="mt-3 max-w-2xl leading-relaxed text-zinc-400">{featured.description}</p>
            )}
            <p className="mt-5 font-mono text-[11px] text-zinc-600">
              {featured.readingTime} · {featured.tags.join(" · ")}
            </p>
          </SpotlightCard>
        </Link>
      )}

      {/* List grouped by year */}
      <div className="mt-12">
        {filtered.length === 0 && (
          <p className="py-16 text-center text-zinc-500">
            {zh ? "没有找到相关文章。" : "No posts match that."}
          </p>
        )}
        <AnimatePresence mode="popLayout" initial={false}>
          {byYear.map(([year, items]) => (
            <motion.section
              key={`${lang}-${year}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-2 border-t border-zinc-800/60 pt-6 pb-4 sm:grid-cols-[6rem_1fr] sm:gap-8"
            >
              <h2 className="font-mono text-sm text-zinc-600 sm:sticky sm:top-24 sm:self-start">{year}</h2>
              <div>
                <AnimatePresence mode="popLayout" initial={false}>
                  {items.map((post) => (
                    <motion.div
                      key={post.slug}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group -mx-4 flex items-start justify-between gap-6 rounded-xl px-4 py-4 transition-colors hover:bg-zinc-900/50"
                      >
                        <div className="min-w-0">
                          <h3 className="font-medium text-zinc-100 transition-colors group-hover:text-sky-300 sm:text-lg">
                            {post.title}
                          </h3>
                          {post.description && (
                            <p className="mt-1 line-clamp-2 text-sm text-zinc-500">{post.description}</p>
                          )}
                          <p className="mt-2 font-mono text-[11px] text-zinc-600">
                            {post.date.slice(5)} · {post.readingTime} · {post.tags.join(" · ")}
                          </p>
                        </div>
                        <ArrowUpRight
                          size={16}
                          className="mt-1.5 hidden shrink-0 text-zinc-700 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sky-300 sm:block"
                        />
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.section>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
