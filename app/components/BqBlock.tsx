import { codeToHtml } from "shiki";
import { CopyButton } from "./CopyButton";

export async function BqBlock({
  title = "Forventet i BigQuery",
  queries,
}: {
  title?: string;
  queries: string[];
}) {
  const htmlBlocks = await Promise.all(
    queries.map((q) =>
      codeToHtml(q, { lang: "sql", theme: "github-dark" })
    )
  );

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-zinc-600">{title}</p>
      {htmlBlocks.map((html, i) => (
        <div key={i} className="relative">
          <div
            className="rounded-lg overflow-hidden text-xs [&>pre]:p-4 [&>pre]:overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <CopyButton code={queries[i]} />
        </div>
      ))}
    </div>
  );
}
