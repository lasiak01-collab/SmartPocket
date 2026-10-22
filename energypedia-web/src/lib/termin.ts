// Termin rozwiązania umowy gospodarstwa domowego po wypowiedzeniu.
// Reguła: umowa rozwiązuje się z ostatnim dniem miesiąca następującego po miesiącu,
// w którym oświadczenie dotarło do sprzedawcy (art. 4j ust. 4 Prawa energetycznego).
// Status weryfikacji reguły jest w src/content/konfiguracja.ts; bez potwierdzenia
// interfejs pokazuje informację, że treść jest w trakcie weryfikacji.

import { dniWMiesiacu, przesunMiesiac, roznicaDni, type DataPL } from "./daty";

export type WynikTerminu = { koniecUmowy: DataPL; nowySprzedawcaOd: DataPL };

export function terminRozwiazania(miesiacDotarcia: { rok: number; miesiac: number }): WynikTerminu {
  const nastepny = przesunMiesiac(miesiacDotarcia.rok, miesiacDotarcia.miesiac, 1);
  const kolejny = przesunMiesiac(miesiacDotarcia.rok, miesiacDotarcia.miesiac, 2);
  return {
    koniecUmowy: { ...nastepny, dzien: dniWMiesiacu(nastepny.rok, nastepny.miesiac) },
    nowySprzedawcaOd: { ...kolejny, dzien: 1 },
  };
}

export type StanOdliczania =
  | { rodzaj: "zostalo"; dni: number; koniecMiesiaca: DataPL; wynik: WynikTerminu }
  | { rodzaj: "ostatni-dzien"; koniecMiesiaca: DataPL; wynik: WynikTerminu };

// Ile dni zostało do końca bieżącego miesiąca, czyli do ostatniego dnia, w którym
// wypowiedzenie musi dotrzeć, żeby umowa skończyła się z końcem następnego miesiąca.
export function odliczanie(dzis: DataPL): StanOdliczania {
  const koniecMiesiaca: DataPL = { rok: dzis.rok, miesiac: dzis.miesiac, dzien: dniWMiesiacu(dzis.rok, dzis.miesiac) };
  const wynik = terminRozwiazania(dzis);
  const dni = roznicaDni(dzis, koniecMiesiaca);
  return dni === 0 ? { rodzaj: "ostatni-dzien", koniecMiesiaca, wynik } : { rodzaj: "zostalo", dni, koniecMiesiaca, wynik };
}

// Trzy najbliższe miesiące dotarcia wypowiedzenia do wyboru w kalkulatorze.
export function miesiaceDoWyboru(dzis: DataPL, ile = 3): { rok: number; miesiac: number }[] {
  return Array.from({ length: ile }, (_, i) => przesunMiesiac(dzis.rok, dzis.miesiac, i));
}
