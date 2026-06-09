import { bqConfig } from "@/lib/bq";
import { RedaksjonEditor } from "./RedaksjonEditor";
import { Heading, BodyShort } from "@navikt/ds-react";

const { gcpProject, websiteId } = bqConfig;

export default function RedaksjonPage() {
  return (
    <div className="space-y-10">
      <div>
        <Heading size="medium" level="1" spacing>Redaksjonstest</Heading>
        <BodyShort size="small" className="text-zinc-500">
          Send en hendelse med PII-verdier via{" "}
          <code>sporing.track()</code> og verifiser i BigQuery at feltene er
          redaktert av <code>reops-raw-to-clean</code>. Editoren styrer{" "}
          <code>data</code>-objektet —{" "}
          <code>website</code>, <code>url</code>, <code>referrer</code> m.m.
          settes automatisk av sporing.js.
        </BodyShort>
      </div>
      <RedaksjonEditor gcpProject={gcpProject} websiteId={websiteId} />
    </div>
  );
}
