import type { Metadata } from "next";
import { Provider, HStack, Tag, BodyShort, Heading, Box } from "@navikt/ds-react";
import "./globals.css";
import { TrackingScript } from "./components/TrackingScript";
import { MainNav } from "./components/MainNav";
import { Chrome } from "./components/Chrome";

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

const header = (
  <Box background="neutral-soft" borderWidth="0 0 1 0" borderColor="neutral-subtle">
    <div className="max-w-7xl mx-auto px-6 py-4 space-y-3">
      <HStack gap="space-12" align="center" wrap>
        <Heading size="small" level="1">Sporingsskript testsider</Heading>
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
      <MainNav />
    </div>
  </Box>
);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no">
      <body>
        <Provider>
          <TrackingScript websiteId={WEBSITE_ID} src={SCRIPT_SRC} />
          <Chrome header={header}>{children}</Chrome>
        </Provider>
      </body>
    </html>
  );
}
