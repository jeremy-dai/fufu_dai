"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isAnimating) {
      timer = setTimeout(() => {
        startAnimation();
      }, duration);
    }
    return () => clearTimeout(timer);
  }, [isAnimating, duration, startAnimation]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        setIsAnimating(false);
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 6,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        exit={{
          opacity: 0,
          y: -6,
          position: "absolute",
        }}
        className={cn(
          "z-10 inline-block relative text-left text-zinc-100 px-2",
          className
        )}
        key={currentWord}
      >
        {currentWord}
      </motion.div>
    </AnimatePresence>
  );
};
