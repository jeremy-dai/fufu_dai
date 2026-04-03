"use client";

import Image from "next/image";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { SiZhihu, SiXiaohongshu } from "react-icons/si";
import { useLang } from "@/lib/language-context";
import { Card3D } from "@/components/ui/card-3d";
import { FlipWords } from "@/components/ui/flip-words";

export function HomeHeader() {
  const { lang } = useLang();
  const zh = lang === "zh";

  return (
    <header className="flex flex-col items-start gap-6">
      <Card3D className="cursor-pointer shrink-0">
        <Image
          src="/profile.jpg"
          alt="Jeremy Dai"
          width={96}
          height={96}
          className="rounded-2xl object-cover h-24 w-24 border border-zinc-800"
        />
      </Card3D>

      <div className="w-full">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-100">
          {zh ? "戴fufu" : "Jeremy Dai"}
        </h1>
        <p className="mt-1 text-sm text-zinc-500">@daifufu</p>

        <div className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
          {zh ? (
            <>
              KAWO AI 工程师，做
              <FlipWords
                key={lang}
                words={["Agent 系统落地", "RAG 管线优化", "AI 产品交付"]}
                className="text-zinc-100 font-medium"
              />
              ，顺便排查各种玄学 bug。
            </>
          ) : (
            <>
              AI Engineer at KAWO. I
              <FlipWords
                key={lang}
                words={["build Agent systems", "ship RAG pipelines", "debug AI in prod"]}
                className="text-zinc-100 font-medium"
              />
              and write about what breaks.
            </>
          )}
        </div>

        <div className="mt-5 flex items-center gap-4">
          <a
            href="https://github.com/jeremy-dai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 transition-colors hover:text-zinc-300"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.zhihu.com/people/jieruimi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 transition-colors hover:text-zinc-300"
          >
            <SiZhihu size={18} />
          </a>
          <a
            href="https://www.xiaohongshu.com/user/profile/6399c49b0000000026007957"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 transition-colors hover:text-zinc-300"
          >
            <SiXiaohongshu size={18} />
          </a>
          <a
            href="https://x.com/jeremy_dai_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 transition-colors hover:text-zinc-300"
          >
            <Twitter size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/jeremydai/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 transition-colors hover:text-zinc-300"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="mailto:jeremyydai@gmail.com"
            className="text-zinc-600 transition-colors hover:text-zinc-300"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </header>
  );
}
