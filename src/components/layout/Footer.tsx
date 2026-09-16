import { Icon } from "@/components/ui/Icon";
import { navLinks, site, socialLinks } from "@/data/site";
import { recruitment } from "@/data/recruitment";
import { isConfigured } from "@/lib/utils";

export function Footer() {
  const year = site.copyrightYear;

  return (
    <footer className="border-t border-border bg-surface">
      <div className="shell py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Identity */}
          <div>
            <div className="flex items-center gap-3">
              <span
                className="flex size-10 items-center justify-center rounded-2xl border border-primary-edge/60 bg-primary text-[1.05rem] font-extrabold text-primary-contrast"
                aria-hidden="true"
              >
                M
              </span>
              <span className="text-[1.05rem] font-extrabold tracking-[-0.02em] text-text">
                {site.fullName}
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {site.shortDescription} , supporting the programme through
              creative communication, digital content, and student recruitment.
            </p>
            <p className="mt-4 text-sm font-semibold text-text">
              {site.tagline}
            </p>
          </div>

          {/* Navigate */}
          <nav aria-labelledby="footer-navigate">
            <h2
              id="footer-navigate"
              className="text-caption font-bold tracking-[0.12em] text-muted uppercase"
            >
              Navigate
            </h2>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-text transition-colors duration-200 hover:text-primary-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Recruitment */}
          <nav aria-labelledby="footer-recruitment">
            <h2
              id="footer-recruitment"
              className="text-caption font-bold tracking-[0.12em] text-muted uppercase"
            >
              Recruitment
            </h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="#recruitment"
                  className="text-sm font-medium text-text transition-colors duration-200 hover:text-primary-ink"
                >
                  Open Positions
                </a>
              </li>
              <li>
                <a
                  href="#recruitment-process"
                  className="text-sm font-medium text-text transition-colors duration-200 hover:text-primary-ink"
                >
                  Selection Process
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-sm font-medium text-text transition-colors duration-200 hover:text-primary-ink"
                >
                  FAQ
                </a>
              </li>
              <li className="pt-1">
                <span className="inline-flex items-center gap-2 text-caption text-muted">
                  <span aria-hidden="true">{recruitment.status === "open" ? "🟢" : recruitment.status === "upcoming" ? "🟡" : "⚪"}</span>
                  {recruitment.period}
                </span>
              </li>
            </ul>
          </nav>

          {/* Connect */}
          <nav aria-labelledby="footer-connect">
            <h2
              id="footer-connect"
              className="text-caption font-bold tracking-[0.12em] text-muted uppercase"
            >
              Connect
            </h2>
            <ul className="mt-4 space-y-3">
              {socialLinks.map((link) => (
                <li key={link.id}>
                  {isConfigured(link.href) ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-text transition-colors duration-200 hover:text-primary-ink"
                    >
                      <Icon name={link.icon} className="size-4" />
                      {link.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    <span
                      className="inline-flex flex-wrap items-center gap-2 text-sm font-medium text-muted"
                      title="Official link not yet provided"
                    >
                      <Icon name={link.icon} className="size-4" />
                      {link.label}
                      <span className="rounded-full border border-dashed border-border px-2 py-0.5 text-[0.6875rem] font-semibold tracking-[0.06em] uppercase">
                        Link pending
                      </span>
                    </span>
                  )}
                </li>
              ))}

            </ul>
          </nav>
        </div>

        <div className="mt-6 flex flex-col gap-3 text-caption text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.fullName}. All rights reserved.
          </p>
          <p>{site.university}</p>
        </div>
      </div>
    </footer>
  );
}
