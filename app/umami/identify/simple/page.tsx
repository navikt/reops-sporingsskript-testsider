import { IdentifySection } from "@/app/components/IdentifySection";
import { bqConfig } from "@/lib/bq";
import { Heading, BodyShort, HStack, Tag } from "@navikt/ds-react";

export default function UmamiIdentifySimple() {
  return (
    <div className="space-y-10">
      <div>
        <HStack gap="space-8" align="center">
          <Heading size="medium" level="1">umami.identify() — simple</Heading>
          <Tag variant="warning" size="small">Legacy</Tag>
        </HStack>
        <BodyShort size="small" className="text-zinc-500 mt-1">
          Skal gi identisk oppførsel som <code>sporing.identify()</code>.
        </BodyShort>
      </div>
      <IdentifySection
        variant="umami"
        gcpProject={bqConfig.gcpProject}
        websiteId={bqConfig.websiteId}
      />
    </div>
  );
}
