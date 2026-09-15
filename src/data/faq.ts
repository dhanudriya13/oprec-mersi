import type { FaqItem } from "@/types";

/**
 * FAQ content (PRD section 15).
 *
 * Questions whose official answers have not been supplied are kept as visible
 * placeholders with `pendingConfirmation: true`, so the site never presents
 * unverified information as fact.
 */
export const faqItems: FaqItem[] = [
  {
    id: "who-can-join",
    question: "Who can join MERSI?",
    answer:
      "Information Systems Undiksha students who are currently in semester 1 or semester 3.",
  },
  {
    id: "experience",
    question: "Do I need previous experience?",
    answer:
      "Not necessarily. We're looking for students who are willing to learn, contribute, and work as a team.",
  },
  {
    id: "multiple-teams",
    question: "Can I apply for multiple teams?",
    answer:
      "No. Each applicant can apply for one team only: Copywriting, Creative Design, or QA/QC. Please choose the team that best matches your interests, skills, and strengths. Don't worry if you're still developing your skills — we value your willingness to learn and contribute as part of the MERSI team. ✨",
  },
  {
    id: "what-will-i-do",
    question: "What will I do if I join?",
    answer:
      "It depends on the team you join. Copywriting develops captions, campaign copy, concepts, and scripts. Creative Design turns those ideas into social media graphics, carousels, posters, and infographics. QA/QC reviews every piece before publication to make sure the facts, grammar, branding, and links are correct.",
  },
  {
    id: "time-commitment",
    question: "How much time do I need to commit?",
    answer:
      "MERSI members are expected to commit to the team for one year and actively participate in the activities and responsibilities of their selected team. The workload may vary depending on ongoing projects, campaigns, and events. We understand that you also have academic responsibilities, so the team will coordinate schedules and assignments accordingly. What we value most is commitment, responsibility, communication, and consistency throughout your time with MERSI. ✨",
  },
  {
    id: "how-to-apply",
    question: "How do I apply?",
    answer:
      "Click the Apply Now button and complete the recruitment form. Your application is submitted through the official recruitment form platform.",
  },
];
