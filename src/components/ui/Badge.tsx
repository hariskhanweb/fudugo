import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border border-border bg-foreground/5 px-3 py-1.5 text-xs text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
