import Image from "next/image";
import { SectionLabel } from "@/components/SectionLabel";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/motion/Reveal";
import { projects } from "@/lib/data";

export function Work() {
  return (
    <section
      id="work"
      className="relative w-full overflow-hidden bg-surface pb-[64px] pt-[96px] sm:pb-[100px] sm:pt-[180px]"
    >
      <SectionLabel text="Projekti" />

      <div className="relative mx-auto max-w-[1044px] px-5 sm:px-10">
        <Reveal className="mb-10 text-center sm:mb-12">
          <h2>
            <span className="font-sans inline-block text-[32px] font-semibold uppercase tracking-tight text-foreground sm:text-[56px]">
              /Moji projekti
            </span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
          {projects.map((project) => (
            <Reveal key={project.title}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex justify-center sm:mt-12">
          <a
            href="/projekti"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-[15px] font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:text-base"
          >
            Pogledaj sve projekte
            <Image
              src="/top-right.png"
              alt=""
              width={12}
              height={12}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
