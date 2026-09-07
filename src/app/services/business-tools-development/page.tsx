"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container, AccentMark } from "@/components/ui";
import { useGsapContext } from "@/lib/use-gsap-context";
import { CtaSection } from "@/sections";
import ServiceHero from "@/sections/services/ServiceHero";
import { getServiceBySlug } from "@/lib/service-pages";
import { cn } from "@/lib/utils";
import content from "@/data/business-tools-development-page.json";

gsap.registerPlugin(ScrollTrigger);

function ToolIcon({ type }: { type: string }) {
  switch (type) {
    case "workflow":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="7" height="7" rx="2" />
          <rect x="14" y="3" width="7" height="7" rx="2" />
          <rect x="14" y="14" width="7" height="7" rx="2" />
          <rect x="3" y="14" width="7" height="7" rx="2" />
          <path d="M10 6.5h4M17.5 10v4M14 17.5H10M6.5 14v-4" />
        </svg>
      );
    case "handshake":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4l-2-2a1 1 0 0 0-1.4 0l-4.3 4.3a1 1 0 0 0 0 1.4Z" />
          <path d="m13 15 2-2" />
          <path d="m7 11 2 2" />
          <path d="m2 11 4.3-4.3a1 1 0 0 1 1.4 0l2 2a1 1 0 0 1 0 1.4L5.4 14.4a1 1 0 0 1-1.4 0L2 12.4a1 1 0 0 1 0-1.4Z" />
          <path d="m17 7 4.3 4.3a1 1 0 0 1 0 1.4l-2 2a1 1 0 0 1-1.4 0L13.6 10.4a1 1 0 0 1 0-1.4l2-2a1 1 0 0 1 1.4 0Z" />
        </svg>
      );
    case "database":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      );
    case "terminal":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      );
    case "cloud":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
      );
    case "chart":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    case "search":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      );
    case "shield":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      );
    case "sparkles":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z" />
        </svg>
      );
    default:
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
  }
}

function FaqAccordion({
  items,
}: {
  items: Array<{ id: string; question: string; answer: string }>;
}) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-border/60">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="group py-5 transition-colors">
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 text-left outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-alt/70"
              aria-expanded={isOpen}
            >
              <span className="font-sans text-lg font-bold text-foreground transition-colors group-hover:text-accent-alt sm:text-xl">
                {item.question}
              </span>
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/80 bg-surface/60 font-mono text-sm font-semibold text-foreground transition-transform duration-300",
                  isOpen && "rotate-45 border-accent-alt bg-accent-alt text-white",
                )}
              >
                +
              </span>
            </button>

            <div
              className={cn(
                "grid transition-all duration-300 ease-in-out",
                isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="font-sans text-base leading-relaxed text-muted">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function BusinessToolsDevelopmentPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { introSection, whatWeOffer, aiDevelopment, techStack, faqs, ctaSection } = content;
  const service = getServiceBySlug("business-tools-development");

  useGsapContext(
    rootRef,
    (scope) => {
      // Scroll reveals
      const reveals = scope.querySelectorAll("[data-tool='reveal']");
      reveals.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      // Interactive Section 5 Timeline scrub & traveling bead
      const timelineTrack = scope.querySelector("[data-tech-timeline='track']") as HTMLElement | null;
      const progressBar = scope.querySelector("[data-tech-timeline='progress']") as HTMLElement | null;
      const bead = scope.querySelector("[data-tech-timeline='bead']") as HTMLElement | null;
      const techItems = scope.querySelectorAll("[data-tech-item='item']");

      if (timelineTrack && progressBar && bead) {
        const calculateTrack = () => {
          const trackRect = timelineTrack.getBoundingClientRect();
          return trackRect.height - 24;
        };

        ScrollTrigger.create({
          trigger: timelineTrack,
          start: "top 65%",
          end: "bottom 70%",
          scrub: 0.6,
          onUpdate: (self) => {
            const progress = self.progress;
            progressBar.style.transform = `scaleY(${progress})`;

            const trackHeight = calculateTrack();
            const currentY = 12 + progress * trackHeight;
            bead.style.top = "0px";
            bead.style.transform = `translate(-50%, ${currentY}px)`;
            bead.style.opacity = progress > 0.01 && progress < 0.99 ? "1" : progress >= 0.99 ? "1" : "0";
          },
        });
      }

      techItems.forEach((item) => {
        const card = item.querySelector("[data-tech-card]");
        const outerMarker = item.querySelector("[data-tech-marker='outer']");
        const innerMarker = item.querySelector("[data-tech-marker='inner']");

        ScrollTrigger.create({
          trigger: item,
          start: "top 70%",
          end: "bottom 40%",
          onEnter: () => {
            if (card) card.classList.add("border-accent-alt/60", "bg-surface", "shadow-xl", "translate-x-1");
            if (outerMarker) outerMarker.classList.add("border-accent-alt", "bg-accent-alt/20", "scale-110", "shadow-[0_0_15px_rgba(40,171,226,0.4)]");
            if (innerMarker) innerMarker.classList.add("scale-125");
          },
          onLeave: () => {
            if (card) card.classList.remove("border-accent-alt/60", "bg-surface", "shadow-xl", "translate-x-1");
            if (outerMarker) outerMarker.classList.remove("border-accent-alt", "bg-accent-alt/20", "scale-110", "shadow-[0_0_15px_rgba(40,171,226,0.4)]");
            if (innerMarker) innerMarker.classList.remove("scale-125");
          },
          onEnterBack: () => {
            if (card) card.classList.add("border-accent-alt/60", "bg-surface", "shadow-xl", "translate-x-1");
            if (outerMarker) outerMarker.classList.add("border-accent-alt", "bg-accent-alt/20", "scale-110", "shadow-[0_0_15px_rgba(40,171,226,0.4)]");
            if (innerMarker) innerMarker.classList.add("scale-125");
          },
          onLeaveBack: () => {
            if (card) card.classList.remove("border-accent-alt/60", "bg-surface", "shadow-xl", "translate-x-1");
            if (outerMarker) outerMarker.classList.remove("border-accent-alt", "bg-accent-alt/20", "scale-110", "shadow-[0_0_15px_rgba(40,171,226,0.4)]");
            if (innerMarker) innerMarker.classList.remove("scale-125");
          },
        });
      });
    },
    [],
  );

  return (
    <>
      {service ? <ServiceHero service={service} /> : null}

      <div ref={rootRef} className="relative min-h-screen bg-background text-foreground">
        {/* 2. PURPOSE-BUILT SOFTWARE (INTRO SECTION) */}
        <section className="relative overflow-hidden bg-header py-20 sm:py-24 lg:py-32 border-b border-border/60">
          {/* Subtle Dot Matrix Tech Pattern */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-size-[1.75rem_1.75rem] opacity-50 mask-[radial-gradient(ellipse_80%_60%_at_50%_50%,#000_60%,transparent_100%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-32 top-1/2 -translate-y-1/2 h-105 w-105 rounded-full bg-accent-alt/12 blur-[140px]"
            aria-hidden
          />

          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
              {/* High-res Graphic Frame on the Left */}
              <div data-tool="reveal" className="relative lg:col-span-6">
                <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-surface/60 shadow-(--card-shadow) backdrop-blur-xs transition-all duration-500 hover:border-accent-alt/40">
                  <div className="relative aspect-4/3 w-full sm:aspect-16/11">
                    <Image
                      src={introSection.image}
                      alt={introSection.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent" />
                    {/* Floating Ecosystem Tag */}
                    <div className="absolute top-4 right-4 z-20 rounded-xl border border-white/15 bg-black/75 px-3.5 py-1.5 backdrop-blur-md">
                      <span className="font-mono text-[11px] font-semibold text-accent-alt">
                        Unified Business Operating System
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Exact Text Content on the Right */}
              <div data-tool="reveal" className="space-y-6 lg:col-span-6">
                <div>
                  <AccentMark className="mb-4 origin-left" />
                  <p className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider text-accent-alt">
                    {introSection.eyebrow}
                  </p>
                  <h2 className="font-sans text-[clamp(32px,5vw,52px)] font-bold leading-[1.1] tracking-tight text-foreground">
                    {introSection.title}
                  </h2>
                </div>

                <div className="border-l-2 border-accent-alt/70 pl-5 py-1">
                  <p className="font-sans text-lg font-semibold leading-relaxed text-foreground sm:text-xl">
                    {introSection.lead}
                  </p>
                </div>

                <p className="font-sans text-base leading-relaxed text-muted sm:text-lg">
                  {introSection.narrative}
                </p>

                {"subNarrative" in introSection && (
                  <p className="font-sans text-base leading-relaxed text-muted sm:text-lg">
                    {(introSection as { subNarrative?: string }).subNarrative}
                  </p>
                )}
              </div>
            </div>
          </Container>
        </section>

        {/* 3. CORE DELIVERABLES (SECTION 3 CARDS) */}
        <section id="capabilities" className="relative overflow-hidden bg-background py-20 sm:py-24 lg:py-32 border-b border-border/60">
          {/* Ambient Cyber Grid Background */}
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_70%_50%_at_50%_50%,#000_70%,transparent_100%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-accent-alt/10 blur-[130px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-40 bottom-1/4 h-80 w-80 rounded-full bg-blue-600/10 blur-[140px]"
            aria-hidden
          />

          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div data-tool="reveal" className="mb-14 max-w-3xl sm:mb-16 lg:mb-20">
              <AccentMark className="mb-4 origin-left" />
              <p className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider text-accent-alt">
                {whatWeOffer.eyebrow}
              </p>
              <h2 className="font-sans text-[clamp(34px,5.5vw,56px)] font-bold leading-[1.08] tracking-tight text-foreground">
                {whatWeOffer.title}
              </h2>
              {"lead" in whatWeOffer && Boolean((whatWeOffer as { lead?: string }).lead) && (
                <p className="mt-4 font-sans text-base leading-relaxed text-muted sm:text-lg">
                  {(whatWeOffer as { lead?: string }).lead}
                </p>
              )}
            </div>

            <div
              data-tool="reveal"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7"
            >
              {whatWeOffer.capabilities.map((item) => (
                <div
                  key={item.id}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-surface/60 shadow-(--card-shadow) backdrop-blur-xs transition-all duration-400 hover:-translate-y-1.5 hover:border-accent-alt/40 hover:bg-surface hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]"
                >
                  <div>
                    {/* Top Image Banner */}
                    <div className="relative aspect-video w-full overflow-hidden bg-panel">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/40 to-transparent" />
                      <span className="absolute top-3.5 right-4 font-mono text-xs font-bold tracking-wider text-white/80 bg-black/60 px-2.5 py-0.5 rounded-md backdrop-blur-xs border border-white/10">
                        ({item.number})
                      </span>
                    </div>

                    {/* Card Content with Overlapping Floating Icon */}
                    <div className="p-6 sm:p-7 pt-2">
                      <div className="-mt-8 mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-border/80 bg-panel text-accent-alt shadow-md transition-all duration-300 group-hover:scale-105 group-hover:bg-accent-alt group-hover:text-white">
                        <ToolIcon type={item.icon} />
                      </div>

                      <h3 className="font-sans text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-accent-soft sm:text-2xl leading-snug">
                        {item.title}
                      </h3>

                      <p className="mt-3 font-sans text-sm leading-relaxed text-muted sm:text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="px-6 pb-6 pt-2 sm:px-7 sm:pb-7">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-accent-alt transition-colors group-hover:text-accent-soft sm:text-sm"
                    >
                      <span>Explore capability</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* 4. AI + BUSINESS TOOLS SECTION (MATCHING DIGITAL MARKETING SECTION 8 DESIGN) */}
        <section className="relative overflow-hidden bg-header py-20 sm:py-24 lg:py-32 border-b border-border/60">
          <div
            className="pointer-events-none absolute -right-40 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-accent-alt/10 blur-[130px]"
            aria-hidden
          />

          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-20">
              {/* Left Column: Heading, Checklist, Pill CTA & Metric Progress Bar */}
              <div data-tool="reveal" className="lg:col-span-6 xl:col-span-6">
                <AccentMark className="mb-4 origin-left" />
                <p className="font-sans text-sm font-semibold uppercase tracking-wider text-accent-alt">
                  {aiDevelopment.eyebrow}
                </p>
                <h2 className="mt-3 font-sans text-[clamp(34px,5vw,54px)] font-bold leading-[1.08] tracking-tight text-foreground">
                  {aiDevelopment.title}
                </h2>
                <p className="mt-5 max-w-xl font-sans text-base font-medium leading-relaxed text-foreground sm:text-lg">
                  {aiDevelopment.lead}
                </p>

                {"developerText" in aiDevelopment && (
                  <p className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-muted sm:text-base">
                    {(aiDevelopment as { developerText?: string }).developerText}
                  </p>
                )}

                {"opportunityText" in aiDevelopment && (
                  <div className="mt-5 rounded-2xl border border-accent-alt/30 bg-accent-alt/5 px-4.5 py-3 sm:px-5 sm:py-3.5 backdrop-blur-xs">
                    <p className="font-sans text-sm font-semibold text-foreground sm:text-[15px]">
                      ✦ {(aiDevelopment as { opportunityText?: string }).opportunityText}
                    </p>
                  </div>
                )}

                {"systemText" in aiDevelopment && (
                  <p className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-muted sm:text-base">
                    {(aiDevelopment as { systemText?: string }).systemText}
                  </p>
                )}

                {/* Pill-Shaped Rounded CTA Button */}
                <div className="mt-9">
                  <Link
                    href={aiDevelopment.ctaHref}
                    className="inline-flex items-center gap-2 rounded-full bg-accent-alt px-8 py-3.5 font-sans text-sm font-semibold text-white shadow-lg shadow-accent-alt/25 transition-all duration-300 hover:bg-accent-soft hover:shadow-accent-alt/40 cursor-pointer outline-hidden focus-visible:ring-2 focus-visible:ring-white/40"
                  >
                    <span>{aiDevelopment.ctaLabel}</span>
                    <span className="text-base leading-none">↗</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Hero Photo */}
              <div data-tool="reveal" className="relative lg:col-span-6 xl:col-span-6">
                {/* Main Photo Card */}
                <div className="relative aspect-4/3 sm:aspect-16/11 lg:aspect-4/3 w-full overflow-hidden rounded-4xl border border-border/80 shadow-2xl">
                  <Image
                    src={aiDevelopment.image}
                    alt="AI Business Systems Architecture"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background/30 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 5. TECHNOLOGY STACK (INTERACTIVE TIMELINE DESIGN) */}
        <section
          className="relative overflow-x-clip bg-background py-20 sm:py-24 lg:py-32 border-b border-border/60"
        >
          {/* Subtle Protocol Lines Background */}
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(40,171,226,0.03)_1px,transparent_1px)] bg-size-[100%_3.5rem] opacity-60"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-20 top-1/3 h-96 w-96 rounded-full bg-accent-alt/12 blur-[130px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-blue-600/10 blur-[140px]"
            aria-hidden
          />

          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
              {/* Left Column: Sticky Title, Eyebrow & Lead Text */}
              <div className="lg:col-span-5">
                <div className="sticky top-28 lg:top-36 space-y-6">
                  <div data-tool="reveal">
                    <AccentMark className="mb-4 origin-left" />
                    <p className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider text-accent-alt">
                      {techStack.eyebrow}
                    </p>
                    <h2 className="font-sans text-[clamp(34px,5vw,52px)] font-bold leading-[1.08] tracking-tight text-foreground">
                      {techStack.title}
                    </h2>
                    <p className="mt-5 font-sans text-base leading-relaxed text-muted sm:text-lg">
                      {techStack.lead}
                    </p>

                    <div className="pt-6">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 rounded-xl bg-accent-alt px-6 py-3 font-sans text-sm font-semibold text-white shadow-lg shadow-accent-alt/25 transition-all hover:bg-accent-soft hover:shadow-accent-alt/40 cursor-pointer outline-hidden focus-visible:ring-2 focus-visible:ring-white/40"
                      >
                        <span>Plan Your System</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Track with Progress Line & Step Cards */}
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
                  {/* Traveling Glowing Head Bead */}
                  <span
                    data-tech-timeline="bead"
                    className="pointer-events-none absolute left-2.75 sm:left-3.75 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white shadow-[0_0_12px_#28abe2,0_0_24px_#28abe2] z-20 transition-opacity duration-200"
                    style={{ top: "12px", opacity: 0 }}
                    aria-hidden
                  />

                  {techStack.categories.map((cat, index) => (
                    <li
                      key={cat.id}
                      data-tech-item="item"
                      className={cn(
                        "relative flex gap-5 pb-12 sm:gap-7 sm:pb-16 transition-all duration-400",
                        index === techStack.categories.length - 1 && "pb-0 sm:pb-0",
                      )}
                    >
                      {/* Node Marker on Line */}
                      <div className="relative z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center sm:mt-1.5 sm:h-8 sm:w-8">
                        <span
                          data-tech-marker="outer"
                          className="absolute inset-0 rounded-full border border-border/80 bg-background shadow-xs transition-all duration-400"
                        />
                        <span
                          data-tech-marker="inner"
                          className="relative h-2 w-2 rounded-full bg-accent-alt shadow-[0_0_6px_var(--accent-alt)] transition-all duration-400 sm:h-2.5 sm:w-2.5"
                        />
                      </div>

                      {/* Content Card with Smooth Transitions */}
                      <div
                        data-tech-card
                        className="min-w-0 flex-1 rounded-2xl border border-border/70 bg-surface/50 p-6 sm:p-7 backdrop-blur-xs transition-all duration-400 hover:border-accent-alt/40 hover:bg-surface/90"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-baseline gap-3">
                            <span className="font-mono text-xs font-bold text-accent-alt">
                              {cat.number}
                            </span>
                            <span className="text-muted/40 font-mono text-xs">/</span>
                            <h3 className="font-sans text-lg font-bold text-foreground sm:text-xl transition-colors duration-300">
                              {cat.name}
                            </h3>
                          </div>
                          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-panel text-accent-alt border border-border/70">
                            <ToolIcon type={cat.icon} />
                          </span>
                        </div>

                        {/* Skill Badges */}
                        <div className="mt-4 flex flex-wrap gap-2">
                          {cat.skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-xl border border-border/70 bg-panel/70 px-3 py-1 font-sans text-xs sm:text-sm font-medium text-foreground transition-all duration-300 hover:border-accent-alt/50 hover:bg-surface hover:text-accent-soft"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div className="mt-4 border-t border-border/50 pt-3">
                          <p className="font-mono text-xs text-muted leading-relaxed">
                            {cat.skills.join(" · ")}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Container>
        </section>

        {/* 6. FREQUENTLY ASKED QUESTIONS */}
        <section className="relative overflow-hidden bg-background py-20 sm:py-24 lg:py-32 border-b border-border/60">
          {/* FAQ Ambient Atmosphere */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[24px_24px] opacity-40"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-accent-alt/8 blur-[120px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-blue-600/8 blur-[130px]"
            aria-hidden
          />

          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
              <div data-tool="reveal" className="lg:col-span-5">
                <div className="sticky top-28 space-y-4">
                  <AccentMark className="mb-4 origin-left" />
                  <p className="font-sans text-sm font-semibold uppercase tracking-wider text-accent-alt">
                    {faqs.eyebrow}
                  </p>
                  <h2 className="font-sans text-[clamp(32px,4.5vw,48px)] font-bold leading-[1.1] tracking-tight text-foreground">
                    {faqs.title}
                  </h2>
                  <p className="font-sans text-sm leading-relaxed text-muted sm:text-base">
                    {faqs.lead}
                  </p>
                  <div className="pt-4">
                    <Link
                      href={faqs.ctaHref}
                      className="inline-flex items-center gap-2 rounded-xl border border-accent-alt bg-accent-alt px-6 py-3 font-sans text-sm font-semibold text-white shadow-lg shadow-accent-alt/25 transition-all hover:bg-accent-soft hover:shadow-accent-alt/40 cursor-pointer outline-hidden focus-visible:ring-2 focus-visible:ring-white/40"
                    >
                      <span>{faqs.ctaLabel}</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div data-tool="reveal" className="lg:col-span-7">
                <FaqAccordion items={faqs.items} />
              </div>
            </div>
          </Container>
        </section>

        {/* 7. FULL-WIDTH CALL TO ACTION */}
        <CtaSection content={ctaSection} />
      </div>
    </>
  );
}
