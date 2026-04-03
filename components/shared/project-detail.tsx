"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/projects";
import { useLang, pick } from "@/lib/language-context";

const labels = {
  back: { en: "Back to Projects", zh: "返回项目" },
  problem: { en: "The Problem", zh: "问题" },
  solution: { en: "What We Built", zh: "我们的方案" },
  impact: { en: "Impact", zh: "影响" },
  role: { en: "My Role", zh: "我的角色" },
  stack: { en: "Stack", zh: "技术栈" },
  links: { en: "Links", zh: "相关链接" },
};

export function ProjectDetail({ project }: { project: Project }) {
  const { lang } = useLang();
  const t = (key: keyof typeof labels) => labels[key][lang];

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1 text-sm text-muted hover:text-accent transition-colors"
      >
        <ArrowLeft size={14} />
        {t("back")}
      </Link>

      <h1 className="mt-6 font-mono text-3xl font-bold text-zinc-100">
        {pick(lang, project.title, project.title_zh)}
      </h1>
      <p className="mt-1 text-lg text-muted">
        {pick(lang, project.subtitle, project.subtitle_zh)}
      </p>
      <p className="mt-1 text-sm text-accent-warm">
        {pick(lang, project.status, project.status_zh)}
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

      {project.video && (
        <div className="mt-10 overflow-hidden rounded-lg" style={{ aspectRatio: "16/9" }}>
          <iframe
            width="100%"
            height="100%"
            src={project.video}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {project.problem && (
        <section className="mt-10">
          <h2 className="font-mono text-lg font-semibold text-zinc-100">
            {t("problem")}
          </h2>
          <p className="mt-3 leading-relaxed text-muted">
            {pick(lang, project.problem, project.problem_zh)}
          </p>
        </section>
      )}

      {project.solution && (
        <section className="mt-8">
          <h2 className="font-mono text-lg font-semibold text-zinc-100">
            {t("solution")}
          </h2>
          <p className="mt-3 leading-relaxed text-muted">
            {pick(lang, project.solution, project.solution_zh)}
          </p>
        </section>
      )}

      {project.impact && (
        <section className="mt-8">
          <h2 className="font-mono text-lg font-semibold text-zinc-100">
            {t("impact")}
          </h2>
          <ul className="mt-3 space-y-2">
            {pick(lang, project.impact, project.impact_zh)!.map((item, i) => (
              <li key={i} className="flex gap-2 text-muted">
                <span className="mt-1 text-accent">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {project.role && (
        <section className="mt-8">
          <h2 className="font-mono text-lg font-semibold text-zinc-100">
            {t("role")}
          </h2>
          <p className="mt-3 leading-relaxed text-muted">
            {pick(lang, project.role, project.role_zh)}
          </p>
        </section>
      )}

      {project.stack && (
        <section className="mt-8">
          <h2 className="font-mono text-lg font-semibold text-zinc-100">
            {t("stack")}
          </h2>
          <p className="mt-2 text-muted">{project.stack}</p>
        </section>
      )}

      {project.links && (
        <section className="mt-8">
          <h2 className="font-mono text-lg font-semibold text-zinc-100">
            {t("links")}
          </h2>
          <div className="mt-3 flex flex-col gap-2">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-accent hover:underline"
              >
                <ExternalLink size={14} />
                {link.label}
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
