"use client";

import { Card, CardIcon } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { teams } from "@/data/teams";
import { useTrackSectionView } from "@/lib/analytics";

export function Teams() {
  const sectionRef = useTrackSectionView<HTMLElement>("team_section_view");

  return (
    <section
      id="teams"
      ref={sectionRef}
      aria-labelledby="teams-heading"
      className="scroll-mt-24 py-20 sm:py-24 lg:py-28"
    >
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="Teams"
            id="teams-heading"
            title="Find Your Role"
            description="Three teams, three ways to contribute. Pick the one that matches your strengths , or the one you want to build."
          />
        </Reveal>

        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {teams.map((team, index) => (
            <li key={team.id}>
              <Reveal delay={index * 90} variant="scale" className="h-full">
                <Card interactive className="flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <CardIcon>
                      <Icon name={team.icon} />
                    </CardIcon>
                    <span
                      className="text-2xl"
                      aria-hidden="true"
                    >
                      {team.emoji}
                    </span>
                  </div>

                  <h3 className="mt-5 text-h3 font-extrabold text-text">
                    {team.name}
                  </h3>
                  <p className="mt-1.5 text-sm font-semibold text-primary-ink">
                    {team.tagline}
                  </p>
                  <p className="mt-3.5 text-sm leading-relaxed text-muted sm:text-base">
                    {team.description}
                  </p>

                  <div className="mt-6">
                    <h4 className="text-caption font-bold tracking-[0.1em] text-muted uppercase">
                      Responsibilities
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {team.responsibilities.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <Icon
                            name="check"
                            className="mt-0.5 size-4 shrink-0 text-primary-ink"
                          />
                          <span className="text-sm leading-snug text-text">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 border-t border-border pt-5">
                    <h4 className="text-caption font-bold tracking-[0.1em] text-muted uppercase">
                      Skills you&rsquo;ll use
                    </h4>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {team.skills.map((skill) => (
                        <li key={skill}>
                          <Badge tone="outline" className="normal-case">
                            {skill}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href="#recruitment"
                    className="group mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-primary-ink"
                  >
                    Apply for {team.name}
                    <Icon
                      name="arrowRight"
                      className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                    <span className="sr-only">
                      {" "}
                      , jumps to the recruitment section
                    </span>
                  </a>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
