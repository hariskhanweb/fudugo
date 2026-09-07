"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import content from "@/data/mobile-apps-page.json";
import { Container, AccentMark } from "@/components/ui";
import { CtaSection } from "@/sections";
import ServiceHero from "@/sections/services/ServiceHero";
import { getServiceBySlug } from "@/lib/service-pages";
import { useGsapContext } from "@/lib/use-gsap-context";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

function OfferIcon({ type }: { type: string }) {
  switch (type) {
    case "code":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      );
    case "palette":
    case "design":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
          <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
          <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
          <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
        </svg>
      );
    case "shield":
    case "store":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      );
    case "bell":
    case "notifications":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
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

function MobileWorkSlider({
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
          <span className="font-sans text-xs text-muted">Featured Mobile Applications</span>
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
                  {/* Image container */}
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

                {/* Bottom link */}
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

      {/* Pagination Dots */}
      <div className="mt-8 flex justify-center items-center gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={cn(
              "h-2 rounded-full transition-all duration-300 cursor-pointer",
              currentIndex === idx
                ? "w-8 bg-accent-alt shadow-[0_0_8px_var(--accent-alt)]"
                : "w-2 bg-border/80 hover:bg-muted",
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default function MobileAppsPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { introSection, whatWeOffer, aiDevelopment, techStack, ourWork, faqs } = content;
  const service = getServiceBySlug("mobile-apps");

  useGsapContext(
    rootRef,
    (scope) => {
      // Scroll reveals for general sections
      const blocks = scope.querySelectorAll("[data-mobile='reveal']");
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

      // Section 5: Right-side Timeline Scroll Progress & Item Animations
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
            { scale: 1, borderColor: "rgba(168, 85, 247, 0.7)", duration: 0.4, ease: "back.out(2)" },
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
      {service ? <ServiceHero service={service} /> : null}

      <div ref={rootRef}>
        {/* 2. INTRODUCTION SECTION */}
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
              <div data-mobile="reveal" className="space-y-4 lg:col-span-5">
                <AccentMark className="mb-4 origin-left" />
                <p className="font-sans text-sm font-semibold uppercase tracking-wider text-accent-alt">
                  {introSection.eyebrow}
                </p>
                <h2 className="font-sans text-[clamp(34px,5vw,52px)] font-bold leading-[1.08] tracking-tight text-foreground">
                  {introSection.title}
                </h2>
              </div>

              <div data-mobile="reveal" className="space-y-6 lg:col-span-7">
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
                    className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-accent-alt transition-colors hover:text-accent-soft sm:text-base cursor-pointer outline-hidden focus-visible:ring-2 focus-visible:ring-accent-alt/70"
                  >
                    <span>Discuss your mobile project</span>
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
            <div data-mobile="reveal" className="mb-14 max-w-3xl sm:mb-16 lg:mb-20">
              <AccentMark className="mb-4 origin-left" />
              <p className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider text-accent-alt">
                {whatWeOffer.eyebrow}
              </p>
              <h2 className="font-sans text-[clamp(34px,5.5vw,56px)] font-bold leading-[1.08] tracking-tight text-foreground">
                {whatWeOffer.title}
              </h2>
            </div>

            <div
              data-mobile="reveal"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7"
            >
              {whatWeOffer.items.map((item) => (
                <div
                  key={item.number}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-surface/60 shadow-(--card-shadow) backdrop-blur-xs transition-all duration-400 hover:-translate-y-1.5 hover:border-accent-alt/40 hover:bg-surface hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]"
                >
                  <div>
                    <div className="relative aspect-video w-full overflow-hidden bg-panel">
                      <Image
                        src={item.image ?? "/Image-18.jpg"}
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

                    <div className="p-6 sm:p-7 pt-2">
                      <div className="-mt-8 mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-border/80 bg-panel text-accent-alt shadow-md transition-all duration-300 group-hover:scale-105 group-hover:bg-accent-alt group-hover:text-white">
                        <OfferIcon type={item.icon} />
                      </div>

                      <h3 className="mb-2.5 font-sans text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-accent-soft sm:text-xl leading-snug">
                        {item.title}
                      </h3>

                      <p className="font-sans text-xs leading-relaxed text-muted sm:text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 pt-0 mt-auto">
                    <div className="border-t border-border/50 pt-4">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-accent-alt transition-colors hover:text-accent-soft sm:text-sm"
                      >
                        <span>Get started</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* 4. AI & DEVELOPMENT SECTION (2 Left + Center Phone Mockup + 2 Right) */}
        <section className="relative overflow-hidden bg-header py-20 sm:py-24 lg:py-32 border-t border-b border-border/60">
          {/* Subtle Ambient Grid and Glows */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] bg-size-[1.5rem_1.5rem] opacity-40"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-125 w-125 rounded-full bg-accent-alt/12 blur-[140px]"
            aria-hidden
          />

          <Container className="relative px-5 sm:px-8 lg:px-12">
            {/* Section Header */}
            <div data-mobile="reveal" className="mx-auto mb-14 max-w-225 text-center sm:mb-16 lg:mb-20">
              <div className="flex justify-center mb-4">
                <AccentMark />
              </div>
              <p className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider text-accent-alt">
                {aiDevelopment.eyebrow}
              </p>
              <h2 className="font-sans text-[clamp(34px,5.5vw,58px)] font-bold leading-[1.08] tracking-tight text-foreground">
                {aiDevelopment.title}
              </h2>

              <div className="mx-auto mt-6 max-w-225 rounded-2xl border border-border/70 bg-surface/40 p-5 sm:p-6 backdrop-blur-xs">
                <p className="font-sans text-base leading-relaxed text-foreground/90 sm:text-lg">
                  {aiDevelopment.lead}
                </p>
              </div>
            </div>

            {/* 3-Column Layout: Left (2 Points) + Center (Phone Mockup) + Right (2 Points) */}
            <div
              data-mobile="reveal"
              className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-8 xl:gap-10"
            >
              {/* Left Column (Points 1 & 2) */}
              <div className="flex flex-col gap-6 lg:col-span-4">
                {aiDevelopment.features.slice(0, 2).map((feature) => (
                  <div
                    key={feature.id}
                    className="group relative flex flex-col justify-between rounded-3xl border border-border/80 bg-surface/60 p-6 sm:p-7 shadow-(--card-shadow) backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:border-accent-alt/40 hover:bg-surface hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]"
                  >
                    <div>
                      <div className="mb-5 flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/60 bg-panel text-accent-alt shadow-xs transition-all duration-300 group-hover:scale-105 group-hover:bg-accent-alt group-hover:text-white">
                          {feature.id === "fast-development" && (
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                            </svg>
                          )}
                          {feature.id === "cross-platform-consistency" && (
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                              <polygon points="12 2 2 7 12 12 22 7 12 2" />
                              <polyline points="2 17 12 22 22 17" />
                              <polyline points="2 12 12 17 22 12" />
                            </svg>
                          )}
                        </div>
                        <span className="rounded-full bg-accent-alt/10 px-3 py-0.5 font-sans text-xs font-semibold text-accent-alt">
                          {feature.tag}
                        </span>
                      </div>

                      <h3 className="mb-2.5 font-sans text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-accent-soft sm:text-xl leading-snug">
                        {feature.title}
                      </h3>
                      <p className="font-sans text-xs leading-relaxed text-muted sm:text-sm sm:leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Center Column (High-Tech Floating Phone Mockup) */}
              <div className="flex justify-center lg:col-span-4 py-2">
                <div className="group relative w-full max-w-77.5 sm:max-w-82.5">
                  {/* Outer Ambient Glow */}
                  <div
                    className="pointer-events-none absolute inset-0 -inset-x-4 -inset-y-4 rounded-[3rem] bg-accent-alt/20 blur-2xl transition-all duration-700 group-hover:bg-accent-alt/30"
                    aria-hidden
                  />

                  {/* Phone Bezel */}
                  <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-white/15 bg-black/90 p-2.5 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-accent-alt/50 hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8)]">
                    {/* Dynamic Notch */}
                    <div className="absolute left-1/2 top-4 z-20 h-4 w-24 -translate-x-1/2 rounded-full bg-black/90 border border-white/10" />

                    {/* Phone Screen Display */}
                    <div className="relative aspect-9/18 overflow-hidden rounded-4xl bg-panel">
                      <Image
                        src="/mobile-ai-center.jpg"
                        alt="AI-Powered Mobile Engineering Telemetry"
                        fill
                        sizes="(max-width: 1024px) 100vw, 330px"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-transparent to-black/20" />
                    </div>

                    {/* Floating Micro-Badge on bottom */}
                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-xl border border-white/15 bg-black/80 px-3.5 py-2.5 backdrop-blur-md">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                        </span>
                        <span className="font-sans text-[11px] font-semibold text-white">
                          AI Neural Engine
                        </span>
                      </div>
                      <span className="font-mono text-[11px] font-bold text-accent-alt">
                        100% Secure
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (Points 3 & 4) */}
              <div className="flex flex-col gap-6 lg:col-span-4">
                {aiDevelopment.features.slice(2, 4).map((feature) => (
                  <div
                    key={feature.id}
                    className="group relative flex flex-col justify-between rounded-3xl border border-border/80 bg-surface/60 p-6 sm:p-7 shadow-(--card-shadow) backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:border-accent-alt/40 hover:bg-surface hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]"
                  >
                    <div>
                      <div className="mb-5 flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/60 bg-panel text-accent-alt shadow-xs transition-all duration-300 group-hover:scale-105 group-hover:bg-accent-alt group-hover:text-white">
                          {feature.id === "security" && (
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                              <polyline points="9 12 11 14 15 10" />
                            </svg>
                          )}
                          {feature.id === "fewer-bugs" && (
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                              <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                          )}
                        </div>
                        <span className="rounded-full bg-accent-alt/10 px-3 py-0.5 font-sans text-xs font-semibold text-accent-alt">
                          {feature.tag}
                        </span>
                      </div>

                      <h3 className="mb-2.5 font-sans text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-accent-soft sm:text-xl leading-snug">
                        {feature.title}
                      </h3>
                      <p className="font-sans text-xs leading-relaxed text-muted sm:text-sm sm:leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* 5. TECHNOLOGY SECTION (Interactive Scroll Progress Timeline) */}
        <section className="relative overflow-hidden bg-header py-20 sm:py-24 lg:py-32 border-t border-b border-border/60">
          {/* Subtle Grid Background Pattern */}
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
            className="pointer-events-none absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-accent-alt/10 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-accent/8 blur-3xl"
            aria-hidden
          />

          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 xl:gap-20">
              <header
                data-mobile="reveal"
                className="lg:sticky lg:top-28 lg:self-start space-y-4"
              >
                <div>
                  <AccentMark className="mb-4 origin-left" />
                  <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-accent-alt">
                    {techStack.eyebrow}
                  </p>
                  <h2 className="font-sans text-[clamp(2rem,calc(2.5vw+1rem),3.25rem)] font-bold leading-tight tracking-tight text-foreground">
                    {techStack.title}
                  </h2>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-muted sm:text-base">
                    {techStack.description}
                  </p>
                  <p className="pt-3 font-sans text-xs font-semibold uppercase tracking-wider text-accent-alt">
                    {String(techStack.categories.length).padStart(2, "0")} Technology Categories
                  </p>
                </div>
              </header>

              {/* Right-Side Timeline with Animated Scroll Line */}
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
                  aria-hidden
                />

                {techStack.categories.map((cat, index) => (
                  <li
                    key={cat.id}
                    data-tech-item="item"
                    className={cn(
                      "relative flex gap-5 pb-12 sm:gap-7 sm:pb-14 transition-all duration-300",
                      index === techStack.categories.length - 1 && "pb-0 sm:pb-0",
                    )}
                  >
                    <div className="relative z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center sm:mt-0.5 sm:h-8 sm:w-8">
                      <span
                        data-tech-marker="outer"
                        className="absolute inset-0 rounded-full border border-accent-alt/35 bg-background shadow-xs transition-all duration-300"
                      />
                      <span
                        data-tech-marker="inner"
                        className="relative h-2 w-2 rounded-full bg-accent-alt shadow-[0_0_8px_var(--accent-alt)] sm:h-2.5 sm:w-2.5 transition-all duration-300"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <span className="font-sans text-sm font-semibold tabular-nums text-accent-alt">
                          {cat.step}
                        </span>
                        <h3 className="font-sans text-xl font-bold tracking-tight text-foreground sm:text-2xl lg:text-[1.75rem]">
                          {cat.name}
                        </h3>
                      </div>

                      <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-muted sm:text-[15px]">
                        {cat.description}
                      </p>

                      <ul className="mt-5 flex flex-wrap gap-2 sm:gap-2.5">
                        {cat.skills.map((skill) => (
                          <li
                            key={skill}
                            data-tech-skill="pill"
                            className="rounded-xl border border-border/80 bg-surface/70 px-3.5 py-1.5 font-sans text-xs font-semibold text-foreground/85 shadow-2xs backdrop-blur-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-alt/40 hover:bg-accent-alt/10 hover:text-accent-soft sm:text-sm"
                          >
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </section>

        {/* 6. OUR WORK SECTION (3-Per-View Responsive Carousel) */}
        {ourWork && (
          <section className="relative overflow-hidden bg-background py-20 sm:py-24 lg:py-32">
            {/* Ambient Glows */}
            <div
              className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-accent-alt/10 blur-[130px]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-accent/8 blur-[130px]"
              aria-hidden
            />

            <Container className="relative px-5 sm:px-8 lg:px-12">
              {/* Header */}
              <div data-mobile="reveal" className="mb-12 max-w-3xl sm:mb-14 lg:mb-16">
                <AccentMark className="mb-4 origin-left" />
                <p className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider text-accent-alt">
                  {ourWork.eyebrow}
                </p>
                <h2 className="font-sans text-[clamp(34px,5.5vw,56px)] font-bold leading-[1.08] tracking-tight text-foreground">
                  {ourWork.title}
                </h2>
                <p className="mt-4 font-sans text-base leading-relaxed text-muted sm:text-lg">
                  {ourWork.description}
                </p>
              </div>

              {/* Slider Component */}
              <div data-mobile="reveal">
                <MobileWorkSlider projects={ourWork.projects} />
              </div>
            </Container>
          </section>
        )}

        {/* 7. FAQ SECTION */}
        <section className="relative overflow-hidden bg-header py-20 sm:py-24 lg:py-32 border-t border-border/60">
          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
              <div data-mobile="reveal" className="space-y-4 lg:col-span-5">
                <AccentMark className="mb-4 origin-left" />
                <p className="font-sans text-sm font-semibold uppercase tracking-wider text-accent-alt">
                  {faqs.eyebrow}
                </p>
                <h2 className="font-sans text-[clamp(34px,5.2vw,56px)] font-bold leading-[1.08] tracking-tight text-foreground">
                  {faqs.title}
                </h2>
                <p className="mt-3 font-sans text-base leading-relaxed text-muted sm:text-lg">
                  {faqs.description}
                </p>
              </div>

              <div data-mobile="reveal" className="lg:col-span-7">
                <FaqAccordion items={faqs.items} />
              </div>
            </div>
          </Container>
        </section>
      </div>

      {/* Final CTA Section */}
      <CtaSection
        content={{
          title: "Let's Build a Mobile App That Drives Real Results.",
          cta: {
            label: "Get a Free Consultation",
            href: "/contact",
          },
        }}
      />
    </>
  );
}
