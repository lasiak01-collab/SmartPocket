// Kontrola treści przed wydaniem: zakazany długi myślnik zawsze; pola do uzupełnienia
// i znaczniki [DO WERYFIKACJI] blokują tylko wydanie produkcyjne (WYDANIE=produkcja).
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const pliki = [];
const przejdz = (k) => {
  for (const n of readdirSync(k)) {
    const p = join(k, n);
    if (statSync(p).isDirectory()) przejdz(p);
    else if (/\.(ts|tsx|css|md)$/.test(n)) pliki.push(p);
  }
};
przejdz("src");

const produkcja = process.env.WYDANIE === "produkcja";
let bledy = 0;
let otwarte = 0;
for (const p of pliki) {
  readFileSync(p, "utf8").split("\n").forEach((linia, i) => {
    if (linia.includes("—")) { console.error(`${p}:${i + 1}: długi myślnik (U+2014)`); bledy++; }
    if (/\[DO WERYFIKACJI|\[liczba\]|\[godz\.\]|\[data, godzina\]|\[… zł\/MWh\]|\[Ekspert/.test(linia) && !p.endsWith(".test.ts") && !p.includes("sprawdz-tresci")) otwarte++;
  });
}
console.log(`Pola do uzupełnienia i weryfikacji: ${otwarte}`);
if (produkcja && otwarte > 0) { console.error("Wydanie produkcyjne zablokowane: uzupełnij pola i zakończ weryfikację."); bledy++; }
process.exit(bledy ? 1 : 0);
