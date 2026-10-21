# Logo

Logo 3 „E z danych”: sygnet z czterech słupków (litera E, środkowy słupek w kolorze prądu) i logotyp „energypedia.pl” w kroju Manrope ExtraBold zamienionym na krzywe — wygląda tak samo bez względu na załadowane fonty.

- **Nagłówek serwisu:** `<Logo href="/" />` — domyślnie `size="md"` (40 px) i `animate="intro-live"`: przy wejściu słupki wyrastają kolejno (A, ok. 0,95 s, raz), a od 1,4 s środkowy słupek łagodnie „oddycha” jak odczyt danych na żywo (C, cykl 6 s, pętla). Na telefonie `size="sm"` (32 px).
- **Stopka, materiały, karty partnerów:** `animate="none"`. Pętla C jest zarezerwowana dla nagłówka i ekranu ładowania.
- **Sam sygnet** (`variant="signet"`): awatary, znak wodny na wykresach, ładowanie.
- Na powierzchni `navy` używaj `tone="inverse"` (słupki i „energy” białe, „pedia” i środkowy słupek `volt`, „.pl” `on-navy-muted`). W ciemnym motywie logo przełącza się samo przez tokeny `logo-*`.
- Przy „ogranicz ruch” animacja jest wyłączona, widać pełny statyczny znak.
- Konsument podaje: `href`, `tone`, `size`, `variant`, `withDomain`, `animate`.
- Nie zmieniaj proporcji, kolorów, kroju ani animacji; nie składaj logotypu z fontu. Pliki produkcyjne (SVG, PNG, PDF, favicony) są w grupie zasobów Logos i w paczce `brand/logo` (księga znaku).
