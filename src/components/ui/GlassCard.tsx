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
        "glass-panel overflow-hidden rounded-3xl border border-white/10",
        hover && "transition-all duration-500 hover:border-[#00d084]/50",
        className,
      )}
    >
      {children}
    </div>
  );
}
