import Link from "next/link";
import { sciezkiTematu } from "@/content/strona-glowna";
import { konfiguracja } from "@/content/konfiguracja";
import { dzisWarszawa, formatDaty, liczbaDni, nazwaMiesiacaDopelniacz, nazwaMiesiacaMiejscownik } from "@/lib/daty";
import { miesiaceDoWyboru, odliczanie } from "@/lib/termin";
import { KalkulatorTerminu } from "./KalkulatorTerminu";

export function TematMiesiaca() {
  const dzis = dzisWarszawa();
  const stan = odliczanie(dzis);
  const koniec = formatDaty(stan.wynik.koniecUmowy);
  const zweryfikowane = konfiguracja.weryfikacja.art4j;

  return (
    <section id="temat" aria-labelledby="h-temat" className="temat">
      <svg className="temat__slupki" aria-hidden="true" width="230" height="170" viewBox="0 0 230 170"><rect x="0" y="40" width="40" height="130" rx="10" fill="#00C2A8" /><rect x="63" y="90" width="40" height="80" rx="10" fill="#FFFFFF" /><rect x="126" y="20" width="40" height="150" rx="10" fill="#FFFFFF" /><rect x="189" y="110" width="40" height="60" rx="10" fill="#FFFFFF" /></svg>
      <div className="temat__gora">
        <div className="temat__tytuly">
          <span className="etykieta temat__nadtytul">Temat miesiąca</span>
          <h2 id="h-temat" className="display temat__h2">Zmiana sprzedawcy prądu 2027: kiedy wypowiedzieć umowę</h2>
          <p className="temat__lead">Jeśli chcesz zmienić sprzedawcę, liczy się dzień, w którym wypowiedzenie dotrze do obecnego. Sprawdź, co to oznacza dla Twojej umowy.</p>
        </div>
        {zweryfikowane && (
          <div className="licznik" aria-live="polite">
            <span className="etykieta licznik__etykieta">{stan.rodzaj === "ostatni-dzien" ? "Ostatni dzień" : `Do ${stan.koniecMiesiaca.dzien} ${nazwaMiesiacaDopelniacz(stan.koniecMiesiaca.miesiac)} zostało`}</span>
            <span className="licznik__wartosc tabular">{stan.rodzaj === "ostatni-dzien" ? "Dziś" : liczbaDni(stan.dni)}</span>
            <span className="licznik__opis">Wypowiedzenie, które dotrze w {nazwaMiesiacaMiejscownik(dzis.miesiac)}, kończy umowę {koniec}</span>
          </div>
        )}
      </div>
      <div className="temat__dol">
        <KalkulatorTerminu miesiace={miesiaceDoWyboru(dzis)} zweryfikowane={zweryfikowane} />
        <div className="sciezki">
          {sciezkiTematu.map((s) => (
            <Link key={s.href} href={s.href} className="sciezka">
              <span className="etykieta">{s.etykieta}</span>
              <strong style={{ fontSize: 17 }}>{s.tytul}</strong>
              <span className="sciezka__opis">{s.opis}</span>
            </Link>
          ))}
          <div className="temat__przyciski">
            <Link href="/temat/zmiana-sprzedawcy-2027" className="przycisk przycisk--glowny">Cały temat →</Link>
            <Link href="/wzory-pism/wypowiedzenie-umowy-na-prad" className="przycisk przycisk--obrys-jasny">Wzór wypowiedzenia</Link>
            <a href="#pytanie" className="przycisk przycisk--obrys-jasny">Zapytaj asystenta</a>
          </div>
          <span className="temat__notka">W temacie miesiąca nie ma reklam ani materiałów sprzedawców energii. Oferty porównasz w porównywarce Prezesa URE.</span>
        </div>
      </div>
    </section>
  );
}
