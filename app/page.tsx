import { getAllPosts } from "@/lib/posts";
import { getAllProjects } from "@/lib/projects";
import { HomeContent } from "@/components/shared/home-content";

export default function HomePage() {
  const posts = getAllPosts();
  const projects = getAllProjects();

  return (
    <div className="mx-auto max-w-6xl px-6 sm:px-8 pb-16">
      <HomeContent posts={posts} projects={projects} />
    </div>
  );
}
