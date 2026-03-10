"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { useLang } from "@/lib/language-context";

const POSTS_PER_PAGE = 10;

export function BlogFilter({
  posts,
  allTags,
  showPageTitle = false,
}: {
  posts: PostMeta[];
  allTags: string[];
  showPageTitle?: boolean;
}) {
  const { lang } = useLang();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const loaderRef = useRef<HTMLDivElement>(null);

  const langFiltered = posts.filter((p) => p.lang === lang);
  const relevantTags = Array.from(new Set(langFiltered.flatMap((p) => p.tags)));

  const filtered = activeTag
    ? langFiltered.filter((p) => p.tags.includes(activeTag))
    : langFiltered;

  // Reset tag when language changes
  useEffect(() => {
    setActiveTag(null);
  }, [lang]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // Reset visible count when tag changes
  useEffect(() => {
    setVisibleCount(POSTS_PER_PAGE);
  }, [activeTag]);

  // Infinite scroll with IntersectionObserver
  const loadMore = useCallback(() => {
    setVisibleCount((prev) => prev + POSTS_PER_PAGE);
  }, []);

  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <>
      {showPageTitle && (
        <>
          <h1 className="font-mono text-3xl font-bold text-zinc-100">
            {lang === "zh" ? "文章" : "Blog"}
          </h1>
          <p className="mt-2 text-muted">
            {lang === "zh"
              ? "写写 RAG、Agent、生产踩坑，和一些翻车记录。"
              : "Writing about RAG, Agents, AI in production, and things that break."}
          </p>
        </>
      )}
      {!showPageTitle && (
        <h2 className="font-mono text-lg font-semibold text-zinc-100 mb-0">
          {lang === "zh" ? "文章" : "Writing"}
        </h2>
      )}
      <div className="mt-8 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTag(null)}
          className={`rounded-lg px-3 py-1 text-sm transition-colors ${
            activeTag === null
              ? "bg-accent text-zinc-900"
              : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
          }`}
        >
          All
        </button>
        {relevantTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag === activeTag ? null : tag)}
            className={`rounded-lg px-3 py-1 text-sm transition-colors ${
              activeTag === tag
                ? "bg-accent text-zinc-900"
                : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-4">
        {filtered.length === 0 && (
          <p className="text-muted">
            {lang === "zh" ? "暂无文章，敬请期待。" : "No posts yet. Check back soon."}
          </p>
        )}
        {visible.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-2 rounded-lg border border-transparent p-4 transition-colors hover:border-border hover:bg-card/50"
          >
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-medium text-zinc-100 group-hover:text-accent transition-colors">
                {post.title}
              </h3>
              {post.description && (
                <p className="text-sm text-muted line-clamp-2">
                  {post.description}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-500 font-mono mt-1">
              <time dateTime={post.date}>{post.date}</time>
              <span>{post.readingTime}</span>
              <div className="flex gap-1.5 ml-auto">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-zinc-800/50 px-1.5 py-0.5 transition-colors group-hover:bg-zinc-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div ref={loaderRef} className="mt-6 text-center text-sm text-muted">
          Loading more...
        </div>
      )}
    </>
  );
}
