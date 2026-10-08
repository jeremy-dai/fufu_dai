"use client";

import { cn } from "@/lib/utils";

export function InfiniteMovingCards({
  items,
  speed = "normal",
  className,
}: {
  items: string[];
  speed?: "slow" | "normal" | "fast";
  className?: string;
}) {
  const duration =
    speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";

  // Items are rendered twice so the -50% scroll loops seamlessly.
  const loop = [...items, ...items];

  return (
    <div
      className={cn(
        "scroller relative z-10 max-w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className
      )}
    >
      <ul
        className="animate-scroll flex w-max min-w-full shrink-0 gap-3 py-2"
        style={
          {
            "--animation-duration": duration,
          } as React.CSSProperties
        }
      >
        {loop.map((item, idx) => (
          <li
            key={idx}
            aria-hidden={idx >= items.length}
            className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-400"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
