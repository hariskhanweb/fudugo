"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "@/data/hero.json";
import HeroRibbon from "@/components/ui/HeroRibbon";
import Button from "@/components/ui/Button";

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
          y: 16,
          opacity: 0,
          duration: 0.9,
          stagger: 0.08,
        }, 0.1);

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
      className="relative z-20 isolate overflow-hidden bg-black sm:min-h-svh selection:bg-accent-alt/30 selection:text-white"
    >
      {/* 3D WebGL Background Tower — desktop/tablet only */}
      <div
        data-hero="background"
        className="absolute inset-0 z-0 hidden will-change-transform sm:block"
      >
        <HeroRibbon className="pointer-events-auto" />
      </div>

      {/* Mobile backdrop */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-linear-to-b from-zinc-950 via-black to-black sm:hidden"
        aria-hidden
      />

      {/* Screen gradient mask for contrast */}
      <div
        data-hero="overlay"
        className="pointer-events-none absolute inset-0 z-1 opacity-0 sm:opacity-100"
        aria-hidden
        style={{
          background:
            "linear-gradient(105deg, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.82) 34%, rgba(0,0,0,0.45) 58%, rgba(0,0,0,0.15) 78%, transparent 100%), linear-gradient(180deg, rgba(0,0,0,0.55) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.9) 100%)",
        }}
      />

      {/* Main Hero Content */}
      <div className="pointer-events-none relative z-10 mx-auto flex max-w-360 flex-col px-5 pt-26 pb-14 sm:min-h-svh sm:justify-center sm:px-8 sm:py-32 lg:px-12">
        <div className="pointer-events-auto w-full max-w-xl lg:max-w-2xl">
          {/* Category kicker */}
          <p
            data-hero-el
            className="mb-4 font-sans text-[12px] font-medium tracking-[0.02em] text-white/55 sm:mb-7 sm:text-sm"
          >
            Digital Product & AI Engineering
          </p>

          {/* Headline */}
          <h1
            data-hero-el
            className="font-sans text-[clamp(2.75rem,12vw,6.5rem)] font-bold leading-[0.94] tracking-[-0.03em] text-white sm:leading-[0.92]"
          >
            {data.title}
          </h1>

          <p
            data-hero-el
            className="mt-3 max-w-lg font-sans text-[clamp(1.05rem,4.5vw,1.625rem)] font-normal leading-[1.35] tracking-[-0.01em] text-white/85 sm:mt-5"
          >
            {data.titleAccent}
          </p>

          {/* Body Description */}
          <p
            data-hero-el
            className="mt-4 max-w-md font-sans text-[15px] leading-[1.7] text-white/58 sm:mt-7 sm:text-[17px] sm:leading-[1.75]"
          >
            {data.description}
          </p>

          {/* CTA Actions */}
          <div
            data-hero-el
            className="mt-6 flex flex-wrap items-center gap-2.5 sm:mt-8 sm:gap-3"
          >
            <Button
              href={data.cta.href}
              variant="solid-white"
              size="lg"
              icon
            >
              {data.cta.label}
            </Button>

            <Button
              href="#services"
              variant="glass"
              size="lg"
              icon
            >
              Explore Solutions
            </Button>
          </div>

          {/* Pull quote */}
          <figure
            data-hero-el
            className="mt-8 max-w-md border-l border-white/20 pl-4 sm:mt-12 sm:pl-6"
          >
            <blockquote className="font-sans text-[14px] leading-[1.65] text-white/70 sm:text-[16px] sm:leading-[1.7]">
              Businesses don&apos;t need more technology.{" "}
              <span className="text-white/90">
                They need technology that delivers results.
              </span>
            </blockquote>
          </figure>
        </div>
      </div>
    </section>
  );
}