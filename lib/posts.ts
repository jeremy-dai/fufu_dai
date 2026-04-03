import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

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
        date: data.date ? String(data.date).slice(0, 10) : "",
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
      date: data.date ? String(data.date).slice(0, 10) : "",
      tags: data.tags ?? [],
      lang: data.lang ?? "en",
      published: data.published !== false,
      image: data.image,
      readingTime: rt.text,
    } as PostMeta,
    content,
  };
}
