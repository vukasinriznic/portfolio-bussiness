import { User } from "lucide-react";
import Image from "next/image";

export function ProfilePhoto({ src }: { src: string | null }) {
  if (!src) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-end gap-3 rounded-[2rem] border border-dashed border-border bg-ghost/60 pb-6 text-center text-muted">
        <User size={56} strokeWidth={1.25} />
        <p className="max-w-[14rem] text-xs leading-relaxed">
          Ubaci sliku u{" "}
          <code className="rounded bg-white px-1 py-0.5">
            public/images/vukasin_hero.png
          </code>
        </p>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt="Vukašin Riznić"
      fill
      priority
      sizes="(min-width: 1024px) 46rem, (min-width: 640px) 38rem, 30rem"
      className="object-cover object-top"
    />
  );
}
