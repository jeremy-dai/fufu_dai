import type { Metadata } from "next";
import { AboutContent } from "@/components/shared/about-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "AI Engineer with a background in traffic engineering, statistics, and data science. 2 NLP patents, 4 countries, always building.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 sm:px-8 pt-12 sm:pt-16 pb-16">
      <AboutContent />
    </div>
  );
}
