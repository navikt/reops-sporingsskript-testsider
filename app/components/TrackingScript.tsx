"use client";

import { useEffect } from "react";

export function TrackingScript({ websiteId, src }: { websiteId: string; src: string }) {
  useEffect(() => {
    if (document.querySelector("script[data-website-id]")) return;
    const script = document.createElement("script");
    script.defer = true;
    script.src = src;
    script.setAttribute("data-website-id", websiteId);
    document.head.appendChild(script);
  }, []);
  return null;
}
