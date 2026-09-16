"use client";

import { Button } from "./Button";
import { Icon } from "./Icon";
import { getWhatsAppUrl } from "@/lib/recruitment";

interface WhatsAppButtonProps {
  phone: string | null;
  label?: string;
  size?: "sm" | "md" | "lg";
  variant?: "secondary" | "invertedOutline";
  className?: string;
}

/**
 * Secondary conversion point (PRD sections 12, 13): lets a prospective
 * applicant ask the recruitment contact a question instead of abandoning the
 * form.
 *
 * The number comes from the central recruitment config. While it is still a
 * `[CONTACT PERSON]` placeholder, `getWhatsAppUrl()` returns `null` and the
 * button is not rendered at all , the site never links to a chat that cannot
 * open (PRD section 31).
 */
export function WhatsAppButton({
  phone,
  label = "Chat on WhatsApp",
  size = "sm",
  variant = "secondary",
  className,
}: WhatsAppButtonProps) {
  const href = getWhatsAppUrl(phone);
  if (!href) return null;

  return (
    <Button
      href={href}
      external
      size={size}
      variant={variant}
      className={className}
      analyticsEvent="whatsapp_click"
    >
      <Icon name="whatsapp" className="size-[1.05em]" />
      {label}
    </Button>
  );
}
