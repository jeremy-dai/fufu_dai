const BASE_URL = "https://fufu.dev";

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jeremy Dai",
    url: BASE_URL,
    jobTitle: "AI Engineer",
    worksFor: { "@type": "Organization", name: "KAWO" },
    sameAs: [
      "https://github.com/jeremy-dai",
      "https://www.linkedin.com/in/jeremydai/",
      "https://x.com/jeremy_dai_",
      "https://www.zhihu.com/people/jieruimi",
    ],
    knowsAbout: [
      "LLM",
      "RAG",
      "Multi-Agent Systems",
      "NLP",
      "LangChain",
      "LangGraph",
    ],
  };
}

export function articleJsonLd(post: {
  title: string;
  description: string;
  date: string;
  slug: string;
  tags: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: `${BASE_URL}/blog/${post.slug}`,
    author: { "@type": "Person", name: "Jeremy Dai", url: BASE_URL },
    keywords: post.tags.join(", "),
  };
}

export function softwareAppJsonLd(project: {
  title: string;
  description: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    url: `${BASE_URL}/projects/${project.slug}`,
    author: { "@type": "Person", name: "Jeremy Dai", url: BASE_URL },
    applicationCategory: "AI/ML",
  };
}
