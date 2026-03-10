"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import type { Project } from "@/lib/projects";
import { useLang, pick } from "@/lib/language-context";

const Card3D = dynamic(() =>
  import("@/components/ui/card-3d").then((m) => m.Card3D),
);

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const { lang } = useLang();

  return (
    <>
      <h1 className="font-mono text-3xl font-bold text-zinc-100">
        {lang === "zh" ? "项目" : "Projects"}
      </h1>
      <p className="mt-2 text-muted">
        {lang === "zh" ? "折腾过的东西，有些还活着。" : "Things I've built and contributed to."}
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Link key={project.slug} href={`/projects/${project.slug}`}>
          <Card3D className="group h-full rounded-xl border border-border bg-card p-6 transition-colors hover:border-zinc-700">
            <p className="text-xs font-medium text-accent-warm">
              {pick(lang, project.status, project.status_zh)}
            </p>
            <h2 className="mt-2 text-lg font-semibold text-zinc-100 group-hover:text-accent transition-colors">
              {pick(lang, project.title, project.title_zh)}
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              {pick(lang, project.subtitle, project.subtitle_zh)}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {pick(lang, project.description, project.description_zh)}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Card3D>
        </Link>
      ))}
    </div>
    </>
  );
}
