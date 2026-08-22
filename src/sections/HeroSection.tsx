"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "@/data/hero.json";
import HeroRibbon from "@/components/ui/HeroRibbon";

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
      const background = section.querySelector("[data-hero='background']");
      const overlay = section.querySelector("[data-hero='overlay']");
      const content = section.querySelector("[data-hero='content']");

      gsap
        .timeline({
          defaults: { ease: "power3.out" },
        })
        .from(content, { y: 28, opacity: 0, duration: 0.9 }, 0.1);

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
        .to(background, { scale: 1.1, yPercent: 6 }, 0)
        .to(overlay, { opacity: 1 }, 0)
        .to(content, { y: -48, opacity: 0.2 }, 0);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 isolate min-h-svh overflow-hidden bg-black"
    >
      <div
        data-hero="background"
        className="absolute inset-0 z-0 will-change-transform"
      >
        <HeroRibbon className="pointer-events-none" />
      </div>

      <div
        data-hero="overlay"
        className="pointer-events-none absolute inset-0 z-1"
        aria-hidden
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.72)_34%,rgba(0,0,0,0.28)_62%,rgba(0,0,0,0.55)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_45%,transparent_0%,rgba(0,0,0,0.25)_36%,rgba(0,0,0,0.75)_78%,#000_100%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-svh max-w-375 items-center px-5 py-28 sm:px-8 sm:py-32 lg:px-10">
        <div
          data-hero="content"
          className="max-w-xl will-change-transform lg:max-w-2xl"
        >
          <h1 className="font-sans text-[clamp(60px,10vw,160px)] font-bold leading-[0.92] tracking-tight text-white">
            {data.title}
          </h1>
          <p className="mt-2 max-w-xl font-sans text-[clamp(20px,3vw,28px)] font-bold leading-[1.05] tracking-tight text-white">
            {data.titleAccent}
          </p>

          <p className="mt-7 max-w-md font-sans text-[15px] leading-relaxed text-white/70 sm:text-[20px]">
            {data.description}
          </p>

          <a
            href={data.cta.href}
            className="mt-8 inline-flex w-fit items-center justify-center rounded-lg border border-white/25 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-white/15"
          >
            {data.cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
