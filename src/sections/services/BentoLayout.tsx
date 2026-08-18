"use client";

import { useRef } from "react";
import gsap from "gsap";
import type { ServicePageContent } from "@/types";
import { Container } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useGsapContext } from "@/lib/use-gsap-context";

/** Dense product bento — modules + outcomes strip */
export default function BentoLayout({ service }: { service: ServicePageContent }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapContext(
    sectionRef,
    (section) => {
      const cells = section.querySelectorAll("[data-bento='cell']");
      if (!cells.length) return;

      gsap.fromTo(
        cells,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.06,
          ease: "power2.out",
          overwrite: "auto",
          scrollTrigger: {
            trigger: section.querySelector("[data-bento='grid']") ?? section,
            start: "top 86%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    [service.slug],
  );

  return (
    <section ref={sectionRef} className="bg-background py-16 sm:py-20 lg:py-24">
      <Container className="px-5 sm:px-8 lg:px-10">
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-accent-alt">
              Modular systems
            </p>
            <h2 className="mt-3 font-sans text-[clamp(28px,4vw,42px)] font-bold leading-tight text-foreground">
              Software shaped around how your teams actually work.
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm leading-relaxed text-muted lg:text-right">
            Start with one high-impact module. Expand into a connected operating system.
          </p>
        </div>

        <div
          data-bento="grid"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 lg:gap-4"
        >
          {service.capabilities.map((cap, index) => (
            <article
              key={cap.title}
              data-bento="cell"
              className={cn(
                "rounded-2xl border border-border/50 bg-surface/30 p-5 sm:p-6",
                index === 0 && "lg:col-span-2 lg:row-span-2 lg:flex lg:flex-col lg:justify-between",
              )}
            >
              <div>
                <span className="font-sans text-xs font-semibold text-accent-alt">
                  Module {String(index + 1).padStart(2, "0")}
                </span>
                <h3
                  className={cn(
                    "mt-3 font-sans font-bold text-foreground",
                    index === 0 ? "text-2xl sm:text-3xl" : "text-lg",
                  )}
                >
                  {cap.title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-muted">
                  {cap.description}
                </p>
              </div>
              {index === 0 && (
                <ul className="mt-8 space-y-2 border-t border-border/60 pt-6">
                  {service.outcomes.map((item) => (
                    <li key={item} className="flex gap-2 font-sans text-sm text-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-alt" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          {service.process.map((step) => (
            <div
              key={step.step}
              data-bento="cell"
              className="rounded-xl border border-border/40 px-4 py-4"
            >
              <div className="flex items-center gap-2">
                <span className="font-sans text-xs font-bold text-accent-alt">{step.step}</span>
                <span className="h-px flex-1 bg-border/60" />
              </div>
              <h3 className="mt-3 font-sans text-sm font-bold text-foreground">{step.title}</h3>
              <p className="mt-1.5 font-sans text-xs leading-relaxed text-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
