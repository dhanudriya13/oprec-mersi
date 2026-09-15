"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger, in milliseconds. */
  delay?: number;
  /**
   * Where the element arrives from. `up` (default) suits stacked content,
   * `left`/`right` suit side panels, `scale` suits tiles and cards, and `fade`
   * is for elements that already move on their own — e.g. an interactive card
   * whose hover lift would fight a second transform.
   *
   * The matching styles live in `globals.css` under `.reveal[data-variant]`.
   */
  variant?: RevealVariant;
}

type RevealVariant = "up" | "fade" | "left" | "right" | "scale";

/**
 * One shared IntersectionObserver for every `Reveal` on the page, rather than
 * one observer per element. Callbacks live in a WeakMap, so nothing is retained
 * after an element has been revealed.
 */
const callbacks = new WeakMap<Element, () => void>();
let sharedObserver: IntersectionObserver | null = null;

function observeOnce(element: Element, onReveal: () => void) {
  callbacks.set(element, onReveal);

  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const callback = callbacks.get(entry.target);
          if (callback) {
            callback();
            callbacks.delete(entry.target);
          }
          sharedObserver?.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
  }

  sharedObserver.observe(element);
}

/**
 * Subtle fade + rise the first time an element scrolls into view
 * (PRD section 21).
 *
 * Robustness & accessibility:
 * - The HTML always renders visible. The hidden state is only "armed" after
 *   mount, client-side, and only for elements that start below the fold — so
 *   nothing is ever hidden from no-JS users and there is no flash of content.
 * - No React state is involved, which keeps this work off the render path.
 * - `prefers-reduced-motion: reduce` disables the effect (see globals.css).
 * - Elements are unobserved as soon as they have been revealed.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      node.dataset.visible = "true";
      return;
    }

    // Already on screen (e.g. above the fold): show it, never animate it.
    const rect = node.getBoundingClientRect();
    const isInViewport =
      rect.top < (window.innerHeight || 0) && rect.bottom > 0;

    if (isInViewport) {
      node.dataset.visible = "true";
      return;
    }

    if (delay) node.style.transitionDelay = `${delay}ms`;
    node.dataset.armed = "true";

    observeOnce(node, () => {
      node.dataset.visible = "true";
    });

    return () => {
      sharedObserver?.unobserve(node);
      callbacks.delete(node);
    };
  }, [delay]);

  return (
    <div ref={ref} className={cn("reveal", className)} data-variant={variant}>
      {children}
    </div>
  );
}
