"use client";

import { LinkCard, BodyShort, HStack, VStack, Tag } from "@navikt/ds-react";

const ROUTES = [
  {
    group: "sporing.js (ny API)",
    badge: null,
    items: [
      { href: "/sporing/track/simple", label: "sporing.track()", desc: "JS API + data-sporing-event HTML-attributter" },
      { href: "/sporing/identify/simple", label: "sporing.identify()", desc: "Stabil økt-ID + økt-data" },
    ],
  },
  {
    group: "window.umami (legacy — backwards-kompatibilitet)",
    badge: "Legacy" as const,
    items: [
      { href: "/umami/track/simple", label: "umami.track()", desc: "JS API + data-umami-event HTML-attributter" },
      { href: "/umami/identify/simple", label: "umami.identify()", desc: "Skal gi identisk oppførsel som sporing.identify()" },
    ],
  },
  {
    group: "Verktøy",
    badge: null,
    items: [
      { href: "/redaksjon", label: "redaksjon", desc: "Interaktiv simulator — se hvordan en payload redakteres av reops-raw-to-clean" },
    ],
  },
];

export function RouteCards() {
  return (
    <VStack gap="space-16">
      {ROUTES.map(({ group, badge, items }) => (
        <section key={group}>
          <HStack gap="space-8" align="center" className="mb-3">
            <BodyShort size="small" className="font-semibold text-zinc-500 uppercase tracking-wide text-xs">
              {group}
            </BodyShort>
            {badge && <Tag variant="warning" size="small">{badge}</Tag>}
          </HStack>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {items.map(({ href, label, desc }) => (
              <LinkCard key={href}>
                <LinkCard.Title>
                  <LinkCard.Anchor href={href}>
                    <code>{label}</code>
                  </LinkCard.Anchor>
                </LinkCard.Title>
                <LinkCard.Description>{desc}</LinkCard.Description>
                <LinkCard.Footer>
                  <BodyShort size="small" className="font-mono text-zinc-400">{href}</BodyShort>
                </LinkCard.Footer>
              </LinkCard>
            ))}
          </div>
        </section>
      ))}
    </VStack>
  );
}
