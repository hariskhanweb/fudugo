"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import contactData from "@/data/contact.json";
import { AccentMark, Container } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

function IndiaFlag() {
  return (
    <div className="inline-flex h-8 w-12 items-center justify-center overflow-hidden rounded-md border border-border/80 shadow-xs transition-transform duration-300 group-hover:scale-105">
      <svg className="h-full w-full" viewBox="0 0 36 24" aria-label="India Flag">
        <rect width="36" height="8" fill="#FF9933" />
        <rect y="8" width="36" height="8" fill="#FFFFFF" />
        <rect y="16" width="36" height="8" fill="#138808" />
        <circle cx="18" cy="12" r="3.2" fill="none" stroke="#000080" strokeWidth="0.8" />
        <circle cx="18" cy="12" r="0.8" fill="#000080" />
      </svg>
    </div>
  );
}

function USFlag() {
  return (
    <div className="inline-flex h-8 w-12 items-center justify-center overflow-hidden rounded-md border border-border/80 shadow-xs transition-transform duration-300 group-hover:scale-105">
      <svg className="h-full w-full" viewBox="0 0 36 24" aria-label="USA Flag">
        <rect width="36" height="24" fill="#B22234" />
        <rect y="1.846" width="36" height="1.846" fill="#FFFFFF" />
        <rect y="5.538" width="36" height="1.846" fill="#FFFFFF" />
        <rect y="9.23" width="36" height="1.846" fill="#FFFFFF" />
        <rect y="12.923" width="36" height="1.846" fill="#FFFFFF" />
        <rect y="16.615" width="36" height="1.846" fill="#FFFFFF" />
        <rect y="20.307" width="36" height="1.846" fill="#FFFFFF" />
        <rect width="14.4" height="12.923" fill="#3C3B6E" />
        <circle cx="3.6" cy="3.2" r="0.7" fill="#FFFFFF" />
        <circle cx="7.2" cy="3.2" r="0.7" fill="#FFFFFF" />
        <circle cx="10.8" cy="3.2" r="0.7" fill="#FFFFFF" />
        <circle cx="5.4" cy="6.4" r="0.7" fill="#FFFFFF" />
        <circle cx="9.0" cy="6.4" r="0.7" fill="#FFFFFF" />
        <circle cx="3.6" cy="9.6" r="0.7" fill="#FFFFFF" />
        <circle cx="7.2" cy="9.6" r="0.7" fill="#FFFFFF" />
        <circle cx="10.8" cy="9.6" r="0.7" fill="#FFFFFF" />
      </svg>
    </div>
  );
}

function PhoneIcon() {
  return (
    <div className="inline-flex h-8 w-12 items-center justify-center">
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent-alt/10 text-accent-alt shadow-xs transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent-alt group-hover:text-white">
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z" />
        </svg>
      </div>
    </div>
  );
}

function HoursIcon() {
  return (
    <div className="inline-flex h-8 w-12 items-center justify-center">
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent-alt/10 text-accent-alt shadow-xs transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent-alt group-hover:text-white">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      </div>
    </div>
  );
}

export default function FindUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { findUs } = contactData;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const header = section.querySelector("[data-findus='header']");
      const cards = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-findus='card']"),
      );

      if (header) {
        gsap.from(header, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          clearProps: "all",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      if (cards.length) {
        gsap.from(cards, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.08,
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
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
      className="relative overflow-hidden bg-header py-20 sm:py-24 lg:py-28"
    >
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-3xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-alt/5 blur-[120px]"
        aria-hidden
      />

      <Container className="relative px-5 sm:px-8 lg:px-12">
        <div
          data-findus="header"
          className="mb-12 max-w-2xl sm:mb-14 lg:mb-16"
        >
          <AccentMark className="mb-4 origin-left" />
          <p className="font-sans text-sm font-semibold tracking-wider text-accent-alt uppercase">
            {findUs.eyebrow}
          </p>
          <h2 className="mt-3 font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {findUs.title}
          </h2>
          {findUs.description ? (
            <p className="mt-4 font-sans text-base leading-relaxed text-muted">
              {findUs.description}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {findUs.cards.map((card) => (
            <div
              key={card.title}
              data-findus="card"
              className="group relative flex h-full w-full flex-col items-center justify-start rounded-3xl border border-border/80 bg-surface/70 p-7 text-center shadow-(--card-shadow) backdrop-blur-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-alt/40 hover:bg-surface hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] sm:p-8"
            >
              <div className="mb-6 flex h-8 w-full items-center justify-center">
                {card.type === "india" && <IndiaFlag />}
                {card.type === "us" && <USFlag />}
                {card.type === "phone" && <PhoneIcon />}
                {card.type === "hours" && <HoursIcon />}
              </div>

              <h3 className="mb-3 font-sans text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                {card.title}
              </h3>

              {"company" in card && card.company ? (
                <p className="mb-1 font-sans text-sm font-semibold text-foreground sm:text-[15px]">
                  {card.company}
                </p>
              ) : null}

              {"lines" in card && card.lines ? (
                <div className="space-y-1 font-sans text-sm leading-relaxed text-muted sm:text-[15px]">
                  {card.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              ) : null}

              {"phones" in card && card.phones ? (
                <div className="space-y-1.5 pt-0.5 font-sans text-sm leading-relaxed text-muted sm:text-[15px]">
                  {card.phones.map((phone) => (
                    <a
                      key={phone.number}
                      href={phone.href}
                      className="block font-medium text-foreground transition-colors duration-200 hover:text-accent-soft"
                    >
                      {phone.number}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
