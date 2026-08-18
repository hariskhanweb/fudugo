"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import defaultContent from "@/data/about-page.json";
import type { AwardItem, AwardsSectionContent } from "@/types";
import { AccentMark, Container } from "@/components/ui";
import { cn } from "@/lib/utils";
import { bindGentleReveal, bindSubtleGlowParallax, safeGsapRevert } from "@/lib/sectionScroll";

gsap.registerPlugin(ScrollTrigger);

type AwardsSectionProps = {
  content?: Partial<AwardsSectionContent>;
  className?: string;
};

export default function AwardsSection({
  content,
  className,
}: AwardsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const data: AwardsSectionContent = {
    ...defaultContent.awards,
    ...content,
    items: content?.items ?? defaultContent.awards.items,
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const header = section.querySelector("[data-awards='header']");
      const mark = section.querySelector("[data-awards='mark']");
      const eyebrow = section.querySelector("[data-awards='eyebrow']");
      const title = section.querySelector("[data-awards='title']");
      const count = section.querySelector("[data-awards='count']");
      const list = section.querySelector("[data-awards='list']");
      const line = section.querySelector("[data-awards='line']");
      const rows = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-awards='row']"),
      );

      bindSubtleGlowParallax(section, {
        a: "[data-awards='glow-a']",
        b: "[data-awards='glow-b']",
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
      if (count) headerTl.from(count, { y: 12, opacity: 0, duration: 0.5 }, 0.18);

      if (line && list) {
        gsap.set(line, { transformOrigin: "top center" });
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: list,
              start: "top 80%",
              end: "bottom 70%",
              scrub: 1.5,
            },
          },
        );
      }

      rows.forEach((row) => {
        bindGentleReveal(row, row, { y: 14, duration: 0.6, start: "top 92%" });

        const highlight = row.querySelector("[data-awards='highlight']");
        if (highlight) {
          ScrollTrigger.create({
            trigger: row,
            start: "top 60%",
            end: "bottom 40%",
            onEnter: () => row.classList.add("is-active"),
            onLeave: () => row.classList.remove("is-active"),
            onEnterBack: () => row.classList.add("is-active"),
            onLeaveBack: () => row.classList.remove("is-active"),
          });
        }
      });
    }, section);

    return () => safeGsapRevert(ctx, section);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative overflow-hidden bg-background py-16 sm:py-20 lg:py-28",
        className,
      )}
    >
      <div
        data-awards="glow-a"
        className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-accent-alt/8 blur-3xl"
        aria-hidden
      />
      <div
        data-awards="glow-b"
        className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />

      <Container className="relative px-5 sm:px-8 lg:px-10">
        <div
          data-awards="header"
          className="mb-12 flex flex-col gap-8 sm:mb-14 lg:mb-16 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <AccentMark data-awards="mark" className="mb-5 origin-left" />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-x-5">
              <h2
                data-awards="title"
                className="font-sans text-[clamp(40px,7vw,72px)] font-bold leading-none tracking-tight text-foreground"
              >
                {data.title}
              </h2>
              <p
                data-awards="eyebrow"
                className="font-sans text-sm font-normal text-accent-soft sm:pt-2 sm:text-[15px]"
              >
                {data.eyebrow}
              </p>
            </div>
          </div>

          <div
            data-awards="count"
            className="surface-card flex items-center gap-4 rounded-2xl px-5 py-4 sm:px-6"
          >
            <span className="font-sans text-[clamp(36px,5vw,48px)] font-bold leading-none text-accent-alt">
              {String(data.items.length).padStart(2, "0")}
            </span>
            <span className="font-sans text-sm text-muted">
              Recognitions
              <br />
              &amp; wins
            </span>
          </div>
        </div>

        <div data-awards="list" className="relative pl-6 sm:pl-10 lg:pl-12">
          <div
            className="absolute bottom-4 left-0 top-4 w-px bg-border"
            aria-hidden
          />
          <div
            data-awards="line"
            className="absolute left-0 top-4 w-px bg-linear-to-b from-accent-alt via-accent-soft to-accent/60"
            style={{ height: "calc(100% - 2rem)" }}
            aria-hidden
          />

          <ul className="flex flex-col gap-3 sm:gap-4">
            {data.items.map((award, index) => (
              <AwardRow
                key={`${award.organization}-${award.year}-${award.title}`}
                award={award}
                index={index}
              />
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function AwardRow({ award, index }: { award: AwardItem; index: number }) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <li>
      <article
        data-awards="row"
        className="group relative rounded-2xl border border-transparent bg-surface/40 transition-[border-color,background-color,box-shadow] duration-500 [.is-active]:border-accent-alt/25 [.is-active]:bg-surface [.is-active]:shadow-[0_0_40px_-12px_var(--accent-glow)]"
      >
        <span
          data-awards="highlight"
          className="absolute inset-y-3 left-0 w-0.5 rounded-full bg-accent-alt opacity-0 transition-opacity duration-500 group-hover:opacity-100 [.is-active]:opacity-100"
          aria-hidden
        />

        <span
          data-awards="dot"
          className="absolute -left-6 top-1/2 z-10 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-background bg-accent-alt sm:-left-10 lg:-left-12"
          aria-hidden
        />

        <div className="grid gap-4 p-5 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center sm:gap-6 sm:p-6 lg:gap-8">
          <div className="flex items-center gap-4">
            <span className="font-sans text-2xl font-bold leading-none text-foreground/20 transition-colors duration-500 group-hover:text-accent-alt/40 [.is-active]:text-accent-alt/50 sm:text-3xl">
              {num}
            </span>
            <span className="rounded-full border border-border bg-panel px-3 py-1 font-sans text-xs font-medium text-muted">
              {award.year}
            </span>
          </div>

          <div className="min-w-0 space-y-2">
            <p className="font-sans text-xs font-semibold uppercase tracking-wider text-accent-alt">
              {award.organization}
            </p>
            <h3 className="font-sans text-base font-bold leading-snug text-foreground transition-colors duration-300 group-hover:text-accent-soft sm:text-lg lg:text-xl">
              {award.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-md bg-foreground/5 px-2.5 py-1 font-sans text-[11px] text-muted sm:text-xs">
                {award.category}
              </span>
              <span className="rounded-md bg-foreground/5 px-2.5 py-1 font-sans text-[11px] text-muted sm:text-xs">
                {award.type}
              </span>
            </div>
          </div>

          <div className="hidden sm:block">
            <span
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-panel text-accent-alt transition-transform duration-500 group-hover:scale-105 [.is-active]:border-accent-alt/30 [.is-active]:bg-accent-alt/10"
              aria-hidden
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17.8l-6.2 4.5 2.4-7.4L2 9.4h7.6L12 2z" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </li>
  );
}
