import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { ProjectsGrid } from "@/components/shared/projects-grid";

export const metadata: Metadata = {
  title: "Projects",
  description: "AI projects — from Holocaust document digitization to production AI agents.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 sm:px-8 pt-20 sm:pt-24 pb-16">
      <ProjectsGrid projects={projects} />
    </div>
  );
}
