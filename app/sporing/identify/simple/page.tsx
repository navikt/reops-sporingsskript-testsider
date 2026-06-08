"use client";

type W = Window & {
  sporing?: {
    track: (name?: string) => void;
    identify: (id: string | Record<string, unknown>, data?: Record<string, unknown>) => void;
  };
};

export default function SporingIdentifySimple() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-xl font-semibold">sporing.identify() — simple</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Kall identify, deretter track. Verifiser i Network-tab at{" "}
          <code className="font-mono bg-zinc-100 px-1 rounded">session_id</code> er identisk
          på tvers av track-kallene etter identify.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
          Steg 1 — identify
        </h2>
        <p className="text-xs text-zinc-400">Kall ett av disse. Sjekk at requesten har <code className="font-mono bg-zinc-100 px-1 rounded">type: &quot;identify&quot;</code>.</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => (window as W).sporing?.identify("test-bruker-001")}
            className="px-3 py-1.5 text-sm font-mono bg-zinc-900 text-white rounded hover:bg-zinc-700 transition-colors"
          >
            sporing.identify(&apos;test-bruker-001&apos;)
          </button>
          <button
            onClick={() => (window as W).sporing?.identify("test-bruker-001", { rolle: "veileder", enhet: "oslo" })}
            className="px-3 py-1.5 text-sm font-mono bg-zinc-900 text-white rounded hover:bg-zinc-700 transition-colors"
          >
            sporing.identify(&apos;test-bruker-001&apos;, &#123; rolle, enhet &#125;)
          </button>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
          Steg 2 — track etter identify
        </h2>
        <p className="text-xs text-zinc-400">
          Disse skal ha samme <code className="font-mono bg-zinc-100 px-1 rounded">session_id</code> som identify-kallet over,
          og også sende <code className="font-mono bg-zinc-100 px-1 rounded">payload.id: &quot;test-bruker-001&quot;</code>.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => (window as W).sporing?.track("post-identify-1")}
            className="px-3 py-1.5 text-sm font-mono bg-zinc-900 text-white rounded hover:bg-zinc-700 transition-colors"
          >
            sporing.track(&apos;post-identify-1&apos;)
          </button>
          <button
            onClick={() => (window as W).sporing?.track("post-identify-2")}
            className="px-3 py-1.5 text-sm font-mono bg-zinc-900 text-white rounded hover:bg-zinc-700 transition-colors"
          >
            sporing.track(&apos;post-identify-2&apos;)
          </button>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
          Ikke støttet — objekt uten ID
        </h2>
        <p className="text-xs text-zinc-400">
          Økt-ID forblir ustabil (IP+UA). Data havner i session_data med{" "}
          <code className="font-mono bg-zinc-100 px-1 rounded">distinct_id = null</code>. Ikke anbefalt.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => (window as W).sporing?.identify({ rolle: "veileder" })}
            className="px-3 py-1.5 text-sm font-mono bg-zinc-200 text-zinc-500 rounded hover:bg-zinc-300 transition-colors"
          >
            sporing.identify(&#123; rolle: &apos;veileder&apos; &#125;)
          </button>
        </div>
      </section>

      <div className="border border-zinc-200 rounded-lg p-4 bg-zinc-50">
        <p className="text-xs font-semibold text-zinc-600 mb-2">Forventet i BigQuery</p>
        <pre className="text-xs font-mono text-zinc-500 whitespace-pre-wrap">{`-- Stabil økt
SELECT * FROM umami.public_session
WHERE distinct_id = 'test-bruker-001';

-- Økt-egenskaper (hvis identify ble kalt med data)
SELECT session_parameters FROM umami_views.session
WHERE distinct_id = 'test-bruker-001';`}</pre>
      </div>
    </div>
  );
}
