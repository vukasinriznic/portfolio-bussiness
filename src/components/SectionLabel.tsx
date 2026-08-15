export function SectionLabel({ text }: { text: string }) {
  return (
    <p
      aria-hidden="true"
      className="font-display pointer-events-none absolute inset-x-0 top-22 w-full origin-bottom -translate-y-[calc(100%-2rem)] scale-y-[1.3] select-none text-center text-[clamp(3rem,10vw,8.5rem)] font-extrabold uppercase leading-none tracking-[0.04em] text-[#efefef] sm:top-[180px] sm:-translate-y-[calc(100%-3.4rem)]"
    >
      {text}
    </p>
  );
}
