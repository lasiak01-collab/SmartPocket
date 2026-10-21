Energypedia.pl to serwis o rynku energii elektrycznej dla domów, mikrofirm, średnich i dużych firm oraz samorządów. Obietnica marki: **Energia bez tajemnic. Rozumiesz, porównujesz, oszczędzasz.** System służy do budowy stron serwisu, newslettera, materiałów dla mediów i media kitu.

## Zasady treści

- **Pisz językiem odbiorcy, nie branży.** Zwracaj się do czytelnika na „Ty” („Zrozum swój rachunek”, „Dla Ciebie”). Zdania średnio do 20 słów, strona czynna, bez wykrzykników i straszenia podwyżkami.
- **Najpierw odpowiedź.** Lead i pierwsze zdanie karty odpowiadają wprost na pytanie z tytułu, z liczbą i datą.
- **Liczby po polsku:** przecinek dziesiętny i spacja tysięcy („495,16 zł/MWh”, „1 200 kWh”); zawsze jednostka i dopisek netto/brutto, gdy chodzi o ceny; źródło i data w notce („netto · decyzja Prezesa URE z 17.12.2025 r.”). Brak danych to „[— zł/MWh]”, nigdy zero.
- **Nazwy:** w tekście „Energypedia”, w stopkach i źródłach wykresów „Energypedia.pl”. Instytucje pełną nazwą przy pierwszym użyciu (Prezes URE, PSE, TGE).
- **Wielkie litery:** zdania i nagłówki zwykłą pisownią; WERSALIKI tylko w stylu `label` (nadtytuły, typ treści, „REKLAMA”).
- **Oznaczenia, których nie wolno pominąć:** „Odpowiedź AI na podstawie artykułów Energypedii” + zastrzeżenie w AnswerCard; „Materiał partnera” na treściach płatnych; „REKLAMA” nad każdym slotem; link „Jak zarabiamy” przy sponsoringu.
- **Bez emoji** w interfejsie i treściach.

## Kolor

- Tło strony `bg`; karty, kafle i pola `surface`; pierwszy ekran i wybrana karta segmentu `surface-soft`; tła drugiego planu `surface-muted`.
- Tekst `ink`; leady, opisy, przypisy `ink-muted`. Obramowania kart `line`; obramowania kontrolek i niewybranych chipów `line-strong` (min. 3:1).
- `volt` to kolor „prądu”: wypełnienie przycisku głównego (tekst `on-volt`), znak logo i kropka danych na żywo. **Nigdy nie stosuj `volt` jako koloru tekstu** — do akcentów w tekście służy `volt-ink`.
- Powierzchnia odwrócona `navy` z tekstem `on-navy` i opisami `on-navy-muted`: pas newslettera, przycisk drugorzędny.
- Stany: `status-bg` + `status-ink` (etap sprawy w trackerze, „Od I kw. 2027”); `danger` dla błędów, zawsze ze słowem lub ikoną.
- Treść płatna: `partner-bg`, przerywane `partner-line`, etykieta `partner-ink`. Nie używaj tych kolorów do treści redakcyjnych.
- Wykresy: `chart-1` (seria główna i wartość wyróżniona), `chart-2` (pozostałe słupki tej serii), `chart-3` i `chart-4` (kolejne serie, różnią się jasnością). Tekst na wykresach w `ink` / `ink-muted`.
- Kształty tła pierwszego ekranu w `volt-soft`, nigdy pod tekstem. Bez gradientów.
- Wszystkie pary tekst/tło spełniają WCAG AA w obu motywach (tekst `ink-muted` min. 6,8:1, `volt-ink` min. 4,9:1).

## Typografia

- Dwie rodziny z Google Fonts, ładowane jako fonty zmienne: `display` (Space Grotesk) do nagłówków i liczb, `sans` (Inter) do tekstu i interfejsu.
- `display-xl` tylko dla H1 pierwszego ekranu na komputerze (na telefonie `display-l`); `heading-1` dla nagłówków sekcji; `heading-2` dla tytułów kart odpowiedzi; `heading-3` dla tytułów kart.
- Tekst: `lead` pod H1, `body` w treści (wiersz 65–75 znaków), `small` w opisach kart i przypisach, `caption` w notkach pod liczbami i zastrzeżeniach, `label` w nadtytułach.
- Liczby w kaflach i tabelach z `font-variant-numeric: tabular-nums`.
- Nagłówkom dawaj `text-wrap: balance`.

## Odstępy i układ

- Skala: `space-1` … `space-16` (4–64 px). Boczny margines strony min. `space-4` na telefonie, `space-6` na komputerze; odstęp między sekcjami `space-14` na komputerze i `space-6` na telefonie.
- Kontener `content-max` (1280 px); treść pierwszego ekranu `hero-max` (940 px).
- Projektuj od telefonu: rzędy kart zawijają się (`flex-wrap`, karty min. ok. 220–260 px), kolumna boczna spada pod treść, rzędy kafli i trackerów na telefonie przewijają się poziomo.
- **Pierwszy ekran bez reklamy.** Kolejność strony głównej: pytanie i odpowiedź AI → „Energia dziś” → „Dla Ciebie” → narzędzia → reklama → „Na bieżąco” → pytania + kolumna boczna → sponsor działu → polecane → newsletter.

## Logo

- Znak: logo 3 „E z danych” — sygnet z czterech słupków (środkowy w `logo-accent`, kolorze prądu) i logotyp „energypedia.pl” (Manrope ExtraBold na krzywych): „energy” `logo-ink`, „pedia” `logo-word-accent`, „.pl” `logo-tld`.
- W serwisie używaj wyłącznie komponentu `Logo`. Nagłówek: `animate="intro-live"` — A (słupki wyrastają kolejno przy wejściu, ok. 0,95 s, raz) + C (środkowy słupek zmienia długość jak odczyt na żywo, cykl 6 s, pętla od 1,4 s). Stopka i materiały: wersja statyczna.
- Wysokość w nagłówku 40 px (telefon 32 px); pole ochronne = wysokość środkowego słupka; minimum 120 px szerokości logo i 24 px sygnetu.
- Pliki produkcyjne: grupa zasobów Logos; pełna paczka i księga znaku w `docs/energypedia/brand/logo`.

## Kształty, cienie, ruch

- Promienie: `radius-sm` pola i sloty, `radius-md` karty na telefonie, `radius-lg` karty i kafle, `radius-xl` duże pasy, `radius-pill` przyciski, chipy, etykiety.
- Karty w spoczynku nie mają cienia — tylko obramowanie `line`. `shadow-hover` wyłącznie w stanie najechania razem z uniesieniem o 2 px.
- Ruch: mikrointerakcje (najechanie na kartę, wciśnięcie przycisku, pulsująca kropka danych na żywo) jedno animowane słowo w H1 pierwszego ekranu i animacja sygnetu w nagłówku (A + C, patrz Logo). Bez animacji ozdobnych, paralaksy i 3D. Całość wyłącza `prefers-reduced-motion`.

## Motywy

- Dwa motywy: Jasny (domyślny) i Ciemny. Respektuj ustawienie systemu, a przełącznik słońce/księżyc w nagłówku daje wybór ręczny.
- Komponenty biorą kolory wyłącznie z tokenów; w ciemnym motywie logo przechodzi w negatyw (tokeny `logo-ink`, `logo-accent`, `logo-word-accent`, `logo-tld`).

## Dostępność

- Fokus klawiatury: obrys 3 px w `focus` z odsunięciem 2 px na każdym elemencie interaktywnym.
- Cele dotykowe min. `control-h` (44 px); pola z widoczną etykietą (pole „Zapytaj” z etykietą ukrytą wizualnie).
- Link „Przejdź do treści” jako pierwszy element strony; stan przełączników przez `aria-pressed`; ikony dekoracyjne z `aria-hidden`.

## Ikonografia

- Ikony liniowe, siatka 24 px, kreska 2 px, zaokrąglone zakończenia — grupa zasobów Icons (search, sun, moon, menu, book, calculator, mail, sparkle, close, arrow-right).
- W komponentach rysuj je jako wbudowane SVG z `stroke="currentColor"`, żeby przejmowały kolor tekstu; pliki SVG w zasobach mają kreskę w kolorze `ink` (#0B1B33) do użycia w `<img>` na jasnym tle.
- `sparkle` oznacza wyłącznie treści generowane przez AI. Bez emoji.

## Reklama i partnerzy

- Sloty reklamowe tylko przez AdSlot, ze stałą wysokością i etykietą „REKLAMA”; identyfikatory slotów zgodne z architekturą serwisu.
- **Strefa neutralna:** brak reklam sprzedawców energii w narzędziach, porównaniach i rankingach.
- Materiały partnerów tylko przez ContentCard z `partner` lub osobną stronę z tą samą etykietą; sponsoring działu przez SponsorBand.

## Dane i wykresy

- Jeden wykres = jedna teza w tytule („Ceny hurtowe spadły o 12% w listopadzie”).
- Pod wykresem: „Źródło: [instytucja] · opracowanie: Energypedia.pl”, licencja CC BY 4.0 i dane do pobrania w CSV.
- Słupki od zera, podpisy wartości zamiast legendy, kolory `chart-1` … `chart-4`.
