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
    "bg-[#00d084] text-black hover:bg-[#00e893] shadow-xl shadow-[#00d084]/25",
  secondary:
    "border border-white/10 bg-white/5 text-white hover:bg-[#00d084] hover:text-black",
  ghost: "border border-white/20 bg-black text-white hover:border-white/40",
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
