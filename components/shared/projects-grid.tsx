"use client";

import Link from "next/link";
import type { Project } from "@/lib/projects";
import { useLang, pick } from "@/lib/language-context";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const { lang } = useLang();
  const zh = lang === "zh";

  const bySlug = (s: string) => projects.find((p) => p.slug === s);
  const arolsen = bySlug("arolsen-archives");
  const kevin = bySlug("kevin");
  const hitime = bySlug("hi-time-hi-money");
  const known = new Set(["arolsen-archives", "kevin", "hi-time-hi-money"]);
  const extra = projects.filter((p) => !known.has(p.slug));

  return (
    <>
      {/* ── Page header on canvas ── */}
      <header className="mb-6 flex flex-col gap-2 px-2 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="jd-page-title jd-serif">{zh ? "项目" : "Projects"}</h1>
        <p className="jd-unit">
          {zh ? "从历史档案馆，到生产环境里的 Agent。" : "From historical archives to production agents."}
        </p>
      </header>

      {/* ── Row 1 (7 · 5): Arolsen flagship (glow) + Kevin (orange) / hi-time (lime) ── */}
      <div className="jd-grid">
        {arolsen && (
          <Link href={`/projects/${arolsen.slug}`} className="jd-card jd-glow w7">
            <div className="jd-top">
              <span className="jd-lab">{pick(lang, arolsen.status, arolsen.status_zh)}</span>
              <span className="jd-pill lime">{zh ? "2 项 NLP 专利" : "2 NLP patents"}</span>
            </div>

            <div>
              <h2 className="jd-h2 jd-serif">{pick(lang, arolsen.title, arolsen.title_zh)}</h2>
              <p className="jd-unit mt-1">{pick(lang, arolsen.subtitle, arolsen.subtitle_zh)}</p>
            </div>

            <div className="mt-2 flex flex-wrap items-end gap-x-10 gap-y-6">
              <div>
                <div className="jd-num">40×</div>
                <span className="jd-unit mt-2 block">{zh ? "档案索引提速" : "Faster indexing"}</span>
              </div>
              <div className="jd-race min-w-[260px] flex-1">
                <span className="who">{zh ? "人工" : "Manual"}</span>
                <div className="track">
                  <i className="was" style={{ width: "2.5%" }} />
                </div>
                <span className="val">{zh ? "4 份/时" : "4 / hr"}</span>
                <span className="who">AI</span>
                <div className="track">
                  <i className="got" style={{ width: "100%" }} />
                </div>
                <span className="val">{zh ? "160 份/时" : "160 / hr"}</span>
              </div>
            </div>

            <div className="jd-stats jd-push">
              <div>
                <b>160k+</b>
                <span>{zh ? "姓名已索引" : "Names indexed"}</span>
              </div>
              <div>
                <b>950+</b>
                <span>{zh ? "志愿者 · 6 大洲" : "Volunteers · 6 continents"}</span>
              </div>
              <div>
                <b>99%</b>
                <span>{zh ? "「宗教」字段置信度" : "Confidence on 'religion'"}</span>
              </div>
            </div>
          </Link>
        )}

        <div className="jd-stack w5">
          {kevin && (
            <Link href={`/projects/${kevin.slug}`} className="jd-card jd-orange">
              <div className="jd-top">
                <span className="jd-pill line">{pick(lang, kevin.status, kevin.status_zh)}</span>
                <span className="jd-lab">{zh ? "500+ 品牌在用" : "500+ brands"}</span>
              </div>
              <div>
                <h2 className="jd-h2 jd-serif">{pick(lang, kevin.title, kevin.title_zh)}</h2>
                <p className="jd-unit mt-1">{pick(lang, kevin.subtitle, kevin.subtitle_zh)}</p>
              </div>
              <p className="jd-h3 jd-push">
                {zh ? "“大多数用户把它当会说话的 Excel。”" : "“Most users treat it like a talking Excel.”"}
              </p>
            </Link>
          )}

          {hitime && (
            <Link href={`/projects/${hitime.slug}`} className="jd-card jd-lime">
              <div className="jd-top">
                <span className="jd-pill ink">{pick(lang, hitime.status, hitime.status_zh)}</span>
                <span className="jd-lab">Next.js · Vercel</span>
              </div>
              <div>
                <h2 className="jd-h2 jd-serif">{pick(lang, hitime.title, hitime.title_zh)}</h2>
                <p className="jd-unit mt-1">{pick(lang, hitime.subtitle, hitime.subtitle_zh)}</p>
              </div>
              <div className="jd-push flex items-end gap-4">
                <div className="jd-num">
                  7<small>{zh ? "年" : "yrs"}</small>
                </div>
                <span className="jd-unit pb-2">
                  {zh ? "每小时的生活记录，AI 都能读" : "of hourly life logs, readable by any AI"}
                </span>
              </div>
            </Link>
          )}
        </div>
      </div>

      {extra.length > 0 && (
        <div className="jd-grid">
          {extra.map((p) => (
            <Link key={p.slug} href={`/projects/${p.slug}`} className="jd-card jd-dark w4">
              <span className="jd-lab">{pick(lang, p.status, p.status_zh)}</span>
              <h2 className="jd-h3 jd-serif">{pick(lang, p.title, p.title_zh)}</h2>
              <p className="jd-unit jd-push">{pick(lang, p.description, p.description_zh)}</p>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
