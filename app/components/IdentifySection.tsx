"use client";

import { useEffect, useState } from "react";
import { CopyButton } from "@/app/components/CopyButton";

type W = Window & {
  sporing?: {
    track: (name?: string) => void;
    identify: (id: string | Record<string, unknown>, data?: Record<string, unknown>) => void;
  };
  umami?: {
    track: (name?: string) => void;
    identify: (id: string | Record<string, unknown>, data?: Record<string, unknown>) => void;
  };
};

function DynamicBqBlock({ query }: { query: string }) {
  return (
    <div className="relative">
      <pre className="rounded-lg bg-[#0d1117] text-[#e6edf3] text-xs font-mono p-4 overflow-x-auto whitespace-pre leading-relaxed">
        {query}
      </pre>
      <CopyButton code={query} />
    </div>
  );
}

interface Props {
  variant: "sporing" | "umami";
  gcpProject: string;
  websiteId: string;
}

export function IdentifySection({ variant, gcpProject, websiteId }: Props) {
  const [distinctId, setDistinctId] = useState("");

  useEffect(() => {
    setDistinctId(crypto.randomUUID());
  }, []);

  const getApi = () => {
    const w = window as W;
    return variant === "sporing" ? w.sporing : w.umami;
  };

  const p = variant === "sporing" ? "sporing" : "umami";

  const queries = [
    `SELECT * FROM \`${gcpProject}.umami_views.session\`\nWHERE website_id = '${websiteId}'\n  AND created_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 DAY)\n  AND distinct_id = '${distinctId}';`,
    `SELECT session_parameters FROM \`${gcpProject}.umami_views.session\`\nWHERE website_id = '${websiteId}'\n  AND created_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 DAY)\n  AND distinct_id = '${distinctId}';`,
    `SELECT e.event_name, e.url_path, e.event_type, e.created_at\nFROM \`${gcpProject}.umami_views.session\` s\nJOIN \`${gcpProject}.umami_views.event\` e ON s.session_id = e.session_id\nWHERE s.website_id = '${websiteId}'\n  AND s.created_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 DAY)\n  AND s.distinct_id = '${distinctId}'\n  AND e.website_id = '${websiteId}'\n  AND e.created_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 DAY)\nORDER BY e.created_at DESC;`,
  ];

  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
          Bruker-ID
        </h2>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={distinctId}
            onChange={(e) => setDistinctId(e.target.value)}
            className="flex-1 px-3 py-1.5 text-sm font-mono border border-zinc-300 rounded bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-400"
          />
          <button
            onClick={() => setDistinctId(crypto.randomUUID())}
            className="px-3 py-1.5 text-sm font-mono border border-zinc-300 rounded bg-zinc-50 text-zinc-600 hover:bg-zinc-100 transition-colors whitespace-nowrap"
          >
            ny UUID
          </button>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
          Steg 1 — identify
        </h2>
        <p className="text-xs text-zinc-400">
          Sjekk at requesten har{" "}
          <code className="font-mono bg-zinc-100 px-1 rounded">type: &quot;identify&quot;</code>.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => getApi()?.identify(distinctId)}
            className="px-3 py-1.5 text-sm font-mono bg-zinc-900 text-white rounded hover:bg-zinc-700 transition-colors"
          >
            {p}.identify(&apos;{"{id}"}&apos;)
          </button>
          <button
            onClick={() => getApi()?.identify(distinctId, { rolle: "veileder", enhet: "oslo" })}
            className="px-3 py-1.5 text-sm font-mono bg-zinc-900 text-white rounded hover:bg-zinc-700 transition-colors"
          >
            {p}.identify(&apos;{"{id}"}&apos;, &#123; rolle, enhet &#125;)
          </button>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
          Steg 2 — track etter identify
        </h2>
        <p className="text-xs text-zinc-400">
          Disse skal ha samme{" "}
          <code className="font-mono bg-zinc-100 px-1 rounded">session_id</code> som
          identify-kallet over.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => getApi()?.track("post-identify-1")}
            className="px-3 py-1.5 text-sm font-mono bg-zinc-900 text-white rounded hover:bg-zinc-700 transition-colors"
          >
            {p}.track(&apos;post-identify-1&apos;)
          </button>
          <button
            onClick={() => getApi()?.track("post-identify-2")}
            className="px-3 py-1.5 text-sm font-mono bg-zinc-900 text-white rounded hover:bg-zinc-700 transition-colors"
          >
            {p}.track(&apos;post-identify-2&apos;)
          </button>
        </div>
      </section>

      {variant === "sporing" && (
        <section className="space-y-3">
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
            Ikke støttet — objekt uten ID
          </h2>
          <p className="text-xs text-zinc-400">
            Økt-ID forblir ustabil (IP+UA). Data havner i session_data med{" "}
            <code className="font-mono bg-zinc-100 px-1 rounded">distinct_id = null</code>. Ikke
            anbefalt.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => getApi()?.identify({ rolle: "veileder" })}
              className="px-3 py-1.5 text-sm font-mono bg-zinc-200 text-zinc-500 rounded hover:bg-zinc-300 transition-colors"
            >
              sporing.identify(&#123; rolle: &apos;veileder&apos; &#125;)
            </button>
          </div>
        </section>
      )}

      <div className="space-y-2">
        <p className="text-xs font-semibold text-zinc-600">Forventet i BigQuery</p>
        {queries.map((q, i) => (
          <DynamicBqBlock key={i} query={q} />
        ))}
      </div>
    </div>
  );
}
