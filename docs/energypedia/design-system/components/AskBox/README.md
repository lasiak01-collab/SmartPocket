# AskBox

Pole „Zapytaj” na pierwszym ekranie: wyszukiwanie z odpowiedzią AI opartą na treściach Energypedii.

- `size="lg"` (pigułka, 48 px) na komputerze; `size="md"` (zaokrąglony prostokąt) na telefonie.
- Etykieta jest ukryta wizualnie, ale zawsze obecna; podpowiedź w `placeholder` to przykład pytania z życia („Ile kosztuje 1 kWh prądu w mojej firmie?”).
- Konsument podaje: `id`, `onSubmit(query)`, opcjonalnie `placeholder`, `buttonLabel`.
- Pod polem umieszczaj 3 komponenty Chip z przykładowymi pytaniami i AnswerCard z odpowiedzią.
