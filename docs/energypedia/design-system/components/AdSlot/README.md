# AdSlot

Zarezerwowane miejsce reklamowe o stałej wysokości, z etykietą „REKLAMA”.

- Wysokość jest zarezerwowana zanim reklama się załaduje (zero przeskoków układu); identyfikator `slotId` odpowiada slotowi w serwerze reklam (architektura serwisu, rozdz. 7.2).
- Nigdy w pierwszym ekranie na telefonie, nigdy w narzędziach i obok wyników porównywarki (strefa neutralna), maksymalnie 1 reklama na około 3 ekrany treści na telefonie.
- Na produkcji `showMeta={false}` (bez identyfikatora i rozmiaru); w makietach i media kicie z meta.
- Konsument podaje: `slotId`, `size` (970x250, 750x200, 728x90, 300x600, 300x250, 320x100, 320x50).
