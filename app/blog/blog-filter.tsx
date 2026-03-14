"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import type { PostMeta, BlogTag } from "@/lib/posts";
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
  const [activeTag, setActiveTag] = useState<BlogTag | null>(null);
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
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-100">
            {lang === "zh" ? "文章" : "Blog"}
          </h1>
          <p className="mt-2 text-zinc-400">
            {lang === "zh"
              ? "写写 RAG、Agent、生产踩坑，和一些翻车记录。"
              : "Writing about RAG, Agents, AI in production, and things that break."}
          </p>
        </>
      )}

      {/* Inline horizontal tag filter */}
      <div className="flex flex-wrap gap-2 mt-6 mb-8">
        <button
          onClick={() => setActiveTag(null)}
          className={`text-xs transition-colors px-2.5 py-1 rounded-full ${
            activeTag === null
              ? "bg-zinc-800 text-zinc-200 font-medium"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          All
        </button>
        {relevantTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag === activeTag ? null : tag)}
            className={`text-xs transition-colors px-2.5 py-1 rounded-full ${
              activeTag === tag
                ? "bg-zinc-800 text-zinc-200 font-medium"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Post list */}
      <div className="flex-1 w-full min-w-0">
        {filtered.length === 0 && (
          <p className="text-zinc-400">
            {lang === "zh" ? "暂无文章，敬请期待。" : "No posts yet. Check back soon."}
          </p>
        )}
        {visible.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-1.5 py-5 border-b border-zinc-800/40 transition-colors hover:bg-zinc-900/30 -mx-4 px-4"
          >
            <h3 className="text-lg font-medium text-zinc-100 group-hover:text-zinc-50 transition-colors">
              {post.title}
            </h3>
            {post.description && (
              <p className="text-sm text-zinc-400 line-clamp-2">
                {post.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500 font-mono mt-1">
              <time dateTime={post.date}>{post.date}</time>
              <span>{post.readingTime}</span>
              {post.tags.length > 0 && (
                <span className="text-zinc-600">
                  {post.tags.join(" · ")}
                </span>
              )}
            </div>
          </Link>
        ))}

        {hasMore && (
          <div ref={loaderRef} className="mt-6 text-center text-sm text-zinc-500">
            Loading more...
          </div>
        )}
      </div>
    </>
  );
}
