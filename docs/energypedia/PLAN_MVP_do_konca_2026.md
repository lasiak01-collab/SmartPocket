# Energypedia.pl – plan krok po kroku: MVP do 31 grudnia 2026 r.

**Wersja:** 1.0 · **Data:** 20 października 2026 r. · **Uzupełnia:** `BIZNESPLAN_Energypedia.md` (rozdziały 7, 8 i 15)
**Zasada:** najpierw treść, potem narzędzia. Do końca 2026 r. publikujemy **część edukacyjno-informacyjną**: bazę wiedzy, newsy, Barometr Rynku Energii i newsletter. Narzędzia transakcyjne (analizator faktury, porównywarka, generator zapytań ofertowych, leady) wchodzą w I kwartale 2027 r.

---

## 0. Co dokładnie publikujemy do końca roku (definicja MVP)

Mamy około **10 tygodni** (20 X – 31 XII 2026 r.; uwaga na święta 11 XI oraz 24–26 XII). MVP jest gotowe, gdy działa wszystko poniżej:

| # | Element MVP | Zakres na 31 XII 2026 r. | Miernik „zrobione” |
|---|---|---|---|
| 1 | **Serwis energypedia.pl** | Strona główna, działy: Wiadomości, Wiedza, Poradniki, Dane (Barometr), Regiony, O nas, Jak pracujemy, Prasa | Działa na telefonie i komputerze, Core Web Vitals na zielono, dostępność WCAG 2.2 AA w szablonach |
| 2 | **Publikacje evergreen** | **5 stron przewodnich, 2 trackery („Taryfy 2027 – na bieżąco”, „CSIRE – stan wdrożenia”), 20 artykułów wyjaśniających i porównań, 5 analiz danych** (plan w `zespol/06_redaktor_seo_aeo_geo.md`) | Każda publikacja ma strukturę SEO/AEO/GEO, ocenę jakości ≥ 80/100 i przeszła recenzję |
| 2a | **Encyklopedia (hasła)** | **120 haseł** (z listy 300 priorytetowych; najpierw pojęcia linkowane z publikacji) | Każde hasło przeszło recenzję merytoryczną i ma datę weryfikacji |
| 3 | **Poradniki krok po kroku** | **25 poradników** + 5 wzorów pism do pobrania | Checklista, wzór, sekcja „najczęstsze błędy” |
| 4a | **Katalog sprzedawców i operatorów** | **5 profili sprzedawców z urzędu** (PGE Obrót, TAURON Sprzedaż, Enea, Energa Obrót, E.ON na obszarze Stoen Operator) i **5 profili dużych operatorów sieci** (PGE Dystrybucja, TAURON Dystrybucja, Enea Operator, Energa-Operator, Stoen Operator) + strony zbiorcze | Dane publiczne ze źródłem i datą; aktualizacja taryf 2027 w ciągu 24 h od decyzji URE |
| 4 | **Strony regionalne** | **16 województw** (wersja podstawowa) | Operator sieci, jego opłaty, linki do dotacji, kontakt do instytucji |
| 5 | **Wiadomości** | Codziennie w dni robocze od miękkiego startu: 3–5 newsów i 1 komentarz | Rytm utrzymany przez 10 dni roboczych z rzędu |
| 6 | **Barometr Rynku Energii #1** | Miesięczny pulpit danych z komentarzem: ceny hurtowe, taryfy 2027 r., opłaty dystrybucyjne, generacja OZE | Publikacja i informacja prasowa |
| 7 | **Barometr Odbiorców (badanie) #0** | Własna ankieta internetowa wśród czytelników, listy oczekujących i obserwujących; jawna metodyka i informacja, że próba nie jest reprezentatywna | Raport, wykresy CC BY, informacja prasowa |
| 8 | **Newsletter** | „Energia w 5 minut” (dni robocze) + tygodniowy dla firm | ≥ 2000 subskrybentów na 31 XII (z listy oczekujących) |
| 9 | **Pokój prasowy i baza ekspertów** | Wykresy do pobrania, kontakt do dyżurnego eksperta, informacje prasowe | ≥ 10 cytowań w mediach w grudniu |
| 11 | **Asystent AI „Zapytaj Energypedię”** (decyzja naczelnego 22.10.2026 r.) | Odpowiedzi wyłącznie na podstawie opublikowanych treści Energypedii (hasła, poradniki, przewodniki, trackery, profile firm), z przypisami do źródeł i datą aktualizacji; oznaczenie „Odpowiedź wygenerowana przez AI”; odmowa i odesłanie, gdy nie ma podstawy w naszych treściach albo pytanie wymaga porady prawnej w indywidualnej sprawie; pytania bez odpowiedzi trafiają do redakcji jako tematy | Zestaw 200 pytań testowych z mapy tematów: ≥ 90% odpowiedzi poprawnych według recenzenta, 0 odpowiedzi bez źródła, odmowa w 100% pytań spoza zakresu |
| 10 | **Fundament prawny** | Regulamin, polityka prywatności i cookies, statut redakcji, polityka sprostowań, „Jak zarabiamy” | Zatwierdzone przez prawnika |

**Kamień milowy kluczowy:** **miękki start w dniu ogłoszenia przez URE taryf na 2027 r.** (w 2025 r. URE zatwierdziło taryfy 17 grudnia). Planujemy gotowość serwisu na **10 grudnia 2026 r.**, a datę startu przesuwamy na dzień decyzji URE. Taryfy to najczęściej wyszukiwany temat energetyczny roku i najlepszy moment na pierwsze cytowania.

**Czego NIE robimy przed końcem roku** (żeby zdążyć): analizatora faktury, porównywarki, rankingów firm i produktów, działu gazu (start w II kw. 2027 r.), leadów, panelu PRO, aplikacji, wydarzeń. Asystent AI jest w MVP (decyzja naczelnego 22.10.2026 r.), ale tylko na naszych treściach: bez kalkulacji rachunku i bez danych użytkownika. Wyjątek: **lista oczekujących** na narzędzia (zapis e-mail), żeby zebrać bazę przed styczniem.

---

> **Zasada od 22.10.2026 r.: wszystko robimy samodzielnie.** Serwis, asystenta AI i treści przygotowuje naczelny z wirtualnym zespołem ról AI (`zespol/`) i z Claude Code jako narzędziem programistycznym. Nie planujemy wykonawców, agencji, autorów zewnętrznych, kancelarii ani zapytań ofertowych i wycen, teraz ani później. Asystent AI „Zapytaj Energypedię” to jedna z głównych funkcji serwisu; specyfikacja budowy jest w `ASYSTENT_AI_Energypedia.md`.

## 1. Kolejność prac w skrócie (ścieżka krytyczna)

```
TYDZ. 1 (20–23 X)  Decyzje: nazwa/znak, domena, spółka, budżet ─┐
TYDZ. 2 (26–30 X)  Zasady redakcyjne, mapa tematów, start budowy serwisu ├─► BLOKUJE wszystko dalej
TYDZ. 3 (2–6 XI)   Szablony treści, strona „wkrótce” + lista oczekujących, indeks asystenta AI
TYDZ. 4–7 (9 XI – 4 XII)  PRODUKCJA TREŚCI (hasła, poradniki, regiony) ║ budowa serwisu i asystenta AI ║ ankieta barometru
TYDZ. 5–7          „Próba generalna” newsroomu (newsy publikowane wewnętrznie)
TYDZ. 8 (7–11 XII) Kontrola jakości, SEO, prawo, gotowość 10 XII
TYDZ. 9 (14–18 XII) MIĘKKI START w dniu taryf URE + Barometr #1 + informacja prasowa
TYDZ. 10–11 (21–31 XII) Stabilizacja, Barometr Odbiorców #0 (jeśli nie w tyg. 9), podsumowanie roku, plan na styczeń
```

Trzy ścieżki idą **równolegle** od tygodnia 3: **(A) treści**, **(B) serwis, technologia i asystent AI**, **(C) dane i barometr**. Wszystkie prowadzi naczelny z wirtualnym zespołem, więc kolejność dnia ustala priorytet: najpierw weryfikacja treści, potem kod, potem reszta.

---

## 2. Krok po kroku

### KROK 1. Decyzje blokujące (tydzień 1: 20–23 października)

| # | Zadanie | Wynik | Kto |
|---|---|---|---|
| 1.1 | Sprawdzić, czy **domena energypedia.pl** jest Twoja albo do kupienia; zarejestrować warianty (energypedia.com.pl, energiapedia.pl, literówki) | Domeny zabezpieczone | Właściciel |
| 1.2 | **Własne badanie znaku *energypedia*** w bazach UPRP, EUIPO (TMview) i WIPO (Global Brand Database) z analizą roli Prawnik | Decyzja: nazwa OK / wariant z wyróżnikiem | Naczelny + Prawnik (rola AI) |
| 1.3 | Zająć profile: LinkedIn (strona firmowa), YouTube, Instagram, TikTok, Facebook, X, Threads | Profile zarezerwowane | Właściciel |
| 1.4 | Założyć spółkę (lub prowadzić start na istniejącej działalności, z przeniesieniem później) | Podmiot do umów | Właściciel + księgowy |
| 1.5 | Zatwierdzić **budżet MVP** (rozdział 6: koszty działania, bez wykonawców) | Budżet | Właściciel |

> **Dlaczego tak:** bez decyzji o nazwie nie ma sensu rozwijać identyfikacji i domen. Naczelnym jest Mariusz Lach, więc standardy redakcyjne powstają od razu.

### KROK 2. Zasady redakcyjne i plan treści (tydzień 2: 26–30 października)

| # | Zadanie | Wynik |
|---|---|---|
| 2.1 | **Statut redakcji i kodeks** (rozdział redakcji od sprzedaży, oznaczanie materiałów partnerów, polityka sprostowań, konflikty interesów, zasady użycia AI) | Dokument 3–5 stron, publikowany jako „Jak pracujemy” |
| 2.2 | **Przewodnik stylu** (ton, słownik pojęć, zapis liczb i jednostek: zł/MWh, gr/kWh, MWh netto/brutto, nazwy instytucji, zasady cytowania źródeł) | Dokument + lista kontrolna dla autora |
| 2.3 | **Mapa tematów (SEO)**: około 3000 fraz w klastrach; z niej **lista 300 haseł** i **60 poradników** z priorytetem (popyt × zgodność z modelem przychodów × sezonowość) | Arkusz: fraza, intencja, segment, priorytet, autor, termin |
| 2.4 | **Taksonomia serwisu**: działy, segmenty (dom / mikrofirma / MŚP / duża firma i samorząd), tagi (taryfy, dystrybucja, OZE, regulacje, rynek hurtowy, CSIRE…), regiony | Struktura w CMS |
| 2.5 | **Rejestr źródeł pierwotnych** (URE, PSE, Ministerstwo Energii, Sejm i ISAP, Dziennik Ustaw, TGE, GUS, KE, ACER, operatorzy sieci, sprzedawcy z cennikami) + monitoring (RSS, alerty, listy na X i LinkedIn) | Lista z adresami i częstotliwością sprawdzania |
| 2.6 | **Start budowy serwisu** we własnym zakresie: repozytorium, Next.js + Payload CMS + PostgreSQL z pgvector, środowisko testowe (krok 7) | Działające środowisko testowe |
| 2.7 | **Kwestionariusz Barometru Odbiorców #0** jako własna ankieta internetowa (krok 6) | Projekt ankiety |

### KROK 3. Szablony, zespół i lista oczekujących (tydzień 3: 2–6 listopada)

| # | Zadanie | Wynik |
|---|---|---|
| 3.1 | **Szablony treści** w CMS i jako dokumenty dla autorów: hasło, poradnik, news, komentarz, strona regionalna, barometr (wzory w załączniku A) | 6 szablonów |
| 3.2 | **Rytm produkcji treści:** naczelny + wirtualny zespół (Redaktor SEO, Analityk rynku, Recenzent, Prawnik); każdy tekst przechodzi recenzję roli Recenzent i akceptację naczelnego. Eksperci z Rady Ekspertów są źródłami i rozmówcami, bez umów o pisanie | Plan tygodniowy |
| 3.3 | **Test standardu:** 5 haseł próbnych przez pełny proces (szkic, recenzja, weryfikacja źródeł, akceptacja); pomiar czasu na tekst | Norma dzienna dla naczelnego |
| 3.4 | **Strona „wkrótce” na energypedia.pl** z zapisem na newsletter i listę oczekujących na narzędzia (zgody RODO osobno dla newslettera i dla powiadomień o narzędziach) | Strona działa od 6 XI |
| 3.5 | **Identyfikacja wizualna** (logo, design system, styl grafik i wykresów): **gotowa**, wykonana samodzielnie (`brand/`, `design-system/`) | Pakiet do serwisu i social mediów |
| 3.6 | **Baza dziennikarzy** (300 kontaktów: gospodarka, energetyka, media regionalne, radio) + **własny monitoring mediów** od 1 XII (codzienny przegląd przez rolę Analityk rynku, alerty, rejestr cytowań) | Baza w CRM, rejestr cytowań |
| 3.7 | **Dane rynkowe** do Barometru: sprawdzić regulaminy i publiczne cenniki TGE i PSE; gdzie licencja nie jest potrzebna, korzystamy z danych publicznych z przypisem | Decyzja o źródłach |

### KROK 4. Produkcja treści – fala 1 i 2 (tygodnie 4–7: 9 listopada – 4 grudnia)

To serce MVP. Pracujemy w **cyklu tygodniowym** z linią produkcyjną:

```
Poniedziałek: przydział tematów (z listy priorytetów) → autor
Do środy:     szkic w CMS (wg szablonu) → redaktor (język, struktura, SEO)
Do piątku:    recenzja merytoryczna (ekspert) → poprawki → status „gotowe do publikacji”
Kolejny tydz.: grafiki/schematy, linkowanie wewnętrzne, metadane → kolejka publikacji
```

**Plan wolumenów (narastająco):**

| Tydzień | Publikacje evergreen | Hasła | Poradniki | Strony regionalne | Uwagi |
|---|---:|---:|---:|---:|---|
| 4 (9–13 XI, święto 11 XI) | 4 | 20 | 4 | – | Najważniejsze hasła „rachunek i taryfy” |
| 5 (16–20 XI) | 10 | 45 | 10 | 8 | Start próby newsroomu |
| 6 (23–27 XI) | 18 | 75 | 17 | 16 | Badanie barometru w terenie |
| 7 (30 XI – 4 XII) | 25 | 100 | 22 | 16 | Treści o taryfach 2027 r. gotowe w wersjach „przed decyzją URE” |
| 8 (7–11 XII) | **32** | **120** | **25** | **16** | Kontrola jakości, zamrożenie zakresu |

**Kolejność tematów (fala 1 = najpierw to, czego ludzie szukają w grudniu):**
1. **Rachunek i taryfy:** jak czytać fakturę, taryfa G11 / G12 / G12w / dynamiczna, opłaty dystrybucyjne (stałe i zmienne), opłata mocowa, opłata OZE i kogeneracyjna, akcyza, VAT, cena za kWh, jak URE zatwierdza taryfy, „taryfy 2027 – co się zmienia”.
2. **Zmiana sprzedawcy i umowy:** jak zmienić sprzedawcę krok po kroku, CSIRE i zmiana w 24 godziny, wypowiedzenie umowy, kary za zerwanie, automatyczne przedłużenie, sprzedaż bezpośrednia (domokrążcy) i prawa konsumenta, reklamacja rachunku, sprzedawca rezerwowy.
3. **Firmy:** grupy taryfowe C11/C12/C21/B21/B23, cena stała a indeksowana, transzowanie, moc umowna i jej optymalizacja, energia bierna, zakupy w przetargach (PZP), gwarancje pochodzenia.
4. **Prosument i OZE:** net-billing, wartość rynkowa energii, magazyn energii, pompa ciepła a taryfa, ładowanie EV w domu i firmie, dotacje.
5. **Rynek:** TGE, rynek dnia następnego, kontrakty terminowe, ceny ujemne, rynek mocy, CO2 (EU ETS i ETS2), miks energetyczny.

**Wzory pism do pobrania (5):** wypowiedzenie umowy, reklamacja rachunku, odstąpienie od umowy zawartej poza lokalem, wniosek o zmianę grupy taryfowej, wniosek o zmianę mocy umownej.

**Zasady jakości (obowiązkowe dla każdej treści):**
- źródło pierwotne przy każdej liczbie i przepisie (link do URE, ISAP, PSE, TGE…),
- data publikacji i **data następnej weryfikacji**, autor i recenzent z biogramem,
- sekcja „Co to znaczy dla Ciebie?” w podziale na segmenty, jeśli dotyczy,
- AI wolno używać do researchu i redakcji językowej, **ale** każdą treść pisze lub zatwierdza człowiek, który odpowiada za fakty; nie publikujemy masowo generowanych stron.

### KROK 5. Newsroom: próba generalna i rytm (od tygodnia 5: 16 listopada)

| # | Zadanie | Wynik |
|---|---|---|
| 5.1 | **Rytm dnia** (wzór poniżej) – przez 3 tygodnie newsy piszemy „na sucho” do CMS (niepublikowane albo na stronie testowej), żeby zgrać zespół | Zespół gotowy na start |
| 5.2 | **Kalendarz zdarzeń** do końca stycznia 2027 r.: decyzja URE o taryfach, posiedzenia Sejmu i projekty ustaw, terminy CSIRE, aukcje rynku mocy, Rady UE ds. energii, publikacje GUS/PSE | Kalendarz z przypisanymi autorami |
| 5.3 | **Pakiet „taryfy 2027”** przygotowany z wyprzedzeniem: artykuł-szablon z miejscem na liczby, kalkulacja wpływu na rachunek dla 3 typowych gospodarstw i 3 firm, wykresy, komentarz eksperta, informacja prasowa | Publikacja w 60 minut od decyzji URE |
| 5.4 | **Newsletter**: szablon, narzędzie wysyłkowe, testy dostarczalności (SPF, DKIM, DMARC), poranna wysyłka o 7:30 | Gotowe do startu |
| 5.5 | **Dyżur eksperta** dla mediów (numer telefonu, grafik, czas odpowiedzi < 30 minut) | Grafik grudniowy |

**Rytm dnia newsroomu (dni robocze):**

| Godzina | Czynność |
|---|---|
| 7:00 | Przegląd źródeł (URE, PSE, ME, Sejm, TGE, agencje, media zagraniczne) |
| 7:30 | Newsletter „Energia w 5 minut” |
| 9:00 | Kolegium: 3–5 tematów dnia, przydział, temat na komentarz eksperta |
| 10:00–15:00 | Publikacje (news: 300–600 słów, z kontekstem „co to znaczy dla odbiorcy”) |
| 15:30 | Social media: wykres dnia (LinkedIn), krótkie wideo 2× w tygodniu |
| 16:00 | Plan na jutro, aktualizacja haseł, których dotyczyły newsy |

**Zasada weryfikacji newsa:** źródło pierwotne albo dwa niezależne źródła; liczby sprawdzone przez drugą osobę; poprawki zawsze z adnotacją „Aktualizacja / Sprostowanie [data]”.

### KROK 6. Barometr – dwa produkty (tygodnie 2–9)

Proponuję rozdzielić barometr na **dwa produkty**, bo mają różny cykl i koszt:

**A. Barometr Rynku Energii (miesięczny, z danych)** – pierwszy dzień roboczy miesiąca, od grudnia 2026 r.

| Wskaźnik | Źródło | Uwagi |
|---|---|---|
| Ceny hurtowe: rynek dnia następnego (średnia miesięczna, szczyt/pozaszczyt), kontrakt roczny na 2027 r. | TGE (dane podawane publicznie; licencja tylko, jeśli wymaga jej regulamin) | Komentarz: co to znaczy dla cen ofert dla firm |
| Ceny w taryfach URE dla gospodarstw (G11) i opłaty dystrybucyjne według operatorów sieci | URE, taryfy operatorów sieci | Zmiana r/r |
| Godziny z cenami ujemnymi, udział OZE w produkcji | PSE (dane publiczne), TGE | Wątek dla prosumentów i taryf dynamicznych |
| Ceny uprawnień do emisji CO2 | Dane publiczne / licencja | Krótki kontekst |
| **Wskaźnik Energypedii: „Temperatura rachunku”** | Własne wyliczenie: koszt rocznego zużycia 2,5 MWh (G11) i 30 MWh (C11) przy aktualnych cennikach i taryfach | Prosta liczba do cytowania w mediach |

Metodyka publikowana na stronie /dane/metodyka. **Od stycznia–lutego 2027 r.** dochodzi **Energypedia Index** z danych z zapytań ofertowych (po starcie narzędzi).

**B. Barometr Odbiorców Energii (kwartalny, własna ankieta)** – #0 w grudniu 2026 r. Ankietę przygotowujemy i prowadzimy sami (formularz w serwisie, newsletter, media społecznościowe). Wynik opisujemy uczciwie: próba nie jest reprezentatywna, podajemy jej strukturę i ewentualne ważenie. Badanie na panelu reprezentatywnym tylko z decyzji naczelnego.

| Etap | Termin | Szczegóły |
|---|---|---|
| Przygotowanie ankiety | do 6 XI | Formularz w serwisie lub na stronie „wkrótce”, zgody RODO, pytania o segment (dom, firma), województwo i wiek do opisu struktury próby |
| Kwestionariusz | 9–19 XI | 15–20 pytań, w tym **pytania stałe** (powtarzane co kwartał, żeby budować trend) |
| Zbieranie odpowiedzi | 24 XI – 4 XII | Zaproszenie: lista oczekujących, newsletter, media społecznościowe |
| Dane i analiza | 7–11 XII | Tabele, wykresy w stylu Energypedii |
| Publikacja | **w tygodniu startu (14–18 XII)** albo osobno w pierwszym tygodniu stycznia, jeśli taryfy URE „zjedzą” uwagę mediów | Raport z opisem metody i ograniczeń; wyniki wojewódzkie tylko przy wystarczającej liczbie odpowiedzi |

**Pytania stałe (propozycja):** ocena wysokości rachunku (skala), czy rachunek jest zrozumiały, oczekiwania cenowe na 12 miesięcy, znajomość możliwości zmiany sprzedawcy, czy w ostatnim roku zmienił/a sprzedawcę lub taryfę, plany inwestycyjne (PV, magazyn, pompa, EV), zaufanie do źródeł informacji. **Dla firm dodatkowo:** udział kosztów energii w kosztach firmy, typ umowy (stała/indeksowana), data końca umowy, kto decyduje o zakupie energii.

### KROK 7. Serwis i technologia – ścieżka B (tygodnie 2–8)

Na MVP nie potrzebujemy pełnej platformy z biznesplanu, tylko **szybkiego serwisu treściowego**, który później rozbudujemy.

> Pełna specyfikacja (mapa serwisu, szablony, model treści, sloty reklamowe, stos technologiczny, etapy) jest w **`ARCHITEKTURA_serwisu_Energypedia.md`**; zakres na grudzień to jej etap 0.

| # | Zadanie | Termin |
|---|---|---|
| 7.1 | Budowa we własnym zakresie (naczelny + Claude Code): **Next.js + Payload CMS + PostgreSQL z pgvector** (jedna baza na treści i indeks asystenta AI); repozytorium, środowisko testowe i produkcyjne w UE, automatyczne wdrożenia | 30 X |
| 7.2 | Strona „wkrótce” z zapisem na newsletter | 6 XI |
| 7.3 | Modele treści w CMS (hasło, poradnik, news, region, barometr, autor, źródło) z polami: segment, data weryfikacji, recenzent, źródła | 13 XI – autorzy zaczynają pisać w CMS |
| 7.4 | Szablony stron, wyszukiwarka, nawigacja po segmentach, strona autora, spis treści, przypisy, „ostatnia aktualizacja” | 27 XI |
| 7.5 | Moduł wykresów (dane z CSV/arkusza → wykres → pobieranie PNG/SVG z licencją) | 27 XI |
| 7.6 | SEO techniczne: mapy witryny, dane strukturalne (Article, FAQ, HowTo, Dataset, Person, Organization), przekierowania, canonicale, Core Web Vitals | 4 XII |
| 7.7 | Analityka z trybem zgody (baner cookies), monitoring błędów, kopie zapasowe, CDN, certyfikat SSL | 4 XII |
| 7.8 | Testy: dostępność, telefony, szybkość, test obciążeniowy na dzień taryf | 9 XII |
| 7.9 | **Asystent AI (RAG), budowa własna według `ASYSTENT_AI_Energypedia.md`:** indeks treści z CMS aktualizowany przy każdej publikacji, odpowiedzi z cytowaniem fragmentów, limity zapytań, filtr pytań spoza zakresu i ochrona przed wstrzykiwaniem poleceń, logi bez danych osobowych, dostawca modelu z przetwarzaniem w UE i umową powierzenia; panel redakcji z pytaniami bez odpowiedzi | prototyp 20 XI, testy na 200 pytaniach 27 XI – 4 XII, gotowość ze startem |

**Koszt:** bez kosztu budowy (robimy samodzielnie); koszty działania około 4–9 tys. zł miesięcznie (hosting, baza danych, CMS, newsletter, analityka, model językowy asystenta AI). Narzędzia budujemy sami w styczniu–marcu 2027 r.

### KROK 8. Prawo i zgodność przed publikacją (tygodnie 3–8)

| # | Zadanie | Termin |
|---|---|---|
| 8.1 | Polityka prywatności, polityka cookies, regulamin serwisu i newslettera, klauzule zgód | 27 XI |
| 8.2 | Rejestr czynności przetwarzania, umowy powierzenia (CMS, hosting, newsletter, analityka) | 4 XII |
| 8.3 | Statut redakcji, polityka sprostowań, „Jak zarabiamy” (na start: „serwis finansowany przez wydawcę; od 2027 r. modele przychodów opisane tutaj”) | 4 XII |
| 8.4 | Wniosek o **rejestrację tytułu prasowego** w sądzie okręgowym | złożony do 4 XII |
| 8.5 | Licencje: dane rynkowe (TGE), zdjęcia (bank zdjęć), czcionki | 4 XII |
| 8.6 | Deklaracja dostępności | 9 XII |
| 8.7 | Asystent AI: oznaczenia wymagane przez AI Act, zastrzeżenie o charakterze informacyjnym, regulamin usługi, ocena skutków dla ochrony danych, umowa z dostawcą modelu [DO WERYFIKACJI: Prawnik, zakres obowiązków z art. 50 AI Act i data ich stosowania] | 27 XI |

**Wykonanie:** dokumenty przygotowuje rola Prawnik na podstawie źródeł pierwotnych, decyzję i podpis daje naczelny. Koszty to wyłącznie opłaty urzędowe i sądowe.

### KROK 9. Kontrola jakości i gotowość (tydzień 8: 7–11 grudnia)

**Lista kontrolna „gotowe do startu” (10 XII):**
- [ ] 32 publikacje evergreen, 120 haseł, 25 poradników, 16 stron regionalnych opublikowanych w trybie ukrytym i sprawdzonych (linki, źródła, daty, recenzent)
- [ ] Losowa kontrola 20% treści przez drugą osobę (fakty i liczby)
- [ ] Pakiet „taryfy 2027” gotowy (szablon, wykresy, kalkulacje, informacja prasowa)
- [ ] Barometr Rynku Energii #1 gotowy (dane do 30 XI lub do dnia startu)
- [ ] Newsletter: szablon, testy dostarczalności, lista oczekujących zaimportowana
- [ ] Pokój prasowy, kontakty, dyżur eksperta, baza dziennikarzy
- [ ] SEO techniczne zweryfikowane, mapa witryny zgłoszona do Google Search Console i Bing Webmaster Tools
- [ ] Dokumenty prawne opublikowane, baner cookies działa
- [ ] Profile social media z grafikami i 10 przygotowanymi postami
- [ ] Plan dyżurów 14 XII – 2 I (w tym święta)

### KROK 10. Miękki start (tydzień 9: 14–18 grudnia, w dniu decyzji URE)

| Kiedy | Co |
|---|---|
| D-1 | Ostatnia kontrola, odsłonięcie treści (zdjęcie trybu ukrytego), zgłoszenie mapy witryny |
| **Dzień decyzji URE** | Publikacja pakietu „taryfy 2027” w ciągu 60 minut; informacja prasowa do 300 dziennikarzy; ekspert na dyżurze; LinkedIn i newsletter specjalny |
| D+1 | **Barometr Rynku Energii #1** + informacja prasowa (jeśli nie wypada w dniu taryf) |
| D+2 – D+4 | Komentarze dla mediów, wywiady, odpowiedzi na pytania czytelników („Taryfy 2027 – pytania i odpowiedzi” aktualizowane codziennie) |
| Koniec tygodnia | Barometr Odbiorców #0 (lub przesunięcie na 5–8 I, jeśli uwaga mediów jest zajęta taryfami) |

> Jeśli URE ogłosi taryfy później niż 18 XII, startujemy **najpóźniej 15 XII** z Barometrem Rynku i treściami „czego się spodziewać po taryfach 2027”, a pakiet taryfowy publikujemy w dniu decyzji.

### KROK 11. Stabilizacja i przygotowanie stycznia (tygodnie 10–11: 21–31 grudnia)

| # | Zadanie |
|---|---|
| 11.1 | Utrzymanie rytmu newsów (w okresie świątecznym 1–2 dziennie, dyżur) |
| 11.2 | Pierwszy raport KPI: ruch, źródła, cytowania, subskrybenci, najczęściej czytane treści, zapytania w wyszukiwarce wewnętrznej |
| 11.3 | Poprawki na podstawie danych (Search Console: frazy z wyświetleniami bez kliknięć → nowe hasła) |
| 11.4 | „Energia 2027: 10 rzeczy, które zmienią Twój rachunek” – tekst przewodni na Nowy Rok |
| 11.5 | Retrospektywa zespołu i plan na I kwartał 2027 r.: publiczny start z narzędziami, kampania startowa, Energypedia Index, Barometr Odbiorców I kw. |
| 11.6 | Plan budowy narzędzi we własnym zakresie (analizator faktury, porównywarka, generator zapytań ofertowych dla firm) i asystenta AI 2.0 – start prac 4 I 2027 r. |

---

## 3. Harmonogram tydzień po tygodniu (podsumowanie)

| Tydz. | Daty | Treści (A) | Serwis (B) | Dane i barometr (C) | Organizacja, prawo, PR |
|---|---|---|---|---|---|
| 1 | 20–23 X | – | – | – | Domena, własne badanie znaku, spółka, budżet |
| 2 | 26–30 X | Statut, przewodnik stylu, mapa tematów, lista 300 haseł | Start budowy: repozytorium, CMS, baza danych | Projekt ankiety Barometru | Rejestr źródeł |
| 3 | 2–6 XI | Szablony, test standardu (5 haseł) | Strona „wkrótce” + newsletter; indeks asystenta AI | Ankieta gotowa, regulaminy źródeł danych | Baza dziennikarzy |
| 4 | 9–13 XI | 25 haseł, 4 poradniki | Modele treści w CMS | Kwestionariusz | Dokumenty prawne (start) |
| 5 | 16–20 XI | 60 / 10 / 8 regionów; próba newsroomu | Szablony stron; prototyp asystenta AI | Kwestionariusz zatwierdzony | Własny monitoring mediów uruchomiony |
| 6 | 23–27 XI | 100 / 17 / 16 | Wykresy, wyszukiwarka | **Badanie w terenie** | Polityki RODO |
| 7 | 30 XI – 4 XII | 135 / 22; pakiet „taryfy 2027” | SEO techniczne, analityka | Dane do Barometru Rynku #1 | Wniosek o rejestrację tytułu |
| 8 | 7–11 XII | 32 publikacje / 120 haseł / 25 poradników; kontrola jakości | Testy, **gotowość 10 XII** | Analiza badania, wykresy | Lista kontrolna startu |
| 9 | 14–18 XII | **MIĘKKI START** + newsy codziennie | Monitoring wydajności | **Barometr #1 (+ Barometr Odbiorców #0)** | Informacje prasowe, dyżur eksperta |
| 10–11 | 21–31 XII | Rytm świąteczny, tekst noworoczny | Poprawki | Barometr styczniowy (dane grudnia) | Raport KPI, plan I kw. 2027 r. |

---

## 4. Zespół na MVP (do 31 grudnia)

| Rola | Forma | Od | Zadania |
|---|---|---|---|
| Redaktor naczelny i wydawca: Mariusz Lach | właściciel | 20 X | Decyzje, akceptacja każdej treści, budowa serwisu i asystenta AI z Claude Code, relacje z mediami |
| Wirtualny zespół ról AI (`zespol/`): Recenzent, Analityk rynku, Social media, Specjalista kampanii, Sprzedawca reklam, Redaktor SEO/AEO/GEO, Prawnik | narzędzie | 20 X | Szkice treści, recenzja, analizy, SEO, dokumenty prawne, materiały sprzedażowe; każdy wynik akceptuje naczelny |
| Claude Code | narzędzie | 26 X | Kod serwisu, CMS, asystenta AI, testy, wdrożenia |
| Rada Ekspertów | współpraca honorowa | XI | Rozmówcy i źródła, konsultacja trudnych tematów; bez umów o pisanie |
| Growth marketer (opcjonalnie) | etat / B2B | XII | Newsletter, kanały płatne, social media |

---

## 5. KPI dla MVP (stan na 31 grudnia 2026 r.)

| Miernik | Cel |
|---|---:|
| Publikacje evergreen / hasła / poradniki / strony regionalne | 32 / 120 / 25 / 16 |
| Newsy od startu | ≥ 50 |
| Wizyty w grudniu | ≥ 25 000 |
| Subskrybenci newslettera | ≥ 2 000 |
| Cytowania w mediach (grudzień) | ≥ 10 |
| Wystąpienia ekspertów w mediach | ≥ 3 |
| Treści ze źródłami i datą weryfikacji | 100% |
| Sprostowania merytoryczne | rejestrowane, < 2% treści |

---

## 6. Budżet MVP do 31 grudnia 2026 r. (orientacyjnie)

| Pozycja | Kwota (zł netto) |
|---|---:|
| Serwis, asystent AI, treści, identyfikacja, grafiki, dokumenty prawne | 0 (robimy samodzielnie: naczelny, wirtualny zespół, Claude Code) |
| Technologia: hosting w UE, baza danych, CMS, newsletter, analityka, model językowy asystenta AI (rozliczenie za użycie z miesięcznym limitem ustawionym przez nas) | 13 000 |
| Dane rynkowe (tylko jeśli regulamin źródła wymaga licencji) | 0 – 4 000 |
| Znak towarowy i domeny (opłaty urzędowe) | 4 000 [DO WERYFIKACJI: aktualne opłaty UPRP lub EUIPO] |
| Rejestracja tytułu prasowego (opłata sądowa) | [DO WERYFIKACJI: wysokość opłaty] |
| Księgowość, ubezpieczenia | 18 000 |
| Biuro, sprzęt, inne | 12 000 |
| Growth marketer (od XII, opcjonalnie) | 14 000 |
| Promocja listy oczekujących i startu | do 40 000 |
| **Razem** | **około 100 000 – 105 000** (zgodnie z modelem finansowym: XI 23 000, XII 82 250) |

Barometr Odbiorców #0 prowadzimy jako własną ankietę, bez kosztu zewnętrznego. Nie ma pozycji na wykonawców, autorów zewnętrznych, agencje ani kancelarię i nie planujemy dla nich wycen.

---

## 7. Ryzyka harmonogramu i co wtedy robimy

| Ryzyko | Sygnał | Reakcja |
|---|---|---|
| Przeciążenie naczelnego | Opóźnienie > 3 dni w dwóch ścieżkach naraz | Zamrożenie nowych funkcji, priorytet: weryfikacja treści i asystent AI; cięcie do **100 haseł** bez obniżania standardu |
| Problem z nazwą (znak) | Negatywne badanie | Wariant z wyróżnikiem; identyfikację zamawiamy dopiero po decyzji (tydzień 3); treści i CMS powstają niezależnie od nazwy |
| Treści nie powstają w tempie planu | < 80% planu tygodniowego 2 tygodnie z rzędu | Więcej szkiców od wirtualnego zespołu, krótsze formy haseł, przesunięcie regionów na styczeń; nigdy publikacja bez weryfikacji |
| Opóźnienie serwisu | Szablony nie gotowe 27 XI | Start na uproszczonym szablonie; wykresy jako obrazy z danymi CSV do pobrania |
| Taryfy URE ogłoszone wcześniej niż gotowość | Decyzja przed 10 XII | Publikujemy pakiet taryfowy na stronie startowej + newsletter + LinkedIn; reszta serwisu dochodzi w kolejnych dniach |
| Asystent AI nie przechodzi testów (< 90% poprawnych) | Wynik testu 4 XII | Start asystenta w trybie „tylko odpowiedzi z haseł i poradników” z węższym zakresem pytań; pełny zakres po poprawkach, bez publikowania odpowiedzi niesprawdzonych |
| Za mało odpowiedzi w ankiecie | Mniej niż [x] odpowiedzi 4 XII (próg ustala naczelny) | Barometr Odbiorców #0 publikujemy 5–8 I (to i tak dobry termin medialnie) |

---

## Załącznik A. Szablony treści

### A.1. Hasło encyklopedii

```
Tytuł: [Pojęcie] – co to jest i ile kosztuje?
W skrócie (2 zdania, odpowiedź na pytanie wprost – pod wyszukiwarki i AI)
Definicja (akapit, bez żargonu)
Jak to działa (schemat lub wykres)
Ile to kosztuje / jakie są liczby (tabela z datą i źródłem)
Co to znaczy dla Ciebie? → Dom | Mikrofirma | Średnia firma | Duża firma i samorząd
Najczęstsze pytania (3–5, FAQ)
Powiązane hasła i poradniki (linki wewnętrzne, min. 3)
Podstawa prawna / źródła (linki do źródeł pierwotnych)
Autor · Recenzent · Data publikacji · Data następnej weryfikacji
```

### A.2. Poradnik krok po kroku

```
Tytuł: Jak [zrobić X] – poradnik krok po kroku [rok]
Dla kogo i ile to trwa (ramka)
Zanim zaczniesz: lista dokumentów
Kroki 1…n (każdy z krótkim opisem, terminem, pułapką)
Wzór pisma do pobrania (jeśli dotyczy)
Najczęstsze błędy
Co dalej? (link do narzędzia / listy oczekujących)
Źródła · Autor · Recenzent · Daty
```

### A.3. News

```
Tytuł: fakt + konsekwencja („URE zatwierdził taryfy na 2027 r. Rachunek typowego domu wzrośnie/spadnie o X zł”)
Lead: co się stało, kogo dotyczy, od kiedy (2–3 zdania)
Szczegóły i liczby (źródło pierwotne)
Co to znaczy dla odbiorcy (dom / firma)
Komentarz eksperta (1–2 cytaty)
Kontekst: link do hasła i poradnika
```

### A.4. Barometr Rynku Energii (miesięczny)

```
Tytuł: Barometr Rynku Energii – [miesiąc rok]
3 najważniejsze liczby miesiąca (kafle)
Wskaźnik „Temperatura rachunku” (dom 2,5 MWh / firma 30 MWh) i zmiana m/m, r/r
Ceny hurtowe (wykres), taryfy i opłaty dystrybucyjne (tabela), OZE i ceny ujemne (wykres)
Komentarz analityka: co to znaczy dla odbiorców w kolejnych 3 miesiącach
Metodyka (link) · Dane do pobrania (CSV) · Licencja wykresów CC BY
```

---

> **Zastrzeżenie.** Terminy zewnętrzne (decyzja URE o taryfach, czas realizacji badań, rejestracja tytułu prasowego) są szacunkami na podstawie wcześniejszych lat i praktyki rynkowej. Należy je potwierdzić u instytucji w tygodniach 1–2.
