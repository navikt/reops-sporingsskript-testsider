import { BqBlock } from "@/app/components/BqBlock";
import { bqConfig } from "@/lib/bq";
import { UmamiTrackButtons } from "./UmamiTrackButtons";
import { Heading, BodyShort, HStack, Tag } from "@navikt/ds-react";

const { gcpProject, websiteId } = bqConfig;

const QUERIES = [
  `-- Hendelser fra denne siden
SELECT event_name, url_path, created_at
FROM \`${gcpProject}.umami_views.event\`
WHERE website_id = '${websiteId}'
  AND created_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 DAY)
  AND url_path LIKE '%/umami/track%'
ORDER BY created_at DESC LIMIT 20;`,
];

export default function UmamiTrackSimple() {
  return (
    <div className="space-y-10">
      <div>
        <HStack gap="space-8" align="center">
          <Heading size="medium" level="1">umami.track() — simple</Heading>
          <Tag variant="warning" size="small">Legacy</Tag>
        </HStack>
        <BodyShort size="small" className="text-zinc-500 mt-1">
          Backwards-kompatibilitetstest.{" "}
          <code>window.umami</code> skal peke til samme objekt som <code>window.sporing</code>.
        </BodyShort>
      </div>
      <UmamiTrackButtons />
      <BqBlock queries={QUERIES} />
    </div>
  );
}
