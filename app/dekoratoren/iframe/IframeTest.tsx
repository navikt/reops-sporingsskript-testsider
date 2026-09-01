"use client";

import { useEffect, useState } from "react";
import { Button, HStack, VStack, Label, BodyShort } from "@navikt/ds-react";

type W = Window & {
  dekoratorenAnalytics?: (params: {
    origin: string;
    eventName: string;
    eventData?: Record<string, unknown>;
  }) => Promise<unknown>;
};

const DECORATOR_BASE = "https://dekoratoren.ekstern.dev.nav.no";

/**
 * Laster ekte nav-dekoratoren client-side, samme mekanisme som
 * injectDecoratorClientSide() i @navikt/nav-dekoratoren-moduler:
 * env-div -> client.js -> #decorator-header/#decorator-footer fylles av klienten.
 *
 * Klienten kjører selv:
 *  - initAnalytics -> logPageView ved lasting ("besøk"-event)
 *  - history.pushState-hook -> "historyPush"-event -> logPageView ved SPA-navigasjon
 *  - window.dekoratorenAnalytics = logAnalyticsEventFromApp (brukes av getAnalyticsInstance)
 */
export function IframeTest() {
  const [ready, setReady] = useState(false);
  const [navCount, setNavCount] = useState(0);

  useEffect(() => {
    if (document.getElementById("decorator-env")) return;

    const styles = document.createElement("link");
    styles.href = `${DECORATOR_BASE}/css/client.css`;
    styles.rel = "stylesheet";
    document.head.appendChild(styles);

    const env = document.createElement("div");
    env.id = "decorator-env";
    env.dataset.src = `${DECORATOR_BASE}/csr?logoutWarning=false`;
    document.head.appendChild(env);

    // Klienten krever disse containerene (hydrate() -> findOrError)
    const header = document.createElement("div");
    header.id = "decorator-header";
    document.body.prepend(header);
    const footer = document.createElement("div");
    footer.id = "decorator-footer";
    document.body.appendChild(footer);

    const script = document.createElement("script");
    script.async = true;
    script.src = `${DECORATOR_BASE}/client.js`;
    document.body.appendChild(script);

    const check = () => {
      // initUmami() kjører kun etter samtykke (main.ts: consent.analytics),
      // så selve sporingsskriptet i DOM = tracking aktiv. window.dekoratorenAnalytics
      // eksisterer alltid (mock før samtykke).
      if (document.querySelector('script[src*="sporing"]')) setReady(true);
      else setTimeout(check, 200);
    };
    check();
  }, []);

  const logger = (eventName: string, eventData?: Record<string, unknown>) =>
    (window as W).dekoratorenAnalytics?.({ origin: "sporingsskript-testsider", eventName, eventData });

  const spaNavigate = () => {
    const n = navCount + 1;
    setNavCount(n);
    history.pushState({}, "", `/dekoratoren/iframe/steg-${n}`);
  };

  return (
    <VStack gap="space-24" className="p-6">
      <section>
        <Label as="p" spacing>Sidevisning</Label>
        <BodyShort size="small" className="text-zinc-500 mb-2">
          Automatisk ved lasting. SPA-navigasjon trigger ny sidevisning via dekoratørens
          pushState-hook.
        </BodyShort>
        <HStack gap="space-8" wrap align="center">
          <Button variant="primary" size="small" onClick={spaNavigate}>
            history.pushState (SPA-navigasjon)
          </Button>
          {navCount > 0 && (
            <BodyShort size="small" className="text-zinc-500">
              {location.pathname}
            </BodyShort>
          )}
        </HStack>
      </section>

      <section>
        <Label as="p" spacing>getAnalyticsInstance</Label>
        <HStack gap="space-8" wrap>
          <Button variant="primary" size="small" onClick={() => logger("dekoratoren-test-hendelse")}>
            logger(&quot;dekoratoren-test-hendelse&quot;)
          </Button>
          <Button
            variant="primary"
            size="small"
            onClick={() => logger("dekoratoren-test-med-data", { kilde: "iframe", steg: 1 })}
          >
            logger(&quot;dekoratoren-test-med-data&quot;, &#123;…&#125;)
          </Button>
        </HStack>
      </section>

      <BodyShort size="small" className="text-zinc-500">
        {ready
          ? "Sporingsskript injisert — samtykke gitt, tracking aktiv."
          : "Venter på samtykke — trykk «Godta alle» i cookie-banneret nedenfor. Før samtykke er dekoratorenAnalytics en mock og ingenting sendes."}
      </BodyShort>
    </VStack>
  );
}
