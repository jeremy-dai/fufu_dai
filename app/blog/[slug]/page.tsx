import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllPosts, getPost } from "@/lib/posts";
import { compileMDX } from "@/lib/mdx";
import { MDXContent } from "@/components/blog/mdx-content";
import { TableOfContents } from "@/components/blog/toc";
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
  return {
    title: post.meta.title,
    description: post.meta.description,
    alternates: { canonical: `https://fufu.dev/blog/${slug}` },
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: "article",
      publishedTime: post.meta.date,
      url: `https://fufu.dev/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const MDXComponent = await compileMDX(post.content);

  const jsonLd = articleJsonLd({
    title: post.meta.title,
    description: post.meta.description,
    date: post.meta.date,
    slug,
    tags: post.meta.tags,
  });

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
      >
        <ArrowLeft size={14} />
        Back
      </Link>

      <article className="mt-8">
        <header>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-100">
            {post.meta.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-zinc-500 font-mono">
            <time>{post.meta.date}</time>
            <span>·</span>
            <span>{post.meta.readingTime}</span>
            <span>·</span>
            <span className="uppercase text-xs">{post.meta.lang}</span>
          </div>
          <p className="mt-2 text-xs text-zinc-600">
            {post.meta.tags.join(" · ")}
          </p>
        </header>

        <div className="mt-10 flex gap-12">
          <div className="min-w-0 flex-1">
            <MDXContent Component={MDXComponent} />
          </div>
          <aside className="hidden w-56 shrink-0 xl:block">
            <TableOfContents />
          </aside>
        </div>


      </article>
    </div>
  );
}
