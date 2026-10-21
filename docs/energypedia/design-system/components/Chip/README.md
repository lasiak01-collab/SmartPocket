# Chip

Przycisk-pigułka do wyboru jednej z gotowych podpowiedzi (np. przykładowych pytań pod polem „Zapytaj”).

- Stan wybrany przekazuj przez `pressed` (renderuje `aria-pressed`); wybrany chip ma tło `ink` i tekst `bg`.
- Konsument podaje: tekst (pełne pytanie na komputerze, skrót na telefonie), `pressed`, `onClick`.
- Na telefonie układaj chipy w poziomo przewijanym rzędzie; na komputerze zawijaj i wyśrodkowuj.
- Nie używaj chipów jako nawigacji ani filtrów wielokrotnego wyboru.
