import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { SiZhihu, SiXiaohongshu } from "react-icons/si";
import { cn } from "@/lib/utils";

export const EMAIL = "jeremyydai@gmail.com";

const socials = [
  { label: "GitHub", href: "https://github.com/jeremy-dai", icon: Github },
  { label: "Zhihu", href: "https://www.zhihu.com/people/jieruimi", icon: SiZhihu },
  {
    label: "Xiaohongshu",
    href: "https://www.xiaohongshu.com/user/profile/6399c49b0000000026007957",
    icon: SiXiaohongshu,
  },
  { label: "X", href: "https://x.com/jeremy_dai_", icon: Twitter },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jeremydai/", icon: Linkedin },
  { label: "Email", href: `mailto:${EMAIL}`, icon: Mail },
];

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {socials.map(({ label, href, icon: Icon }) => {
        const external = href.startsWith("http");
        return (
          <a
            key={label}
            href={href}
            aria-label={label}
            title={label}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="rounded-lg p-2 text-zinc-500 transition-all hover:-translate-y-0.5 hover:bg-zinc-800/60 hover:text-zinc-100"
          >
            <Icon size={17} />
          </a>
        );
      })}
    </div>
  );
}
