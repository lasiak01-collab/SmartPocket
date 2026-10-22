# Asystent AI „Zapytaj Energypedię”: specyfikacja budowy

Stan: 22.10.2026 r. Decyzje naczelnego: asystent działa od startu serwisu, jest jedną z głównych funkcji Energypedia.pl i budujemy go samodzielnie (naczelny z Claude Code), bez wykonawców i zapytań ofertowych. Powiązania: `PLAN_MVP_do_konca_2026.md` (pozycja 11, zadania 7.9 i 8.7), `ARCHITEKTURA_serwisu_Energypedia.md` (rozdz. 6.3, ADR-13 i ADR-14), `STRONA_GLOWNA_start_listopad.md`.

## 1. Po co jest asystent

Obietnica marki brzmi „Zrozum [temat] w minutę. Ze źródłami.” Asystent ją realizuje: czytelnik zadaje pytanie własnymi słowami i dostaje krótką odpowiedź z przypisami do naszych tekstów, z datą stanu wiedzy. Dla redakcji to także stały podgląd tego, o co ludzie pytają, a czego jeszcze nie opisaliśmy.

**Gdzie występuje**
- pierwszy ekran strony głównej (pole „Twoje pytanie o energię”);
- skrót „Zapytaj” w dolnym menu na telefonie (panel wysuwany od dołu);
- osobna strona `/zapytaj` z historią pytań w bieżącej sesji;
- pole „Zapytaj o ten temat” na stronach haseł, poradników, przewodników, trackerów, tematu miesiąca i profili firm (pytanie z kontekstem danej strony).

## 2. Zasady nienaruszalne
1. **Odpowiada wyłącznie na podstawie opublikowanych treści Energypedii** (v1). Wiedza ogólna modelu nie jest źródłem.
2. **Każde stwierdzenie faktu ma przypis** do fragmentu naszego tekstu z adresem i datą weryfikacji. Odpowiedź bez przypisu nie jest wyświetlana.
3. **Liczby tylko ze źródła:** każda liczba w odpowiedzi musi występować w przytoczonym fragmencie (sprawdzane automatycznie).
4. **Gdy nie ma podstawy, mówi to wprost** i proponuje najbliższe teksty oraz „Zapytaj redakcję” (pytanie trafia do kolejki tematów).
5. **Bez porad w indywidualnej sprawie** (prawnej, podatkowej, inwestycyjnej): wyjaśnia zasady, odsyła do poradnika, wzoru pisma albo instytucji (np. Rzecznik Odbiorców Paliw i Energii).
6. **Neutralność:** nie wskazuje „najlepszego sprzedawcy” ani konkretnej oferty, nie ma reklam ani odpowiedzi sponsorowanych (zasada jak dla narzędzi, ADR-4).
7. **Oznaczenie AI** przy każdej odpowiedzi i zastrzeżenie o charakterze informacyjnym. [DO WERYFIKACJI: Prawnik, zakres obowiązków przejrzystości z AI Act i data ich stosowania]
8. **Bez danych osobowych:** czytelnik dostaje ostrzeżenie, żeby nie wpisywać numeru PPE, adresu ani danych z faktury; filtr maskuje wzorce (numery, e-maile, telefony) przed wysłaniem do modelu i przed zapisem w logach.
9. **Polszczyzna według `ZASADY_Energypedia.md`:** automatyczna kontrola typografii (np. zamiana długiego myślnika na półpauzę, cudzysłów „…”).

## 3. Zakres wersji

| Wersja | Termin | Zakres |
|---|---|---|
| **1.0** | start serwisu | Pytania i odpowiedzi na treściach Energypedii; kontekst strony; przypisy; odmowa poza zakresem; „Zapytaj redakcję”; ocena odpowiedzi i zgłoszenie błędu; zatwierdzone odpowiedzi na najczęstsze pytania |
| **1.1** | I kw. 2027 r. | Dokumenty źródłowe z rejestru źródeł (np. decyzje i komunikaty URE, taryfy) jako osobna, oznaczona kategoria przypisów, tylko tam, gdzie wolno je indeksować; pytania uzupełniające w rozmowie |
| **2.0** | IV 2027 r. | Połączenie z narzędziami (kalkulator taryf, porównywarka, analizator faktury) i danymi Barometru; personalizacja według segmentu i regionu zapisanego w przeglądarce; wersja dla PRO |

## 4. Architektura (wszystko we własnym kodzie)

```
Payload CMS (tylko treści opublikowane)
  └─ zdarzenie „publikacja / aktualizacja / wycofanie”
       └─ kolejka indeksowania
            ├─ podział na fragmenty: sekcje pod H2 (300–800 słów), blok „W skrócie” osobno
            ├─ metadane: URL, tytuł, typ, obszar, segment, region, data weryfikacji, recenzent
            ├─ wektory (model embeddingowy obsługujący polski)
            └─ PostgreSQL: tabela fragmentów + pgvector + indeks pełnotekstowy

Pytanie czytelnika
  ├─ filtr: długość, dane osobowe (maskowanie), limit zapytań, ochrona przed botami
  ├─ zatwierdzona odpowiedź redakcji? → zwróć ją (z datą zatwierdzenia)
  ├─ wyszukiwanie hybrydowe: pełnotekstowe + wektorowe, łączenie wyników (RRF),
  │   preferencja stron przewodnich i haseł, kara za nieaktualne treści
  ├─ generacja: model językowy przez API, instrukcja z zasadami z rozdz. 2,
  │   wynik w ustalonym formacie (W skrócie, szczegóły, przypisy do ID fragmentów)
  ├─ kontrola po generacji: przypisy wskazują pobrane fragmenty, liczby występują
  │   we fragmentach, typografia, brak nazw sprzedawców w roli rekomendacji
  └─ odpowiedź strumieniowa w interfejsie + zapis zanonimizowanego zdarzenia
```

**Decyzje techniczne**
- **Jedna baza:** PostgreSQL z pgvector dla treści CMS i indeksu asystenta (mniej usług do utrzymania). [DO WERYFIKACJI: konfiguracja polskiego słownika do wyszukiwania pełnotekstowego w PostgreSQL; brak wbudowanego słownika oznacza własną konfigurację lub wyszukiwanie wektorowe jako główne]
- **Wybór modeli** (embeddingowego i językowego) na podstawie **naszego testu** na zestawie z rozdz. 6: poprawność, jakość przypisów, polszczyzna, czas odpowiedzi, koszt na 1000 odpowiedzi według publicznych cenników, przetwarzanie danych w UE i warunki umowy powierzenia dostawcy. Kod ma warstwę pośrednią, żeby zmiana dostawcy nie wymagała przebudowy.
- **Limity kosztów:** miesięczny limit wydatków ustawiony u dostawcy i w naszym kodzie; po przekroczeniu asystent przechodzi w tryb „tylko zatwierdzone odpowiedzi i wyszukiwarka”.
- **Bezpieczeństwo:** pytanie czytelnika traktujemy jako dane, nie polecenia; asystent nie ma innych narzędzi niż wyszukiwanie w naszym indeksie; logi bez adresów IP w postaci jawnej, z ograniczonym czasem przechowywania [okres do decyzji naczelnego i Prawnika].

## 5. Interfejs
- Pole pytania z 3–4 podpowiedziami (na start z tematu miesiąca i z najczęstszych pytań tygodnia).
- Odpowiedź: blok „W skrócie” (2–3 zdania), rozwinięcie, przypisy jako numerowane odnośniki z tytułem i datą, „Przeczytaj więcej” do 2–3 tekstów.
- Pod odpowiedzią: „Pomogło?” (tak/nie), „Zgłoś błąd”, „Zapytaj redakcję”; oznaczenie „Odpowiedź wygenerowana przez AI na podstawie artykułów Energypedii”.
- Dostępność: odpowiedź ogłaszana czytnikom ekranu (region na żywo), pełna obsługa klawiaturą, cel dotyku min. 44 px.
- Telefon: panel z dolnego menu do 75% wysokości ekranu, pole pytania przyklejone do dołu panelu.

## 6. Jakość: jak sprawdzamy, że asystent działa

**Zestaw testowy**
- 200 pytań z arkusza „Pytania long tail” w mapie tematów, z oczekiwaną odpowiedzią i źródłem;
- 50 pytań kontrolnych: poza zakresem, porada w indywidualnej sprawie, prośba o wskazanie najlepszego sprzedawcy, próby zmiany instrukcji, dane osobowe w pytaniu, pytania o liczby, których nie mamy.

**Próg startu (jak w planie MVP):** co najmniej 90% poprawnych odpowiedzi według Recenzenta i naczelnego, 0 odpowiedzi bez przypisu, odmowa w 100% pytań poza zakresem, 0 rekomendacji konkretnego sprzedawcy.

**Po starcie:** test regresji przy każdej zmianie instrukcji, modelu lub sposobu dzielenia treści; pełny test raz w miesiącu razem z pomiarem cytowań w wyszukiwarkach AI; błędy zgłoszone przez czytelników trafiają do rejestru korekt.

## 7. Redakcja w pętli
- **Panel redakcji:** pytania bez odpowiedzi, odpowiedzi ocenione „nie pomogło”, zgłoszenia błędów; każde pytanie można oznaczyć „nowy temat”, „uzupełnić tekst” albo „zatwierdzić odpowiedź”.
- **Zatwierdzone odpowiedzi:** dla około 50 najczęstszych pytań redakcja zatwierdza wzorcową odpowiedź; asystent zwraca ją bez generowania (pewność, szybkość, niższy koszt). Data zatwierdzenia jest widoczna, a odpowiedź wygasa przy aktualizacji źródłowego tekstu.
- **Mapa tematów:** pytania bez odpowiedzi co tydzień zasilają listę nowych haseł i poradników.

## 8. Mierniki
Liczba pytań dziennie; odsetek odpowiedzi z przypisami (cel 100%); odsetek odmów; odsetek ocen „pomogło”; kliknięcia w przypisy; zapisy do newslettera po odpowiedzi; czas do pierwszego fragmentu odpowiedzi; koszt na 1000 odpowiedzi; liczba pytań przekazanych redakcji i tekstów, które z nich powstały.

## 9. Asystent a reklamodawcy
Asystent nie wyświetla reklam ani treści partnerów i nie wymienia sprzedawców jako rekomendacji. Wartość dla rynku jest pośrednia: zbiorcze, anonimowe zestawienia tematów pytań („o co pytają odbiorcy energii”) mogą trafić do raportów Energypedii i do oferty PRO, bez danych pojedynczych użytkowników. [DO WERYFIKACJI: Prawnik, podstawa i zakres takiego wykorzystania danych]

## 10. Harmonogram budowy (wariant startu w grudniu; przy starcie 16 XI wszystko o 3 tygodnie wcześniej)

| Tydzień | Zakres |
|---|---|
| 26–30 X | Model danych fragmentów, PostgreSQL z pgvector, kolejka indeksowania z CMS |
| 2–6 XI | Podział treści na fragmenty, wektory, wyszukiwanie hybrydowe; pierwsze testy wyszukiwania na 20 pytaniach |
| 9–13 XI | Generacja z przypisami, format odpowiedzi, kontrole po generacji, filtr danych osobowych |
| 16–20 XI | Prototyp w serwisie testowym (strona główna, `/zapytaj`, panel w dolnym menu) |
| 23–27 XI | Zestaw 250 pytań, porównanie modeli, wybór; dokumenty prawne (zadanie 8.7) |
| 30 XI – 4 XII | Pełny test, poprawki, zatwierdzone odpowiedzi dla 50 pytań, panel redakcji |
| 7–11 XII | Zamrożenie zakresu, test obciążeniowy, limity kosztów; gotowość do startu |
