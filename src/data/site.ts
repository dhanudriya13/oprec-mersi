import type { NavLink, SocialLink } from "@/types";

/**
 * Site-wide identity + navigation configuration.
 *
 * NOTE ON THE NAME "MERSI"
 * ------------------------
 * The official meaning / acronym expansion of "MERSI" has NOT been supplied by
 * the programme. Per `prd.md` section 7 the expansion must not be invented, so
 * it is intentionally absent from this website.
 */
export const site = {
  name: "MERSI",
  fullName: "MERSI SIFORS UNDIKSHA",
  programme: "Information Systems Study Programme",
  programmeIndonesian: "Program Studi Sistem Informasi",
  university: "Universitas Pendidikan Ganesha (Undiksha)",
  tagline: "Create. Communicate. Represent.",
  shortDescription:
    "Student PR Team — Information Systems Study Programme",
  /**
   * Canonical production URL, used for canonical tags, `sitemap.xml`,
   * `robots.txt` and Open Graph URLs.
   *
   * Set `NEXT_PUBLIC_SITE_URL` in your hosting environment (e.g. Vercel) or
   * edit the fallback below before deploying to your own domain.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://mersi-sifors.vercel.app",
  locale: "id_ID",
  /** Kept in one place so it stays accurate every year. */
  copyrightYear: 2026,
} as const;

export const seo = {
  title: "MERSI SIFORS UNDIKSHA — Create. Communicate. Represent.",
  description:
    "Discover MERSI SIFORS UNDIKSHA, the student PR team supporting the Information Systems Study Programme through creative communication, digital content, and student recruitment.",
  keywords: [
    "MERSI SIFORS Undiksha",
    "Sistem Informasi Undiksha",
    "Information Systems Undiksha",
    "SIFORS Undiksha",
    "recruitment SIFORS",
    "penerimaan mahasiswa Sistem Informasi Undiksha",
    "MERSI",
    "open recruitment mahasiswa",
  ],
} as const;

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Teams", href: "#teams" },
  { label: "Why Join", href: "#why-join" },
  { label: "Recruitment", href: "#recruitment" },
  { label: "FAQ", href: "#faq" },
];

/**
 * Official social media URLs must only be inserted after they have been
 * provided and verified (PRD sections 16 and 31). `null` renders a
 * non-interactive, clearly-marked placeholder instead of a broken link.
 */
export const socialLinks: SocialLink[] = [
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/is_undiksha/?hl=en",
    icon: "instagram",
  },
  {
    id: "sifors",
    label: "Website SIFORS",
    href: "https://is.undiksha.ac.id",
    icon: "globe",
  },
];

/** Placeholder tokens used across the site until official data is provided. */
export const placeholders = {
  applicationUrl: "[APPLICATION URL]",
  recruitmentDeadline: "[RECRUITMENT DEADLINE]",
  eligibility: "[ELIGIBILITY REQUIREMENTS]",
  contactPerson: "[CONTACT PERSON]",
  instagramUrl: "[INSTAGRAM URL]",
  officialLogo: "[OFFICIAL LOGO]",
  brandColors: "[OFFICIAL BRAND COLORS]",
  recruitmentPeriod: "[RECRUITMENT PERIOD]",
  positionsAvailable: "[NUMBER OF POSITIONS]",
  selectionProcess: "[SELECTION PROCESS]",
  timeCommitment: "[TIME COMMITMENT]",
} as const;
