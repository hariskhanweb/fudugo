"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import defaultContent from "@/data/about-page.json";
import type { IndustryItem, IndustriesSectionContent } from "@/types";
import { AccentMark, Container } from "@/components/ui";
import { INDUSTRY_ICONS } from "@/components/ui/IndustryIcons";
import { cn } from "@/lib/utils";
import { bindSubtleGlowParallax, safeGsapRevert } from "@/lib/sectionScroll";

gsap.registerPlugin(ScrollTrigger);

type IndustriesSectionProps = {
  content?: Partial<IndustriesSectionContent>;
  className?: string;
};

export default function IndustriesSection({
  content,
  className,
}: IndustriesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const data: IndustriesSectionContent = {
    ...defaultContent.industries,
    ...content,
    items: content?.items ?? defaultContent.industries.items,
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const header = section.querySelector("[data-industries='header']");
      const mark = section.querySelector("[data-industries='mark']");
      const title = section.querySelector("[data-industries='title']");
      const eyebrow = section.querySelector("[data-industries='eyebrow']");
      const description = section.querySelector("[data-industries='description']");
      const grid = section.querySelector("[data-industries='grid']");
      const cards = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-industries='card']"),
      );

      bindSubtleGlowParallax(section, {
        a: "[data-industries='glow-a']",
        b: "[data-industries='glow-b']",
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
      if (title) headerTl.from(title, { y: 20, opacity: 0, duration: 0.7 }, 0.06);
      if (eyebrow) headerTl.from(eyebrow, { y: 12, opacity: 0, duration: 0.5 }, 0.12);
      if (description) {
        headerTl.from(description, { y: 12, opacity: 0, duration: 0.55 }, 0.18);
      }

      if (grid && cards.length) {
        gsap.from(cards, {
          y: 18,
          opacity: 0,
          duration: 0.6,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: {
            trigger: grid,
            start: "top 86%",
            toggleActions: "play none none none",
          },
        });
      }
    }, section);

    return () => safeGsapRevert(ctx, section);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative overflow-hidden bg-header py-16 sm:py-20 lg:py-28",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />
      <div
        data-industries="glow-a"
        className="pointer-events-none absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-accent-alt/10 blur-3xl"
        aria-hidden
      />
      <div
        data-industries="glow-b"
        className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-accent/8 blur-3xl"
        aria-hidden
      />

      <Container className="relative px-5 sm:px-8 lg:px-10">
        <div
          data-industries="header"
          className="mb-12 flex flex-col gap-8 sm:mb-14 lg:mb-16 lg:flex-row lg:items-end lg:justify-between lg:gap-12"
        >
          <div className="max-w-2xl">
            <AccentMark data-industries="mark" className="mb-5 origin-left" />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-x-5">
              <h2
                data-industries="title"
                className="font-sans text-[clamp(40px,7vw,72px)] font-bold leading-none tracking-tight text-foreground"
              >
                {data.title}
              </h2>
              <p
                data-industries="eyebrow"
                className="font-sans text-sm font-normal text-accent-soft sm:pt-2 sm:text-[15px]"
              >
                {data.eyebrow}
              </p>
            </div>
          </div>

          <div
            data-industries="description"
            className="relative max-w-md border-l-2 border-accent-alt/40 pl-5 lg:max-w-sm lg:pl-6"
          >
            <span className="mb-2 block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-alt">
              {String(data.items.length).padStart(2, "0")} sectors
            </span>
            <p className="font-sans text-sm leading-relaxed text-muted lg:text-[15px]">
              {data.description}
            </p>
          </div>
        </div>

        <div
          data-industries="grid"
          className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5"
        >
          {data.items.map((item, index) => (
            <IndustryCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function IndustryCard({ item, index }: { item: IndustryItem; index: number }) {
  const num = String(index + 1).padStart(2, "0");
  const icon = INDUSTRY_ICONS[item.icon ?? "saas"] ?? INDUSTRY_ICONS.saas;

  return (
    <article
      data-industries="card"
      className="group relative overflow-hidden rounded-2xl border border-border/60 bg-surface/50 transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-0.5 hover:border-accent-alt/30 hover:shadow-[0_16px_40px_-20px_var(--accent-glow)]"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-accent-alt/0 via-transparent to-accent/0 opacity-0 transition-opacity duration-500 group-hover:from-accent-alt/5 group-hover:to-accent/3 group-hover:opacity-100"
        aria-hidden
      />

      <span
        className="absolute right-5 top-5 font-sans text-xs font-bold tracking-wider text-foreground/15 transition-colors duration-500 group-hover:text-accent-alt/35 sm:right-6 sm:top-6"
        aria-hidden
      >
        {num}
      </span>

      <div className="relative p-5 sm:p-6">
        <div className="relative mb-5 inline-flex">
          <span
            className="absolute inset-0 -m-2 rounded-2xl border border-accent-alt/20 bg-accent-alt/5 transition-transform duration-500 group-hover:scale-105"
            aria-hidden
          />
          <span
            className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-panel text-accent-alt transition-transform duration-500 group-hover:-translate-y-0.5"
          >
            {icon}
          </span>
        </div>

        <div className="space-y-2">
          <h3 className="font-sans text-base font-bold text-foreground transition-colors duration-300 group-hover:text-accent-soft sm:text-lg">
            {item.title}
          </h3>
          <p className="font-sans text-sm leading-relaxed text-muted">
            {item.description}
          </p>
        </div>

        <div
          className="mt-5 flex items-center gap-2 font-sans text-xs font-medium text-accent-alt/70 transition-colors duration-300 group-hover:text-accent-alt"
        >
          <span className="h-px w-6 bg-accent-alt/40 group-hover:bg-accent-alt/60" aria-hidden />
          <span>Explore motion solutions</span>
        </div>
      </div>
    </article>
  );
}
