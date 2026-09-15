import { site } from "@/data/site";
import { teams } from "@/data/teams";

/**
 * Thin ticker band (PRD section 17: "occasional playful visual elements").
 *
 * It repeats the site's own vocabulary — the tagline, the three team names,
 * the study programme — so it adds rhythm to the page without introducing a
 * single new claim. Purely decorative:
 *
 * - The whole band is `aria-hidden`, because every phrase in it already
 *   appears in real content elsewhere.
 * - The track renders the list twice and translates by exactly half its
 *   width, which is what makes the loop seamless.
 * - It pauses on hover, and `prefers-reduced-motion` stops it entirely.
 */
export function Marquee() {
  const items = [
    ...site.tagline.split(" ").filter(Boolean),
    ...teams.map((team) => `${team.emoji} ${team.name}`),
    site.programmeIndonesian,
  ];

  return (
    <section
      aria-hidden="true"
      className="relative overflow-hidden border-y border-border bg-surface py-4"
    >
      <div className="marquee-mask">
        <ul className="marquee-track flex items-center hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <li key={copy} className="flex items-center">
              {items.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="flex items-center gap-8 pr-8 text-caption font-bold tracking-[0.16em] whitespace-nowrap text-muted uppercase"
                >
                  {item}
                  <span
                    className="size-1.5 rounded-full bg-primary-edge/60"
                    aria-hidden="true"
                  />
                </span>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
