"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { SectionLabel } from "@/components/SectionLabel";
import { services } from "@/lib/data";

const ACCORDION_TRANSITION = { duration: 0.5, ease: [0.22, 1, 0.36, 1] } as const;
const ACCORDION_EASE_CSS = "duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

export function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="services"
      className="relative w-full overflow-hidden bg-surface pb-[64px] pt-[96px] sm:pb-[100px] sm:pt-[180px]"
    >
      <SectionLabel text="Usluge" />

      <div
        style={{ maxWidth: "var(--name-width, 80rem)" }}
        className="relative mx-auto px-5 sm:px-10"
      >
        <h2 className="mb-10 text-center sm:mb-12">
          <span className="font-sans inline-block text-[32px] font-semibold uppercase tracking-tight text-foreground sm:text-[56px]">
            /Usluge
          </span>
        </h2>

        <div className="flex flex-col">
          {services.map((service, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={service.title}
                onClick={() => {
                  if (!isOpen) setOpenIndex(index);
                }}
                className={`relative cursor-pointer overflow-hidden border-b border-[#525252] last:border-b-0 transition-all ${ACCORDION_EASE_CSS} ${
                  isOpen ? "rounded-xl bg-[#262626]" : "bg-transparent hover:bg-[#EEEEEE]"
                }`}
              >
                <div
                  className={`flex items-center justify-between gap-4 px-[30px] pt-7 transition-all ${ACCORDION_EASE_CSS} lg:pt-[48px] ${
                    isOpen ? "pb-5 lg:pb-6" : "pb-7 lg:pb-[48px]"
                  }`}
                >
                  <span
                    className={`flex-1 font-sans text-[20px] font-medium uppercase leading-tight tracking-normal transition-colors ${ACCORDION_EASE_CSS} sm:truncate sm:text-[36px] lg:text-[64px] ${
                      isOpen ? "text-white md:max-w-[calc(100%-224px)] lg:max-w-[calc(100%-288px)]" : "text-foreground"
                    }`}
                  >
                    {service.title}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenIndex(isOpen ? null : index);
                    }}
                    className="relative h-7 w-7 shrink-0 sm:h-12 sm:w-12"
                  >
                    <motion.span
                      animate={{
                        opacity: isOpen ? 0 : 1,
                        scale: isOpen ? 0.5 : 1,
                        rotate: isOpen ? 45 : 0,
                      }}
                      transition={ACCORDION_TRANSITION}
                      className="absolute inset-0"
                    >
                      <Image
                        src="/top-right.png"
                        alt=""
                        width={32}
                        height={32}
                        className="absolute inset-0 m-auto h-5 w-5 sm:h-8 sm:w-8"
                      />
                    </motion.span>
                    <motion.span
                      animate={{
                        opacity: isOpen ? 1 : 0,
                        scale: isOpen ? 1 : 0.5,
                        rotate: isOpen ? 0 : -45,
                      }}
                      transition={ACCORDION_TRANSITION}
                      className="absolute inset-0"
                    >
                      <Image
                        src="/close.png"
                        alt=""
                        width={32}
                        height={32}
                        className="absolute inset-0 m-auto h-5 w-5 invert sm:h-8 sm:w-8"
                      />
                    </motion.span>
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={ACCORDION_TRANSITION}
                      className="absolute right-[102px] top-6 bottom-6 hidden w-40 items-center justify-center overflow-hidden rounded-lg bg-white/10 md:flex lg:top-[48px] lg:bottom-[48px] lg:w-56"
                    >
                      <span className="text-xs font-medium uppercase tracking-wide text-white/30">
                        Pregled
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={ACCORDION_TRANSITION}
                      className="overflow-hidden"
                    >
                      <p className="w-full px-[30px] pb-6 text-[14px] leading-relaxed text-[#D3D3D3] sm:text-xl md:w-1/2 lg:pb-[48px]">
                        {service.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
