"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "@/data/hero.json";
import HeroVideo from "@/components/ui/HeroVideo";

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
      const video = section.querySelector("[data-hero='video']");
      const overlay = section.querySelector("[data-hero='overlay']");
      const title = section.querySelector("[data-hero='title']");
      const intro = section.querySelector("[data-hero='intro']");
      const quote = section.querySelector("[data-hero='quote']");
      const quoteMuted = section.querySelector("[data-hero='quote-muted']");
      const meta = section.querySelector("[data-hero='meta']");
      const badges = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-hero='badge']"),
      );

      if (quote) gsap.set(quote, { autoAlpha: 1 });
      if (quoteMuted) gsap.set(quoteMuted, { opacity: 0.55 });
      if (meta) gsap.set(meta, { opacity: 1 });
      badges.forEach((badge) => gsap.set(badge, { opacity: 1 }));

      // Main scroll story — tied to user scroll through the hero
      const scrollTl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.1,
        },
      });

      scrollTl
        // Background deepens and zooms
        .to(video, { scale: 1.18, yPercent: 10 }, 0)
        .to(overlay, { opacity: 0.92 }, 0)
        // Title lifts and softens
        .to(
          title,
          { y: -90, opacity: 0.15, filter: "blur(4px)" },
          0,
        )
        // Intro drifts the other way for depth
        .to(intro, { y: -40, opacity: 0, x: 24 }, 0)
        // Quote brightens (real opacity, not color-alpha) then exits
        .to(quoteMuted, { opacity: 1 }, 0)
        .to(quote, { y: -110, autoAlpha: 0 }, 0.15)
        // Meta / badges — drift only, keep full opacity on mobile & desktop
        .to(meta, { y: -80 }, 0.05)
        .to(badges, { y: -60, stagger: 0.03 }, 0.08);

      // Badge hover micro-interaction
      const cleanups: Array<() => void> = [];
      badges.forEach((badge) => {
        const enter = () =>
          gsap.to(badge, {
            y: -3,
            scale: 1.04,
            duration: 0.25,
            ease: "power2.out",
            overwrite: "auto",
          });
        const leave = () =>
          gsap.to(badge, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        badge.addEventListener("mouseenter", enter);
        badge.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          badge.removeEventListener("mouseenter", enter);
          badge.removeEventListener("mouseleave", leave);
        });
      });

      return () => cleanups.forEach((fn) => fn());
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 isolate min-h-svh overflow-hidden bg-black"
    >
      <div
        data-hero="video"
        className="absolute inset-0 z-0 will-change-transform"
      >
        <HeroVideo src={data.video} />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-2 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.55)_100%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-svh max-w-375 flex-col justify-between gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="grid gap-6 lg:min-h-86.25 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div data-hero="title" className="max-w-xl will-change-transform">
            <h1 className="font-sans text-[clamp(60px,10vw,160px)] font-bold leading-[0.92] tracking-tight text-white">
              {data.title}
            </h1>
            <p className="mt-1 font-sans text-[clamp(30px,5vw,50px)] font-bold leading-none tracking-tight text-white">
              {data.titleAccent}
            </p>
          </div>

          <div
            data-hero="intro"
            className="flex max-w-md flex-col items-center gap-7 self-end will-change-transform lg:ml-auto lg:items-start lg:pt-3"
          >
            <p className="text-center text-[15px] leading-relaxed text-white/70 lg:text-left lg:text-[20px]">
              {data.description}
            </p>
            <a
              href={data.cta.href}
              className="inline-flex w-fit items-center justify-center rounded-lg border border-white/25 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-white/15"
            >
              {data.cta.label}
            </a>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-16">
          <p
            data-hero="quote"
            className="hidden max-w-125 text-[36px] font-medium leading-snug tracking-tight text-white will-change-[transform,opacity] lg:block"
          >
            <span>“{data.quote.highlight} </span>
            <span data-hero="quote-muted" className="will-change-opacity">
              {data.quote.muted}”
            </span>
          </p>

          <div
            data-hero="meta"
            className="flex flex-col gap-5 will-change-transform lg:items-end lg:text-right"
          >
            <span className="text-xs tracking-wide text-white/45 sm:text-sm">
              {data.meta}
            </span>
            <div className="flex max-w-md flex-wrap gap-2.5 lg:justify-end">
              {data.badges.map((badge) => (
                <span
                  key={badge.label}
                  data-hero="badge"
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium sm:text-[13px] ${
                    badge.accent
                      ? "border-[#28abe2]/80 text-[#5ec8ee]"
                      : "border-white/25 text-white/65"
                  }`}
                >
                  {badge.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
