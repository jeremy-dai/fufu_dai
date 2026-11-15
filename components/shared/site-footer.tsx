import { EMAIL, SocialLinks } from "@/components/shared/social-links";

export function SiteFooter() {
  return (
    <footer className="jd-end">
      <span>
        Jeremy Dai · fufu.dev ·{" "}
        <a href={`mailto:${EMAIL}`} className="underline underline-offset-4 hover:text-[#F5F0E4]">
          {EMAIL}
        </a>
      </span>
      <SocialLinks />
    </footer>
  );
}
