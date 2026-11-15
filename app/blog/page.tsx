import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { BlogFilter } from "./blog-filter";

export const metadata: Metadata = {
  title: "Writing",
  description: "Writing about RAG, Agents, AI in production, and things that break.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return <BlogFilter posts={posts} />;
}
