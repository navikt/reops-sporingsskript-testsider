import Link from "next/link";
import { BqBlock } from "@/app/components/BqBlock";
import { bqConfig } from "@/lib/bq";

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

const ROUTES = [
  {
    group: "sporing.js (ny API)",
    color: "bg-zinc-900 text-white hover:bg-zinc-700",
    badge: null,
    items: [
      {
        href: "/sporing/track/simple",
        label: "sporing.track()",
        desc: "JS API + data-sporing-event HTML-attributter",
      },
      {
        href: "/sporing/identify/simple",
        label: "sporing.identify()",
        desc: "Stabil økt-ID + økt-data",
      },
    ],
  },
  {
    group: "window.umami (legacy — backwards-kompatibilitet)",
    color: "bg-yellow-600 text-white hover:bg-yellow-500",
    badge: "Legacy",
    items: [
      {
        href: "/umami/track/simple",
        label: "umami.track()",
        desc: "JS API + data-umami-event HTML-attributter",
      },
      {
        href: "/umami/identify/simple",
        label: "umami.identify()",
        desc: "Skal gi identisk oppførsel som sporing.identify()",
      },
    ],
  },
];

export default function IndexPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-semibold">Sporingsskript testsider</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Hver testside logger via{" "}
          <code className="font-mono bg-zinc-100 px-1 rounded">sporing.js</code>
          . URL-stien identifiserer hva som testes i BigQuery.
        </p>
      </div>

      {ROUTES.map(({ group, color, badge, items }) => (
        <section key={group} className="space-y-3">
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
              {group}
            </h2>
            {badge && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 font-medium">
                {badge}
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {items.map(({ href, label, desc }) => (
              <Link
                key={href}
                href={href}
                className="block border border-zinc-200 rounded-lg p-4 hover:border-zinc-400 transition-colors group"
              >
                <div
                  className={`inline-block text-xs font-mono px-2 py-0.5 rounded mb-2 transition-colors ${color}`}
                >
                  {label}
                </div>
                <p className="text-xs text-zinc-500 group-hover:text-zinc-700 transition-colors">
                  {desc}
                </p>
                <p className="mt-1 text-xs font-mono text-zinc-300">{href}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <BqBlock title="BQ — verifiser sporing" queries={OVERVIEW_QUERIES} />
    </div>
  );
}
