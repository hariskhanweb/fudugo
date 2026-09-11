"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenisInstance } from "@/lib/lenis-control";

type LenisProviderProps = {
  children: React.ReactNode;
};

export default function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      // Avoid fighting native overflow locks / fixed overlays
      autoRaf: false,
    });

    setLenisInstance(lenis);

    const onScroll = () => {
      ScrollTrigger.update();
    };

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };

    lenis.on("scroll", onScroll);
    frame = window.requestAnimationFrame(raf);

    // Recalculate after layout settles so ST + Lenis stay in sync
    const refreshId = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(refreshId);
      lenis.off("scroll", onScroll);
      setLenisInstance(null);
      lenis.destroy();
    };
  }, []);

  return children;
}
