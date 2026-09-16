import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { recruitmentProcess } from "@/data/recruitment";
import { cn } from "@/lib/utils";

export function RecruitmentProcess() {
  const lastIndex = recruitmentProcess.length - 1;

  return (
    <section
      id="recruitment-process"
      aria-labelledby="process-heading"
      className="scroll-mt-24 py-20 sm:py-24 lg:py-28"
    >
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="Process"
            id="process-heading"
            title="How the Selection Works"
            description="Four steps from your application to the announcement."
          />
        </Reveal>

        <ol className="mx-auto mt-14 max-w-3xl space-y-6">
          {recruitmentProcess.map((step, index) => {
            const isFinal = index === lastIndex;

            return (
              <li key={step.step} className="relative">
                {/* The reveal wraps the whole row , number, connector, card ,
                    so the timeline draws itself downward as the visitor
                    scrolls through the steps. */}
                <Reveal
                  delay={index * 60}
                  variant="left"
                  className="grid grid-cols-[3rem_1fr] items-start gap-4 sm:gap-6"
                >
                  {/* Node + connector */}
                  <div className="relative flex h-full justify-center">
                    <span
                      className={cn(
                        "z-10 flex size-12 items-center justify-center rounded-2xl text-sm font-extrabold tabular-nums",
                        isFinal
                          ? "border border-primary-edge/60 bg-primary text-primary-contrast"
                          : "border border-border bg-surface-raised text-primary-ink",
                      )}
                      aria-hidden="true"
                    >
                      {step.step}
                    </span>
                    {!isFinal && (
                      <span
                        className="draw-y absolute top-12 -bottom-6 w-px bg-border"
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  <Card highlighted={isFinal} spotlight className="p-5 sm:p-6">
                    <h3 className="text-h3 font-extrabold text-text">
                      <span className="sr-only">Step {step.step}: </span>
                      <span aria-hidden="true" className="mr-2">
                        {step.emoji}
                      </span>
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted sm:text-base">
                      {step.description}
                    </p>
                  </Card>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
