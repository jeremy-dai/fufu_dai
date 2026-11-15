"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/language-context";

// Career phases drawn as a sequence track; flex = years spent.
const phases = [
  { en: "Civil & traffic engineering", zh: "土木与交通工程", years: "2009–2019", flex: 10, kind: "was" },
  { en: "Statistics & data science", zh: "统计与数据科学", years: "2019–2023", flex: 4, kind: "was" },
  { en: "LLM products", zh: "大模型产品", years: "2023–2026", flex: 3, kind: "got" },
  { en: "Google", zh: "Google", years: "2026–", flex: 1.6, kind: "got" },
] as const;

const roles = [
  { year: "2026.08–now", en: "Google · GenAI FDE", zh: "Google · GenAI FDE", d_en: "Forward Deployed Engineer, Generative AI", d_zh: "生成式 AI 前线部署工程师" },
  { year: "2025–2026", en: "KAWO · AI Engineer", zh: "KAWO · AI 工程师", d_en: "Kevin, AI marketing agent", d_zh: "Kevin，AI 营销 Agent" },
  { year: "2023–2025", en: "txyz.ai · AI/NLP Engineer", zh: "txyz.ai · AI/NLP 工程师", d_en: "RAG + academic AI platform", d_zh: "RAG + 学术 AI 平台" },
  { year: "2021–2023", en: "Accenture NL · DS Consultant", zh: "埃森哲荷兰 · 数据科学顾问", d_en: "Arolsen Archives digitization", d_zh: "阿罗尔森档案馆数字化" },
  { year: "2019–2021", en: "Leiden University · MSc Statistics", zh: "莱顿大学 · 统计学硕士", d_en: "", d_zh: "" },
  { year: "2016–2019", en: "Consor Engineers · Traffic Engineer", zh: "Consor 工程公司 · 交通工程师", d_en: "US / Canada", d_zh: "美国 / 加拿大" },
  { year: "2013–2015", en: "Texas A&M · MSc Civil Engineering", zh: "德州农工大学 · 土木工程硕士", d_en: "", d_zh: "" },
  { year: "2009–2013", en: "Southeast University · BSc Civil Eng.", zh: "东南大学 · 土木工程学士", d_en: "", d_zh: "" },
];

const stack = [
  { en: "AI & Agents", zh: "AI 与 Agent", items: "LangGraph · LangChain · RAG · GraphRAG · MCP" },
  { en: "NLP & Document AI", zh: "自然语言与文档解析", items: "LayoutLM · CRF · OCR" },
  { en: "Engineering", zh: "工程", items: "Python · TypeScript · Next.js · PostgreSQL · Docker" },
];

export function AboutContent() {
  const { lang } = useLang();
  const zh = lang === "zh";

  return (
    <>
      {/* ── Row 1 (9 · 3): Intro (cream) + Photo ── */}
      <div className="jd-grid">
        <section className="jd-card jd-cream w9">
          <span className="jd-pill ink">{zh ? "关于" : "About"}</span>
          <h1 className="jd-h1 jd-serif">{zh ? "戴fufu" : "Jeremy Dai"}</h1>
          <p className="jd-lede jd-push">
            {zh ? (
              <>
                交通工程师出身，统计学硕士，现在在 Google 做<b>生产环境里的 AI Agent</b>。
              </>
            ) : (
              <>
                Traffic engineer by training, statistician by degree, now building{" "}
                <b>production AI agents</b> at Google.
              </>
            )}
          </p>
        </section>

        <div className="jd-card jd-photo w3">
          <Image
            src="/profile.jpg"
            alt="Jeremy Dai"
            width={720}
            height={720}
            priority
            className="absolute inset-0 h-full w-full object-cover object-[42%_30%]"
          />
        </div>
      </div>

      {/* ── Row 2 (12): Career drawn as a sequence track + roles ── */}
      <div className="jd-grid">
        <section className="jd-card jd-dark w12">
          <div className="jd-top">
            <h2 className="jd-h3 jd-serif">{zh ? "工程出身，做 AI 落地" : "Engineering roots, AI in production"}</h2>
            <span className="jd-lab">{zh ? "斜纹：工程与统计 · 实心：AI" : "Hatched: engineering & stats · Solid: AI"}</span>
          </div>

          <div className="jd-seq">
            {phases.map((ph) => (
              <div key={ph.en} style={{ flex: ph.flex }}>
                <div className={`bar ${ph.kind}`} />
                <div>
                  <b>{zh ? ph.zh : ph.en}</b>
                  <span className="jd-lab">{ph.years}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="jd-roles mt-2">
            {roles.map((r) => (
              <div key={r.year} className="jd-role">
                <div className="min-w-0">
                  <b>{zh ? r.zh : r.en}</b>
                  {(zh ? r.d_zh : r.d_en) && <small>{zh ? r.d_zh : r.d_en}</small>}
                </div>
                <span className="jd-lab whitespace-nowrap">{r.year}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── Row 3 (8 · 4): Story prose on canvas + Patents (lime) & Stack ── */}
      <div className="jd-grid mt-4">
        <div className="prose w8 px-2 pt-2">
          {zh ? (
            <>
              <blockquote>
                <p>脑子里总有个声音说我该干点别的。那个声音，一般是我老板。</p>
              </blockquote>
              <p>
                这是我搞土木那会儿的老梗，但确实挺真实的。我在美国和加拿大做了三年交通工程，天天建模路口、写 VBA
                脚本——听说前同事到现在还在用。后来发现自己真正上头的是数据，不是混凝土。
              </p>
              <p>
                于是跑去荷兰莱顿大学读了统计学，提前毕业，是那个项目第一个做到的。之后去埃森哲做数据科学顾问，一年升职，带了个
                8 人团队，参与了用 AI 数字化纳粹迫害档案的项目——阿罗尔森档案馆 3000
                万份文件，全球最大的大屠杀受害者资料库。项目拿了 V360 全球创新奖，还申请了 2 项 NLP 专利。
              </p>
              <p>
                然后 LLM 爆发了。我回国加入 AI 研究创业公司 txyz.ai（注册用户 50 万+），之后在 KAWO 做
                Kevin——一个服务 500+ 全球品牌的 AI 营销 Agent。2026 年 8 月起，我加入 Google 做 GenAI
                FDE。每天的工作还是在“AI 应该这样”和“它生产环境里偏不这样”之间反复横跳。偶尔也写写这些翻车故事。
              </p>
              <p className="text-[rgba(245,240,228,0.58)]">Anyways，我爸妈到现在还跟人说我是搞土木的。</p>
            </>
          ) : (
            <>
              <blockquote>
                <p>
                  There&apos;s always been a voice in my mind saying I should do something else. Well, normally
                  that voice was my boss.
                </p>
              </blockquote>
              <p>
                That&apos;s an old joke from my civil engineering days, but it captures something real. I
                started in traffic engineering in the US and Canada — three years of modelling intersections and
                writing VBA scripts that my former colleagues apparently still use. Somewhere along the way I
                realized the parts I liked most were the data problems, not the concrete ones.
              </p>
              <p>
                So I went back to school. Got a statistics degree at Leiden University in the Netherlands —
                finished ahead of the normal schedule, the first in the program to do so. Joined Accenture as a
                data science consultant, got promoted within a year, and ended up leading a team of 8 on a
                project that used AI to digitize Nazi persecution records — 30 million documents from the
                Arolsen Archives, the world&apos;s largest archive of Holocaust victims. That project won the
                V360 Global Innovation Award and led to 2 NLP patent applications.
              </p>
              <p>
                Then large language models happened. I moved back to China, joined an AI research startup
                (txyz.ai, 500K+ registered users), then built Kevin at KAWO — an AI marketing agent that serves
                500+ global enterprise brands. Since August 2026 I&apos;ve been a GenAI Forward Deployed
                Engineer at Google. My days are still spent in the gap between what AI is supposed to do and
                what it actually does in production. I write about that gap sometimes.
              </p>
              <p className="text-[rgba(245,240,228,0.58)]">
                Anyways, my parents still tell people I&apos;m a civil engineer.
              </p>
            </>
          )}
        </div>

        <div className="jd-stack w4 self-start">
          <Link href="/projects/arolsen-archives" className="jd-card jd-lime">
            <span className="jd-lab">{zh ? "NLP 专利申请" : "NLP patent applications"}</span>
            <div className="jd-num">2</div>
            <span className="jd-note">
              {zh ? "历史档案分类与结构化抽取 · Arolsen Archives →" : "Document classification & extraction · Arolsen Archives →"}
            </span>
          </Link>

          <section className="jd-card jd-dark">
            <h2 className="jd-h3 jd-serif">{zh ? "技术栈" : "Tech stack"}</h2>
            <div className="jd-list">
              {stack.map((g) => (
                <div key={g.en} className="jd-role">
                  <div>
                    <b>{zh ? g.zh : g.en}</b>
                    <small>{g.items}</small>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
