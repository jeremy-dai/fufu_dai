import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Languages } from "lucide-react";
import {
  getAllPosts,
  getPost,
  extractHeadings,
  getTranslationSlug,
  getAdjacentPosts,
  type PostMeta,
} from "@/lib/posts";
import { compileMDX } from "@/lib/mdx";
import { MDXContent } from "@/components/blog/mdx-content";
import { TableOfContents } from "@/components/blog/toc";
import { ReadingProgress, PostLangSync } from "@/components/blog/post-client";
import { articleJsonLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const translation = getTranslationSlug(slug);
  return {
    title: post.meta.title,
    description: post.meta.description,
    alternates: {
      canonical: `https://fufu.dev/blog/${slug}`,
      ...(translation && {
        languages: {
          [post.meta.lang === "zh" ? "en" : "zh"]: `https://fufu.dev/blog/${translation}`,
        },
      }),
    },
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: "article",
      publishedTime: post.meta.date,
      url: `https://fufu.dev/blog/${slug}`,
    },
  };
}

const t = {
  back: { en: "All posts", zh: "全部文章" },
  toc: { en: "On this page", zh: "目录" },
  translation: { en: "阅读中文版", zh: "Read in English" },
  newer: { en: "Newer", zh: "较新" },
  older: { en: "Older", zh: "较早" },
  more: { en: "Keep reading", zh: "继续阅读" },
};

function NeighborCard({
  post,
  label,
  align,
}: {
  post: PostMeta;
  label: string;
  align: "left" | "right";
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex flex-col gap-2 rounded-2xl border border-zinc-800/70 bg-zinc-900/40 p-5 transition-colors hover:border-zinc-700 hover:bg-zinc-900/70 ${
        align === "right" ? "sm:items-end sm:text-right" : ""
      }`}
    >
      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-zinc-500">
        {align === "left" && <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-0.5" />}
        {label}
        {align === "right" && <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />}
      </span>
      <span className="font-medium leading-snug text-zinc-200 transition-colors group-hover:text-sky-300">
        {post.title}
      </span>
    </Link>
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const MDXComponent = await compileMDX(post.content);
  const headings = extractHeadings(post.content);
  const translation = getTranslationSlug(slug, allPosts);
  const { newer, older } = getAdjacentPosts(slug, allPosts);
  const lang = post.meta.lang;

  const jsonLd = articleJsonLd({
    title: post.meta.title,
    description: post.meta.description,
    date: post.meta.date,
    slug,
    tags: post.meta.tags,
  });

  return (
    <div className="mx-auto max-w-6xl px-6 pt-10 pb-24 sm:px-8">
      <ReadingProgress />
      <PostLangSync postLang={lang} translationSlug={translation} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex gap-16">
        <article className="min-w-0 max-w-3xl flex-1">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-200"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
            {t.back[lang]}
          </Link>

          <header className="mt-8 border-b border-zinc-800/60 pb-8">
            <div className="flex flex-wrap gap-1.5">
              {post.meta.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="rounded-full border border-zinc-800 bg-zinc-900/60 px-2.5 py-0.5 font-mono text-[11px] text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-100"
                >
                  {tag}
                </Link>
              ))}
            </div>
            <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-zinc-50 sm:text-[2.6rem]">
              {post.meta.title}
            </h1>
            {post.meta.description && (
              <p className="mt-4 text-lg leading-relaxed text-zinc-400">{post.meta.description}</p>
            )}
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-zinc-500">
              <time dateTime={post.meta.date}>{post.meta.date}</time>
              <span className="text-zinc-700">/</span>
              <span>{post.meta.readingTime}</span>
              {translation && (
                <>
                  <span className="text-zinc-700">/</span>
                  <Link
                    href={`/blog/${translation}`}
                    className="inline-flex items-center gap-1 text-zinc-400 transition-colors hover:text-sky-300"
                  >
                    <Languages size={13} />
                    {t.translation[lang]}
                  </Link>
                </>
              )}
            </div>
          </header>

          <div className="mt-10">
            <MDXContent Component={MDXComponent} />
          </div>

          {(newer || older) && (
            <nav className="mt-20 border-t border-zinc-800/60 pt-10">
              <p className="mb-5 font-mono text-xs tracking-wider text-accent">{t.more[lang]}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {older ? <NeighborCard post={older} label={t.older[lang]} align="left" /> : <span />}
                {newer && <NeighborCard post={newer} label={t.newer[lang]} align="right" />}
              </div>
            </nav>
          )}
        </article>

        <aside className="hidden w-60 shrink-0 pt-28 xl:block">
          <TableOfContents headings={headings} title={t.toc[lang]} />
        </aside>
      </div>
    </div>
  );
}
