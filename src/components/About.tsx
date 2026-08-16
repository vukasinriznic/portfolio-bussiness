"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Logo } from "./Logo";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const paragraphWords = [
  "Kao",
  "web",
  "developer,",
  "gradim",
  "sajtove",
  "i",
  "web",
  "aplikacije",
  "kod",
  "kojih",
  "dizajn",
  "i",
  "funkcionalnost",
  "rade",
  "zajedno,",
  "uz",
  "pažnju",
  "na",
  "svaki",
  "detalj",
  "od",
  "prve",
  "ideje",
  "do",
  "gotovog",
  "proizvoda.",
];

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const words = wordsRef.current ? Array.from(wordsRef.current.children) : [];

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      })
        .to(logoRef.current, {
          scale: 16,
          opacity: 0,
          ease: "power1.in",
          duration: 1,
        })
        .fromTo(
          textRef.current,
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, ease: "power2.out", duration: 0.6 },
          0.85,
        )
        .to(
          words,
          { opacity: 1, stagger: 0.08, ease: "none", duration: 0.5 },
          1.5,
        );
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative h-[260vh] w-full bg-[#262626] motion-reduce:h-auto"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden motion-reduce:static motion-reduce:h-auto motion-reduce:min-h-screen motion-reduce:flex-col motion-reduce:gap-10 motion-reduce:overflow-visible motion-reduce:py-24">
        <Logo
          ref={logoRef}
          className="absolute h-[calc(100vw-40px)] w-[calc(100vw-40px)] overflow-visible text-white motion-reduce:static sm:h-64 sm:w-64 lg:h-124 lg:w-124"
        />
        <div
          ref={textRef}
          className="absolute inset-0 flex items-center opacity-0 scale-[0.85] motion-reduce:static motion-reduce:inset-auto motion-reduce:opacity-100 motion-reduce:scale-100"
        >
          <div
            style={{ maxWidth: "var(--name-width, 80rem)" }}
            className="relative mx-auto w-full px-5 sm:px-10"
          >
            <p
              ref={wordsRef}
              className="font-sans text-left text-[31px] font-medium uppercase leading-tight tracking-normal text-white sm:text-[36px] lg:text-[60px]"
            >
              {paragraphWords.map((word, i) => (
                <span
                  key={i}
                  className="inline-block opacity-20 motion-reduce:opacity-100"
                >
                  {word}
                  {i < paragraphWords.length - 1 ? " " : ""}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
