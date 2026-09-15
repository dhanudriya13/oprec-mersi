import { Card, CardIcon } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { missionValues } from "@/data/content";

export function Mission() {
  return (
    <section
      id="mission"
      aria-labelledby="mission-heading"
      className="scroll-mt-24 border-y border-border bg-primary/25 py-20 sm:py-24 lg:py-28"
    >
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="Mission"
            id="mission-heading"
            title="What We Do"
            description="Four things guide every campaign, caption, and design we publish."
          />
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {missionValues.map((value, index) => (
            <li key={value.id}>
              <Reveal delay={index * 70} variant="scale" className="h-full">
                <Card interactive className="h-full bg-surface-raised">
                  <CardIcon>
                    <Icon name={value.icon} />
                  </CardIcon>
                  <h3 className="mt-5 text-h3 font-extrabold text-text">
                    {value.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted sm:text-base">
                    {value.description}
                  </p>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
