import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import GithubSlugger from "github-slugger";

const contentDir = path.join(process.cwd(), "content/blog");

export const VALID_TAGS = [
  "AI",
  "LLM",
  "Agent",
  "RAG",
  "Engineering",
  "Career",
  "Productivity",
  "Marketing",
] as const;

export type BlogTag = (typeof VALID_TAGS)[number];

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: BlogTag[];
  lang: "zh" | "en";
  published: boolean;
  image?: string;
  readingTime: string;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(contentDir)) return [];

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));

  const posts = files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
      const { data, content } = matter(raw);
      const rt = readingTime(content);

      const rawTags: string[] = data.tags ?? [];
      const validTags = rawTags.filter((t) => {
        if (!(VALID_TAGS as readonly string[]).includes(t)) {
          console.warn(
            `⚠ Blog "${slug}" has invalid tag "${t}". Valid tags: ${VALID_TAGS.join(", ")}`
          );
          return false;
        }
        return true;
      });

      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        date: data.date instanceof Date
          ? data.date.toISOString().slice(0, 10)
          : data.date ? String(data.date).slice(0, 10) : "",
        tags: validTags as BlogTag[],
        lang: data.lang ?? "en",
        published: data.published !== false,
        image: data.image,
        readingTime: rt.text,
      } as PostMeta;
    })
    .filter((p) => p.published)
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return posts;
}

export function getPost(slug: string) {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const rt = readingTime(content);

  return {
    meta: {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      date: data.date instanceof Date
          ? data.date.toISOString().slice(0, 10)
          : data.date ? String(data.date).slice(0, 10) : "",
      tags: data.tags ?? [],
      lang: data.lang ?? "en",
      published: data.published !== false,
      image: data.image,
      readingTime: rt.text,
    } as PostMeta,
    content,
  };
}

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * Extract H2/H3 headings from raw MDX for the table of contents.
 * Uses github-slugger — the same slugger rehype-slug uses — so ids match.
 */
export function extractHeadings(content: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  let inFence = false;

  for (const line of content.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    if (inFence) continue;
    const m = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!m) continue;
    const text = m[2]
      .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1") // links / images
      .replace(/[`*_~]/g, "") // inline formatting
      .replace(/<[^>]+>/g, "") // inline html
      .trim();
    // Slug every heading level so duplicate counters stay in sync.
    const id = slugger.slug(text);
    const level = m[1].length;
    if (level === 2 || level === 3) headings.push({ id, text, level });
  }
  return headings;
}

/** Slug of the other-language version (`foo` ⇄ `foo-en`), if it exists. */
export function getTranslationSlug(slug: string, posts = getAllPosts()): string | null {
  const other = slug.endsWith("-en") ? slug.slice(0, -3) : `${slug}-en`;
  return posts.some((p) => p.slug === other) ? other : null;
}

/** Newer / older posts in the same language. */
export function getAdjacentPosts(slug: string, posts = getAllPosts()) {
  const current = posts.find((p) => p.slug === slug);
  if (!current) return { newer: null, older: null };
  const same = posts.filter((p) => p.lang === current.lang);
  const i = same.findIndex((p) => p.slug === slug);
  return {
    newer: i > 0 ? same[i - 1] : null,
    older: i < same.length - 1 ? same[i + 1] : null,
  };
}
