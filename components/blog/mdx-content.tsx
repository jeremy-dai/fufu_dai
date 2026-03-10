"use client";

import { useEffect, useState } from "react";
import { run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";

export function MDXContent({ code }: { code: string }) {
  const [Content, setContent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    (async () => {
      const mod = await run(code, {
        ...runtime,
        baseUrl: import.meta.url,
      });
      setContent(() => mod.default);
    })();
  }, [code]);

  if (!Content) return null;

  return (
    <div className="prose prose-invert max-w-none">
      <Content />
    </div>
  );
}
