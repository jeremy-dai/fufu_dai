import { ComponentType } from "react";

export function MDXContent({ Component }: { Component: ComponentType }) {
  return (
    <div className="prose prose-invert max-w-none">
      <Component />
    </div>
  );
}
