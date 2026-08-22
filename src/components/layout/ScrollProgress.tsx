"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      scrub: reduceMotion ? false : 0.35,
      onUpdate: (self) => {
        gsap.set(bar, { scaleX: self.progress });
      },
    });

    const onRefresh = () => {
      trigger.refresh();
    };

    window.addEventListener("resize", onRefresh);

    return () => {
      window.removeEventListener("resize", onRefresh);
      trigger.kill();
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-60 h-0.5 bg-transparent"
      aria-hidden
    >
      <div
        ref={barRef}
        className="h-full w-full bg-accent-alt will-change-transform"
      />
    </div>
  );
}
