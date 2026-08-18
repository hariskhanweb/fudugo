"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import defaultContent from "@/data/about-page.json";
import type { ResultStatItem, SolutionItem, SolutionsSectionContent } from "@/types";
import { AccentMark, Container } from "@/components/ui";
import { cn } from "@/lib/utils";
import { bindGentleReveal, bindSubtleGlowParallax, safeGsapRevert } from "@/lib/sectionScroll";

gsap.registerPlugin(ScrollTrigger);

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 320 512" fill="currentColor" aria-hidden>
      <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
    </svg>
  );
}

type SolutionsSectionProps = {
  content?: Partial<SolutionsSectionContent>;
  className?: string;
};

export default function SolutionsSection({
  content,
  className,
}: SolutionsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const data: SolutionsSectionContent = {
    ...defaultContent.solutions,
    ...content,
    items: content?.items ?? defaultContent.solutions.items,
    results: {
      ...defaultContent.solutions.results,
      ...content?.results,
      items:
        content?.results?.items ?? defaultContent.solutions.results.items,
    },
    challengeCta: {
      ...defaultContent.solutions.challengeCta,
      ...content?.challengeCta,
    },
    linkLabel: content?.linkLabel ?? "Learn more",
  };

  const items = data.items;
  const results = data.results;
  const resultItems = results.items as ResultStatItem[];

  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(resultItems.map((item) => [item.id, 0])),
  );
  const hasCounted = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const header = section.querySelector("[data-solutions='header']");
      const mark = section.querySelector("[data-solutions='mark']");
      const eyebrow = section.querySelector("[data-solutions='eyebrow']");
      const title = section.querySelector("[data-solutions='title']");
      const description = section.querySelector("[data-solutions='description']");
      const grid = section.querySelector("[data-solutions='grid']");
      const cells = grid
        ? gsap.utils.toArray<HTMLElement>(grid.children)
        : [];
      const imageInner = section.querySelector("[data-solutions='image-inner']");
      const stats = section.querySelector("[data-solutions='stats']");
      const cta = section.querySelector("[data-solutions='cta']");

      if (!reduceMotion) {
        bindSubtleGlowParallax(section, {
          a: "[data-solutions='glow-a']",
          b: "[data-solutions='glow-b']",
        });

        const headerTl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: header ?? section,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });

        if (mark) headerTl.from(mark, { scaleX: 0, duration: 0.45 }, 0);
        if (eyebrow) headerTl.from(eyebrow, { y: 10, opacity: 0, duration: 0.45 }, 0.06);
        if (title) headerTl.from(title, { y: 18, opacity: 0, duration: 0.65 }, 0.1);
        if (description) {
          headerTl.from(description, { y: 12, opacity: 0, duration: 0.5 }, 0.16);
        }

        if (grid && cells.length) {
          gsap.from(cells, {
            y: 16,
            opacity: 0,
            duration: 0.55,
            stagger: 0.06,
            ease: "power2.out",
            scrollTrigger: {
              trigger: grid,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          });
        }

        if (imageInner) {
          gsap.fromTo(
            imageInner,
            { scale: 1.05 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: imageInner.closest("[data-solutions='image']") ?? grid,
                start: "top bottom",
                end: "bottom top",
                scrub: 2,
              },
            },
          );
        }

        if (cta) {
          bindGentleReveal(cta, cta, { y: 10, duration: 0.5, start: "top 94%" });
        }
      }

      if (!reduceMotion && !hasCounted.current && stats) {
        ScrollTrigger.create({
          trigger: stats,
          start: "top 88%",
          once: true,
          onEnter: () => {
            hasCounted.current = true;
            resultItems.forEach((item) => {
              const obj = { val: 0 };
              gsap.to(obj, {
                val: item.value,
                duration: 1.6,
                ease: "power2.out",
                onUpdate: () => {
                  setValues((prev) => ({
                    ...prev,
                    [item.id]: Math.floor(obj.val),
                  }));
                },
              });
            });
          },
        });
      } else if (reduceMotion) {
        setValues(Object.fromEntries(resultItems.map((i) => [i.id, i.value])));
      }
    }, section);

    return () => safeGsapRevert(ctx, section);
  }, [resultItems]);

  const [sol1, sol2, sol3, sol4, sol5] = items;

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative overflow-hidden bg-background py-16 sm:py-20 lg:py-28",
        className,
      )}
    >
      <div
        data-solutions="glow-a"
        className="pointer-events-none absolute -left-24 top-1/3 h-64 w-64 rounded-full bg-accent-alt/6 blur-3xl"
        aria-hidden
      />
      <div
        data-solutions="glow-b"
        className="pointer-events-none absolute -right-16 bottom-1/4 h-56 w-56 rounded-full bg-accent/8 blur-3xl"
        aria-hidden
      />

      <Container className="relative px-5 sm:px-8 lg:px-10">
        <div
          data-solutions="header"
          className="mb-10 max-w-3xl sm:mb-12 lg:mb-14"
        >
          <AccentMark data-solutions="mark" className="mb-5 origin-left" />
          <p
            data-solutions="eyebrow"
            className="mb-3 font-sans text-sm text-accent-soft"
          >
            {data.eyebrow}
          </p>
          <h2
            data-solutions="title"
            className="font-sans text-[clamp(36px,6vw,64px)] font-bold leading-[1.02] tracking-tight text-foreground"
          >
            {data.title}
          </h2>
          <p
            data-solutions="description"
            className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-muted sm:text-[15px]"
          >
            {data.description}
          </p>
        </div>

        <div
          data-solutions="grid"
          className="grid gap-4 lg:grid-cols-3 lg:grid-rows-3 lg:gap-5"
        >
          <div
            data-solutions="image"
            className="group relative min-h-64 overflow-hidden rounded-2xl sm:min-h-72 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:min-h-0"
          >
            <div data-solutions="image-inner" className="absolute inset-0">
              <Image
                src={data.image}
                alt={data.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/25 to-transparent" />
          </div>

          {sol1 && (
            <SolutionCard item={sol1} linkLabel={data.linkLabel} className="lg:col-start-2 lg:row-start-1" />
          )}
          {sol2 && (
            <SolutionCard item={sol2} linkLabel={data.linkLabel} className="lg:col-start-3 lg:row-start-1" />
          )}
          {sol3 && (
            <SolutionCard item={sol3} linkLabel={data.linkLabel} className="lg:col-start-2 lg:row-start-2" />
          )}
          {sol4 && (
            <SolutionCard item={sol4} linkLabel={data.linkLabel} className="lg:col-start-3 lg:row-start-2" />
          )}
          {sol5 && (
            <SolutionCard item={sol5} linkLabel={data.linkLabel} className="lg:col-start-2 lg:row-start-3" />
          )}

          <article
            data-solutions="stats"
            className="flex flex-col justify-center rounded-2xl border border-border/50 bg-surface/30 px-5 py-6 sm:px-6 lg:col-start-3 lg:row-start-3"
          >
            <p className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-accent-alt">
              {results.title}
            </p>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              {resultItems.map((item, index) => (
                <div
                  key={item.id}
                  className={cn(
                    "min-w-0 flex-1",
                    index > 0 && "sm:border-l sm:border-border/60 sm:pl-4",
                  )}
                >
                  <p className="font-sans text-[clamp(28px,3.5vw,36px)] font-bold leading-none text-foreground">
                    {values[item.id] ?? 0}
                    <span className="ml-0.5 text-[0.55em] font-bold text-accent-alt">
                      {item.suffix}
                    </span>
                  </p>
                  <p className="mt-2 font-sans text-[11px] leading-snug text-muted sm:text-xs">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div
          data-solutions="cta"
          className="mt-10 flex flex-col gap-3 border-t border-border/60 pt-8 sm:mt-12 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="font-sans text-sm text-muted">{data.challengeCta.label}</p>
          <a
            href={data.challengeCta.href}
            className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-accent-alt transition-opacity hover:opacity-80"
          >
            {data.challengeCta.link}
            <ArrowIcon className="h-3 w-3" />
          </a>
        </div>
      </Container>
    </section>
  );
}

function SolutionCard({
  item,
  linkLabel,
  className = "",
}: {
  item: SolutionItem;
  linkLabel?: string;
  className?: string;
}) {
  return (
    <article
      data-solutions="card"
      className={cn(
        "group flex h-full min-h-46 flex-col rounded-2xl border border-border/50 bg-surface/25 p-5 transition-[border-color,background-color] duration-300 hover:border-accent-alt/25 hover:bg-surface/50 sm:min-h-48 sm:p-6",
        className,
      )}
    >
      <div className="mb-4 flex items-start gap-3">
        <span className="shrink-0 font-sans text-sm font-semibold tabular-nums text-accent-alt">
          {item.number}
        </span>
        <h3 className="font-sans text-base font-bold leading-snug text-foreground transition-colors duration-300 group-hover:text-accent-soft sm:text-lg">
          {item.title}
        </h3>
      </div>

      <p className="line-clamp-2 flex-1 font-sans text-sm leading-relaxed text-muted">
        {item.description}
      </p>

      <a
        href={item.href}
        className="mt-5 inline-flex items-center gap-1.5 font-sans text-sm font-medium text-accent-alt/90 transition-colors hover:text-accent-alt"
      >
        {linkLabel ?? "Learn more"}
        <ArrowIcon className="h-2.5 w-2.5 transition-transform duration-300 group-hover:translate-x-0.5" />
      </a>
    </article>
  );
}
