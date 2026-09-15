import { Badge } from "@/components/ui/Badge";
import { Card, CardIcon } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about } from "@/data/content";
import { teams } from "@/data/teams";
import { site } from "@/data/site";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-24 py-20 sm:py-24 lg:py-28"
    >
      <div className="shell grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <Reveal variant="left">
          <SectionHeading
            eyebrow="About MERSI"
            id="about-heading"
            align="left"
            title={about.heading}
            className="max-w-none"
          />

          <div className="mt-6 space-y-5">
            {about.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph.slice(0, 24)}
                className="animate-rise text-base leading-relaxed text-muted sm:text-lg"
                style={{ animationDelay: `${160 + index * 110}ms` }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-dashed border-border bg-surface p-5">
            <p className="flex items-start gap-3 text-sm leading-relaxed text-muted">
              <span className="mt-0.5 shrink-0 text-primary-ink" aria-hidden="true">
                <Icon name="badge" className="size-5" />
              </span>
              <span>
                <strong className="font-semibold text-text">Note: </strong>
                {about.nameNote}
              </span>
            </p>
          </div>

          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            <div>
              <dt className="text-caption font-bold tracking-[0.1em] text-muted uppercase">
                Programme
              </dt>
              <dd className="mt-1 text-sm font-semibold text-text">
                {site.programmeIndonesian}
              </dd>
            </div>
            <div>
              <dt className="text-caption font-bold tracking-[0.1em] text-muted uppercase">
                Institution
              </dt>
              <dd className="mt-1 text-sm font-semibold text-text">
                {site.university}
              </dd>
            </div>
            <div>
              <dt className="text-caption font-bold tracking-[0.1em] text-muted uppercase">
                Teams
              </dt>
              <dd className="mt-1 text-sm font-semibold text-text">
                {teams.length} creative teams
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={120} variant="right">
          <Card spotlight className="bg-surface p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold tracking-[0.1em] text-muted uppercase">
                Inside MERSI
              </h3>
              <Badge tone="outline">3 Teams</Badge>
            </div>

            <ul className="mt-5 space-y-3">
              {teams.map((team) => (
                <li key={team.id}>
                  <a
                    href="#teams"
                    className="group flex items-start gap-4 rounded-2xl border border-transparent bg-surface-raised p-4 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-primary-edge/60"
                  >
                    <CardIcon className="size-10 rounded-xl">
                      <Icon name={team.icon} />
                    </CardIcon>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="text-base font-bold text-text">
                          {team.name}
                        </span>
                        <span aria-hidden="true">{team.emoji}</span>
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted">
                        {team.tagline}
                      </span>
                    </span>
                    <Icon
                      name="arrowRight"
                      className="mt-2 size-4 text-muted transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-5 text-sm leading-relaxed text-muted">
              Each team owns a different part of the process — together they
              take an idea all the way to publication.
            </p>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
