"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "@/data/clients.json";
import { Container } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

function ChevronCircleIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 512 512"
      aria-hidden
      fill="currentColor"
    >
      <path d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm113.9 231L234.4 103.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L285.1 256 183.5 357.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L369.9 273c9.4-9.4 9.4-24.6 0-34z" />
    </svg>
  );
}

function LogoCard({
  name,
  src,
  alt,
}: {
  name: string;
  src: string;
  alt: string;
}) {
  return (
    <div className="group flex h-20 w-40 shrink-0 items-center justify-center rounded-2xl border border-border bg-panel px-5 transition-colors duration-300 hover:bg-surface-hover sm:h-24 sm:w-50">
      <Image
        src={src}
        alt={alt}
        width={160}
        height={40}
        className="h-7 w-auto max-w-full object-contain opacity-60 transition-all duration-300 group-hover:opacity-100 sm:h-8 client-logo"
      />
      <span className="sr-only">{name}</span>
    </div>
  );
}

export default function ClientsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  // Two identical halves so translateX(-50%) loops seamlessly;
  // extra copies keep the track wider than large viewports.
  const half = [...data.logos, ...data.logos];
  const track = [...half, ...half];

  useEffect(() => {
    const section = sectionRef.current;
    const parallax = parallaxRef.current;
    if (!section || !parallax) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      // Subtle parallax while the section scrolls through the viewport
      gsap.fromTo(
        parallax,
        { yPercent: 10, scale: 1.04 },
        {
          yPercent: -8,
          scale: 0.98,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-header"
    >
      <div
        ref={parallaxRef}
        className="origin-center py-16 will-change-transform sm:py-20"
      >
        <Container>
          <div className="mb-10 flex items-center justify-center gap-2.5">
            <span className="inline-flex text-accent-alt" aria-hidden>
              <ChevronCircleIcon className="h-5 w-5" />
            </span>
            <p className="text-sm font-normal text-muted sm:text-[15px]">
              {data.label}
            </p>
          </div>
        </Container>

        <div className="clients-marquee-mask relative w-full overflow-hidden">
          <div className="clients-marquee flex w-max gap-3 sm:gap-4">
            {track.map((logo, index) => (
              <LogoCard
                key={`${logo.name}-${index}`}
                name={logo.name}
                src={logo.src}
                alt={logo.alt}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
