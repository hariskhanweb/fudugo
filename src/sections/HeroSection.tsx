"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "@/data/hero.json";
import HeroRibbon from "@/components/ui/HeroRibbon";
import PillButton from "@/components/ui/PillButton";

gsap.registerPlugin(ScrollTrigger);

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
      <div className="pointer-events-none relative z-10 mx-auto flex min-h-svh max-w-360 items-center px-5 pt-32 pb-16 sm:px-8 sm:py-32 lg:px-12">
        <div className="pointer-events-auto max-w-2xl w-full">
          {/* Category kicker */}
          <div data-hero-el className="mb-4 sm:mb-5">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/5 px-4 py-1.5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-soft opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-soft" />
              </span>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white/90">
                Digital Product & AI Engineering
              </span>
            </div>
          </div>

          {/* Headline */}
          <h1
            data-hero-el
            className="font-sans text-[clamp(52px,9vw,118px)] font-black tracking-tight text-white leading-[0.92]"
          >
            {data.title}
          </h1>

          <p
            data-hero-el
            className="mt-3 font-sans text-[clamp(20px,2.8vw,34px)] font-semibold tracking-tight text-white/90 leading-snug sm:mt-4"
          >
            {data.titleAccent}
          </p>

          {/* Body Description */}
          <p
            data-hero-el
            className="mt-5 max-w-xl font-sans text-[15.5px] leading-relaxed text-white/70 sm:mt-6 sm:text-[17.5px]"
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
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white/85 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white"
            >
              <span>Explore Solutions</span>
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
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

          {/* Elevated Editorial Quote Card */}
          <div
            data-hero-el
            className="relative mt-8 max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-white/4 p-4.5 backdrop-blur-md sm:mt-10 sm:p-5"
          >
            <div className="flex items-start gap-3.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-soft/15 text-accent-soft">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="font-sans text-[14.5px] sm:text-[15.5px] leading-relaxed text-white/85">
                Businesses don&apos;t need more technology.{" "}
                <span className="font-semibold text-white">
                  They need technology that delivers results.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


