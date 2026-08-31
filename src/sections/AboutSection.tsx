"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "@/data/about.json";
import { Container, Monolog } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

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

function splitToWords(text: string) {
  return text.split(/(\s+)/).filter((token) => token.length > 0);
}

const SLIDE_FILL_DURATION = 5;
const SLIDE_EXIT_DURATION = 0.5;
const SLIDE_ENTER_DURATION = 0.8;

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLSpanElement>(null);
  const slideContentRef = useRef<HTMLDivElement>(null);
  const progressTweenRef = useRef<gsap.core.Tween | null>(null);
  const slideTweenRef = useRef<gsap.core.Timeline | null>(null);
  const isTransitioningRef = useRef(false);
  const displayIndexRef = useRef(0);
  const transitionToSlideRef = useRef<(nextIndex: number) => void>(() => {});
  const slides = data.slides;
  const [displayIndex, setDisplayIndex] = useState(0);
  const slide = slides[displayIndex];
  const total = slides.length;

  const paragraphs = useMemo(
    () =>
      data.body.map((paragraph) =>
        paragraph.parts.map((part) => part.text).join(""),
      ),
    [],
  );

  const getSlideElements = () => {
    const content = slideContentRef.current;
    if (!content) return null;

    const value = content.querySelector<HTMLElement>('[data-about-slide="value"]');
    const label = content.querySelector<HTMLElement>('[data-about-slide="label"]');
    if (!value || !label) return null;

    return { value, label };
  };

  const startProgressFill = useCallback(() => {
    const fill = progressFillRef.current;
    const bar = progressBarRef.current;
    if (!fill) return;

    progressTweenRef.current?.kill();
    gsap.killTweensOf(fill);
    gsap.set(fill, { scaleX: 0 });
    bar?.setAttribute("aria-valuenow", "0");

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || total <= 1) {
      gsap.set(fill, { scaleX: 1 });
      bar?.setAttribute("aria-valuenow", "100");
      return;
    }

    progressTweenRef.current = gsap.to(fill, {
      scaleX: 1,
      duration: SLIDE_FILL_DURATION,
      ease: "none",
      onUpdate: () => {
        const scaleX = gsap.getProperty(fill, "scaleX") as number;
        bar?.setAttribute("aria-valuenow", String(Math.round(scaleX * 100)));
      },
      onComplete: () => {
        const nextIndex = (displayIndexRef.current + 1) % total;
        transitionToSlideRef.current(nextIndex);
      },
    });
  }, [total]);

  const transitionToSlide = useCallback(
    (nextIndex: number) => {
      if (isTransitioningRef.current || nextIndex === displayIndexRef.current) {
        return;
      }

      progressTweenRef.current?.kill();
      slideTweenRef.current?.kill();

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const els = getSlideElements();

      if (!els || reduceMotion) {
        flushSync(() => setDisplayIndex(nextIndex));
        startProgressFill();
        return;
      }

      isTransitioningRef.current = true;
      const { value, label } = els;

      slideTweenRef.current = gsap
        .timeline({
          defaults: { ease: "power2.inOut" },
          onComplete: () => {
            isTransitioningRef.current = false;
            startProgressFill();
          },
        })
        .to([value, label], {
          y: 10,
          opacity: 0,
          duration: SLIDE_EXIT_DURATION,
          stagger: 0.06,
        })
        .add(() => {
          flushSync(() => setDisplayIndex(nextIndex));
        })
        .fromTo(
          [value, label],
          { y: -18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: SLIDE_ENTER_DURATION,
            ease: "power2.out",
            stagger: 0.08,
          },
        );
    },
    [startProgressFill],
  );

  useEffect(() => {
    displayIndexRef.current = displayIndex;
  }, [displayIndex]);

  useEffect(() => {
    transitionToSlideRef.current = transitionToSlide;
  }, [transitionToSlide]);

  const prev = () => {
    transitionToSlide((displayIndex - 1 + total) % total);
  };

  const next = () => {
    transitionToSlide((displayIndex + 1) % total);
  };

  useEffect(() => {
    startProgressFill();

    return () => {
      progressTweenRef.current?.kill();
      slideTweenRef.current?.kill();
    };
  }, [startProgressFill]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const stats = section.querySelector("[data-about='stats']");
      const body = section.querySelector("[data-about='body']");
      const words = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-about='word']"),
      );

      if (!reduceMotion && stats) {
        gsap.fromTo(
          stats,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            delay: 0.15,
            scrollTrigger: {
              trigger: section,
              start: "top 72%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      if (words.length && body) {
        gsap.set(words, { opacity: reduceMotion ? 1 : 0.16 });

        if (!reduceMotion) {
          gsap.to(words, {
            opacity: 1,
            ease: "none",
            stagger: {
              each: 0.04,
              from: "start",
            },
            scrollTrigger: {
              trigger: body,
              start: "top 78%",
              end: "bottom 38%",
              scrub: 0.65,
            },
          });
        }
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={data.id}
      className="relative z-20 overflow-hidden bg-black pb-20 sm:pb-24 lg:pb-28"
    >
      <div
        data-about="monolog"
        className="select-none will-change-transform"
      >
        <Monolog variant="white" opacity={0.2} />
      </div>

      <Container className="px-5 sm:px-8 lg:px-10">
        <div className="mt-8 grid items-start gap-14 sm:mt-10 lg:mt-12 lg:grid-cols-[minmax(0,34%)_minmax(0,66%)] lg:gap-x-16 xl:gap-x-24">
          {/* Left: progress + nav + stats */}
          <div data-about="stats" className="min-w-0 max-w-72">
            <div
              ref={progressBarRef}
              className="mb-5 h-px w-full overflow-hidden bg-foreground/15"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={0}
              aria-label={`Slide ${displayIndex + 1} of ${total} progress`}
            >
              <span
                ref={progressFillRef}
                className="block h-full w-full origin-left scale-x-0 bg-foreground"
              />
            </div>

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
                {String(displayIndex + 1).padStart(2, "0")}/
                {String(total).padStart(2, "0")}
              </p>
            </div>

            <div
              ref={slideContentRef}
              className="overflow-hidden will-change-[transform,opacity]"
            >
              <p
                data-about-slide="value"
                className="font-sans text-[clamp(4.5rem,9vw,7.5rem)] font-bold leading-none tracking-[-0.045em] text-foreground"
              >
                {slide.value}
              </p>
              <p
                data-about-slide="label"
                className="mt-5 max-w-62 font-sans text-[clamp(1rem,1.5vw,1.125rem)] font-normal leading-[1.45] text-foreground/90"
              >
                {slide.label}
              </p>
            </div>
          </div>

          {/* Right: scroll word-reveal copy */}
          <div
            data-about="body"
            className="min-w-0 space-y-7 pt-1 lg:space-y-8 lg:pt-2"
          >
            {paragraphs.map((paragraph, pIndex) => (
              <p
                key={pIndex}
                className="font-sans text-[clamp(1.25rem,2.15vw,1.75rem)] font-medium leading-[1.38] tracking-[-0.015em] text-foreground"
              >
                {splitToWords(paragraph).map((token, tIndex) =>
                  /^\s+$/.test(token) ? (
                    <span key={`${pIndex}-s-${tIndex}`}>{token}</span>
                  ) : (
                    <span
                      key={`${pIndex}-w-${tIndex}`}
                      data-about="word"
                      className="will-change-[opacity]"
                    >
                      {token}
                    </span>
                  ),
                )}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
