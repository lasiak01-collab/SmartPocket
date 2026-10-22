"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { segmenty, wojewodztwa } from "@/content/strona-glowna";

// Wybór segmentu i województwa zapamiętujemy tylko w przeglądarce (bez profilowania).
export function DlaCiebie() {
  const [seg, ustawSeg] = useState<string>("dom");
  const [woj, ustawWoj] = useState<string>("mazowieckie");

  useEffect(() => {
    try {
      const s = localStorage.getItem("ep-segment"); if (s) ustawSeg(s);
      const w = localStorage.getItem("ep-wojewodztwo"); if (w) ustawWoj(w);
    } catch {}
  }, []);
  const zapisz = (k: string, v: string) => { try { localStorage.setItem(k, v); } catch {} };
  const aktywny = segmenty.find((s) => s.id === seg) ?? segmenty[0];

  return (
    <section aria-labelledby="h-dla" className="dla">
      <div className="dla__lewa">
        <div className="sekcja__naglowek" style={{ alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <h2 id="h-dla" className="h2">Dla Ciebie</h2>
            <span className="opis" style={{ fontSize: 15 }}>Zapamiętamy wybór tylko w Twojej przeglądarce.</span>
          </div>
          <div role="group" aria-label="Kim jesteś" style={{ display: "flex", gap: 6 }}>
            {segmenty.map((s) => (
              <button key={s.id} type="button" className="chip" aria-pressed={s.id === aktywny.id} onClick={() => { ustawSeg(s.id); zapisz("ep-segment", s.id); }}>{s.nazwa}</button>
            ))}
          </div>
        </div>
        <div className="dla__linki">
          <span className="etykieta" style={{ color: "var(--volt-ink)" }}>Polecamy · {aktywny.nazwa}</span>
          {aktywny.linki.map((l) => <Link key={l.href} href={l.href}>{l.tytul} →</Link>)}
        </div>
      </div>
      <div className="karta dla__region">
        <label htmlFor="wojewodztwo" className="etykieta opis">Twoje województwo</label>
        <select id="wojewodztwo" value={woj} onChange={(e) => { ustawWoj(e.target.value); zapisz("ep-wojewodztwo", e.target.value); }}>
          {wojewodztwa.map((w) => <option key={w} value={w}>{w}</option>)}
        </select>
        <span style={{ fontSize: 15 }}>Sprzedawca z urzędu i operator sieci w Twoim regionie, ich taryfy i kontakt.</span>
        <Link href={`/regiony/${slug(woj)}`} className="link-akcent">Energia: {woj} →</Link>
      </div>
    </section>
  );
}

function slug(t: string) {
  return t.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ł/g, "l").replace(/\s+/g, "-");
}
