"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { staggerContainer, viewportOnce } from "@/lib/motion";

export function RevealGroup(props: HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={staggerContainer}
      {...props}
    />
  );
}
