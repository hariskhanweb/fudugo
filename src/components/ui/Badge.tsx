import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-300",
        className,
      )}
    >
      {children}
    </span>
  );
}
