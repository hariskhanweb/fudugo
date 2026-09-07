"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import contactData from "@/data/contact.json";
import { Container } from "@/components/ui";

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
      const title = section.querySelector("[data-findus='title']");
      const cards = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-findus='card']"),
      );

      if (title) {
        gsap.from(title, {
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
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-[48rem] rounded-full bg-accent-alt/5 blur-[120px]"
        aria-hidden
      />

      <Container className="relative px-5 sm:px-8 lg:px-12">
        {/* Section Title */}
        <div className="mb-14 text-center sm:mb-16 lg:mb-20">
          <h2
            data-findus="title"
            className="font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {findUs.title}
          </h2>
        </div>

        {/* 3 Location Cards */}
        <div className="grid grid-cols-1 items-stretch gap-6 sm:gap-8 md:grid-cols-3">
          {findUs.cards.map((card) => (
            <div
              key={card.title}
              data-findus="card"
              className="group relative flex h-full w-full flex-col items-center justify-start rounded-3xl border border-border/80 bg-surface/70 p-8 text-center shadow-(--card-shadow) backdrop-blur-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-alt/40 hover:bg-surface hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] sm:p-10"
            >
              {/* Icon / Flag Top Holder - Exact same h-8 w-12 frame for all 3 */}
              <div className="mb-6 flex h-8 w-full items-center justify-center">
                {card.type === "india" && <IndiaFlag />}
                {card.type === "us" && <USFlag />}
                {card.type === "phone" && <PhoneIcon />}
              </div>

              {/* Card Title - Exact same height & baseline */}
              <h3 className="mb-3 font-sans text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                {card.title}
              </h3>

              {/* Card Content / Address / Phone */}
              {card.company && (
                <p className="font-sans text-sm font-semibold text-foreground mb-1 sm:text-[15px]">
                  {card.company}
                </p>
              )}

              {card.lines && (
                <div className="space-y-1 font-sans text-sm leading-relaxed text-muted sm:text-[15px]">
                  {card.lines.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              )}

              {card.phones && (
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
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
