"use client";

import { useState, type MouseEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { Home, Phone } from "lucide-react";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/icons/social-icons";
import { socialLinks } from "@/lib/links";

const icons = {
  home: Home,
  phone: Phone,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  github: GithubIcon,
};

function SocialLinkItem({ social }: { social: (typeof socialLinks)[number] }) {
  const Icon = icons[social.icon as keyof typeof icons];
  const isPhone = social.icon === "phone";
  const [qrOpen, setQrOpen] = useState(false);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!isPhone) return;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (canHover) {
      e.preventDefault();
      setQrOpen((v) => !v);
    }
  };

  return (
    <div className="relative">
      <a
        href={social.href}
        target={isPhone ? undefined : "_blank"}
        rel={isPhone ? undefined : "noopener noreferrer"}
        onClick={handleClick}
        onMouseEnter={() => isPhone && setQrOpen(true)}
        onMouseLeave={() => isPhone && setQrOpen(false)}
        className="flex items-center gap-2.5 rounded-full border border-border bg-white py-2 pl-2 pr-4 text-base font-normal text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ghost">
          <Icon size={13} strokeWidth={2} />
        </span>
        {social.label}
      </a>

      {isPhone && (
        <AnimatePresence>
          {qrOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-full left-1/2 z-30 mb-3 w-[180px] -translate-x-1/2 rounded-2xl border border-border bg-white p-4 text-center shadow-lg"
            >
              <Image
                src="/qr-phone.png"
                alt="QR kod za poziv"
                width={140}
                height={140}
                className="mx-auto h-[140px] w-[140px]"
              />
              <p className="mt-2 text-xs font-medium text-muted">
                Skenirajte da pozovete
              </p>
              <p className="text-xs font-semibold text-foreground">
                +381 65 5339481
              </p>
              <div className="absolute left-1/2 top-full h-3 w-3 -translate-x-1/2 -translate-y-1.5 rotate-45 border-b border-r border-border bg-white" />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

export function SocialLinks({
  className = "",
  direction = "col",
  leading,
}: {
  className?: string;
  direction?: "row" | "col";
  leading?: ReactNode;
}) {
  return (
    <ul
      className={`flex ${
        leading
          ? "flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          : `${direction === "row" ? "flex-row flex-wrap" : "flex-col"} gap-3`
      } ${className}`}
    >
      {leading && <li className="flex justify-center sm:block">{leading}</li>}
      {leading ? (
        <li className="grid grid-cols-2 gap-3 sm:contents">
          {socialLinks.map((social) => (
            <SocialLinkItem key={social.label} social={social} />
          ))}
        </li>
      ) : (
        socialLinks.map((social) => (
          <li key={social.label}>
            <SocialLinkItem social={social} />
          </li>
        ))
      )}
    </ul>
  );
}
