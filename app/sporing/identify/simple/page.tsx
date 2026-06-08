import { IdentifySection } from "@/app/components/IdentifySection";
import { bqConfig } from "@/lib/bq";

export default function SporingIdentifySimple() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-xl font-semibold">sporing.identify() — simple</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Kall identify, deretter track. Verifiser i Network-tab at{" "}
          <code className="font-mono bg-zinc-100 px-1 rounded">session_id</code> er identisk
          på tvers av track-kallene etter identify.
        </p>
      </div>

      <IdentifySection
        variant="sporing"
        gcpProject={bqConfig.gcpProject}
        websiteId={bqConfig.websiteId}
      />
    </div>
  );
}
