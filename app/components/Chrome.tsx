"use client";

import { usePathname } from "next/navigation";

/** Header + main-chrome skjules for /dekoratoren/iframe (ren dekoratøren-side i ramme). */
export function Chrome({
  header,
  children,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
}) {
  const isIframe = usePathname().startsWith("/dekoratoren/iframe");

  if (isIframe) {
    return <main>{children}</main>;
  }

  return (
    <>
      {header}
      <main className="max-w-3xl mx-auto w-full px-6 py-10">{children}</main>
    </>
  );
}
