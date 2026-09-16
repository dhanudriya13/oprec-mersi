import type { Benefit, MissionValue, WorkflowStep } from "@/types";

/** "What We Do" , the four MERSI values (PRD section 8). */
export const missionValues: MissionValue[] = [
  {
    id: "communicate",
    title: "Communicate",
    description: "Turn information into stories that people understand.",
    icon: "megaphone",
  },
  {
    id: "create",
    title: "Create",
    description: "Produce meaningful and engaging digital content.",
    icon: "sparkles",
  },
  {
    id: "represent",
    title: "Represent",
    description:
      "Showcase the identity, achievements, and opportunities of Information Systems.",
    icon: "badge",
  },
  {
    id: "connect",
    title: "Connect",
    description:
      "Help prospective students discover and connect with SIFORS Undiksha.",
    icon: "users",
  },
];

/** "From Idea to Impact" , the MERSI content workflow (PRD section 10). */
export const workflowSteps: WorkflowStep[] = [
  { id: "idea", label: "Idea", icon: "bulb" },
  { id: "copywriting", label: "Copywriting", icon: "pen" },
  { id: "design", label: "Design", icon: "palette" },
  { id: "social-media-talent", label: "Social Media Talent", icon: "person" },
  { id: "approval", label: "Approval", icon: "check" },
  { id: "publish", label: "Publish", icon: "send" },
];

/** "Why Join MERSI?" , student benefits (PRD section 11). */
export const benefits: Benefit[] = [
  {
    id: "certificate",
    title: "Official Certificate",
    description:
      "All MERSI members who complete their one-year commitment will receive a certificate from the Department of Informatics Engineering, Universitas Pendidikan Ganesha (Undiksha).",
    icon: "badge",
  },
  {
    id: "portfolio",
    title: "Build Your Portfolio",
    description:
      "Get hands-on experience working on real communication, content, and student recruitment projects.",
    icon: "layers",
  },
  {
    id: "skills",
    title: "Develop New Skills",
    description:
      "Improve your skills in copywriting, creative design, social media, communication, teamwork, and content creation.",
    icon: "sparkles",
  },
  {
    id: "teamwork",
    title: "Gain Teamwork Experience",
    description:
      "Work collaboratively with students from different backgrounds and contribute to real projects for the Information Systems Study Programme.",
    icon: "users",
  },
  {
    id: "professional-skills",
    title: "Develop Your Professional Skills",
    description:
      "Learn how to manage responsibilities, meet deadlines, communicate effectively, and work in a professional team environment.",
    icon: "shield",
  },
  {
    id: "impact",
    title: "Make an Impact",
    description:
      "Your work will help introduce the Information Systems Study Programme to prospective students and contribute to the growth of the SIFORS community.",
    icon: "megaphone",
  },
];

export const benefitsClosingNote =
  "MERSI is more than a certificate, it's an opportunity to learn, create, contribute, and grow.";

/** About section copy (PRD section 7). */
export const about = {
  heading: "What is MERSI?",
  paragraphs: [
    "MERSI SIFORS UNDIKSHA is a student PR team dedicated to supporting the Information Systems Study Programme through creative communication, digital content, and student recruitment campaigns.",
    "MERSI brings together students with different talents,from writing and visual design to social media performance,to create meaningful and engaging communication for the Information Systems community.",
  ],
} as const;
