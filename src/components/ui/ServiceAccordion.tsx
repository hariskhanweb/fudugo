"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import type { ServiceItem } from "@/types";
import { cn } from "@/lib/utils";

type ServiceAccordionProps = {
  items: ServiceItem[];
};

function PlusMinusIcon({ open }: { open: boolean }) {
  return (
    <span
      className={cn(
        "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-alt text-white transition-transform duration-300 sm:h-9 sm:w-9",
        open && "rotate-180",
      )}
      aria-hidden
    >
      <span className="absolute h-0.5 w-3.5 rounded-full bg-current" />
      <span
        className={cn(
          "absolute h-3.5 w-0.5 rounded-full bg-current transition-opacity duration-200",
          open && "opacity-0",
        )}
      />
    </span>
  );
}

function ServicePanel({
  item,
  isOpen,
  onToggle,
}: {
  item: ServiceItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hasMounted = useRef(false);

  useEffect(() => {
    const panel = panelRef.current;
    const inner = innerRef.current;
    const content = contentRef.current;
    if (!panel || !inner || !content) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    gsap.killTweensOf([panel, content]);

    // First paint: set state without tweening
    if (!hasMounted.current) {
      hasMounted.current = true;
      if (isOpen) {
        gsap.set(panel, { height: "auto", overflow: "visible" });
        gsap.set(content, { opacity: 1, y: 0 });
      } else {
        gsap.set(panel, { height: 0, overflow: "hidden" });
        gsap.set(content, { opacity: 0, y: 18 });
      }
      return;
    }

    if (reduceMotion) {
      gsap.set(panel, {
        height: isOpen ? "auto" : 0,
        overflow: isOpen ? "visible" : "hidden",
      });
      gsap.set(content, { opacity: isOpen ? 1 : 0, y: 0 });
      return;
    }

    if (isOpen) {
      gsap.set(panel, { height: 0, overflow: "hidden" });
      gsap.set(content, { opacity: 0, y: 18 });
      const target = inner.offsetHeight;
      gsap
        .timeline({ defaults: { ease: "power2.inOut" } })
        .to(panel, { height: target, duration: 0.45 })
        .to(
          content,
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          "-=0.2",
        )
        .set(panel, { height: "auto", overflow: "visible" });
    } else {
      const current = panel.offsetHeight || inner.offsetHeight;
      gsap.set(panel, { height: current, overflow: "hidden" });
      gsap
        .timeline({ defaults: { ease: "power2.inOut" } })
        .to(content, { opacity: 0, y: 10, duration: 0.2 })
        .to(panel, { height: 0, duration: 0.35 }, "-=0.05");
    }
  }, [isOpen]);

  return (
    <article
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--card-shadow)] transition-colors duration-300",
        isOpen ? "border-border" : "hover:bg-surface-hover",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-4 px-5 py-5 text-left sm:gap-6 sm:px-6 sm:py-6 lg:px-8"
      >
        <span className="shrink-0 font-sans text-sm font-normal text-accent-alt sm:text-[15px]">
          ({item.number})
        </span>
        <h3 className="min-w-0 flex-1 font-sans text-xl font-bold tracking-tight text-foreground sm:text-2xl lg:text-[28px]">
          {item.title}
        </h3>
        <PlusMinusIcon open={isOpen} />
      </button>

      <div ref={panelRef} className="h-0 overflow-hidden">
        <div ref={innerRef} className="px-5 pb-6 sm:px-6 sm:pb-8 lg:px-8">
          <div
            ref={contentRef}
            className="grid gap-6 border-t border-border pt-6 sm:gap-8 lg:grid-cols-[minmax(180px,0.32fr)_minmax(0,0.4fr)_minmax(0,0.28fr)] lg:items-start lg:gap-10"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-black sm:aspect-[16/11]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 1024px) 100vw, 32vw"
                className="object-cover"
              />
            </div>

            <div className="space-y-3 lg:pt-1">
              <h4 className="font-sans text-lg font-bold leading-snug text-foreground sm:text-xl">
                {item.subtitle}
              </h4>
              <p className="max-w-md font-sans text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </div>

            <div className="lg:pt-1">
              <p className="mb-3 font-sans text-xs text-muted sm:text-sm">
                Categories
              </p>
              <div className="flex flex-wrap gap-2">
                {item.categories.map((category, index) => (
                  <a
                    key={category}
                    href="#"
                    className={cn(
                      "min-h-10 rounded-full px-3.5 py-2 font-sans text-xs transition-colors sm:text-[13px]",
                      index === 0
                        ? "border border-accent text-accent-soft hover:bg-accent/20"
                        : "border border-transparent text-muted hover:border-border hover:text-foreground",
                    )}
                  >
                    {category}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ServiceAccordion({ items }: ServiceAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {items.map((item, index) => (
        <div key={item.number} data-services="item">
          <div data-services="parallax" className="will-change-transform">
            <ServicePanel
              item={item}
              isOpen={activeIndex === index}
              onToggle={() =>
                setActiveIndex((prev) => (prev === index ? -1 : index))
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
}
