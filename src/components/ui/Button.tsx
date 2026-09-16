"use client";

import type { MouseEventHandler, ReactNode } from "react";
import { Icon } from "./Icon";
import { track, type AnalyticsEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "inverted" | "invertedOutline";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  analyticsEvent?: AnalyticsEvent;
  className?: string;
  /** Id of a helper element describing the button, e.g. a "link pending" note. */
  "aria-describedby"?: string;
}

interface LinkProps extends BaseProps {
  href: string;
  /** Opens in a new tab (external destinations only). */
  external?: boolean;
  disabled?: boolean;
}

interface ActionProps extends BaseProps {
  href?: undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: "button" | "submit";
}

type ButtonProps = LinkProps | ActionProps;

const variants: Record<Variant, string> = {
  /* Light gold needs a deeper gold outline, otherwise the button edge
     disappears against the white page. The shimmer sweep is reserved for the
     primary action, so the eye is never pulled in two directions at once. */
  primary:
    "btn-shimmer border border-primary-edge/70 bg-primary text-primary-contrast shadow-sm hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-md",
  secondary:
    "border border-border bg-surface-raised text-text hover:-translate-y-0.5 hover:border-primary-edge hover:text-primary-ink",
  ghost: "text-text hover:bg-surface",
  /* For use on top of a light gold band. */
  inverted:
    "btn-shimmer btn-shimmer-gold border border-primary-contrast/25 bg-background text-primary-ink shadow-sm hover:-translate-y-0.5 hover:shadow-md",
  invertedOutline:
    "border border-primary-contrast/40 text-primary-contrast hover:-translate-y-0.5 hover:bg-primary-contrast/10",
};

const sizes: Record<Size, string> = {
  sm: "h-9 gap-1.5 px-4 text-sm",
  md: "h-11 gap-2 px-5 text-[0.9375rem]",
  lg: "h-13 gap-2.5 px-7 text-base",
};

const base =
  "inline-flex select-none items-center justify-center rounded-full font-semibold tracking-[-0.01em] transition-[background-color,border-color,color,box-shadow,transform] duration-200 will-change-transform active:scale-[0.98] active:duration-75";

/* A disabled CTA gets its own deliberate, inert treatment rather than simply
   fading out, so it never looks like a rendering glitch , and never looks
   clickable. */
const disabledVariants: Record<Variant, string> = {
  primary: "border border-border bg-neutral-soft text-muted",
  secondary: "border border-border bg-surface text-muted",
  ghost: "text-muted",
  inverted: "border border-primary-contrast/30 text-primary-contrast/65",
  invertedOutline: "border border-primary-contrast/20 text-primary-contrast/55",
};

const disabledClasses = "cursor-not-allowed shadow-none active:scale-100";

/**
 * Shared call-to-action component.
 *
 * - `href` + `external` renders a real `<a target="_blank" rel="noopener">`.
 * - `href` renders an in-page anchor (`#section`).
 * - no `href` renders a `<button>`.
 * - `disabled` keeps the label visible but removes the interaction, which is
 *   what the recruitment section needs while the application link is pending.
 */
export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    withArrow = false,
    analyticsEvent,
    className,
  } = props;

  const describedBy = props["aria-describedby"];
  const disabled = props.disabled ?? false;

  const classes = cn(
    base,
    disabled ? disabledVariants[variant] : variants[variant],
    sizes[size],
    disabled && disabledClasses,
    className,
  );

  const content = (
    <>
      {children}
      {withArrow && (
        <Icon
          name="arrowRight"
          className={cn(
            "size-[1.05em] transition-transform duration-300",
            !disabled && "group-hover/btn:translate-x-1 group-hover/btn:scale-110",
          )}
        />
      )}
    </>
  );

  // Disabled link → render an inert button so no navigation can happen.
  if (disabled) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        aria-describedby={describedBy}
        className={classes}
      >
        {content}
      </button>
    );
  }

  if (props.href !== undefined) {
    const { href, external } = props;
    const opensNewTab = external || /^https?:/i.test(href);

    return (
      <a
        href={href}
        className={cn("group/btn", classes)}
        aria-describedby={describedBy}
        onClick={() => analyticsEvent && track(analyticsEvent)}
        {...(opensNewTab
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {content}
        {opensNewTab && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }

  const { onClick, type = "button" } = props;

  return (
    <button
      type={type}
      onClick={(event) => {
        if (analyticsEvent) track(analyticsEvent);
        onClick?.(event);
      }}
      aria-describedby={describedBy}
      className={cn("group/btn", classes)}
    >
      {content}
    </button>
  );
}
