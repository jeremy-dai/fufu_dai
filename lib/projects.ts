import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content/projects");

export interface Project {
  slug: string;
  title: string;
  title_zh?: string;
  subtitle: string;
  subtitle_zh?: string;
  description: string;
  description_zh?: string;
  tags: string[];
  status: string;
  status_zh?: string;
  problem?: string;
  problem_zh?: string;
  solution?: string;
  solution_zh?: string;
  impact?: string[];
  impact_zh?: string[];
  role?: string;
  role_zh?: string;
  links?: { label: string; url: string }[];
  stack?: string;
  order?: number;
}

export function getAllProjects(): Project[] {
  if (!fs.existsSync(contentDir)) return [];

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
      const { data } = matter(raw);
      return { slug, ...data } as Project;
    })
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function getProject(slug: string): Project | undefined {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);
  return { slug, ...data } as Project;
}

// Keep named export for backwards compat with pages that import `projects`
export const projects = getAllProjects();
