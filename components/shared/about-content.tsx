"use client";

import dynamic from "next/dynamic";
import { useLang } from "@/lib/language-context";

const InfiniteMovingCards = dynamic(() =>
  import("@/components/ui/infinite-moving-cards").then(
    (m) => m.InfiniteMovingCards,
  ),
);

const techItems = [
  "Python",
  "TypeScript",
  "React",
  "Next.js",
  "LangChain",
  "LangGraph",
  "RAG",
  "Prompt Engineering",
  "MCP",
  "LayoutLM",
  "CRF",
  "OCR",
  "Docker",
  "PostgreSQL",
  "Vercel",
  "Multi-Agent",
  "GraphRAG",
];

const timeline = [
  {
    year: "2025–now",
    role: "KAWO · AI Engineer",
    role_zh: "KAWO · AI 工程师",
    detail: "Kevin (AI Marketing Agent)",
    detail_zh: "Kevin（AI 营销 Agent）",
  },
  {
    year: "2023–2025",
    role: "txyz.ai · AI/NLP Engineer",
    role_zh: "txyz.ai · AI/NLP 工程师",
    detail: "RAG + Academic AI Platform",
    detail_zh: "RAG + 学术 AI 平台",
  },
  {
    year: "2021–2023",
    role: "Accenture Netherlands · DS Consultant",
    role_zh: "埃森哲荷兰 · 数据科学顾问",
    detail: "Arolsen Archives AI Digitization",
    detail_zh: "阿罗尔森档案馆 AI 数字化项目",
  },
  {
    year: "2019–2021",
    role: "Leiden University · MSc Statistics",
    role_zh: "莱顿大学 · 统计学硕士"
  },
  {
    year: "2016–2019",
    role: "Consor Engineers (US/Canada) · Traffic Engineer",
    role_zh: "Consor 工程公司（美国/加拿大）· 交通工程师",
  },
  {
    year: "2013–2015",
    role: "Texas A&M · MSc Civil Engineering",
    role_zh: "德克萨斯农工大学 · 土木工程硕士",
    detail: "",
    detail_zh: "",
  },
  {
    year: "2009–2013",
    role: "Southeast University · BSc Civil Engineering",
    role_zh: "东南大学 · 土木工程学士",
  },
];

export function AboutContent() {
  const { lang } = useLang();
  const zh = lang === "zh";

  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-100">
        {zh ? "关于" : "About"}
      </h1>

      {/* Opening */}
      <blockquote className="mt-8 border-l-2 border-zinc-700 pl-4 text-base italic text-zinc-400">
        {zh
          ? "脑子里总有个声音说我该干点别的。那个声音，一般是我老板。"
          : "There's always been a voice in my mind saying I should do something else. Well, normally that voice was my boss."}
      </blockquote>

      <div className="mt-6 space-y-4 leading-relaxed text-zinc-400">
        {zh ? (
          <>
            <p>
              这是我搞土木那会儿的老梗，但确实挺真实的。我在美国和加拿大做了三年交通工程，天天建模路口、写 VBA 脚本——听说前同事到现在还在用。后来发现自己真正上头的是数据，不是混凝土。
            </p>
            <p>
              于是跑去荷兰莱顿大学读了统计学，提前毕业，是那个项目第一个做到的。之后去埃森哲做数据科学顾问，一年升职，带了个 8 人团队，参与了用 AI 数字化纳粹迫害档案的项目——阿罗尔森档案馆 3000 万份文件，全球最大的大屠杀受害者资料库。项目拿了 V360 全球创新奖，还申请了 2 项 NLP 专利。
            </p>
            <p>
              然后 LLM 爆发了。我回国加入 AI 研究创业公司 txyz.ai（注册用户 50 万+），现在在 KAWO 做 Kevin——一个服务 500+ 全球品牌的 AI 营销 Agent。每天的工作就是在"AI 应该这样"和"它生产环境里偏不这样"之间反复横跳。偶尔也写写这些翻车故事。
            </p>
          </>
        ) : (
          <>
            <p>
              That&apos;s an old joke from my civil engineering days, but it captures
              something real. I started in traffic engineering in the US and Canada —
              three years of modelling intersections and writing VBA scripts that my
              former colleagues apparently still use. Somewhere along the way I
              realized the parts I liked most were the data problems, not the
              concrete ones.
            </p>
            <p>
              So I went back to school. Got a statistics degree at Leiden University
              in the Netherlands — finished ahead of the normal schedule, the first
              in the program to do so. Joined Accenture as a data science consultant,
              got promoted within a year, and ended up leading a team of 8 on a
              project that used AI to digitize Nazi persecution records — 30 million
              documents from the Arolsen Archives, the world&apos;s largest
              collection on Holocaust victims. That project won the V360 Global
              Innovation Award and led to 2 NLP patent applications.
            </p>
            <p>
              Then large language models happened. I moved back to China, joined an
              AI research startup (txyz.ai, 500K+ registered users), and now
              I&apos;m at KAWO building Kevin — an AI marketing agent that serves
              500+ global enterprise brands. My days are spent in the gap between
              what AI is supposed to do and what it actually does in production. I
              write about that gap sometimes.
            </p>
          </>
        )}
      </div>

      <p className="mt-6 text-zinc-400">
        {zh
          ? "Anyways，我爸妈到现在还跟人说我是搞土木的。"
          : "Anyways, my parents still tell people I'm a civil engineer."}
      </p>

      {/* Tech Stack */}
      <h2 className="mt-16 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
        {zh ? "技术栈" : "Tech Stack"}
      </h2>
      <div className="mt-6">
        <InfiniteMovingCards items={techItems} speed="slow" />
      </div>
      <div className="mt-6 space-y-2 text-sm text-zinc-400">
        <p>
          <span className="font-semibold text-zinc-300">{zh ? "AI/LLM：" : "AI/LLM:"}</span>{" "}
          Agent · Context Engineering · RAG · Prompt Engineering · MCP
        </p>
        <p>
          <span className="font-semibold text-zinc-300">{zh ? "NLP：" : "NLP:"}</span>{" "}
          LayoutLM · CRF · OCR · Text Classification
        </p>
        <p>
          <span className="font-semibold text-zinc-300">{zh ? "基础设施：" : "Infra:"}</span>{" "}
          Docker · PostgreSQL · Vercel
        </p>
      </div>

      {/* Timeline */}
      <h2 className="mt-16 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
        {zh ? "职业经历" : "Career Timeline"}
      </h2>
      <div className="mt-6 grid gap-0">
        {timeline.map((item) => (
          <div
            key={item.year}
            className="grid grid-cols-[7rem_1fr] gap-4 py-3 border-b border-zinc-800/40 last:border-0"
          >
            <span className="font-mono text-xs text-zinc-600 pt-0.5">
              {item.year}
            </span>
            <div>
              <p className="text-sm text-zinc-200">{zh ? item.role_zh : item.role}</p>
              {(zh ? item.detail_zh : item.detail) && (
                <p className="text-xs text-zinc-500 mt-0.5">
                  {zh ? item.detail_zh : item.detail}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Patents */}
      <h2 className="mt-16 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
        {zh ? "专利申请" : "Patent Applications"}
      </h2>
      <p className="mt-4 text-zinc-400">
        {zh
          ? "两项 NLP 专利申请，来自埃森哲/阿罗尔森档案馆项目，做的是历史档案的文件分类和结构化数据提取。"
          : "Two NLP patent applications from the Accenture/Arolsen Archives project, covering document classification and structured data extraction from historical records."}
      </p>
    </>
  );
}
