"use client";
import { useState, type FormEvent } from "react";
import { pytaniaPodpowiedzi } from "@/content/strona-glowna";
import { MAKS_DLUGOSC_PYTANIA, type OdpowiedzAsystenta } from "@/lib/asystent-typy";

// Pole „Zapytaj Energypedię”. Odpowiedź pokazujemy tylko taką, jaką zwróci API;
// interfejs niczego nie dopowiada sam.
export function Asystent() {
  const [pytanie, ustawPytanie] = useState("");
  const [wynik, ustawWynik] = useState<OdpowiedzAsystenta | null>(null);
  const [czeka, ustawCzeka] = useState(false);

  async function zapytaj(tresc: string) {
    const p = tresc.trim();
    if (!p) return;
    ustawPytanie(p);
    ustawCzeka(true);
    try {
      const r = await fetch("/api/zapytaj", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ pytanie: p }) });
      ustawWynik((await r.json()) as OdpowiedzAsystenta);
    } catch {
      ustawWynik({ stan: "blad", komunikat: "Brak połączenia. Spróbuj ponownie." });
    } finally {
      ustawCzeka(false);
    }
  }

  const wyslij = (e: FormEvent) => { e.preventDefault(); void zapytaj(pytanie); };

  return (
    <>
      <form role="search" className="pytanie" onSubmit={wyslij}>
        <label htmlFor="pytanie" className="sr-only">Twoje pytanie o energię</label>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" style={{ color: "var(--ink-muted)", flex: "none" }}><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
        <input id="pytanie" type="search" value={pytanie} maxLength={MAKS_DLUGOSC_PYTANIA} onChange={(e) => ustawPytanie(e.target.value)} placeholder="np. Do kiedy mam wypowiedzieć umowę, żeby od stycznia zmienić sprzedawcę?" autoComplete="off" />
        <button type="submit" disabled={czeka}>{czeka ? "Szukam…" : "Zapytaj"}</button>
      </form>
      <div className="podpowiedzi">
        {pytaniaPodpowiedzi.map((p) => (
          <button key={p} type="button" className="chip" aria-pressed={pytanie === p} onClick={() => void zapytaj(p)}>{p}</button>
        ))}
      </div>
      <p className="odpowiedz__zastrzezenie" style={{ margin: 0, textAlign: "center" }}>Nie wpisuj numeru punktu poboru, adresu ani danych z faktury.</p>
      <div aria-live="polite">
        {wynik && <KartaOdpowiedzi wynik={wynik} />}
      </div>
    </>
  );
}

function KartaOdpowiedzi({ wynik }: { wynik: OdpowiedzAsystenta }) {
  if (wynik.stan === "odpowiedz") {
    return (
      <article className="odpowiedz">
        <span className="odpowiedz__znacznik">Odpowiedź AI na podstawie artykułów Energypedii{wynik.zatwierdzona ? " · zatwierdzona przez redakcję" : ""}</span>
        <h2 className="odpowiedz__tytul">{wynik.pytanie}</h2>
        <p style={{ margin: 0, fontSize: 17 }}>{wynik.wSkrocie}</p>
        {wynik.szczegoly && <p style={{ margin: 0 }}>{wynik.szczegoly}</p>}
        <ol style={{ margin: 0, paddingLeft: 20, fontSize: 14 }}>
          {wynik.przypisy.map((p) => <li key={p.nr}><a className="link-akcent" href={p.href}>{p.tytul}</a> <span className="opis">· stan na {p.dataWeryfikacji}</span></li>)}
        </ol>
        <span className="odpowiedz__zastrzezenie">Treść wygenerowana przez AI. Ma charakter informacyjny i nie jest poradą prawną w indywidualnej sprawie.</span>
      </article>
    );
  }
  if (wynik.stan === "brak-podstawy") {
    return (
      <article className="odpowiedz">
        <span className="odpowiedz__znacznik">Nie mamy jeszcze odpowiedzi na to pytanie</span>
        <p style={{ margin: 0 }}>{wynik.komunikat}</p>
        {wynik.propozycje.map((p) => <a key={p.href} className="link-akcent" href={p.href}>{p.tytul} →</a>)}
      </article>
    );
  }
  return <p className="odpowiedz" style={{ margin: 0 }}>{wynik.komunikat}</p>;
}
