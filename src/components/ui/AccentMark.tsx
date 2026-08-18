import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type AccentMarkProps = {
  className?: string;
} & ComponentPropsWithoutRef<"span">;

export default function AccentMark({ className, ...props }: AccentMarkProps) {
  return (
    <span
      className={cn(
        "inline-block h-0.5 w-8 bg-accent-alt sm:w-10",
        className,
      )}
      aria-hidden
      {...props}
    />
  );
}
