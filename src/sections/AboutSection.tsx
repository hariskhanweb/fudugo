"use client";

import { useState } from "react";
import data from "@/data/about.json";
import { Container, Monolog } from "@/components/ui";
import { cn } from "@/lib/utils";

function ArrowLeft({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M19 12H5M11 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AboutSection() {
  const slides = data.slides;
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const total = slides.length;

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <section
      id={data.id}
      className="relative z-20 overflow-hidden bg-background pt-6 pb-20 sm:pt-8 sm:pb-24 lg:pb-28"
    >
      
        {/* Oversized brand word — Monolog-style full-bleed display */}
      <div className="select-none">
        <Monolog variant="white" opacity={0.2} />
      </div>
      <Container className="px-5 sm:px-8 lg:px-10">
        <div className="mt-8 grid items-start gap-14 sm:mt-10 lg:mt-12 lg:grid-cols-[minmax(0,34%)_minmax(0,66%)] lg:gap-x-16 xl:gap-x-24">
          {/* Left slider column */}
          <div className="min-w-0">
            <div className="mb-10 flex items-center gap-4 sm:mb-12">
              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous slide"
                  className="flex h-8 w-8 items-center justify-center text-foreground/55 transition-colors hover:text-foreground"
                >
                  <ArrowLeft className="h-4.5 w-4.5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next slide"
                  className="flex h-8 w-8 items-center justify-center text-foreground/55 transition-colors hover:text-foreground"
                >
                  <ArrowRight className="h-4.5 w-4.5" />
                </button>
              </div>
              <p className="font-sans text-[13px] tabular-nums tracking-[0.04em] text-foreground/45">
                {String(index + 1).padStart(2, "0")}/
                {String(total).padStart(2, "0")}
              </p>
            </div>

            <div key={`${slide.value}-${index}`}>
              <p className="font-sans text-[clamp(4.5rem,9vw,7.5rem)] font-bold leading-none tracking-[-0.045em] text-foreground">
                {slide.value}
              </p>
              <p className="mt-5 max-w-62 font-sans text-[clamp(1rem,1.5vw,1.125rem)] font-normal leading-[1.45] text-foreground/90">
                {slide.label}
              </p>
            </div>
          </div>

          {/* Right narrative copy */}
          <div className="min-w-0 space-y-7 pt-1 lg:space-y-8 lg:pt-12">
            {data.body.map((paragraph, pIndex) => (
              <p
                key={pIndex}
                className="font-sans text-[clamp(1.25rem,2.15vw,1.75rem)] font-medium leading-[1.38] tracking-[-0.015em]"
              >
                {paragraph.parts.map((part) => (
                  <span
                    key={part.text}
                    className={cn(
                      part.dim ? "text-foreground/28" : "text-foreground",
                    )}
                  >
                    {part.text}
                  </span>
                ))}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
