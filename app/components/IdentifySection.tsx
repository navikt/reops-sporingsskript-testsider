"use client";

import { useEffect, useState } from "react";
import { Button, HStack, VStack, Label, TextField, BodyShort } from "@navikt/ds-react";
import { ClientBqBlock } from "@/app/components/ClientBqBlock";

type W = Window & {
  sporing?: {
    track: (name?: string) => void;
    identify: (
      id: string | Record<string, unknown>,
      data?: Record<string, unknown>,
    ) => void;
  };
  umami?: {
    track: (name?: string) => void;
    identify: (
      id: string | Record<string, unknown>,
      data?: Record<string, unknown>,
    ) => void;
  };
};

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
    {
      label: "Finn økt på distinct_id",
      sql: `SELECT * FROM \`${gcpProject}.umami_views.session\`\nWHERE website_id = '${websiteId}'\n  AND created_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 DAY)\n  AND distinct_id = '${distinctId}';`,
    },
    {
      label: "Økt-parametere",
      sql: `SELECT session_parameters FROM \`${gcpProject}.umami_views.session\`\nWHERE website_id = '${websiteId}'\n  AND created_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 DAY)\n  AND distinct_id = '${distinctId}';`,
    },
    {
      label: "Hendelser knyttet til økt",
      sql: `SELECT e.event_name, e.url_path, e.event_type, e.created_at\nFROM \`${gcpProject}.umami_views.session\` s\nJOIN \`${gcpProject}.umami_views.event\` e ON s.session_id = e.session_id\nWHERE s.website_id = '${websiteId}'\n  AND s.created_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 DAY)\n  AND s.distinct_id = '${distinctId}'\n  AND e.website_id = '${websiteId}'\n  AND e.created_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 DAY)\nORDER BY e.created_at DESC;`,
    },
  ];

  return (
    <VStack gap="space-16">
      <section>
        <Label as="p" spacing>Bruker-ID</Label>
        <HStack gap="space-8" align="end">
          <TextField
            label="distinct_id"
            hideLabel
            value={distinctId}
            onChange={(e) => setDistinctId(e.target.value)}
            size="small"
            style={{ fontFamily: "monospace", flex: 1 }}
          />
          <Button
            variant="secondary"
            size="small"
            onClick={() => setDistinctId(crypto.randomUUID())}
          >
            ny UUID
          </Button>
        </HStack>
      </section>

      <section>
        <Label as="p" spacing>Steg 1 — identify</Label>
        <BodyShort size="small" className="text-zinc-400 mb-2">
          Sjekk at requesten har <code>type: &quot;identify&quot;</code>.
        </BodyShort>
        <HStack gap="space-8" wrap>
          <Button
            variant="primary"
            size="small"
            onClick={() => getApi()?.identify(distinctId)}
          >
            {p}.identify(&apos;&#123;id&#125;&apos;)
          </Button>
          <Button
            variant="primary"
            size="small"
            onClick={() => getApi()?.identify(distinctId, { rolle: "veileder", enhet: "oslo" })}
          >
            {p}.identify(&apos;&#123;id&#125;&apos;, &#123; rolle, enhet &#125;)
          </Button>
        </HStack>
      </section>

      <section>
        <Label as="p" spacing>Steg 2 — track etter identify</Label>
        <BodyShort size="small" className="text-zinc-400 mb-2">
          Disse skal ha samme <code>session_id</code> som identify-kallet over.
        </BodyShort>
        <HStack gap="space-8" wrap>
          <Button
            variant="secondary"
            size="small"
            onClick={() => getApi()?.track("post-identify-1")}
          >
            {p}.track(&apos;post-identify-1&apos;)
          </Button>
          <Button
            variant="secondary"
            size="small"
            onClick={() => getApi()?.track("post-identify-2")}
          >
            {p}.track(&apos;post-identify-2&apos;)
          </Button>
        </HStack>
      </section>

      {variant === "sporing" && (
        <section>
          <Label as="p" spacing>Ikke støttet — objekt uten ID</Label>
          <BodyShort size="small" className="text-zinc-400 mb-2">
            Økt-ID forblir ustabil (IP+UA). Data havner i session_data med{" "}
            <code>distinct_id = null</code>. Ikke anbefalt.
          </BodyShort>
          <Button
            variant="tertiary"
            size="small"
            data-color="neutral"
            onClick={() => getApi()?.identify({ rolle: "veileder" })}
          >
            sporing.identify(&#123; rolle: &apos;veileder&apos; &#125;)
          </Button>
        </section>
      )}

      <ClientBqBlock queries={queries} />
    </VStack>
  );
}
