"use client";

import { useRef } from "react";
import gsap from "gsap";
import { Container } from "@/components/ui";
import { useGsapContext } from "@/lib/use-gsap-context";
import { cn } from "@/lib/utils";
import type { ProjectStoryBlock } from "@/types";

type StoryItem = {
  key: "pain" | "solution" | "promise";
  index: string;
  label: string;
  block: ProjectStoryBlock;
};

function StoryPanel({
  index,
  label,
  block,
  tone,
}: {
  index: string;
  label: string;
  block: ProjectStoryBlock;
  tone: "pain" | "solution" | "promise";
}) {
  const tones = {
    pain: "border-border/70 bg-surface/40",
    solution: "border-accent-alt/35 bg-accent-alt/8",
    promise: "border-accent/30 bg-header",
  } as const;

  return (
    <article
      data-story="panel"
      className={cn(
        "relative flex min-h-64 flex-col justify-between overflow-hidden rounded-[1.75rem] border p-6 sm:min-h-72 sm:p-8",
        tones[tone],
      )}
    >
      <div
        className="pointer-events-none absolute -right-8 -bottom-10 h-36 w-36 rounded-full bg-accent-alt/8 blur-3xl"
        aria-hidden
      />
      <div className="flex items-start justify-between gap-4">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-alt">
          {label}
        </p>
        <span className="font-sans text-4xl font-bold leading-none text-foreground/12 sm:text-5xl">
          {index}
        </span>
      </div>
      {block.title ? (
        <h3 className="mt-8 max-w-sm font-sans text-[clamp(22px,3vw,30px)] font-bold leading-tight tracking-tight text-foreground">
          {block.title}
        </h3>
      ) : null}
      <p className="mt-4 font-sans text-sm leading-relaxed text-muted sm:text-[15px]">
        {block.body}
      </p>
    </article>
  );
}

const revealDefaults = {
  duration: 0.55,
  ease: "power2.out",
  overwrite: "auto" as const,
  immediateRender: false,
  clearProps: "transform",
};

export function WorkStorySection({ items }: { items: StoryItem[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapContext(
    sectionRef,
    (section) => {
      const header = section.querySelector("[data-story='header']");
      const panels = section.querySelectorAll("[data-story='panel']");

      if (header) {
        gsap.fromTo(
          header,
          { y: 12, autoAlpha: 0 },
          {
            ...revealDefaults,
            y: 0,
            autoAlpha: 1,
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              once: true,
            },
          },
        );
      }

      if (panels.length) {
        gsap.fromTo(
          panels,
          { y: 16, autoAlpha: 0 },
          {
            ...revealDefaults,
            y: 0,
            autoAlpha: 1,
            stagger: 0.08,
            scrollTrigger: {
              trigger: section.querySelector("[data-story='grid']") ?? section,
              start: "top 84%",
              once: true,
            },
          },
        );
      }
    },
    [items.length],
  );

  if (!items.length) return null;

  return (
    <section
      ref={sectionRef}
      className="bg-background py-16 sm:py-20 lg:py-24"
    >
      <Container className="px-5 sm:px-8 lg:px-10">
        <div data-story="header" className="mb-10 max-w-2xl sm:mb-12">
          <p className="font-sans text-sm text-accent-soft">(The story)</p>
          <h2 className="mt-2 font-sans text-[clamp(28px,4vw,44px)] font-bold leading-tight tracking-tight text-foreground">
            Pain. Solution. Promise.
          </h2>
        </div>

        <div data-story="grid" className="grid gap-4 lg:grid-cols-3">
          {items.map((item) => (
            <StoryPanel
              key={item.key}
              index={item.index}
              label={item.label}
              block={item.block}
              tone={item.key}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export function WorkHeroMotion({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGsapContext(
    rootRef,
    (scope) => {
      const items = scope.querySelectorAll("[data-hero-anim]");
      if (!items.length) return;

      gsap.fromTo(
        items,
        { y: 14, autoAlpha: 0 },
        {
          ...revealDefaults,
          y: 0,
          autoAlpha: 1,
          duration: 0.65,
          stagger: 0.06,
          ease: "power3.out",
        },
      );
    },
    [],
  );

  return <div ref={rootRef}>{children}</div>;
}

export function WorkMetaMotion({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLElement>(null);

  useGsapContext(
    rootRef,
    (scope) => {
      const cells = scope.querySelectorAll("[data-meta='cell']");
      if (!cells.length) return;

      gsap.fromTo(
        cells,
        { y: 10, autoAlpha: 0 },
        {
          ...revealDefaults,
          y: 0,
          autoAlpha: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: scope,
            start: "top 92%",
            once: true,
          },
        },
      );
    },
    [],
  );

  return (
    <section
      ref={rootRef}
      className="border-b border-border/60 bg-background"
    >
      {children}
    </section>
  );
}
