import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AvailabilityBadge } from "@/components/AvailabilityBadge";
import { ProjectCard } from "@/components/ProjectCard";
import { CTA } from "@/components/CTA";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Svi projekti — Vukašin Riznić",
  description:
    "Pregled svih projekata koje je Vukašin Riznić dizajnirao i razvijao.",
};

function projectWord(count: number) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return "projekat";
  if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) {
    return "projekta";
  }
  return "projekata";
}

export default function ProjektiPage() {
  return (
    <div className="relative flex flex-1 flex-col bg-surface">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 pb-5 pt-7 sm:px-10 sm:pt-8">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-full border border-border bg-white py-3 pl-4 pr-5 text-[15px] font-medium text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          Nazad
        </Link>
        <AvailabilityBadge />
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 pb-6 pt-8 sm:px-10">
        <h1 className="font-sans text-[40px] font-semibold uppercase tracking-tight text-foreground sm:text-[64px] lg:text-[80px]">
          /Svi projekti
        </h1>
        <p className="mt-2 text-[15px] font-medium text-[#525252] sm:text-lg">
          {projects.length} {projectWord(projects.length)}
        </p>
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 pb-16 sm:px-10 sm:pb-[100px]">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>

      <CTA />
    </div>
  );
}
