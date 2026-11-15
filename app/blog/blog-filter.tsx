"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import type { PostMeta } from "@/lib/posts";
import { useLang } from "@/lib/language-context";
import { useQueryParam } from "@/lib/use-query-param";

export function BlogFilter({ posts }: { posts: PostMeta[] }) {
  const { lang } = useLang();
  const zh = lang === "zh";
  const [tagParam, setTag] = useQueryParam("tag");
  const [query, setQuery] = useState("");

  const langPosts = posts.filter((p) => p.lang === lang);

  const counts = new Map<string, number>();
  langPosts.forEach((p) => p.tags.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)));
  const tagCounts = [...counts.entries()].sort((a, b) => b[1] - a[1]);

  const activeTag = tagCounts.some(([t]) => t === tagParam) ? tagParam : null;
  const q = query.trim().toLowerCase();

  const filtered = langPosts.filter(
    (p) =>
      (!activeTag || p.tags.includes(activeTag as PostMeta["tags"][number])) &&
      (!q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)),
  );

  const isFiltering = Boolean(activeTag || q);
  const featured = !isFiltering ? filtered[0] : undefined;
  const rows = featured ? filtered.slice(1) : filtered;

  return (
    <>
      {/* ── Row 1 (7 · 5): Title & filters (cream) + Latest post (lime) ── */}
      <div className="jd-grid">
        <section className={`jd-card jd-cream ${featured ? "w7" : "w12"}`}>
          <span className="jd-pill ink">{zh ? `${langPosts.length} 篇` : `${langPosts.length} posts`}</span>
          <h1 className="jd-h1 jd-serif">{zh ? "文章" : "Writing"}</h1>

          <div className="jd-push space-y-4">
            <label className="relative block max-w-md">
              <Search size={14} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 opacity-55" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={zh ? "搜索标题或摘要…" : "Search posts…"}
                aria-label={zh ? "搜索文章" : "Search posts"}
                className="jd-input w-full !bg-[rgba(26,25,21,0.06)] !pl-9 !pr-8"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 opacity-60 hover:opacity-100"
                >
                  <X size={13} />
                </button>
              )}
            </label>

            <div className="jd-row">
              {([["__all", langPosts.length] as const, ...tagCounts] as const).map(([tag, count]) => {
                const value = tag === "__all" ? null : tag;
                const active = activeTag === value;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setTag(active ? null : value)}
                    className={`jd-chip ${active ? "on" : ""}`}
                  >
                    <span>{value ?? (zh ? "全部" : "All")}</span>
                    <span className="opacity-60">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {featured && (
          <Link href={`/blog/${featured.slug}`} className="jd-card jd-lime w5">
            <div className="jd-top">
              <span className="jd-pill ink">{zh ? "最新" : "Latest"}</span>
              <time dateTime={featured.date} className="jd-lab">
                {featured.date}
              </time>
            </div>
            <h2 className="jd-h2">{featured.title}</h2>
            {featured.description && <p className="jd-unit line-clamp-3">{featured.description}</p>}
            <span className="jd-lab jd-push">{featured.readingTime}</span>
          </Link>
        )}
      </div>

      {/* ── Row 2 (12): Archive list ── */}
      <div className="jd-grid">
        <section className="jd-card jd-dark w12">
          {rows.length === 0 ? (
            <p className="py-10 text-center text-[rgba(245,240,228,0.58)]">
              {zh ? "没有匹配的文章。" : "No posts match that filter."}
            </p>
          ) : (
            <div className="jd-list -my-3">
              {rows.map((post) => {
                const primaryTag = post.tags.find((t) => t !== "AI") ?? post.tags[0];
                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="jd-post-row !py-4">
                    <time dateTime={post.date} className="jd-lab">
                      {post.date}
                    </time>
                    <div className="min-w-0">
                      <b className="block">{post.title}</b>
                      {post.description && (
                        <span className="mt-1 block line-clamp-1 text-[13.5px] text-[rgba(245,240,228,0.55)]">
                          {post.description}
                        </span>
                      )}
                    </div>
                    <span className="jd-lab hidden sm:inline">
                      {primaryTag ? `${primaryTag} · ` : ""}
                      {post.readingTime}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
