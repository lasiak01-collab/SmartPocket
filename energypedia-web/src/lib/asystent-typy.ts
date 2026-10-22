// Kontrakt API asystenta (szczegóły w docs/energypedia/ASYSTENT_AI_Energypedia.md).
export type Przypis = { nr: number; tytul: string; href: string; dataWeryfikacji: string };

export type OdpowiedzAsystenta =
  | { stan: "odpowiedz"; pytanie: string; wSkrocie: string; szczegoly?: string; przypisy: Przypis[]; zatwierdzona: boolean }
  | { stan: "brak-podstawy"; pytanie: string; komunikat: string; propozycje: { tytul: string; href: string }[] }
  | { stan: "niedostepny"; komunikat: string }
  | { stan: "blad"; komunikat: string };

export const MAKS_DLUGOSC_PYTANIA = 300;
