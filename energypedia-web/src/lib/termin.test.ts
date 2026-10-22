import { describe, expect, it } from "vitest";
import { miesiaceDoWyboru, odliczanie, terminRozwiazania } from "./termin";
import { dzisWarszawa, formatDaty, formatDniaTygodnia, liczbaDni } from "./daty";

describe("terminRozwiazania", () => {
  it("wypowiedzenie w listopadzie kończy umowę 31 grudnia", () => {
    const w = terminRozwiazania({ rok: 2026, miesiac: 11 });
    expect(w.koniecUmowy).toEqual({ rok: 2026, miesiac: 12, dzien: 31 });
    expect(w.nowySprzedawcaOd).toEqual({ rok: 2027, miesiac: 1, dzien: 1 });
  });
  it("grudzień przechodzi przez koniec roku", () => {
    const w = terminRozwiazania({ rok: 2026, miesiac: 12 });
    expect(w.koniecUmowy).toEqual({ rok: 2027, miesiac: 1, dzien: 31 });
    expect(w.nowySprzedawcaOd).toEqual({ rok: 2027, miesiac: 2, dzien: 1 });
  });
  it("luty w roku zwykłym i przestępnym", () => {
    expect(terminRozwiazania({ rok: 2027, miesiac: 1 }).koniecUmowy.dzien).toBe(28);
    expect(terminRozwiazania({ rok: 2028, miesiac: 1 }).koniecUmowy.dzien).toBe(29);
  });
});

describe("odliczanie", () => {
  it("16 listopada 2026: zostało 14 dni", () => {
    const s = odliczanie({ rok: 2026, miesiac: 11, dzien: 16 });
    expect(s.rodzaj).toBe("zostalo");
    if (s.rodzaj === "zostalo") expect(s.dni).toBe(14);
  });
  it("30 listopada to ostatni dzień", () => {
    expect(odliczanie({ rok: 2026, miesiac: 11, dzien: 30 }).rodzaj).toBe("ostatni-dzien");
  });
  it("1 grudnia liczy do końca grudnia, a umowa kończy się 31 stycznia", () => {
    const s = odliczanie({ rok: 2026, miesiac: 12, dzien: 1 });
    expect(s.wynik.koniecUmowy).toEqual({ rok: 2027, miesiac: 1, dzien: 31 });
  });
});

describe("daty", () => {
  it("formatuje datę i dzień tygodnia po polsku", () => {
    expect(formatDaty({ rok: 2026, miesiac: 12, dzien: 31 })).toBe("31 grudnia 2026 r.");
    expect(formatDniaTygodnia({ rok: 2026, miesiac: 11, dzien: 16 })).toBe("Poniedziałek, 16 listopada 2026");
    expect(liczbaDni(1)).toBe("1 dzień");
    expect(liczbaDni(14)).toBe("14 dni");
  });
  it("liczy datę w strefie Warszawy", () => {
    // 23:30 UTC 15 listopada to już 16 listopada w Warszawie (CET, UTC+1)
    expect(dzisWarszawa(new Date("2026-11-15T23:30:00Z"))).toEqual({ rok: 2026, miesiac: 11, dzien: 16 });
  });
  it("podaje trzy kolejne miesiące", () => {
    expect(miesiaceDoWyboru({ rok: 2026, miesiac: 11, dzien: 16 })).toEqual([
      { rok: 2026, miesiac: 11 }, { rok: 2026, miesiac: 12 }, { rok: 2027, miesiac: 1 },
    ]);
  });
});
