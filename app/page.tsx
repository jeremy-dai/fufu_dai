import { getAllPosts } from "@/lib/posts";
import { BlogFilter } from "@/app/blog/blog-filter";
import { DotBackground } from "@/components/ui/dot-background";
import { HomeHeader } from "@/components/shared/home-header";

export default function HomePage() {
  const posts = getAllPosts();
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
      {/* Header */}
      <DotBackground className="rounded-xl -mx-4 px-4 pb-8 [mask-image:linear-gradient(to_bottom,black_60%,transparent)]">
        <HomeHeader />
      </DotBackground>

      {/* Blog list */}
      <section className="mt-14">
        <BlogFilter posts={posts} allTags={allTags} />
      </section>
    </div>
  );
}
