import gsap from "gsap";

/** Kill tweens then revert without throwing if React already detached nodes. */
export function safeGsapRevert(
  ctx: gsap.Context,
  scope?: HTMLElement | null,
) {
  try {
    if (scope?.isConnected) {
      gsap.killTweensOf(scope);
      gsap.killTweensOf(scope.querySelectorAll("*"));
    }
    ctx.revert();
  } catch {
    // Ignore DOM races during route transitions / Strict Mode remounts
  }
}

type GlowParallaxOptions = {
  a: string;
  b: string;
};

/** Very light parallax on decorative glow layers only — no layout impact. */
export function bindSubtleGlowParallax(
  section: HTMLElement,
  { a, b }: GlowParallaxOptions,
) {
  const glowA = section.querySelector<HTMLElement>(a);
  const glowB = section.querySelector<HTMLElement>(b);
  if (!glowA || !glowB) return;

  gsap.fromTo(
    glowA,
    { y: 12 },
    {
      y: -16,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
    },
  );

  gsap.fromTo(
    glowB,
    { y: -8 },
    {
      y: 14,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
    },
  );
}

type GentleRevealOptions = {
  y?: number;
  duration?: number;
  ease?: string;
  start?: string;
};

/** One-shot fade + rise when element enters the viewport. */
export function bindGentleReveal(
  elements: Element | Element[],
  trigger: Element,
  {
    y = 16,
    duration = 0.65,
    ease = "power2.out",
    start = "top 88%",
  }: GentleRevealOptions = {},
) {
  gsap.fromTo(
    elements,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      ease,
      overwrite: "auto",
      scrollTrigger: {
        trigger,
        start,
        toggleActions: "play none none none",
      },
    },
  );
}
