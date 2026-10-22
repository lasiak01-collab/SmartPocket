"use client";
import { useEffect, useState } from "react";

// Motyw: domyślnie według systemu; wybór czytelnika zapisujemy tylko w przeglądarce.
export function PrzelacznikMotywu() {
  const [ciemny, ustawCiemny] = useState<boolean | null>(null);

  useEffect(() => {
    const zapisany = (() => { try { return localStorage.getItem("ep-motyw"); } catch { return null; } })();
    const systemowy = window.matchMedia("(prefers-color-scheme: dark)").matches;
    ustawCiemny(zapisany ? zapisany === "ciemny" : systemowy);
  }, []);

  const przelacz = () => {
    const nowy = !ciemny;
    ustawCiemny(nowy);
    document.documentElement.dataset.theme = nowy ? "dark" : "light";
    try { localStorage.setItem("ep-motyw", nowy ? "ciemny" : "jasny"); } catch {}
  };

  return (
    <button type="button" className="przelacznik-motywu" onClick={przelacz} aria-label={ciemny ? "Włącz tryb jasny" : "Włącz tryb ciemny"}>
      {ciemny ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" /></svg>
      )}
    </button>
  );
}
