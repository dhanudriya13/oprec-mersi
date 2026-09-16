"use client";

import type { ReactNode } from "react";
import type { IconName } from "@/types";
import { ApplyButton } from "@/components/ui/ApplyButton";
import { Badge } from "@/components/ui/Badge";
import { Card, CardIcon } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { PendingNotice, PlaceholderValue } from "@/components/ui/PlaceholderValue";
import { RecruitmentCountdown } from "@/components/ui/RecruitmentCountdown";
import { RecruitmentStatusPill } from "@/components/ui/RecruitmentStatusPill";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { teams } from "@/data/teams";
import { useTrackSectionView } from "@/lib/analytics";
import { getRecruitmentState } from "@/lib/recruitment";
import { isConfigured } from "@/lib/utils";

export function Recruitment() {
  const sectionRef =
    useTrackSectionView<HTMLElement>("recruitment_section_view");
  const state = getRecruitmentState();

  /**
   * Recruitment details, in reading order. Plain values render through
   * `PlaceholderValue`; eligibility, the selection stages, and the contact
  * people get structured renderings (bullet list, stage list, WhatsApp CTAs).
   */
  const details: { label: string; icon: IconName; content: ReactNode }[] = [
    {
      label: "Recruitment period",
      icon: "calendar",
      content: <PlaceholderValue value={state.period} />,
    },
    {
      label: "Application deadline",
      icon: "clock",
      content: <PlaceholderValue value={state.deadline} />,
    },
    {
      label: "Eligibility",
      icon: "person",
      content: (
        <ul className="list-disc space-y-1 pl-4 marker:text-primary-edge">
          {state.eligibility.map((requirement) => (
            <li key={requirement}>
              <PlaceholderValue value={requirement} />
            </li>
          ))}
        </ul>
      ),
    },
    {
      label: "Available positions",
      icon: "users",
      content: <PlaceholderValue value={state.positionsAvailable} />,
    },
    {
      label: "Selection process",
      icon: "layers",
      content: (
        <ol className="space-y-1.5">
          {state.selectionProcess.map((step) => (
            <li key={step.step} className="flex gap-2">
              <span aria-hidden="true">{step.emoji}</span>
              <span>{step.title}</span>
            </li>
          ))}
        </ol>
      ),
    },
    {
      label: "Recruitment contact",
      icon: "mail",
      content: (
        <ul className="space-y-4">
          {state.contacts.map((contact) => (
            <li
              key={contact.name}
              className="flex flex-wrap items-center gap-2.5"
            >
              <span className="font-semibold text-text">
                <PlaceholderValue value={contact.name} />
              </span>
              {isConfigured(contact.whatsapp) && (
                <span className="flex flex-wrap items-center gap-2">
                  <WhatsAppButton phone={contact.whatsapp} />
                  <span className="text-caption tabular-nums">
                    {contact.whatsapp}
                  </span>
                </span>
              )}
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <section
      id="recruitment"
      ref={sectionRef}
      aria-labelledby="recruitment-heading"
      className="relative scroll-mt-24 overflow-hidden border-y border-border bg-primary/25 py-20 sm:py-24 lg:py-28"
    >
      <div
        className="grid-backdrop pointer-events-none absolute inset-x-0 top-0 h-[34rem] opacity-70"
        aria-hidden="true"
      />

      <div className="shell relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* ------------------------------------------------------------------ */}
        <div>
          <Reveal variant="left">
            <SectionHeading
              eyebrow="Recruitment"
              id="recruitment-heading"
              align="left"
              title="Ready to Be Part of MERSI?"
              description={state.supportingCopy}
              className="max-w-xl"
            />

            <div className="mt-7">
              <h3 className="text-caption font-bold tracking-[0.1em] text-muted uppercase">
                Open positions
              </h3>
              <ul className="mt-4 space-y-3">
                {teams.map((team) => (
                  <li key={team.id}>
                    <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface-raised p-4 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-primary-edge/60 hover:shadow-[0_14px_30px_-24px_rgba(120,92,12,0.5)]">
                      <CardIcon className="size-10 rounded-xl">
                        <Icon name={team.icon} />
                      </CardIcon>
                      <div className="min-w-0">
                        <p className="flex items-center gap-2 text-[0.9375rem] font-bold text-text">
                          <span aria-hidden="true">{team.emoji}</span>
                          {team.name}
                        </p>
                        <p className="mt-0.5 text-sm text-muted">
                          {team.tagline}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <ApplyButton
                label="Apply Now"
                size="lg"
                className="uppercase tracking-[0.06em]"
                describedBy={state.canApply ? undefined : "recruitment-apply-note"}
              />
            </div>

            {!state.canApply && (
              <p
                id="recruitment-apply-note"
                className="mt-4 max-w-md text-sm leading-relaxed text-muted"
              >
                <span aria-hidden="true">{state.emoji} </span>
                <strong className="font-semibold text-text">
                  {state.label}.
                </strong>{" "}
                {state.message}
              </p>
            )}

            {state.canApply &&
              state.contacts.every((contact) => !isConfigured(contact.name)) && (
              <PendingNotice className="mt-4 max-w-md">
                The recruitment contact will be published here once it has been
                confirmed by the MERSI team.
              </PendingNotice>
            )}
          </Reveal>
        </div>

        {/* ------------------------------------------------------------------ */}
        <Reveal delay={120} variant="right">
          <Card spotlight className="bg-surface-raised/90 backdrop-blur-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <RecruitmentStatusPill />
              <Badge tone="outline">{state.period}</Badge>
            </div>

            <RecruitmentCountdown className="mt-5" />

            <dl className="mt-6 divide-y divide-border">
              {details.map((detail) => (
                <div key={detail.label} className="py-4 first:pt-0">
                  <dt className="flex items-center gap-2 text-sm font-semibold text-text">
                    <Icon
                      name={detail.icon}
                      className="size-4 text-primary-ink"
                    />
                    {detail.label}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-muted">
                    {detail.content}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 rounded-2xl border border-dashed border-border bg-surface p-4">
              <h3 className="text-caption font-bold tracking-[0.1em] text-muted uppercase">
                How to apply
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text">
                Complete the official MERSI recruitment form. Your application
                is submitted outside this website , we never collect applicant
                data here.
              </p>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
