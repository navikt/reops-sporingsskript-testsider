import { IdentifySection } from "@/app/components/IdentifySection";
import { bqConfig } from "@/lib/bq";
import { Heading, BodyShort } from "@navikt/ds-react";

export default function SporingIdentifySimple() {
  return (
    <div className="space-y-10">
      <div>
        <Heading size="medium" level="1" spacing>sporing.identify() — simple</Heading>
        <BodyShort size="small" className="text-zinc-500">
          Kall identify, deretter track. Verifiser i Network-tab at{" "}
          <code>session_id</code> er identisk på tvers av track-kallene etter identify.
        </BodyShort>
      </div>
      <IdentifySection
        variant="sporing"
        gcpProject={bqConfig.gcpProject}
        websiteId={bqConfig.websiteId}
      />
    </div>
  );
}
