import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

export default function GlassCard({
  children,
  className,
  hover = true,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-panel overflow-hidden rounded-3xl border border-border",
        hover && "transition-all duration-500 hover:border-accent-soft/40",
        className,
      )}
    >
      {children}
    </div>
  );
}
