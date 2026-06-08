"use client";

declare global {
  interface Window {
    sporing?: { track: (name?: string, data?: Record<string, unknown>) => void };
  }
}

export default function SporingTrackSimple() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-xl font-semibold">sporing.track() — simple</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Auto-sidevisning sendes ved lasting. Sjekk Network-tab for POST til{" "}
          <code className="font-mono bg-zinc-100 px-1 rounded">/api/send</code> med{" "}
          <code className="font-mono bg-zinc-100 px-1 rounded">type: &quot;event&quot;</code>.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
          JS API — window.sporing.track()
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => window.sporing?.track()}
            className="px-3 py-1.5 text-sm font-mono bg-zinc-900 text-white rounded hover:bg-zinc-700 transition-colors"
          >
            sporing.track()
          </button>
          <button
            onClick={() => window.sporing?.track("manuell-hendelse")}
            className="px-3 py-1.5 text-sm font-mono bg-zinc-900 text-white rounded hover:bg-zinc-700 transition-colors"
          >
            sporing.track(&apos;manuell-hendelse&apos;)
          </button>
          <button
            onClick={() => window.sporing?.track("hendelse-med-data", { kilde: "sporing-track-simple", steg: 1 })}
            className="px-3 py-1.5 text-sm font-mono bg-zinc-900 text-white rounded hover:bg-zinc-700 transition-colors"
          >
            sporing.track(&apos;hendelse-med-data&apos;, &#123;…&#125;)
          </button>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
          HTML-attributter — data-sporing-event
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            data-sporing-event="html-klikk"
            className="px-3 py-1.5 text-sm font-mono bg-blue-700 text-white rounded hover:bg-blue-600 transition-colors"
          >
            data-sporing-event=&quot;html-klikk&quot;
          </button>
          <button
            data-sporing-event="html-klikk-med-data"
            data-sporing-event-type="knapp"
            data-sporing-event-side="sporing-track-simple"
            className="px-3 py-1.5 text-sm font-mono bg-blue-700 text-white rounded hover:bg-blue-600 transition-colors"
          >
            data-sporing-event + data-sporing-event-type
          </button>
          <a
            href="#"
            data-sporing-event="html-lenke-klikk"
            onClick={(e) => e.preventDefault()}
            className="px-3 py-1.5 text-sm font-mono bg-blue-700 text-white rounded hover:bg-blue-600 transition-colors"
          >
            data-sporing-event på &lt;a&gt;
          </a>
        </div>
      </section>
    </div>
  );
}
