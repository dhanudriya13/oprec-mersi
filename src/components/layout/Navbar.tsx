"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ApplyButton } from "@/components/ui/ApplyButton";
import { Icon } from "@/components/ui/Icon";
import { navLinks, site } from "@/data/site";
import { getRecruitmentState } from "@/lib/recruitment";
import { cn } from "@/lib/utils";

const sectionIds = navLinks.map((link) => link.href.replace("#", ""));

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLSpanElement | null>(null);

  const recruitmentState = getRecruitmentState();

  /* Highlight the section currently in view. */
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setIsScrolled(window.scrollY > 8);

      // Reading progress. Written straight to the DOM instead of into state:
      // scrolling must never cause a React render.
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollable > 0
          ? Math.min(1, Math.max(0, window.scrollY / scrollable))
          : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }

      // Matches the sections' `scroll-mt-24` (96px) so a section becomes
      // "current" as soon as an anchor scroll settles on it.
      const offset = 100;
      let current: string | null = null;
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;
        if (element.getBoundingClientRect().top - offset <= 0) current = id;
      }
      setActiveSection(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const closeMenu = useCallback((returnFocus = false) => {
    setIsOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  /* Close on Escape, and prevent the page behind the panel from scrolling. */
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu(true);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeMenu]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        isScrolled || isOpen
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="shell flex h-18 items-center justify-between gap-4">
        {/* Wordmark — replace with [OFFICIAL LOGO] once supplied. */}
        <a
          href="#top"
          className="group flex items-center gap-3 rounded-xl py-2"
          onClick={() => closeMenu()}
        >
          <span
            className="flex size-10 items-center justify-center rounded-2xl border border-primary-edge/60 bg-primary text-[1.05rem] font-extrabold text-primary-contrast shadow-sm transition-transform duration-300 group-hover:-rotate-6"
            aria-hidden="true"
          >
            M
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[1.05rem] font-extrabold tracking-[-0.02em] text-text">
              {site.name}
            </span>
            <span className="text-[0.6875rem] font-semibold tracking-[0.14em] text-muted uppercase">
              SIFORS Undiksha
            </span>
          </span>
        </a>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "group/link relative inline-flex h-10 items-center rounded-full px-4 text-[0.9375rem] font-medium transition-colors duration-200",
                      isActive
                        ? "text-primary-ink"
                        : "text-muted hover:bg-surface hover:text-text",
                    )}
                  >
                    {link.label}
                    {/* Grows out from the label on hover, and stays put on the
                        section currently in view. */}
                    <span
                      className={cn(
                        "absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-primary-edge transition-[transform,opacity] duration-300",
                        isActive
                          ? "scale-x-100 opacity-100"
                          : "scale-x-0 opacity-0 group-hover/link:scale-x-100 group-hover/link:opacity-60",
                      )}
                      aria-hidden="true"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ApplyButton
              size="sm"
              label="Apply Now"
              describedBy={
                recruitmentState.canApply ? undefined : "navbar-apply-note"
              }
            />
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-2xl border border-border bg-surface-raised text-text transition-colors duration-200 hover:border-primary-edge/60 hover:text-primary-ink lg:hidden"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((open) => !open)}
          >
            <Icon name={isOpen ? "close" : "menu"} className="size-6" />
          </button>
        </div>
      </div>

      {/* Reading progress. Decorative: the scroll position is already exposed
          by the browser and the sections. */}
      <span
        ref={progressRef}
        className={cn(
          "progress-bar pointer-events-none absolute inset-x-0 -bottom-px h-0.5 bg-primary-edge/70 transition-opacity duration-300",
          isScrolled ? "opacity-100" : "opacity-0",
        )}
        aria-hidden="true"
      />

      {/* Explains the disabled Apply button to assistive technology. */}
      {!recruitmentState.canApply && (
        <span id="navbar-apply-note" className="sr-only">
          The application link is not available yet. Recruitment status:{" "}
          {recruitmentState.label}.
        </span>
      )}

      {/* Mobile panel. It stays in the DOM so it can animate open and closed —
          a `hidden` element cannot transition — and is marked `inert` while
          collapsed, which keeps it out of the tab order and away from screen
          readers without a second source of truth. */}
      <div
        id="mobile-navigation"
        ref={panelRef}
        inert={!isOpen}
        className={cn(
          "grid overflow-hidden bg-background/95 backdrop-blur-xl transition-[grid-template-rows,opacity] duration-300 lg:hidden",
          isOpen
            ? "grid-rows-[1fr] border-t border-border opacity-100"
            : "grid-rows-[0fr] border-t-0 opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <nav aria-label="Mobile" className="shell py-4">
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => closeMenu()}
                    className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-semibold text-text transition-colors duration-200 hover:bg-surface"
                  >
                    {link.label}
                    <Icon name="arrowRight" className="size-4 text-muted" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-3 border-t border-border pt-4">
              <ApplyButton
                size="lg"
                label="Apply Now"
                className="w-full"
                describedBy="mobile-apply-note"
              />
              {!recruitmentState.canApply && (
                <p
                  id="mobile-apply-note"
                  className="mt-3 text-center text-caption text-muted"
                >
                  {recruitmentState.emoji} {recruitmentState.label} —{" "}
                  {recruitmentState.message}
                </p>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
