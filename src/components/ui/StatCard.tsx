import type { StatItem } from "@/types";

type StatCardProps = {
  item: StatItem;
  displayValue: string;
};

export default function StatCard({ item, displayValue }: StatCardProps) {
  const numeric = displayValue.replace(item.suffix, "");

  return (
    <article className="flex h-full flex-col gap-1">
      {/* Top */}
      <div className="flex items-start justify-between gap-2 rounded-2xl surface-card px-5 py-5 sm:px-6 sm:py-6 lg:px-7 lg:py-7">
        <p className="flex items-start gap-0.5 font-sans text-[clamp(40px,4.5vw,56px)] font-bold leading-none tracking-tight text-foreground">
          <span>{numeric}</span>
          <span className="mt-1 text-[0.55em] font-bold text-accent-alt sm:mt-1.5">
            {item.suffix}
          </span>
        </p>
        <span className="pt-1 font-sans text-xs text-muted sm:text-sm">
          {item.number}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between gap-6 rounded-2xl surface-card px-5 py-5 text-right sm:px-6 sm:py-6 lg:px-7 lg:py-7">
        <h3 className="font-sans text-base font-bold text-foreground sm:text-lg">
          {item.label}
        </h3>
        <p className="font-sans text-sm leading-relaxed text-muted">
          {item.description}
        </p>
      </div>
    </article>
  );
}
