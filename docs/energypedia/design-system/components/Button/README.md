# Button

Przycisk w kształcie pigułki; jedno główne działanie na ekran w wariancie `primary`.

- `primary` (tło `volt`, tekst `on-volt`): główne działanie sekcji — „Zapytaj”, „Zapisz mnie”, „Policz swój rachunek”.
- `secondary` (tło `navy`): działanie drugorzędne w nagłówku („Newsletter”).
- `outline`: działania neutralne („Zaloguj”, „Pobierz CSV”).
- `ghost`: działanie tekstowe w kolorze `volt-ink`.
- Rozmiary: `md` (44 px, domyślny), `lg` (48 px, pierwszy ekran), `sm` (36 px, tylko w gęstych narzędziach na komputerze).
- Konsument podaje: etykietę (czasownik w trybie rozkazującym, bez wykrzyknika), `onClick` albo `href` (wtedy renderuje się link), `aria-label` przy `iconOnly`.
- Nie używaj dwóch przycisków `primary` obok siebie i nie dawaj `volt` jako koloru tekstu.
