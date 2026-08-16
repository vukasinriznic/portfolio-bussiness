import Image from "next/image";
import { SectionLabel } from "@/components/SectionLabel";
import { projects } from "@/lib/data";

export function Work() {
  return (
    <section
      id="work"
      className="relative w-full overflow-hidden bg-surface pb-[64px] pt-[96px] sm:pb-[100px] sm:pt-[180px]"
    >
      <SectionLabel text="Projekti" />

      <div className="relative mx-auto max-w-[1044px] px-5 sm:px-10">
        <h2 className="mb-10 text-center sm:mb-12">
          <span className="font-sans inline-block text-[32px] font-semibold uppercase tracking-tight text-foreground sm:text-[56px]">
            /Moji projekti
          </span>
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group cursor-pointer overflow-hidden bg-white p-[2px] transition-shadow hover:shadow-md"
            >
              <div className="relative h-[200px] w-full overflow-hidden bg-ghost sm:h-[250px] lg:h-[300px]">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-ghost via-border to-ghost transition-transform duration-500 ease-out group-hover:scale-105">
                  <span className="font-display select-none text-5xl font-extrabold text-white/70">
                    {project.title
                      .split(" ")
                      .slice(-2)
                      .map((w) => w[0])
                      .join("")
                      .toUpperCase()}
                  </span>
                </div>

                <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-20" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-12 w-12 scale-50 items-center justify-center rounded-full border border-border bg-white opacity-0 [transition:opacity_0.28s_ease,scale_0.28s_cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-100 group-hover:opacity-100">
                    <Image src="/top-right.png" alt="" width={12} height={12} />
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-4 px-[14px] pt-[28px] pb-[32px] lg:px-[16px] lg:pt-[32px] lg:pb-[36px]">
                <h3 className="line-clamp-2 text-[18px] font-medium text-foreground sm:text-[24px]">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-white px-5 py-2 text-[13px] font-normal text-[#262626] sm:text-base"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:mt-12">
          <a
            href="#"
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
        </div>
      </div>
    </section>
  );
}
