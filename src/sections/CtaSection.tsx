"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "@/data/cta.json";
import { Container } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

const PERK_ICONS = [
  // clock
  "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z",
  // lock
  "M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z",
  // calendar
  "M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z",
] as const;

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const parallax = section.querySelector<HTMLElement>(
        "[data-cta='parallax']",
      );
      const title = section.querySelector("[data-cta='title']");
      const content = section.querySelector("[data-cta='content']");
      const perks = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-cta='perk']"),
      );

      if (!reduceMotion) {
        const introTl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        });

        if (title) {
          introTl.from(title, { x: -36, opacity: 0, duration: 0.9 }, 0);
        }
        if (content) {
          introTl.from(content, { x: 36, opacity: 0, duration: 0.85 }, 0.12);
        }
        if (perks.length) {
          introTl.from(
            perks,
            { y: 20, opacity: 0, duration: 0.55, stagger: 0.08 },
            0.28,
          );
        }

        // Scale up then down on scroll (no translate parallax)
        if (parallax) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            })
            .fromTo(
              parallax,
              { scale: 1.06 },
              { scale: 1.28, ease: "none", force3D: true, duration: 1 },
            )
            .to(parallax, {
              scale: 1.08,
              ease: "none",
              force3D: true,
              duration: 1,
            });
        }
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={data.id}
      className="relative isolate min-h-[70vh] overflow-hidden sm:min-h-[75vh] lg:min-h-[80vh]"
    >
      {/* Tall layer so translateY/scale parallax has room to move */}
      <div
        data-cta="parallax"
        className="pointer-events-none absolute inset-0 will-change-transform"
      >
        <Image
          src={data.image}
          alt="Moody parking garage with dramatic backlight"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority={false}
        />
      </div>

      {/* Page-color seams so the block blends into light/dark background */}
      <div
        data-cta="seam-top"
        className="pointer-events-none absolute inset-x-0 top-0 z-2 h-20 sm:h-28"
        style={{
          background:
            "linear-gradient(to bottom, var(--background) 0%, transparent 100%)",
        }}
      />
      <div
        data-cta="seam-bottom"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-2 h-20 sm:h-28"
        style={{
          background:
            "linear-gradient(to top, var(--background) 0%, transparent 100%)",
        }}
      />

      {/* Dark readability overlays — keep CTA type white in both themes */}
      <div
        data-cta="gradient-top"
        className="pointer-events-none absolute inset-x-0 top-0 z-1 h-[42%] sm:h-[45%]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(11,12,18,0.88) 0%, rgba(11,12,18,0.55) 40%, transparent 100%)",
        }}
      />
      <div
        data-cta="gradient-bottom"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-1 h-[42%] sm:h-[45%]"
        style={{
          background:
            "linear-gradient(to top, rgba(11,12,18,0.9) 0%, rgba(11,12,18,0.5) 45%, transparent 100%)",
        }}
      />
      <div
        data-cta="gradient-sides"
        className="pointer-events-none absolute inset-0 z-1"
        style={{
          background:
            "linear-gradient(to right, rgba(11,12,18,0.4) 0%, transparent 28%, transparent 72%, rgba(11,12,18,0.35) 100%)",
        }}
      />

      <div className="relative z-10 flex min-h-[70vh] flex-col justify-center py-24 sm:min-h-[75vh] sm:py-28 lg:min-h-[80vh] lg:py-32">
        <Container className="px-5 sm:px-8 lg:px-10">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] lg:gap-12">
            <div data-cta="title" className="max-w-xl">
              <div className="border-l-2 border-accent pl-5 sm:pl-6">
                <h2 className="font-sans text-[clamp(48px,8vw,88px)] font-bold leading-[0.92] tracking-tight text-white">
                  {(data.headlineLines ?? ["Ready To", "Start?"]).map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h2>
              </div>
            </div>

            <div
              data-cta="content"
              className="max-w-xs space-y-5 lg:justify-self-end"
            >
              <p className="font-sans text-xl font-semibold leading-snug text-white sm:text-2xl">
                {data.title}
              </p>
              <a
                href={data.cta.href}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 bg-black/40 px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:border-white/40 hover:bg-black/60"
              >
                {data.cta.label}
              </a>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-4 sm:mt-20 sm:gap-x-10 lg:mt-24">
            {data.perks.map((perk, index) => (
              <span
                key={perk}
                data-cta="perk"
                className="flex items-center gap-2.5 font-sans text-[12px] text-white/55 sm:text-[13px]"
              >
                <svg
                  viewBox={index === 0 ? "0 0 512 512" : "0 0 448 512"}
                  className="h-3.5 w-3.5 shrink-0 fill-accent-soft"
                  aria-hidden
                >
                  <path d={PERK_ICONS[index] ?? PERK_ICONS[0]} />
                </svg>
                {perk}
              </span>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
