import { Badge, StatusDot } from "./Badge";
import { getRecruitmentState } from "@/lib/recruitment";
import { cn } from "@/lib/utils";

type Tone = "success" | "warning" | "neutral" | "primary" | "outline";

interface RecruitmentStatusPillProps {
  className?: string;
  size?: "sm" | "md";
}

/**
 * Renders the current recruitment state (PRD section 13).
 *
 * The state is communicated three ways — emoji (🟢 🟡 ⚪), a dot, and the
 * written label — so it never depends on colour alone.
 */
export function RecruitmentStatusPill({
  className,
  size = "md",
}: RecruitmentStatusPillProps) {
  const state = getRecruitmentState();
  const tone = state.tone as Tone;

  return (
    <Badge
      tone={tone}
      className={cn(size === "sm" && "px-2.5 py-0.5 text-[0.6875rem]", className)}
    >
      <StatusDot tone={tone} />
      <span aria-hidden="true">{state.emoji}</span>
      <span className="sr-only">Recruitment status: </span>
      {state.label}
    </Badge>
  );
}
