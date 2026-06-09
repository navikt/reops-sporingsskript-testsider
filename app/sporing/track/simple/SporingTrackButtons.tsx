"use client";

import { Button, HStack, VStack, Label } from "@navikt/ds-react";

type W = Window & { sporing?: { track: (name?: string, data?: Record<string, unknown>) => void } };

export function SporingTrackButtons() {
  return (
    <VStack gap="space-16">
      <section>
        <Label as="p" spacing>JS API — window.sporing.track()</Label>
        <HStack gap="space-8" wrap>
          <Button
            variant="primary"
            size="small"
            onClick={() => (window as W).sporing?.track()}
          >
            sporing.track()
          </Button>
          <Button
            variant="primary"
            size="small"
            onClick={() => (window as W).sporing?.track("manuell-hendelse")}
          >
            sporing.track(&apos;manuell-hendelse&apos;)
          </Button>
          <Button
            variant="primary"
            size="small"
            onClick={() => (window as W).sporing?.track("hendelse-med-data", { kilde: "sporing-track-simple", steg: 1 })}
          >
            sporing.track(&apos;hendelse-med-data&apos;, &#123;…&#125;)
          </Button>
        </HStack>
      </section>

      <section>
        <Label as="p" spacing>HTML-attributter — data-sporing-event</Label>
        <HStack gap="space-8" wrap>
          <Button
            variant="secondary"
            size="small"
            data-sporing-event="html-klikk"
          >
            data-sporing-event=&quot;html-klikk&quot;
          </Button>
          <Button
            variant="secondary"
            size="small"
            data-sporing-event="html-klikk-med-data"
            data-sporing-event-type="knapp"
            data-sporing-event-side="sporing-track-simple"
          >
            data-sporing-event + data-sporing-event-type
          </Button>
          <Button
            variant="secondary"
            size="small"
            as="a"
            href="#"
            data-sporing-event="html-lenke-klikk"
            onClick={(e: React.MouseEvent) => e.preventDefault()}
          >
            data-sporing-event på &lt;a&gt;
          </Button>
        </HStack>
      </section>
    </VStack>
  );
}
