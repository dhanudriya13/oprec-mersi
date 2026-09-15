import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "primary" | "outline" | "success" | "warning" | "neutral";

const tones: Record<Tone, string> = {
  primary: "bg-primary-soft text-primary-ink border-primary-edge/35",
  outline: "bg-transparent text-muted border-border",
  success: "bg-success-soft text-success border-success/25",
  warning: "bg-warning-soft text-warning border-warning/25",
  neutral: "bg-neutral-soft text-muted border-border",
};

interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}

/** Small pill label — eyebrows, tags, and status indicators. */
export function Badge({ children, tone = "primary", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-caption font-semibold tracking-[0.04em] uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Non-colour-dependent status dot: the shape/label always carries meaning. */
export function StatusDot({ tone }: { tone: Tone }) {
  const colours: Record<Tone, string> = {
    primary: "bg-primary-edge",
    outline: "bg-muted",
    success: "bg-success",
    warning: "bg-warning",
    neutral: "bg-muted",
  };

  return (
    <span
      className={cn("inline-block size-2 rounded-full", colours[tone])}
      aria-hidden="true"
    />
  );
}
