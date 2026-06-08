"use client";

declare global {
  interface Window {
    umami?: {
      track: (name?: string) => void;
      identify: (id: string | Record<string, unknown>, data?: Record<string, unknown>) => void;
    };
  }
}

export default function UmamiIdentifySimple() {
  return (
    <div className="space-y-10">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold">umami.identify() — simple</h1>
          <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 font-medium">Legacy</span>
        </div>
        <p className="mt-1 text-sm text-zinc-500">
          Backwards-kompatibilitetstest. Skal gi identisk oppførsel som{" "}
          <code className="font-mono bg-zinc-100 px-1 rounded">sporing.identify()</code>.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
          Steg 1 — identify
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => window.umami?.identify("test-bruker-002")}
            className="px-3 py-1.5 text-sm font-mono bg-zinc-900 text-white rounded hover:bg-zinc-700 transition-colors"
          >
            umami.identify(&apos;test-bruker-002&apos;)
          </button>
          <button
            onClick={() => window.umami?.identify("test-bruker-002", { rolle: "veileder", enhet: "bergen" })}
            className="px-3 py-1.5 text-sm font-mono bg-zinc-900 text-white rounded hover:bg-zinc-700 transition-colors"
          >
            umami.identify(&apos;test-bruker-002&apos;, &#123; rolle, enhet &#125;)
          </button>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
          Steg 2 — track etter identify
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => window.umami?.track("post-identify-1")}
            className="px-3 py-1.5 text-sm font-mono bg-zinc-900 text-white rounded hover:bg-zinc-700 transition-colors"
          >
            umami.track(&apos;post-identify-1&apos;)
          </button>
          <button
            onClick={() => window.umami?.track("post-identify-2")}
            className="px-3 py-1.5 text-sm font-mono bg-zinc-900 text-white rounded hover:bg-zinc-700 transition-colors"
          >
            umami.track(&apos;post-identify-2&apos;)
          </button>
        </div>
      </section>
    </div>
  );
}
