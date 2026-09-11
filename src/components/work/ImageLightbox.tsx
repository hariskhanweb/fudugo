"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import type { ProjectScreenshot } from "@/types";

type ImageLightboxProps = {
  images: ProjectScreenshot[];
  index: number;
  open: boolean;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export default function ImageLightbox({
  images,
  index,
  open,
  onClose,
  onIndexChange,
}: ImageLightboxProps) {
  const titleId = useId();
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const prevIndexRef = useRef(index);

  const current = images[index];
  const count = images.length;
  const canNavigate = count > 1;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const root = rootRef.current;
    const stage = stageRef.current;

    if (root && stage && !reduceMotion) {
      gsap.fromTo(
        root,
        { opacity: 0 },
        { opacity: 1, duration: 0.28, ease: "power2.out" },
      );
      gsap.fromTo(
        stage,
        { opacity: 0, y: 18, scale: 0.985 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out" },
      );
    }

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (!canNavigate) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onIndexChange((index + 1) % count);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onIndexChange((index - 1 + count) % count);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, onIndexChange, index, count, canNavigate]);

  useEffect(() => {
    if (!open || !stageRef.current) return;
    if (prevIndexRef.current === index) return;
    prevIndexRef.current = index;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    gsap.fromTo(
      stageRef.current,
      { opacity: 0.55, y: 8 },
      { opacity: 1, y: 0, duration: 0.26, ease: "power2.out" },
    );
  }, [index, open]);

  const goPrev = useCallback(() => {
    onIndexChange((index - 1 + count) % count);
  }, [index, count, onIndexChange]);

  const goNext = useCallback(() => {
    onIndexChange((index + 1) % count);
  }, [index, count, onIndexChange]);

  if (!mounted || !open || !current) return null;

  return createPortal(
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onWheel={(event) => event.preventDefault()}
    >
      <button
        type="button"
        aria-label="Close lightbox"
        className="absolute inset-0 cursor-pointer bg-black/88 backdrop-blur-xs outline-hidden"
        onClick={onClose}
      />

      <div
        ref={stageRef}
        className="relative z-10 flex w-full max-w-6xl flex-col gap-4"
      >
        <div className="flex items-center justify-between gap-4 text-white/70">
          <p
            id={titleId}
            className="min-w-0 truncate font-sans text-sm sm:text-[15px]"
          >
            {current.caption || current.alt}
          </p>
          <div className="flex shrink-0 items-center gap-3">
            <span className="font-mono text-xs tabular-nums text-white/55">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(count).padStart(2, "0")}
            </span>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors outline-hidden hover:bg-white/12 focus-visible:ring-2 focus-visible:ring-white/40"
              aria-label="Close"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
                <path
                  d="M4 4l8 8M12 4l-8 8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)]">
          <div className="relative aspect-16/10 w-full sm:aspect-video">
            <Image
              src={current.src}
              alt={current.alt}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1152px"
              className="object-contain object-center"
            />
          </div>

          {canNavigate ? (
            <>
              <button
                type="button"
                onClick={goPrev}
                className={cn(
                  "absolute top-1/2 left-3 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-xs transition-colors outline-hidden",
                  "hover:bg-black/65 focus-visible:ring-2 focus-visible:ring-white/40 sm:left-4",
                )}
                aria-label="Previous image"
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
                  <path
                    d="M10 3 5 8l5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={goNext}
                className={cn(
                  "absolute top-1/2 right-3 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-xs transition-colors outline-hidden",
                  "hover:bg-black/65 focus-visible:ring-2 focus-visible:ring-white/40 sm:right-4",
                )}
                aria-label="Next image"
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
                  <path
                    d="m6 3 5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </>
          ) : null}
        </div>

        {canNavigate ? (
          <div className="mx-auto flex max-w-full gap-2 overflow-x-auto pb-1">
            {images.map((image, i) => (
              <button
                key={`${image.src}-${i}`}
                type="button"
                onClick={() => onIndexChange(i)}
                aria-label={`View image ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "relative h-14 w-20 shrink-0 cursor-pointer overflow-hidden rounded-lg border transition-opacity outline-hidden focus-visible:ring-2 focus-visible:ring-white/40",
                  i === index
                    ? "border-white/55 opacity-100"
                    : "border-white/10 opacity-45 hover:opacity-80",
                )}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}
