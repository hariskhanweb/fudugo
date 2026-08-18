"use client";

import { useRef } from "react";
import gsap from "gsap";
import type { ServicePageContent } from "@/types";
import { Container } from "@/components/ui";
import { useGsapContext } from "@/lib/use-gsap-context";

/** Vertical infrastructure stack — layered architecture cards */
export default function StackLayout({ service }: { service: ServicePageContent }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapContext(
    sectionRef,
    (section) => {
      const layers = section.querySelectorAll("[data-stack='layer']");
      const line = section.querySelector("[data-stack='line']");
      const list = section.querySelector("[data-stack='list']");

      if (line && list) {
        gsap.set(line, { transformOrigin: "top center", scaleY: 0 });
        gsap.to(line, {
          scaleY: 1,
          ease: "none",
          overwrite: "auto",
          scrollTrigger: {
            trigger: list,
            start: "top 80%",
            end: "bottom 70%",
            scrub: 1.4,
          },
        });
      }

      if (layers.length) {
        gsap.fromTo(
          layers,
          { y: 14, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.06,
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

  const layers = [
    { label: "Edge & CDN", tone: "from-accent-alt/20" },
    { label: "Application", tone: "from-accent-soft/15" },
    { label: "Data & cache", tone: "from-accent/20" },
    { label: "Platform core", tone: "from-accent-deep/30" },
  ];

  return (
    <section ref={sectionRef} className="bg-background py-16 sm:py-20 lg:py-24">
      <Container className="px-5 sm:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-accent-alt">
              Architecture layers
            </p>
            <h2 className="mt-4 font-sans text-[clamp(28px,4vw,42px)] font-bold leading-tight text-foreground">
              Infrastructure you can see, measure, and trust.
            </h2>
            <p className="mt-4 font-sans text-sm leading-relaxed text-muted">
              We design stacks as clear layers — so reliability, security, and cost stay intentional as you scale.
            </p>

            <div className="mt-10 space-y-3">
              {layers.map((layer, index) => (
                <div
                  key={layer.label}
                  className={`rounded-xl border border-border/50 bg-linear-to-r ${layer.tone} to-transparent px-4 py-3`}
                  style={{ marginLeft: `${index * 12}px` }}
                >
                  <p className="font-sans text-sm font-semibold text-foreground">{layer.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div data-stack="list" className="relative pl-6 sm:pl-8">
            <div className="absolute bottom-2 left-0 top-2 w-px bg-border" aria-hidden />
            <div
              data-stack="line"
              className="absolute left-0 top-2 w-px bg-linear-to-b from-accent-alt to-accent/50"
              style={{ height: "calc(100% - 1rem)" }}
              aria-hidden
            />

            <div className="space-y-4">
              {service.capabilities.map((cap, index) => (
                <article
                  key={cap.title}
                  data-stack="layer"
                  className="relative rounded-2xl border border-border/50 bg-surface/35 p-5 sm:p-6"
                >
                  <span className="absolute -left-6 top-7 h-2.5 w-2.5 -translate-x-px rounded-full bg-accent-alt sm:-left-8" />
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-sans text-lg font-bold text-foreground">{cap.title}</h3>
                    <span className="shrink-0 font-sans text-xs tabular-nums text-muted">
                      L{index + 1}
                    </span>
                  </div>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-muted">
                    {cap.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-4 border-t border-border/60 pt-10 sm:grid-cols-4">
          {service.process.map((step) => (
            <div key={step.step} data-stack="layer">
              <p className="font-sans text-xs font-semibold text-accent-alt">{step.step}</p>
              <h3 className="mt-2 font-sans text-sm font-bold text-foreground">{step.title}</h3>
              <p className="mt-2 font-sans text-xs leading-relaxed text-muted sm:text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
