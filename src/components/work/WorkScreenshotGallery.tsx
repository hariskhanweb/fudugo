"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Container } from "@/components/ui";
import ImageLightbox from "@/components/work/ImageLightbox";
import { useGsapContext } from "@/lib/use-gsap-context";
import { cn } from "@/lib/utils";
import type { ProjectScreenshot } from "@/types";

function hostLabel(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

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

function BrowserFrame({
  shot,
  liveUrl,
  className,
  onOpen,
}: {
  shot: ProjectScreenshot;
  liveUrl?: string;
  className?: string;
  onOpen: () => void;
}) {
  return (
    <figure
      className={cn(
        "group overflow-hidden rounded-2xl border border-border/60 bg-panel",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border/60 bg-surface/80 px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-foreground/20" />
        <span className="h-2 w-2 rounded-full bg-foreground/20" />
        <span className="h-2 w-2 rounded-full bg-foreground/20" />
        <div className="ml-2 min-w-0 grow truncate rounded-md bg-background/70 px-2.5 py-1 font-mono text-[10px] text-muted">
          {liveUrl ? hostLabel(liveUrl) : shot.caption || shot.alt}
        </div>
      </div>
      <button
        type="button"
        onClick={onOpen}
        className="relative block aspect-16/10 w-full cursor-zoom-in overflow-hidden bg-black/40 outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-alt/70"
        aria-label={`View larger: ${shot.alt}`}
      >
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="pointer-events-none absolute right-3 bottom-3 inline-flex translate-y-1 items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 font-sans text-[11px] font-medium text-white/90 opacity-0 backdrop-blur-xs transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
            <path
              d="M6.5 3H3v3.5M9.5 13H13V9.5M3 3l4 4M13 13l-4-4"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Expand
        </span>
      </button>
      {shot.caption ? (
        <figcaption className="px-4 py-3 font-sans text-xs text-muted sm:text-sm">
          {shot.caption}
        </figcaption>
      ) : null}
    </figure>
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
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const primaryShot = screenshots[0];
  const secondaryShots = screenshots.slice(1);

  useGsapContext(
    sectionRef,
    (section) => {
      const header = section.querySelector("[data-shots='header']");
      const frames = section.querySelectorAll("[data-shots='frame']");

      if (header) {
        gsap.fromTo(
          header,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: "power2.out",
            overwrite: "auto",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      if (frames.length) {
        gsap.fromTo(
          frames,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power2.out",
            overwrite: "auto",
            scrollTrigger: {
              trigger: section.querySelector("[data-shots='grid']") ?? section,
              start: "top 84%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    },
    [screenshots.length],
  );

  const openAt = useCallback((index: number) => {
    setActiveIndex(index);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <section
        ref={sectionRef}
        className="border-y border-border/60 bg-header py-16 sm:py-20 lg:py-24"
      >
        <Container className="px-5 sm:px-8 lg:px-10">
          <div
            data-shots="header"
            className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between"
          >
            <div className="max-w-xl">
              <p className="font-sans text-sm text-accent-soft">(Screenshots)</p>
              <h2 className="mt-2 font-sans text-[clamp(28px,4vw,44px)] font-bold leading-tight tracking-tight text-foreground">
                Product in the wild.
              </h2>
              <p className="mt-3 font-sans text-sm leading-relaxed text-muted sm:text-[15px]">
                Click any frame to open a full-screen lightbox. Use arrows to
                browse.
              </p>
            </div>
            {liveUrl ? (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-xl border border-accent-alt/40 bg-accent-alt/10 px-5 py-3 font-sans text-sm font-semibold text-accent-alt transition-colors outline-hidden hover:bg-accent-alt/20 focus-visible:ring-2 focus-visible:ring-accent-alt/70"
              >
                Open live website
                <ExternalArrow className="h-3.5 w-3.5" />
              </a>
            ) : null}
          </div>

          <div data-shots="grid" className="grid gap-4 lg:grid-cols-12 lg:gap-5">
            {primaryShot ? (
              <div data-shots="frame" className="lg:col-span-7">
                <BrowserFrame
                  shot={primaryShot}
                  liveUrl={liveUrl}
                  className="h-full"
                  onOpen={() => openAt(0)}
                />
              </div>
            ) : null}

            <div className="flex flex-col gap-4 lg:col-span-5">
              {secondaryShots.slice(0, 2).map((shot, i) => (
                <div key={`${shot.src}-${shot.alt}`} data-shots="frame">
                  <BrowserFrame
                    shot={shot}
                    liveUrl={liveUrl}
                    onOpen={() => openAt(i + 1)}
                  />
                </div>
              ))}
            </div>

            {secondaryShots.length > 2 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-3">
                {secondaryShots.slice(2).map((shot, i) => (
                  <div key={`${shot.src}-${shot.alt}`} data-shots="frame">
                    <BrowserFrame
                      shot={shot}
                      liveUrl={liveUrl}
                      onOpen={() => openAt(i + 3)}
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      <ImageLightbox
        images={screenshots}
        index={activeIndex}
        open={open}
        onClose={close}
        onIndexChange={setActiveIndex}
      />
    </>
  );
}
