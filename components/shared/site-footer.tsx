import { SocialLinks } from "@/components/shared/social-links";

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-16 max-w-6xl px-6 pb-10 sm:px-8">
      <div className="flex flex-col items-center justify-between gap-4 border-t border-zinc-800/60 pt-8 sm:flex-row">
        <p className="font-mono text-xs text-zinc-600">
          © {new Date().getFullYear()} Jeremy Dai · fufu.dev
        </p>
        <SocialLinks />
      </div>
    </footer>
  );
}
