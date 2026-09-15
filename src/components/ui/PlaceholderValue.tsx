import { cn, isConfigured } from "@/lib/utils";

interface PlaceholderValueProps {
  value: string;
  className?: string;
}

/**
 * Renders official content, or — while it is still missing — a clearly marked
 * placeholder token such as `[APPLICATION URL]`.
 *
 * The distinction is never conveyed by colour alone: placeholder values keep
 * their square brackets, gain a dashed border, and expose an explanatory
 * `title`, so they can never be mistaken for real institutional information.
 */
export function PlaceholderValue({ value, className }: PlaceholderValueProps) {
  if (isConfigured(value)) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span
      className={cn("placeholder-token", className)}
      title="Pending official information from the MERSI team"
    >
      {value}
    </span>
  );
}

/**
 * Inline notice used wherever a placeholder is awaiting confirmation, so the
 * reader always understands *why* the value is missing.
 */
export function PendingNotice({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-start gap-2 text-caption leading-relaxed text-muted",
        className,
      )}
    >
      <span aria-hidden="true">ⓘ</span>
      <span>{children}</span>
    </p>
  );
}
