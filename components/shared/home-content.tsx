"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { PostMeta } from "@/lib/posts";
import type { Project } from "@/lib/projects";
import { useLang, pick } from "@/lib/language-context";

// The one number each project is known for (shown big on its own tile).
const projectNumbers: Record<string, { num: string; unit?: { en: string; zh: string }; lab: { en: string; zh: string } }> = {
  "arolsen-archives": { num: "40×", lab: { en: "Faster archive indexing", zh: "档案索引提速" } },
  kevin: { num: "500+", lab: { en: "Brands using it", zh: "家品牌在用" } },
  "hi-time-hi-money": { num: "7", unit: { en: "yrs", zh: "年" }, lab: { en: "Of hourly life logs", zh: "每小时生活记录" } },
};

const tileSurface: Record<string, string> = {
  "arolsen-archives": "jd-glow",
  kevin: "jd-cream",
  "hi-time-hi-money": "jd-dark",
};

export function HomeContent({
  posts,
  projects,
}: {
  posts: PostMeta[];
  projects: Project[];
}) {
  const { lang } = useLang();
  const zh = lang === "zh";
  const langPosts = posts.filter((p) => p.lang === lang);
  const featured = langPosts[0];
  const recent = langPosts.slice(1, 6);

  const tagCounts = new Map<string, number>();
  langPosts.forEach((p) =>
    p.tags.forEach((t) => {
      if (t !== "AI") tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1);
    }),
  );
  const topTags = [...tagCounts.entries()].sort((a, b) => b[1] - a[1]);

  return (
    <>
      {/* ── Row 1 (7 · 5): Intro (cream) + Latest essay (lime) ── */}
      <div className="jd-grid">
        <section className="jd-card jd-cream w7">
          <div className="flex items-center gap-3.5">
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-[#1A1915]">
              <Image
                src="/profile.jpg"
                alt="Jeremy Dai"
                width={160}
                height={160}
                priority
                className="h-full w-full origin-[43%_18%] scale-[2.2] object-cover"
              />
            </div>
            <span className="jd-pill ink">Google · GenAI FDE</span>
          </div>

          <h1 className="jd-h1 jd-serif mt-2">{zh ? "戴fufu" : "Jeremy Dai"}</h1>

          <p className="jd-lede jd-push max-w-[34em]">
            {zh ? (
              <>
                在生产环境落地 <b>Agent 与 RAG 系统</b>，记录真实世界里翻车的地方。
              </>
            ) : (
              <>
                Building <b>Agent and RAG systems</b> in production, and writing about what breaks.
              </>
            )}
          </p>
        </section>

        {featured && (
          <Link href={`/blog/${featured.slug}`} className="jd-card jd-lime w5">
            <div className="jd-top">
              <span className="jd-pill ink">{zh ? "最新文章" : "Latest post"}</span>
              <time dateTime={featured.date} className="jd-lab">
                {featured.date}
              </time>
            </div>
            <h2 className="jd-h2">{featured.title}</h2>
            <span className="jd-lab jd-push">{featured.readingTime}</span>
          </Link>
        )}
      </div>

      {/* ── Row 2 (8 · 4): Recent writing + About & topics stack ── */}
      <div className="jd-grid">
        <section className="jd-card jd-dark w8">
          <div className="jd-top">
            <h2 className="jd-h3 jd-serif">{zh ? "近期文章" : "Recent writing"}</h2>
            <Link href="/blog" className="jd-chip">
              {zh ? `全部 ${langPosts.length} 篇` : `All ${langPosts.length} posts`}
              <ArrowRight size={13} />
            </Link>
          </div>
          <div className="jd-list">
            {recent.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="jd-post-row">
                <time dateTime={post.date} className="jd-lab">
                  {post.date}
                </time>
                <b>{post.title}</b>
                <span className="jd-lab hidden sm:inline">{post.readingTime}</span>
              </Link>
            ))}
          </div>
        </section>

        <div className="jd-stack w4">
          <Link href="/about" className="jd-card jd-orange">
            <h2 className="jd-h2 jd-serif">
              {zh ? (
                <>
                  土木、统计，
                  <br />
                  再到 Agent
                </>
              ) : (
                <>
                  Concrete, stats,
                  <br />
                  then Agents
                </>
              )}
            </h2>
            <span className="jd-note jd-push">
              {zh ? "工程出身的 AI 工程师 → 关于我" : "An engineer turned AI builder → About"}
            </span>
          </Link>

          <section className="jd-card jd-cream2">
            <span className="jd-lab">{zh ? "按主题看" : "Browse by topic"}</span>
            <div className="jd-row">
              {topTags.map(([tag, count]) => (
                <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`} className="jd-chip">
                  <span>{tag}</span>
                  <span className="opacity-60">{count}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* ── Row 3 (4 · 4 · 4): Projects, each led by its own number ── */}
      {projects.length > 0 && (
        <div className="jd-grid">
          {projects.slice(0, 3).map((p) => {
            const n = projectNumbers[p.slug];
            return (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className={`jd-card ${tileSurface[p.slug] ?? "jd-dark"} w4`}
              >
                <span className="jd-lab">{pick(lang, p.status, p.status_zh)}</span>
                {n && (
                  <div>
                    <div className="jd-num">
                      {n.num}
                      {n.unit && <small>{zh ? n.unit.zh : n.unit.en}</small>}
                    </div>
                    <span className="jd-unit mt-2 block">{zh ? n.lab.zh : n.lab.en}</span>
                  </div>
                )}
                <h3 className="jd-h3 jd-serif jd-push">{pick(lang, p.title, p.title_zh)}</h3>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
