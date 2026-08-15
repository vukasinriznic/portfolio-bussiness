import Image from "next/image";
import { AvailabilityBadge } from "@/components/AvailabilityBadge";
import { SocialLinks } from "@/components/SocialLinks";

export function CTA() {
  return (
    <section
      id="contact"
      className="relative flex min-h-screen w-full flex-col items-center justify-center gap-12 overflow-hidden bg-surface px-5 pb-[64px] pt-[64px] sm:gap-16 sm:px-10 sm:pb-[100px] sm:pt-[100px]"
    >
      <Image
        src="/cta-waves.svg"
        alt=""
        fill
        aria-hidden
        className="pointer-events-none object-cover"
      />

      <div className="relative flex flex-col items-center gap-6 text-center">
        <AvailabilityBadge fullTextOnMobile />

        <div className="flex flex-col items-center gap-1">
          <h2 className="font-sans text-[28px] font-extrabold uppercase leading-tight tracking-tight text-foreground sm:whitespace-nowrap sm:text-[42px] lg:text-[64px]">
            Have a project in mind?
          </h2>

          <p className="max-w-xl text-[14px] leading-relaxed text-[#525252] sm:text-[20px]">
            Whether you&apos;re launching something new, improving an
            existing product, or exploring a fresh idea, I&apos;d love to
            help bring your vision to life.
          </p>
        </div>

        <a
          href="mailto:riznicvukasin@gmail.com"
          className="group mt-4 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3 text-[15px] font-normal text-background transition-colors hover:bg-foreground/85 sm:text-base"
        >
          Start a Conversation
          <Image
            src="/top-right.png"
            alt=""
            width={12}
            height={12}
            className="invert transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>

      <div
        style={{ maxWidth: "var(--name-width, 80rem)" }}
        className="relative mt-auto w-full pt-2 sm:pt-8"
      >
        <SocialLinks
          direction="row"
          leading={
            <span className="inline-flex items-center gap-2.5 rounded-full bg-foreground py-1.5 pl-1.5 pr-4 text-background">
              <Image
                src="/images/profile.png"
                alt="Vukašin Riznić"
                width={28}
                height={28}
                className="h-7 w-7 rounded-full object-cover"
              />
              <span className="text-sm font-semibold">Vukašin Riznić</span>
            </span>
          }
        />
      </div>
    </section>
  );
}
