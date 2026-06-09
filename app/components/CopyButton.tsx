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
      className="absolute top-2 right-2 px-2 py-1 text-xs font-mono rounded border transition-colors"
      style={{
        color: "#e6edf3",
        backgroundColor: "rgba(255,255,255,0.06)",
        borderColor: "rgba(255,255,255,0.2)",
      }}
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.14)")}
      onMouseLeave={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)")}
    >
      {copied ? "kopiert!" : "kopier"}
    </button>
  );
}
