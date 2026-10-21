# Wirtualny zespół Energypedii: jak go uruchomić i z nim pracować

Ten katalog zawiera prompty dla siedmiu wirtualnych pracowników oraz wspólny kontekst firmy. Redaktorem naczelnym i jedyną osobą podejmującą decyzje jest właściciel.

| Plik | Rola | Główne zadania |
|---|---|---|
| `00_kontekst_wspolny.md` | **Dla wszystkich** | Misja, zasady, organizacja, kluczowe fakty, format przekazania pracy |
| `00_kompendium_rynku_energii_2010-2026.md` | **Dla wszystkich** | Pełna wiedza branżowa: architektura rynku, chronologia 2010–2026, dane, regulacje, mechanizmy cen, technologie, spory, mity, kalendarz rynku, źródła |
| `01_recenzent.md` | Recenzent merytoryczny i fact-checker | Weryfikacja faktów, aktualności przepisów, rachunków, prawa prasowego i oznaczeń reklam; werdykt przed publikacją |
| `02_analityk_rynku.md` | Analityk rynku energii | Barometr Rynku, Barometr Odbiorców, „Temperatura rachunku”, analizy „na gorąco”, wykresy, metodyki |
| `03_social_media.md` | Specjalista social media i społeczności | Kalendarz, posty, karuzele, wideo, marka osobista naczelnego, moderacja, kryzysy |
| `04_specjalista_kampanii.md` | Specjalista ds. kampanii reklamowych (pozyskanie ruchu) | Google/Meta/LinkedIn/TikTok Ads, kreacje, strony docelowe, pomiar, budżety |
| `05_sprzedawca_reklam.md` | Sprzedawca powierzchni reklamowej, sponsoringu i partnerstw | Media kit, cenniki, lista klientów, oferty, umowy, raporty, odnowienia |
| `06_redaktor_seo_aeo_geo.md` | Redaktor publikacji i strateg SEO / AEO / GEO | Strategia treści i mapa tematów; pełny miks publikacji (newsy, artykuły wyjaśniające, poradniki, porównania, analizy danych, strony przewodnie, trackery, hasła); obowiązkowa struktura artykułu; dane strukturalne; optymalizacja pod Google, pozycję zerową i odpowiedzi AI; analiza Search Console i cytowań AI |
| `07_prawnik.md` | Prawnik | Prawo energetyczne, OZE, prawa konsumenta, konkurencja i nieuczciwe praktyki (UOKiK), RODO i PKE, prawo UE (energia, dane, AI, DSA, Data Act, NIS2), prawo prasowe i reklama; radar prawny (URE, ARE, PSE, RCL, Sejm, UOKiK, UODO, UE), rejestr aktów, opinie, umowy, regulaminy, zgody, DPIA |

---

## 1. Uruchomienie (zalecane: osobny projekt dla każdej roli)

W Claude (claude.ai lub aplikacja) utwórz **7 projektów**, np. „EP | Recenzent”, „EP | Analityk”, „EP | Social”, „EP | Kampanie”, „EP | Sprzedaż”, „EP | Redaktor SEO”, „EP | Prawnik”. W każdym:

1. **Instrukcje projektu:** wklej całą zawartość pliku roli (np. `01_recenzent.md`).
2. **Wiedza projektu (pliki):**
   - `00_kontekst_wspolny.md` i `00_kompendium_rynku_energii_2010-2026.md` (we wszystkich projektach),
   - `BIZNESPLAN_Energypedia.md` i `PLAN_MVP_do_konca_2026.md` (we wszystkich), a `ARCHITEKTURA_serwisu_Energypedia.md` u Redaktora SEO, Specjalisty kampanii, Sprzedawcy i Prawnika (szablony, sloty reklamowe, model treści, zgody),
   - dodatkowo według roli:
     - Recenzent: przewodnik stylu, statut redakcji, lista źródeł pierwotnych, rejestr sprostowań;
     - Analityk: metodyki wskaźników, poprzednie Barometry, pliki danych CSV, kwestionariusz badania;
     - Social: kalendarz wydarzeń, biblioteka odpowiedzi, statystyki z poprzedniego miesiąca;
     - Kampanie: plan pomiaru, eksporty wyników kampanii, ceny leadów;
     - Sprzedaż: aktualny media kit, cennik, pipeline, wzory umów;
     - Prawnik: rejestr aktów i komunikatów (radar prawny), wzory dokumentów, podpisane umowy bez danych osobowych, opinie zewnętrzne kancelarii;
     - Redaktor SEO: mapa tematów i plan publikacji, rejestr opublikowanych adresów, przewodnik stylu, lista opublikowanych adresów (do linkowania), eksporty z Google Search Console.
3. **Narzędzia:** włącz **wyszukiwanie w sieci** we wszystkich projektach (fakty zmieniają się szybko). U Analityka włącz też **analizę danych / wykonywanie kodu**.
4. **Test startowy:** w każdym projekcie napisz: „Przedstaw się, opisz w 5 punktach, jak będziesz pracować, i zadaj mi 3 pytania, których odpowiedzi poprawią Twoją pracę”. Odpowiedzi dopisz do wiedzy projektu.

**Wariant prostszy:** jeden projekt „Energypedia — zespół” z kontekstem wspólnym w wiedzy i wszystkimi plikami ról. Rolę wywołujesz na początku rozmowy: „Działaj jako Recenzent (plik 01) — /recenzja …”. Wada: role mieszają się, a kontekst szybciej się zapełnia.

## 2. Pamięć zespołu (ważne)

Wirtualni pracownicy **nie pamiętają rozmów między czatami**. Pamięcią są pliki w wiedzy projektu. Dlatego:
- prowadź plik **`dziennik_decyzji.md`** (data, decyzja, uzasadnienie) i dodawaj go do wszystkich projektów;
- po ważnej zmianie (cennik, metodyka, zasady) **zaktualizuj `00_kontekst_wspolny.md`** i podmień go we wszystkich projektach;
- raz w miesiącu poproś każdą rolę o propozycję poprawek do jej promptu (na podstawie doświadczeń) i zatwierdź je.

## 3. Jak przepływa praca (przykłady)

**Artykuł, poradnik, hasło**
```
Redaktor SEO: /serp → /brief → /artykul, /poradnik, /porownanie lub /haslo (szkic z oceną 0–100) → Recenzent: /recenzja → Redaktor SEO: wersja finalna
→ Naczelny: akceptacja i publikacja
→ Social: /z-artykulu (pakiet postów) → Recenzent: /szybka (posty z liczbami) → Naczelny planuje publikację
```

**Barometr Rynku Energii (miesięcznie)**
```
D-5 Analityk: /barometr (lista danych, obliczenia, wykresy) → D-2 Recenzent: /recenzja
→ D-1 Naczelny: informacja prasowa (Analityk podaje cytaty) → D Social: /goraco (pakiet postów)
→ Kampanie: promocja na LinkedIn (decydenci) → Sprzedaż: wyniki do media kitu i ofert „Partner Barometru”
```

**Decyzja URE o taryfach („na gorąco”)**
```
Analityk: /goraco (60 min) + Prawnik: /komunikat (podstawa prawna decyzji) → Recenzent: /szybka → Naczelny publikuje
→ Social: /goraco → Kampanie: zwiększenie budżetu na frazy „taryfy 2027”, „ceny prądu 2027”
```

**Nowa ustawa, nowelizacja lub komunikat URE/ARE**
```
Prawnik: /radar lub /nowelizacja (co się zmienia, od kiedy, kogo dotyczy, wpływ) → Redaktor SEO: news + aktualizacja trackera i poradników
→ Analityk: wpływ na rachunki (jeśli dotyczy) → Recenzent → Naczelny publikuje → Social: pakiet postów
```

**Poradnik o prawach odbiorcy / wzór pisma**
```
Redaktor SEO: /poradnik lub /wzor → Prawnik: /kontrola → Recenzent: /recenzja → Naczelny publikuje
```

**Klient reklamowy**
```
Sprzedaż: /lista, /sekwencja → Naczelny: kontakt → Sprzedaż: /rozmowa, /oferta
→ Recenzent: /partner (granica redakcja–reklama) → Prawnik: /umowa (zlecenie, klauzula niezależności, Omnibus) → Naczelny: rozmowa i podpis
→ Sprzedaż: /raport-klienta, odnowienie
```

## 4. Rytm tygodnia redaktora naczelnego (propozycja dla jednoosobowej redakcji)

| Dzień | Rano (30–45 min) | W ciągu dnia |
|---|---|---|
| Codziennie | Przegląd źródeł → 2–3 newsy (szkic z Claude) → Recenzent `/szybka` → publikacja → newsletter | Odpowiedzi w social media (biblioteka odpowiedzi) |
| Poniedziałek | Social `/kalendarz` na tydzień; Kampanie `/raport` za poprzedni tydzień | Redaktor SEO `/plan` na tydzień; od stycznia `/gsc` (dane z Search Console) |
| Wtorek–czwartek | Redaktor SEO: 3–5 szkiców dziennie (artykuły, poradniki, hasła) → Recenzent → akceptacja i publikacja (2–3 godziny dziennie) | Sprzedaż: 3–5 kontaktów tygodniowo (od XI 2026 r.: „partner założycielski”) |
| Piątek | Analityk: przegląd danych tygodnia i wykres na LinkedIn; Sprzedaż `/pipeline`; **Prawnik `/radar`** (nowe akty, projekty, komunikaty URE, ARE, PSE, UOKiK, UODO, UE) | Dziennik decyzji, aktualizacja kontekstu i rejestru aktów; zadania z radaru dla Redaktora SEO |
| Ostatni tydzień miesiąca | Analityk `/barometr` | Raport KPI miesiąca (wszystkie role) |

## 5. Zasady bezpieczeństwa i odpowiedzialności

- **Odpowiedzialność prawną za publikacje ponosi redaktor naczelny.** AI przygotowuje, a człowiek decyduje i sprawdza.
- **Nie wklejaj danych osobowych** czytelników, klientów ani leadów (nazwiska, telefony, e-maile, numery punktów poboru, adresy). Używaj danych zanonimizowanych.
- **Nie wklejaj haseł ani kluczy dostępu** do paneli reklamowych, CMS itp.
- Dokumenty strategiczne (biznesplan, cenniki, pipeline) traktuj jako poufne. Repozytorium, w którym leżą te pliki, publikuje swoją zawartość przez GitHub Pages po scaleniu z gałęzią `main`, więc **nie scalaj tej gałęzi** albo przenieś dokumenty do prywatnego miejsca.
- AI może się mylić, zwłaszcza w faktach zależnych od daty. Rola Recenzenta i źródła pierwotne to obowiązkowe zabezpieczenie.

## 6. Kolejne role, które warto dodać (gdy będzie potrzeba)

- **Opiekun partnerów leadowych** (od 2027 r.): standardy jakości leadów, reklamacje, raporty dla sprzedawców energii.
- **Koordynator PR i relacji z mediami**: informacje prasowe, baza dziennikarzy, monitoring cytowań.
