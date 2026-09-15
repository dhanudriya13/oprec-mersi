"use client";

import { Button } from "./Button";
import { getRecruitmentState } from "@/lib/recruitment";
import type { AnalyticsEvent } from "@/lib/analytics";

interface ApplyButtonProps {
  label?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "inverted";
  className?: string;
  /** Id of the element that explains the current recruitment status. */
  describedBy?: string;
  /** Defaults to `apply_now_click`; the hero CTA overrides it. */
  analyticsEvent?: AnalyticsEvent;
}

/**
 * The single conversion point of the whole site (PRD sections 12, 13, 21).
 *
 * It reads the central recruitment config and either:
 *  - links out to the official external recruitment form, or
 *  - renders a disabled button when recruitment is not open / the form URL has
 *    not been configured yet, so visitors can never be sent to a dead link.
 */
export function ApplyButton({
  label = "Apply Now",
  size = "md",
  variant = "primary",
  className,
  describedBy,
  analyticsEvent = "apply_now_click",
}: ApplyButtonProps) {
  const state = getRecruitmentState();

  if (state.canApply) {
    return (
      <Button
        href={state.applicationUrl}
        external
        size={size}
        variant={variant}
        className={className}
        analyticsEvent={analyticsEvent}
        withArrow
        aria-describedby={describedBy}
      >
        {label}
      </Button>
    );
  }

  return (
    <Button
      disabled
      size={size}
      variant={variant}
      className={className}
      aria-describedby={describedBy}
    >
      {label}
    </Button>
  );
}
