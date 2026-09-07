"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import content from "@/data/digital-marketing-page.json";
import { Container, AccentMark } from "@/components/ui";
import { CtaSection, PageHeroSection } from "@/sections";
import { useGsapContext } from "@/lib/use-gsap-context";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

function MarketingOfferIcon({ type }: { type: string }) {
  switch (type) {
    case "search":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      );
    case "share":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      );
    case "target":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case "content":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      );
    case "trending":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      );
    case "technical":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case "on-page":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      );
    case "off-page":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      );
    case "local":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case "tracking":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    case "book":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      );
    case "palette":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
          <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
          <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
          <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2z" />
        </svg>
      );
    case "video":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
      );
    case "message":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    case "calendar":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    default:
      return null;
  }
}

function FaqAccordion({
  items,
}: {
  items: Array<{ id: string; question: string; answer: string }>;
}) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="space-y-3.5">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={cn(
              "overflow-hidden rounded-2xl border transition-all duration-300",
              isOpen
                ? "border-accent-alt/50 bg-surface shadow-md"
                : "border-border/80 bg-surface/50 hover:border-border hover:bg-surface/80",
            )}
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
              aria-expanded={isOpen}
            >
              <span
                className={cn(
                  "font-sans text-base font-bold transition-colors sm:text-lg",
                  isOpen ? "text-accent-soft" : "text-foreground",
                )}
              >
                {item.question}
              </span>
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/80 bg-panel text-accent-alt transition-transform duration-300",
                  isOpen ? "rotate-45 bg-accent-alt text-white border-accent-alt" : "",
                )}
                aria-hidden
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 0V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M14 7L0 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </button>

            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className="border-t border-border/40 px-5 pt-4 pb-6 sm:px-6">
                  <p className="font-sans text-sm leading-relaxed text-muted sm:text-[15px] sm:leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function DigitalMarketingPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { hero, introSection, whatWeOffer, ourApproach, seoApproach, contentAndSocial, paidAdvertising, growthGoals } = content;

  useGsapContext(
    rootRef,
    (scope) => {
      // Hero elements animation
      const heroParts = scope.querySelectorAll("[data-digital-hero='part']");
      if (heroParts.length) {
        gsap.fromTo(
          heroParts,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.08,
            ease: "power3.out",
          },
        );
      }

      // Scroll reveals for sections
      const blocks = scope.querySelectorAll("[data-digital='reveal']");
      blocks.forEach((block) => {
        gsap.fromTo(
          block,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: "power2.out",
            overwrite: "auto",
            scrollTrigger: {
              trigger: block,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      // Section: Timeline Scroll Progress
      const timelineTrack = scope.querySelector("[data-tech-timeline='track']");
      const progressBar = scope.querySelector("[data-tech-timeline='progress']");
      if (timelineTrack && progressBar) {
        gsap.fromTo(
          progressBar,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineTrack,
              start: "top 72%",
              end: "bottom 78%",
              scrub: 0.4,
            },
          },
        );
      }

      const techItems = scope.querySelectorAll("[data-tech-item='item']");
      techItems.forEach((item) => {
        const outerMarker = item.querySelector("[data-tech-marker='outer']");
        const innerMarker = item.querySelector("[data-tech-marker='inner']");
        const pills = item.querySelectorAll("[data-tech-skill='pill']");

        const itemTl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        itemTl
          .fromTo(
            item,
            { y: 36, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          )
          .fromTo(
            outerMarker,
            { scale: 0.5, borderColor: "rgba(255,255,255,0.1)" },
            { scale: 1, borderColor: "rgba(40, 171, 226, 0.7)", duration: 0.4, ease: "back.out(2)" },
            "-=0.35",
          )
          .fromTo(
            innerMarker,
            { scale: 0 },
            { scale: 1, duration: 0.3, ease: "back.out(2.5)" },
            "-=0.25",
          );

        if (pills.length) {
          itemTl.fromTo(
            pills,
            { y: 10, opacity: 0, scale: 0.94 },
            { y: 0, opacity: 1, scale: 1, duration: 0.35, stagger: 0.035, ease: "power2.out" },
            "-=0.2",
          );
        }
      });
    },
    [],
  );

  return (
    <>
      {/* Top Header Banner matching other service pages */}
      <PageHeroSection
        content={{
          title: "Digital Marketing",
          image: hero.image,
          imageAlt: hero.imageAlt,
          imagePosition: "center",
        }}
      />

      <div ref={rootRef}>
        {/* 1. HERO SECTION */}
        <section className="relative overflow-hidden bg-background py-16 sm:py-20 lg:py-28">
          {/* Subtle Grid Background Pattern */}
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
            aria-hidden
          />

          {/* Ambient Glows */}
          <div
            className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-accent-alt/15 blur-[130px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-accent/10 blur-[130px]"
            aria-hidden
          />

          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-20">
              {/* Left Column: Heading & Copy */}
              <div className="lg:col-span-7">
                <div data-digital-hero="part">
                  <AccentMark className="mb-5 origin-left" />
                </div>

                {/* Small Label */}
                <p
                  data-digital-hero="part"
                  className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-accent-alt sm:text-[15px]"
                >
                  {hero.eyebrow}
                </p>

                {/* Main H1 */}
                <h1
                  data-digital-hero="part"
                  className="font-sans text-[clamp(38px,6.5vw,76px)] font-bold leading-[1.04] tracking-tight text-foreground"
                >
                  {hero.title}
                </h1>

                {/* Supporting Text */}
                <p
                  data-digital-hero="part"
                  className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-muted sm:text-lg sm:leading-relaxed"
                >
                  {hero.description}
                </p>

                {/* CTA */}
                <div
                  data-digital-hero="part"
                  className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10"
                >
                  <Link
                    href={hero.ctaHref}
                    className="inline-flex items-center gap-2 rounded-xl border border-accent-alt bg-accent-alt px-7 py-3.5 font-sans text-sm font-semibold text-white shadow-lg shadow-accent-alt/25 transition-all duration-300 hover:bg-accent-soft hover:shadow-accent-alt/40"
                  >
                    <span>{hero.ctaLabel}</span>
                    <span>→</span>
                  </Link>
                  <a
                    href={hero.secondaryCtaHref}
                    className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-surface/60 px-6 py-3.5 font-sans text-sm font-medium text-foreground backdrop-blur-xs transition-colors hover:border-accent-alt/40 hover:bg-surface-hover"
                  >
                    {hero.secondaryCtaLabel}
                  </a>
                </div>
              </div>

              {/* Right Column: Floating Digital Marketing Performance Hub */}
              <div data-digital-hero="part" className="relative lg:col-span-5 flex justify-center">
                <div className="group relative w-full max-w-[420px] overflow-hidden rounded-[2rem] border border-border/80 bg-surface/80 p-6 shadow-2xl backdrop-blur-md transition-all duration-500 hover:border-accent-alt/40 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)]">
                  {/* Performance Hub Header */}
                  <div className="flex items-center justify-between border-b border-border/50 pb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      </span>
                      <span className="font-sans text-xs font-semibold uppercase tracking-wider text-foreground">
                        Live Campaign Engine
                      </span>
                    </div>
                    <span className="rounded-full bg-accent-alt/15 px-2.5 py-0.5 font-mono text-[11px] font-bold text-accent-alt">
                      Targeting Active
                    </span>
                  </div>

                  {/* Growth Metrics Grid */}
                  <div className="mt-5 grid grid-cols-2 gap-3.5">
                    <div className="rounded-xl border border-border/60 bg-panel/70 p-3.5">
                      <p className="font-mono text-[11px] uppercase tracking-wider text-muted">Organic Lift</p>
                      <p className="mt-1 font-sans text-2xl font-bold text-foreground">+284%</p>
                      <p className="mt-0.5 text-[11px] font-medium text-emerald-400">↑ High-intent search</p>
                    </div>
                    <div className="rounded-xl border border-border/60 bg-panel/70 p-3.5">
                      <p className="font-mono text-[11px] uppercase tracking-wider text-muted">Blended ROAS</p>
                      <p className="mt-1 font-sans text-2xl font-bold text-accent-alt">4.8x</p>
                      <p className="mt-0.5 text-[11px] font-medium text-accent-soft">Top 5% category</p>
                    </div>
                  </div>

                  {/* Visual Performance Chart Strip */}
                  <div className="mt-4 rounded-xl border border-border/60 bg-panel/50 p-4">
                    <div className="flex items-center justify-between text-xs text-muted mb-2.5">
                      <span className="font-sans font-medium text-foreground/90">Acquisition Trend</span>
                      <span className="font-mono text-[11px] text-accent-alt">90-Day Trajectory</span>
                    </div>
                    {/* Visual Bar Progression */}
                    <div className="flex items-end gap-1.5 h-16 pt-2">
                      <div className="w-1/8 rounded-t bg-accent-alt/25 h-[35%]" />
                      <div className="w-1/8 rounded-t bg-accent-alt/35 h-[45%]" />
                      <div className="w-1/8 rounded-t bg-accent-alt/45 h-[40%]" />
                      <div className="w-1/8 rounded-t bg-accent-alt/60 h-[65%]" />
                      <div className="w-1/8 rounded-t bg-accent-alt/75 h-[70%]" />
                      <div className="w-1/8 rounded-t bg-accent-alt/85 h-[85%]" />
                      <div className="w-1/8 rounded-t bg-accent-alt h-[95%]" />
                      <div className="w-1/8 rounded-t bg-accent-soft h-[100%] shadow-[0_0_12px_var(--accent-alt)]" />
                    </div>
                  </div>

                  {/* Channel Badges */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border/50 pt-4">
                    <div className="flex items-center gap-1.5">
                      <span className="rounded-md border border-border/70 bg-panel px-2 py-0.5 font-mono text-[10px] font-medium text-muted">SEO</span>
                      <span className="rounded-md border border-border/70 bg-panel px-2 py-0.5 font-mono text-[10px] font-medium text-muted">Google Ads</span>
                      <span className="rounded-md border border-border/70 bg-panel px-2 py-0.5 font-mono text-[10px] font-medium text-muted">Meta</span>
                      <span className="rounded-md border border-border/70 bg-panel px-2 py-0.5 font-mono text-[10px] font-medium text-muted">CRO</span>
                    </div>
                    <span className="font-sans text-xs font-semibold text-accent-alt">Verified ROI</span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 2. INTRODUCTION */}
        <section
          id="capabilities"
          className="relative overflow-hidden bg-header py-20 sm:py-24 lg:py-32 border-t border-b border-border/60"
        >
          <div
            className="pointer-events-none absolute -left-40 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-accent-alt/10 blur-[130px]"
            aria-hidden
          />

          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16 items-center">
              {/* Left Column: Eyebrow + Subheading */}
              <div data-digital="reveal" className="space-y-4 lg:col-span-5">
                <AccentMark className="mb-4 origin-left" />
                <p className="font-sans text-sm font-semibold uppercase tracking-wider text-accent-alt">
                  {introSection.eyebrow}
                </p>
                <h2 className="font-sans text-[clamp(34px,5vw,52px)] font-bold leading-[1.08] tracking-tight text-foreground">
                  {introSection.title}
                </h2>
              </div>

              {/* Right Column: Narrative with Lead and Paragraphs */}
              <div data-digital="reveal" className="space-y-6 lg:col-span-7">
                <div className="border-l-2 border-accent-alt/70 pl-6 sm:pl-7">
                  <p className="font-sans text-lg font-medium leading-relaxed text-foreground sm:text-xl sm:leading-relaxed">
                    {introSection.lead}
                  </p>
                </div>

                <div className="space-y-4 pt-2 font-sans text-base leading-relaxed text-muted sm:text-[17px] sm:leading-[1.8]">
                  {introSection.paragraphs.map((p, index) => (
                    <p key={index}>{p}</p>
                  ))}
                </div>

                <div className="pt-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-accent-alt transition-colors hover:text-accent-soft sm:text-base"
                  >
                    <span>Discuss your marketing strategy</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 3. WHAT WE OFFER SECTION */}
        <section className="relative overflow-hidden bg-background py-20 sm:py-24 lg:py-32">
          <div
            className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-accent-alt/10 blur-[130px]"
            aria-hidden
          />

          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div data-digital="reveal" className="mb-14 max-w-3xl sm:mb-16 lg:mb-20">
              <AccentMark className="mb-4 origin-left" />
              <p className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider text-accent-alt">
                {whatWeOffer.eyebrow}
              </p>
              <h2 className="font-sans text-[clamp(34px,5.5vw,56px)] font-bold leading-[1.08] tracking-tight text-foreground">
                {whatWeOffer.title}
              </h2>
            </div>

            <div
              data-digital="reveal"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7"
            >
              {whatWeOffer.items.map((item) => (
                <div
                  key={item.number}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-surface/60 shadow-(--card-shadow) backdrop-blur-xs transition-all duration-400 hover:-translate-y-1.5 hover:border-accent-alt/40 hover:bg-surface hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]"
                >
                  <div>
                    <div className="relative aspect-16/9 w-full overflow-hidden bg-panel">
                      <Image
                        src={item.image ?? "/Image-1.jpg"}
                        alt={item.title}
                        fill
                        sizes="(max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/40 to-transparent" />
                      <span className="absolute top-3.5 right-4 font-mono text-xs font-bold tracking-wider text-white/80 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-xs">
                        ({item.number})
                      </span>
                    </div>

                    <div className="p-6 sm:p-7">
                      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-accent-alt/30 bg-accent-alt/10 text-accent-alt transition-colors group-hover:border-accent-alt group-hover:bg-accent-alt group-hover:text-white">
                        <MarketingOfferIcon type={item.icon} />
                      </div>
                      <h3 className="mb-2.5 font-sans text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-accent-soft sm:text-xl">
                        {item.title}
                      </h3>
                      <p className="font-sans text-xs leading-relaxed text-muted sm:text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 sm:p-7 sm:pt-0">
                    <div className="border-t border-border/50 pt-4">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-accent-alt transition-colors hover:text-accent-soft sm:text-sm"
                      >
                        <span>Learn more</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* 4. OUR APPROACH SECTION */}
        <section className="relative overflow-hidden bg-header py-20 sm:py-24 lg:py-32 border-t border-b border-border/60">
          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-5">
                <div className="sticky top-28 space-y-6">
                  <div data-digital="reveal">
                    <AccentMark className="mb-4 origin-left" />
                    <p className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider text-accent-alt">
                      {ourApproach.eyebrow}
                    </p>
                    <h2 className="font-sans text-[clamp(34px,5vw,52px)] font-bold leading-[1.08] tracking-tight text-foreground">
                      {ourApproach.title}
                    </h2>
                  </div>

                  <div className="rounded-3xl border border-border/80 bg-surface/60 p-6 sm:p-8 backdrop-blur-xs">
                    <div className="border-l-2 border-accent-alt/70 pl-4">
                      <p className="font-sans text-base font-medium leading-relaxed text-foreground sm:text-lg">
                        {ourApproach.lead}
                      </p>
                    </div>
                    <p className="mt-4 font-sans text-sm leading-relaxed text-muted">
                      Every campaign is engineered around real business outcomes, rigorous research, and compounding performance.
                    </p>
                    <div className="mt-6 border-t border-border/50 pt-5">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-accent-alt transition-colors hover:text-accent-soft"
                      >
                        <span>Start your custom strategy</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative lg:col-span-7">
                <ol className="relative" data-tech-timeline="track">
                  {/* Background Base Line */}
                  <span
                    className="pointer-events-none absolute top-3 bottom-3 left-2.75 w-px bg-border/70 sm:left-3.75"
                    aria-hidden
                  />
                  {/* Animated Glowing Progress Line (Scrubbed with Scroll) */}
                  <span
                    data-tech-timeline="progress"
                    className="pointer-events-none absolute top-3 bottom-3 left-2.75 w-0.5 origin-top bg-linear-to-b from-accent-alt via-accent-soft to-accent-alt shadow-[0_0_12px_var(--accent-alt)] sm:left-3.75"
                    style={{ transform: "scaleY(0)" }}
                    aria-hidden
                  />

                  {ourApproach.steps.map((step, index) => (
                    <li
                      key={step.step}
                      data-tech-item="item"
                      className={cn(
                        "relative flex gap-5 pb-8 sm:gap-7 sm:pb-10 transition-all duration-300",
                        index === ourApproach.steps.length - 1 && "pb-0 sm:pb-0",
                      )}
                    >
                      {/* Perfectly centered pointer circle */}
                      <div className="relative z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center sm:mt-0.5 sm:h-8 sm:w-8">
                        <span
                          data-tech-marker="outer"
                          className="absolute inset-0 rounded-full border border-accent-alt/40 bg-background shadow-xs transition-all duration-300"
                        />
                        <span
                          data-tech-marker="inner"
                          className="relative h-2 w-2 rounded-full bg-accent-alt shadow-[0_0_8px_var(--accent-alt)] sm:h-2.5 sm:w-2.5 transition-all duration-300"
                        />
                      </div>

                      {/* Content Card */}
                      <div className="min-w-0 flex-1 rounded-2xl border border-border/70 bg-surface/50 p-6 backdrop-blur-xs transition-all hover:border-accent-alt/30 hover:bg-surface/80 sm:p-7">
                        <div className="flex items-baseline gap-3">
                          <span className="font-mono text-xs font-bold text-accent-alt">
                            {step.step}
                          </span>
                          <span className="text-muted/40 font-mono text-xs">/</span>
                          <h4 className="font-sans text-lg font-bold text-foreground sm:text-xl">
                            {step.title}
                          </h4>
                        </div>

                        <p className="mt-2.5 font-sans text-sm leading-relaxed text-muted sm:text-[15px]">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Container>
        </section>

        {/* 5. SEO APPROACH SECTION */}
        <section className="relative overflow-hidden bg-background py-20 sm:py-24 lg:py-32 border-b border-border/60">
          <div
            className="pointer-events-none absolute -left-40 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-accent-alt/10 blur-[130px]"
            aria-hidden
          />

          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div data-digital="reveal" className="mb-14 max-w-3xl sm:mb-16 lg:mb-20">
              <AccentMark className="mb-4 origin-left" />
              <p className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider text-accent-alt">
                {seoApproach.eyebrow}
              </p>
              <h2 className="font-sans text-[clamp(34px,5.5vw,56px)] font-bold leading-[1.08] tracking-tight text-foreground">
                {seoApproach.title}
              </h2>
              <p className="mt-5 font-sans text-base leading-relaxed text-muted sm:text-lg">
                {seoApproach.lead}
              </p>
              <p className="mt-8 font-sans text-xs font-semibold uppercase tracking-wider text-accent-soft sm:text-sm">
                {seoApproach.subheading}
              </p>
            </div>

            <div
              data-digital="reveal"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7"
            >
              {seoApproach.items.map((item) => (
                <div
                  key={item.id}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-surface/50 p-6 backdrop-blur-xs transition-all duration-400 hover:-translate-y-1.5 hover:border-accent-alt/40 hover:bg-surface sm:p-7"
                >
                  <div>
                    <div className="mb-5 flex items-center justify-between">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-accent-alt/30 bg-accent-alt/10 text-accent-alt transition-colors group-hover:border-accent-alt group-hover:bg-accent-alt group-hover:text-white">
                        <MarketingOfferIcon type={item.icon} />
                      </div>
                      <span className="font-mono text-xs font-bold tracking-wider text-accent-alt/80 bg-panel px-2.5 py-1 rounded-md border border-border/60">
                        ({item.number})
                      </span>
                    </div>

                    <h3 className="mb-2.5 font-sans text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-accent-soft sm:text-xl">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs leading-relaxed text-muted sm:text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* 8. CONTENT & SOCIAL MEDIA SECTION */}
        <section className="relative overflow-hidden bg-header py-20 sm:py-24 lg:py-32 border-b border-border/60">
          <div
            className="pointer-events-none absolute -right-40 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-accent-alt/10 blur-[130px]"
            aria-hidden
          />

          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-20">
              {/* Left Column: Heading, Checklist, Pill CTA & Metric Progress Bar */}
              <div data-digital="reveal" className="lg:col-span-6 xl:col-span-6">
                <AccentMark className="mb-4 origin-left" />
                <p className="font-sans text-sm font-semibold uppercase tracking-wider text-accent-alt">
                  {contentAndSocial.eyebrow}
                </p>
                <h2 className="mt-3 font-sans text-[clamp(34px,5vw,54px)] font-bold leading-[1.08] tracking-tight text-foreground">
                  {contentAndSocial.title}
                </h2>
                <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-muted sm:text-lg">
                  {contentAndSocial.lead}
                </p>

                {/* 2-Column Circular Checklist */}
                <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-3.5 sm:grid-cols-2">
                  {contentAndSocial.checklist.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-alt/15 text-accent-alt">
                        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span className="font-sans text-sm font-medium text-foreground">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pill-Shaped Rounded CTA Button */}
                <div className="mt-9">
                  <Link
                    href={contentAndSocial.ctaHref}
                    className="inline-flex items-center gap-2 rounded-full bg-accent-alt px-8 py-3.5 font-sans text-sm font-semibold text-white shadow-lg shadow-accent-alt/25 transition-all duration-300 hover:bg-accent-soft hover:shadow-accent-alt/40"
                  >
                    <span>{contentAndSocial.ctaLabel}</span>
                    <span className="text-base leading-none">↗</span>
                  </Link>
                </div>

                {/* Consulting / Metric Progress Bar */}
                <div className="mt-10 max-w-md border-t border-border/50 pt-6">
                  <div className="mb-2.5 flex items-center justify-between">
                    <span className="font-sans text-sm font-semibold text-foreground">
                      {contentAndSocial.metric.label}
                    </span>
                    <span className="font-mono text-sm font-bold text-accent-alt">
                      {contentAndSocial.metric.percentage}%
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-panel border border-border/60">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-accent-alt to-accent-soft shadow-[0_0_8px_var(--accent-alt)]"
                      style={{ width: `${contentAndSocial.metric.percentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Photo with Overlapping Floating Badge Card */}
              <div data-digital="reveal" className="relative lg:col-span-6 xl:col-span-6 pb-8 sm:pb-10 lg:pb-0">
                {/* Main Photo Card */}
                <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-border/80 shadow-2xl">
                  <Image
                    src={contentAndSocial.image}
                    alt="Content and Social Media Strategy"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background/30 via-transparent to-transparent" />
                </div>

                {/* Overlapping Floating Badge Card pinned to bottom corner */}
                <div className="relative sm:absolute -bottom-8 -right-2 sm:-right-4 lg:-bottom-6 lg:-right-4 xl:-right-6 sm:max-w-[280px] lg:max-w-[310px] mt-6 sm:mt-0 rounded-2xl sm:rounded-3xl border border-border/80 bg-surface/95 p-6 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-accent-alt/40">
                  {/* Top Logo / Badge Symbol */}
                  <div className="mb-3.5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-alt/15 text-accent-alt shadow-inner">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>

                  <h4 className="font-sans text-base font-bold text-foreground leading-snug">
                    {contentAndSocial.card.headline}
                  </h4>

                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    {contentAndSocial.card.text}
                  </p>

                  <div className="mt-4 pt-3 border-t border-border/50">
                    <Link
                      href={contentAndSocial.card.linkHref}
                      className="inline-flex items-center gap-1.5 font-sans text-xs font-bold text-accent-alt transition-colors hover:text-accent-soft group"
                    >
                      <span className="border-b border-accent-alt/40 pb-0.5 group-hover:border-accent-soft">
                        {contentAndSocial.card.linkText}
                      </span>
                      <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        ↗
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 9. PAID ADVERTISING SECTION */}
        <section className="relative overflow-hidden bg-background py-20 sm:py-24 lg:py-32 border-b border-border/60">
          <div
            className="pointer-events-none absolute -left-40 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-accent-alt/10 blur-[130px]"
            aria-hidden
          />

          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-20">
              {/* Left Column on Desktop (Image & Floating Card): order-2 on mobile, order-1 on lg */}
              <div data-digital="reveal" className="relative order-2 lg:order-1 lg:col-span-6 xl:col-span-6 pb-8 sm:pb-10 lg:pb-0">
                {/* Main Photo Card */}
                <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-border/80 shadow-2xl">
                  <Image
                    src={paidAdvertising.image}
                    alt="Paid Advertising Strategy"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background/30 via-transparent to-transparent" />
                </div>

                {/* Overlapping Floating Badge Card pinned to bottom corner */}
                <div className="relative sm:absolute -bottom-8 -right-2 sm:-right-4 lg:-bottom-6 lg:-right-4 xl:-right-6 sm:max-w-[280px] lg:max-w-[310px] mt-6 sm:mt-0 rounded-2xl sm:rounded-3xl border border-border/80 bg-surface/95 p-6 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-accent-alt/40">
                  {/* Top Target/Bullseye Icon */}
                  <div className="mb-3.5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-alt/15 text-accent-alt shadow-inner">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="6" />
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                  </div>

                  <h4 className="font-sans text-base font-bold text-foreground leading-snug">
                    {paidAdvertising.card.headline}
                  </h4>

                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    {paidAdvertising.card.text}
                  </p>

                  <div className="mt-4 pt-3 border-t border-border/50">
                    <Link
                      href={paidAdvertising.card.linkHref}
                      className="inline-flex items-center gap-1.5 font-sans text-xs font-bold text-accent-alt transition-colors hover:text-accent-soft group"
                    >
                      <span className="border-b border-accent-alt/40 pb-0.5 group-hover:border-accent-soft">
                        {paidAdvertising.card.linkText}
                      </span>
                      <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        ↗
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Column on Desktop (Heading, Checklist, Pill CTA & Metric): order-1 on mobile, order-2 on lg */}
              <div data-digital="reveal" className="order-1 lg:order-2 lg:col-span-6 xl:col-span-6">
                <AccentMark className="mb-4 origin-left" />
                <p className="font-sans text-sm font-semibold uppercase tracking-wider text-accent-alt">
                  {paidAdvertising.eyebrow}
                </p>
                <h2 className="mt-3 font-sans text-[clamp(34px,5vw,54px)] font-bold leading-[1.08] tracking-tight text-foreground">
                  {paidAdvertising.title}
                </h2>
                <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-muted sm:text-lg">
                  {paidAdvertising.lead}
                </p>

                {/* Subheading */}
                <p className="mt-6 font-sans text-xs font-semibold uppercase tracking-wider text-accent-soft sm:text-sm">
                  {paidAdvertising.subheading}
                </p>

                {/* 2-Column Circular Checklist */}
                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3.5 sm:grid-cols-2">
                  {paidAdvertising.checklist.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-alt/15 text-accent-alt">
                        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span className="font-sans text-sm font-medium text-foreground">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pill-Shaped Rounded CTA Button */}
                <div className="mt-9">
                  <Link
                    href={paidAdvertising.ctaHref}
                    className="inline-flex items-center gap-2 rounded-full bg-accent-alt px-8 py-3.5 font-sans text-sm font-semibold text-white shadow-lg shadow-accent-alt/25 transition-all duration-300 hover:bg-accent-soft hover:shadow-accent-alt/40"
                  >
                    <span>{paidAdvertising.ctaLabel}</span>
                    <span className="text-base leading-none">↗</span>
                  </Link>
                </div>

                {/* Consulting / Metric Progress Bar */}
                <div className="mt-10 max-w-md border-t border-border/50 pt-6">
                  <div className="mb-2.5 flex items-center justify-between">
                    <span className="font-sans text-sm font-semibold text-foreground">
                      {paidAdvertising.metric.label}
                    </span>
                    <span className="font-mono text-sm font-bold text-accent-alt">
                      {paidAdvertising.metric.percentage}%
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-panel border border-border/60">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-accent-alt to-accent-soft shadow-[0_0_8px_var(--accent-alt)]"
                      style={{ width: `${paidAdvertising.metric.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>



        {/* 12. WHAT CAN WE HELP YOU ACHIEVE? (GROWTH GOALS) */}
        <section className="relative overflow-hidden bg-header py-20 sm:py-24 lg:py-32 border-b border-border/60">
          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
              <div data-digital="reveal" className="lg:col-span-5">
                <div className="sticky top-28 space-y-4">
                  <AccentMark className="mb-4 origin-left" />
                  <p className="font-sans text-sm font-semibold uppercase tracking-wider text-accent-alt">
                    {growthGoals.eyebrow}
                  </p>
                  <h2 className="font-sans text-[clamp(32px,4.5vw,48px)] font-bold leading-[1.1] tracking-tight text-foreground">
                    {growthGoals.title}
                  </h2>
                  <p className="font-sans text-sm leading-relaxed text-muted sm:text-base">
                    {growthGoals.lead}
                  </p>
                  <div className="pt-4">
                    <Link
                      href={growthGoals.ctaHref}
                      className="inline-flex items-center gap-2 rounded-xl border border-accent-alt bg-accent-alt px-6 py-3 font-sans text-sm font-semibold text-white shadow-lg shadow-accent-alt/25 transition-all hover:bg-accent-soft hover:shadow-accent-alt/40"
                    >
                      <span>{growthGoals.ctaLabel}</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div data-digital="reveal" className="lg:col-span-7">
                <FaqAccordion items={growthGoals.items} />
              </div>
            </div>
          </Container>
        </section>

        {/* 8. CTA SECTION */}
        <CtaSection />
      </div>
    </>
  );
}
