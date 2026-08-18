import { cn } from "@/lib/utils";

type PillButtonSize = "normal" | "lg" | "xl";

type PillButtonProps = {
  children: React.ReactNode;
  href?: string;
  /**
   * Trailing icon in the accent circle.
   * - omit / `false` — text only
   * - `true` — default arrow
   * - ReactNode — custom icon
   */
  icon?: React.ReactNode | boolean;
  size?: PillButtonSize;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

const sizeStyles: Record<
  PillButtonSize,
  { withIcon: string; withoutIcon: string; iconWrap: string; icon: string }
> = {
  normal: {
    withIcon: "gap-3 py-2 pl-5 pr-2 text-sm",
    withoutIcon: "px-5 py-2.5 text-sm",
    iconWrap: "h-9 w-9",
    icon: "h-3.5 w-3.5",
  },
  lg: {
    withIcon: "gap-3.5 py-2.5 pl-6 pr-2.5 text-base",
    withoutIcon: "px-6 py-3 text-base",
    iconWrap: "h-10 w-10",
    icon: "h-4 w-4",
  },
  xl: {
    withIcon: "gap-4 py-3 pl-7 pr-3 text-lg",
    withoutIcon: "px-7 py-3.5 text-lg",
    iconWrap: "h-12 w-12",
    icon: "h-5 w-5",
  },
};

function DefaultArrowIcon({ className = "" }: { className?: string }) {
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
  icon: PillButtonProps["icon"],
  iconClassName: string,
): React.ReactNode | null {
  if (icon === false || icon == null) return null;
  if (icon === true) return <DefaultArrowIcon className={iconClassName} />;
  return <span className={cn("flex items-center justify-center", iconClassName)}>{icon}</span>;
}

export default function PillButton({
  children,
  href,
  icon = false,
  size = "normal",
  className,
  type = "button",
  onClick,
}: PillButtonProps) {
  const styles = sizeStyles[size];
  const iconNode = resolveIcon(icon, styles.icon);
  const showIcon = iconNode != null;

  const classes = cn(
    "group inline-flex shrink-0 items-center rounded-full border border-border/70 bg-background/80 font-sans font-semibold text-foreground transition-[border-color,background-color] duration-300 hover:border-accent-alt/40 hover:bg-background",
    showIcon ? styles.withIcon : styles.withoutIcon,
    className,
  );

  const content = (
    <>
      {children}
      {showIcon ? (
        <span
          className={cn(
            "flex items-center justify-center rounded-full bg-accent-alt text-background transition-transform duration-300 group-hover:translate-x-0.5",
            styles.iconWrap,
          )}
        >
          {iconNode}
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
