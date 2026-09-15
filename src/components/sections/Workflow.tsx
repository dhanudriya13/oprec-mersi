import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { workflowSteps } from "@/data/content";

/**
 * "From Idea to Impact" — the content workflow (PRD section 10).
 * Renders as a horizontal pipeline on desktop and a vertical one on mobile.
 */
export function Workflow() {
  const lastIndex = workflowSteps.length - 1;

  return (
    <section
      id="workflow"
      aria-labelledby="workflow-heading"
      className="scroll-mt-24 border-y border-border bg-surface py-20 sm:py-24 lg:py-28"
    >
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="Our Process"
            id="workflow-heading"
            title="From Idea to Impact"
            description="Every piece of content goes through a collaborative process to make sure the message is clear, engaging, and ready to represent SIFORS."
          />
        </Reveal>

        <Reveal delay={100} variant="fade">
          <ol className="mt-14 grid gap-3 sm:grid-cols-2 lg:flex lg:items-stretch lg:gap-3">
            {workflowSteps.map((step, index) => (
              <li key={step.id} className="relative lg:flex-1">
                {/* Each step gets its own reveal, so the pipeline assembles
                    itself left to right as the section scrolls in. */}
                <Reveal delay={index * 80} variant="scale" className="h-full">
                  <Card spotlight className="h-full bg-surface-raised p-5 text-center sm:p-6">
                    <span
                      className="mx-auto flex size-10 items-center justify-center rounded-2xl bg-primary-soft text-primary-ink"
                      aria-hidden="true"
                    >
                      <Icon name={step.icon} />
                    </span>
                    <span className="mt-4 block text-[0.6875rem] font-bold tracking-[0.14em] text-muted uppercase">
                      Step {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-1.5 block text-base font-extrabold text-text">
                      {step.label}
                    </span>
                  </Card>

                  {index < lastIndex && (
                    <>
                      {/* Desktop connector — drifts in the direction of the
                          flow, so the row reads left to right. */}
                      <span
                        className="pointer-events-none absolute top-1/2 -right-1.5 hidden -translate-y-1/2 translate-x-1/2 text-muted lg:flex"
                        aria-hidden="true"
                      >
                        <Icon name="arrowRight" className="size-4 animate-nudge" />
                      </span>
                      {/* Mobile connector (single-column layout only) */}
                      <span
                        className="pointer-events-none absolute -bottom-1.5 left-1/2 -translate-x-1/2 translate-y-1/2 text-muted sm:hidden"
                        aria-hidden="true"
                      >
                        <Icon name="arrowDown" className="size-4 animate-bob" />
                      </span>
                    </>
                  )}
                </Reveal>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-10 text-center text-sm text-muted">
            A shared review process keeps every post accurate, on-brand, and
            ready before it goes live.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
