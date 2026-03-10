"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { SiZhihu, SiXiaohongshu } from "react-icons/si";
import { useLang } from "@/lib/language-context";

export function HomeHeader() {
  const { lang, setLang } = useLang();
  const zh = lang === "zh";

  return (
    <header className="flex gap-5">
      <Image
        src="/profile.jpg"
        alt="Jeremy Dai"
        width={80}
        height={80}
        className="rounded-full object-cover h-20 w-20 flex-shrink-0"
      />
      <div>
        <h1 className="font-mono text-2xl font-bold text-zinc-100">
          {zh ? "戴fufu" : "Jeremy Dai"}{" "}
          <span className="text-lg font-normal text-muted">(@daifufu)</span>
        </h1>
        <p className="mt-2 leading-relaxed text-muted">
          {zh
            ? "KAWO AI 工程师，做 Agent 系统落地，顺便排查各种玄学 bug。"
            : "AI Engineer at KAWO. I build Agent systems in production, then figure out why they don't work as expected."}
        </p>
        <div className="mt-3 flex items-center gap-4">
          <a
            href="https://github.com/jeremy-dai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 transition-colors hover:text-accent"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.zhihu.com/people/jieruimi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 transition-colors hover:text-accent"
          >
            <SiZhihu size={18} />
          </a>
          <a
            href="https://www.xiaohongshu.com/user/profile/6399c49b0000000026007957"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 transition-colors hover:text-accent"
          >
            <SiXiaohongshu size={18} />
          </a>
          <a
            href="https://x.com/jeremy_dai_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 transition-colors hover:text-accent"
          >
            <Twitter size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/jeremydai/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 transition-colors hover:text-accent"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="mailto:jeremyydai@gmail.com"
            className="text-zinc-500 transition-colors hover:text-accent"
          >
            <Mail size={18} />
          </a>
          <span className="text-zinc-700">·</span>
          <Link
            href="/about"
            className="text-sm text-zinc-500 transition-colors hover:text-accent"
          >
            {zh ? "关于" : "About"}
          </Link>
          <Link
            href="/projects"
            className="text-sm text-zinc-500 transition-colors hover:text-accent"
          >
            {zh ? "项目" : "Projects"}
          </Link>
          <span className="text-zinc-700">·</span>
          <button
            onClick={() => setLang(zh ? "en" : "zh")}
            className="text-sm text-zinc-500 transition-colors hover:text-accent font-mono"
          >
            {zh ? "EN" : "中"}
          </button>
        </div>
      </div>
    </header>
  );
}
