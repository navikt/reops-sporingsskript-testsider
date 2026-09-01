"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function TrackingScript({ websiteId, src }: { websiteId: string; src: string }) {
  const pathname = usePathname();

  useEffect(() => {
    // /dekoratoren laster sitt eget skript med data-auto-track="false"
    if (pathname.startsWith("/dekoratoren")) return;
    if (document.querySelector("script[data-website-id]")) return;
    const script = document.createElement("script");
    script.defer = true;
    script.src = src;
    script.setAttribute("data-website-id", websiteId);
    document.head.appendChild(script);
  }, [pathname]);
  return null;
}
