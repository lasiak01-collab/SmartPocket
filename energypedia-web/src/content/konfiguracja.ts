// Przełączniki, które zmienia naczelny przed startem i po nim.
// Zasada: niczego nie publikujemy jako faktu, dopóki nie przejdzie weryfikacji.

export const konfiguracja = {
  // Indeksowanie przez wyszukiwarki: wyłączone do startu (zmienna środowiskowa INDEKSOWANIE=tak).
  indeksowanie: process.env.INDEKSOWANIE === "tak",
  // Reklamy: do stycznia 2027 r. w slotach wyświetlamy wyłącznie reklamy własne.
  reklamyWlasne: true,
  weryfikacja: {
    // Reguła terminu z art. 4j ust. 4 Prawa energetycznego (PLAN_MVP, krok 9).
    art4j: false,
    // Termin odstąpienia od umowy zawartej poza lokalem (ustawa o prawach konsumenta).
    odstapienie: false,
  },
  // Asystent AI: odpowiedzi włączamy po przejściu testu startowego (ASYSTENT_AI_Energypedia.md, rozdz. 6).
  asystentAktywny: process.env.ASYSTENT_AKTYWNY === "tak",
} as const;
