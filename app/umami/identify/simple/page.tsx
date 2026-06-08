import { IdentifySection } from "@/app/components/IdentifySection";
import { bqConfig } from "@/lib/bq";

export default function UmamiIdentifySimple() {
  return (
    <div className="space-y-10">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold">umami.identify() — simple</h1>
          <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 font-medium">Legacy</span>
        </div>
        <p className="mt-1 text-sm text-zinc-500">
          Backwards-kompatibilitetstest. Skal gi identisk oppførsel som{" "}
          <code className="font-mono bg-zinc-100 px-1 rounded">sporing.identify()</code>.
        </p>
      </div>

      <IdentifySection
        variant="umami"
        gcpProject={bqConfig.gcpProject}
        websiteId={bqConfig.websiteId}
      />
    </div>
  );
}
