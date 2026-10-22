# Strona główna Energypedia.pl na start (listopad 2026 r.)

Stan: propozycja z 22.10.2026 r., zaktualizowana po decyzjach naczelnego z tego samego dnia (rozdz. 0). Podstawa: makiety „FINAL · strona główna (komputer)” i „FINAL · telefon”, `PLAN_MVP_do_konca_2026.md`, `ARCHITEKTURA_serwisu_Energypedia.md`, `MAPA_TEMATOW.md`.

## 0. Decyzje naczelnego (22.10.2026 r.)
- **Asystent AI zostaje w pierwszym ekranie i działa od startu.** Dopisany do zakresu MVP (`PLAN_MVP_do_konca_2026.md`, pozycja 11 i zadanie 7.9; ADR-13 w architekturze).
- **Temat miesiąca zostaje:** „Zmiana sprzedawcy prądu 2027: kiedy wypowiedzieć umowę” (rozdz. 3a).
- **Lista najnowszych wiadomości zostaje** na komputerze i na telefonie.

## 1. Analiza obecnych makiet

### Co działa i zostaje
- **Obietnica marki w pierwszym ekranie:** „Zrozum [temat] w minutę. Ze źródłami.” Krótka, konkretna, odróżnia nas od portali newsowych.
- **„Energia dziś”:** liczby ze źródłem i datą (taryfa, giełda, opłata mocowa, moc fotowoltaiki). To nasz znak rozpoznawczy, przydatny także dla dziennikarzy.
- **Trackery „Na bieżąco”** i **„Najczęstsze pytania w tym tygodniu”:** dobrze odpowiadają na intencje z mapy tematów i wzmacniają widoczność w wyszukiwarkach AI.
- **Strefy reklamowe** z zarezerwowaną wysokością, oznaczony materiał partnera, „Jak zarabiamy” przy narzędziach. Reklamodawca widzi uporządkowane, bezpieczne otoczenie dla marki.
- **Dolne menu na telefonie, newsletter, przycisk preferowanych źródeł Google, stopka zaufania.**

### Co nie zadziała w listopadzie
1. ~~Pierwszy ekran opiera się na asystencie AI, którego nie było w zakresie MVP.~~ Rozwiązane: asystent jest w MVP od startu (decyzja z 22.10.2026 r.).
2. **Sekcja „Wynik w 60 sekund” pokazuje narzędzia dostępne od I kw. 2027 r.** Na telefonie dwie z trzech kart mają etykietę „Od I kw. 2027”. Na starcie to sygnał „jeszcze nie gotowe”.
3. **Brak rzeki najnowszych wiadomości na komputerze.** Na starcie nowy serwis musi pokazać, że żyje: godzina, tytuł, dział. Na telefonie lista jest tylko w panelu dolnego menu.
4. **Barometr Odbiorców pokazuje wynik, którego nie będzie.** Badanie w terenie trwa 24 XI – 4 XII, wyniki będą w grudniu.
5. **Cztery segmenty odbiorców przy około 20–30 publikacjach.** Część widoków „Dla Ciebie” byłaby pusta albo powtarzalna.
6. **Nie ma tematu przewodniego miesiąca.** Taryfy na 2027 r. są najważniejszą sprawą przełomu listopada i grudnia, a dziś są jedną z czterech kart trackerów.
7. **Reklamodawca nie znajduje na stronie powodu, żeby się odezwać.** Są sloty, ale nie ma informacji, do kogo trafiamy, ani oferty na 2027 r. W stopce jest tylko „Reklama i media kit”.
8. **Kategorie reklamodawców nie mają swoich „domów” na stronie.** Spółki obrotu, firmy fotowoltaiczne i sprzedawcy magazynów energii nie widzą działu, który mogliby sponsorować.
9. **Brak twarzy redakcji.** Przy nowej marce nazwisko naczelnego i ekspertów buduje zaufanie czytelników i reklamodawców (E-E-A-T).

## 2. Termin: co oznacza „mocne wejście w listopadzie”

Obecny plan zakłada stronę „wkrótce” od 6 XI, gotowość serwisu 10 XII i miękki start w dniu decyzji URE o taryfach. Według planu produkcji na koniec listopada będzie około 18 publikacji i 75 haseł, a szablony stron mają być gotowe 27 XI.

**Rekomendacja: start publiczny w poniedziałek 30 listopada 2026 r., z tą stroną główną w wersji startowej.** Następnie w dniu decyzji URE strona przełącza się w „tryb taryf”, co daje drugi impuls medialny. Warunki:
- szablony i SEO techniczne przyspieszone o około tydzień (wykonawca: termin 27 XI to minimum);
- strona „wkrótce” od 6 XI już z zapisem „Powiadom mnie o taryfach 2027”, żeby w dniu startu mieć bazę;
- treści fali 1 o taryfach, rachunku, zmianie sprzedawcy i magazynach energii gotowe do 27 XI.

Wcześniejszy start (np. 16–20 XI) oznacza około 10 publikacji na stronie głównej. Odradzam: pierwsze wrażenie byłoby słabe dla czytelników i dla reklamodawców.

## 3. Proponowana strona główna: wersja startowa

Kolejność dla komputera; na telefonie ta sama treść w jednej kolumnie (różnice w rozdz. 4).

| # | Sekcja | Co widzi czytelnik | Co widzi reklamodawca | Gotowe w MVP |
|---|---|---|---|---|
| 0 | **Pasek dnia** | Data, „Taryfy 2027: czekamy na decyzję URE” z linkiem do trackera, godzina ostatniej aktualizacji | Serwis żyje i jest aktualny | Tak |
| 1 | **Pierwszy ekran: hasło marki i asystent AI** | „Zrozum [temat] w minutę. Ze źródłami.” Pole „Zapytaj Energypedię” z podpowiedziami pytań z tematu miesiąca; odpowiedź z przypisami i oznaczeniem AI; obok kafle „Energia dziś” | Nowoczesny, „danowy” wizerunek; funkcja, której nie mają konkurenci [DO WERYFIKACJI: przegląd serwisów konkurencyjnych] | Tak (decyzja 22.10.2026 r.) |
| 2 | **Temat miesiąca: Zmiana sprzedawcy prądu 2027: kiedy wypowiedzieć umowę** | Licznik dni do terminu, kalkulator „kiedy skończy się moja umowa”, trzy ścieżki według rodzaju umowy, wzór wypowiedzenia; obok mniejszy tracker „Taryfy 2027” z przyciskiem „Powiadom mnie w dniu decyzji URE” | Odbiorcy w momencie decyzji o sprzedawcy; argument do rozmów o profilach firm i pakietach na 2027 r. | Tak (rozdz. 3a) |
| 3 | **Najnowsze** (rzeka newsów, 6–8 pozycji) + **Najczęściej czytane** | Godzina, dział, tytuł; komentarz dnia | Rytm wydawniczy medium, nie bloga | Tak (newsroom od 16 XI na próbę) |
| 4 | **Sprawdź swoją sytuację** | 3 szybkie ścieżki: „Kto jest moim sprzedawcą i operatorem?” (województwo lub kod pocztowy → profile), „Jak czytać rachunek” (rachunek z objaśnieniami), „Masz ofertę od akwizytora?” (14 dni na odstąpienie, wzór pisma) | Pokazuje, że trafiamy do ludzi w momencie decyzji | Tak (katalog, poradnik, wzór); bez porównywarki |
| 5 | **Trzy działy tematyczne** | „Rachunek i sprzedawca”, „Fotowoltaika”, „Magazyn energii i dotacje” (PME2): po 1 przewodniku, 3 poradnikach i 1 haśle | Trzy „domy” dla trzech kategorii reklamodawców; od 2027 r. miejsce na „Partner działu” | Tak (treści z fali 1 i 2) |
| 6 | **Na bieżąco** (trackery) | Taryfy 2027, CSIRE i zmiana sprzedawcy w 24 h, nabór PME2, opłaty od 1 I 2027 | Treści, które ludzie śledzą i do których wracają | Częściowo (2 trackery w MVP; PME2 jako poradnik) |
| 7 | **Dla Ciebie** | Na start dwa segmenty: Dom i Firma, plus województwo; „W Twoim regionie” z operatorem i jego opłatami | Segmentacja odbiorców (argument sprzedażowy na 2027 r.) | Tak (16 stron regionów) |
| 8 | **Sprzedawcy i operatorzy** | Pasek 5 sprzedawców z urzędu i 5 operatorów (nazwy, bez logo do czasu zgody na użycie znaków) z linkami do profili | Firmy widzą swój profil i powód do rozmowy o strefie partnera | Tak (katalog w MVP) |
| 9 | **Barometr Odbiorców: zapowiedź** | „Pierwsze badanie: grudzień 2026”: o co pytamy, metodyka, zapis na wyniki | Ciekawy dla działów marketingu i PR; możliwy „Partner Barometru” | Tak (zapowiedź, wyniki w XII) |
| 10 | **Akademia magazynów energii: zapis** | Program 6 lekcji w newsletterze, zapis | Najlepsze miejsce dla sprzedawców magazynów i fotowoltaiki (sponsoring działu od III 2027) | Do decyzji: lekcje e-mailowe z istniejących poradników |
| 11 | **Redakcja i eksperci** | Naczelny i 3–4 ekspertów: zdjęcie, funkcja, link do bio; „Jak pracujemy” | Wiarygodne otoczenie marki | Tak [zdjęcia tylko za zgodą osób] |
| 12 | **Newsletter „Energia w 5 minut”** + „Dodaj nas w Google” | Duży blok zapisu; licznik zapisanych tylko wtedy, gdy liczba jest prawdziwa i warta pokazania | Baza subskrybentów jako zasięg do sprzedaży | Tak |
| 13 | **Pas „Dla firm z branży energii i OZE”** | Dyskretny, nisko na stronie | „Dotrzyj do osób, które decydują o prądzie, fotowoltaice i magazynie energii.” 2–3 liczby rynkowe ze źródłem, oferta „Partner założycielski 2027” (ograniczona liczba miejsc), media kit, kontakt | Tak (`/reklama` jest w MVP) |
| 14 | **Stopka zaufania** | Jak pracujemy, Jak zarabiamy, sprostowania, prasa | Przejrzystość, ochrona przed zarzutem stronniczości | Tak |

**Reklamy na starcie.** Zgodnie z planem do stycznia sloty wyświetlają reklamy własne (newsletter, powiadomienie o taryfach, Akademia, „Reklama w Energypedii”). Zostawiamy: billboard pod pierwszym ekranem i 1 slot w bocznej kolumnie; jeden materiał partnera w „Może Cię też zainteresować” dopiero po pierwszej umowie. Zasada ADR-4 bez zmian: żadnych reklam sprzedawców energii przy narzędziach i porównaniach.

**Liczby dla reklamodawców.** Do czasu własnych danych z analityki pokazujemy wyłącznie dane rynkowe ze źródłem, np. liczbę zmian sprzedawcy w I półroczu 2026 r. (URE) i wolumeny wyszukiwań „fotowoltaika” i „magazyn energii” (narzędzia SEO). [DO WERYFIKACJI: każda liczba na stronie źródłowej przed publikacją] Nie podajemy prognoz zasięgu jako faktów.

## 3a. Temat miesiąca: „Zmiana sprzedawcy prądu 2027: kiedy wypowiedzieć umowę”

**Adres:** `/temat/zmiana-sprzedawcy-2027` (strona zbiorcza; w mapie tematów jako „temat miesiąca”, fraza główna „kiedy wypowiedzieć umowę na prąd”). Łączy przewodnik o zmianie sprzedawcy, poradnik krok po kroku, wzór wypowiedzenia, tracker CSIRE, katalog sprzedawców i tracker taryf.

**Oś tematu: termin.** Według brzmienia art. 4j ust. 4 Prawa energetycznego (w wersji cytowanej w wynikach wyszukiwania) umowa odbiorcy w gospodarstwie domowym rozwiązuje się z ostatnim dniem miesiąca następującego po miesiącu, w którym oświadczenie o wypowiedzeniu dotarło do sprzedawcy; odbiorca może wskazać późniejszy termin. Wynika z tego, że wypowiedzenie, które dotrze do sprzedawcy w listopadzie, kończy umowę 31 grudnia, a w grudniu: 31 stycznia. **[DO WERYFIKACJI przed publikacją: aktualny tekst art. 4j w ISAP (serwis był niedostępny z naszego środowiska) oraz opinia Prawnika, jak przepis działa przy zmianie sprzedawcy przez pełnomocnictwo i w procesie CSIRE]**

**Budowa strony tematu**
1. **Odpowiedź w pierwszym akapicie** (blok „W skrócie”): kiedy wypowiedzieć, żeby od 1 stycznia mieć nowego sprzedawcę, i od czego to zależy.
2. **Kalkulator terminu:** data dotarcia wypowiedzenia i rodzaj umowy → data końca umowy. Prosta reguła, bez AI i bez danych osobowych; wynik z odnośnikiem do przepisu.
3. **Trzy ścieżki według umowy:**
   - umowa na czas nieoznaczony (np. taryfa sprzedawcy z urzędu): wypowiedzenie bez kosztów, opłacone zostaje tylko zużycie i dystrybucja (art. 4j ust. 3, do weryfikacji jak wyżej);
   - umowa na czas oznaczony, np. promocja kończąca się 31.12.2026 r.: sprawdź automatyczne przedłużenie, cenę po okresie promocji i karę za wcześniejsze rozwiązanie; u gospodarstw domowych koszty nie mogą przekraczać bezpośrednich strat sprzedawcy (art. 4j ust. 3a, do weryfikacji);
   - umowa od akwizytora: odstąpienie w terminie z ustawy o prawach konsumenta [DO WERYFIKACJI: 14 czy 30 dni w zależności od sposobu zawarcia umowy].
4. **Dylemat grudnia:** taryfy na 2027 r. będą znane dopiero po decyzji URE (w 2025 r. zapadła 17 grudnia). Pokazujemy scenariusze „zmieniam teraz”, „czekam na taryfę” i „zostaję”, bez rekomendowania konkretnego sprzedawcy.
5. **CSIRE:** co zmienia szybsza zmiana sprzedawcy, a czego nie zmienia (okres wypowiedzenia umowy). [DO WERYFIKACJI: stan przystąpienia operatorów do CSIRE po 19.10.2026 r.]
6. **Co przygotować:** numer punktu poboru energii, numer klienta, aktualna umowa i warunki ogólne; wzór wypowiedzenia do pobrania.
7. **Porównanie ofert:** odnośnik do porównywarki ofert Prezesa URE (do czasu własnej porównywarki w 2027 r.) i do profili 5 sprzedawców z urzędu.
8. **Pytania i asystent AI** z podpowiedziami: „Czy zapłacę karę za zerwanie umowy?”, „Czy zmiana sprzedawcy zmienia operatora?”, „Co, jeśli umowa przedłużyła się automatycznie?”.
9. **Firmy:** osobny akapit, bo termin z art. 4j ust. 4 dotyczy gospodarstw domowych; u firm decydują zapisy umowy.

**Neutralność:** na stronie tematu nie ma reklam ani materiałów sprzedawców energii (zasada jak dla narzędzi, ADR-4). Sprzedawcy zyskują na temacie pośrednio: ruch do katalogu i profili.

**Promocja:** newsletter z odliczaniem do końca listopada, informacja prasowa z terminem (media regionalne), krótkie wideo „kiedy wypowiedzieć umowę”, pytania z tematu w asystencie AI.

**Termin startu a temat.** Jeżeli przepis potwierdzi się, termin „do 30 listopada” jest najmocniejszym argumentem tematu, ale traci sens przy starcie 30 XI. Dwie możliwości:
- **A (rekomendowana, jeśli wykonawca potwierdzi szablony i asystenta do 12 XI):** start publiczny w poniedziałek 16 listopada; temat i asystent jako trzon strony, reszta treści dochodzi w kolejnych dniach. Odbiorcy mają dwa tygodnie na decyzję, a media dostają temat z terminem.
- **B:** start 30 XI zgodnie z wcześniejszą propozycją; temat prowadzimy jako „zmiana od 1 lutego i decyzja po taryfach URE”. Bezpieczniej technicznie, słabszy temat medialny.

## 4. Telefon: różnice
- **Pierwszy ekran:** hasło marki, wyszukiwarka, 4 przewijane w poziomie kafle „Energia dziś”; temat miesiąca zaraz pod nimi.
- **Najnowsze:** 5 pozycji na stronie i pełna lista w panelu „Nowe” dolnego menu (już zaprojektowanym).
- **Sekcje 4 i 5** jako karty przewijane w poziomie, żeby skrócić stronę.
- **Pas dla firm** zwinięty do jednej linii z linkiem; pełna wersja w panelu „Więcej” i w stopce.
- **Reklamy:** jedna 300×250 poza pierwszym ekranem i przyklejona 320×50 (zamykana).

## 5. Wygląd startu
- **Identyfikacja „edycji startowej”:** wejście animowanego logo (A + C) jeden raz na sesję, potem spokojnie.
- **Grafika:** pierwszy ekran i temat miesiąca w stylu „konstrukcja ze słupków”; zdjęcia ludzi w duotonie granat i biel ze znakiem krawędzi.
- **Mniej etykiet „wkrótce”:** funkcje z 2027 r. tylko jako jedna zapowiedź z zapisem na listę oczekujących, nie jako karty w głównym układzie.
- **Jednorazowy pasek powitalny:** „Nowy serwis o energii. Zobacz, jak pracujemy”, zamykany i zapamiętywany.
- **Wydajność:** limity LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1 także z animacją logo i slotami reklam.

## 6. Mierniki startu (pierwsze 30 dni)
- **Czytelnicy:** zapisy do newslettera, zapisy „Powiadom mnie o taryfach”, dodania w preferowanych źródłach Google, powracający użytkownicy, cytowania w mediach i w wyszukiwarkach AI.
- **Reklamodawcy:** pobrania media kitu, wejścia na `/reklama`, zapytania „Partner założycielski”, zgłoszenia weryfikacji profili firm.

## 7. Decyzje dla naczelnego
1. Data startu publicznego: wariant A (16 XI) albo B (30 XI), rozdz. 3a.
2. ~~Asystent AI na start~~: zdecydowane, asystent od startu.
3. Segmenty na start: Dom i Firma (rekomendacja) czy cztery.
4. Akademia magazynów energii jako kurs w newsletterze od startu.
5. Oferta „Partner założycielski 2027”: liczba miejsc i warunki (z Handlowcem).
6. Zgoda na zdjęcia redakcji i ekspertów na stronie głównej.
