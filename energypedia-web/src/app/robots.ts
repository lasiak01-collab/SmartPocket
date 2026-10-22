import type { MetadataRoute } from "next";
import { konfiguracja } from "@/content/konfiguracja";

// Do startu serwis jest zamknięty dla robotów (INDEKSOWANIE=tak otwiera).
export default function robots(): MetadataRoute.Robots {
  return konfiguracja.indeksowanie
    ? { rules: { userAgent: "*", allow: "/", disallow: ["/api/"] }, sitemap: "https://energypedia.pl/sitemap.xml" }
    : { rules: { userAgent: "*", disallow: "/" } };
}
