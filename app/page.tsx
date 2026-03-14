import { getAllPosts } from "@/lib/posts";
import { BlogFilter } from "@/app/blog/blog-filter";
import { HomeHeader } from "@/components/shared/home-header";

export default function HomePage() {
  const posts = getAllPosts();
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  return (
    <div className="mx-auto max-w-6xl px-6 sm:px-8 pt-20 sm:pt-24 pb-16">
      {/* Header */}
      <HomeHeader />

      {/* Blog list */}
      <section className="mt-14 border-t border-zinc-800/50 pt-10">
        <BlogFilter posts={posts} allTags={allTags} />
      </section>
    </div>
  );
}
