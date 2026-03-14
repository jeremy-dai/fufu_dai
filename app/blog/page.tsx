import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { BlogFilter } from "./blog-filter";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing about RAG, Agents, AI in production, and things that break.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  return (
    <div className="mx-auto max-w-6xl px-6 sm:px-8 pt-20 sm:pt-24 pb-16">
      <BlogFilter posts={posts} allTags={allTags} showPageTitle />
    </div>
  );
}
