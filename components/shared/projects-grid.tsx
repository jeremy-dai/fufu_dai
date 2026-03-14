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
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-100">
        {lang === "zh" ? "项目" : "Projects"}
      </h1>
      <p className="mt-2 text-zinc-400">
        {lang === "zh" ? "折腾过的东西，有些还活着。" : "Things I've built and contributed to."}
      </p>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Link key={project.slug} href={`/projects/${project.slug}`}>
          <Card3D className="group h-full rounded-xl border border-zinc-800/60 bg-zinc-900/50 p-7 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/80">
            <p className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider">
              {pick(lang, project.status, project.status_zh)}
            </p>
            <h2 className="mt-2 text-lg font-semibold text-zinc-100 group-hover:text-zinc-50 transition-colors">
              {pick(lang, project.title, project.title_zh)}
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              {pick(lang, project.subtitle, project.subtitle_zh)}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              {pick(lang, project.description, project.description_zh)}
            </p>
            <p className="mt-4 text-xs text-zinc-600">
              {project.tags.join(" · ")}
            </p>
          </Card3D>
        </Link>
      ))}
    </div>
    </>
  );
}
