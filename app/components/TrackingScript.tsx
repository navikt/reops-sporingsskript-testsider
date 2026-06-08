"use client";

import { useEffect } from "react";

export function TrackingScript({ websiteId }: { websiteId: string }) {
  useEffect(() => {
    if (document.querySelector("script[data-website-id]")) return;
    const script = document.createElement("script");
    script.defer = true;
    script.src = "https://cdn.nav.no/team-researchops/sporing/sporing.js";
    script.setAttribute("data-website-id", websiteId);
    document.head.appendChild(script);
  }, []);
  return null;
}
