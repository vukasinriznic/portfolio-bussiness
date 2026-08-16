"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { AvailabilityBadge } from "@/components/AvailabilityBadge";
import { navLinks } from "@/lib/links";
import { projects, services } from "@/lib/data";

const navCounts: Record<string, number> = {
  Projekti: projects.length,
  Usluge: services.length,
};

const HEADER_HEIGHT = 64;

export function Header() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const aboutEl = document.getElementById("about");
    if (!aboutEl) return;

    const onScroll = () => {
      const rect = aboutEl.getBoundingClientRect();
      setDark(rect.top <= HEADER_HEIGHT && rect.bottom > 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header
      style={{ maxWidth: "var(--name-width, 80rem)" }}
      className={`fixed inset-x-0 top-0 z-30 mx-auto flex h-16 w-full items-center justify-between gap-4 px-5 transition-colors duration-300 sm:absolute sm:h-auto sm:bg-transparent sm:px-10 sm:py-8 md:grid md:grid-cols-[auto_1fr_auto] ${
        dark ? "bg-[#262626]" : "bg-background"
      }`}
    >
      <div className="flex items-center gap-3">
        <AvailabilityBadge />
      </div>

      <nav className="hidden items-center justify-center gap-8 md:flex">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-[16px] font-medium text-[#525252] transition-colors hover:text-foreground hover:[text-shadow:0_2px_6px_rgba(0,0,0,0.35)]"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center justify-end gap-3">
        <a
          href="/kontakt"
          className="group hidden items-center gap-2 rounded-full bg-foreground px-6 py-3 text-base font-normal text-background transition-all hover:-translate-y-0.5 hover:bg-foreground/85 hover:shadow-md md:inline-flex"
        >
          Pišite mi
          <Image
            src="/top-right.png"
            alt=""
            width={12}
            height={12}
            className="invert transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Otvori/zatvori meni"
          className="relative flex h-11 w-11 flex-col items-end justify-center gap-[5px] md:hidden"
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`block h-[2px] w-6 origin-center rounded-full transition-colors duration-300 ${dark ? "bg-white" : "bg-foreground"}`}
          />
          <motion.span
            animate={{ opacity: open ? 0 : 1, width: open ? 0 : 24 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`block h-[2px] rounded-full transition-colors duration-300 ${dark ? "bg-white" : "bg-foreground"}`}
          />
          <motion.span
            animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`block h-[2px] w-6 origin-center rounded-full transition-colors duration-300 ${dark ? "bg-white" : "bg-foreground"}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute left-0 right-0 top-full z-20 overflow-hidden transition-colors duration-300 md:hidden ${
              dark ? "bg-[#262626]" : "bg-background"
            }`}
          >
            <div
              className={`flex flex-col border-b px-5 pb-3 ${dark ? "border-white/15" : "border-border"}`}
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`group flex items-center gap-2 border-b py-[14px] last:border-0 ${dark ? "border-white/15" : "border-border"}`}
                >
                  <span
                    className={`text-[18px] font-medium transition-colors ${dark ? "text-white group-hover:text-white/70" : "text-foreground group-hover:text-[#525252]"}`}
                  >
                    {link.label}
                  </span>
                  {navCounts[link.label] !== undefined && (
                    <span
                      className={`text-[12px] font-semibold ${dark ? "text-white/40" : "text-[#a2a2a2]"}`}
                    >
                      [{navCounts[link.label]}]
                    </span>
                  )}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
