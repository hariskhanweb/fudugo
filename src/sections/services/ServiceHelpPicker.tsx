"use client";

import { useId, useState } from "react";
import { Container, PillButton } from "@/components/ui";
import { cn } from "@/lib/utils";

export type ServiceHelpContent = {
  eyebrow: string;
  title: string;
  options: string[];
  ctaLabel: string;
  ctaHref: string;
};

type ServiceHelpPickerProps = {
  content: ServiceHelpContent;
  className?: string;
  revealAttr?: string;
};

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M2.5 7.2 5.4 10l6-7"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M7 2v10M2 7h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M2.5 2.5 9.5 9.5M9.5 2.5 2.5 9.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ServiceHelpPicker({
  content,
  className,
  revealAttr = "reveal",
}: ServiceHelpPickerProps) {
  const listId = useId();
  const [selected, setSelected] = useState<string[]>([]);
  const [lastToggled, setLastToggled] = useState<string | null>(null);
  const { eyebrow, title, options, ctaLabel, ctaHref } = content;
  const hasSelection = selected.length > 0;

  const toggle = (option: string) => {
    setLastToggled(option);
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option],
    );
  };

  const remove = (option: string) => {
    setSelected((prev) => prev.filter((item) => item !== option));
  };

  const clear = () => {
    setSelected([]);
    setLastToggled(null);
  };

  const href = hasSelection
    ? `${ctaHref}?need=${encodeURIComponent(selected.join(", "))}`
    : ctaHref;

  const heading = eyebrow.endsWith("?") ? eyebrow : `${eyebrow}?`;

  return (
    <section
      className={cn("bg-background py-16 sm:py-20 lg:py-24", className)}
      aria-labelledby={listId}
    >
      <Container className="px-5 sm:px-8 lg:px-10">
        <div data-web={revealAttr} className="mx-auto max-w-2xl text-center">
          <h2
            id={listId}
            className="font-sans text-[clamp(1.875rem,calc(3vw+1rem),3.25rem)] font-bold tracking-tight text-foreground"
          >
            {heading}
          </h2>
          <p className="mt-4 font-sans text-sm text-muted sm:text-[15px]">
            Select everything you need — we&apos;ll tailor the next step.
          </p>
        </div>

        <div
          data-web={revealAttr}
          role="group"
          aria-label="Service needs"
          className="mx-auto mt-10 grid max-w-4xl gap-3 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          {options.map((option, index) => {
            const active = selected.includes(option);
            const justToggled = lastToggled === option;

            return (
              <button
                key={option}
                type="button"
                onClick={() => toggle(option)}
                aria-pressed={active}
                className={cn(
                  "group relative flex items-center gap-3.5 overflow-hidden rounded-2xl border px-4 py-4 text-left outline-none transition-[border-color,background-color,box-shadow,transform,color] duration-300",
                  "focus-visible:ring-2 focus-visible:ring-accent-alt/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  "active:scale-[0.985]",
                  active
                    ? "border-accent-alt/45 bg-accent-alt/10 text-foreground shadow-[0_0_0_1px_color-mix(in_srgb,var(--accent-alt)_18%,transparent)]"
                    : "border-border/60 bg-surface/25 text-foreground hover:-translate-y-0.5 hover:border-border-hover hover:bg-surface/45 hover:shadow-[0_12px_28px_-18px_rgba(0,0,0,0.55)]",
                  justToggled && active && "animate-help-pop",
                )}
              >
                <span
                  className={cn(
                    "font-sans text-[11px] font-semibold tabular-nums tracking-wider transition-colors",
                    active ? "text-accent-alt" : "text-muted",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="min-w-0 flex-1 font-sans text-sm font-medium sm:text-[15px]">
                  {option}
                </span>

                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color,color,transform] duration-300",
                    active
                      ? "scale-100 border-accent-alt bg-accent-alt text-background"
                      : "border-border/80 text-muted group-hover:border-border-hover group-hover:text-foreground",
                  )}
                >
                  {active ? (
                    <CheckIcon className="h-3.5 w-3.5" />
                  ) : (
                    <PlusIcon className="h-3.5 w-3.5" />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <div
          data-web={revealAttr}
          className={cn(
            "mx-auto mt-10 max-w-3xl overflow-hidden rounded-3xl border transition-[border-color,background-color,box-shadow] duration-300 sm:mt-12",
            hasSelection
              ? "border-accent-alt/35 bg-surface/55 shadow-[0_0_0_1px_color-mix(in_srgb,var(--accent-alt)_12%,transparent),0_20px_50px_-28px_rgba(40,171,226,0.35)]"
              : "border-border/50 bg-surface/35",
          )}
        >
          <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-5 sm:px-5 sm:py-3">
            <div className="min-w-0 flex-1">
              <div className="mb-2.5 flex items-center justify-between gap-3 sm:mb-3">
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  {title}
                </p>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 font-sans text-[11px] font-semibold tabular-nums transition-colors duration-300",
                    hasSelection
                      ? "bg-accent-alt/15 text-accent-alt"
                      : "bg-foreground/5 text-muted",
                  )}
                >
                  {selected.length} selected
                </span>
              </div>

              <div className="flex min-h-9 flex-wrap items-center gap-2">
                {hasSelection ? (
                  selected.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => remove(option)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-accent-alt/30 bg-accent-alt/10 py-1 pl-3 pr-2 font-sans text-xs font-medium text-accent-soft transition-colors hover:border-accent-alt/50 hover:bg-accent-alt/15"
                    >
                      {option}
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent-alt/20 text-accent-alt">
                        <CloseIcon className="h-2.5 w-2.5" />
                      </span>
                      <span className="sr-only">Remove {option}</span>
                    </button>
                  ))
                ) : (
                  <p className="font-sans text-sm text-muted/75">
                    Pick one or more options above
                  </p>
                )}
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-3 self-stretch sm:self-auto">
              {hasSelection ? (
                <button
                  type="button"
                  onClick={clear}
                  className="font-sans text-xs font-semibold uppercase tracking-wider text-muted transition-colors hover:text-foreground sm:px-1"
                >
                  Clear
                </button>
              ) : null}

              <PillButton
                href={href}
                icon
                size="normal"
                className={cn(
                  "w-full justify-center sm:w-auto",
                  hasSelection &&
                    "border-accent-alt/40 bg-background shadow-[0_0_0_1px_color-mix(in_srgb,var(--accent-alt)_20%,transparent)]",
                )}
              >
                {ctaLabel}
              </PillButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
