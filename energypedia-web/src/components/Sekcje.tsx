import Link from "next/link";
import { dzialy, kafleEnergiaDzis, liczbyDlaFirm, najczesciejCzytane, najnowsze, redakcja, sprawdzSytuacje, sprzedawcyZUrzedu, trackery } from "@/content/strona-glowna";
import { konfiguracja } from "@/content/konfiguracja";

export function EnergiaDzis() {
  return (
    <section aria-labelledby="h-dzis" className="sekcja">
      <div className="sekcja__naglowek">
        <h2 id="h-dzis" className="h2" style={{ fontSize: 24, display: "flex", alignItems: "center", gap: 10 }}><span className="na-zywo" aria-hidden="true" />Energia dziś</h2>
        <Link href="/dane/barometr-rynku" className="link-akcent">Barometr Rynku Energii: pierwsze wydanie 1 grudnia →</Link>
      </div>
      <div className="siatka">
        {kafleEnergiaDzis.map((k) => (
          <div key={k.etykieta} className="karta kafel">
            <span className="opis" style={{ fontSize: 14 }}>{k.etykieta}</span>
            <span className="kafel__wartosc tabular">{k.wartosc}</span>
            <span className="opis" style={{ fontSize: 13 }}>{k.notka}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SlotReklamy({ id, rozmiar, tytul, wariant }: { id: string; rozmiar: string; tytul: string; wariant: "billboard" | "boczny" }) {
  return (
    <aside aria-label="Reklama" className={`slot slot--${wariant}`} data-slot={id}>
      <strong className="etykieta">{konfiguracja.reklamyWlasne ? "Reklama własna Energypedii" : "Reklama"}</strong>
      <span className="slot__tytul">{tytul}</span>
      <span style={{ fontSize: 12 }}>{id} · {rozmiar}</span>
    </aside>
  );
}

export function Najnowsze() {
  return (
    <section aria-labelledby="h-nowe" className="dwie-kolumny">
      <div className="kolumna-glowna">
        <div className="sekcja__naglowek">
          <h2 id="h-nowe" className="h2">Najnowsze</h2>
          <Link href="/wiadomosci" className="link-akcent">Wszystkie wiadomości →</Link>
        </div>
        <ol className="lista-nowe">
          {najnowsze.map((n) => (
            <li key={n.href}><Link href={n.href}>
              <span className="lista-nowe__godz tabular">{n.godzina}</span>
              <span style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}><span className="etykieta lista-nowe__dzial">{n.dzial}</span><span className="lista-nowe__tytul">{n.tytul}</span></span>
            </Link></li>
          ))}
        </ol>
      </div>
      <div className="kolumna-boczna">
        <div className="karta czytane">
          <h3 className="display" style={{ margin: 0, fontWeight: 620, fontSize: 18 }}>Najczęściej czytane</h3>
          <ol>{najczesciejCzytane.map((p) => <li key={p.href}><Link href={p.href} style={{ fontWeight: 600, lineHeight: 1.35 }}>{p.tytul}</Link></li>)}</ol>
        </div>
        <SlotReklamy id="EP_SIDEBAR_HP" rozmiar="300×600" tytul="Powiadom mnie o taryfach 2027" wariant="boczny" />
      </div>
    </section>
  );
}

export function SprawdzSytuacje() {
  return (
    <section aria-labelledby="h-syt" className="sekcja">
      <h2 id="h-syt" className="h2">Sprawdź swoją sytuację</h2>
      <div className="siatka">
        {sprawdzSytuacje.map((c, i) => (
          <Link key={c.href} href={c.href} className="karta karta-krok">
            <span className="karta-krok__nr">{i + 1}</span>
            <span className="karta-krok__tytul">{c.tytul}</span>
            <span className="opis" style={{ fontSize: 15 }}>{c.opis}</span>
            <span className="link-akcent karta-krok__cta">{c.cta} →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function Dzialy() {
  return (
    <section aria-labelledby="h-dzialy" className="sekcja">
      <h2 id="h-dzialy" className="h2">Rachunek, fotowoltaika, magazyn energii</h2>
      <div className="siatka">
        {dzialy.map((d) => (
          <div key={d.nazwa} className="karta dzial">
            <div className="dzial__baner" style={{ background: d.tlo }}>{d.nazwa}</div>
            <div className="dzial__tresc">
              <Link href={d.przewodnik.href} style={{ fontWeight: 700, fontSize: 17 }}>{d.przewodnik.tytul} →</Link>
              {d.linki.map((l) => <Link key={l.href} href={l.href} className="opis" style={{ fontSize: 15 }}>{l.tytul}</Link>)}
              <span className="opis" style={{ fontSize: 13 }}>Hasło: <Link href={d.haslo.href} className="link-akcent">{d.haslo.tytul}</Link></span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Trackery() {
  return (
    <section aria-labelledby="h-biez" className="sekcja">
      <h2 id="h-biez" className="h2">Na bieżąco: tematy, które się zmieniają</h2>
      <div className="siatka">
        {trackery.map((t) => (
          <Link key={t.href} href={t.href} className="karta tracker">
            <span className="status">{t.status}</span>
            <span className="tracker__tytul">{t.tytul}</span>
            <span className="opis" style={{ fontSize: 14 }}>{t.opis}</span>
            <span className="tracker__meta">Ostatnia aktualizacja: {t.aktualizacja}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function Sprzedawcy() {
  return (
    <section aria-labelledby="h-firmy" className="sekcja" style={{ gap: 14 }}>
      <div className="sekcja__naglowek">
        <h2 id="h-firmy" className="h2">Sprzedawcy z urzędu</h2>
        <Link href="/sprzedawcy" className="link-akcent">Jak sprawdzić swojego sprzedawcę →</Link>
      </div>
      <div className="siatka" style={{ gap: 12 }}>
        {sprzedawcyZUrzedu.map((s) => (
          <Link key={s.href} href={s.href} className="karta sprzedawca">
            <strong style={{ fontSize: 17 }}>{s.nazwa}</strong>
            <span className="opis" style={{ fontSize: 13 }}>{s.obszar}</span>
          </Link>
        ))}
      </div>
      <span className="opis" style={{ fontSize: 13 }}>Profile przygotowuje redakcja z danych publicznych. Kolejność alfabetyczna. Operatorzy sieci dołączą w grudniu.</span>
    </section>
  );
}

export function BarometrIAkademia() {
  return (
    <section aria-labelledby="h-baro" className="siatka" style={{ gap: 20 }}>
      <div className="baro">
        <span className="etykieta" style={{ color: "var(--volt-ink)" }}>Barometr Odbiorców Energii #0</span>
        <h2 id="h-baro" className="h-karty">Jak oceniasz swój rachunek za prąd? Weź udział w pierwszym badaniu</h2>
        <p className="opis" style={{ margin: 0 }}>Ankieta trwa do 4 grudnia. Wyniki opublikujemy w grudniu, z opisem metody: to badanie wśród czytelników, nie próba reprezentatywna.</p>
        <Link href="/barometr-odbiorcow/ankieta" className="przycisk przycisk--ciemny" style={{ alignSelf: "flex-start" }}>Wypełnij ankietę</Link>
      </div>
      <div className="karta akademia">
        <span className="etykieta" style={{ color: "var(--volt-ink)" }}>Akademia magazynów energii</span>
        <h2 className="h-karty" style={{ fontSize: 24 }}>6 lekcji w skrzynce: od podstaw do opłacalności</h2>
        <p className="opis" style={{ margin: 0 }}>Jak działa magazyn, kiedy się opłaca, jak go dobrać i jak skorzystać z dotacji. Jedna lekcja co dwa dni.</p>
        <Link href="/akademia/magazyny-energii" className="link-akcent">Zapisz się na kurs →</Link>
      </div>
    </section>
  );
}

export function Redakcja() {
  return (
    <section aria-labelledby="h-red" className="sekcja">
      <div className="sekcja__naglowek">
        <h2 id="h-red" className="h2">Redakcja i eksperci</h2>
        <Link href="/jak-pracujemy" className="link-akcent">Jak pracujemy →</Link>
      </div>
      <div className="siatka">
        {redakcja.map((o) => (
          <Link key={o.imie} href={o.href} className="karta osoba">
            <span className="osoba__foto" aria-hidden="true">{o.imie.startsWith("[") ? "" : o.imie.split(" ").map((x) => x[0]).join("")}</span>
            <span style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}><strong style={{ fontSize: 17 }}>{o.imie}</strong><span className="opis" style={{ fontSize: 14 }}>{o.funkcja}</span></span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function PasDlaFirm() {
  return (
    <section aria-labelledby="h-b2b" className="b2b">
      <div className="b2b__lewa">
        <span className="etykieta opis">Dla firm z branży energii i OZE</span>
        <h2 id="h-b2b" className="h-karty">Docieraj do osób, które właśnie decydują o prądzie, fotowoltaice i magazynie energii</h2>
        <div className="siatka" style={{ gap: 12 }}>
          {liczbyDlaFirm.map((l) => (
            <div key={l.opis} className="b2b__liczba">
              <span className="display tabular" style={{ fontWeight: 700, fontSize: 24 }}>{l.wartosc}</span>
              <span className="opis" style={{ fontSize: 13 }}>{l.opis}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="b2b__prawa">
        <strong style={{ fontSize: 17 }}>Partner założycielski 2027</strong>
        <span className="opis" style={{ fontSize: 15 }}>Profile firm, sponsoring działów, newsletter. Redakcja i porównania pozostają niezależne od reklamodawców.</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <Link href="/reklama" className="przycisk przycisk--ciemny">Media kit</Link>
          <Link href="/reklama#kontakt" className="przycisk przycisk--obrys">Porozmawiajmy</Link>
        </div>
      </div>
    </section>
  );
}
