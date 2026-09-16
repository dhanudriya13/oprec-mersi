import type { ReactNode } from "react";
import { Badge } from "./Badge";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  /** Applied to the `h2` so sections can be labelled with aria-labelledby. */
  id?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && <Badge tone="primary">{eyebrow}</Badge>}
      <h2
        id={id}
        className="mt-5 text-h2 font-extrabold text-balance text-text"
      >
        {title}
      </h2>
      {/* A short gold rule that draws itself the first time the heading is
          revealed , it gives every section the same small "opening" beat.
          Decorative, and hidden from assistive technology. */}
      <span
        className={cn(
          "draw-center mt-5 block h-[3px] w-14 rounded-full bg-primary-edge/70",
          align === "center" && "mx-auto",
        )}
        aria-hidden="true"
      />
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
