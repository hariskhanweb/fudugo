"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { startLenis, stopLenis } from "@/lib/lenis-control";
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
  const [visible, setVisible] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  const current = images[index];
  const count = images.length;
  const canNavigate = count > 1;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      setVisible(false);
      return;
    }

    stopLenis();

    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    const scrollbarGap =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarGap > 0) {
      document.body.style.paddingRight = `${scrollbarGap}px`;
    }

    const enterId = window.requestAnimationFrame(() => setVisible(true));
    const focusId = window.requestAnimationFrame(() => {
      closeBtnRef.current?.focus({ preventScroll: true });
    });

    return () => {
      window.cancelAnimationFrame(enterId);
      window.cancelAnimationFrame(focusId);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
      startLenis();
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

  const goPrev = useCallback(() => {
    onIndexChange((index - 1 + count) % count);
  }, [index, count, onIndexChange]);

  const goNext = useCallback(() => {
    onIndexChange((index + 1) % count);
  }, [index, count, onIndexChange]);

  const onTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current == null || !canNavigate) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return;
    if (delta > 0) goPrev();
    else goNext();
  };

  if (!mounted || !open || !current) return null;

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-100 flex flex-col",
        "pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))]",
        "pl-[max(0.5rem,env(safe-area-inset-left))] pr-[max(0.5rem,env(safe-area-inset-right))]",
        "sm:items-center sm:justify-center sm:p-6",
        "transition-opacity duration-300 ease-out",
        visible ? "opacity-100" : "opacity-0",
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button
        type="button"
        aria-label="Close lightbox"
        className="absolute inset-0 cursor-pointer bg-black/92 backdrop-blur-xs outline-hidden"
        onClick={onClose}
      />

      <div
        className={cn(
          "relative z-10 flex h-full min-h-0 w-full flex-col gap-3 sm:h-auto sm:max-h-[min(92dvh,56rem)] sm:max-w-6xl sm:gap-4",
          "transition-[opacity,transform] duration-300 ease-out",
          visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
        )}
      >
        <div className="flex shrink-0 items-center justify-between gap-3 px-1 text-white/70 sm:gap-4 sm:px-0">
          <p
            id={titleId}
            className="min-w-0 truncate font-sans text-sm sm:text-[15px]"
          >
            {current.caption || current.alt}
          </p>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <span className="font-mono text-xs tabular-nums text-white/55">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(count).padStart(2, "0")}
            </span>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors outline-hidden touch-manipulation hover:bg-white/12 focus-visible:ring-2 focus-visible:ring-white/40"
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

        <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl border border-white/10 bg-black/50 sm:flex-none sm:rounded-2xl sm:shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)]">
          <div
            key={index}
            className="lightbox-image-enter relative h-full min-h-[55dvh] w-full sm:aspect-video sm:min-h-0"
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              priority
              sizes="100vw"
              className="object-contain object-center"
              draggable={false}
            />
          </div>

          {canNavigate ? (
            <>
              <button
                type="button"
                onClick={goPrev}
                className={cn(
                  "absolute top-1/2 left-2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-xs transition-colors outline-hidden touch-manipulation",
                  "hover:bg-black/70 focus-visible:ring-2 focus-visible:ring-white/40 sm:left-4",
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
                  "absolute top-1/2 right-2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-xs transition-colors outline-hidden touch-manipulation",
                  "hover:bg-black/70 focus-visible:ring-2 focus-visible:ring-white/40 sm:right-4",
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
          <div className="mx-auto flex w-full max-w-full shrink-0 gap-2 overflow-x-auto overscroll-contain px-1 pb-1 scrollbar-none sm:w-auto sm:px-0">
            {images.map((image, i) => (
              <button
                key={`${image.src}-${i}`}
                type="button"
                onClick={() => onIndexChange(i)}
                aria-label={`View image ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "relative h-12 w-16 shrink-0 cursor-pointer overflow-hidden rounded-lg border transition-opacity outline-hidden touch-manipulation focus-visible:ring-2 focus-visible:ring-white/40 sm:h-14 sm:w-20",
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
                  draggable={false}
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
