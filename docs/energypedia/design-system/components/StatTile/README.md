# StatTile

Kafel z jedną liczbą rynku energii, jej etykietą i notką o źródle.

- Każda liczba ma jednostkę, a notka mówi: netto/brutto (jeśli dotyczy), źródło i datę (np. „netto · decyzja Prezesa URE z 17.12.2025 r.”).
- `live` tylko dla danych aktualizowanych automatycznie; brak danych pokazuj jako „[… zł/MWh]”, nigdy jako zero.
- W rzędzie maksymalnie 4 kafle; na telefonie rząd przewijany poziomo.
- Konsument podaje: `label`, `value` (sformatowana po polsku: przecinek dziesiętny, spacja tysięcy), `note`, opcjonalnie `href` do Barometru.
