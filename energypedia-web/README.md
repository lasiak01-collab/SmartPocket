# Energypedia.pl: serwis (kod)

Strona główna w wersji startowej (start publiczny 16.11.2026 r.) według makiety „START 16 XI” i dokumentów w `docs/energypedia/`. Serwis budujemy samodzielnie (`docs/energypedia/CLAUDE.md`).

## Uruchomienie

```bash
npm install
npm run dev          # http://localhost:3000
npm run check        # typy, testy, kontrola treści
npm run build && npm start
```

Zmienne środowiskowe (domyślnie wszystko wyłączone):

| Zmienna | Działanie |
|---|---|
| `INDEKSOWANIE=tak` | Otwiera serwis dla wyszukiwarek (robots.txt, meta robots). Do startu zostaje wyłączone. |
| `ASYSTENT_AKTYWNY=tak` | Włącza odpowiedzi asystenta AI po przejściu testu startowego. |
| `WYDANIE=produkcja` | `npm run check:tresci` blokuje wydanie, dopóki w treściach są pola do uzupełnienia i znaczniki weryfikacji. |

## Stos

Next.js 16 (App Router, renderowanie na serwerze, odświeżanie strony głównej co godzinę), React 19, TypeScript, Vitest. Fonty Inter i Space Grotesk hostowane w serwisie (pakiety @fontsource-variable, licencja OFL), bez zapytań do Google. Kolory i odstępy z `docs/energypedia/design-system/tokens.json` (`python3 scripts/tokeny.py` generuje `src/app/tokeny.css`); motyw jasny i ciemny.

## Struktura

| Ścieżka | Zawartość |
|---|---|
| `src/app/page.tsx` | Strona główna: pasek dnia, asystent AI, Energia dziś, temat miesiąca, najnowsze, sekcje, newsletter, pas dla firm |
| `src/components/` | Komponenty (logo z animacją z księgi znaku, kalkulator terminu, asystent, dolne menu) |
| `src/content/strona-glowna.ts` | Treści do czasu podłączenia CMS |
| `src/content/konfiguracja.ts` | Przełączniki: indeksowanie, weryfikacje prawne, asystent |
| `src/lib/termin.ts` | Reguła terminu wypowiedzenia (art. 4j ust. 4 Prawa energetycznego) z testami |
| `src/app/api/zapytaj` | Punkt wejścia asystenta AI (do testu startowego zwraca informację o starcie) |
| `src/app/api/newsletter` | Zapis do newslettera (do podłączenia narzędzia wysyłkowego nie zapisuje adresów) |

## Stan i następne kroki

Działa: strona główna na komputerze i telefonie, kalkulator terminu (bez AI, liczony z bieżącej daty w strefie Europe/Warsaw), licznik do końca miesiąca (pokazywany dopiero po weryfikacji przepisu), personalizacja Dom/Firma i województwo w przeglądarce, motyw ciemny, dane strukturalne organizacji, blokada indeksowania do startu.

Następne kroki:
1. Payload CMS na PostgreSQL (z pgvector) i modele treści z planu MVP (zadanie 7.3); treści strony głównej przechodzą z `src/content` do CMS.
2. Asystent AI według `docs/energypedia/ASYSTENT_AI_Energypedia.md` (indeks, wyszukiwanie, generacja z przypisami, testy na 250 pytaniach).
3. Szablony podstron: temat miesiąca, artykuł, hasło, poradnik, tracker, profil sprzedawcy (makiety są gotowe).
4. Panele wysuwane dolnego menu (makieta „Menu dolne”), newsletter z rejestrem zgód, analityka z trybem zgody.
