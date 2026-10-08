"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, Bot, Compass, Cpu, Sparkles } from "lucide-react";
import type { PostMeta } from "@/lib/posts";
import type { Project } from "@/lib/projects";
import { useLang, pick } from "@/lib/language-context";
import { FlipWords } from "@/components/ui/flip-words";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { SocialLinks, EMAIL } from "@/components/shared/social-links";

const LATEST_COUNT = 5;

const ease = [0.22, 1, 0.36, 1] as const;
const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const heroItem = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease } },
};

// Topics I write about — each links to the filtered blog index.
const topics = [
  {
    tag: "Agent",
    icon: Bot,
    en: "Agent engineering",
    zh: "Agent 工程",
    descEn: "Architecture, tool routing, skill registries — what holds up once real users arrive.",
    descZh: "架构演进、工具路由、技能注册——真实用户来了之后还撑得住的东西。",
  },
  {
    tag: "LLM",
    icon: Cpu,
    en: "How LLMs work",
    zh: "大模型原理",
    descEn: "Training stages, KV cache, and why editing text with AI is harder than it looks.",
    descZh: "训练三阶段、KV cache，以及为什么让 AI 改一段话这么难。",
  },
  {
    tag: "Productivity",
    icon: Sparkles,
    en: "AI × life",
    zh: "AI × 生活",
    descEn: "Feeding years of life logs to AI, and the tools I build for myself.",
    descZh: "把多年的生活记录喂给 AI，以及给自己做的小工具。",
  },
  {
    tag: "Career",
    icon: Compass,
    en: "Industry & career",
    zh: "行业与职业",
    descEn: "AI fatigue, engineer salaries, and where all of this is heading.",
    descZh: "AI 疲劳、工程师薪资，以及这一切会走向哪里。",
  },
];

function SectionHeader({
  index,
  title,
  subtitle,
  href,
  linkLabel,
}: {
  index: string;
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        <p className="font-mono text-xs tracking-wider text-accent">{index}</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
          {title}
        </h2>
        {subtitle && <p className="mt-2 text-sm text-zinc-500">{subtitle}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="group inline-flex shrink-0 items-center gap-1 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
        >
          {linkLabel}
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}

export function HomeContent({
  posts,
  projects,
}: {
  posts: PostMeta[];
  projects: Project[];
}) {
  const { lang } = useLang();
  const zh = lang === "zh";
  const langPosts = posts.filter((p) => p.lang === lang);
  const latest = langPosts.slice(0, LATEST_COUNT);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <motion.section
        variants={heroContainer}
        initial="hidden"
        animate="show"
        className="flex min-h-[calc(100svh-5rem)] flex-col justify-center gap-10 py-12 lg:flex-row-reverse lg:items-center lg:justify-between"
      >
        <motion.div variants={heroItem} className="relative h-28 w-28 shrink-0 sm:h-40 sm:w-40 lg:h-56 lg:w-56">
          <div className="avatar-glow absolute -inset-6 rounded-full" />
          <div className="avatar-ring absolute -inset-[2px] rounded-[2rem]" />
          <Image
            src="/profile.jpg"
            alt="Jeremy Dai"
            width={224}
            height={224}
            priority
            className="relative h-full w-full rounded-[1.9rem] border-4 border-zinc-950 object-cover"
          />
        </motion.div>

        <div className="max-w-2xl">
          <motion.div variants={heroItem}>
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs text-zinc-400 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {zh ? "现在：Google · GenAI FDE" : "Currently: GenAI FDE at Google"}
            </span>
          </motion.div>

          <motion.h1
            variants={heroItem}
            className="mt-6 bg-gradient-to-b from-zinc-50 to-zinc-400 bg-clip-text text-5xl font-semibold tracking-tight text-transparent sm:text-6xl lg:text-7xl"
          >
            {zh ? "戴fufu" : "Jeremy Dai"}
          </motion.h1>
          <motion.p variants={heroItem} className="mt-2 font-mono text-sm text-zinc-500">
            @daifufu
          </motion.p>

          <motion.div
            variants={heroItem}
            className="mt-6 text-lg leading-relaxed text-zinc-300 sm:text-xl"
          >
            {zh ? (
              <>
                Google GenAI FDE，做
                <FlipWords
                  key={lang}
                  words={["Agent 系统落地", "RAG 管线优化", "AI 产品交付"]}
                  className="font-medium text-sky-300"
                />
                ，顺便排查各种玄学 bug。
              </>
            ) : (
              <>
                GenAI FDE at Google. I
                <FlipWords
                  key={lang}
                  words={["build Agent systems", "ship RAG pipelines", "debug AI in prod"]}
                  className="font-medium text-sky-300"
                />
                and write about what breaks.
              </>
            )}
          </motion.div>

          <motion.p variants={heroItem} className="mt-4 max-w-xl leading-relaxed text-zinc-500">
            {zh
              ? "从土木工程到统计，再到 AI Agent。这里放我做过的项目，和关于 AI 在生产环境里翻车的思考。"
              : "Civil engineer → statistician → AI engineer. Here you'll find what I've built and what I've learned about AI in production."}
          </motion.p>

          <motion.div variants={heroItem} className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#writing"
              className="group inline-flex items-center gap-2 rounded-xl bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-900 transition hover:bg-white"
            >
              {zh ? "看最新文章" : "Read latest writing"}
              <ArrowDown size={15} className="transition-transform group-hover:translate-y-0.5" />
            </a>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-sm text-zinc-200 backdrop-blur transition hover:border-zinc-700 hover:bg-zinc-900"
            >
              {zh ? "看看项目" : "See projects"}
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <SocialLinks className="sm:ml-2" />
          </motion.div>
        </div>
      </motion.section>

      {/* ── Latest writing ───────────────────────────────── */}
      <section id="writing" className="mt-8 scroll-mt-24">
        <Reveal>
          <SectionHeader
            index="01 /"
            title={zh ? "写作" : "Writing"}
            subtitle={
              zh
                ? "写写 RAG、Agent、生产踩坑，和一些翻车记录。"
                : "On RAG, agents, AI in production, and things that break."
            }
            href="/blog"
            linkLabel={zh ? `全部 ${langPosts.length} 篇` : `All ${langPosts.length} posts`}
          />
        </Reveal>
        <div className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {topics.map((tp, i) => {
            const count = langPosts.filter((p) => p.tags.includes(tp.tag as PostMeta["tags"][number])).length;
            if (count === 0) return null;
            const Icon = tp.icon;
            return (
              <Reveal key={tp.tag} delay={i * 0.06} className="h-full">
                <Link href={`/blog?tag=${tp.tag}`} className="block h-full">
                  <SpotlightCard className="h-full p-5">
                    <div className="flex h-full flex-col">
                      <div className="flex items-center justify-between">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 transition-colors group-hover:border-sky-400/30 group-hover:text-sky-300">
                          <Icon size={17} />
                        </span>
                        <span className="font-mono text-[11px] text-zinc-600">
                          {zh ? `${count} 篇` : `${count} posts`}
                        </span>
                      </div>
                      <h3 className="mt-4 font-medium text-zinc-100">{zh ? tp.zh : tp.en}</h3>
                      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-zinc-500">
                        {zh ? tp.descZh : tp.descEn}
                      </p>
                    </div>
                  </SpotlightCard>
                </Link>
              </Reveal>
            );
          })}
        </div>
        <div className="border-t border-zinc-800/60">
          {latest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.05} y={10}>
              <Link
                href={`/blog/${post.slug}`}
                className="group -mx-4 grid grid-cols-1 gap-1 border-b border-zinc-800/60 px-4 py-6 transition-colors hover:bg-zinc-900/40 sm:grid-cols-[8rem_1fr_auto] sm:gap-6"
              >
                <time dateTime={post.date} className="pt-1 font-mono text-xs text-zinc-600">
                  {post.date}
                </time>
                <div className="min-w-0">
                  <h3 className="text-lg font-medium text-zinc-100 transition-colors group-hover:text-sky-300">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="mt-1.5 line-clamp-2 text-sm text-zinc-500">{post.description}</p>
                  )}
                  <p className="mt-2 font-mono text-[11px] text-zinc-600">
                    {post.readingTime} · {post.tags.join(" · ")}
                  </p>
                </div>
                <ArrowUpRight
                  size={18}
                  className="hidden self-center text-zinc-700 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sky-300 sm:block"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Selected work ────────────────────────────────── */}
      <section className="mt-32">
        <Reveal>
          <SectionHeader
            index="02 /"
            title={zh ? "精选项目" : "Selected Work"}
            subtitle={zh ? "从档案馆到生产环境的 Agent。" : "From historical archives to production agents."}
            href="/projects"
            linkLabel={zh ? "全部项目" : "All projects"}
          />
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {projects.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} className="h-full">
              <Link href={`/projects/${p.slug}`} className="block h-full">
                <SpotlightCard className="h-full p-6">
                  <div className="flex h-full flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                        {pick(lang, p.status, p.status_zh)}
                      </p>
                      <ArrowUpRight
                        size={18}
                        className="shrink-0 text-zinc-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sky-300"
                      />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-zinc-100">
                      {pick(lang, p.title, p.title_zh)}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-400">
                      {pick(lang, p.subtitle, p.subtitle_zh)}
                    </p>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-500">
                      {pick(lang, p.description, p.description_zh)}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
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
      </section>

      {/* ── Contact ──────────────────────────────────────── */}
      <section className="mt-28">
        <Reveal>
          <SpotlightCard className="p-8 sm:p-12">
            <p className="font-mono text-xs tracking-wider text-accent">03 /</p>
            <h2 className="mt-2 max-w-xl text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
              {zh ? "想聊 Agent、RAG，或者一起做点东西？" : "Want to talk agents, RAG, or build something together?"}
            </h2>
            <p className="mt-3 max-w-xl text-zinc-500">
              {zh
                ? "随时发邮件，或者在社交平台上找我。"
                : "My inbox is open. Or find me on any of these."}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="group inline-flex items-center gap-2 rounded-xl bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-900 transition hover:bg-white"
              >
                {EMAIL}
                <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <SocialLinks />
            </div>
          </SpotlightCard>
        </Reveal>
      </section>
    </>
  );
}
