"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "@/data/testimonials.json";
import type { TestimonialColumn } from "@/types";
import {
  Container,
  StarRating,
  TestimonialProfileCard,
  TestimonialQuoteCard,
} from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const columns = data.columns as TestimonialColumn[];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const eyebrow = section.querySelector("[data-testimonials='eyebrow']");
      const title = section.querySelector("[data-testimonials='title']");
      const cards = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-testimonials='card']"),
      );
      const summary = section.querySelector("[data-testimonials='summary']");

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
        headerTl.from(title, { y: 48, opacity: 0, duration: 0.9 }, 0.1);
      }

      if (cards.length) {
        gsap.from(cards, {
          y: 56,
          opacity: 0,
          duration: 0.85,
          stagger: {
            each: 0.1,
            from: "start",
          },
          ease: "power3.out",
          scrollTrigger: {
            trigger: section.querySelector("[data-testimonials='cards-grid']") ?? section,
            start: "top 84%",
            toggleActions: "play none none none",
          },
        });
      }

      cards.forEach((card, index) => {
        if (index === 1) return;

        const direction = index % 2 === 0 ? -1 : 1;
        gsap.fromTo(
          card,
          { y: 0 },
          {
            y: direction * 18,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.4,
            },
          },
        );
      });

      if (summary) {
        gsap.from(summary.querySelectorAll("[data-testimonials='summary-card']"), {
          y: 32,
          opacity: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: summary,
            start: "top 88%",
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
      className="overflow-x-clip bg-background py-20 sm:py-24 lg:py-28"
    >
      <Container className="px-5 sm:px-8 lg:px-10">
        <div className="mb-12 flex flex-col gap-4 sm:mb-14 lg:mb-16 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <span
            data-testimonials="eyebrow"
            className="shrink-0 font-sans text-sm font-normal text-accent-soft sm:text-[15px] lg:pt-2"
          >
            {data.eyebrow}
          </span>
          <h2
            data-testimonials="title"
            className="max-w-4xl font-sans text-[clamp(36px,6.5vw,72px)] font-bold leading-[0.95] tracking-tight text-foreground lg:text-right"
          >
            {data.title}
          </h2>
        </div>

        <div data-testimonials="cards-grid" className="grid gap-1 lg:grid-cols-3">
          {columns.map((column) => (
            <div
              key={column.profile.name}
              className="flex flex-col gap-1" data-testimonials="card"
            >
              {column.order.map((kind) =>
                kind === "profile" ? (
                  <div key={`${column.profile.name}-profile`}>
                    <TestimonialProfileCard profile={column.profile} />
                  </div>
                ) : (
                  <div
                    key={`${column.quote.company}-quote`}
                    className="flex-1"
                  >
                    <TestimonialQuoteCard quote={column.quote} />
                  </div>
                ),
              )}
            </div>
          ))}
        </div>

        <div
          data-testimonials="summary"
          className="mt-1 grid gap-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)]"
        >
          <article
            data-testimonials="summary-card"
            className="flex flex-wrap items-center gap-4 rounded-2xl surface-card px-5 py-5 sm:gap-5 sm:px-6 sm:py-6"
          >
            <p className="font-sans text-[clamp(40px,5vw,56px)] font-bold leading-none tracking-tight text-foreground">
              {data.summary.rating}
              <span className="text-lg font-bold text-muted sm:text-xl">
                {" "}
                /{data.summary.ratingMax}
              </span>
            </p>
            <div className="space-y-2">
              <StarRating rating={data.summary.stars} className="gap-1" />
              <p className="max-w-44 font-sans text-xs leading-snug text-muted sm:text-sm">
                {data.summary.ratingLabel}
              </p>
            </div>
          </article>

          <article
            data-testimonials="summary-card"
            className="flex flex-col gap-5 rounded-2xl surface-card px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:py-5 lg:px-7"
          >
            <div className="flex flex-wrap items-center gap-4 sm:gap-5">
              <div className="flex items-center">
                {data.summary.avatars.map((avatar, index) => (
                  <div
                    key={avatar}
                    className="relative h-11 w-11 overflow-hidden rounded-xl border-2 border-background sm:h-12 sm:w-12"
                    style={{
                      marginLeft: index === 0 ? 0 : -8,
                      zIndex: index + 1,
                    }}
                  >
                    <Image
                      src={avatar}
                      alt=""
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                ))}
                <div
                  className="relative z-10 flex h-11 w-11 items-center justify-center rounded-xl bg-accent-alt sm:h-12 sm:w-12"
                  style={{ marginLeft: -8 }}
                >
                  <span className="font-sans text-xs font-semibold text-white sm:text-sm">
                    {data.summary.clientsCount}
                  </span>
                </div>
              </div>
              <p className="max-w-36 font-sans text-sm leading-snug text-muted">
                <span className="block">Trusted by Client</span>
                <span className="block">World Wide</span>
              </p>
            </div>

            <a
              href={data.summary.cta.href}
              className="inline-flex w-full shrink-0 items-center justify-center rounded-full border border-border bg-transparent px-7 py-3.5 font-sans text-sm font-medium text-foreground transition-colors duration-300 hover:border-border-hover hover:bg-foreground/5 sm:w-auto lg:min-w-44"
            >
              {data.summary.cta.label}
            </a>
          </article>
        </div>
      </Container>
    </section>
  );
}
