import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { seo, site } from "@/data/site";
import "./globals.css";

/**
 * Plus Jakarta Sans — a modern, geometric sans-serif, as recommended in
 * PRD section 19. Self-hosted and subset by `next/font`, so there is no
 * third-party request and no layout shift.
 */
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: seo.title,
  description: seo.description,
  keywords: [...seo.keywords],
  applicationName: site.fullName,
  authors: [{ name: site.fullName }],
  creator: site.fullName,
  publisher: site.fullName,
  category: "education",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.fullName,
    title: seo.title,
    description: seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      {/* `suppressHydrationWarning` is deliberate and scoped to <body> only.
          Browser extensions and screen-recording tools inject attributes onto
          <body> (e.g. `screen_capture_injected="true"`) *after* the server
          HTML has been sent, which React otherwise reports as a hydration
          mismatch. It suppresses that one element's own attribute diff — it is
          not a way to hide real mismatches, and it does not affect any child
          component. */}
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-primary-contrast"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
