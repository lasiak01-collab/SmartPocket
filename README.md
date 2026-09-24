# Smart Pocket

Aplikacja do digitalizacji i rozliczania **paragonów za parkowanie samochodu służbowego**.
Działa w telefonie jak zwykła aplikacja (PWA – „Dodaj do ekranu głównego”), także offline.

## Jak to działa

1. **Zdjęcie / galeria** – robisz zdjęcie paragonu aparatem z poziomu aplikacji albo wybierasz jedno lub wiele zdjęć z galerii
   (na komputerze także przeciągnij i upuść lub Ctrl+V; na Androidzie „Udostępnij → Smart Pocket”).
2. **Robot odczytuje dane (OCR)** – zdjęcie trafia do bazy, jest obrabiane (skala szarości, kontrast, skalowanie),
   a następnie rozpoznawane:
   - **OCR lokalny** – Tesseract (język polski) działający w telefonie; zdjęcia nie opuszczają urządzenia,
   - **OCR AI** (opcjonalnie) – model Claude z wizją, najlepszy przy pogniecionych i słabo oświetlonych paragonach
     (wymaga własnego klucza API Anthropic; przy błędzie aplikacja sama wraca do OCR lokalnego).

   Parser rozpoznaje: datę, godzinę wjazdu i wyjazdu / ważności biletu, czas postoju (także przez północ),
   adres i miasto, strefę / parkomat, operatora, NIP (z weryfikacją sumy kontrolnej), numer rejestracyjny,
   kwotę brutto, VAT i stawkę, formę płatności, numer paragonu / biletu.
3. **Weryfikacja** – zdjęcie obok formularza; pola niepewne są podświetlone na żółto, brakujące – obramowane na czerwono.
   Każde pole można poprawić; czas postoju przelicza się automatycznie. Aplikacja ostrzega o duplikatach,
   błędnym NIP-ie, dacie z przyszłości itp. „Zatwierdź i dalej” przechodzi do kolejnego dokumentu.
4. **Przesłanie do systemu** – zatwierdzone dokumenty wysyłasz:
   - na **adres API systemu firmowego** (POST JSON z danymi, danymi pracownika i opcjonalnie zdjęciami, token Bearer), albo
   - jako **paczkę ZIP** (zestawienie CSV dla Excela, dane JSON, zdjęcia paragonów) – na telefonie od razu
     do udostępnienia e-mailem / komunikatorem.

   Wysłane dokumenty są blokowane przed edycją, a historia wysyłek pozwala pobrać paczkę ponownie.

Dodatkowo: pulpit z kosztami bieżącego miesiąca i wykresem 6 miesięcy, lista z wyszukiwarką i filtrami
(miesiąc, status), operacje zbiorcze, **miesięczny raport rozliczeniowy** do druku / PDF (z miejscem na podpisy),
eksport CSV, kopia zapasowa i przywracanie (JSON ze zdjęciami), historia zmian każdego dokumentu.

## Dane i prywatność

Wszystkie paragony, zdjęcia i ustawienia są przechowywane lokalnie w przeglądarce (IndexedDB) na Twoim urządzeniu.
Rób regularnie kopię zapasową (Ustawienia → Kopia zapasowa). Klucz API i token nie trafiają do kopii.

## Uruchomienie

Aplikacja jest statyczna – nie wymaga budowania ani serwera aplikacyjnego.

```bash
npm start          # http://localhost:8080
npm test           # testy parsera paragonów
```

Aparat w przeglądarce wymaga HTTPS (lub `localhost`). Najprościej opublikować przez **GitHub Pages**:
Settings → Pages → Source: *GitHub Actions*. Workflow `.github/workflows/pages.yml` uruchamia testy
i publikuje aplikację po każdym pushu do `main`. Następnie otwórz adres w telefonie i wybierz
„Dodaj do ekranu głównego”.

Przy pierwszym odczycie OCR pobierany jest silnik Tesseract i model języka polskiego (ok. 15 MB) –
później działają z pamięci podręcznej, także bez internetu.

## Struktura

| Plik | Rola |
| --- | --- |
| `index.html`, `css/app.css` | interfejs (mobile-first, tryb ciemny, druk raportu) |
| `js/app.js` | widoki, kolejka OCR, weryfikacja, wysyłka, raport, ustawienia |
| `js/ocr.js` | obróbka zdjęć, Tesseract.js, odczyt AI (Claude, structured output) |
| `js/parser.js` | ekstrakcja pól z tekstu OCR (polskie paragony i bilety parkingowe) |
| `js/db.js` | baza IndexedDB |
| `js/utils.js` | formatowanie, CSV, duplikaty |
| `sw.js`, `manifest.webmanifest` | PWA: offline, instalacja, udostępnianie zdjęć do aplikacji |
