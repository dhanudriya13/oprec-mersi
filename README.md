# MERSI SIFORS UNDIKSHA — Website

Student PR & recruitment landing page for **MERSI SIFORS UNDIKSHA**, the student PR team
of the Information Systems Study Programme (SIFORS), Universitas Pendidikan Ganesha.

Built from `prd.md`. Single-page, statically rendered, gold-on-white, fully responsive.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · no UI library · no CMS.

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm run lint     # eslint
```

## ⚠️ Nothing is fabricated

Per `prd.md` section 31, the site **must not invent institutional information**. Anything not
supplied by the programme is rendered as a visible placeholder such as
`[APPLICATION URL]` — dashed border, small caps, with a `title` explaining why — and is always
paired with a short explanatory note.

Placeholders currently in the build:

| Placeholder | Where |
| --- | --- |
| `[NUMBER OF POSITIONS]` | Recruitment details |

The official values supplied by the MERSI team are already in place — recruitment period,
deadline, eligibility, selection stages, contact person, and the Google Form application URL —
so the tokens `[RECRUITMENT PERIOD]`, `[RECRUITMENT DEADLINE]`, `[ELIGIBILITY REQUIREMENTS]`,
`[SELECTION PROCESS]`, `[CONTACT PERSON]`, `[TIME COMMITMENT]` and `[APPLICATION URL]` remain in
`src/data/site.ts` as the vocabulary for future recruitment periods, but are not rendered.

Also deliberately **not** present: an expansion of the acronym "MERSI", official statistics,
or lecturer names.

---

## Editing content

Everything lives in plain TypeScript files under `src/data/`. No CMS, no database.

| File | Controls |
| --- | --- |
| `src/data/recruitment.ts` | **Recruitment period, status, deadline, eligibility list, positions, contact person + WhatsApp number, application URL, and the selection stages / process timeline** |
| `src/data/teams.ts` | The three teams: tagline, description, responsibilities, skills |
| `src/data/faq.ts` | FAQ questions and answers |
| `src/data/content.ts` | About copy, "What We Do" values, workflow steps, "Why Join" benefits |
| `src/data/site.ts` | Brand name, tagline, SEO title/description/keywords, nav links, footer social links |

### Turning on recruitment

`src/data/recruitment.ts` is the single switch. `status` drives the whole conversion funnel:

```ts
export const recruitment = {
  status: "open", // "open" | "upcoming" | "closed"
  period: "2026/2027",
  deadline: "30 September 2026, 23:59 WITA",
  deadlineIso: "2026-09-30T23:59:00+08:00",
  eligibility: [
    "Student of Information Systems Undiksha",
    "Semester 1 or Semester 3",
  ],
  // `whatsapp` is the display form of the number; `getWhatsAppUrl()` turns it
  // into a wa.me link. Set it to `null` to hide the WhatsApp button.
  contact: { name: "Putu Dhanu Driya", whatsapp: "+62 877-6295-1844" },
  applicationUrl: "https://docs.google.com/forms/d/e/…/viewform",
  // …
};
```

The selection stages are defined once in `recruitmentProcess` (same file) and used by both the
recruitment details card and the *How the Selection Works* timeline.

| `status` | Shown | Apply button |
| --- | --- | --- |
| `"open"` | 🟢 OPEN RECRUITMENT | active — links to `applicationUrl` |
| `"upcoming"` | 🟡 COMING SOON | replaced by a notice |
| `"closed"` | ⚪ RECRUITMENT CLOSED | replaced by "applications are closed" |

The button is only active when the status is `open` **and** a real URL is configured. Until
then it renders as an inert, clearly-labelled button plus an explanatory note — so no visitor
is ever sent to a dead link.

The application URL can also be supplied without touching code:

```bash
# .env.local  (copy from .env.example)
NEXT_PUBLIC_APPLICATION_URL=https://forms.gle/…
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

### Adding the official branding

Because every colour and font is a token, re-branding means editing **values only** in
`src/app/globals.css`:

```css
@theme {
  --color-primary: #e5c363;          /* main light gold surface */
  --color-primary-hover: #dab54e;
  --color-primary-edge: #b08a1e;     /* deeper gold outline for definition */
  --color-primary-display: #b08a1e;  /* gold for large display type only */
  --color-primary-soft: #fdf8e6;     /* pale gold wash */
  --color-primary-ink: #8a6a11;      /* gold text on white — meets WCAG AA */
  --color-primary-contrast: #1f1804; /* text placed on light gold */
  --color-background: #ffffff;
  /* … */
}
```

Light gold is a pale hue, so it is intentionally split into five roles:

| Token | Job |
| --- | --- |
| `--color-primary` | the main light gold — button fills, the closing CTA band, and the gold-washed *Mission* and *Recruitment* section backgrounds (`bg-primary/25`) |
| `--color-primary-edge` | a deeper gold used for 1px outlines and hover borders, so light gold buttons stay legible against white |
| `--color-primary-display` | deeper gold used only for large display headings (e.g. the hero's "Communicate."), where WCAG allows a 3:1 ratio |
| `--color-primary-ink` | gold used as *text and icons on white*, darkened to meet WCAG AA for normal text (5.1:1) |
| `--color-primary-soft` | a barely-there gold wash for icon chips and highlighted cards |

Everything sitting on a light gold surface uses dark `--color-primary-contrast` text (~10:1).
If you change the gold, re-check all five together — a lighter or darker gold will need
`--color-primary-ink`, `--color-primary-edge` and `--color-primary-display` adjusted to stay
readable. Note that **light gold cannot be used for normal-sized text on white** at any
acceptable contrast, which is exactly why `--color-primary-ink` exists.

The wordmark in `Navbar.tsx` / `Footer.tsx` and `src/app/icon.svg` are stand-ins for
`[OFFICIAL LOGO]`.

---

## Structure

```text
src/
├── app/
│   ├── layout.tsx            # fonts, SEO metadata, skip link
│   ├── page.tsx              # section composition + Organization JSON-LD
│   ├── globals.css           # design tokens, base styles, motion rules
│   ├── opengraph-image.tsx   # generated social share card
│   ├── icon.svg              # favicon
│   ├── robots.ts / sitemap.ts
├── components/
│   ├── layout/               # Navbar, Footer
│   ├── sections/             # Hero, About, Mission, Teams, Workflow, Benefits,
│   │                         # Recruitment, RecruitmentProcess, FAQ, FinalCTA
│   └── ui/                   # Button, ApplyButton, WhatsAppButton, Card, Badge,
│                             # Icon, SectionHeading, Reveal, PlaceholderValue, …
├── data/                     # all editable content
├── lib/                      # analytics, recruitment state, utils
└── types/                    # shared types
```

---

## Accessibility

- Semantic HTML with a single `h1` and an ordered heading hierarchy.
- Skip-to-content link.
- Keyboard-navigable everywhere; the FAQ uses native `<details>`/`<summary>`.
- Visible `:focus-visible` outline on every interactive element.
- `prefers-reduced-motion: reduce` disables all transitions, scroll reveal, and smooth
  scrolling.
- Scroll-reveal content is visible by default — the hidden state is only applied client-side,
  and only below the fold, so nothing is hidden without JavaScript.
- Status and placeholders are never communicated by colour alone (emoji, labels, dashed
  borders, and `sr-only` text all carry the meaning).
- WCAG AA colour contrast for text in the gold/white palette.

## SEO

- Editable title, description and keywords in `src/data/site.ts`.
- Canonical URL, Open Graph and Twitter cards, plus a generated `opengraph-image`.
- Organization JSON-LD on the page; FAQPage JSON-LD built only from confirmed answers
  (placeholder answers are excluded so search engines never index them).
- `robots.txt` and `sitemap.xml` generated from `NEXT_PUBLIC_SITE_URL`.

## Performance

- Fully static (prerendered) — no server runtime needed.
- Self-hosted subset fonts via `next/font` — no third-party requests, no layout shift.
- Zero icon/image libraries: icons are inline SVG, decorative art is pure CSS.
- One shared `IntersectionObserver` for all scroll reveals.
- Analytics is a ~2 KB privacy-conscious shim (`src/lib/analytics.ts`) with no cookies and no
  third-party scripts.

## Analytics

`src/lib/analytics.ts` emits `page_view`, `hero_cta_click`, `team_section_view`,
`recruitment_section_view`, `apply_now_click`, `whatsapp_click` and `instagram_click` to two
integration points: `window.dataLayer` (for GTM) and a `mersi:analytics` `CustomEvent`. Wire up
any provider by listening for that event — for example:

```ts
window.addEventListener("mersi:analytics", (event) => {
  // event.detail => { event: "apply_now_click", … }
});
```

The key metric is **Apply CTA clicks ÷ visitors**; completed applications are measured in the
external recruitment form platform.

---

## Out of scope (V1)

No login, applicant database, admin dashboard, payments, or CMS — the site is a presentation
and recruitment funnel only. The application form stays external, so the website never
collects personal data.

