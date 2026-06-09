import { BqBlock } from "@/app/components/BqBlock";
import { bqConfig } from "@/lib/bq";
import { SporingTrackButtons } from "./SporingTrackButtons";
import { Heading, BodyShort } from "@navikt/ds-react";

const { gcpProject, websiteId } = bqConfig;

const QUERIES = [
  `-- Hendelser fra denne siden
SELECT event_name, url_path, created_at
FROM \`${gcpProject}.umami_views.event\`
WHERE website_id = '${websiteId}'
  AND created_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 DAY)
  AND url_path LIKE '%/sporing/track%'
ORDER BY created_at DESC LIMIT 20;`,

  `-- Hendelsesdata (for hendelse-med-data)
SELECT e.event_name, d.event_parameters
FROM \`${gcpProject}.umami_views.event\` e
JOIN \`${gcpProject}.umami_views.event_data\` d ON e.event_id = d.event_id
WHERE e.website_id = '${websiteId}'
  AND e.created_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 DAY)
  AND e.event_name = 'hendelse-med-data'
ORDER BY e.created_at DESC LIMIT 20;`,
];

export default function SporingTrackSimple() {
  return (
    <div className="space-y-10">
      <div>
        <Heading size="medium" level="1" spacing>sporing.track() — simple</Heading>
        <BodyShort size="small" className="text-zinc-500">
          Auto-sidevisning sendes ved lasting. Sjekk Network-tab for POST til{" "}
          <code>/api/send</code> med <code>type: &quot;event&quot;</code>.
        </BodyShort>
      </div>
      <SporingTrackButtons />
      <BqBlock queries={QUERIES} />
    </div>
  );
}
