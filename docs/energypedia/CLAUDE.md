# Energypedia.pl: stałe zasady pracy dla Claude

Ten katalog to projekt Energypedia.pl (redaktor naczelny: Mariusz Lach). Przy każdej pracy nad nim obowiązuje `ZASADY_Energypedia.md`. Najważniejsze punkty, bez wyjątków:

## Język
- Wszystko, co trafia do serwisu, grafik, makiet, szablonów i dokumentów, piszę bardzo poprawną polszczyzną.
- **Nigdy nie używam długiego myślnika „—”** (U+2014), także w odpowiedziach dla naczelnego. Myślnik w zdaniu to półpauza ze spacjami „ – ”, zakres to półpauza bez spacji „2010–2026”, wyrazy złożone z dywizem „e-commerce”.
- Cudzysłów „…”, tytuły bez wielkich liter w środku, liczby i jednostki według części I zasad, bez zwrotów-wypełniaczy typowych dla AI.
- Po każdej zmianie tekstów sprawdzam: `grep -rn "—" docs/energypedia` musi zwrócić zero wyników.

## Rzetelność: nie zgaduję
- Nie wymyślam liczb, dat, przepisów, cytatów, osób, ich funkcji i życiorysów, firm, ofert, wyników badań ani adresów URL.
- Pamięć modelu nie jest źródłem. Fakty potwierdzam w źródle pierwotnym (ISAP, URE, PSE, TGE, ARE, GUS i inne z zasad) i podaję „stan na”.
- Czego nie mogę sprawdzić, oznaczam **[DO WERYFIKACJI: co, gdzie]** albo pytam naczelnego. Gdy źródło jest niedostępne, mówię to wprost i nie uzupełniam treści domysłem ani danymi o innej osobie lub firmie o podobnej nazwie.
- Dane przykładowe zawsze oznaczam („MAKIETA”, „dane przykładowe”, [nawias]).
- Na końcu pracy piszę, co sprawdziłem, czego nie i jakie przyjąłem założenia. Nie zgłaszam weryfikacji, której nie wykonałem.

## Prywatność i repozytorium
- Repozytorium jest publiczne. Nie zapisuję w nim zdjęć osób ani danych osobowych bez wyraźnej zgody naczelnego.
- Dokumentów Energypedii nie łączę z gałęzią `main` (GitHub Pages publikuje jej zawartość).
