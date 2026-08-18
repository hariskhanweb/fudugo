"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ServicePageContent } from "@/types";
import { Container } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useGsapContext } from "@/lib/use-gsap-context";

gsap.registerPlugin(ScrollTrigger);

const METRICS = [
  { id: "reach", value: 3.2, suffix: "x", label: "Avg. pipeline lift" },
  { id: "cvr", value: 28, suffix: "%", label: "Landing conversion uplift" },
  { id: "cac", value: 22, suffix: "%", label: "Lower CAC on winners" },
] as const;

/** Funnel / growth layout — metrics + zigzag campaign stages */
export default function FunnelLayout({ service }: { service: ServicePageContent }) {
  const sectionRef = useRef<HTMLElement>(null);
  const metricRefs = useRef<Record<string, HTMLSpanElement | null>>({});

  useGsapContext(
    sectionRef,
    (section) => {
      const stages = section.querySelectorAll("[data-funnel='stage']");
      const stagesWrap = section.querySelector("[data-funnel='stages']");
      const metrics = section.querySelector("[data-funnel='metrics']");

      if (stages.length) {
        gsap.fromTo(
          stages,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.07,
            ease: "power2.out",
            overwrite: "auto",
            scrollTrigger: {
              trigger: stagesWrap ?? section,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      if (!metrics) return;

      ScrollTrigger.create({
        trigger: metrics,
        start: "top 88%",
        once: true,
        onEnter: () => {
          METRICS.forEach((metric) => {
            const el = metricRefs.current[metric.id];
            if (!el) return;

            const obj = { val: 0 };
            gsap.to(obj, {
              val: metric.value,
              duration: 1.5,
              ease: "power2.out",
              overwrite: "auto",
              onUpdate: () => {
                if (!el.isConnected) return;
                el.textContent =
                  metric.value % 1 === 0
                    ? String(Math.floor(obj.val))
                    : obj.val.toFixed(1);
              },
            });
          });
        },
      });
    },
    [service.slug],
  );

  return (
    <section ref={sectionRef} className="bg-background py-16 sm:py-20 lg:py-24">
      <Container className="px-5 sm:px-8 lg:px-10">
        <div className="mb-10 flex flex-col gap-6 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-accent-alt">
              Growth engine
            </p>
            <h2 className="mt-3 font-sans text-[clamp(28px,4vw,42px)] font-bold leading-tight text-foreground">
              From attention to pipeline — measured every week.
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm leading-relaxed text-muted lg:text-right">
            Creative, channels, and conversion work as one system — not disconnected campaigns.
          </p>
        </div>

        <div
          data-funnel="metrics"
          className="grid gap-3 rounded-2xl border border-border/50 bg-surface/25 p-5 sm:grid-cols-3 sm:gap-0 sm:p-0 sm:divide-x sm:divide-border/50"
        >
          {METRICS.map((metric) => (
            <div key={metric.id} className="sm:px-8 sm:py-7">
              <p className="font-sans text-[clamp(32px,5vw,48px)] font-bold leading-none text-foreground">
                <span
                  ref={(node) => {
                    metricRefs.current[metric.id] = node;
                  }}
                >
                  0
                </span>
                <span className="ml-0.5 text-[0.5em] text-accent-alt">{metric.suffix}</span>
              </p>
              <p className="mt-3 font-sans text-sm text-muted">{metric.label}</p>
            </div>
          ))}
        </div>

        <div data-funnel="stages" className="mt-10 space-y-4">
          {service.capabilities.map((cap, index) => (
            <article
              key={cap.title}
              data-funnel="stage"
              className={cn(
                "grid gap-4 rounded-2xl border border-border/50 bg-surface/20 p-5 sm:grid-cols-[5rem_minmax(0,1fr)_auto] sm:items-center sm:gap-8 sm:p-6",
                index % 2 === 1 && "border-l-2 border-l-accent-alt/40",
              )}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent-alt/30 bg-accent-alt/10 font-sans text-sm font-bold text-accent-alt">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="font-sans text-lg font-bold text-foreground">{cap.title}</h3>
                <p className="mt-1.5 font-sans text-sm leading-relaxed text-muted">
                  {cap.description}
                </p>
              </div>
              <span className="hidden font-sans text-xs uppercase tracking-[0.14em] text-muted sm:inline">
                Stage {index + 1}
              </span>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-6 border-t border-border/60 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {service.process.map((step) => (
            <div key={step.step} data-funnel="stage">
              <p className="font-sans text-xs font-semibold text-accent-alt">{step.step}</p>
              <h3 className="mt-2 font-sans text-base font-bold text-foreground">{step.title}</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
