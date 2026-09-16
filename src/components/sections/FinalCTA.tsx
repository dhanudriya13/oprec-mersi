import { ApplyButton } from "@/components/ui/ApplyButton";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";
import { getRecruitmentState } from "@/lib/recruitment";

export function FinalCTA() {
  const state = getRecruitmentState();

  return (
    <section
      aria-labelledby="final-cta-heading"
      className="py-20 sm:py-24 lg:py-28"
    >
      <div className="shell">
        <Reveal variant="scale">
          <div className="relative overflow-hidden rounded-[2rem] border border-primary-edge/40 bg-primary px-6 py-14 text-primary-contrast sm:px-12 sm:py-16 lg:px-16 lg:py-20">
            {/* Decorative rings , CSS only, drifting slowly so the band feels
                alive without competing with the copy. */}
            <div
              className="animate-float-slow pointer-events-none absolute -top-24 -right-16 size-72 rounded-full border border-primary-contrast/20"
              aria-hidden="true"
            />
            <div
              className="animate-pulse-soft pointer-events-none absolute -bottom-32 -left-20 size-80 rounded-full border border-primary-contrast/15"
              aria-hidden="true"
            />

            <div className="relative max-w-3xl">
              <p className="text-caption font-bold tracking-[0.18em] uppercase opacity-80">
                {site.fullName}
              </p>

              <h2
                id="final-cta-heading"
                className="mt-5 text-h1 font-extrabold text-balance"
              >
                Create. Communicate. Contribute.
              </h2>

              <p className="mt-5 max-w-xl text-base leading-relaxed opacity-90 sm:text-lg">
                Applications take just a few minutes. Pick your team, tell us
                what you love to create, and we&rsquo;ll take it from there.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <ApplyButton
                  label="Apply Now"
                  size="lg"
                  variant="inverted"
                  className="uppercase tracking-[0.06em]"
                  describedBy={state.canApply ? undefined : "final-apply-note"}
                />
                <Button href="#teams" variant="invertedOutline" size="lg">
                  Explore the teams
                  <Icon name="arrowDown" className="size-4" />
                </Button>
              </div>

              {!state.canApply && (
                <p
                  id="final-apply-note"
                  className="mt-5 max-w-md text-sm leading-relaxed opacity-85"
                >
                  <span aria-hidden="true">{state.emoji} </span>
                  <strong className="font-semibold">{state.label}.</strong>{" "}
                  {state.message}
                </p>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
