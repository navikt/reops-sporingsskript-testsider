"use client";

import { Button, HStack, VStack, Label, Tag } from "@navikt/ds-react";

type W = Window & { umami?: { track: (name?: string, data?: Record<string, unknown>) => void } };

export function UmamiTrackButtons() {
  return (
    <VStack gap="space-16">
      <section>
        <Label as="p" spacing>JS API — window.umami.track()</Label>
        <HStack gap="space-8" wrap>
          <Button
            variant="primary"
            size="small"
            onClick={() => (window as W).umami?.track()}
          >
            umami.track()
          </Button>
          <Button
            variant="primary"
            size="small"
            onClick={() => (window as W).umami?.track("manuell-hendelse")}
          >
            umami.track(&apos;manuell-hendelse&apos;)
          </Button>
          <Button
            variant="primary"
            size="small"
            onClick={() => (window as W).umami?.track("hendelse-med-data", { kilde: "umami-track-simple", steg: 1 })}
          >
            umami.track(&apos;hendelse-med-data&apos;, &#123;…&#125;)
          </Button>
        </HStack>
      </section>

      <section>
        <HStack gap="space-8" align="center">
          <Label as="p">HTML-attributter — data-umami-event</Label>
          <Tag variant="warning" size="small">Legacy</Tag>
        </HStack>
        <HStack gap="space-8" wrap className="mt-2">
          <Button
            variant="secondary"
            size="small"
            data-color="neutral"
            data-umami-event="html-klikk"
          >
            data-umami-event=&quot;html-klikk&quot;
          </Button>
          <Button
            variant="secondary"
            size="small"
            data-color="neutral"
            data-umami-event="html-klikk-med-data"
            data-umami-event-type="knapp"
            data-umami-event-side="umami-track-simple"
          >
            data-umami-event + data-umami-event-type
          </Button>
        </HStack>
      </section>

      <section>
        <Label as="p" spacing>Sanity check</Label>
        <Button
          variant="tertiary"
          size="small"
          data-color="neutral"
          onClick={() => {
            const w = window as unknown as { sporing: unknown; umami: unknown };
            // eslint-disable-next-line no-console
            console.log("window.umami === window.sporing:", w.umami === w.sporing);
          }}
        >
          console.log(window.umami === window.sporing)
        </Button>
      </section>
    </VStack>
  );
}
