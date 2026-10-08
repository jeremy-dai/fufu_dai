"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { useLang, pick } from "@/lib/language-context";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const { lang } = useLang();

  return (
    <>
      <h1 className="text-4xl font-semibold tracking-tight text-zinc-100">
        {lang === "zh" ? "项目" : "Projects"}
      </h1>
      <p className="mt-3 text-zinc-400">
        {lang === "zh" ? "折腾过的东西，有些还活着。" : "Things I've built and contributed to."}
      </p>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.08} className="h-full">
            <Link href={`/projects/${project.slug}`} className="block h-full">
              <SpotlightCard className="h-full p-7">
                <div className="flex h-full flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                      {pick(lang, project.status, project.status_zh)}
                    </p>
                    <ArrowUpRight
                      size={18}
                      className="shrink-0 text-zinc-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sky-300"
                    />
                  </div>
                  <h2 className="mt-4 text-xl font-semibold text-zinc-100">
                    {pick(lang, project.title, project.title_zh)}
                  </h2>
                  <p className="mt-1 text-sm text-zinc-400">
                    {pick(lang, project.subtitle, project.subtitle_zh)}
                  </p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-500">
                    {pick(lang, project.description, project.description_zh)}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-zinc-800 bg-zinc-900/60 px-2 py-0.5 font-mono text-[11px] text-zinc-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </Link>
          </Reveal>
        ))}
      </div>
    </>
  );
}
