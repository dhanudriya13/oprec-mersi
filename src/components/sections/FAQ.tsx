import { Icon } from "@/components/ui/Icon";
import { PendingNotice, PlaceholderValue } from "@/components/ui/PlaceholderValue";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqItems } from "@/data/faq";

export function FAQ() {
  /**
   * FAQPage structured data. Only questions with confirmed answers are
   * included, so search engines never index placeholder content.
   */
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems
      .filter((item) => !item.pendingConfirmation)
      .map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-mt-24 border-t border-border bg-surface py-20 sm:py-24 lg:py-28"
    >
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            id="faq-heading"
            title="Questions, Answered"
            description="Everything students usually ask before applying to MERSI."
          />
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {faqItems.map((item, index) => (
            <Reveal key={item.id} delay={index * 45} variant="fade">
              <details className="group rounded-3xl border border-border bg-surface-raised px-5 py-2 transition-[border-color,box-shadow] duration-300 hover:border-primary-edge/40 hover:shadow-[0_14px_30px_-26px_rgba(120,92,12,0.5)] open:border-primary-edge/50 sm:px-6">
                <summary className="flex cursor-pointer items-center justify-between gap-4 py-3.5 [&::-webkit-details-marker]:hidden [&::marker]:content-none">
                  <h3 className="text-[0.9375rem] font-bold text-text sm:text-base">
                    {item.question}
                  </h3>
                  <span
                    className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-[transform,color,border-color] duration-300 group-open:rotate-180 group-open:border-primary-edge/60 group-open:text-primary-ink"
                    aria-hidden="true"
                  >
                    <Icon name="arrowDown" className="size-4" />
                  </span>
                </summary>

                <div className="faq-answer pb-5 pr-10">
                  {item.pendingConfirmation ? (
                    <>
                      <p className="text-sm leading-relaxed text-muted">
                        <PlaceholderValue value={item.answer} />
                      </p>
                      <PendingNotice className="mt-3">
                        This answer is still being confirmed with the MERSI
                        team. It will be published here as soon as it is
                        official.
                      </PendingNotice>
                    </>
                  ) : (
                    <p className="text-sm leading-relaxed text-muted sm:text-base">
                      {item.answer}
                    </p>
                  )}
                </div>
              </details>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-muted">
            Still have a question? Reach out to the recruitment contact on
            WhatsApp using the button in the recruitment section.
          </p>
        </Reveal>
      </div>

      <script
        type="application/ld+json"
        // Structured data is generated from local content only.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </section>
  );
}
