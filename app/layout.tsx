import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sporingsskript testsider",
  description: "Test av sporing.js",
};

const WEBSITE_ID = process.env.WEBSITE_ID ?? "REPLACE_WITH_WEBSITE_ID";

const NAV_LINKS = [
  { href: "/", label: "Oversikt" },
  { href: "/sporing/track/simple", label: "sporing.track" },
  { href: "/sporing/identify/simple", label: "sporing.identify" },
  { href: "/umami/track/simple", label: "umami.track" },
  { href: "/umami/identify/simple", label: "umami.identify" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-zinc-900 font-sans">
        <Script
          src="https://cdn.nav.no/team-researchops/sporing/sporing.js"
          data-website-id={WEBSITE_ID}
          strategy="afterInteractive"
        />
        <header className="border-b border-zinc-200 bg-zinc-50">
          <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-8 flex-wrap">
            <span className="font-mono text-xs font-semibold text-zinc-400">
              sporing.js test · id: {WEBSITE_ID.slice(0, 8)}…
            </span>
            <nav className="flex gap-5 flex-wrap">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-xs font-mono text-zinc-500 hover:text-zinc-900 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-10">
          {children}
        </main>
      </body>
    </html>
  );
}
