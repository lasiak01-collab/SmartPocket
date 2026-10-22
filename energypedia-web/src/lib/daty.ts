// Daty liczone w strefie Europe/Warsaw, niezależnie od strefy serwera.

export type DataPL = { rok: number; miesiac: number; dzien: number }; // miesiac: 1–12

const MIESIACE_DOPELNIACZ = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"];
const MIESIACE_MIEJSCOWNIK = ["styczniu", "lutym", "marcu", "kwietniu", "maju", "czerwcu", "lipcu", "sierpniu", "wrześniu", "październiku", "listopadzie", "grudniu"];
const DNI_TYGODNIA = ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"];

export function dzisWarszawa(teraz: Date = new Date()): DataPL {
  const czesci = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Warsaw", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(teraz);
  const w = (typ: string) => Number(czesci.find((c) => c.type === typ)?.value);
  return { rok: w("year"), miesiac: w("month"), dzien: w("day") };
}

export function dniWMiesiacu(rok: number, miesiac: number): number {
  return new Date(Date.UTC(rok, miesiac, 0)).getUTCDate();
}

export function przesunMiesiac(rok: number, miesiac: number, o: number): { rok: number; miesiac: number } {
  const indeks = rok * 12 + (miesiac - 1) + o;
  return { rok: Math.floor(indeks / 12), miesiac: (indeks % 12) + 1 };
}

export function roznicaDni(od: DataPL, do_: DataPL): number {
  const a = Date.UTC(od.rok, od.miesiac - 1, od.dzien);
  const b = Date.UTC(do_.rok, do_.miesiac - 1, do_.dzien);
  return Math.round((b - a) / 86_400_000);
}

export function formatDaty(d: DataPL): string {
  return `${d.dzien} ${MIESIACE_DOPELNIACZ[d.miesiac - 1]} ${d.rok} r.`;
}

export function formatDniaTygodnia(d: DataPL): string {
  const dzien = DNI_TYGODNIA[new Date(Date.UTC(d.rok, d.miesiac - 1, d.dzien)).getUTCDay()];
  return `${dzien.charAt(0).toUpperCase()}${dzien.slice(1)}, ${d.dzien} ${MIESIACE_DOPELNIACZ[d.miesiac - 1]} ${d.rok}`;
}

export function nazwaMiesiacaMiejscownik(miesiac: number): string {
  return MIESIACE_MIEJSCOWNIK[miesiac - 1];
}

export function liczbaDni(n: number): string {
  return n === 1 ? "1 dzień" : `${n} dni`;
}

export function nazwaMiesiacaDopelniacz(miesiac: number): string {
  return MIESIACE_DOPELNIACZ[miesiac - 1];
}
