"use client";

import { useRef } from "react";
import gsap from "gsap";
import type { ServicePageContent } from "@/types";
import { Container } from "@/components/ui";
import { useGsapContext } from "@/lib/use-gsap-context";

/** Editorial two-column: sticky brief + numbered capability cascade */
export default function EditorialLayout({ service }: { service: ServicePageContent }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapContext(
    sectionRef,
    (section) => {
      const rows = section.querySelectorAll("[data-editorial='row']");
      gsap.fromTo(
        rows,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.05,
          ease: "power2.out",
          overwrite: "auto",
          scrollTrigger: {
            trigger: section,
            start: "top 88%",
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
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-accent-alt">
              What we build
            </p>
            <h2 className="mt-4 font-sans text-[clamp(28px,4vw,40px)] font-bold leading-tight text-foreground">
              Web experiences engineered for clarity and speed.
            </h2>
            <ul className="mt-8 space-y-3 border-l border-border pl-5">
              {service.outcomes.map((item) => (
                <li key={item} className="font-sans text-sm leading-relaxed text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </aside>

          <div className="space-y-0 divide-y divide-border/70">
            {service.capabilities.map((cap, index) => (
              <article
                key={cap.title}
                data-editorial="row"
                className="group grid gap-4 py-8 first:pt-0 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-8"
              >
                <span className="font-sans text-3xl font-bold tabular-nums text-foreground/15 transition-colors group-hover:text-accent-alt/40">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-sans text-xl font-bold text-foreground">{cap.title}</h3>
                  <p className="mt-2 max-w-xl font-sans text-sm leading-relaxed text-muted">
                    {cap.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-4 border-t border-border/70 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {service.process.map((step) => (
            <div key={step.step} data-editorial="row" className="rounded-2xl border border-border/50 bg-surface/20 p-5">
              <span className="font-sans text-xs font-semibold text-accent-alt">{step.step}</span>
              <h3 className="mt-3 font-sans text-base font-bold text-foreground">{step.title}</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
