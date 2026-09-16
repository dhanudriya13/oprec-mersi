"use client";

import { useEffect } from "react";

/**
 * Pointer-tracked card highlights , the single piece of JavaScript behind
 * `.card-spotlight` (see `globals.css`).
 *
 * One delegated `pointermove` listener serves every card on the page: it finds
 * the closest `[data-spotlight]` element and writes the pointer position into
 * two custom properties. Cards therefore stay Server Components, no card owns
 * an event handler, and adding a new spotlight card costs nothing.
 *
 * Notes:
 * - Updates are throttled to one per animation frame, and only the two custom
 *   properties change , no layout, no React re-render.
 * - Touch and pen input is ignored: a highlight that only appears under a
 *   finger would never be seen, and would only cost work on mobile.
 * - The whole effect is skipped when the visitor asks for reduced motion.
 */
export function SpotlightTracker() {
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let card: HTMLElement | null = null;
    let pointerX = 0;
    let pointerY = 0;

    const paint = () => {
      frame = 0;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      card.style.setProperty("--spotlight-x", `${pointerX - rect.left}px`);
      card.style.setProperty("--spotlight-y", `${pointerY - rect.top}px`);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      const target = event.target;
      card =
        target instanceof Element
          ? (target.closest("[data-spotlight]") as HTMLElement | null)
          : null;

      if (!card) return;

      pointerX = event.clientX;
      pointerY = event.clientY;

      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return null;
}
