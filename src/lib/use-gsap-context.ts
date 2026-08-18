"use client";

import { useEffect, type DependencyList, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scoped GSAP setup with cleanup that won't fight React's unmount.
 * Prefer fromTo over from inside `animate` to avoid stale end-state recording.
 */
export function useGsapContext(
  scopeRef: RefObject<HTMLElement | null>,
  animate: (scope: HTMLElement) => void,
  deps: DependencyList = [],
) {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let ctx: gsap.Context | undefined;

    // Defer init slightly so React finishes committing the tree first
    const frame = requestAnimationFrame(() => {
      if (!scope.isConnected) return;
      ctx = gsap.context(() => animate(scope), scope);
    });

    return () => {
      cancelAnimationFrame(frame);

      if (!ctx) return;

      try {
        ScrollTrigger.getAll().forEach((trigger) => {
          const node = trigger.trigger;
          if (node instanceof Node && scope.contains(node)) {
            trigger.kill();
          }
        });
        gsap.killTweensOf(scope);
        gsap.killTweensOf(scope.querySelectorAll("*"));
        ctx.revert();
      } catch {
        // Ignore DOM races during fast route transitions / Strict Mode remounts
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- caller controls deps
  }, deps);
}
