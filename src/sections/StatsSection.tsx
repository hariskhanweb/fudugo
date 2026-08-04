"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "@/data/stats.json";
import type { StatItem } from "@/types";
import { Container, StatCard } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(data.items.map((item) => [item.id, 0])),
  );
  const hasCounted = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const title = section.querySelector("[data-stats='title']");
      const eyebrow = section.querySelector("[data-stats='eyebrow']");
      const description = section.querySelector("[data-stats='description']");
      const meta = section.querySelector("[data-stats='meta']");
      const cards = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-stats='card']"),
      );
      const media = section.querySelector<HTMLElement>("[data-stats='media']");
      const parallax = section.querySelector<HTMLElement>(
        "[data-stats='parallax']",
      );

      if (!reduceMotion) {
        const headerTl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            toggleActions: "play none none none",
          },
        });

        if (title) {
          headerTl.from(title, { y: 44, opacity: 0, duration: 0.85 }, 0);
        }
        if (eyebrow) {
          headerTl.from(eyebrow, { y: 18, opacity: 0, duration: 0.6 }, 0.12);
        }
        if (description) {
          headerTl.from(description, { y: 24, opacity: 0, duration: 0.7 }, 0.18);
        }
        if (meta) {
          headerTl.from(meta, { y: 20, opacity: 0, duration: 0.65 }, 0.26);
        }

        cards.forEach((card, index) => {
          gsap.from(card, {
            y: 48,
            opacity: 0,
            scale: 0.98,
            duration: 0.8,
            delay: (index % 2) * 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              toggleActions: "play none none none",
            },
          });
        });

        if (media) {
          gsap.from(media, {
            y: 56,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: media,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          });
        }

        // Horizontal image parallax (x) while scrolling
        if (parallax && media) {
          gsap.fromTo(
            parallax,
            { xPercent: 0 },
            {
              // 145% wide → shift by leftover ~31% of its own width
              xPercent: -31,
              ease: "none",
              force3D: true,
              scrollTrigger: {
                trigger: media,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            },
          );
        }
      }

      ScrollTrigger.create({
        trigger: section,
        start: "top 70%",
        once: true,
        onEnter: () => {
          if (hasCounted.current) return;
          hasCounted.current = true;

          if (reduceMotion) {
            setValues(
              Object.fromEntries(
                data.items.map((item) => [item.id, item.value]),
              ),
            );
            return;
          }

          data.items.forEach((item, index) => {
            const proxy = { value: 0 };
            gsap.to(proxy, {
              value: item.value,
              duration: 1.7,
              delay: index * 0.08,
              ease: "power2.out",
              onUpdate: () => {
                setValues((prev) => ({
                  ...prev,
                  [item.id]: proxy.value,
                }));
              },
            });
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-background py-20 sm:py-24 lg:py-28"
    >
      <Container className="px-5 sm:px-8 lg:px-10">
        <div className="mb-12 flex flex-col gap-8 lg:mb-16 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="flex w-full max-w-3xl flex-col items-start gap-2 sm:flex-row sm:gap-x-4 sm:gap-y-0">
            <h2
              data-stats="title"
              className="min-w-0 font-sans text-[clamp(36px,8vw,72px)] font-bold leading-[0.95] tracking-tight text-foreground"
            >
              {data.title}
            </h2>
            <span
              data-stats="eyebrow"
              className="max-w-full font-sans text-sm font-normal text-accent-soft sm:max-w-44 sm:shrink-0 sm:pt-1.5 sm:text-[15px] lg:pt-2"
            >
              {data.eyebrow}
            </span>
          </div>

          <p
            data-stats="description"
            className="max-w-sm font-sans text-sm leading-relaxed text-muted lg:max-w-xs lg:pt-2"
          >
            {data.description}
          </p>

          <div
            data-stats="meta"
            className="space-y-1 font-sans text-sm lg:pt-2 lg:text-right"
          >
            <p className="text-muted">{data.meta.verified}</p>
            <p className="text-accent-soft">{data.meta.studio}</p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2 lg:gap-5 xl:gap-6">
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            {(data.items as StatItem[]).map((item) => {
              const raw = values[item.id] ?? 0;
              const display = item.decimals
                ? `${raw.toFixed(item.decimals)}${item.suffix}`
                : `${Math.floor(raw)}${item.suffix}`;

              return (
                <div key={item.id} data-stats="card">
                  <StatCard item={item} displayValue={display} />
                </div>
              );
            })}
          </div>

          <div
            data-stats="media"
            className="relative min-h-72 overflow-hidden rounded-2xl bg-surface sm:min-h-96 lg:min-h-full"
          >
            <div
              data-stats="parallax"
              className="absolute inset-y-0 left-0 h-full w-[145%] will-change-transform"
            >
              <Image
                src={data.image.src}
                alt={data.image.alt}
                fill
                sizes="(max-width: 1024px) 140vw, 70vw"
                className="object-cover"
                priority={false}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
