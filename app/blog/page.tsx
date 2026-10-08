import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { BlogFilter } from "./blog-filter";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing about RAG, Agents, AI in production, and things that break.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-4xl px-6 sm:px-8 pt-12 sm:pt-16 pb-16">
      <BlogFilter posts={posts} />
    </div>
  );
}
