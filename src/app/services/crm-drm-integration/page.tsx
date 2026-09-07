"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import content from "@/data/crm-drm-integration-page.json";
import { Container, AccentMark } from "@/components/ui";
import { CtaSection, PageHeroSection } from "@/sections";
import { useGsapContext } from "@/lib/use-gsap-context";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

function CrmIcon({ type }: { type: string }) {
  switch (type) {
    case "handshake":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "workflow":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="2" y="3" width="6" height="6" rx="1" />
          <rect x="16" y="3" width="6" height="6" rx="1" />
          <rect x="9" y="15" width="6" height="6" rx="1" />
          <path d="M5 9v3a2 2 0 0 0 2 2h5m0 0h5a2 2 0 0 0 2-2V9" />
        </svg>
      );
    case "terminal":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
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
    case "cloud":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
      );
    case "intent":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
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
              className="flex w-full items-center justify-between gap-4 text-left cursor-pointer"
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
                <div className="border-t border-border/40 px-2 pt-3 pb-2 sm:px-4">
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

function CrmWorkSlider({
  projects,
}: {
  projects: Array<{
    id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    tags: string[];
  }>;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const updateSlides = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 640) {
          setSlidesToShow(1);
        } else if (window.innerWidth < 1024) {
          setSlidesToShow(2);
        } else {
          setSlidesToShow(3);
        }
      }
    };
    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  const maxIndex = Math.max(0, projects.length - slidesToShow);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  return (
    <div className="relative">
      {/* Top Header Controls (Counter & Arrows) */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono text-xs font-semibold text-accent-alt">
          <span className="rounded-md bg-accent-alt/10 px-2.5 py-1 text-accent-alt">
            {String(currentIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
          <span className="font-sans text-xs text-muted">Featured Network Deployments</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/80 bg-surface/80 text-foreground transition-all duration-300 hover:border-accent-alt hover:bg-accent-alt hover:text-white shadow-xs cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/80 bg-surface/80 text-foreground transition-all duration-300 hover:border-accent-alt hover:bg-accent-alt hover:text-white shadow-xs cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Slider Viewport */}
      <div className="overflow-hidden -mx-3">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
          }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="shrink-0 px-3"
              style={{ width: `${100 / slidesToShow}%` }}
            >
              <div className="group flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-surface/60 shadow-(--card-shadow) backdrop-blur-xs transition-all duration-400 hover:-translate-y-1.5 hover:border-accent-alt/40 hover:bg-surface hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]">
                <div>
                  {/* Photo Container */}
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-panel">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/30 to-transparent" />

                    {/* Category pill floating over image */}
                    <span className="absolute top-3.5 left-4 rounded-lg border border-white/10 bg-black/70 px-3 py-1 font-sans text-xs font-semibold text-white backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-7">
                    <h3 className="mb-2.5 font-sans text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-accent-soft sm:text-xl leading-snug">
                      {project.title}
                    </h3>
                    <p className="font-sans text-xs leading-relaxed text-muted sm:text-sm">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <ul className="mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                      {project.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-lg border border-border/60 bg-panel px-2.5 py-1 font-mono text-[11px] font-medium text-foreground/80"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Link */}
                <div className="p-6 pt-0 sm:p-7 sm:pt-0 mt-auto">
                  <div className="border-t border-border/50 pt-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-accent-alt transition-colors hover:text-accent-soft sm:text-sm"
                    >
                      <span>Explore integration details</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CrmDrmIntegrationPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { hero, introSection, whatWeOffer, aiDevelopment, techStack, faqs, ctaSection } = content;

  useGsapContext(
    rootRef,
    (scope) => {
      // Hero elements animation
      const heroParts = scope.querySelectorAll("[data-crm-hero='part']");
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
      const blocks = scope.querySelectorAll("[data-crm='reveal']");
      blocks.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      // Section 4: Sticky Timeline Scrub and Active Beads
      const timelineTrack = scope.querySelector<HTMLElement>("[data-tech-timeline='track']");
      const progressBar = scope.querySelector<HTMLElement>("[data-tech-timeline='progress']");
      const bead = scope.querySelector<HTMLElement>("[data-tech-timeline='bead']");

      if (timelineTrack && progressBar) {
        gsap.fromTo(
          progressBar,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineTrack,
              start: "top 65%",
              end: "bottom 70%",
              scrub: 0.3,
              onUpdate: (self) => {
                if (bead) {
                  const progress = self.progress;
                  bead.style.opacity = progress > 0.02 && progress < 0.98 ? "1" : "0";
                  const trackHeight = timelineTrack.clientHeight - 24;
                  bead.style.transform = `translate(-50%, ${progress * trackHeight}px)`;
                }
              },
            },
          },
        );
      }

      const techItems = scope.querySelectorAll<HTMLElement>("[data-tech-item='item']");
      techItems.forEach((item) => {
        const outerMarker = item.querySelector("[data-tech-marker='outer']");
        const innerMarker = item.querySelector("[data-tech-marker='inner']");
        const card = item.querySelector("[data-tech-card]");

        // Smooth reactive entry
        gsap.fromTo(
          item,
          { y: 32, opacity: 0.4 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play reverse play reverse",
            },
          },
        );

        // Highlight spotlight when this item is in the focal scroll area
        ScrollTrigger.create({
          trigger: item,
          start: "top 62%",
          end: "bottom 48%",
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
      <PageHeroSection
        content={{
          title: "CRM & DRM Integration",
          image: "/ai-agent-nodes.jpg",
          imageAlt: "CRM & DRM Connected Architecture",
          imagePosition: "center",
        }}
      />

      <div ref={rootRef} className="relative min-h-screen bg-background text-foreground">
        {/* 1. HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28 lg:pt-20 lg:pb-32 border-b border-border/60">
          {/* Cyber Network Grid Pattern */}
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(40,171,226,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(40,171,226,0.08)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,#000_60%,transparent_100%)] opacity-70"
            aria-hidden
          />
          {/* Ambient Glowing Orbs */}
          <div
            className="pointer-events-none absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full bg-accent-alt/18 blur-[140px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute top-1/3 -left-32 h-[450px] w-[450px] rounded-full bg-blue-600/12 blur-[150px]"
            aria-hidden
          />

          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
              {/* Left Column: Copy & Actions */}
              <div className="lg:col-span-6 xl:col-span-6">
                <div data-crm-hero="part">
                  <AccentMark className="mb-4 origin-left" />
                  <p className="font-sans text-sm font-semibold uppercase tracking-wider text-accent-alt">
                    {hero.eyebrow}
                  </p>
                </div>

                <h1
                  data-crm-hero="part"
                  className="mt-4 font-sans text-[clamp(36px,5.5vw,60px)] font-bold leading-[1.06] tracking-tight text-foreground"
                >
                  {hero.title}
                </h1>

                <p
                  data-crm-hero="part"
                  className="mt-6 font-sans text-base leading-relaxed text-muted sm:text-lg"
                >
                  {hero.description}
                </p>

                <div
                  data-crm-hero="part"
                  className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5"
                >
                  <Link
                    href={hero.ctaHref}
                    className="inline-flex items-center gap-2 rounded-xl border border-accent-alt bg-accent-alt px-7 py-3.5 font-sans text-sm font-semibold text-white shadow-lg shadow-accent-alt/25 transition-all duration-300 hover:bg-accent-soft hover:shadow-accent-alt/40"
                  >
                    <span>{hero.ctaLabel}</span>
                    <span className="text-base leading-none">↗</span>
                  </Link>
                  <Link
                    href={hero.secondaryCtaHref}
                    className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-surface/80 px-7 py-3.5 font-sans text-sm font-semibold text-foreground transition-all duration-300 hover:border-accent-alt/50 hover:bg-surface hover:text-accent-soft"
                  >
                    <span>{hero.secondaryCtaLabel}</span>
                    <span className="text-base leading-none">↓</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: High-Tech Cockpit Visualization */}
              <div className="relative lg:col-span-6 xl:col-span-6">
                <div
                  data-crm-hero="part"
                  className="group relative aspect-16/10 sm:aspect-16/11 lg:aspect-4/3 w-full overflow-hidden rounded-[2rem] border border-border/80 bg-surface shadow-2xl transition-all duration-500 hover:border-accent-alt/40"
                >
                  <Image
                    src={hero.image}
                    alt="CRM & DRM Connected Architecture"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background/85 via-transparent to-background/25" />

                  {/* Floating Live Sync Status Pill */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-xl border border-white/15 bg-black/75 px-3 py-1.5 backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    <span className="font-mono text-[11px] font-semibold text-white/90">
                      Live Data Streams · Active
                    </span>
                  </div>

                  {/* Floating Meta Badges */}
                  <div className="absolute inset-x-4 bottom-4 flex flex-wrap gap-2 sm:inset-x-6 sm:bottom-6">
                    {hero.meta.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-xl border border-white/10 bg-black/75 px-3.5 py-2 backdrop-blur-md"
                      >
                        <span className="block font-mono text-[10px] uppercase tracking-wider text-accent-alt">
                          {m.label}
                        </span>
                        <span className="block font-sans text-xs font-semibold text-white">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 2. CONNECTED ECOSYSTEMS (INTRO SECTION) */}
        <section className="relative overflow-hidden bg-header py-20 sm:py-24 lg:py-32 border-b border-border/60">
          {/* Subtle Dot Matrix Tech Pattern */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:1.75rem_1.75rem] opacity-50 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_60%,transparent_100%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-32 top-1/2 -translate-y-1/2 h-[420px] w-[420px] rounded-full bg-accent-alt/12 blur-[140px]"
            aria-hidden
          />

          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
              {/* High-res Graphic Frame on the Left */}
              <div data-crm="reveal" className="relative lg:col-span-6">
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
                        Unified Dealer & Customer Ledger
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Exact Text Content on the Right */}
              <div data-crm="reveal" className="space-y-6 lg:col-span-6">
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
              </div>
            </div>
          </Container>
        </section>

        {/* 3. OUR INTEGRATION CAPABILITIES (MATCHING MOBILE APPS SECTION 3 DESIGN) */}
        <section id="capabilities" className="relative overflow-hidden bg-background py-20 sm:py-24 lg:py-32 border-b border-border/60">
          {/* Ambient Cyber Grid Background */}
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,#000_70%,transparent_100%)]"
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
            <div data-crm="reveal" className="mb-14 max-w-3xl sm:mb-16 lg:mb-20">
              <AccentMark className="mb-4 origin-left" />
              <p className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider text-accent-alt">
                {whatWeOffer.eyebrow}
              </p>
              <h2 className="font-sans text-[clamp(34px,5.5vw,56px)] font-bold leading-[1.08] tracking-tight text-foreground">
                {whatWeOffer.title}
              </h2>
              {"lead" in whatWeOffer && (whatWeOffer as { lead?: string }).lead && (
                <p className="mt-4 font-sans text-base leading-relaxed text-muted sm:text-lg">
                  {(whatWeOffer as { lead?: string }).lead}
                </p>
              )}
            </div>

            <div
              data-crm="reveal"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7"
            >
              {whatWeOffer.capabilities.map((item) => (
                <div
                  key={item.id}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-surface/60 shadow-(--card-shadow) backdrop-blur-xs transition-all duration-400 hover:-translate-y-1.5 hover:border-accent-alt/40 hover:bg-surface hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]"
                >
                  <div>
                    {/* Top Image Banner */}
                    <div className="relative aspect-16/9 w-full overflow-hidden bg-panel">
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
                        <CrmIcon type={item.icon} />
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

        {/* 4. AI + DEVELOPMENT SECTION (CARD GRID DESIGN) */}
        <section className="relative overflow-hidden bg-header py-20 sm:py-24 lg:py-32 border-b border-border/60">
          {/* Futuristic Neural Mesh Background */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(40,171,226,0.12)_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[550px] rounded-full bg-accent-alt/10 blur-[160px]"
            aria-hidden
          />

          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div data-crm="reveal" className="mb-14 max-w-3xl sm:mb-16 lg:mb-20">
              <AccentMark className="mb-4 origin-left" />
              <p className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider text-accent-alt">
                {aiDevelopment.eyebrow}
              </p>
              <h2 className="font-sans text-[clamp(34px,5.5vw,56px)] font-bold leading-[1.08] tracking-tight text-foreground">
                {aiDevelopment.title}
              </h2>
              <p className="mt-4 font-sans text-base leading-relaxed text-muted sm:text-lg">
                {aiDevelopment.lead}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 lg:gap-8">
              {aiDevelopment.items.map((item) => (
                <div
                  key={item.number}
                  data-crm="reveal"
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-surface/60 p-7 sm:p-8 backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:border-accent-alt/40 hover:bg-surface hover:shadow-2xl"
                >
                  <div>
                    {/* Top Header: Number and Icon */}
                    <div className="mb-6 flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-accent-alt tracking-wider">
                        {item.number}
                      </span>
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-panel text-accent-alt border border-border/70 transition-transform duration-300 group-hover:scale-110 group-hover:border-accent-alt/50">
                        <CrmIcon type={item.icon} />
                      </span>
                    </div>

                    <h3 className="font-sans text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-accent-soft sm:text-2xl leading-snug">
                      {item.title}
                    </h3>

                    <p className="mt-3.5 font-sans text-sm leading-relaxed text-muted sm:text-base">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-border/50 pt-4">
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

        {/* 5. TECHNOLOGY STACK (INTERACTIVE TIMELINE DESIGN) */}
        <section
          className="relative overflow-x-clip bg-background py-20 sm:py-24 lg:py-32 border-b border-border/60"
        >
          {/* Subtle Protocol Lines Background */}
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(40,171,226,0.03)_1px,transparent_1px)] bg-[size:100%_3.5rem] opacity-60"
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
                  <div data-crm="reveal">
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
                        className="inline-flex items-center gap-2 rounded-xl bg-accent-alt px-6 py-3 font-sans text-sm font-semibold text-white shadow-lg shadow-accent-alt/25 transition-all hover:bg-accent-soft hover:shadow-accent-alt/40"
                      >
                        <span>Plan Your Integration</span>
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
                            <CrmIcon type={cat.icon} />
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
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40"
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
              <div data-crm="reveal" className="lg:col-span-5">
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
                      className="inline-flex items-center gap-2 rounded-xl border border-accent-alt bg-accent-alt px-6 py-3 font-sans text-sm font-semibold text-white shadow-lg shadow-accent-alt/25 transition-all hover:bg-accent-soft hover:shadow-accent-alt/40"
                    >
                      <span>{faqs.ctaLabel}</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div data-crm="reveal" className="lg:col-span-7">
                <FaqAccordion items={faqs.items} />
              </div>
            </div>
          </Container>
        </section>

        {/* 8. FULL-WIDTH CALL TO ACTION */}
        <CtaSection content={ctaSection} />
      </div>
    </>
  );
}
