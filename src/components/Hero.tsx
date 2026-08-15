"use client";

import { useLayoutEffect, useRef } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { Home } from "lucide-react";
import { ProfilePhoto } from "@/components/ProfilePhoto";
import { SocialLinks } from "@/components/SocialLinks";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/icons/social-icons";
import { socialLinks } from "@/lib/links";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const itemText = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: -44,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const mobileSocialIcons = {
  home: Home,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  github: GithubIcon,
};

const mobileSocialPosition: Record<string, string> = {
  Afera: "left-4 top-[18%]",
  Instagram: "left-2 top-[54%]",
  LinkedIn: "right-4 top-[26%]",
  GitHub: "right-2 top-[58%]",
};

export function Hero({ photoSrc }: { photoSrc: string | null }) {
  const nameRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = nameRef.current;
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
    <section id="home" className="relative w-full shrink-0 md:h-screen">
      {/* Mobile hero */}
      <div className="flex w-full flex-col items-center pt-16 md:hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[52dvh] w-full overflow-hidden bg-ghost"
        >
          <div className="absolute inset-0 translate-y-3">
            <ProfilePhoto src={photoSrc} />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(var(--background) 0%, color-mix(in srgb, var(--background) 90%, transparent) 4%, color-mix(in srgb, var(--background) 40%, transparent) 10%, transparent 18%, transparent 50%, color-mix(in srgb, var(--background) 45%, transparent) 66%, color-mix(in srgb, var(--background) 90%, transparent) 84%, var(--background) 100%)",
            }}
          />

          {socialLinks.map((social) => {
            const Icon = mobileSocialIcons[social.icon as keyof typeof mobileSocialIcons];
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`absolute z-10 flex items-center gap-[7px] rounded-full bg-white/80 px-[10px] py-2 text-[12px] font-medium text-foreground shadow-[0_2px_12px_rgba(0,0,0,0.1)] backdrop-blur-md ${mobileSocialPosition[social.label]}`}
              >
                <Icon size={15} strokeWidth={2} />
                {social.label}
              </a>
            );
          })}
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex w-full flex-col items-center gap-6 px-6 pb-14 pt-8 text-center"
        >
          <motion.h1
            variants={itemText}
            className="font-display flex select-none flex-col items-center text-center text-[clamp(2.25rem,11vw,3.5rem)] font-extrabold uppercase leading-[0.95] tracking-tight"
          >
            <span className="inline-block origin-bottom scale-y-[1.15] tracking-[0.02em] [paint-order:stroke_fill] text-white [-webkit-text-stroke:2px_#111111]">
              Vukašin
            </span>
            <span className="inline-block origin-bottom scale-y-[1.15] text-foreground">
              Riznić
            </span>
          </motion.h1>

          <motion.h2
            variants={item}
            className="font-display inline-block origin-bottom scale-y-[1.3] text-[20px] font-extrabold leading-tight tracking-tight text-foreground -mt-7"
          >
            Web developer
          </motion.h2>

          <motion.p variants={item} className="-mt-5 max-w-[26rem] text-[14px] leading-relaxed text-[#525252]">
            I design and build fast, accessible websites and web apps that
            feel simple to use and are built to last.
          </motion.p>

          <motion.a
            variants={item}
            href="#contact"
            className="group mt-2 flex w-full max-w-[280px] items-center justify-center gap-2.5 rounded-full bg-foreground px-6 py-[14px] text-[15px] font-normal text-background shadow-[0_4px_5px_rgba(0,0,0,0.2)] transition-colors hover:bg-foreground/85"
          >
            Let&apos;s collaborate
            <Image
              src="/top-right.png"
              alt=""
              width={12}
              height={12}
              className="invert transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </motion.a>
        </motion.div>
      </div>

      {/* Desktop hero */}
      <div className="hidden md:flex md:h-full md:w-full">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-end px-6 pb-0 sm:px-10">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex w-full flex-col items-center"
          >
            <div className="relative flex w-full flex-col items-center">
              <motion.h1
                variants={itemText}
                className="font-display flex select-none justify-center text-center text-[clamp(2rem,7vw,6rem)] font-extrabold uppercase leading-[0.9] tracking-tight"
              >
                <span
                  ref={nameRef}
                  className="inline-flex flex-wrap items-baseline gap-x-6 lg:flex-nowrap lg:whitespace-nowrap"
                >
                  <span className="inline-block origin-bottom scale-y-[1.3] tracking-[0.11em] [paint-order:stroke_fill] text-white [-webkit-text-stroke:2.5px_#111111] lg:[-webkit-text-stroke:3px_#111111]">
                    Vukašin
                  </span>
                  <span className="inline-block origin-bottom scale-y-[1.3] text-foreground">
                    Riznić
                  </span>
                </span>
              </motion.h1>

              <motion.div
                variants={item}
                className="relative z-10 aspect-[5/3] w-[32rem] shrink-0 -mt-[63px] overflow-hidden lg:-mt-[71px] lg:w-[47rem]"
              >
                <ProfilePhoto src={photoSrc} />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={item}
          initial="hidden"
          animate="show"
          style={{ maxWidth: "var(--name-width, 80rem)" }}
          className="pointer-events-none absolute inset-x-0 bottom-16 z-20 mx-auto flex flex-col items-start px-10"
        >
          <h2 className="font-display pointer-events-auto inline-block origin-bottom scale-y-[1.3] whitespace-nowrap text-xl font-extrabold leading-tight tracking-tight text-foreground">
            Web developer
          </h2>
          <p className="pointer-events-auto mt-2 max-w-[26rem] text-base leading-relaxed text-[#525252]">
            I design and build fast, accessible websites and web apps that feel
            simple to use and are built to last.
          </p>
          <a
            href="#contact"
            className="group pointer-events-auto mt-4 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-base font-normal text-background transition-colors hover:bg-foreground/85"
          >
            Let&apos;s collaborate
            <Image
              src="/top-right.png"
              alt=""
              width={12}
              height={12}
              className="invert transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </motion.div>

        <motion.div
          variants={item}
          initial="hidden"
          animate="show"
          style={{ maxWidth: "var(--name-width, 80rem)" }}
          className="pointer-events-none absolute inset-x-0 bottom-16 z-20 mx-auto flex justify-end px-10"
        >
          <SocialLinks className="pointer-events-auto" />
        </motion.div>
      </div>
    </section>
  );
}
