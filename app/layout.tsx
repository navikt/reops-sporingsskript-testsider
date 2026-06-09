import type { Metadata } from "next";
import Link from "next/link";
import { Provider, HStack, VStack, Tag, BodyShort } from "@navikt/ds-react";
import "./globals.css";
import { TrackingScript } from "./components/TrackingScript";

export const metadata: Metadata = {
  title: "Sporingsskript testsider",
  description: "Test av sporing.js",
};

const isProd = ["prod", "production"].includes(
  (process.env.ENVIRONMENT ?? "").toLowerCase(),
);

const WEBSITE_ID = isProd
  ? "8c9ebc0a-63d8-46b2-a34c-9378f809e595"
  : "034ed2f3-4fde-4f42-967d-4d607cd8b9f3";

const CDN = "https://cdn.nav.no/team-researchops/sporing";
const SCRIPT_NAME = isProd ? "sporing.js" : "sporing-dev.js";
const SCRIPT_SRC = `${CDN}/${SCRIPT_NAME}`;

const NAV_LINKS = [
  { href: "/", label: "Oversikt" },
  { href: "/sporing/track/simple", label: "sporing.track" },
  { href: "/sporing/identify/simple", label: "sporing.identify" },
  { href: "/umami/track/simple", label: "umami.track" },
  { href: "/umami/identify/simple", label: "umami.identify" },
  { href: "/filtrering", label: "filtrering" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no">
      <body>
        <Provider>
          <TrackingScript websiteId={WEBSITE_ID} src={SCRIPT_SRC} />
          <header className="border-b border-zinc-200 bg-zinc-50">
            <div className="max-w-3xl mx-auto px-6 py-3 space-y-2">
              {/* Site info bar */}
              <HStack gap="space-12" align="center" wrap>
                <Tag variant={isProd ? "error" : "info"} size="small">
                  {isProd ? "prod" : "dev"}
                </Tag>
                <HStack gap="space-4" align="center">
                  <BodyShort size="small" className="text-zinc-500 font-mono">script:</BodyShort>
                  <a
                    href={SCRIPT_SRC}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-blue-600 hover:underline"
                  >
                    {SCRIPT_NAME}
                  </a>
                </HStack>
                <HStack gap="space-4" align="center">
                  <BodyShort size="small" className="text-zinc-500 font-mono">website_id:</BodyShort>
                  <code className="text-xs font-mono text-zinc-700">{WEBSITE_ID}</code>
                </HStack>
              </HStack>
              {/* Nav links */}
              <nav className="flex gap-5 flex-wrap">
                {NAV_LINKS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-xs font-mono text-zinc-500 hover:text-zinc-900 transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>
          <main className="max-w-3xl mx-auto w-full px-6 py-10">
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
