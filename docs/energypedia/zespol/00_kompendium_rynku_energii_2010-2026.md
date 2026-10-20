# KOMPENDIUM: RYNEK ENERGII ELEKTRYCZNEJ W POLSCE 2010–2026
<!-- Plik wiedzy dla WSZYSTKICH wirtualnych pracowników Energypedii. Dołącz do każdego projektu obok 00_kontekst_wspolny.md. Wersja 1.0, stan wiedzy: 20.10.2026. Aktualizuj co kwartał oraz po każdej ważnej zmianie (taryfy, ustawy, aukcje). -->

## Jak korzystać z kompendium

- To **mapa wiedzy branżowej**: historia, struktura rynku, regulacje, ceny, technologie, gracze, trendy i spory. Służy do rozumienia kontekstu, pisania, analiz, rozmów handlowych i kampanii.
- **Poziomy pewności danych:**
  - **[P]** potwierdzone w źródle (podane w rozdziale 14),
  - **[≈]** wartość przybliżona lub zaokrąglona z wielu źródeł (do opisu trendu, nie do cytowania co do przecinka),
  - **[W]** do weryfikacji przed publikacją (dane sporne, niepełne lub mogły się zmienić).
- **Przed publikacją liczby zawsze sprawdź w źródle pierwotnym** (URE, PSE, TGE, ARE, GUS, ISAP). Kompendium nie zastępuje źródeł, tylko mówi, gdzie i czego szukać.
- Gdy fakt z kompendium kłóci się z aktualnym źródłem, **rację ma źródło**. Zgłoś naczelnemu potrzebę aktualizacji kompendium.

---

## 1. Streszczenie: 16 lat w 12 zdaniach

1. W 2010 r. polska elektroenergetyka była w niemal 90% węglowa [≈], scentralizowana i zdominowana przez państwowe grupy, które powstały w latach 2006–2007 (PGE, Tauron, Enea, Energa).
2. Rynek formalnie był otwarty (zasada TPA od 2007 r.), ale odbiorcy prawie nie zmieniali sprzedawcy. Ceny dla gospodarstw domowych regulował i nadal reguluje Prezes URE przez taryfy sprzedawców z urzędu.
3. Lata 2010–2017 to tanie hurtowo energia (około 150–200 zł/MWh [≈]), niskie ceny uprawnień do emisji CO2, system zielonych certyfikatów dla OZE i powolny rozwój wiatru na lądzie.
4. Lata 2015–2017 to zwroty regulacyjne: ustawa o OZE (aukcje), ustawa odległościowa 10H (2016), która zamroziła rozwój wiatru na lądzie, oraz ustawa o rynku mocy (2017), czyli płacenie elektrowniom za gotowość.
5. W 2018 r. ceny CO2 i energii na giełdzie mocno wzrosły. Państwo zamroziło ceny na 2019 r. („ustawa prądowa”), co zapoczątkowało serię interwencji cenowych.
6. W latach 2019–2023 nastąpił boom fotowoltaiki prosumenckiej (program Mój Prąd, net-metering). Liczba prosumentów wzrosła z około 150 tys. do ponad 1,3 mln [≈].
7. W latach 2021–2022 wybuchł kryzys energetyczny (ceny gazu, CO2, wojna w Ukrainie). Średnia cena na Rynku Dnia Następnego wzrosła z około 210 zł/MWh (2020) do 796 zł/MWh (2022) [P].
8. W latach 2022–2025 obowiązywały mechanizmy osłonowe: mrożenie cen dla gospodarstw domowych (2023–2025) i ceny maksymalne dla MŚP i podmiotów wrażliwych.
9. Od 2022 r. prosumenci przechodzą na net-billing, a od 2024 r. dochodzą taryfy dynamiczne i 15-minutowy rynek bilansujący. Pojawiają się ceny ujemne i rosnące przymusowe ograniczanie OZE (redysponowanie).
10. W latach 2023–2026 udział węgla w produkcji prądu spada szybko: około 61–63% (2023) [≈], 56–57% (2024) [P], około 52–53% (2025) [≈]. OZE dają około 30% [P]. Moc fotowoltaiki przekracza 27 GW (maj 2026 r.) [P].
11. Ruszają wielkie inwestycje: morskie farmy wiatrowe (pierwsza energia z Baltic Power: 10.07.2026 r. [P]), pierwsza elektrownia jądrowa (zgoda KE na pomoc publiczną, pierwszy beton planowany na 2028 r. [P]) oraz magazyny energii (dominacja w aukcjach rynku mocy).
12. Rok 2026 to pierwszy od 2022 r. rok bez mrożenia cen (taryfa średnio 495,16 zł/MWh netto [P]), wyraźnie wyższa opłata mocowa, wdrożenie CSIRE i zmiany w prawie przyłączeniowym. Odbiorca znów musi podejmować decyzje, a to jest szansa dla Energypedii.

---

## 2. Architektura rynku (stan 2026 r.)

### 2.1. Łańcuch wartości
```
WYTWARZANIE → PRZESYŁ (PSE, OSP) → DYSTRYBUCJA (OSD) → ODBIORCA
      │                                   ▲
      └──► HURT: TGE (RDN, RDB, terminowy), OTC, kontrakty bilateralne, PPA
                    ▼
            SPRZEDAWCY (obrót) ──► umowa sprzedaży / kompleksowa ──► ODBIORCA
Regulator: Prezes URE · Polityka: Ministerstwo Energii (odrębny resort odtworzony w 2025 r. [W]; wcześniej kompetencje m.in. MKiŚ, MAP, ME)
Rynki systemowe: rynek bilansujący (PSE), rynek mocy (PSE), usługi systemowe
Dane rynkowe: CSIRE (PSE jako OIRE)
```

### 2.2. Kluczowi uczestnicy
| Rola | Kto | Uwagi |
|---|---|---|
| **Regulator** | Prezes URE | Koncesje, taryfy (OSD, sprzedawcy z urzędu dla G), stawki opłat (mocowa, OZE, kogeneracyjna), porównywarka ofert, aukcje OZE i offshore, Rzecznik Praw Odbiorców Paliw i Energii |
| **OSP i OIRE** | PSE (Polskie Sieci Elektroenergetyczne) | Przesył, bilansowanie, rynek mocy, redysponowanie, CSIRE |
| **OSD (główni)** | PGE Dystrybucja, Tauron Dystrybucja, Enea Operator, Energa-Operator, Stoen Operator (Warszawa, grupa E.ON) | Monopole naturalne na swoich obszarach; ponad 100 mniejszych OSD (np. przy zakładach przemysłowych) [≈] |
| **Wielkie grupy (pionowo zintegrowane)** | PGE (największy wytwórca), Tauron, Enea, Energa (od 2020 r. w grupie Orlen) [P], E.ON Polska (dawne innogy, wcześniej RWE) | Sprzedawcy z urzędu na swoich obszarach |
| **Inni wytwórcy** | Orlen (gaz, offshore, Energa), ZE PAK (transformacja Konina), Polenergia, R.Power, niezależni deweloperzy OZE, przemysł (autoprodukcja), prosumenci | |
| **Sprzedawcy niezależni** | Kilkudziesięciu aktywnych w segmencie MŚP i gospodarstw domowych | Konkurują ofertami, sprzedażą bezpośrednią i ceną |
| **Giełda** | TGE (Towarowa Giełda Energii, grupa GPW) | RDN, RDB, rynek terminowy, gwarancje pochodzenia, prawa majątkowe |
| **Odbiorcy** | Ok. 18 mln odbiorców [W], w tym kilkanaście mln gospodarstw domowych | Grupy taryfowe A, B, C, G, R |

### 2.3. Grupy taryfowe (skrót)
A = wysokie napięcie; B = średnie napięcie (B11, B21, B22, B23); C = niskie napięcie, firmy (C1x do 40 kW; C2x powyżej 40 kW); G = gospodarstwa domowe (G11, G12, G12w, G12r, G13…); R = przyłączenia tymczasowe. **Strefy czasowe różnią się między OSD.**

### 2.4. Rachunek odbiorcy (z czego się składa)
Sprzedaż (cena energii, opłata handlowa) + dystrybucja (opłata sieciowa stała i zmienna, jakościowa, OZE, kogeneracyjna, mocowa, abonamentowa, ewentualnie przejściowa) + akcyza (co do zasady 5 zł/MWh) + VAT 23%.
**Opłata mocowa 2026 r. dla gospodarstw domowych (netto/mies.)** [P]: < 500 kWh/rok: 4,29 zł; 500–1200 kWh: 10,31 zł; 1200–2800 kWh: 17,18 zł; > 2800 kWh: 24,05 zł (w 2025 r.: 2,86 / 6,86 / 11,44 / 16,01 zł), czyli wzrost o około 50%. Dla firm stawka jest naliczana za kWh w godzinach szczytowego zapotrzebowania w dni robocze (zasady i stawki co roku ogłasza Prezes URE).

---

## 3. Chronologia 2010–2026 (najważniejsze wydarzenia)

| Rok | Regulacje i polityka | Rynek i ceny | Technologie i inwestycje | Co to znaczyło dla odbiorców |
|---|---|---|---|---|
| **2010** | Wprowadzenie **obliga giełdowego** (15% produkcji; 100% dla wytwórców z rekompensatami KDT) [P] | Hurt około 190–200 zł/MWh [≈]; rozwój TGE | Węgiel około 87–88% produkcji [≈]; wiatr około 1 GW [≈] | Rynek otwarty, ale bierny; taryfy G regulowane |
| **2011–2013** | System zielonych certyfikatów; prace nad ustawą o OZE; pakiet klimatyczno-energetyczny UE 3×20 | Hurt stabilny lub malejący [≈]; ceny CO2 kilka euro | Szybki wzrost wiatru na lądzie | Pierwsze kampanie sprzedawców niezależnych, sprzedaż bezpośrednia „od drzwi do drzwi” i nieuczciwe praktyki |
| **2014** | Ramy klimatyczne UE do 2030 r. | Hurt około 160–170 zł/MWh [≈] | Wiatr około 4 GW [≈] | |
| **2015** | **Ustawa o OZE** (aukcje zamiast certyfikatów dla nowych instalacji; prosument) | Hurt ok. 150–160 zł/MWh [≈] | Wiatr około 5 GW [≈]; **10.08.2015 r.: 20. stopień zasilania** (upały, chłodzenie bloków), ograniczenia dla ponad 1600 firm; pierwsze takie ograniczenia od 1989 r. [P] | Pierwszy sygnał problemów z wystarczalnością mocy |
| **2016** | **Ustawa odległościowa 10H** (wiatraki w odległości co najmniej 10-krotności wysokości od zabudowy); net-metering dla prosumentów (opusty 0,8 / 0,7) | Hurt ok. 160 zł/MWh [≈] | Zatrzymanie nowych projektów wiatru na lądzie | Prosument zaczyna mieć sens ekonomiczny |
| **2017** | **Ustawa o rynku mocy**; konsolidacja: PGE kupuje aktywa EDF w Polsce, Enea kupuje Engie Połaniec [≈] | Hurt ok. 160 zł/MWh [≈] | Węgiel około 78% (2017) [P] | |
| **2018** | Ustawa o elektromobilności; pierwsze aukcje rynku mocy (na 2021+); obligo podniesione do 30% [W]; **ustawa „prądowa”** (grudzień) mrozi ceny na 2019 r. | Wzrost cen CO2 (do około 20–25 euro) i hurtu do około 230 zł/MWh [≈] | | Pierwsza interwencja cenowa |
| **2019** | **Obligo 100%** (od 1.01.2019 r.) [P]; program **Mój Prąd** (dotacje do PV) | Hurt około 230 zł/MWh [≈] | Start boomu PV (około 1,5 GW na koniec roku [≈]) | Fotowoltaika staje się produktem masowym |
| **2020** | Orlen przejmuje Energę [P]; Ostrołęka C przechodzi z węgla na gaz [≈]; ustawa o morskich farmach wiatrowych (CfD) | RDN około 210 zł/MWh [P*] (pandemia, spadek popytu) | PV około 4 GW [≈] | Rachunki rosną mimo taniej giełdy (taryfy, opłaty) |
| **2021** | **PEP2040** (Polityka energetyczna Polski do 2040 r.); **opłata mocowa na rachunkach** od 1.01.2021 r.; nowelizacja Prawa energetycznego: CSIRE, liczniki zdalnego odczytu; umowa społeczna z górnictwem (zamykanie kopalń do 2049 r.) | **RDN 401,17 zł/MWh** (prawie 2× r/r) [P]; CO2 około 50–80 euro [≈] | PV około 7–8 GW [≈] | Początek kryzysu cenowego; firmy na umowach indeksowanych tracą |
| **2022** | **Net-billing** dla nowych prosumentów (od 1.04.2022 r.); wojna w Ukrainie; **market coupling flow-based (Core)**; połączenie Orlen–PGNiG–Lotos; **ustawy osłonowe**: mrożenie cen dla gospodarstw domowych na 2023 r. (do limitów zużycia), ceny maksymalne 785 zł/MWh dla MŚP i podmiotów wrażliwych [P], odpis na fundusz wypłaty różnicy ceny; **zniesienie obliga** (grudzień) [P]; dodatki węglowy i elektryczny | **RDN 796,17 zł/MWh** (rekord) [P]; oferty dla firm chwilowo powyżej 1500 zł/MWh [≈] | PV około 12 GW [≈]; ponad 1,2 mln prosumentów [≈] | Szok cenowy u firm; ucieczka od umów indeksowanych; ogromne zainteresowanie oszczędzaniem |
| **2023** | Nowelizacja Prawa energetycznego wdrażająca dyrektywę 2019/944: **porównywarka URE**, taryfy dynamiczne (obowiązek od 24.08.2024 r.), obywatelskie społeczności energetyczne [P]; **liberalizacja 10H** (minimalna odległość 700 m) [≈]; decyzje o lokalizacji pierwszej elektrowni jądrowej (Lubiatowo-Kopalino, technologia AP1000) [≈] | RDN około 534 zł/MWh [P*]; spadek cen terminowych | Szybki wzrost OZE; częstsze ceny ujemne [≈] | Mrożenie cen: gospodarstwa w limitach płacą stawki z 2022 r. |
| **2024** | Mrożenie dla gospodarstw (I poł.); od II poł. **cena maksymalna 500 zł/MWh** + **bon energetyczny**; cena maksymalna 693 zł/MWh dla MŚP i podmiotów wrażliwych [P]; **reforma rynku bilansującego** (14.06.2024 r.: okresy 15-minutowe, oferty od 0,2 MW) [P]; **taryfy dynamiczne** (od 24.08.2024 r.); rezygnacja z wydzielenia węgla do NABE [W] | **RDN 424,94 zł/MWh** [P]; kontrakt roczny na 2025 r. średnio 449,80 zł/MWh [P] | Węgiel 56–57% [P]; OZE około 29,5% [P]; PV 21,2 GW [P]; 1,52 mln prosumentów [P]; redysponowanie OZE około 0,7–0,9 TWh [P] | Rachunki domowe stabilne (mrożenie), firmy wracają do cen rynkowych |
| **2025** | Mrożenie 500 zł/MWh do końca roku (ostatni rok osłony); **weto prezydenta** do nowelizacji ustawy wiatrakowej (sierpień; 500 m) [P]; **CSIRE** uruchomiony 1.07.2025 r. [P]; projekt aktualizacji **KPEiK** (lipiec: ponad 50% OZE w produkcji prądu w 2030 r.) [P]; **zgoda KE na pomoc publiczną dla elektrowni jądrowej** (CfD na 60 lat; koszt około 192 mld zł) [P, data W]; **pierwsza aukcja offshore** (17.12.2025 r.: 3,435 GW, 476,88–492,32 zł/MWh, CfD na 25 lat) [P]; aukcja rynku mocy na 2030 r. (11.12.2025 r.: 6,89 GW; magazyny dominują, ale współczynnik dla magazynów spada do 13,39%) [P]; UE: cel na 2040 r. (−90%) i **przesunięcie ETS2 na 2028 r.** [P, status formalny W]; taryfy URE na 2026 r. (17.12.2025 r.) | RDN 2025 [W: uzupełnić z rocznego podsumowania TGE]; ceny ujemne w słoneczne weekendy [≈] | Węgiel około 52–53% [≈]; OZE około 31,5% [P]; **czerwiec 2025 r.: OZE (44,1%) po raz pierwszy wyprzedzają węgiel (43,7%) w skali miesiąca** [P]; PV 24,8 GW [P]; mikroinstalacje 1,64 mln, 13,9 GW, 8,95 TWh [P]; redysponowanie OZE 1,376 TWh [P] | Koniec ery osłon; firmy płacą rynkowo; prosumenci pod presją cen ujemnych |
| **2026** | **Brak mrożenia**; taryfa G średnio 495,16 zł/MWh netto (−1% wobec 500 zł; −14% wobec taryf z IV kw. 2025 r.) [P]; dystrybucja w górę (+7,6–9,4% [≈]); opłata mocowa około +50% [P]; **nowelizacja Prawa energetycznego z 13.03.2026 r.** (Dz.U. 2026 poz. 516: przyłączenia, magazyny, ochrona odbiorców zagrożonych ubóstwem energetycznym, odporność systemu) [P]; projekt **przywrócenia obliga giełdowego (80%)** (UD284), w Sejmie spodziewany w IV kw. 2026 r. [P, status W]; **19.10.2026 r.: ustawowy termin pełnego przystąpienia do CSIRE** (ryzyko opóźnień u dużych OSD) [P]; ustawa wiatrakowa: status [W] | Kontrakty terminowe na 2027 r. [W] | **Baltic Power: pierwsza energia z Bałtyku 10.07.2026 r.** [P]; Baltica 2: pierwsza energia planowana w I poł. 2027 r. [P]; PV 27,1 GW (1.05.2026 r.) [P]; redysponowanie OZE do lipca 2026 r. już powyżej całego 2025 r. [P] | Rachunek znów zależy od decyzji odbiorcy (umowa, taryfa, autokonsumpcja) |

*[P\*] wartość wyliczona ze źródła TGE (np. 2020: 401,17 − 191,06; 2023: 424,94 + 108,68).*

---

## 4. Dane w liczbach (szeregi do kontekstu; przed publikacją sprawdź w źródle)

### 4.1. Miks produkcji energii elektrycznej
| Rok | Węgiel (kamienny + brunatny) | OZE | Gaz | Źródło / pewność |
|---|---:|---:|---:|---|
| 2005 | > 90% | – | – | [P] (Forum Energii) |
| 2010 | ok. 87–88% | 6,9% | – | [≈] / [P] (OZE) |
| 2016 | ok. 80% | – | – | [P] |
| 2017 | 78,4% | – | – | [P] |
| 2020 | ok. 70% | 17,9% | – | [≈] / [P] |
| 2022 | ok. 70% | 21,0% | – | [≈] / [P] |
| 2024 | 56–57% | ok. 29,5% | – | [P] (różne źródła: 56,2–57,1%; OZE 29,4–29,6%) |
| 2025 | ok. 52–53% | ok. 31,5% | ok. 14% | [≈] (Forum Energii, Ember) |

### 4.2. Ceny hurtowe: Rynek Dnia Następnego (TGE), średnia roczna
| Rok | zł/MWh | Pewność |
|---|---:|---|
| 2010–2017 | ok. 150–200 | [≈] |
| 2018–2019 | ok. 220–235 | [≈] |
| 2020 | ok. 210 | [P*] |
| 2021 | 401,17 | [P] |
| 2022 | 796,17 | [P] |
| 2023 | ok. 534 | [P*] |
| 2024 | 424,94 | [P] |
| 2025 | do uzupełnienia | [W] |

### 4.3. Ceny dla gospodarstw domowych (taryfy, osłony)
| Okres | Mechanizm | Cena energii (netto) |
|---|---|---|
| 2019 | Mrożenie na poziomie 2018 r. („ustawa prądowa”) | Poziom z 2018 r. [≈] |
| 2023 | Mrożenie do limitów zużycia (2000 / 2600 / 3000 kWh), powyżej limitu cena maksymalna 693 zł/MWh | W limicie ok. 412 zł/MWh [≈] |
| I poł. 2024 | Kontynuacja mrożenia w limitach | Ok. 412 zł/MWh [≈] |
| II poł. 2024 – 2025 | Cena maksymalna 500 zł/MWh; bon energetyczny (2024) | 500 zł/MWh [P] |
| 2026 | Brak osłony; taryfy URE | Średnio 495,16 zł/MWh [P] |

### 4.4. Firmy (MŚP, samorządy, podmioty wrażliwe)
2023: cena maksymalna 785 zł/MWh; 2024: 693 zł/MWh [P]; od 2025 r. ceny rynkowe [≈]. W 2024 r. rynkowe oferty dla MŚP bywały niższe niż cena maksymalna [P].

### 4.5. OZE i prosumenci
| Wskaźnik | Wartości |
|---|---|
| Moc PV | ok. 1,5 GW (2019) [≈] → ok. 4 GW (2020) → ok. 7–8 GW (2021) → ok. 12 GW (2022) → ok. 17 GW (2023) [≈] → 21,2 GW (2024) [P] → 24,8 GW (2025) [P] → 27,1 GW (1.05.2026 r.) [P] |
| Moc wiatru na lądzie | ok. 1 GW (2010) → ok. 5 GW (2015) → stagnacja po 10H → ok. 10,35 GW (2025) [≈] |
| Prosumenci / mikroinstalacje | ok. 150 tys. (2019) [≈] → ponad 1,2 mln (2022) [≈] → 1,52 mln (2024) [P] → 1,64 mln mikroinstalacji, 13,9 GW, 8,95 TWh (2025) [P]; przyrosty roczne: +356 tys. (2022), +190 tys. (2023), +139 tys. (2024), 2025 najsłabszy od lat [P] |
| Redysponowanie (ograniczanie) OZE | 74 GWh (2023) → ok. 0,7–0,9 TWh (2024) → 1,376 TWh (2025) → ponad 1,38 TWh do 26.07.2026 r. [P] |

### 4.6. Aktywność odbiorców
Zmiany sprzedawcy: łącznie ponad 1 mln od 2007 r. (792 tys. gospodarstw domowych, 264 tys. firm); 2023 r.: ok. 26 tys.; I kw. 2025 r.: 14,2 tys. (8,1 tys. G i 6,1 tys. A/B/C) [P].

### 4.7. Rynek mocy i magazyny
- Opłata mocowa od 2021 r.; stawki rosną (2026 r.: około +50% r/r dla gospodarstw domowych) [P].
- Aukcja na 2030 r. (11.12.2025 r.): 6,89 GW obowiązków; magazyny bateryjne z dużymi portfelami (np. R.Power ponad 1 GW / 4 GWh) [P].
- Moc magazynów w rynku mocy według PSE: ok. 0,17 GW (2027) → ok. 2 GW (2028) → ok. 4 GW (2029) → ok. 5 GW (2030) [P, prognoza].

---

## 5. Regulacje: mapa aktów prawnych

| Akt / mechanizm | Istota | Znaczenie dla odbiorcy |
|---|---|---|
| **Prawo energetyczne** (1997, wielokrotnie nowelizowane; tekst jednolity Dz.U. 2026 poz. 43; nowelizacja Dz.U. 2026 poz. 516) | Koncesje, taryfy, prawa odbiorców, zmiana sprzedawcy, sprzedawca rezerwowy, porównywarka (art. 31g), CSIRE, taryfy dynamiczne, przyłączenia | Podstawa każdej porady konsumenckiej |
| **Ustawa o OZE** (2015) | Aukcje OZE, prosument (net-metering → net-billing), społeczności energetyczne, linia bezpośrednia, cable pooling | Prosumenci, OZE w firmie |
| **Ustawa o rynku mocy** (2017) | Płatności za dyspozycyjność mocy; opłata mocowa | Pozycja na każdym rachunku |
| **Ustawa o morskich farmach wiatrowych** (2020, nowelizowana w 2025 r.) | CfD: faza I (decyzje URE), faza II (aukcje 2025+) | Koszt w opłacie OZE w przyszłości; ceny hurtowe |
| **Ustawa o inwestycjach w elektrownie wiatrowe** (10H z 2016 r.; liberalizacja 2023 r., 700 m; nowelizacja 500 m zawetowana w 2025 r.) | Lokalizacja wiatraków na lądzie | Tempo rozwoju taniej energii |
| **Ustawy osłonowe** (2018/2019, 2022–2025) | Mrożenia, ceny maksymalne, bon energetyczny, odpis na fundusz | Historia rachunków, przyczyna „szoku” w 2026 r. |
| **Ustawa o elektromobilności** (2018) | Ładowanie, infrastruktura | EV w domu i firmie |
| **Ustawa o prawach konsumenta** | Odstąpienie od umowy w 14 dni (poza lokalem / na odległość) | Ochrona przed akwizytorami |
| **Prawo zamówień publicznych** | Zakupy energii przez samorządy i instytucje (przetargi grupowe) | Segment samorządów |
| **Unijne** | Dyrektywa 2019/944 i rozporządzenie 2019/943 (rynek wewnętrzny); reforma rynku energii UE (2024: CfD, PPA, prawo do umowy ze stałą ceną); RED III (OZE); EED (efektywność); EU ETS i ETS2 (2028 [P/W]); CBAM; cel na 2040 r. (−90%) | Kierunek zmian na lata |
| **Strategie** | PEP2040 (2021); aktualizacja KPEiK (projekt 2025 r.: ponad 50% OZE w produkcji prądu w 2030 r.; odejście od węgla w energetyce zawodowej ok. 2035–2040 [P, status W]); Program polskiej energetyki jądrowej | Ramy dla inwestycji i cen |
| **Obligo giełdowe** | 15% (2010) → 30% (2018 [W]) → 100% (2019) → zniesione (12.2022) → projekt powrotu 80% (2026, UD284) [P] | Przejrzystość cen hurtowych |

---

## 6. Mechanizmy cenowe: dlaczego rachunek jest taki, jaki jest

1. **Cena hurtowa** wynika z kosztu krańcowego (merit order): w większości godzin cenę wyznaczają bloki węglowe lub gazowe, więc liczą się ceny węgla, gazu i **CO2 (EU ETS)**. Polska ma jedne z najwyższych cen hurtowych w regionie właśnie przez wysoką emisyjność miksu.
2. **OZE obniżają cenę w godzinach produkcji** (efekt kanibalizacji), stąd ceny ujemne w słoneczne, wietrzne weekendy i ograniczanie pracy OZE przy braku elastyczności (magazyny, popyt, eksport).
3. **Cena dla odbiorcy ≠ cena giełdowa:** sprzedawcy kupują z wyprzedzeniem (kontrakty terminowe), więc rachunek reaguje na giełdę z opóźnieniem 6–24 miesięcy. Dochodzą profil, bilansowanie, obowiązki (świadectwa), marża i ryzyko.
4. **Dystrybucja** (około 1/3 rachunku gospodarstwa domowego [≈]) rośnie przez inwestycje w sieci (przyłączanie OZE, liczniki zdalnego odczytu, odporność). To trend długoterminowy.
5. **Opłaty systemowe** (mocowa, OZE, kogeneracyjna) finansują bezpieczeństwo i transformację. Mocowa wyraźnie wzrosła w 2026 r.
6. **Interwencje państwa** (mrożenia) przesuwały koszt z rachunku do budżetu i spółek. Ich koniec w 2026 r. ujawnił prawdziwe koszty.

---

## 7. Technologie i trendy, które kształtują lata 2026–2030

- **Fotowoltaika**: duża skala już osiągnięta, a wąskie gardło to sieć i elastyczność (redysponowanie). Dla prosumentów kluczowe stają się autokonsumpcja, magazyn i taryfa dynamiczna.
- **Wiatr na lądzie**: potencjał blokowany przepisami lokalizacyjnymi; repowering.
- **Offshore**: Baltic Power (około 1,1–1,2 GW, 2026 r.), Baltica 2 (2027 r.), kolejne z aukcji z 2025 r. (3,4 GW); cel około 5,9 GW w I fazie [≈].
- **Atom**: Lubiatowo-Kopalino (3 bloki AP1000, około 3,75 GW), pierwszy beton jądrowy 2028 r., pierwszy blok około 2036 r. [P]; dyskusje o SMR.
- **Gaz**: paliwo przejściowe; nowe bloki (np. Ostrołęka, Dolna Odra, Grudziądz [≈]), szczytowe zużycie 2025–2030 [P].
- **Magazyny energii**: boom bateryjny dzięki rynkowi mocy i arbitrażowi cenowemu; magazyny domowe i przemysłowe.
- **Elastyczność popytu (DSR)**, agregatorzy, taryfy dynamiczne, liczniki zdalnego odczytu, zarządzanie energią w firmach.
- **Elektryfikacja**: pompy ciepła, EV, ciepłownictwo, przemysł. Popyt będzie rósł.
- **Cyfryzacja**: CSIRE (zmiana sprzedawcy w 24 godziny, dostęp do danych pomiarowych), dane o zużyciu dla odbiorców.
- **Sieci**: rekordowe plany inwestycyjne OSD i PSE, a także kolejki wniosków o przyłączenie i odmowy przyłączeń. Odpowiedzią jest nowelizacja z 2026 r.
- **PPA i cPPA**: rosnący rynek kontraktów korporacyjnych z OZE (dekarbonizacja łańcuchów dostaw, CBAM, raportowanie ESG).

---

## 8. Spory i napięcia (tematy opiniotwórcze, mają zawsze dwie strony)

| Spór | Argumenty „za” | Argumenty „przeciw” |
|---|---|---|
| Mrożenie cen | Ochrona odbiorców w kryzysie | Koszt budżetowy, brak sygnału cenowego, opóźnienie inwestycji w efektywność |
| Obligo giełdowe | Przejrzystość cen, konkurencja | Koszty, ryzyko dla OZE i kontraktów wewnątrz grup |
| Liberalizacja wiatraków | Najtańsza nowa energia, niższe ceny | Sprzeciw lokalny, krajobraz, zdrowie (spór o odległości) |
| Atom | Stabilna, bezemisyjna moc | Koszt (około 192 mld zł), terminy, pomoc publiczna przez 60 lat |
| Rynek mocy | Bezpieczeństwo dostaw | Koszt na rachunkach; wcześniej wspierał węgiel |
| Redysponowanie OZE | Bezpieczeństwo pracy sieci | Straty inwestorów, niskie rekompensaty, potrzeba elastyczności |
| ETS i ETS2 | Sygnał cenowy dla dekarbonizacji | Koszty dla gospodarstw i przemysłu; Polska wynegocjowała klauzule rewizyjne |
| Węgiel | Miejsca pracy, regiony górnicze | Koszt CO2, smog, ceny hurtowe |

**Zasada Energypedii:** przedstawiamy fakty i argumenty obu stron, a opinie oznaczamy jako opinie.

---

## 9. Mapa zmian z perspektywy segmentów odbiorców

| Segment | 2010–2017 | 2018–2021 | 2022–2025 | 2026+ |
|---|---|---|---|---|
| **Gospodarstwa domowe** | Taryfy URE, mała aktywność, akwizytorzy | Pierwsze mrożenie (2019), boom PV | Mrożenia, bon, net-billing, taryfy dynamiczne | Ceny bez osłony, rosnąca dystrybucja i opłata mocowa, autokonsumpcja, magazyny, CSIRE |
| **Mikrofirmy** | Ceny rynkowe niskie | Wzrosty od 2021 r. | Szok 2022, ceny maksymalne 785 → 693 zł/MWh | Ceny rynkowe; kluczowy dobór umowy i taryfy; ochrona przed nieuczciwą sprzedażą |
| **MŚP** | Przetargi, ceny stałe | Indeksacja, rosnące ryzyko | Kryzys, ceny maksymalne, przejście na transze i ceny stałe | Strategie zakupowe, PPA, autoprodukcja, magazyny, elastyczność |
| **Duże firmy i samorządy** | Przetargi grupowe | Rosnące koszty CO2 i mocy | Kryzys, rekompensaty, PZP | cPPA, ESG/CBAM, moc umowna, DSR, linie bezpośrednie |

---

## 10. Najczęstsze mity (do prostowania w treściach)

1. „Giełda tanieje, więc rachunek od razu spadnie” → rachunek reaguje z opóźnieniem, a duży udział mają dystrybucja i opłaty.
2. „Zmiana sprzedawcy zmienia operatora sieci” → nie, operator sieci (OSD) zostaje ten sam.
3. „Zmiana sprzedawcy jest ryzykowna, mogą mi odciąć prąd” → przy zachowaniu procedur ciągłość dostaw jest zapewniona (sprzedawca rezerwowy).
4. „Fotowoltaika już się nie opłaca” → zależy od autokonsumpcji, magazynu i profilu; trzeba to policzyć.
5. „Taryfa dynamiczna zawsze jest tańsza” → tylko przy elastycznym zużyciu; ryzyko wysokich cen w szczycie.
6. „Opłata mocowa to podatek dla elektrowni węglowych” → finansuje rynek mocy (dziś także magazyny i gaz).
7. „Ceny ujemne oznaczają darmowy prąd w domu” → nie przy taryfie stałej; dotyczą giełdy i części umów dynamicznych.
8. „Polska ma najdroższy prąd w Europie” → zależy od miary (hurt, rachunek netto, brutto, siła nabywcza); trzeba to doprecyzować danymi Eurostatu.

---

## 11. Kalendarz rynku (cykliczne wydarzenia)

| Kiedy | Co | Źródło |
|---|---|---|
| Co miesiąc (początek) | Podsumowanie miesiąca TGE; dane PSE; raporty ARE | TGE, PSE, ARE |
| Wrzesień–październik | Wnioski taryfowe OSD i sprzedawców | URE |
| Październik–listopad | Stawka opłaty mocowej na kolejny rok (informacja Prezesa URE) | URE |
| Listopad–grudzień | Aukcje rynku mocy (główne) | PSE, URE |
| Połowa grudnia | **Zatwierdzenie taryf na kolejny rok** | URE |
| Styczeń | Roczne podsumowania (TGE, PSE, Forum Energii, Ember) | |
| I kwartał | Raporty roczne URE (zmiany sprzedawcy, prosumenci) | URE |
| Kwartalnie | Dane o zmianach sprzedawcy, mikroinstalacjach | URE, PTPiREE |
| Nieregularnie | Aukcje OZE, offshore; nowelizacje ustaw; decyzje UE | URE, Sejm, KE |

---

## 12. Słownik skrótów

ACER, ARE (Agencja Rynku Energii), BESS (bateryjny magazyn energii), CBAM, CfD (kontrakt różnicowy), CSIRE / OIRE, DSR (redukcja zapotrzebowania na polecenie), EU ETS / ETS2, KDT (kontrakty długoterminowe, rozwiązane w 2008 r.), KPEiK, KSE (Krajowy System Elektroenergetyczny), KWD (korekcyjny współczynnik dyspozycyjności), OSD / OSP, PEP2040, PPA / cPPA, PPE (punkt poboru energii), RCE / RCEm (rynkowa cena energii dla prosumentów), RDN / RDB, SMR, TGE, TPA, URE.

---

## 13. Jak każda rola wykorzystuje kompendium

| Rola | Zastosowanie |
|---|---|
| **Redaktor SEO/AEO/GEO** | Tematy evergreen („historia cen prądu w Polsce”, „dlaczego prąd jest drogi”), strony przewodnie, osie czasu, prostowanie mitów, linkowanie |
| **Recenzent** | Kontrola kontekstu i aktualności (czy tekst nie opisuje osłon jako obowiązujących; czy liczby historyczne są spójne) |
| **Analityk** | Szeregi czasowe, punkty odniesienia (2021–2022 jako kryzys), interpretacja zmian; uzupełnianie pól [W] |
| **Social media** | Formaty „10 lat polskiej energetyki w 10 wykresach”, „mit i fakt”, „kalendarz rynku” |
| **Specjalista kampanii** | Sezonowość popytu na informację (grudzień: taryfy; wiosna: PV; jesień: umowy firmowe), przekazy dopasowane do segmentów |
| **Sprzedawca reklam** | Mapa potencjalnych partnerów (grupy, niezależni sprzedawcy, OZE, magazyny, finanse), argumenty: dlaczego teraz (koniec osłon, CSIRE, offshore, atom) |

---

## 14. Źródła (wybrane, z października 2026 r.)

- Ceny i taryfy 2026 r.: [infor.pl](https://www.infor.pl/prawo/nowosci-prawne/7482689,ceny-pradu-2026-koniec-z-mrozeniem-ure-gospodarstwa-domowe-zaplaca-w-sumie-3-wiecej-niz-teraz-tanszy-prad-49516-zl-netto-za-1-mwh-drozsza-dystrybucja.html); opłata mocowa 2026 r.: [gramwzielone.pl](https://www.gramwzielone.pl/?p=20339842), [elektromobilni.pl](https://elektromobilni.pl/?p=132163)
- Miks 2024–2025: [gramwzielone.pl — Forum Energii](https://www.gramwzielone.pl/?p=20322806), [chip.pl — czerwiec 2025](https://www.chip.pl/2025/07/polska-energetyka-oze-pokonaly-wegiel), [money.pl](https://www.money.pl/gospodarka/przelom-w-polskiej-energetyce-historyczny-wynik-dotyczacy-wegla-7246114216196320a.html); 2017: [bank.pl — Forum Energii](https://bank.pl/?p=256954); OZE 2010–2022: [geografia24 (GUS)](https://www.geografia24.eu/geo_2023a_dane_pr_3/303_5_gospodarka_polski/r3_5_09a.pdf)
- Ceny RDN: [TGE — podsumowanie 2021](https://www.tge.pl/pub/TGE/komunikaty/2022/2022.01.05_podsumowanie%20dzialalnosci%20tge%20w%202021%20roku.pdf), [TGE — podsumowanie 2024](https://tge.pl/pub/TGE/komunikaty/2025/2025.01.07_podsumowanie%20dzialalnosci%20tge%20w%202024.pdf), [gramwzielone.pl — 2022](https://www.gramwzielone.pl/?p=20155269)
- PV i prosumenci: [DWF — przewodnik aukcyjny 2026](https://dwfgroup.com/-/media/dwf-global-site/pdfs/insights/poland/przewodnik-po-systemie-aukcyjnym-oze---fotowoltaika-2026.pdf), [gramwzielone.pl — PSE V 2026](https://www.gramwzielone.pl/?p=20363768), [gramwzielone.pl — prosumenci 2025](https://www.gramwzielone.pl/?p=20335355), [globenergia.pl](https://globenergia.pl/w-2025-roku-prosumenci-dostarczyli-5-krajowej-produkcji-pradu/)
- Redysponowanie OZE: [parkiet.com](https://www.parkiet.com/energetyka/art45065981-wylaczenia-oze-ograniczaja-oplacalnosc-zielonych-technologii), [gramwzielone.pl](https://www.gramwzielone.pl/?p=20369542)
- Obligo giełdowe: [e-prawnik.pl](https://e-prawnik.pl/informacje/zniesienie-obowiazku-sprzedazy-wytworzonej-energii-elektrycznej-na-gieldzie-towarowej.html), [bank.pl](https://bank.pl/sejm-przyjal-nowelizacje-dotyczaca-100-obliga-gieldowego-dla-energii-elektrycznej/), [money.pl — powrót](https://www.money.pl/gospodarka/energia-na-gielde-rzad-chce-przywrocic-ogligo-co-to-oznacza-7221305781308288a.html), [tvp.info](https://www.tvp.info/94033176/rzad-szykuje-duze-zmiany-na-rynku-energii-jest-termin-dla-kluczowej-ustawy)
- Osłony cenowe: [forsal.pl](https://forsal.pl/biznes/energetyka/artykuly/8579524,prezydent-duda-podpisal-ustawe-o-maksymalnych-cenach-energii.html), [gazetaprawna.pl](https://www.gazetaprawna.pl/biznes/energetyka/artykuly/10923999,ustawa-maksymalne-ceny-energii-podpis-prezydenta.html)
- Rynek bilansujący: [URE](https://www.ure.gov.pl/pl/urzad/informacje-ogolne/aktualnosci/11325,Rynek-energii-elektrycznej-Prezes-URE-zatwierdzil-Warunki-Dotyczace-Bilansowania.pdf), [TGE](https://www.tge.pl/pub/TGE/komunikaty/2024/06/2024.06.14_tge%20wdraza%20nowe%20rozwiazania%20na%20rynku%20spot%20energii%20eleketrycznej.pdf)
- 2015, 20. stopień zasilania: [money.pl](https://www.money.pl/gospodarka/wiadomosci/artykul/ograniczenia-w-dostepie-do-pradu-nawet-do,143,0,1877647.html), [gramwzielone.pl](https://www.gramwzielone.pl/?p=17571)
- Wiatraki: [forsal.pl — weto](https://forsal.pl/kraj/artykuly/9867527,prezydent-nawrocki-wetuje-nowelizacje-tzw-ustawy-wiatrakowej.html), [demagog.org.pl](https://demagog.org.pl/obietnice/konkret-86-zmiana-ustawy-wiatrakowej)
- Atom: [gramwzielone.pl — zgoda KE](https://www.gramwzielone.pl/trendy/20344416/zielone-swiatlo-dla-budowy-pierwszej-polskiej-elektrowni-jadrowej-komisja-europejska-zatwierdza-pomoc-publiczna), [PAP](https://www.pap.pl/aktualnosci/po-16-latach-przygotowan-decyzja-komisji-europejskiej-otwiera-droge-do-sfinansowania)
- Offshore: [gramwzielone.pl — Baltic Power](https://www.gramwzielone.pl/?p=20373718), [gramwzielone.pl — aukcja 2025](https://www.gramwzielone.pl/?p=20345423), [globenergia.pl](https://globenergia.pl/wyniki-aukcji-offshore-jeden-projekt-nie-uzyskal-wsparcia/)
- Rynek mocy i magazyny: [gramwzielone.pl](https://www.gramwzielone.pl/?p=20344898), [parkiet.com](https://www.parkiet.com/energetyka/art44802621-magazyny-pomoga-ale-nie-rozwiaza-problemu)
- KPEiK: [KPMG](https://kpmg.com/pl/pl/home/insights/2025/07/legal-alert-projekt-aktualizacji-krajowego-planu-w-dziedzinie-energii-i-klimatu-2030-przyjety-przez-mkis.html); ETS2 i cel 2040: [gramwzielone.pl](https://www.gramwzielone.pl/?p=20340372), [money.pl](https://www.money.pl/gospodarka/cel-klimatyczny-na-2040-r-media-jest-decyzja-ue-7230856255523776a.html)
- Nowelizacja Prawa energetycznego 2026: [ELI — Dz.U. 2026 poz. 516](https://eli.gov.pl/eli/DU/2026/516), [DZP](https://www.dzp.pl/files/shares/Alerty/Alert%20prawny%20Nowelizacja%20PrEnerg%20POL.pdf)
- CSIRE: [gramwzielone.pl](https://www.gramwzielone.pl/trendy/20381312/ryzyko-zaklocen-na-rynku-energii-operatorzy-sieci-zwlekaja-z-przystapieniem-do-csire); zmiany sprzedawcy: [enerad.pl — dane URE](https://enerad.pl/ponad-14-tys-zmian-sprzedawcy-pradu-w-i-kwartale-2025-r-odbiorcy-szukaja-oszczednosci-i-lepszych-ofert/), [URE 2023](https://www.ure.gov.pl/pl/urzad/informacje-ogolne/aktualnosci/11701,W-2023-r-sprzedawce-pradu-zmienilo-blisko-26-tys-odbiorcow-Lacznie-od-2007-roku-.pdf)

## 15. Lista do uzupełnienia przy najbliższej aktualizacji [W]

1. Średnia RDN za 2025 r. i liczba godzin z cenami ujemnymi (podsumowanie roczne TGE, PSE).
2. Pełny szereg miksu 2010–2025 w TWh (Forum Energii, ARE, Eurostat): jedna spójna metodyka.
3. Liczba odbiorców według grup taryfowych i OSD (URE, PTPiREE).
4. Data i szczegóły podniesienia obliga do 30%; status projektu UD284.
5. Status NABE (oficjalna decyzja 2024 r.) i harmonogram wyłączeń bloków węglowych.
6. Status ustawy wiatrakowej po wecie z 2025 r.
7. Status przystąpienia OSD do CSIRE po 19.10.2026 r.
8. Taryfy URE na 2027 r. (grudzień 2026 r.) i stawka opłaty mocowej na 2027 r.
9. Wyniki aukcji rynku mocy na 2031 r. (jeśli się odbyła) i kolejnych aukcji OZE.
10. Formalne przyjęcie aktualizacji KPEiK i przepisów o ETS2.
