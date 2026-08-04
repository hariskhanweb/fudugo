"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "@/data/process.json";
import type { ProcessStep as ProcessStepType } from "@/types";
import { Container, ProcessStep } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const steps = data.steps as ProcessStepType[];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const title = section.querySelector("[data-process='title']");
      const eyebrow = section.querySelector("[data-process='eyebrow']");
      const grid = section.querySelector("[data-process='grid']");
      const cards = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-process='card']"),
      );
      const media = section.querySelector<HTMLElement>("[data-process='media']");
      const parallax = section.querySelector<HTMLElement>(
        "[data-process='parallax']",
      );
      const playWrap = section.querySelector<HTMLElement>(
        "[data-process='play-wrap']",
      );

      const headerTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          toggleActions: "play none none none",
        },
      });

      if (title) {
        headerTl.from(title, { y: 44, opacity: 0, duration: 0.9 }, 0);
      }
      if (eyebrow) {
        headerTl.from(eyebrow, { y: 18, opacity: 0, duration: 0.6 }, 0.14);
      }

      if (grid && cards.length) {
        const cardsTl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: grid,
            start: "top 86%",
            toggleActions: "play none none none",
          },
        });

        cards.forEach((card, index) => {
          cardsTl.from(
            card,
            {
              y: 56,
              opacity: 0,
              scale: 0.98,
              duration: 0.85,
            },
            index * 0.11,
          );

          const parts = card.querySelectorAll("[data-process='part']");
          if (parts.length) {
            cardsTl.from(
              parts,
              { y: 18, opacity: 0, duration: 0.55, stagger: 0.05 },
              index * 0.11 + 0.08,
            );
          }
        });
      }

      // Cards 1 & 3 only: scrub y on desktop 4-col row. Skip on stacked layouts.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        cards.forEach((card, index) => {
          if (index % 2 !== 0) return;

          const drift = card.querySelector<HTMLElement>(
            "[data-process='drift']",
          );
          if (!drift) return;

          gsap.fromTo(
            drift,
            { y: 0 },
            {
              y: -100,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            },
          );
        });
      });
      cleanups.push(() => mm.revert());

      if (media) {
        gsap.from(media, {
          y: 80,
          opacity: 0,
          scale: 0.97,
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: media,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        });
      }

      if (parallax && media) {
        gsap.fromTo(
          parallax,
          { yPercent: -10, scale: 1.16 },
          {
            yPercent: 10,
            scale: 1.16,
            ease: "none",
            scrollTrigger: {
              trigger: media,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.1,
            },
          },
        );
      }

      if (playWrap) {
        gsap.set(playWrap, { xPercent: -50, yPercent: -50 });

        gsap.from(playWrap, {
          scale: 0.55,
          opacity: 0,
          duration: 0.85,
          ease: "back.out(1.9)",
          scrollTrigger: {
            trigger: media ?? section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      if (playWrap && media) {
        const xTo = gsap.quickTo(playWrap, "x", {
          duration: 1.15,
          ease: "power3.out",
        });
        const yTo = gsap.quickTo(playWrap, "y", {
          duration: 1.15,
          ease: "power3.out",
        });

        const onMove = (event: MouseEvent) => {
          const rect = media.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;

          // Opposite to cursor, slow and subtle (Motex mouse-track style)
          xTo(x * -20);
          yTo(y * -20);
        };

        const onLeave = () => {
          xTo(0);
          yTo(0);
        };

        media.addEventListener("mousemove", onMove);
        media.addEventListener("mouseleave", onLeave);

        cleanups.push(() => {
          media.removeEventListener("mousemove", onMove);
          media.removeEventListener("mouseleave", onLeave);
        });
      }
    }, section);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={data.id}
      className="overflow-x-clip bg-background py-20 sm:py-24 lg:py-28"
    >
      <Container className="px-5 sm:px-8 lg:px-10">
        <div className="mb-12 flex justify-center sm:mb-16 lg:mb-20">
          <div className="relative inline-flex flex-col items-start gap-2 sm:items-center sm:gap-x-4">
            <span
              data-process="eyebrow"
              className="max-w-40 font-sans text-sm font-normal leading-snug text-accent-soft sm:pt-2 sm:text-[15px]"
            >
              {data.eyebrow}
            </span>
            <h2
              data-process="title"
              className="font-sans text-[clamp(40px,7vw,72px)] font-bold leading-none tracking-tight text-foreground"
            >
              {data.title}
            </h2>
          </div>
        </div>

        <div
          data-process="grid"
          className="grid items-start gap-1 pb-1 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step) => (
            <div key={step.step} data-process="card" className="h-full">
              <div data-process="drift" className="h-full will-change-transform">
                <ProcessStep step={step} />
              </div>
            </div>
          ))}
        </div>

        <a
          href={data.media.href}
          data-process="media"
          className="group relative block min-h-60 overflow-hidden rounded-2xl bg-surface sm:min-h-72 lg:min-h-150"
          aria-label="Play process film"
        >
          <div
            data-process="parallax"
            className="absolute inset-[-16%] will-change-transform"
          >
            <Image
              src={data.media.image}
              alt={data.media.alt}
              fill
              sizes="100vw"
              className="object-cover grayscale transition-[filter] duration-700 group-hover:grayscale-0"
            />
          </div>
          <div className="absolute inset-0 bg-black/35 transition-colors duration-300 group-hover:bg-black/25" />
          <span
            data-process="play-wrap"
            className="absolute left-1/2 top-1/2 z-10 block w-18 will-change-transform sm:w-28 lg:w-36"
          >
            <span
              data-process="play"
              className="block transition-transform duration-300 group-hover:scale-110"
            >
              <Image
                src={data.media.playIcon}
                alt=""
                width={180}
                height={200}
                className="h-auto w-full drop-shadow-[0_8px_32px_rgba(40,171,226,0.35)]"
              />
            </span>
          </span>
        </a>
      </Container>
    </section>
  );
}
