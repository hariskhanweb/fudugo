import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "solid-white"
  | "glass"
  | "accent"
  | "link";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtonShape = "pill" | "rounded" | "square";

export type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  href?: string;
  /** Trailing or leading icon. `true` renders the default arrow. */
  icon?: React.ReactNode | boolean;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  target?: string;
  rel?: string;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent-alt text-white hover:bg-accent-alt/90",
  secondary:
    "border border-border bg-surface text-foreground hover:border-border-hover hover:bg-surface-hover",
  outline:
    "border border-border bg-transparent text-foreground hover:border-border-hover hover:bg-foreground/5",
  ghost:
    "bg-transparent text-foreground hover:bg-foreground/5",
  "solid-white":
    "bg-white text-black hover:bg-white/90",
  glass:
    "border border-white/15 bg-white/5 text-white/85 backdrop-blur-sm hover:border-white/25 hover:bg-white/10 hover:text-white",
  accent:
    "bg-accent text-white hover:bg-accent/90",
  link:
    "h-auto bg-transparent p-0 text-accent-alt underline-offset-4 hover:underline",
};

const sizeStyles: Record<
  ButtonSize,
  { root: string; icon: string; link: string }
> = {
  xs: {
    root: "gap-1.5 px-3 py-1.5 text-xs",
    icon: "h-3 w-3",
    link: "text-xs",
  },
  sm: {
    root: "gap-2 px-3.5 py-2 text-sm",
    icon: "h-3.5 w-3.5",
    link: "text-sm",
  },
  md: {
    root: "gap-2 px-5 py-2.5 text-sm",
    icon: "h-3.5 w-3.5",
    link: "text-sm",
  },
  lg: {
    root: "gap-2.5 px-6 py-3 text-[15px] font-semibold",
    icon: "h-4 w-4",
    link: "text-[15px] font-semibold",
  },
  xl: {
    root: "gap-3 px-7 py-3.5 text-base font-semibold",
    icon: "h-4 w-4",
    link: "text-base font-semibold",
  },
};

const shapeStyles: Record<ButtonShape, string> = {
  pill: "rounded-full",
  rounded: "rounded-[6px]",
  square: "rounded-[4px]",
};

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function resolveIcon(
  icon: ButtonProps["icon"],
  iconClassName: string,
): React.ReactNode | null {
  if (icon === false || icon == null) return null;
  if (icon === true) return <ArrowIcon className={iconClassName} />;
  return icon;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  shape = "rounded",
  href,
  icon,
  iconPosition = "right",
  fullWidth = false,
  className,
  type = "button",
  disabled = false,
  onClick,
  target,
  rel,
}: ButtonProps) {
  const isLink = variant === "link";
  const styles = sizeStyles[size];
  const iconNode = resolveIcon(icon, styles.icon);
  const showIcon = iconNode != null;
  const isExternal = href?.startsWith("http");

  const classes = cn(
    "group inline-flex shrink-0 items-center justify-center font-sans font-medium transition-[color,background-color,border-color,transform] duration-200",
    !isLink && "disabled:pointer-events-none disabled:opacity-50",
    variantStyles[variant],
    isLink ? styles.link : cn(shapeStyles[shape], styles.root),
    fullWidth && "w-full",
    className,
  );

  const iconEl = showIcon ? (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center transition-transform duration-200",
        iconPosition === "left"
          ? "group-hover:-translate-x-0.5"
          : "group-hover:translate-x-0.5",
        variant === "glass" && "text-white/70",
      )}
    >
      {iconNode}
    </span>
  ) : null;

  const content = (
    <>
      {showIcon && iconPosition === "left" ? iconEl : null}
      <span>{children}</span>
      {showIcon && iconPosition === "right" ? iconEl : null}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        target={target ?? (isExternal ? "_blank" : undefined)}
        rel={rel ?? (isExternal ? "noopener noreferrer" : undefined)}
        aria-disabled={disabled || undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
