/**
 * Shared domain types for the MERSI SIFORS UNDIKSHA website.
 *
 * IMPORTANT CONTENT RULE
 * ----------------------
 * Nothing in this project should contain fabricated institutional information.
 * Any fact that has not been supplied by the MERSI / SIFORS programme manager
 * must be written as a bracketed placeholder, e.g. `[APPLICATION URL]`.
 * See `prd.md` section 31 for the full list of protected content.
 */

/** Supported recruitment states (PRD section 13). */
export type RecruitmentStatus = "open" | "upcoming" | "closed";

/** Icon keys available in `components/ui/Icon.tsx`. */
export type IconName =
  | "megaphone"
  | "sparkles"
  | "badge"
  | "users"
  | "pen"
  | "palette"
  | "search"
  | "bulb"
  | "layers"
  | "shield"
  | "send"
  | "check"
  | "clock"
  | "calendar"
  | "person"
  | "arrowRight"
  | "arrowDown"
  | "external"
  | "instagram"
  | "whatsapp"
  | "globe"
  | "mail"
  | "menu"
  | "close"
  | "star"
  | "zoom";

export interface NavLink {
  label: string;
  href: string;
}

export interface MissionValue {
  id: string;
  title: string;
  description: string;
  icon: IconName;
}

export interface Team {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  responsibilities: string[];
  skills: string[];
  icon: IconName;
}

export interface WorkflowStep {
  id: string;
  label: string;
  description?: string;
  icon: IconName;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: IconName;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  /**
   * `true` when the answer still needs to be supplied by the MERSI manager.
   * Rendered with a visible "pending confirmation" notice so the site never
   * presents unverified information as fact.
   */
  pendingConfirmation?: boolean;
}

export interface RecruitmentProcessStep {
  step: string;
  /** Decorative emoji shown next to the step title (supplied by the team). */
  emoji: string;
  title: string;
  description: string;
}

/**
 * Official recruitment contact person.
 *
 * `whatsapp` holds the number in its display form (`+62 …`) or `null` while it
 * is still unknown — `getWhatsAppUrl()` converts it into a `wa.me` link and the
 * UI hides the WhatsApp button when it cannot.
 */
export interface RecruitmentContact {
  name: string;
  whatsapp: string | null;
}

export interface SocialLink {
  id: string;
  label: string;
  href: string | null;
  icon: IconName;
  /** `true` when the URL has not been provided yet and is awaiting verification. */
  pending?: boolean;
}
