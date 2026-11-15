import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { ProjectsGrid } from "@/components/shared/projects-grid";

export const metadata: Metadata = {
  title: "Projects",
  description: "AI projects — from Holocaust document digitization to production AI agents.",
};

export default function ProjectsPage() {
  return <ProjectsGrid projects={projects} />;
}
