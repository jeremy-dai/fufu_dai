import { getAllPosts } from "@/lib/posts";
import { getAllProjects } from "@/lib/projects";
import { HomeContent } from "@/components/shared/home-content";

export default function HomePage() {
  const posts = getAllPosts();
  const projects = getAllProjects();

  return <HomeContent posts={posts} projects={projects} />;
}
