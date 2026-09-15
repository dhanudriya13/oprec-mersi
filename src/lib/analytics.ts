"use client";

import { useEffect, useRef } from "react";

/**
 * Privacy-conscious analytics (PRD section 28).
 *
 * This module deliberately ships **no third-party scripts, no cookies and no
 * fingerprinting**. It forwards events to a single integration point:
 *
 *  1. `window.dataLayer` — if Google Tag Manager (or any compatible tag) is
 *     loaded later, the events are already there waiting.
 *  2. A `mersi:analytics` CustomEvent on `window`, so a privacy-friendly
 *     provider (Plausible, Umami, Vercel Analytics, …) can be wired up by
 *     adding one small listener without touching any component.
 *
 * Events tracked: page_view, hero_cta_click, team_section_view,
 * recruitment_section_view, apply_now_click, whatsapp_click, instagram_click.
 * The most valuable metric is the Apply CTA conversion rate.
 */
export type AnalyticsEvent =
  | "page_view"
  | "hero_cta_click"
  | "team_section_view"
  | "recruitment_section_view"
  | "apply_now_click"
  | "whatsapp_click"
  | "instagram_click";

type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function track(event: AnalyticsEvent, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;

  const detail = { event, ...payload, timestamp: Date.now() };

  try {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push(detail);
    window.dispatchEvent(
      new CustomEvent("mersi:analytics", { detail }),
    );
  } catch {
    /* Analytics must never break the page. */
  }
}

/**
 * Fires an event once, the first time the referenced element scrolls into view.
 * Falls back to firing immediately when IntersectionObserver is unavailable.
 */
export function useTrackSectionView<T extends HTMLElement>(
  event: AnalyticsEvent,
  payload?: AnalyticsPayload,
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      track(event, payload);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            track(event, payload);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(node);
    return () => observer.disconnect();
    // `payload` is intentionally not a dependency: we only ever fire once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  return ref;
}
