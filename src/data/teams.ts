import type { Team } from "@/types";

/**
 * The three MERSI teams (PRD section 9).
 * Edit this file to update team copy , components read from here.
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
    id: "social-media-talent",
    name: "Social Media Talent",
    emoji: "🎥",
    tagline: "Bring our story to life.",
    description:
      "Social Media Talents are the people who bring MERSI's content to life. They appear in videos, Reels, and other social media content to communicate ideas, share information, and engage with our audience.",
    responsibilities: [
      "Appear in MERSI social media videos",
      "Present information and promotional content",
      "Participate in Reels and short-form video content",
      "Collaborate with the Copywriting and Creative Design teams",
      "Help create engaging and relatable content",
      "Represent the image and personality of MERSI",
    ],
    skills: [
      "good communicator",
      "camera comfortable",
      "confident & willing to grow",
      "expressive & engaging",
      "Active Participant",
      "Reliable & Responsible",
    ],
    icon: "person",
  },
];
