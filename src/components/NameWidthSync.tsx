"use client";

import { useLayoutEffect, useRef } from "react";

/**
 * Measures the rendered width of the brand name (matching Hero's desktop
 * name markup exactly) and exposes it as the --name-width CSS variable on
 * <html>. Mounted once in the root layout so every page shares the same
 * width reference, even pages that don't render Hero themselves.
 */
export function NameWidthSync() {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const updateWidth = () => {
      const width = el.getBoundingClientRect().width;
      if (width > 0) {
        document.documentElement.style.setProperty("--name-width", `${width}px`);
      }
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden
      className="font-display pointer-events-none invisible fixed left-0 top-0 -z-50 inline-flex flex-wrap items-baseline gap-x-6 text-[clamp(2rem,7vw,6rem)] font-extrabold uppercase leading-[0.9] tracking-tight lg:flex-nowrap lg:whitespace-nowrap"
    >
      <span className="tracking-[0.11em]">Vukašin</span>
      <span>Riznić</span>
    </span>
  );
}
