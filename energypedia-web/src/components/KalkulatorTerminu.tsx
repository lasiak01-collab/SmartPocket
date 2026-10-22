"use client";
import { useState } from "react";
import { formatDaty, nazwaMiesiacaMiejscownik } from "@/lib/daty";
import { terminRozwiazania } from "@/lib/termin";

type Props = { miesiace: { rok: number; miesiac: number }[]; zweryfikowane: boolean };
const RODZAJE = ["Na czas nieoznaczony", "Na czas określony", "Od akwizytora"] as const;

export function KalkulatorTerminu({ miesiace, zweryfikowane }: Props) {
  const [m, ustawM] = useState(0);
  const [rodzaj, ustawRodzaj] = useState(0);
  const wynik = terminRozwiazania(miesiace[m]);
  const koniec = formatDaty(wynik.koniecUmowy);
  const start = formatDaty(wynik.nowySprzedawcaOd);

  const tresc =
    rodzaj === 0
      ? { tytul: `Umowa skończy się ${koniec}`, opis: `Nowy sprzedawca może dostarczać energię od ${start} Wypowiedzenie umowy na czas nieoznaczony jest bez kosztów; płacisz za zużytą energię i dystrybucję do końca umowy.` }
      : rodzaj === 1
        ? { tytul: "Sprawdź datę końca w umowie", opis: `Jeśli umowa na czas określony kończy się później niż ${koniec}, sprzedawca może naliczyć opłatę za wcześniejsze rozwiązanie, u gospodarstw domowych nie wyższą niż jego bezpośrednie straty. Sprawdź też, czy umowa nie przedłuża się automatycznie.` }
        : { tytul: "Najpierw sprawdź prawo odstąpienia", opis: "Od umowy zawartej poza lokalem sprzedawcy możesz odstąpić bez kosztów w terminie z ustawy o prawach konsumenta. Po tym terminie obowiązują zasady wypowiedzenia." };

  return (
    <form className="kalkulator" aria-labelledby="h-kalk" onSubmit={(e) => e.preventDefault()}>
      <h3 id="h-kalk" className="kalkulator__tytul">Kiedy skończy się moja umowa?</h3>
      <div className="kalkulator__grupa">
        <span id="l-mies">Wypowiedzenie dotrze do sprzedawcy</span>
        <div role="group" aria-labelledby="l-mies" className="kalkulator__opcje">
          {miesiace.map((x, i) => (
            <button key={`${x.rok}-${x.miesiac}`} type="button" className="chip" aria-pressed={i === m} onClick={() => ustawM(i)}>w {nazwaMiesiacaMiejscownik(x.miesiac)} {x.rok}</button>
          ))}
        </div>
      </div>
      <div className="kalkulator__grupa">
        <span id="l-typ">Rodzaj umowy</span>
        <div role="group" aria-labelledby="l-typ" className="kalkulator__opcje">
          {RODZAJE.map((r, i) => <button key={r} type="button" className="chip" aria-pressed={i === rodzaj} onClick={() => ustawRodzaj(i)}>{r}</button>)}
        </div>
      </div>
      <div className="wynik" aria-live="polite">
        <span className="etykieta" style={{ color: "var(--volt-ink)" }}>Wynik</span>
        <strong>{tresc.tytul}</strong>
        <span className="opis" style={{ fontSize: 15 }}>{tresc.opis}</span>
      </div>
      {!zweryfikowane && <p className="uwaga" style={{ margin: 0 }}>Wersja robocza: reguła terminu czeka na weryfikację prawną. Nie publikujemy jej przed zatwierdzeniem.</p>}
      <span className="przypis">Podstawa: art. 4j ust. 3, 3a i 4 Prawa energetycznego (gospodarstwa domowe). Kalkulator działa bez AI i nie zapisuje danych.</span>
    </form>
  );
}
