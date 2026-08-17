import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AvailabilityBadge } from "@/components/AvailabilityBadge";
import { ContactForm } from "@/components/ContactForm";
import { SocialLinks } from "@/components/SocialLinks";
import { Reveal } from "@/components/motion/Reveal";
import { RevealItem } from "@/components/motion/RevealItem";
import { LoadGroup } from "@/components/motion/LoadGroup";

export const metadata: Metadata = {
  title: "Kontakt — Vukašin Riznić",
  description:
    "Pošaljite detalje o vašem projektu i Vukašin Riznić će vam odgovoriti u roku od 24h.",
  alternates: {
    canonical: "/kontakt",
  },
};

export default function KontaktPage() {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-surface">
      <Image
        src="/cta-waves.svg"
        alt=""
        fill
        aria-hidden
        className="pointer-events-none object-cover"
      />

      <LoadGroup
        style={{ maxWidth: "var(--name-width, 80rem)" }}
        className="relative mx-auto flex w-full items-center justify-between px-5 pb-5 pt-7 sm:px-10 sm:pt-8"
      >
        <RevealItem>
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
        </RevealItem>
        <RevealItem>
          <AvailabilityBadge />
        </RevealItem>
      </LoadGroup>

      <div className="relative mx-auto w-full max-w-3xl px-5 pb-16 pt-8 sm:px-10 sm:pb-24">
        <Reveal>
          <h1 className="font-sans text-[32px] font-extrabold uppercase leading-tight tracking-tight text-foreground sm:text-[56px]">
            Hajde da diskutujemo o vašem projektu
          </h1>
          <p className="mt-1 text-[16px] leading-relaxed text-[#525252] sm:text-[20px]">
            Recite mi više o projektu, brzo odgovaram.
          </p>
        </Reveal>

        <Reveal className="mt-4">
          <ContactForm />
        </Reveal>
      </div>

      <Reveal
        style={{ maxWidth: "var(--name-width, 80rem)" }}
        className="relative mx-auto w-full px-5 pb-16 pt-8 sm:px-10 sm:pb-24"
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
      </Reveal>
    </div>
  );
}
