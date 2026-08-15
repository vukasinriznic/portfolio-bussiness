export function AvailabilityBadge({
  fullTextOnMobile = false,
}: {
  fullTextOnMobile?: boolean;
}) {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-border bg-white/60 px-[10px] py-[6px] text-[13px] font-medium tracking-wide text-foreground shadow-sm backdrop-blur-sm sm:px-5 sm:py-2.5 sm:text-sm">
      <span className="badge-dot-pulse h-2.5 w-2.5 rounded-full bg-emerald-500" />
      {fullTextOnMobile ? (
        "Dostupan za saradnju"
      ) : (
        <>
          <span className="sm:hidden">Dostupan</span>
          <span className="hidden sm:inline">Dostupan za saradnju</span>
        </>
      )}
    </div>
  );
}
