import { BqBlock } from "@/app/components/BqBlock";
import { CodeBlock } from "@/app/components/CodeBlock";
import { bqConfig } from "@/lib/bq";
import { Heading, BodyShort } from "@navikt/ds-react";

const { gcpProject } = bqConfig;

// nav-dekoratoren sin egen website-id (dev) — events fra iframe lander her
const DEKORATOREN_WEBSITE_ID = "c44a6db3-c974-4316-b433-214f87e80b4d";

const SNIPPET = `import { getAnalyticsInstance } from "@navikt/nav-dekoratoren-moduler";

const logger = getAnalyticsInstance("min-app");

// Custom event via dekoratørens analytics
logger("knapp-klikket", { komponent: "knapp" });`;

const QUERIES = [
  `-- Sidevisninger ("besøk") fra iframen — inkl. SPA-navigasjon
SELECT url_path, created_at
FROM \`${gcpProject}.umami_views.event\`
WHERE website_id = '${DEKORATOREN_WEBSITE_ID}'
  AND created_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 DAY)
  AND url_path LIKE '%/dekoratoren/iframe%'
  AND event_type = 1
ORDER BY created_at DESC LIMIT 20;`,

  `-- getAnalyticsInstance-events + event_data (origin, viaDekoratoren)
SELECT e.event_name, d.event_parameters
FROM \`${gcpProject}.umami_views.event\` e
JOIN \`${gcpProject}.umami_views.event_data\` d ON e.event_id = d.event_id
WHERE e.website_id = '${DEKORATOREN_WEBSITE_ID}'
  AND e.created_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 DAY)
  AND e.event_name LIKE 'dekoratoren-test%'
ORDER BY e.created_at DESC LIMIT 20;`,
];

export default function DekoratorenPage() {
  return (
    <div className="space-y-10">
      <div>
        <Heading size="medium" level="1" spacing>Dekoratøren</Heading>
        <BodyShort size="small" className="text-zinc-500">
          Ekte nav-dekoratoren lastet i iframe (dev). Hendelser logges med dekoratørens egen
          website-id (<code>{DEKORATOREN_WEBSITE_ID}</code>), ikke testappens.
        </BodyShort>
      </div>

      <CodeBlock title="Slik bruker apper analytics via dekoratøren" code={SNIPPET} />

      <div>
        <p className="text-xs font-semibold text-zinc-600 mb-2">Ekte dekoratøren (iframe)</p>
        <iframe
          src="/dekoratoren/iframe"
          title="Dekoratøren-test"
          className="w-full h-[32rem] rounded-lg border border-zinc-200"
        />
      </div>

      <BqBlock queries={QUERIES} />
    </div>
  );
}
