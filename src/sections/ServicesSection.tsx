"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "@/data/services.json";
import { Container, ServiceAccordion } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const eyebrow = section.querySelector("[data-services='eyebrow']");
      const title = section.querySelector("[data-services='title']");
      const description = section.querySelector(
        "[data-services='description']",
      );
      const items = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-services='item']"),
      );
      const parallaxLayers = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-services='parallax']"),
      );

      // Header: eyebrow → title → description
      const headerTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          toggleActions: "play none none none",
        },
      });

      if (eyebrow) {
        headerTl.from(eyebrow, { y: 20, opacity: 0, duration: 0.55 }, 0);
      }
      if (title) {
        headerTl.from(title, { y: 48, opacity: 0, duration: 0.9 }, 0.08);
      }
      if (description) {
        headerTl.from(
          description,
          { y: 28, opacity: 0, duration: 0.75 },
          0.22,
        );
      }

      // Each row reveals as it enters
      items.forEach((item) => {
        gsap.from(item, {
          y: 56,
          opacity: 0,
          scale: 0.985,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });

      // Horizontal scroll drift on separate transform layer
      parallaxLayers.forEach((layer, index) => {
        const isDriftLeft = index === 1;
        const isDriftRight = index === 3;

        if (isDriftLeft || isDriftRight) {
          gsap.fromTo(
            layer,
            { x: isDriftLeft ? 72 : -72 },
            {
              x: isDriftLeft ? -80 : 80,
              ease: "none",
              scrollTrigger: {
                trigger: layer,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.4,
              },
            },
          );
          return;
        }

        gsap.fromTo(
          layer,
          { x: index === 0 ? -24 : 24 },
          {
            x: index === 0 ? 16 : -16,
            ease: "none",
            scrollTrigger: {
              trigger: layer,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.6,
            },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={data.id}
      className="overflow-x-clip bg-background py-20 sm:py-24 lg:py-28"
    >
      <Container className="px-5 sm:px-8 lg:px-10">
        <div className="mb-12 flex flex-col gap-8 sm:mb-16 lg:mb-20 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="space-y-3 sm:space-y-4">
            <p
              data-services="eyebrow"
              className="font-sans text-sm font-normal text-accent-alt sm:text-[15px]"
            >
              {data.eyebrow}
            </p>
            <h2
              data-services="title"
              className="font-sans text-[clamp(40px,7vw,72px)] font-bold leading-none tracking-tight text-white"
            >
              {data.title}
            </h2>
          </div>

          <p
            data-services="description"
            className="max-w-md font-sans text-sm leading-relaxed text-muted lg:max-w-xs lg:pb-2 xl:max-w-sm"
          >
            {data.description}
          </p>
        </div>

        <ServiceAccordion items={data.items} />
      </Container>
    </section>
  );
}
