"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import {
  getCountdownParts,
  getRecruitmentState,
  type CountdownParts,
  type CountdownUnit,
} from "@/lib/recruitment";
import { cn } from "@/lib/utils";

interface RecruitmentCountdownProps {
  className?: string;
}

const units: ReadonlyArray<{ key: CountdownUnit; label: string }> = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

/** `5` → `05`, so the digits never reflow as the value changes. */
function pad(value: number) {
  return String(value).padStart(2, "0");
}

/**
 * Live countdown to the official application deadline.
 *
 * Notes on correctness and accessibility:
 * - The target comes from `recruitment.deadlineIso`, which carries the WITA
 *   offset (`+08:00`). The countdown therefore ends at 23:59 local time for the
 *   programme, not at 23:59 on the visitor's own clock.
 * - Server and first client render both show dashes; the numbers are computed
 *   in an effect, so hydration can never mismatch.
 * - The ticking grid is `aria-hidden`: it changes every second and would be
 *   pure noise in a screen reader. The deadline itself stays in the normal
 *   flow, and the remaining time is exposed as plain, non-live text.
 * - The interval stops as soon as the deadline passes.
 * - The component renders nothing while recruitment is not open, or while the
 *   configured deadline is not a valid date.
 */
export function RecruitmentCountdown({ className }: RecruitmentCountdownProps) {
  const state = getRecruitmentState();
  const hasDeadline = !Number.isNaN(Date.parse(state.deadlineIso));

  /** `null` until the first client-side tick (see the hydration note above). */
  const [remaining, setRemaining] = useState<CountdownParts | null>(null);

  useEffect(() => {
    if (!hasDeadline) return;

    const tick = () => {
      const parts = getCountdownParts(state.deadlineIso);
      setRemaining(parts);

      // Nothing left to count down: stop rather than re-render every second.
      if (!parts || parts.isExpired) window.clearInterval(timer);
    };

    const timer = window.setInterval(tick, 1000);

    // Paint the first value right away instead of waiting a full second.
    tick();

    return () => window.clearInterval(timer);
  }, [hasDeadline, state.deadlineIso]);

  if (state.status !== "open" || !hasDeadline) return null;

  const isExpired = remaining?.isExpired ?? false;

  const remainingSummary =
    remaining && !remaining.isExpired
      ? `${remaining.days} days, ${remaining.hours} hours and ${remaining.minutes} minutes left to apply.`
      : null;

  return (
    <div
      className={cn(
        "rounded-2xl border border-primary-edge/40 bg-primary-soft p-4 sm:p-5",
        className,
      )}
    >
      <p className="flex items-center gap-2 text-caption font-bold tracking-[0.1em] text-primary-ink uppercase">
        <Icon name="clock" className="size-4" />
        {isExpired ? "Application closed" : "Application closes in"}
      </p>

      {isExpired ? (
        <p className="mt-2 text-sm leading-relaxed text-text">
          The deadline for this recruitment period has passed. Follow our social
          media to hear about the next intake.
        </p>
      ) : (
        <ul className="mt-3 grid grid-cols-4 gap-2" aria-hidden="true">
          {units.map((unit, index) => (
            <li
              key={unit.key}
              className="animate-pop rounded-xl border border-border bg-surface-raised px-1 py-2.5 text-center"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <span className="block text-lg font-extrabold tabular-nums text-text sm:text-xl">
                {remaining ? (
                  /* Keyed by value, so the digit re-mounts — and replays its
                     tick animation — only when it actually changes. */
                  <span
                    key={`${unit.key}-${remaining[unit.key]}`}
                    className="countdown-digit inline-block"
                  >
                    {pad(remaining[unit.key])}
                  </span>
                ) : (
                  "--"
                )}
              </span>
              <span className="mt-0.5 block text-[0.625rem] font-semibold tracking-[0.08em] text-muted uppercase">
                {unit.label}
              </span>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-3 text-caption leading-relaxed text-muted">
        Deadline:{" "}
        <strong className="font-semibold text-text">{state.deadline}</strong>
        {remainingSummary ? (
          <span className="sr-only"> {remainingSummary}</span>
        ) : null}
      </p>
    </div>
  );
}
