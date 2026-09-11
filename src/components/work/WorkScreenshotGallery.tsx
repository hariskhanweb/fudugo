"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Container } from "@/components/ui";
import ImageLightbox from "@/components/work/ImageLightbox";
import { useGsapContext } from "@/lib/use-gsap-context";
import { cn } from "@/lib/utils";
import type { ProjectScreenshot } from "@/types";

function ExternalArrow({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M4 12 12 4M6 4h6v6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon({
  direction,
  className = "",
}: {
  direction: "left" | "right";
  className?: string;
}) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d={direction === "left" ? "M10 3 5 8l5 5" : "m6 3 5 5-5 5"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function hostLabel(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function SidePeek({
  shot,
  side,
  onClick,
}: {
  shot: ProjectScreenshot;
  side: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous screenshot" : "Next screenshot"}
      className={cn(
        "group absolute top-[6%] z-0 h-[58%] cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-black/40 outline-hidden transition-[opacity,transform] duration-500 ease-out sm:rounded-2xl",
        "w-[16%] opacity-30 sm:top-[8%] sm:h-[60%] sm:w-[22%] sm:opacity-25 lg:w-[28%] xl:w-[30%]",
        "hover:opacity-45 focus-visible:opacity-50 focus-visible:ring-2 focus-visible:ring-accent-alt/60",
        side === "left"
          ? "left-0 origin-right translate-x-[-18%] scale-[0.9] sm:translate-x-[-10%] lg:translate-x-[-8%]"
          : "right-0 origin-left translate-x-[18%] scale-[0.9] sm:translate-x-[10%] lg:translate-x-[8%]",
      )}
      style={{
        maskImage:
          side === "left"
            ? "linear-gradient(90deg, transparent 0%, black 35%, black 100%)"
            : "linear-gradient(270deg, transparent 0%, black 35%, black 100%)",
        WebkitMaskImage:
          side === "left"
            ? "linear-gradient(90deg, transparent 0%, black 35%, black 100%)"
            : "linear-gradient(270deg, transparent 0%, black 35%, black 100%)",
      }}
    >
      <Image
        src={shot.src}
        alt=""
        fill
        sizes="(max-width: 640px) 20vw, 30vw"
        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
        draggable={false}
      />
      <span className="pointer-events-none absolute inset-0 bg-black/30" />
    </button>
  );
}

type WorkScreenshotGalleryProps = {
  screenshots: ProjectScreenshot[];
  liveUrl?: string;
};

export default function WorkScreenshotGallery({
  screenshots,
  liveUrl,
}: WorkScreenshotGalleryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartX = useRef<number | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const count = screenshots.length;
  const current = screenshots[slideIndex] ?? screenshots[0];
  const prevShot = shotAt(screenshots, slideIndex - 1);
  const nextShot = shotAt(screenshots, slideIndex + 1);
  const canSlide = count > 1;

  useGsapContext(
    sectionRef,
    (section) => {
      const header = section.querySelector("[data-shots='header']");
      const device = section.querySelector("[data-shots='device']");

      if (header) {
        gsap.fromTo(
          header,
          { y: 12, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.55,
            ease: "power2.out",
            overwrite: "auto",
            immediateRender: false,
            clearProps: "transform",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              once: true,
            },
          },
        );
      }

      if (device) {
        gsap.fromTo(
          device,
          { y: 20, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: "power2.out",
            overwrite: "auto",
            immediateRender: false,
            clearProps: "transform",
            scrollTrigger: {
              trigger: device,
              start: "top 90%",
              once: true,
            },
          },
        );
      }
    },
    [screenshots.length],
  );

  const goTo = useCallback(
    (next: number) => {
      if (!count) return;
      setSlideIndex(((next % count) + count) % count);
    },
    [count],
  );

  const goPrev = useCallback(() => goTo(slideIndex - 1), [goTo, slideIndex]);
  const goNext = useCallback(() => goTo(slideIndex + 1), [goTo, slideIndex]);

  const openLightbox = useCallback(() => setLightboxOpen(true), []);
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  useEffect(() => {
    if (lightboxOpen || !canSlide) return;

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen, canSlide, goPrev, goNext]);

  const onTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current == null || !canSlide) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 36) return;
    if (delta > 0) goPrev();
    else goNext();
  };

  if (!current) return null;

  return (
    <>
      <section
        ref={sectionRef}
        className="overflow-x-clip border-y border-border/60 bg-header py-12 sm:py-16 lg:py-24"
      >
        <Container className="px-5 sm:px-8 lg:px-10">
          <div
            data-shots="header"
            className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between lg:mb-12"
          >
            <div className="max-w-xl">
              <p className="font-sans text-sm text-accent-soft">(Screenshots)</p>
              <h2 className="mt-2 font-sans text-[clamp(26px,7vw,44px)] font-bold leading-tight tracking-tight text-foreground">
                Product in the wild.
              </h2>
              <p className="mt-3 font-sans text-sm leading-relaxed text-muted sm:text-[15px]">
                Swipe or use the arrows to browse. Tap the screen to expand.
              </p>
            </div>
            {liveUrl ? (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl border border-accent-alt/40 bg-accent-alt/10 px-5 py-3 font-sans text-sm font-semibold text-accent-alt transition-colors outline-hidden hover:bg-accent-alt/20 focus-visible:ring-2 focus-visible:ring-accent-alt/70 sm:w-auto"
              >
                Open live website
                <ExternalArrow className="h-3.5 w-3.5" />
              </a>
            ) : null}
          </div>
        </Container>

        <div data-shots="device" className="relative w-full">
          <div
            className="pointer-events-none absolute top-[18%] left-1/2 h-[45%] w-[70%] -translate-x-1/2 rounded-full bg-accent-alt/8 blur-3xl sm:w-[55%]"
            aria-hidden
          />

          <div className="relative w-full">
            {canSlide && prevShot ? (
              <SidePeek shot={prevShot} side="left" onClick={goPrev} />
            ) : null}
            {canSlide && nextShot ? (
              <SidePeek shot={nextShot} side="right" onClick={goNext} />
            ) : null}

            {/* Laptop — edge-to-edge on mobile */}
            <div className="relative z-10 mx-auto w-full max-w-[min(100%,78rem)] px-2 sm:px-6 md:px-10 lg:px-[14%]">
              <div
                className="relative touch-manipulation"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                <div
                  className="relative rounded-[0.85rem] p-1.5 shadow-[0_40px_90px_-36px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.06)_inset] sm:rounded-[1.25rem] sm:p-2.5 md:rounded-[1.45rem] md:p-3.5"
                  style={{
                    background:
                      "linear-gradient(160deg, #3a3f4d 0%, #232733 42%, #161920 100%)",
                  }}
                >
                  <div
                    className="pointer-events-none absolute inset-x-4 top-0 h-px bg-linear-to-r from-transparent via-white/25 to-transparent sm:inset-x-10"
                    aria-hidden
                  />

                  <div className="relative mb-1.5 flex h-2.5 items-center justify-center sm:mb-2.5 sm:h-3.5">
                    <div className="relative flex h-2 w-2 items-center justify-center rounded-full bg-[#0c0e14] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)] sm:h-3 sm:w-3">
                      <span className="h-0.75 w-0.75 rounded-full bg-[#1a2230] shadow-[0_0_0_1px_rgba(80,120,180,0.35)] sm:h-1 sm:w-1" />
                    </div>
                  </div>

                  <div
                    className="relative overflow-hidden rounded-[0.55rem] bg-black sm:rounded-[0.85rem]"
                    style={{
                      boxShadow:
                        "inset 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 40px rgba(0,0,0,0.45)",
                    }}
                  >
                    <div className="relative aspect-16/10 w-full">
                      <div
                        className="flex h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
                        style={{
                          transform: `translate3d(-${slideIndex * 100}%, 0, 0)`,
                        }}
                      >
                        {screenshots.map((shot, i) => (
                          <button
                            key={`${shot.src}-${i}`}
                            type="button"
                            onClick={openLightbox}
                            className="relative h-full w-full shrink-0 cursor-zoom-in touch-manipulation outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-alt/70"
                            aria-label={`View larger: ${shot.alt}`}
                            tabIndex={i === slideIndex ? 0 : -1}
                          >
                            <Image
                              src={shot.src}
                              alt={shot.alt}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 70vw"
                              className="object-cover object-top"
                              priority={i === 0}
                              draggable={false}
                            />
                          </button>
                        ))}
                      </div>

                      <div
                        className="pointer-events-none absolute inset-0"
                        aria-hidden
                      >
                        <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-black/20" />
                        <div className="absolute inset-x-0 top-0 h-1/3 bg-linear-to-b from-white/8 to-transparent" />
                        <div className="absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-white/5 to-transparent" />
                        <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.35)]" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mx-auto -mt-px h-2 w-[101.5%] translate-x-[-0.75%] sm:h-3">
                  <div
                    className="h-full w-full rounded-b-xs"
                    style={{
                      background:
                        "linear-gradient(180deg, #4a5160 0%, #2a303c 35%, #14171e 100%)",
                      boxShadow: "0 1px 0 rgba(255,255,255,0.08)",
                    }}
                  />
                  <div className="absolute inset-x-[22%] top-0 h-px bg-white/12" />
                </div>

                <div className="relative mx-auto">
                  <div
                    className="mx-auto h-3 w-[112%] translate-x-[-5.4%] sm:h-3.5 sm:w-[110%] sm:translate-x-[-4.5%] md:h-4.5"
                    style={{
                      background:
                        "linear-gradient(180deg, #3d4454 0%, #252a36 40%, #12151c 100%)",
                      clipPath: "polygon(1.2% 0, 98.8% 0, 100% 100%, 0% 100%)",
                      borderBottomLeftRadius: "1.1rem",
                      borderBottomRightRadius: "1.1rem",
                      boxShadow:
                        "0 12px 30px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.12)",
                    }}
                  />
                  <div className="absolute top-1.5 left-1/2 h-0.75 w-14 -translate-x-1/2 rounded-full bg-black/40 sm:top-1.75 sm:w-20 md:w-28" />
                  <div
                    className="pointer-events-none absolute inset-x-[8%] bottom-0 h-px bg-linear-to-r from-transparent via-white/15 to-transparent"
                    aria-hidden
                  />
                </div>

                <div
                  className="pointer-events-none absolute inset-x-[4%] -bottom-6 h-10 rounded-[100%] bg-black/50 blur-2xl sm:inset-x-[6%] sm:-bottom-10 sm:h-16"
                  aria-hidden
                />
              </div>
            </div>

            {/* Controls under laptop on mobile; floating on larger screens */}
            {canSlide ? (
              <div className="relative z-30 mt-6 flex items-center justify-center gap-3 px-4 sm:mt-0 sm:contents">
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous screenshot"
                  className={cn(
                    "flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/60 text-white shadow-lg backdrop-blur-xs transition-colors outline-hidden touch-manipulation",
                    "hover:border-white/30 hover:bg-black/75 focus-visible:ring-2 focus-visible:ring-accent-alt/70",
                    "sm:absolute sm:top-[36%] sm:left-3 sm:z-30 sm:-translate-y-1/2 md:left-6 lg:left-[16%] xl:left-[18%]",
                  )}
                >
                  <ChevronIcon direction="left" className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next screenshot"
                  className={cn(
                    "flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/60 text-white shadow-lg backdrop-blur-xs transition-colors outline-hidden touch-manipulation",
                    "hover:border-white/30 hover:bg-black/75 focus-visible:ring-2 focus-visible:ring-accent-alt/70",
                    "sm:absolute sm:top-[36%] sm:right-3 sm:z-30 sm:-translate-y-1/2 md:right-6 lg:right-[16%] xl:right-[18%]",
                  )}
                >
                  <ChevronIcon direction="right" className="h-4 w-4" />
                </button>
              </div>
            ) : null}
          </div>

          <div className="relative z-10 mt-5 flex flex-col items-center gap-3 px-5 sm:mt-10 sm:gap-4 sm:px-8">
            <div className="flex max-w-full flex-col items-center gap-1 text-center sm:flex-row sm:flex-wrap sm:gap-x-3">
              <p className="font-sans text-sm font-medium text-foreground sm:text-[15px]">
                {current.caption || current.alt}
              </p>
              {liveUrl ? (
                <span className="font-mono text-[11px] text-muted">
                  {hostLabel(liveUrl)}
                </span>
              ) : null}
            </div>

            {canSlide ? (
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] tabular-nums text-muted">
                  {String(slideIndex + 1).padStart(2, "0")} /{" "}
                  {String(count).padStart(2, "0")}
                </span>
                <div className="flex items-center gap-1.5">
                  {screenshots.map((shot, i) => (
                    <button
                      key={`${shot.src}-dot-${i}`}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`Go to screenshot ${i + 1}`}
                      aria-current={i === slideIndex}
                      className={cn(
                        "h-2 cursor-pointer rounded-full transition-all outline-hidden touch-manipulation focus-visible:ring-2 focus-visible:ring-accent-alt/70 sm:h-1.5",
                        i === slideIndex
                          ? "w-7 bg-accent-alt sm:w-6"
                          : "w-2 bg-foreground/25 hover:bg-foreground/45 sm:w-1.5",
                      )}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <ImageLightbox
        images={screenshots}
        index={slideIndex}
        open={lightboxOpen}
        onClose={closeLightbox}
        onIndexChange={setSlideIndex}
      />
    </>
  );
}

function shotAt(shots: ProjectScreenshot[], index: number) {
  if (!shots.length) return null;
  const normalized = ((index % shots.length) + shots.length) % shots.length;
  return shots[normalized] ?? null;
}
