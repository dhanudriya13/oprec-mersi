import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Adds a subtle lift + border highlight on hover. */
  interactive?: boolean;
  /** Renders a stronger, tinted surface (used for the primary "Join" card). */
  highlighted?: boolean;
  /**
   * Tracks the pointer with a soft gold highlight. Defaults to `interactive`,
   * because that is where the visitor already expects a reaction , set it
   * explicitly to add the effect to a static card, or to switch it off.
   */
  spotlight?: boolean;
}

/**
 * Rounded, subtly bordered surface used for essentially every block of
 * content. Rounded cards + restrained borders are the core of the visual
 * language described in PRD section 17.
 *
 * Cards are also the main hover surface of the site: they lift, their border
 * warms up, and their icon leans, so the whole card reads as one interactive
 * object (PRD section 21, "card hover").
 */
export function Card({
  children,
  className,
  interactive = false,
  highlighted = false,
  spotlight = interactive,
}: CardProps) {
  return (
    <div
      data-spotlight={spotlight ? "" : undefined}
      className={cn(
        "group/card relative rounded-3xl border border-border bg-surface-raised p-6 sm:p-7",
        spotlight && "card-spotlight",
        highlighted && "bg-primary-soft border-primary-edge/40",
        interactive &&
          "transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-primary-edge/60 hover:shadow-[0_18px_40px_-26px_rgba(120,92,12,0.45)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Small round icon container used inside cards. */
export function CardIcon({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-2xl bg-primary-soft text-primary-ink transition-transform duration-300 group-hover/card:-rotate-3 group-hover/card:scale-105",
        className,
      )}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}
