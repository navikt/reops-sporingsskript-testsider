"use client";

import { useEffect, useRef, useState } from "react";
import { createHighlighter, type Highlighter } from "shiki";
import { CopyButton } from "./CopyButton";

const highlighterPromise: Promise<Highlighter> = createHighlighter({
  langs: ["sql"],
  themes: ["github-dark"],
});

function SqlBlock({ sql }: { sql: string }) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    let cancelled = false;
    highlighterPromise.then((h) => {
      if (cancelled) return;
      setHtml(h.codeToHtml(sql, { lang: "sql", theme: "github-dark" }));
    });
    return () => { cancelled = true; };
  }, [sql]);

  return (
    <div className="relative">
      {html ? (
        <div
          className="rounded-lg overflow-hidden text-xs [&>pre]:p-4 [&>pre]:overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className="rounded-lg bg-[#0d1117] text-[#e6edf3] text-xs font-mono p-4 overflow-x-auto whitespace-pre leading-relaxed">
          {sql}
        </pre>
      )}
      <CopyButton code={sql} />
    </div>
  );
}

export function ClientBqBlock({
  title = "Forventet i BigQuery",
  queries,
}: {
  title?: string;
  queries: { label?: string; sql: string }[];
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-zinc-600">{title}</p>
      {queries.map(({ label, sql }, i) => (
        <div key={i} className="space-y-1">
          {label && <p className="text-xs text-zinc-400">{label}</p>}
          <SqlBlock sql={sql} />
        </div>
      ))}
    </div>
  );
}
