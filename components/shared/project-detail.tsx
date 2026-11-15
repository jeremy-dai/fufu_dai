"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { useLang, pick } from "@/lib/language-context";

const labels = {
  back: { en: "All projects", zh: "全部项目" },
  summary: { en: "In one line", zh: "一句话" },
  problem: { en: "Problem", zh: "背景问题" },
  solution: { en: "What we built", zh: "方案" },
  impact: { en: "Outcomes", zh: "结果" },
  role: { en: "My role", zh: "我的角色" },
};

export function ProjectDetail({ project }: { project: Project }) {
  const { lang } = useLang();
  const t = (key: keyof typeof labels) => labels[key][lang];
  const impact = pick(lang, project.impact, project.impact_zh);

  // Paired zh/en blog links on fufu.dev: show only the active language's link.
  const visibleLinks = (project.links ?? []).filter((l) => {
    if (!l.url.includes("fufu.dev/blog/")) return true;
    const isEnPost = l.url.endsWith("-en");
    return lang === "en" ? isEnPost : !isEnPost;
  });

  return (
    <>
      {/* ── Row 1 (8 · 4): Header (cream) + One-liner & links (lime) ── */}
      <div className="jd-grid">
        <section className="jd-card jd-cream w8">
          <div className="jd-top">
            <span className="jd-pill ink">{pick(lang, project.status, project.status_zh)}</span>
            <Link href="/projects" className="jd-chip">
              <ArrowLeft size={13} />
              {t("back")}
            </Link>
          </div>
          <h1 className="jd-h1 jd-serif">{pick(lang, project.title, project.title_zh)}</h1>
          <p className="jd-lede">{pick(lang, project.subtitle, project.subtitle_zh)}</p>
          <div className="jd-row jd-push">
            {project.tags.map((tag) => (
              <span key={tag} className="jd-pill line">
                {tag}
              </span>
            ))}
          </div>
        </section>

        <section className="jd-card jd-lime w4">
          <span className="jd-pill ink">{t("summary")}</span>
          <p className="jd-h3">{pick(lang, project.description, project.description_zh)}</p>
          {visibleLinks.length > 0 && (
            <div className="jd-row jd-push">
              {visibleLinks.map((link, idx) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={idx === 0 ? "jd-btn" : "jd-btn line"}
                >
                  {link.label}
                  <ArrowUpRight size={14} />
                </a>
              ))}
            </div>
          )}
        </section>
      </div>

      {project.video && (
        <div className="jd-grid">
          <section className="jd-card jd-dark w12 !p-3">
            <div className="overflow-hidden rounded-[18px]" style={{ aspectRatio: "16/9" }}>
              <iframe
                width="100%"
                height="100%"
                src={project.video}
                title={project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="border-0"
              />
            </div>
          </section>
        </div>
      )}

      {/* ── Row 2 (7 · 5): Case-study prose on canvas + Outcomes (dark) ── */}
      <div className="jd-grid mt-4">
        <div className="prose w7 px-2 pt-2">
          {project.problem && (
            <>
              <h2>{t("problem")}</h2>
              <p>{pick(lang, project.problem, project.problem_zh)}</p>
            </>
          )}
          {project.solution && (
            <>
              <h2>{t("solution")}</h2>
              <p>{pick(lang, project.solution, project.solution_zh)}</p>
            </>
          )}
          {project.role && (
            <>
              <h2>{t("role")}</h2>
              <p>{pick(lang, project.role, project.role_zh)}</p>
            </>
          )}
        </div>

        {impact && impact.length > 0 && (
          <section className="jd-card jd-dark w5 self-start">
            <div className="jd-top">
              <h2 className="jd-h3 jd-serif">{t("impact")}</h2>
              {project.stack && <span className="jd-lab">{project.stack}</span>}
            </div>
            <div className="jd-list">
              {impact.map((item, i) => (
                <div key={i} className="jd-rule">
                  <div className="jd-ic-sm">{i + 1}</div>
                  <b className="text-[15px] font-medium">{item}</b>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
