# Facebook: profil firmowy Energypedia.pl

Stan: 22.10.2026 r. Podstawa: obietnica marki (`zespol/00_kontekst_wspolny.md`), rola Facebooka w planie social media (`zespol/03_social_media.md`: gospodarstwa domowe, mikrofirmy, społeczności lokalne), `ZASADY_Energypedia.md`.

**Limity znaków.** Meta nie publikuje ich w źródłach, do których mam dostęp. Serwisy zewnętrzne podają 101 znaków dla wprowadzenia (bio) strony, ale część wskazuje wyższe limity dla stron firmowych. Dlatego biogram główny ma najwyżej 101 znaków, a dłuższy opis jest osobnym wariantem. [DO WERYFIKACJI: limity w edytorze strony, Ustawienia → Informacje o stronie]

## 1. Biogram (wprowadzenie), wersja główna

> **Zapytaj o prąd i dostań odpowiedź ze źródłami. Rachunki, umowy, taryfy, OZE. Energia bez tajemnic.**

98 znaków. Zaczyna od asystenta AI, głównej funkcji serwisu, potem wylicza tematy, a kończy hasłem marki.

**Warianty zapasowe (do testu albo zmiany po starcie):**
- „Energia bez tajemnic. Rachunki, umowy, taryfy i fotowoltaika wyjaśnione prosto, ze źródłami.” (92 znaki)
- „Rozumiesz, porównujesz, oszczędzasz. Prąd, rachunki i OZE dla domów i firm, zawsze ze źródłami.” (95 znaków)

## 2. Dłuższy opis (pole „Informacje”, jeśli edytor pozwala na więcej niż 101 znaków)

> Energypedia.pl to serwis o energii dla domów i firm. Wyjaśniamy rachunki, umowy, taryfy, fotowoltaikę i magazyny energii, zawsze ze źródłem i datą. Zapytaj asystenta AI albo zapisz się na newsletter „Energia w 5 minut”.

219 znaków.

## 3. Pozostałe pola strony

| Pole | Propozycja | Uwagi |
|---|---|---|
| Nazwa strony | Energypedia.pl | Tak jak w logo |
| Nazwa użytkownika | @energypedia | [DO WERYFIKACJI: dostępność; wariant zapasowy @energypediapl] |
| Kategoria | Strona z wiadomościami i mediami albo Wydawca | [DO WERYFIKACJI: dokładne nazwy kategorii w polskim edytorze] |
| Strona internetowa | https://energypedia.pl | Z parametrami UTM w linkach do kampanii, nie w polu strony |
| E-mail | [adres redakcji] | Adres skrzynki do uzupełnienia przez naczelnego |
| Przycisk akcji | „Zarejestruj się” z linkiem do zapisu na newsletter | Do 16 XI strona „wkrótce” z zapisem; [DO WERYFIKACJI: nazwy przycisków w polskim edytorze] |
| Zdjęcie profilowe | Sygnet w negatywie (białe słupki, środkowy w zieleni prądu) na granatowym tle; wersja animowana | `facebook/energypedia-facebook-profil-*` (rozdz. 6) |
| Zdjęcie w tle | Granat, logo w negatywie, hasło „Energia bez tajemnic.”, wykres ze słupków z jednym słupkiem w zieleni prądu | `facebook/energypedia-facebook-tlo-*` (rozdz. 6) |
| Informacje o redakcji | Redaktor naczelny: Mariusz Lach. Wydawca: [nazwa i adres wydawcy] | Dane wydawcy uzupełnia naczelny; ta sama treść co na stronie „Redakcja” |

## 4. Zasady dla biogramu
- Bez długiego myślnika, bez emoji i bez zwrotów reklamowych („najlepszy”, „nr 1”).
- Nie podajemy liczb (np. czytelników), dopóki nie mamy własnych, sprawdzonych danych.
- Biogram nie zmienia się na czas akcji; temat miesiąca promujemy przypiętym postem.
- Po 30 dniach od startu porównujemy warianty (kliknięcia przycisku akcji, wejścia na stronę) i zostawiamy lepszy.

## 5. Przypięty post na start (16 XI 2026 r.)

> Energypedia.pl już działa. Zapytaj o prąd własnymi słowami, a asystent odpowie na podstawie naszych artykułów, ze źródłami. Temat miesiąca: kiedy wypowiedzieć umowę na prąd, żeby od stycznia mieć nowego sprzedawcę. Link w komentarzu.

Zgodnie z planem social media link umieszczamy w komentarzu. Termin „do 30 listopada” dopisujemy dopiero po weryfikacji przepisu (`PLAN_MVP_do_konca_2026.md`, krok 9).

## 6. Pliki graficzne (`facebook/`)

| Plik | Do czego |
|---|---|
| `energypedia-facebook-tlo-1640x720.png` (i `.jpg`) | Zdjęcie w tle, wersja stała |
| `energypedia-facebook-tlo-start-16XI-1640x720.png` | Zdjęcie w tle na czas startu (z etykietą „Start 16 listopada 2026”); po starcie wracamy do wersji stałej |
| `podglad-stref-tlo.png` | Podgląd kadrowania: komputer, telefon i miejsce zdjęcia profilowego (nie publikować) |
| `energypedia-facebook-profil-granat-1080.png` | Zdjęcie profilowe, wersja statyczna (podstawowa) |
| `energypedia-facebook-profil-bialy-1080.png` | Wariant na białym tle (np. do testu w trybie ciemnym) |
| `energypedia-facebook-profil-animowany-petla-odczyt-6s.mp4` | Animowane zdjęcie profilowe: pętla 6 s (animacja C, odczyt na żywo), pierwsza klatka to pełny sygnet |
| `energypedia-facebook-profil-animowany-wejscie-i-odczyt-7s.mp4` | Wejście słupków + jeden cykl odczytu (A + C), 7,4 s; do postów, relacji i wideo, nie jako pętla profilu (pierwsza klatka jest pusta) |
| `energypedia-facebook-profil-animowany-petla-540.gif` | Pętla jako GIF, 540 px (komunikatory, prezentacje) |
| `zrodlo/generuj_facebook.py` | Skrypt, który generuje wszystkie pliki z tych samych parametrów co animacja w `logo/animacja/logo-animacja.css` |

**Wymiary i kadrowanie.** Tło ma 1640×720 px, czyli dwukrotność 820×360. Przewodniki zewnętrzne podają, że komputer pokazuje około 820×312, telefon 640×360, a zdjęcie profilowe zasłania lewy dolny róg; tekst i logo są w części widocznej na obu ekranach, a lewy dolny róg jest pusty. [DO WERYFIKACJI: podgląd po wgraniu na komputerze i telefonie]

**Animacja.** Ruch jest dokładnie ten z księgi znaku (A: wejście słupków, C: odczyt na żywo w cyklu 6 s); nie tworzymy innych animacji sygnetu. Sygnet zajmuje połowę boku, więc w okrągłym kadrze zostaje pełne pole ochronne. [DO WERYFIKACJI: czy strona firmowa w nowym widoku Facebooka przyjmuje wideo jako zdjęcie profilowe; jeśli nie, wgrywamy wersję statyczną, a pętlę używamy w postach i relacjach]
