import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  action?: React.ReactNode;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  action,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-16",
        align === "center" && "text-center",
        action ? "flex flex-col gap-6 md:flex-row md:items-end md:justify-between" : null,
        className,
      )}
    >
      <div className={cn(align === "center" && "mx-auto")}>
        <span className="text-xs font-semibold uppercase tracking-widest text-accent-alt">
          {eyebrow}
        </span>
        <h2 className="mt-2 font-serif text-4xl font-bold text-foreground sm:text-5xl">
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              "mt-3 max-w-lg text-sm text-muted",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
