"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Button,
  HStack,
  VStack,
  Label,
  TextField,
  BodyShort,
} from "@navikt/ds-react";
import { ArrowsCirclepathIcon } from "@navikt/aksel-icons";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { oneDark } from "@codemirror/theme-one-dark";
import { ClientBqBlock } from "@/app/components/ClientBqBlock";

const CM_EXTENSIONS = [json()];

function randomHex() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 6);
}

function makeEventName() {
  return `filtrering-test-${randomHex()}`;
}

const DEFAULT_PAYLOAD = JSON.stringify(
  {
    saksbehandler: "Z123456",
    epost: "ola.nordmann@nav.no",
    tlf: "99887766",
    navn: "Ola Nordmann",
    adresse: "0150 Oslo",
    hemmelig: "hemmelig adresse",
    konto: "1234.56.78901",
    orgnr: "123456789",
    skilt: "AB12345",
    fil: "C:\\Users\\ola\\dokument.pdf",
    sesjon: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    komponent: "skjema-sosialhjelp",
    pageType: "soknad",
    seksjon: "steg-1",
    idfa: "8D8AC610-566D-4EF0-9C22-186B2A5ED793",
    gaid: "38400000-8cf0-11bd-b23e-10b96e40000d",
    device: {
      adid: "38400000-8cf0-11bd-b23e-10b96e40000d",
    },
  },
  null,
  2,
);

type W = Window & {
  sporing?: { track: (name?: string, data?: Record<string, unknown>) => void };
};

function makeQueries(gcpProject: string, websiteId: string, eventName: string) {
  return [
    {
      label: "Finn hendelsen",
      sql: `SELECT
  e.event_name,
  e.url_path,
  e.created_at,
  d.event_parameters
FROM \`${gcpProject}.umami_views.event\` e
JOIN \`${gcpProject}.umami_views.event_data\` d ON e.event_id = d.event_id
WHERE e.website_id = '${websiteId}'
  AND e.created_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 DAY)
  AND e.event_name = '${eventName}'
ORDER BY e.created_at DESC LIMIT 1000;`,
    },
  ];
}

export function FiltreringEditor({
  gcpProject,
  websiteId,
}: {
  gcpProject: string;
  websiteId: string;
}) {
  const [raw, setRaw] = useState(DEFAULT_PAYLOAD);
  const [eventName, setEventName] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setEventName(makeEventName());
  }, []);

  const fire = useCallback(() => {
    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      setStatus("error");
      setErrorMsg(`Ugyldig JSON: ${(e as Error).message}`);
      return;
    }
    try {
      (window as W).sporing?.track(eventName, parsed);
      setStatus("ok");
      setErrorMsg("");
    } catch (e) {
      setStatus("error");
      setErrorMsg(`sporing.track feilet: ${(e as Error).message}`);
    }
  }, [raw, eventName]);

  return (
    <VStack gap="space-16">
      <section>
        <HStack gap="space-8" align="end">
          <TextField
            label="event name"
            value={eventName}
            onChange={(e) => {
              setEventName(e.target.value);
              setStatus("idle");
            }}
            size="small"
            style={{ fontFamily: "monospace", width: "30ch" }}
          />
          <Button
            variant="secondary"
            size="small"
            icon={<ArrowsCirclepathIcon aria-hidden />}
            onClick={() => {
              setEventName(makeEventName());
              setStatus("idle");
            }}
          >
            random navn
          </Button>
        </HStack>
      </section>

      <section>
        <Label as="p" spacing>
          data-payload (JSON)
        </Label>
        <div className="rounded-lg overflow-hidden border border-zinc-700">
          <CodeMirror
            value={raw}
            extensions={CM_EXTENSIONS}
            theme={oneDark}
            onChange={(val) => {
              setRaw(val);
              setStatus("idle");
            }}
            basicSetup={{
              lineNumbers: true,
              foldGutter: true,
              highlightActiveLine: true,
            }}
            style={{ fontSize: "13px" }}
          />
        </div>
      </section>

      <HStack gap="space-8" align="center" wrap>
        <Button variant="primary" onClick={fire}>
          sporing.track(&apos;{eventName}&apos;, data)
        </Button>
        <Button
          variant="tertiary"
          data-color="neutral"
          onClick={() => {
            setRaw(DEFAULT_PAYLOAD);
            setStatus("idle");
          }}
        >
          reset payload
        </Button>
        {status === "ok" && (
          <BodyShort size="small" className="text-green-700 font-mono">
            ✓ hendelse sendt
          </BodyShort>
        )}
        {status === "error" && (
          <BodyShort size="small" className="text-red-700 font-mono">
            {errorMsg}
          </BodyShort>
        )}
      </HStack>

      <ClientBqBlock
        title="Verifiser filtrering i BigQuery"
        queries={makeQueries(gcpProject, websiteId, eventName)}
      />
    </VStack>
  );
}
