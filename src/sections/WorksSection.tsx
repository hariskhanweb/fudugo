"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "@/data/works.json";
import type { Project } from "@/types";
import { Container, ProjectCard } from "@/components/ui";

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

export default function WorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const projects = data.projects as Project[];
  const left = projects.filter((_, index) => index % 2 === 0);
  const right = projects.filter((_, index) => index % 2 === 1);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const heading = section.querySelectorAll("[data-works='heading']");
      const cards = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-works='card']"),
      );
      const cta = section.querySelector("[data-works='cta']");

      gsap.from(heading, {
        y: 36,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      cards.forEach((card, index) => {
        gsap.from(card, {
          y: 64,
          opacity: 0,
          scale: 0.97,
          duration: 1,
          delay: (index % 2) * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });

      if (cta) {
        gsap.from(cta, {
          y: 24,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cta,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={data.id}
      className="bg-header pb-20 sm:pb-24 lg:pb-28 pt-20 sm:pt-24 lg:pt-28"
    >
      <Container className="px-5 sm:px-8 lg:px-10">
        <div className="mb-12 flex flex-col gap-6 sm:mb-16 lg:mb-20 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <div
            data-works="heading"
            className="flex flex-wrap items-baseline gap-x-3 gap-y-2 sm:gap-x-4"
          >
            <h2 className="font-sans text-[clamp(40px,7vw,72px)] font-bold leading-none tracking-tight text-foreground">
              {data.title}
            </h2>
            <span className="font-sans text-sm font-normal text-accent-soft sm:text-[15px]">
              {data.eyebrow}
            </span>
          </div>

          <p
            data-works="heading"
            className="max-w-md font-sans text-sm leading-relaxed text-muted lg:max-w-xs lg:pt-3 xl:max-w-sm"
          >
            {data.description}
          </p>
        </div>

        <div className="grid gap-2 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            {left.map((project) => (
              <div key={project.id} data-works="card">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            {right.map((project) => (
              <div key={project.id} data-works="card">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>

        <div data-works="cta" className="mt-12 flex justify-center sm:mt-16">
          <a
            href={data.cta.href}
            className="inline-flex items-center gap-2.5 rounded-lg border border-border bg-surface px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-border-hover hover:bg-surface-hover"
          >
            <ChevronCircleIcon className="h-5 w-5 text-muted" />
            {data.cta.label}
          </a>
        </div>
      </Container>
    </section>
  );
}
