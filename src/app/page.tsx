import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Benefits } from "@/components/sections/Benefits";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/ui/Marquee";
import { Mission } from "@/components/sections/Mission";
import { Recruitment } from "@/components/sections/Recruitment";
import { RecruitmentProcess } from "@/components/sections/RecruitmentProcess";
import { SpotlightTracker } from "@/components/ui/SpotlightTracker";
import { Teams } from "@/components/sections/Teams";
import { Workflow } from "@/components/sections/Workflow";
import { site } from "@/data/site";

export default function HomePage() {
  /**
   * Organization structured data. Nothing here is invented , the name, the
   * programme, and the tagline all come from the project brief.
   */
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.fullName,
    alternateName: site.name,
    description: site.shortDescription,
    slogan: site.tagline,
    url: site.url,
    parentOrganization: {
      "@type": "CollegeOrUniversity",
      name: site.university,
    },
  };

  return (
    <>
      <Navbar />

      <main id="main" className="flex-1">
        <Hero />
        <Marquee />
        <About />
        <Mission />
        <Teams />
        <Workflow />
        <Benefits />
        <Recruitment />
        <RecruitmentProcess />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />

      {/* Adds the pointer-tracked highlight to every `data-spotlight` card.
          One listener for the whole page, no visual output of its own. */}
      <SpotlightTracker />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
