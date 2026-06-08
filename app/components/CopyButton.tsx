"use client";

import { useState } from "react";

export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="absolute top-2 right-2 px-2 py-1 text-xs font-mono rounded bg-zinc-700 text-zinc-300 hover:bg-zinc-600 transition-colors"
    >
      {copied ? "kopiert!" : "kopier"}
    </button>
  );
}
