import type {
  RecruitmentContact,
  RecruitmentProcessStep,
  RecruitmentStatus,
} from "@/types";
import { placeholders } from "./site";

/**
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │  CENTRAL RECRUITMENT CONFIGURATION                                       │
 * │                                                                          │
 * │  This is the ONLY file that needs to change for each recruitment period.  │
 * │  Update `status`, the dates, `eligibility`, `contact`, and                 │
 * │  `applicationUrl` below, plus the stages in `recruitmentProcess`.          │
 * └──────────────────────────────────────────────────────────────────────────┘
 *
 * `status` controls the whole conversion funnel (PRD section 13):
 *
 *   "open"     → 🟢 OPEN RECRUITMENT      → APPLY NOW button is active
 *   "upcoming" → 🟡 COMING SOON           → button replaced by a notice
 *   "closed"   → ⚪ RECRUITMENT CLOSED     → applications are closed
 *
 * The recruitment period, the deadline, the eligibility requirements, the
 * selection stages, the contact person, and the application URL below are
 * official information supplied by the MERSI team. Everything still written as
 * `[...]` is a deliberate placeholder: per PRD section 31 the site must never
 * fabricate requirements or links, so replace those before publishing.
 *
 * `deadline` and `deadlineIso` describe the same moment and must be updated
 * together — the first is what visitors read, the second drives the live
 * countdown.
 */
export const recruitment = {
  status: "open" as RecruitmentStatus,

  /** Headline used in the recruitment + final CTA sections. */
  title: "Open Recruitment MERSI",

  /** Recruitment period, as announced by the MERSI team. */
  period: "2026/2027",

  /** Application deadline, as shown to visitors. */
  deadline: "30 September 2026, 23:59 WITA",

  /**
   * The same deadline in machine-readable ISO 8601 form, used by the live
   * countdown (`components/ui/RecruitmentCountdown.tsx`).
   *
   * The `+08:00` offset pins it to WITA (Central Indonesia Time) rather than to
   * the visitor's own clock, so the countdown reaches zero at 23:59 local time
   * for everyone. A value that cannot be parsed disables the countdown instead
   * of showing an invented date.
   */
  deadlineIso: "2026-09-30T23:59:00+08:00",

  /**
   * Who is eligible to apply — one entry per requirement, rendered as a bullet
   * list. Kept as a list even for a single requirement, so the layout never
   * changes shape between recruitment periods.
   */
  eligibility: [
    "Student of Information Systems Undiksha",
    "Semester 1 or Semester 3",
  ],

  /** e.g. "3 designers, 2 copywriters, 1 QA/QC" */
  positionsAvailable: placeholders.positionsAvailable,

  /**
   * Recruitment contact person. `whatsapp` is the official number in its
   * display form (`+62 …`); `getWhatsAppUrl()` turns it into a `wa.me` link.
   * Set it to `null` to remove the WhatsApp button again.
   */
  contact: {
    name: "Putu Dhanu Driya",
    whatsapp: "+62 877-6295-1844",
  } satisfies RecruitmentContact,

  /**
   * External recruitment form (official Google Form link).
   *
   * Can also be supplied / overridden at build time via the
   * `NEXT_PUBLIC_APPLICATION_URL` environment variable — see `.env.example`.
   * Keep the public `…/viewform` link here (not the `?usp=publish-editor`
   * preview URL from the Google Forms editor).
   */
  applicationUrl:
    process.env.NEXT_PUBLIC_APPLICATION_URL ||
    "https://docs.google.com/forms/d/e/1FAIpQLSfYyXAz6tX21-ZVG9IkE1UutNwzRtSxj_olcvsHT3cvjok4Vw/viewform",

  /** Short supporting copy under the section heading. */
  supportingCopy:
    "We're looking for creative, curious, responsible, and passionate students who want to learn, collaborate, and contribute.",
} as const;

/** Copy shown for each recruitment state (PRD section 13). */
export const recruitmentStatusCopy: Record<
  RecruitmentStatus,
  {
    emoji: string;
    label: string;
    /** Colour token name used for the status pill. */
    tone: "success" | "warning" | "neutral";
    message: string;
    ctaEnabled: boolean;
  }
> = {
  open: {
    emoji: "🟢",
    label: "OPEN RECRUITMENT",
    tone: "success",
    message: "Applications are open. We'd love to hear from you.",
    ctaEnabled: true,
  },
  upcoming: {
    emoji: "🟡",
    label: "COMING SOON",
    tone: "warning",
    message:
      "Recruitment hasn't opened yet. Check back here or follow our social media for the announcement.",
    ctaEnabled: false,
  },
  closed: {
    emoji: "⚪",
    label: "RECRUITMENT CLOSED",
    tone: "neutral",
    message: "Applications for this recruitment period are currently closed.",
    ctaEnabled: false,
  },
};

/**
 * The recruitment / selection stages, in order (PRD section 14).
 *
 * Rendered twice: as a compact list inside the recruitment details and as the
 * full timeline in the "How the Selection Works" section.
 */
export const recruitmentProcess: RecruitmentProcessStep[] = [
  {
    step: "01",
    emoji: "📝",
    title: "Application",
    description: "Submit your application through the official recruitment form.",
  },
  {
    step: "02",
    emoji: "🔎",
    title: "Administrative & Portfolio Screening",
    description: "Your application documents and portfolio are reviewed.",
  },
  {
    step: "03",
    emoji: "💬",
    title: "Interview & Mini Challenge",
    description:
      "Candidates who pass the screening continue to an interview and a mini challenge.",
  },
  {
    step: "04",
    emoji: "🎉",
    title: "Announcement",
    description: "The selected candidates are announced.",
  },
];
