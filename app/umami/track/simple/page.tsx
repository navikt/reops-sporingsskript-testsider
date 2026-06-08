import { BqBlock } from "@/app/components/BqBlock";
import { bqConfig } from "@/lib/bq";
import { UmamiTrackButtons } from "./UmamiTrackButtons";

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
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold">umami.track() — simple</h1>
          <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 font-medium">Legacy</span>
        </div>
        <p className="mt-1 text-sm text-zinc-500">
          Backwards-kompatibilitetstest.{" "}
          <code className="font-mono bg-zinc-100 px-1 rounded">window.umami</code> skal peke til
          samme objekt som <code className="font-mono bg-zinc-100 px-1 rounded">window.sporing</code>.
        </p>
      </div>

      <UmamiTrackButtons />

      <BqBlock queries={QUERIES} />
    </div>
  );
}
