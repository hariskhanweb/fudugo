import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function setLenisInstance(instance: Lenis | null) {
  lenisInstance = instance;
}

export function getLenisInstance() {
  return lenisInstance;
}

/** Pause smooth scrolling (modals, drawers, lightboxes). */
export function stopLenis() {
  lenisInstance?.stop();
}

/** Resume smooth scrolling after a lock. */
export function startLenis() {
  lenisInstance?.start();
}
