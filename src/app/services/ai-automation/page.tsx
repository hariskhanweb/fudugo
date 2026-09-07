"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import content from "@/data/ai-automation-page.json";
import { Container, AccentMark } from "@/components/ui";
import { CtaSection } from "@/sections";
import ServiceHero from "@/sections/services/ServiceHero";
import { getServiceBySlug } from "@/lib/service-pages";
import { useGsapContext } from "@/lib/use-gsap-context";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

function AiCapabilityIcon({ type }: { type: string }) {
  switch (type) {
    case "cpu":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <line x1="9" y1="1" x2="9" y2="4" />
          <line x1="15" y1="1" x2="15" y2="4" />
          <line x1="9" y1="20" x2="9" y2="23" />
          <line x1="15" y1="20" x2="15" y2="23" />
          <line x1="20" y1="9" x2="23" y2="9" />
          <line x1="20" y1="14" x2="23" y2="14" />
          <line x1="1" y1="9" x2="4" y2="9" />
          <line x1="1" y1="14" x2="4" y2="14" />
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
    case "voice":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" />
          <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
      );
    case "document":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      );
    case "sparkles":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 2l2.4 4.8 4.8 2.4-4.8 2.4L12 16.4l-2.4-4.8L4.8 9.2l4.8-2.4z" />
          <path d="M19 15l1.2 2.4 2.4 1.2-2.4 1.2L19 22.2l-1.2-2.4-2.4-1.2 2.4-1.2z" />
          <path d="M5 15l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" />
        </svg>
      );
    case "search":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
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
    case "terminal":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
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
    case "handshake":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "shield":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
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
    case "layout":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
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
              className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left outline-hidden sm:p-6 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-alt/70"
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

function AiWorkSlider({
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
          <span className="font-sans text-xs text-muted">Featured AI Deployments</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border border-border/80 bg-surface/80 text-foreground shadow-xs transition-all duration-300 outline-hidden hover:border-accent-alt hover:bg-accent-alt hover:text-white focus-visible:ring-2 focus-visible:ring-accent-alt/70"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border border-border/80 bg-surface/80 text-foreground shadow-xs transition-all duration-300 outline-hidden hover:border-accent-alt hover:bg-accent-alt hover:text-white focus-visible:ring-2 focus-visible:ring-accent-alt/70"
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
                      <span>Explore case study</span>
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

export default function AiAutomationPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { introSection, whatWeOffer, aiDevelopment, techStack, ourWork, faqs, ctaSection } = content;
  const service = getServiceBySlug("ai-automation");

  useGsapContext(
    rootRef,
    (scope) => {
      // Scroll reveals for sections
      const blocks = scope.querySelectorAll("[data-ai='reveal']");
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

      // Section 4: Timeline Scroll Progress & Spotlight Effects
      const timelineTrack = scope.querySelector("[data-tech-timeline='track']");
      const progressBar = scope.querySelector("[data-tech-timeline='progress']");
      const bead = scope.querySelector("[data-tech-timeline='bead']");

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

      const techItems = scope.querySelectorAll("[data-tech-item='item']");
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
            card?.classList.add("border-accent-alt/60", "bg-surface", "shadow-xl", "translate-x-1");
            outerMarker?.classList.add("border-accent-alt", "bg-accent-alt/20", "scale-110", "shadow-[0_0_15px_rgba(40,171,226,0.4)]");
            innerMarker?.classList.add("scale-125");
          },
          onLeave: () => {
            card?.classList.remove("border-accent-alt/60", "bg-surface", "shadow-xl", "translate-x-1");
            outerMarker?.classList.remove("border-accent-alt", "bg-accent-alt/20", "scale-110", "shadow-[0_0_15px_rgba(40,171,226,0.4)]");
            innerMarker?.classList.remove("scale-125");
          },
          onEnterBack: () => {
            card?.classList.add("border-accent-alt/60", "bg-surface", "shadow-xl", "translate-x-1");
            outerMarker?.classList.add("border-accent-alt", "bg-accent-alt/20", "scale-110", "shadow-[0_0_15px_rgba(40,171,226,0.4)]");
            innerMarker?.classList.add("scale-125");
          },
          onLeaveBack: () => {
            card?.classList.remove("border-accent-alt/60", "bg-surface", "shadow-xl", "translate-x-1");
            outerMarker?.classList.remove("border-accent-alt", "bg-accent-alt/20", "scale-110", "shadow-[0_0_15px_rgba(40,171,226,0.4)]");
            innerMarker?.classList.remove("scale-125");
          },
        });
      });
    },
    [],
  );

  return (
    <>
      {service ? <ServiceHero service={service} /> : null}

      <div ref={rootRef} className="relative bg-background text-foreground">
        {/* 2. INTRO / PHILOSOPHY SECTION */}
        <section className="relative overflow-hidden bg-header py-20 sm:py-24 lg:py-32 border-b border-border/60">
          <div
            className="pointer-events-none absolute -left-40 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-accent-alt/10 blur-[130px]"
            aria-hidden
          />

          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-20">
              {/* Left Column: Clean Visual Graphic */}
              <div data-ai="reveal" className="relative lg:col-span-6">
                <div className="group relative aspect-4/3 sm:aspect-16/11 lg:aspect-4/3 w-full overflow-hidden rounded-[2.5rem] border border-border/80 bg-surface shadow-2xl transition-all duration-500 hover:border-accent-alt/40">
                  <Image
                    src={introSection.image || "/ai-agent-nodes.jpg"}
                    alt={introSection.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background/40 via-transparent to-transparent" />
                </div>
              </div>

              {/* Right Column: Eyebrow, Heading, Lead & Narrative */}
              <div data-ai="reveal" className="lg:col-span-6">
                <AccentMark className="mb-4 origin-left" />
                <p className="font-sans text-sm font-semibold uppercase tracking-wider text-accent-alt">
                  {introSection.eyebrow}
                </p>
                <h2 className="mt-3 font-sans text-[clamp(32px,4.5vw,48px)] font-bold leading-[1.1] tracking-tight text-foreground">
                  {introSection.title}
                </h2>

                {/* Lead Text with Accent-Alt Left Border */}
                <div className="mt-6 border-l-2 border-accent-alt pl-6 sm:pl-7">
                  <p className="font-sans text-base font-medium leading-relaxed text-foreground sm:text-lg sm:leading-relaxed">
                    {introSection.lead}
                  </p>
                </div>

                {/* Secondary Narrative Paragraph */}
                <p className="mt-6 font-sans text-sm leading-relaxed text-muted sm:text-base">
                  {introSection.paragraphs[0]}
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* 3. WHAT WE OFFER (CORE CAPABILITIES) */}
        <section id="capabilities" className="relative overflow-hidden bg-background py-20 sm:py-24 lg:py-32 border-b border-border/60">
          <div
            className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-accent-alt/10 blur-[130px]"
            aria-hidden
          />

          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div data-ai="reveal" className="mb-14 max-w-3xl sm:mb-16 lg:mb-20">
              <AccentMark className="mb-4 origin-left" />
              <p className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider text-accent-alt">
                {whatWeOffer.eyebrow}
              </p>
              <h2 className="font-sans text-[clamp(34px,5.5vw,56px)] font-bold leading-[1.08] tracking-tight text-foreground">
                {whatWeOffer.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {whatWeOffer.items.map((item) => (
                <div
                  key={item.number}
                  data-ai="reveal"
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-surface/60 p-6 sm:p-8 backdrop-blur-xs transition-all duration-400 hover:-translate-y-1.5 hover:border-accent-alt/40 hover:bg-surface hover:shadow-2xl"
                >
                  <div>
                    {/* Header: Number and Icon */}
                    <div className="mb-6 flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-accent-alt tracking-wider">
                        {item.number}
                      </span>
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-panel text-accent-alt border border-border/70 transition-transform duration-300 group-hover:scale-110 group-hover:border-accent-alt/50">
                        <AiCapabilityIcon type={item.icon} />
                      </span>
                    </div>

                    {/* Image Preview */}
                    <div className="relative mb-6 aspect-16/10 w-full overflow-hidden rounded-2xl border border-border/60 bg-panel">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-surface via-transparent to-transparent" />
                    </div>

                    <h3 className="font-sans text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-accent-soft sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-muted sm:text-base">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-8 border-t border-border/50 pt-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-accent-alt transition-colors hover:text-accent-soft sm:text-sm"
                    >
                      <span>Explore this solution</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* 4. AI + DEVELOPMENT SECTION */}
        <section className="relative overflow-x-clip bg-header py-20 sm:py-24 lg:py-32 border-t border-b border-border/60">
          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
              {/* Left Column: Sticky Title, Eyebrow & Lead Text (Simple Text, No Box) */}
              <div className="lg:col-span-5">
                <div className="sticky top-28 lg:top-36 space-y-6">
                  <div data-ai="reveal">
                    <AccentMark className="mb-4 origin-left" />
                    <p className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider text-accent-alt">
                      {aiDevelopment.eyebrow}
                    </p>
                    <h2 className="font-sans text-[clamp(34px,5vw,52px)] font-bold leading-[1.08] tracking-tight text-foreground">
                      {aiDevelopment.title}
                    </h2>
                    <p className="mt-5 font-sans text-base leading-relaxed text-muted sm:text-lg">
                      {aiDevelopment.lead}
                    </p>
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

                  {aiDevelopment.items.map((item, index) => (
                    <li
                      key={item.number}
                      data-tech-item="item"
                      className={cn(
                        "relative flex gap-5 pb-12 sm:gap-7 sm:pb-16 transition-all duration-400",
                        index === aiDevelopment.items.length - 1 && "pb-0 sm:pb-0",
                      )}
                    >
                      {/* Perfectly centered pointer circle */}
                      <div className="relative z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center sm:mt-0.5 sm:h-8 sm:w-8">
                        <span
                          data-tech-marker="outer"
                          className="absolute inset-0 rounded-full border border-accent-alt/40 bg-background shadow-xs transition-all duration-400"
                        />
                        <span
                          data-tech-marker="inner"
                          className="relative h-2 w-2 rounded-full bg-accent-alt shadow-[0_0_8px_var(--accent-alt)] sm:h-2.5 sm:w-2.5 transition-all duration-400"
                        />
                      </div>

                      {/* Content Card with Smooth Transitions */}
                      <div
                        data-tech-card
                        className="min-w-0 flex-1 rounded-2xl border border-border/70 bg-surface/50 p-6 sm:p-7 backdrop-blur-xs transition-all duration-400 hover:border-accent-alt/40 hover:bg-surface/90"
                      >
                        <div className="flex items-baseline gap-3">
                          <span className="font-mono text-xs font-bold text-accent-alt">
                            {item.number}
                          </span>
                          <span className="text-muted/40 font-mono text-xs">/</span>
                          <h4 className="font-sans text-lg font-bold text-foreground sm:text-xl transition-colors duration-300">
                            {item.title}
                          </h4>
                        </div>

                        <p className="mt-2.5 font-sans text-sm leading-relaxed text-muted sm:text-[15px]">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Container>
        </section>

        {/* 5. TECHNOLOGY STACK */}
        <section className="relative overflow-hidden bg-background py-20 sm:py-24 lg:py-32 border-b border-border/60">
          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div data-ai="reveal" className="mb-14 max-w-3xl sm:mb-16 lg:mb-20">
              <AccentMark className="mb-4 origin-left" />
              <p className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider text-accent-alt">
                {techStack.eyebrow}
              </p>
              <h2 className="font-sans text-[clamp(34px,5.5vw,56px)] font-bold leading-[1.08] tracking-tight text-foreground">
                {techStack.title}
              </h2>
              <p className="mt-4 font-sans text-base leading-relaxed text-muted sm:text-lg">
                {techStack.lead}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {techStack.categories.map((cat) => (
                <div
                  key={cat.id}
                  data-ai="reveal"
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-surface/60 p-7 sm:p-8 backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:border-accent-alt/40 hover:bg-surface hover:shadow-2xl"
                >
                  <div>
                    {/* Top Header: Number and Icon */}
                    <div className="mb-6 flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-accent-alt tracking-wider">
                        {cat.number}
                      </span>
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-panel text-accent-alt border border-border/70 transition-transform duration-300 group-hover:scale-110 group-hover:border-accent-alt/50">
                        <AiCapabilityIcon type={cat.icon} />
                      </span>
                    </div>

                    <h3 className="font-sans text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-accent-soft sm:text-2xl leading-snug">
                      {cat.name}
                    </h3>

                    {/* Skill Badges */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-xl border border-border/70 bg-panel/70 px-3.5 py-1.5 font-sans text-xs sm:text-sm font-medium text-foreground transition-all duration-300 hover:border-accent-alt/50 hover:bg-surface hover:text-accent-soft"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Inline text summary with dot separators */}
                  <div className="mt-6 border-t border-border/50 pt-4">
                    <p className="font-mono text-xs text-muted leading-relaxed">
                      {cat.skills.join(" · ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* 6. OUR WORK */}
        <section className="relative overflow-hidden bg-header py-20 sm:py-24 lg:py-32 border-b border-border/60">
          <div
            className="pointer-events-none absolute -left-40 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-accent-alt/10 blur-[130px]"
            aria-hidden
          />

          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div data-ai="reveal" className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end lg:mb-16">
              <div className="max-w-2xl">
                <AccentMark className="mb-4 origin-left" />
                <p className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider text-accent-alt">
                  {ourWork.eyebrow}
                </p>
                <h2 className="font-sans text-[clamp(34px,5.5vw,56px)] font-bold leading-[1.08] tracking-tight text-foreground">
                  {ourWork.title}
                </h2>
                <p className="mt-4 font-sans text-base leading-relaxed text-muted sm:text-lg">
                  {ourWork.lead}
                </p>
              </div>

              <div>
                <Link
                  href={ourWork.ctaHref}
                  className="inline-flex items-center gap-2 rounded-xl bg-accent-alt px-7 py-3.5 font-sans text-sm font-semibold text-white shadow-lg shadow-accent-alt/25 transition-all duration-300 hover:bg-accent-soft hover:shadow-accent-alt/40 cursor-pointer outline-hidden focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  <span>{ourWork.ctaLabel}</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Photos Slider */}
            <div data-ai="reveal">
              <AiWorkSlider projects={ourWork.projects} />
            </div>
          </Container>
        </section>

        {/* 7. FREQUENTLY ASKED QUESTIONS */}
        <section className="relative overflow-hidden bg-header py-20 sm:py-24 lg:py-32 border-b border-border/60">
          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
              <div data-ai="reveal" className="lg:col-span-5">
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

              <div data-ai="reveal" className="lg:col-span-7">
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
