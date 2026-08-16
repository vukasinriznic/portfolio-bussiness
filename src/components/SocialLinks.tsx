import type { ReactNode } from "react";
import { Home } from "lucide-react";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/icons/social-icons";
import { socialLinks } from "@/lib/links";

const icons = {
  home: Home,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  github: GithubIcon,
};

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
          {socialLinks.map((social) => {
            const Icon = icons[social.icon as keyof typeof icons];
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-full border border-border bg-white py-2 pl-2 pr-4 text-base font-normal text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ghost">
                  <Icon size={13} strokeWidth={2} />
                </span>
                {social.label}
              </a>
            );
          })}
        </li>
      ) : (
        socialLinks.map((social) => {
          const Icon = icons[social.icon as keyof typeof icons];
          return (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-full border border-border bg-white py-2 pl-2 pr-4 text-base font-normal text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ghost">
                  <Icon size={13} strokeWidth={2} />
                </span>
                {social.label}
              </a>
            </li>
          );
        })
      )}
    </ul>
  );
}
