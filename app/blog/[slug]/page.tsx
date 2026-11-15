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
  translation: { en: "中文版", zh: "Read in English" },
  newer: { en: "Newer post", zh: "较新一篇" },
  older: { en: "Older post", zh: "较早一篇" },
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
      className={`jd-card jd-dark w6 ${align === "right" ? "lg:items-end lg:text-right" : ""}`}
    >
      <span className="jd-lab inline-flex items-center gap-1.5">
        {align === "left" && <ArrowLeft size={13} />}
        {label}
        {align === "right" && <ArrowRight size={13} />}
      </span>
      <span className="text-lg font-semibold leading-snug">{post.title}</span>
      <span className="jd-lab jd-push">{post.date}</span>
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
    <>
      <ReadingProgress />
      <PostLangSync postLang={lang} translationSlug={translation} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="jd-grid pt-2">
        {/* ── Left Rail (Report TOC) ── */}
        <aside className="jd-rail hidden w3 lg:flex">
          <div className="jd-card jd-dark jd-toc w-full">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Link href="/blog" className="jd-chip">
                <ArrowLeft size={13} />
                {t.back[lang]}
              </Link>
              {translation && (
                <Link href={`/blog/${translation}`} className="jd-chip">
                  <Languages size={13} />
                  {t.translation[lang]}
                </Link>
              )}
            </div>
            <TableOfContents headings={headings} title={t.toc[lang]} />
          </div>
        </aside>

        {/* ── Right Prose (directly on warm ink canvas) ── */}
        <article className="w9 min-w-0 lg:pl-4">
          <div className="mb-6 flex flex-wrap items-center gap-2 lg:hidden">
            <Link href="/blog" className="jd-chip">
              <ArrowLeft size={13} />
              {t.back[lang]}
            </Link>
            {translation && (
              <Link href={`/blog/${translation}`} className="jd-chip">
                <Languages size={13} />
                {t.translation[lang]}
              </Link>
            )}
          </div>

          <header className="border-b border-[rgba(245,240,228,0.14)] pb-8">
            <div className="jd-row">
              <span className="jd-pill lime">{post.meta.date}</span>
              {post.meta.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="jd-pill line hover:border-[rgba(245,240,228,0.4)] hover:text-[#F5F0E4]"
                >
                  {tag}
                </Link>
              ))}
              <span className="jd-lab">{post.meta.readingTime}</span>
            </div>

            <h1 className="jd-article-title mt-6">{post.meta.title}</h1>
            {post.meta.description && (
              <p className="jd-article-intro">{post.meta.description}</p>
            )}
          </header>

          <div className="mt-10 pb-12">
            <MDXContent Component={MDXComponent} />
          </div>

          {(newer || older) && (
            <nav className="jd-grid mt-6" aria-label="Adjacent posts">
              {older ? (
                <NeighborCard post={older} label={t.older[lang]} align="left" />
              ) : (
                <div className="hidden w6 lg:block" />
              )}
              {newer ? (
                <NeighborCard post={newer} label={t.newer[lang]} align="right" />
              ) : (
                <div className="hidden w6 lg:block" />
              )}
            </nav>
          )}
        </article>
      </div>
    </>
  );
}
