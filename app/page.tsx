import { BqBlock } from "@/app/components/BqBlock";
import { bqConfig } from "@/lib/bq";
import { Heading, BodyShort, VStack } from "@navikt/ds-react";
import { RouteCards } from "@/app/components/RouteCards";

const { gcpProject, websiteId } = bqConfig;

const OVERVIEW_QUERIES = [
  `SELECT * FROM \`${gcpProject}.umami_views.event\`
WHERE website_id = '${websiteId}'
  AND created_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 DAY)
  AND url_path LIKE '%/sporing/track%'
ORDER BY created_at DESC LIMIT 20;`,

  `SELECT * FROM \`${gcpProject}.umami_views.session\`
WHERE website_id = '${websiteId}'
  AND created_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 DAY)
  AND distinct_id IS NOT NULL
ORDER BY created_at DESC LIMIT 20;`,
];

export default function IndexPage() {
  return (
    <VStack gap="space-24">
      <div>
        <Heading size="large" level="1" spacing>Sporingsskript testsider</Heading>
        <BodyShort className="text-zinc-500">
          Hver testside logger via <code>sporing.js</code>. URL-stien identifiserer hva som testes i BigQuery.
        </BodyShort>
      </div>

      <RouteCards />

      <BqBlock title="BQ — verifiser sporing" queries={OVERVIEW_QUERIES} />
    </VStack>
  );
}
