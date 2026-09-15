import type { ReactNode, SVGProps } from "react";
import type { IconName } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Hand-built inline SVG icons — no icon library, no extra request, no
 * layout shift. Every icon inherits `currentColor` and is hidden from
 * assistive technology, because icons here are always decorative and paired
 * with a text label.
 */
const paths: Record<IconName, ReactNode> = {
  megaphone: (
    <>
      <path d="M3 10.5v3A1.5 1.5 0 0 0 4.5 15H6l4.5 3.5v-13L6 9H4.5A1.5 1.5 0 0 0 3 10.5Z" />
      <path d="M14.5 9.4a3.5 3.5 0 0 1 0 5.2" />
      <path d="M17.4 6.8a7.2 7.2 0 0 1 0 10.4" />
    </>
  ),
  sparkles: (
    <>
      <path d="M11 3.5l1.5 4.1 4.1 1.5-4.1 1.5L11 14.7 9.5 10.6 5.4 9.1l4.1-1.5z" />
      <path d="M18 14.5l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7z" />
    </>
  ),
  badge: (
    <>
      <circle cx="12" cy="12" r="8.8" />
      <path d="m12 7.4 1.35 2.9 3.05.45-2.2 2.25.52 3.1L12 14.65 9.28 16.1l.52-3.1-2.2-2.25 3.05-.45z" />
    </>
  ),
  users: (
    <>
      <circle cx="9.2" cy="8.2" r="3.2" />
      <path d="M3.6 19.2a5.6 5.6 0 0 1 11.2 0" />
      <path d="M16.2 5.6a3.2 3.2 0 0 1 0 6.3" />
      <path d="M17.6 13.9a5.6 5.6 0 0 1 3 5" />
    </>
  ),
  pen: (
    <>
      <path d="M4 20h4.2L20.2 8 16.2 4 4 16.2z" />
      <path d="m14.4 5.8 3.8 3.8" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3.2a8.8 8.8 0 0 0 0 17.6c1.15 0 1.9-.78 1.9-1.8 0-.5-.2-.92-.52-1.24a1.75 1.75 0 0 1 1.24-2.98h1.55A4.63 4.63 0 0 0 20.8 10.1C20.8 6.25 16.86 3.2 12 3.2Z" />
      <circle cx="7.6" cy="11.8" r="1.15" />
      <circle cx="10.4" cy="7.7" r="1.15" />
      <circle cx="15.3" cy="8.2" r="1.15" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.4" />
      <path d="m15.9 15.9 4.6 4.6" />
    </>
  ),
  zoom: (
    <>
      <circle cx="11" cy="11" r="6.4" />
      <path d="m15.9 15.9 4.6 4.6" />
      <path d="M11 8.8v4.4M8.8 11h4.4" />
    </>
  ),
  bulb: (
    <>
      <path d="M9.2 18h5.6" />
      <path d="M10.2 21h3.6" />
      <path d="M12 3.2a6 6 0 0 0-3.6 10.8V18h7.2v-4A6 6 0 0 0 12 3.2Z" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3.2 8.2 4.5-8.2 4.5-8.2-4.5z" />
      <path d="m3.8 12.4 8.2 4.5 8.2-4.5" />
      <path d="m3.8 16.6 8.2 4.5 8.2-4.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.2 19 6v5.6c0 4.3-2.9 8-7 9.2-4.1-1.2-7-4.9-7-9.2V6z" />
      <path d="m9.1 12.1 2 2 4-4.1" />
    </>
  ),
  send: (
    <>
      <path d="M20.8 3.2 3.4 10.6l7.3 2.9 2.9 7.3z" />
      <path d="M10.7 13.5 20.8 3.2" />
    </>
  ),
  check: <path d="m4.8 12.6 4.9 4.9L19.4 6.8" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 7.2V12l3.1 2.1" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.4" y="5.4" width="17.2" height="15.2" rx="2.6" />
      <path d="M8 3.4v4M16 3.4v4M3.4 10.6h17.2" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="8.4" r="3.5" />
      <path d="M4.9 20.2a7.1 7.1 0 0 1 14.2 0" />
    </>
  ),
  arrowRight: (
    <>
      <path d="M4.6 12h14.2" />
      <path d="m13.2 6.4 5.6 5.6-5.6 5.6" />
    </>
  ),
  arrowDown: (
    <>
      <path d="M12 4.6v14.2" />
      <path d="m6.4 13.2 5.6 5.6 5.6-5.6" />
    </>
  ),
  external: (
    <>
      <path d="M14.2 4.4h5.4v5.4" />
      <path d="M19.6 4.4 11 13" />
      <path d="M18 14.4V18a2.6 2.6 0 0 1-2.6 2.6H6.2A2.6 2.6 0 0 1 3.6 18V8.8A2.6 2.6 0 0 1 6.2 6.2h3.4" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1.05" fill="currentColor" stroke="none" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      <path d="M9.4 8.2c-.5-.1-.9.3-.8.8.5 3 2.9 5.4 5.9 5.9.5.1.9-.3.8-.8l-.3-1.4-2-.6-.7.7c-.8-.4-1.5-1.1-1.9-1.9l.7-.7-.6-2z" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M3.4 12h17.2" />
      <path d="M12 3.4c2.3 2.4 3.4 5.4 3.4 8.6S14.3 18.2 12 20.6c-2.3-2.4-3.4-5.4-3.4-8.6S9.7 5.8 12 3.4Z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5.4" width="18" height="13.2" rx="2.6" />
      <path d="m3.9 6.9 8.1 6 8.1-6" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: (
    <>
      <path d="M6.2 6.2l11.6 11.6" />
      <path d="M17.8 6.2 6.2 17.8" />
    </>
  ),
  star: (
    <path d="m12 3.8 2.6 5.3 5.8.85-4.2 4.1 1 5.75L12 17.05 6.8 19.8l1-5.75-4.2-4.1 5.8-.85z" />
  ),
};

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  className?: string;
}

export function Icon({ name, className, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn("size-5 shrink-0", className)}
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
