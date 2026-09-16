import { ApplyButton } from "@/components/ui/ApplyButton";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { PlaceholderValue } from "@/components/ui/PlaceholderValue";
import { RecruitmentStatusPill } from "@/components/ui/RecruitmentStatusPill";
import { Reveal } from "@/components/ui/Reveal";
import { teams } from "@/data/teams";
import { site } from "@/data/site";
import { getRecruitmentState } from "@/lib/recruitment";
import { cn } from "@/lib/utils";

const headline = [
  { word: "Create.", accent: false },
  { word: "Communicate.", accent: true },
  { word: "Represent.", accent: false },
];

export function Hero() {
  const state = getRecruitmentState();

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-30 pb-20 sm:pt-34 lg:pt-38 lg:pb-28"
    >
      {/* Decorative backdrop , pure CSS, nothing to download. */}
      <div
        className="grid-backdrop animate-drift pointer-events-none absolute inset-x-0 top-0 h-[46rem]"
        aria-hidden="true"
      />

      {/* Floating shapes: a slow counterpoint to the static grid, so the top
          of the page feels alive without anything moving near the copy. */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <span className="animate-float absolute -top-8 right-[6%] size-52 rounded-full border border-primary-edge/25 sm:size-64" />
        <span className="animate-float-slow absolute top-44 left-[2%] size-24 rounded-full bg-primary/30 blur-2xl sm:size-32" />
        <span className="animate-float-slow absolute right-[24%] bottom-16 size-64 rounded-full border border-primary-edge/15" />
      </div>

      <div className="shell relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* ---------------------------------------------------------------- */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-raised/80 px-3.5 py-1.5 text-caption font-semibold tracking-[0.14em] text-muted uppercase backdrop-blur">
              <span
                className="size-1.5 rounded-full bg-primary-edge"
                aria-hidden="true"
              />
              {site.fullName}
            </span>
          </Reveal>

          <Reveal delay={60}>
            <h1
              id="hero-heading"
              className="mt-6 text-display font-extrabold text-text"
            >
              {headline.map((line, index) => (
                /* The rise and the gold sweep are two different animations, so
                   they live on two different elements: a single element can
                   only run the last `animation` declaration that wins the
                   cascade. */
                <span
                  key={line.word}
                  className="block animate-rise"
                  style={{ animationDelay: `${140 + index * 130}ms` }}
                >
                  <span className={cn(line.accent && "text-shine")}>
                    {line.word}
                  </span>
                </span>
              ))}
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              Be part of the team behind the Information Systems Study
              Programme&rsquo;s creative communication and student recruitment.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ApplyButton
                label="Join MERSI"
                size="lg"
                analyticsEvent="hero_cta_click"
                describedBy={state.canApply ? undefined : "hero-apply-note"}
              />
              <Button href="#about" variant="secondary" size="lg">
                Explore MERSI
              </Button>
            </div>
            {!state.canApply && (
              <p
                id="hero-apply-note"
                className="mt-4 max-w-md text-caption leading-relaxed text-muted"
              >
                <span aria-hidden="true">{state.emoji} </span>
                {state.message}
              </p>
            )}
          </Reveal>

          <Reveal delay={240}>
            <ul className="mt-10 flex flex-wrap gap-2.5">
              {teams.map((team) => (
                <li key={team.id}>
                  <a
                    href="#teams"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-raised px-3.5 py-2 text-sm font-semibold text-text transition-colors duration-200 hover:border-primary-edge/60 hover:text-primary-ink"
                  >
                    <span aria-hidden="true">{team.emoji}</span>
                    {team.name}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* ---------------------------------------------------------------- */}
        <Reveal delay={140} variant="right" className="lg:pl-2">
          <Card spotlight className="bg-surface-raised/90 backdrop-blur-sm">
            <div className="flex items-center justify-between gap-3">
              <RecruitmentStatusPill />
              <span className="text-caption font-semibold text-muted">
                {site.programmeIndonesian}
              </span>
            </div>

            <h2 className="mt-5 text-h3 font-extrabold text-text">
              {state.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {state.message}
            </p>

            <dl className="mt-6 divide-y divide-border border-y border-border">
              <div className="flex items-center justify-between gap-4 py-3">
                <dt className="text-sm font-medium text-muted">Period</dt>
                <dd className="text-right text-sm font-semibold text-text">
                  <PlaceholderValue value={state.period} />
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-3">
                <dt className="text-sm font-medium text-muted">Deadline</dt>
                <dd className="text-right text-sm font-semibold text-text">
                  <PlaceholderValue value={state.deadline} />
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-3">
                <dt className="text-sm font-medium text-muted">Teams</dt>
                <dd className="flex items-center gap-1.5">
                  {teams.map((team) => (
                    <span
                      key={team.id}
                      title={team.name}
                      className="text-base"
                    >
                      <span aria-hidden="true">{team.emoji}</span>
                      <span className="sr-only">{team.name}</span>
                    </span>
                  ))}
                </dd>
              </div>
            </dl>

            <a
              href="#recruitment"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-ink"
            >
              View recruitment details
              <Icon
                name="arrowRight"
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
          </Card>
        </Reveal>
      </div>

      {/* Scroll cue , decorative only. Keyboard and screen-reader users reach
          the next section through the real links above, so this is hidden from
          assistive technology. */}
      <div
        className="relative mt-16 hidden justify-center lg:flex"
        aria-hidden="true"
      >
        <span className="flex flex-col items-center gap-2 text-caption font-semibold tracking-[0.18em] text-muted uppercase">
          Scroll
          <Icon name="arrowDown" className="size-4 animate-bob" />
        </span>
      </div>
    </section>
  );
}
