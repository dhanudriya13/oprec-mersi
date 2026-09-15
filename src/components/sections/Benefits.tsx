import { Card, CardIcon } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { benefits, benefitsClosingNote } from "@/data/content";

export function Benefits() {
  return (
    <section
      id="why-join"
      aria-labelledby="benefits-heading"
      className="scroll-mt-24 py-20 sm:py-24 lg:py-28"
    >
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="Why Join"
            id="benefits-heading"
            title="Why Join MERSI?"
            description="MERSI is a place to build real skills and a real portfolio — not just a title on your student record."
          />
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <li key={benefit.id}>
              <Reveal delay={index * 70} variant="scale" className="h-full">
                <Card interactive className="h-full">
                  <CardIcon>
                    <Icon name={benefit.icon} />
                  </CardIcon>
                  <h3 className="mt-5 text-h3 font-extrabold text-text">
                    {benefit.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted sm:text-base">
                    {benefit.description}
                  </p>
                </Card>
              </Reveal>
            </li>
          ))}

        </ul>

        <Reveal delay={benefits.length * 70} variant="fade">
          <blockquote className="mx-auto mt-12 max-w-3xl border-l-2 border-primary-edge px-6 py-1 text-center text-lg font-semibold leading-relaxed text-text sm:text-xl">
            <span aria-hidden="true">&ldquo;</span>
            {benefitsClosingNote}
            <span aria-hidden="true">&rdquo;</span>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
