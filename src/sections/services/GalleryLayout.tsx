"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import type { ServicePageContent } from "@/types";
import { Container } from "@/components/ui";
import { useGsapContext } from "@/lib/use-gsap-context";

/** Asymmetric gallery collage + typographic capability list */
export default function GalleryLayout({ service }: { service: ServicePageContent }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapContext(
    sectionRef,
    (section) => {
      const tiles = section.querySelectorAll("[data-gallery='tile']");
      const items = section.querySelectorAll("[data-gallery='item']");
      const collage = section.querySelector("[data-gallery='collage']");
      const list = section.querySelector("[data-gallery='list']");

      if (tiles.length) {
        gsap.fromTo(
          tiles,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            overwrite: "auto",
            scrollTrigger: {
              trigger: collage ?? section,
              start: "top 86%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      if (items.length) {
        gsap.fromTo(
          items,
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out",
            overwrite: "auto",
            scrollTrigger: {
              trigger: list ?? section,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    },
    [service.slug],
  );

  const tiles = [
    { src: service.heroImage, className: "sm:col-span-2 sm:row-span-2 min-h-64 sm:min-h-0" },
    { src: "/Image-17.jpg", className: "min-h-40" },
    { src: "/Image-18.jpg", className: "min-h-40" },
    { src: "/Image-19.jpg", className: "sm:col-span-2 min-h-44" },
  ];

  return (
    <section ref={sectionRef} className="bg-header py-16 sm:py-20 lg:py-24">
      <Container className="px-5 sm:px-8 lg:px-10">
        <div className="mb-10 max-w-2xl sm:mb-12">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-accent-alt">
            Visual systems
          </p>
          <h2 className="mt-3 font-sans text-[clamp(28px,4vw,44px)] font-bold leading-tight text-foreground">
            Brand worlds that look intentional on every surface.
          </h2>
        </div>

        <div
          data-gallery="collage"
          className="grid gap-3 sm:grid-cols-3 sm:grid-rows-3 sm:gap-4 lg:h-135"
        >
          {tiles.map((tile, index) => (
            <div
              key={`${tile.src}-${index}`}
              data-gallery="tile"
              className={`relative overflow-hidden rounded-2xl ${tile.className}`}
            >
              <Image
                src={tile.src}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          ))}
        </div>

        <div
          data-gallery="list"
          className="mt-14 grid gap-8 border-t border-border/60 pt-12 lg:grid-cols-[1fr_1.2fr]"
        >
          <div>
            <h3 className="font-sans text-xl font-bold text-foreground">Capabilities</h3>
            <ul className="mt-6 space-y-4">
              {service.outcomes.map((item) => (
                <li
                  key={item}
                  data-gallery="item"
                  className="border-l-2 border-accent-alt/50 pl-4 font-sans text-sm text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {service.capabilities.map((cap) => (
              <article key={cap.title} data-gallery="item">
                <h4 className="font-sans text-base font-bold text-foreground">{cap.title}</h4>
                <p className="mt-2 font-sans text-sm leading-relaxed text-muted">
                  {cap.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          {service.process.map((step) => (
            <div
              key={step.step}
              data-gallery="item"
              className="min-w-40 flex-1 rounded-full border border-border/60 px-5 py-3"
            >
              <span className="font-sans text-[11px] font-semibold text-accent-alt">
                {step.step} · {step.title}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
