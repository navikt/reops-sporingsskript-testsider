"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { HStack, Link } from "@navikt/ds-react";

const NAV_LINKS = [
  { href: "/", label: "Oversikt" },
  { href: "/sporing/track/simple", label: "sporing.track" },
  { href: "/sporing/identify/simple", label: "sporing.identify" },
  { href: "/umami/track/simple", label: "umami.track" },
  { href: "/umami/identify/simple", label: "umami.identify" },
  { href: "/filtrering", label: "filtrering" },
  { href: "/dekoratoren", label: "dekoratøren" },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Testsider">
      <HStack gap="space-8" wrap align="center">
        {NAV_LINKS.map(({ href, label }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              as={NextLink}
              href={href}
              aria-current={active ? "page" : undefined}
              data-color={active ? "accent" : "neutral"}
              className={
                active
                  ? "px-3 py-1.5 rounded-md font-semibold underline underline-offset-4 decoration-2"
                  : "px-3 py-1.5 rounded-md hover:underline hover:underline-offset-4"
              }
            >
              {label}
            </Link>
          );
        })}
      </HStack>
    </nav>
  );
}
