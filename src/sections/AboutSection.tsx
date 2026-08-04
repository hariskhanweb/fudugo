"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "@/data/about.json";
import { Container } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Pin only from tablet up — full 2× scroll feels stuck on phones
      mm.add("(min-width: 768px)", () => {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=200%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={data.id}
      className="relative z-20 overflow-hidden bg-header"
    >
      {/* Fills the screen while pinned; 80px padding keeps content in the box */}
      <div className="flex min-h-svh items-center pt-22">
        <Container className="w-full px-5 py-20 sm:px-8 lg:px-10">
          <div className="grid items-start gap-6 sm:gap-8 lg:grid-cols-[minmax(0,0.28fr)_minmax(0,0.72fr)] lg:gap-12 xl:gap-16">
            <p className="font-sans text-sm font-normal text-accent-soft sm:text-[15px] lg:pt-2">
              {data.eyebrow}
            </p>

            <h2 className="max-w-4xl font-sans text-[clamp(28px,4.5vw,52px)] font-bold leading-[1.28] tracking-tight text-foreground/90">
              &ldquo;{data.quote}&rdquo;
            </h2>
          </div>
        </Container>
      </div>
    </section>
  );
}
