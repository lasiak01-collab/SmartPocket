# Energypedia.pl – księga znaku (wersja 1.0, 21.10.2026 r.)

Znak: **sygnet „E z danych”** (litera E z trzech słupków wykresu, środkowy słupek w kolorze prądu) + **logotyp „energypedia.pl”** w kroju Manrope ExtraBold, zamieniony na krzywe.
Znaczenie: E jak energia, słupki jak dane i Barometr; „energy” + „pedia” = energia + encyklopedia.

## 1. Wersje znaku

| Wersja | Kiedy używać | Pliki |
|---|---|---|
| **Logo poziome z domeną** (podstawowe) | Nagłówek serwisu, materiały drukowane, prezentacje, media kit | `svg/energypedia-logo-poziome-*.svg`, `png/…-poziome-*`, `pdf/…-poziome-*` |
| Logo poziome bez domeny | Gdy domena jest podana obok (np. stopka z adresem) | `svg/energypedia-logo-poziome-bez-domeny-*.svg` |
| **Logo pionowe** | Formaty kwadratowe i wąskie: profile, plakaty pionowe, roll-upy | `svg/energypedia-logo-pionowe-*.svg`, `png/…-pionowe-*` |
| **Sygnet** | Awatary w social mediach, ikony, favicon, znak wodny na wykresach | `svg/energypedia-sygnet-*.svg`, `png/…-sygnet-*` |
| Ikona aplikacji | Ekran telefonu, PWA, skróty | `svg/energypedia-ikona-aplikacji.svg`, `web/icon-*.png`, `web/apple-touch-icon.png` |
| Favicon | Karta przeglądarki (uproszczony sygnet na granatowym kafelku, czytelny w 16 px) | `web/favicon.svg`, `web/favicon.ico`, `web/favicon-16/32/48.png` |
| Obraz do udostępnień | Podgląd linku w social mediach i komunikatorach | `web/og-image-1200x630.png` |
| **Logo animowane** | Nagłówek strony Energypedia.pl (główne użycie w serwisie), intro wideo | `animacja/…`, `web/naglowek-logo.html` |

**Warianty kolorystyczne:**
- `kolor` – na białym i jasnym tle (podstawowy);
- `negatyw` – na granacie #0B1B33 i ciemnych tłach;
- `czarne` – druk jednobarwny, faks, grawer;
- `biale` – na zdjęciach i kolorowych tłach, gdy negatyw jest nieczytelny.

## 2. Kolory

| Kolor | HEX | RGB | CMYK (orientacyjnie*) | Użycie w znaku |
|---|---|---|---|---|
| Granat | #0B1B33 | 11 27 51 | 78 47 0 80 | Słupki sygnetu i „energy” (wersja kolor) |
| Zieleń prądu | #00C2A8 | 0 194 168 | 100 0 13 24 | Środkowy słupek; „pedia” w negatywie |
| Zieleń tekstowa | #00796B | 0 121 107 | 100 0 12 53 | „pedia” na jasnym tle (czytelność tekstu) |
| Szary opisowy | #42526B | 66 82 107 | 38 23 0 58 | „.pl” na jasnym tle |
| Jasny szary | #C9D4E3 | 201 212 227 | 11 7 0 11 | „.pl” w negatywie |

\* Wartości CMYK są przeliczeniem matematycznym z RGB, bez profilu kolorów. Przed pierwszym drukiem poproś drukarnię o proof (np. na profilu ISO Coated v2 / FOGRA39) i ewentualny dobór koloru Pantone. Pliki PDF są w RGB.

## 3. Pole ochronne i minimalne rozmiary

- **Pole ochronne** = wysokość środkowego słupka sygnetu (¼ wysokości sygnetu) z każdej strony. W plikach SVG/PNG/PDF jest już zachowane: nie przycinaj ich.
- **Minimalna szerokość logo poziomego:** 120 px na ekranie, 30 mm w druku.
- **Minimalny sygnet:** 24 px / 6 mm; poniżej używaj wersji favicon (grubsze słupki).

## 4. Animacja (główna wersja w serwisie)

- **A – wejście:** po załadowaniu strony słupki wyrastają kolejno: pion (0 s) → górny (0,15 s) → środkowy (0,30 s) → dolny (0,45 s); każdy 0,5 s, krzywa `cubic-bezier(.2,.8,.2,1)`; razem ok. 0,95 s, jeden raz.
- **C – odczyt na żywo:** od 1,4 s środkowy (zielony) słupek łagodnie zmienia długość (100% → 112% → 92% → 105% → 100%), cykl 6 s, w pętli, `ease-in-out`.
- Logotyp jest statyczny; animuje się tylko sygnet.
- Przy ustawieniu systemowym „ogranicz ruch” animacja jest wyłączona i wyświetla się pełny, statyczny znak.
- Pętla C dotyczy tylko logo w nagłówku i ekranu ładowania; w stopce, materiałach, PDF i na wykresach używaj wersji statycznej.
- Technika: czysty CSS w pliku SVG (bez bibliotek); gotowy fragment HTML do nagłówka: `web/naglowek-logo.html`; same reguły: `animacja/logo-animacja.css`.

## 5. Czego nie robić

- Nie zmieniaj kolorów (poza wersjami z punktu 1), proporcji ani kroju logotypu.
- Nie zmieniaj koloru środkowego słupka na inny niż zieleń prądu (lub kolor jednobarwnej wersji).
- Nie obracaj, nie pochylaj, nie dodawaj cieni, obrysów ani gradientów.
- Nie składaj logotypu z fontu w programie – używaj plików (krój jest zamieniony na krzywe).
- Nie umieszczaj wersji kolor na granacie ani negatywu na jasnym tle.
- Nie animuj logotypu i nie twórz własnych animacji sygnetu.

## 6. Zawartość paczki

```
svg/        wektorowe wersje do druku i ekranu (logo poziome, pionowe, sygnet, ikony, og-image)
png/        bitmapy z przezroczystym tłem: logo 600/1200/2400 px, pionowe 800 px, sygnet 512/1024 px
pdf/        logo do druku (RGB, wektor)
web/        favicon.ico/.svg/.png, apple-touch-icon, ikony PWA, site.webmanifest, og-image, head-snippet.html, naglowek-logo.html
animacja/   logo i sygnet animowane (SVG z CSS), logo-animacja.css
zrodlo/     generuj_logo.py – skrypt, który odtwarza całą paczkę
```

## 7. Status prawny

Znak przed zgłoszeniem do UPRP lub EUIPO powinien zostać sprawdzony przez rzecznika patentowego (podobieństwo do istniejących znaków, w tym „energypedia”). Krój Manrope jest udostępniony na licencji SIL Open Font License 1.1, która pozwala na użycie w logo.
