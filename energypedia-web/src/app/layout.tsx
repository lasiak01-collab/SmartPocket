import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "./globals.css";
import { konfiguracja } from "@/content/konfiguracja";
import { SkryptMotywu } from "@/components/SkryptMotywu";

const ADRES = "https://energypedia.pl";

export const metadata: Metadata = {
  metadataBase: new URL(ADRES),
  title: { default: "Energypedia.pl: energia bez tajemnic", template: "%s · Energypedia.pl" },
  description: "Rachunki, umowy, taryfy, fotowoltaika i magazyny energii wyjaśnione prosto, ze źródłami. Zapytaj asystenta Energypedii.",
  applicationName: "Energypedia.pl",
  manifest: "/site.webmanifest",
  alternates: { canonical: "/" },
  robots: konfiguracja.indeksowanie ? { index: true, follow: true } : { index: false, follow: false },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon.ico" }], apple: "/apple-touch-icon.png" },
  openGraph: { type: "website", locale: "pl_PL", siteName: "Energypedia.pl", url: ADRES, images: [{ url: "/og-image-1200x630.png", width: 1200, height: 630, alt: "Energypedia.pl: energia bez tajemnic" }] },
};

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#ffffff" }, { media: "(prefers-color-scheme: dark)", color: "#0a1626" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head><SkryptMotywu /></head>
      <body>{children}</body>
    </html>
  );
}
