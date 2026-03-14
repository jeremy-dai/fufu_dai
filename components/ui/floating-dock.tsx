"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface DockItem {
  title: string;
  icon: React.ReactNode;
  href?: string;
  external?: boolean;
  onClick?: () => void;
}

export function FloatingDock({
  items,
  className,
}: {
  items: DockItem[];
  className?: string;
}) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-end gap-2 rounded-2xl border border-zinc-700 bg-zinc-800/90 px-3 py-2 backdrop-blur-md",
        className
      )}
    >
      {items.map((item) => (
        <DockIcon mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
}

function DockIcon({
  mouseX,
  title,
  icon,
  href,
  external,
  onClick,
}: DockItem & { mouseX: MotionValue }) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 56, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const inner = (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      className="group relative flex aspect-square items-center justify-center rounded-xl bg-zinc-800 text-zinc-300 hover:text-sky-400"
    >
      {icon}
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300 opacity-0 transition-opacity group-hover:opacity-100">
        {title}
      </span>
    </motion.div>
  );

  if (onClick) {
    return <button onClick={onClick}>{inner}</button>;
  }

  const Tag = external ? "a" : Link;
  const extraProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Tag href={href!} {...extraProps}>
      {inner}
    </Tag>
  );
}
