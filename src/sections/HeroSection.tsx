"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "@/data/hero.json";
import HeroRibbon from "@/components/ui/HeroRibbon";
import PillButton from "@/components/ui/PillButton";

gsap.registerPlugin(ScrollTrigger);

const TRUST_TAGS = [
  "AI-Powered Architecture",
  "High-Performance Web & Apps",
  "Measurable Business ROI",
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const overlay = section.querySelector("[data-hero='overlay']");
      const elements = section.querySelectorAll("[data-hero-el]");

      gsap
        .timeline({
          defaults: { ease: "power3.out" },
        })
        .from(elements, {
          y: 24,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
        }, 0.15);

      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1.1,
          },
        })
        .to(overlay, { opacity: 1 }, 0);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 isolate min-h-svh overflow-hidden bg-black selection:bg-accent-alt/30 selection:text-white"
    >
      {/* 3D WebGL Background Tower */}
      <div
        data-hero="background"
        className="absolute inset-0 z-0 will-change-transform"
      >
        <HeroRibbon className="pointer-events-auto" />
      </div>

      {/* Subtle ambient lighting */}
      <div
        className="pointer-events-none absolute top-1/4 right-1/4 h-120 w-120 rounded-full bg-accent-alt/10 blur-[160px]"
        aria-hidden
      />

      {/* Screen gradient mask for contrast */}
      <div
        data-hero="overlay"
        className="pointer-events-none absolute inset-0 z-1"
        aria-hidden
        style={{
          background:
            "radial-gradient(circle at center right, transparent 0%, rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0.94) 68%, #000 88%), linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.98) 100%)",
        }}
      />

      {/* Main Hero Content */}
      <div className="pointer-events-none relative z-10 mx-auto flex min-h-svh max-w-7xl items-center px-6 py-28 sm:px-10 sm:py-32 lg:px-14">
        <div className="pointer-events-auto max-w-2xl lg:max-w-3xl">
          {/* Category kicker */}
          <div data-hero-el className="mb-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-soft" />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white/80">
                Digital Product & AI Engineering
              </span>
            </div>
          </div>

          {/* Headline */}
          <h1
            data-hero-el
            className="font-sans text-[clamp(54px,8vw,112px)] font-black tracking-tight text-white leading-[0.94]"
          >
            {data.title}
          </h1>

          <p
            data-hero-el
            className="mt-3 font-sans text-[clamp(20px,2.6vw,32px)] font-semibold tracking-tight text-white/90 leading-snug sm:mt-4"
          >
            {data.titleAccent}
          </p>

          {/* Clean Editorial Quote */}
          <blockquote
            data-hero-el
            className="relative mt-7 max-w-xl border-l-2 border-accent-soft/80 pl-4.5 py-1"
          >
            <p className="font-sans text-[15px] sm:text-[16px] leading-relaxed text-white/85">
              &ldquo;Businesses don&apos;t need more technology.{" "}
              <span className="font-semibold text-white">
                They need technology that delivers results.
              </span>
              &rdquo;
            </p>
          </blockquote>

          {/* Body Description */}
          <p
            data-hero-el
            className="mt-6 max-w-xl font-sans text-[15px] leading-relaxed text-white/65 sm:text-[17px]"
          >
            {data.description}
          </p>

          {/* CTA Actions */}
          <div
            data-hero-el
            className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10"
          >
            <PillButton
              href={data.cta.href}
              icon={true}
              size="lg"
              className="border-accent-alt/50 bg-accent-alt font-semibold text-white shadow-lg shadow-accent-alt/25 transition-transform duration-300 hover:scale-[1.02] hover:bg-accent-alt/90"
            >
              {data.cta.label}
            </PillButton>

            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white"
            >
              Explore Solutions
              <svg
                className="h-4 w-4"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
              >
                <path
                  d="M6 12l4-4-4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {/* Subtle Key Highlights */}
          <div
            data-hero-el
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-2.5 border-t border-white/10 pt-6 text-xs sm:text-[13px] text-white/55"
          >
            {TRUST_TAGS.map((tag) => (
              <div key={tag} className="flex items-center gap-2 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-soft/70" />
                <span>{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


