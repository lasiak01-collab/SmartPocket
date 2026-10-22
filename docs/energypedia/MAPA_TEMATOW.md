# Energypedia.pl: mapa tematów (wersja 1.0, 21.10.2026 r.)

Źródło prawdy to arkusz **`mapa/Energypedia_mapa_tematow.xlsx`** (generowany skryptem `mapa/generuj_mape.py` z danych w `mapa/mapa_dane.py` i `mapa/dowody.py`). Ten dokument streszcza decyzje i sposób użycia.

## 1. Co zawiera mapa

| Arkusz | Zawartość |
|---|---|
| Obszary | 10 obszarów tematycznych, każdy ze stroną przewodnią (filarem) i frazą główną |
| Publikacje MVP | 74 publikacje do 31.12.2026 r.: 5 przewodników, 2 trackery, 20 artykułów i porównań, 5 analiz danych, 25 poradników, 5 wzorów pism oraz katalog (5 sprzedawców z urzędu, 5 operatorów sieci, 2 strony zbiorcze); dla każdej: H1, fraza główna, long tail, intencja, segment, URL, format pozycji zerowej, dane strukturalne, priorytet, sezonowość, termin, dowód popularności |
| Hasła | 300 haseł encyklopedii z adresem `/wiedza/…`; 120 oznaczonych jako MVP |
| Pytania long tail | 200 pytań odbiorców (po 20 na obszar); jednocześnie stały zestaw do comiesięcznego pomiaru cytowań w wyszukiwarkach AI |
| Kanibalizacja | 11 fraz, o które walczyłyby hasło i publikacja, z decyzją, która strona jest główna |
| Regiony | 16 stron województw |
| Taksonomia | obszary, segmenty, typy treści, regiony, tagi, encje |
| Technika SEO i GEO | wymagania techniczne całego serwisu |

## 2. Popularność fraz: co wiemy, a czego nie

Badanie z 21.10.2026 r. jest opisane w `mapa/badanie_popytu_fraz.md`. Najważniejsze ograniczenie: strony źródłowe i Google Trends były niedostępne, więc wszystkie liczby pochodzą z fragmentów wyników wyszukiwania i trzeba je sprawdzić u źródła.

- **Twarde wolumeny (ze stron agencji SEO, 2026 r.)** są tylko dla OZE: „fotowoltaika” ok. 90 500 miesięcznie, „pompa ciepła” ok. 60 500 (w styczniu ok. 135 000), „magazyn energii” ok. 33 100 przy wzroście ponad 50% rok do roku.
- **Sygnały pośrednie (URE, NFOŚiGW):** 45 891 zmian sprzedawcy w I półroczu 2026 r., 4 836 gospodarstw z ceną dynamiczną na koniec 2025 r., pytanie o opłaty na rachunku wśród najczęstszych pytań do URE, nabór Przydomowych Magazynów Energii (PME2) od 20.10.2026 r.
- **Brak danych o wyszukiwaniach** dla fraz: ceny prądu, taryfa G12, opłata mocowa, zmiana sprzedawcy prądu, net-billing, taryfa dynamiczna, ile kosztuje kWh, wallbox. W arkuszu mają znacznik [DO WERYFIKACJI w narzędziu SEO]; ich priorytet to ocena jakościowa redakcji.
- **„Rok w wyszukiwarce 2025” (Google, Polska):** według relacji prasowych nie ma w nim haseł energetycznych.

## 3. Priorytety i kolejność produkcji

Priorytet = popyt × wartość × szansa × pilność (każdy 1–3, maks. 81). Pierwsza piętnastka według arkusza:

1. Tracker „Taryfy na prąd 2027: na bieżąco” (start przed decyzją URE)
2. Magazyn energii w domu: kiedy się opłaca (podniesiony do fali 1: potwierdzony popyt i nabór PME2)
3. Ceny prądu w Polsce (przewodnik)
4. Ile kosztuje 1 kWh prądu w 2026 r.
5. Rachunek za prąd (przewodnik)
6. Zmiana sprzedawcy prądu (przewodnik)
7. Prąd dla firm (przewodnik)
8. Dlaczego rachunek rośnie, choć prąd na giełdzie tanieje
9. Taryfa dynamiczna
10. Ile kosztuje prąd w małej firmie
11. Pompa ciepła a rachunek za prąd (publikacja do połowy listopada, przed szczytem wyszukiwań XII–II)
12. Akwizytorzy energii
13. Jak zmienić sprzedawcę prądu krok po kroku
14. Jak czytać rachunek za prąd
15. Jak ubiegać się o dotację do magazynu energii i fotowoltaiki (fala 1, warunki PME2 do weryfikacji w NFOŚiGW)

**Fala 1** (do 20.11): 26 publikacji z najwyższym priorytetem. **Fala 2** (do 4.12): pozostałe 43, w tym katalog sprzedawców i operatorów (aktualizacja taryf 2027 w ciągu 24 godzin od decyzji URE). **Tydzień startu:** 5 analiz danych.

## 4. Decyzje porządkowe

- **Jedna intencja = jedna strona.** Frazy ogólne („opłata mocowa”, „taryfa G12”, „moc umowna”, „magazyn energii” i inne z arkusza Kanibalizacja) należą do publikacji; hasło encyklopedii celuje w definicję („co to jest …”) i linkuje do publikacji.
- **Adresy:** artykuły wyjaśniające i porównania pod `/poradniki/`, analizy danych pod `/analizy/` i `/dane/`, hasła pod `/wiedza/`, trackery pod `/na-biezaco/`, filary pod `/przewodniki/` (zgodnie z `ARCHITEKTURA_serwisu_Energypedia.md`).
- **Programy dotacyjne** opisujemy na stronach bez numeru edycji w adresie (np. „dotacja do magazynu energii”), a aktualną edycję w treści, żeby adres przetrwał kolejne nabory.
- **Bon energetyczny i Mój Prąd 6.0:** tylko jako hasła i wzmianki historyczne; nie tworzymy osobnych publikacji.

## 5. Technika SEO i GEO

Pełna lista jest w arkuszu „Technika SEO i GEO”. Najważniejsze punkty:
- treść renderowana po stronie serwera;
- mapy witryny i IndexNow;
- dane strukturalne według typu treści;
- Core Web Vitals w zakresie „dobry”;
- WCAG 2.2 AA;
- linkowanie filar ↔ publikacje ↔ hasła;
- blok „W skrócie” i nagłówki-pytania;
- fragmenty samodzielne pod H2;
- liczby ze źródłem i datą;
- strony zaufania („Jak pracujemy” jest w `JAK_PRACUJEMY.md`);
- comiesięczny pomiar cytowań w wyszukiwarkach AI na zestawie 200 pytań.

## 6. Następne kroki

1. **Dane o popycie:** pobrać wolumeny i sezonowość dla fraz z sekcji 2 (Planer słów kluczowych Google Ads, Senuto lub Semstorm, eksport Google Trends dla Polski z 5 lat) i wpisać je do `mapa/dowody.py`; arkusz przelicza priorytety.
2. **Weryfikacja liczb z badania** na stronach źródłowych przed użyciem w treściach.
3. **Regiony:** przypisać operatorów sieci do województw na podstawie map obszarów działania OSD.
4. **Plan tygodniowy fali 1** dla redakcji i ról AI.

## 7. Decyzje z 22.10.2026 r.

- **Katalog w MVP:** profile 5 sprzedawców z urzędu (PGE Obrót, TAURON Sprzedaż, Enea, Energa Obrót oraz E.ON na obszarze Stoen Operator) i 5 dużych operatorów sieci, ze stronami zbiorczymi `/sprzedawcy` i `/operatorzy`. Nazwy firm są stronami encji: nie tworzymy dla nich osobnych haseł encyklopedii. [DO WERYFIKACJI: pełne nazwy w zestawieniu URE]
- **Dział gazu:** od II kw. 2027 r. (obszar „gaz” dopiszemy do mapy przed startem działu).
- **Rankingi i zestawienia produktów:** od 2027 r., według jawnej metodyki zatwierdzonej przez Prawnika (szczegóły w `ARCHITEKTURA_serwisu_Energypedia.md`, rozdział 2.5).
