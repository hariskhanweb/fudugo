import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

const variants = {
  primary:
    "bg-accent-alt text-white hover:bg-accent-soft shadow-xl shadow-[color-mix(in_srgb,var(--accent-alt)_28%,transparent)]",
  secondary:
    "border border-border bg-foreground/5 text-foreground hover:border-accent hover:bg-accent hover:text-white",
  ghost:
    "border border-border bg-panel text-foreground hover:border-accent-soft/50",
};

export default function Button({
  children,
  href,
  variant = "primary",
  className,
  type = "button",
  onClick,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-3 rounded-full px-8 py-3.5 text-xs font-bold uppercase tracking-wider transition-all",
    variants[variant],
    className,
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
