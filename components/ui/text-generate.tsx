"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function TextGenerate({
  words,
  className,
}: {
  words: string;
  className?: string;
}) {
  const [complete, setComplete] = useState(false);
  const characters = words.split("");

  useEffect(() => {
    const timeout = setTimeout(
      () => setComplete(true),
      characters.length * 30 + 500
    );
    return () => clearTimeout(timeout);
  }, [characters.length]);

  return (
    <span className={cn("inline", className)}>
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15, delay: i * 0.03 }}
          className={complete ? "" : undefined}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}
