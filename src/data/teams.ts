import type { Team } from "@/types";

/**
 * The three MERSI teams (PRD section 9).
 * Edit this file to update team copy — components read from here.
 */
export const teams: Team[] = [
  {
    id: "copywriting",
    name: "Copywriting",
    emoji: "✍️",
    tagline: "Words that tell our story.",
    description:
      "Responsible for developing written communication and storytelling for MERSI and SIFORS.",
    responsibilities: [
      "Social media captions",
      "Campaign copy",
      "Content concepts",
      "Scripts",
      "Student stories",
      "Event announcements",
      "Recruitment content",
    ],
    skills: [
      "Writing",
      "Storytelling",
      "Communication",
      "Content strategy",
      "Social media",
    ],
    icon: "pen",
  },
  {
    id: "creative-design",
    name: "Creative Design",
    emoji: "🎨",
    tagline: "Ideas made visible.",
    description:
      "Responsible for transforming ideas and information into engaging visual communication.",
    responsibilities: [
      "Social media graphics",
      "Instagram carousels",
      "Posters",
      "Infographics",
      "Stories",
      "Campaign visuals",
      "Recruitment materials",
    ],
    skills: [
      "Visual design",
      "Typography",
      "Layout",
      "Figma",
      "Canva",
      "Branding",
    ],
    icon: "palette",
  },
  {
    id: "qa-qc",
    name: "QA/QC",
    emoji: "🔍",
    tagline: "Every detail matters.",
    description:
      "Responsible for reviewing content before publication to ensure accuracy, consistency, and quality.",
    responsibilities: [
      "Fact checking",
      "Grammar checking",
      "Information verification",
      "Visual review",
      "Branding consistency",
      "CTA/link verification",
      "Final content review",
    ],
    skills: [
      "Attention to detail",
      "Critical thinking",
      "Communication",
      "Quality assurance",
      "Content review",
    ],
    icon: "search",
  },
];
