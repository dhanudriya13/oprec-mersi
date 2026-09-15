import {
  recruitment,
  recruitmentProcess,
  recruitmentStatusCopy,
} from "@/data/recruitment";
import { isConfigured } from "./utils";

export type RecruitmentState = ReturnType<typeof getRecruitmentState>;

/**
 * Derives everything the UI needs from the central recruitment config.
 *
 * The Apply CTA is only actionable when the recruitment period is open **and**
 * a real application URL has been configured. Until then the site shows an
 * explicit "link pending" notice instead of a broken button (PRD sections 13
 * and 31).
 */
export function getRecruitmentState() {
  const copy = recruitmentStatusCopy[recruitment.status];
  const hasApplicationUrl = isConfigured(recruitment.applicationUrl);

  return {
    ...recruitment,
    ...copy,
    /**
     * Shared with the "How the Selection Works" timeline, so the details card
     * and the timeline always describe the same stages.
     */
    selectionProcess: recruitmentProcess,
    hasApplicationUrl,
    canApply: copy.ctaEnabled && hasApplicationUrl,
  };
}

/**
 * Turns the official contact number (`+62 877-…`) into a `wa.me` chat link.
 *
 * Returns `null` when no usable number has been configured — empty, still a
 * `[CONTACT PERSON]` placeholder, or too few digits — so the UI omits the
 * WhatsApp button instead of linking to a chat that cannot open.
 */
export function getWhatsAppUrl(
  phone: string | null | undefined,
): string | null {
  if (!isConfigured(phone)) return null;

  // wa.me expects digits only, including the country code and no leading `+`.
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) return null;

  return `https://wa.me/${digits}`;
}

/** The units displayed by the countdown, in display order. */
export type CountdownUnit = "days" | "hours" | "minutes" | "seconds";

export interface CountdownParts extends Record<CountdownUnit, number> {
  /** `true` once the deadline has passed; every unit is then `0`. */
  isExpired: boolean;
}

/**
 * Splits the time left until `deadlineIso` into whole days/hours/minutes/
 * seconds.
 *
 * Returns `null` when the value is not a usable date (for example while the
 * deadline is still a `[RECRUITMENT DEADLINE]` placeholder), so callers can
 * hide the countdown rather than display a made-up date.
 *
 * Pure and dependency-free: pass `now` in tests to make the result
 * deterministic.
 */
export function getCountdownParts(
  deadlineIso: string,
  now: number = Date.now(),
): CountdownParts | null {
  const deadline = Date.parse(deadlineIso);
  if (Number.isNaN(deadline)) return null;

  const secondsLeft = Math.floor((deadline - now) / 1000);
  if (secondsLeft <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  return {
    days: Math.floor(secondsLeft / 86_400),
    hours: Math.floor((secondsLeft % 86_400) / 3_600),
    minutes: Math.floor((secondsLeft % 3_600) / 60),
    seconds: secondsLeft % 60,
    isExpired: false,
  };
}
