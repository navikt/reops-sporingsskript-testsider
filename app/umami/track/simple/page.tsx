"use client";

type W = Window & { umami?: { track: (name?: string, data?: Record<string, unknown>) => void } };

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

      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
          JS API — window.umami.track()
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => (window as W).umami?.track()}
            className="px-3 py-1.5 text-sm font-mono bg-zinc-900 text-white rounded hover:bg-zinc-700 transition-colors"
          >
            umami.track()
          </button>
          <button
            onClick={() => (window as W).umami?.track("manuell-hendelse")}
            className="px-3 py-1.5 text-sm font-mono bg-zinc-900 text-white rounded hover:bg-zinc-700 transition-colors"
          >
            umami.track(&apos;manuell-hendelse&apos;)
          </button>
          <button
            onClick={() => (window as W).umami?.track("hendelse-med-data", { kilde: "umami-track-simple", steg: 1 })}
            className="px-3 py-1.5 text-sm font-mono bg-zinc-900 text-white rounded hover:bg-zinc-700 transition-colors"
          >
            umami.track(&apos;hendelse-med-data&apos;, &#123;…&#125;)
          </button>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
          HTML-attributter — data-umami-event (legacy)
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            data-umami-event="html-klikk"
            className="px-3 py-1.5 text-sm font-mono bg-yellow-600 text-white rounded hover:bg-yellow-500 transition-colors"
          >
            data-umami-event=&quot;html-klikk&quot;
          </button>
          <button
            data-umami-event="html-klikk-med-data"
            data-umami-event-type="knapp"
            data-umami-event-side="umami-track-simple"
            className="px-3 py-1.5 text-sm font-mono bg-yellow-600 text-white rounded hover:bg-yellow-500 transition-colors"
          >
            data-umami-event + data-umami-event-type
          </button>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
          Sanity check
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              const w = window as unknown as { sporing: unknown; umami: unknown };
              // eslint-disable-next-line no-console
              console.log("window.umami === window.sporing:", w.umami === w.sporing);
            }}
            className="px-3 py-1.5 text-sm font-mono bg-zinc-200 text-zinc-700 rounded hover:bg-zinc-300 transition-colors"
          >
            console.log(window.umami === window.sporing)
          </button>
        </div>
      </section>
    </div>
  );
}
