"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import type { ServicePageContent } from "@/types";
import { Container } from "@/components/ui";
import { useGsapContext } from "@/lib/use-gsap-context";

/** Device-centered showcase: phone mock + radial feature chips */
export default function DeviceLayout({ service }: { service: ServicePageContent }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapContext(
    sectionRef,
    (section) => {
      const device = section.querySelector("[data-device='frame']");
      const chips = section.querySelectorAll("[data-device='chip']");

      if (device) {
        gsap.fromTo(
          device,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power2.out",
            overwrite: "auto",
            scrollTrigger: {
              trigger: device,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      if (chips.length) {
        gsap.fromTo(
          chips,
          { y: 14, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: "power2.out",
            overwrite: "auto",
            scrollTrigger: {
              trigger: section.querySelector("[data-device='grid']") ?? section,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    },
    [service.slug],
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-header py-16 sm:py-20 lg:py-24">
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-accent-alt/10 blur-3xl"
        aria-hidden
      />

      <Container className="relative px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-accent-alt">
            Product in hand
          </p>
          <h2 className="mt-4 font-sans text-[clamp(28px,4vw,42px)] font-bold leading-tight text-foreground">
            Designed for thumbs, retention, and real-world devices.
          </h2>
        </div>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
          <div className="space-y-4 lg:space-y-5">
            {service.capabilities.slice(0, 2).map((cap) => (
              <article
                key={cap.title}
                data-device="chip"
                className="rounded-2xl border border-border/50 bg-surface/40 p-5 lg:ml-auto lg:max-w-sm"
              >
                <h3 className="font-sans text-base font-bold text-foreground">{cap.title}</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-muted">{cap.description}</p>
              </article>
            ))}
          </div>

          <div
            data-device="frame"
            className="relative mx-auto w-55 shrink-0 sm:w-62.5"
          >
            <div className="rounded-4xl border border-border bg-panel p-2.5 shadow-[0_30px_80px_-30px_var(--accent-glow)]">
              <div className="relative aspect-9/19 overflow-hidden rounded-3xl bg-background">
                <Image
                  src={service.heroImage}
                  alt={`${service.title} preview`}
                  fill
                  sizes="250px"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 top-0 h-8 bg-linear-to-b from-black/40 to-transparent" />
                <div className="absolute inset-x-8 bottom-4 rounded-xl border border-white/10 bg-black/45 px-3 py-2 backdrop-blur-sm">
                  <p className="font-sans text-[10px] uppercase tracking-wider text-accent-soft">
                    Live preview
                  </p>
                  <p className="mt-0.5 truncate font-sans text-xs font-semibold text-white">
                    {service.shortTitle} experience
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 lg:space-y-5">
            {service.capabilities.slice(2).map((cap) => (
              <article
                key={cap.title}
                data-device="chip"
                className="rounded-2xl border border-border/50 bg-surface/40 p-5 lg:max-w-sm"
              >
                <h3 className="font-sans text-base font-bold text-foreground">{cap.title}</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-muted">{cap.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div data-device="grid" className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {service.process.map((step) => (
            <div
              key={step.step}
              data-device="chip"
              className="rounded-2xl border border-dashed border-border/70 px-5 py-5"
            >
              <span className="font-sans text-xs font-semibold text-accent-alt">{step.step}</span>
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
