// Treści strony głównej do czasu podłączenia CMS (Payload).
// Wartości w nawiasach kwadratowych to pola do uzupełnienia; skrypt check:tresci
// zatrzymuje wydanie produkcyjne, dopóki zostaną.

export const pytaniaPodpowiedzi = [
  "Do kiedy wypowiedzieć umowę, żeby od stycznia zmienić sprzedawcę?",
  "Czy zapłacę karę za zerwanie umowy na prąd?",
  "Czy zmiana sprzedawcy zmienia operatora sieci?",
];

export const kafleEnergiaDzis = [
  { etykieta: "Taryfa dla domów 2026 (średnio)", wartosc: "495,16 zł/MWh", notka: "netto · decyzja Prezesa URE z 17.12.2025 r." },
  { etykieta: "Prąd na giełdzie wczoraj (RDN)", wartosc: "[… zł/MWh]", notka: "TGE · aktualizacja codzienna" },
  { etykieta: "Opłata mocowa 2026 (1200–2800 kWh)", wartosc: "17,18 zł/mies.", notka: "netto" },
  { etykieta: "Zmiany sprzedawcy w I półroczu 2026 r.", wartosc: "[liczba]", notka: "URE · [DO WERYFIKACJI u źródła]" },
];

export const sciezkiTematu = [
  { etykieta: "UMOWA BEZTERMINOWA", tytul: "Masz taryfę sprzedawcy z urzędu?", opis: "Wypowiedzenie bez kosztów. Liczy się dzień, w którym dotrze do sprzedawcy.", href: "/temat/zmiana-sprzedawcy-2027#bezterminowa" },
  { etykieta: "UMOWA TERMINOWA", tytul: "Promocja kończy się 31 grudnia?", opis: "Sprawdź automatyczne przedłużenie i cenę po okresie promocji.", href: "/temat/zmiana-sprzedawcy-2027#terminowa" },
  { etykieta: "UMOWA OD AKWIZYTORA", tytul: "Podpisałeś umowę w domu?", opis: "Najpierw prawo odstąpienia, potem wypowiedzenie. Wzór pisma do pobrania.", href: "/temat/zmiana-sprzedawcy-2027#akwizytor" },
];

// Najnowsze i najczęściej czytane pochodzą z CMS i analityki; do tego czasu lista robocza.
export const najnowsze = [
  { godzina: "[godz.]", dzial: "TEMAT MIESIĄCA", tytul: "Do kiedy wypowiedzieć umowę na prąd, żeby od stycznia zmienić sprzedawcę", href: "/temat/zmiana-sprzedawcy-2027" },
  { godzina: "[godz.]", dzial: "WIADOMOŚCI", tytul: "Energypedia startuje: jak pracujemy i skąd bierzemy dane", href: "/jak-pracujemy" },
  { godzina: "[godz.]", dzial: "TRACKER", tytul: "Taryfy na prąd 2027: co wiemy przed decyzją URE", href: "/na-biezaco/taryfy-na-prad" },
  { godzina: "[godz.]", dzial: "CSIRE", tytul: "Zmiana sprzedawcy w 24 godziny: co już działa po 19 października", href: "/na-biezaco/csire" },
  { godzina: "[godz.]", dzial: "PORADNIK", tytul: "Jak czytać rachunek za prąd: pozycja po pozycji", href: "/poradniki/jak-czytac-rachunek-za-prad" },
  { godzina: "[godz.]", dzial: "FIRMY", tytul: "Umowa na prąd dla firmy na 2027 r.: na co zwrócić uwagę", href: "/poradniki/umowa-na-prad-dla-firmy" },
];

export const najczesciejCzytane = [
  { tytul: "Kiedy wypowiedzieć umowę na prąd", href: "/temat/zmiana-sprzedawcy-2027" },
  { tytul: "Ceny prądu w Polsce: taryfy, stawki i prognozy", href: "/przewodniki/ceny-pradu" },
  { tytul: "Jak zmienić sprzedawcę prądu krok po kroku", href: "/poradniki/jak-zmienic-sprzedawce-pradu" },
  { tytul: "Rachunek za prąd: z czego się składa", href: "/przewodniki/rachunek-za-prad" },
  { tytul: "Wzór wypowiedzenia umowy sprzedaży energii", href: "/wzory-pism/wypowiedzenie-umowy-na-prad" },
];

export const sprawdzSytuacje = [
  { tytul: "Kto jest moim sprzedawcą i operatorem?", opis: "Wybierz województwo albo sprawdź na rachunku. Pokażemy profil sprzedawcy z urzędu.", cta: "Sprawdź", href: "/sprzedawcy" },
  { tytul: "Co oznacza każda pozycja na rachunku?", opis: "Rachunek z objaśnieniami: energia, dystrybucja, opłata mocowa, podatki.", cta: "Zobacz rachunek", href: "/przewodniki/rachunek-za-prad" },
  { tytul: "Akwizytor podsunął mi umowę", opis: "Jak sprawdzić ofertę, jak odstąpić od umowy i gdzie zgłosić nieuczciwe praktyki.", cta: "Co zrobić", href: "/poradniki/umowa-od-akwizytora" },
];

export const dzialy = [
  { nazwa: "Rachunek i sprzedawca", tlo: "var(--navy)", przewodnik: { tytul: "Zmiana sprzedawcy prądu: prawa odbiorcy, umowy i pułapki", href: "/przewodniki/zmiana-sprzedawcy-pradu" }, linki: [
    { tytul: "Jak zmienić sprzedawcę krok po kroku", href: "/poradniki/jak-zmienic-sprzedawce-pradu" },
    { tytul: "Taryfa G11 czy G12", href: "/poradniki/g11-czy-g12" },
    { tytul: "Opłaty dystrybucyjne na rachunku", href: "/poradniki/oplaty-dystrybucyjne" },
  ], haslo: { tytul: "sprzedawca z urzędu", href: "/wiedza/sprzedawca-z-urzedu" } },
  { nazwa: "Fotowoltaika", tlo: "#00796B", przewodnik: { tytul: "Fotowoltaika w domu: net-billing, opłacalność i rozliczenia", href: "/przewodniki/fotowoltaika" }, linki: [
    { tytul: "Jak działa net-billing", href: "/poradniki/net-billing" },
    { tytul: "Wartość rynkowa energii dla prosumenta", href: "/poradniki/wartosc-rynkowa-energii" },
    { tytul: "Fotowoltaika z magazynem energii", href: "/poradniki/fotowoltaika-z-magazynem" },
  ], haslo: { tytul: "net-billing", href: "/wiedza/net-billing" } },
  { nazwa: "Magazyn energii i dotacje", tlo: "#1B3554", przewodnik: { tytul: "Magazyn energii w domu: kiedy się opłaca", href: "/poradniki/magazyn-energii-czy-sie-oplaca" }, linki: [
    { tytul: "Jak dobrać pojemność magazynu", href: "/poradniki/pojemnosc-magazynu-energii" },
    { tytul: "Dotacja do magazynu energii: warunki i nabór", href: "/poradniki/dotacja-do-magazynu-energii" },
    { tytul: "Magazyn energii a taryfa dynamiczna", href: "/poradniki/magazyn-a-taryfa-dynamiczna" },
  ], haslo: { tytul: "magazyn energii", href: "/wiedza/magazyn-energii" } },
];

export const trackery = [
  { status: "Przed decyzją URE", tytul: "Taryfy na prąd 2027", opis: "Stawki dla domów i opłaty dystrybucyjne po zatwierdzeniu.", aktualizacja: "[data, godzina]", href: "/na-biezaco/taryfy-na-prad" },
  { status: "Po terminie 19.10.2026", tytul: "CSIRE i zmiana sprzedawcy w 24 h", opis: "Którzy operatorzy działają w systemie i co to zmienia.", aktualizacja: "[data, godzina]", href: "/na-biezaco/csire" },
  { status: "[stan naboru]", tytul: "Dotacja do magazynu energii", opis: "Warunki, terminy i kto może skorzystać. [DO WERYFIKACJI w NFOŚiGW]", aktualizacja: "[data, godzina]", href: "/poradniki/dotacja-do-magazynu-energii" },
  { status: "Od 1 stycznia 2027", tytul: "Co się zmieni na rachunku", opis: "Opłaty, taryfy i terminy, które dotyczą każdego odbiorcy.", aktualizacja: "[data, godzina]", href: "/na-biezaco/rachunek-2027" },
];

export const segmenty = [
  { id: "dom", nazwa: "Dom", linki: [
    { tytul: "Zmiana sprzedawcy prądu: prawa odbiorcy, umowy i pułapki", href: "/przewodniki/zmiana-sprzedawcy-pradu" },
    { tytul: "Jak czytać rachunek za prąd: pozycja po pozycji", href: "/poradniki/jak-czytac-rachunek-za-prad" },
    { tytul: "Taryfy na prąd 2027: co wiemy przed decyzją URE", href: "/na-biezaco/taryfy-na-prad" },
  ] },
  { id: "firma", nazwa: "Firma", linki: [
    { tytul: "Prąd dla firm: ceny, umowy i zakupy energii", href: "/przewodniki/prad-dla-firm" },
    { tytul: "Jak wypowiedzieć umowę na prąd w firmie", href: "/poradniki/wypowiedzenie-umowy-firma" },
    { tytul: "Cena stała czy indeksowana na 2027 r.", href: "/poradniki/cena-stala-czy-indeksowana" },
  ] },
] as const;

export const wojewodztwa = ["dolnośląskie", "kujawsko-pomorskie", "lubelskie", "lubuskie", "łódzkie", "małopolskie", "mazowieckie", "opolskie", "podkarpackie", "podlaskie", "pomorskie", "śląskie", "świętokrzyskie", "warmińsko-mazurskie", "wielkopolskie", "zachodniopomorskie"];

// Kolejność alfabetyczna. [DO WERYFIKACJI: pełne nazwy i obszary w zestawieniu URE]
export const sprzedawcyZUrzedu = [
  { nazwa: "E.ON", obszar: "obszar Stoen Operator", href: "/sprzedawcy/eon" },
  { nazwa: "Enea", obszar: "obszar Enea Operator", href: "/sprzedawcy/enea" },
  { nazwa: "Energa Obrót", obszar: "obszar Energa-Operator", href: "/sprzedawcy/energa-obrot" },
  { nazwa: "PGE Obrót", obszar: "obszar PGE Dystrybucja", href: "/sprzedawcy/pge-obrot" },
  { nazwa: "TAURON Sprzedaż", obszar: "obszar TAURON Dystrybucja", href: "/sprzedawcy/tauron-sprzedaz" },
];

export const redakcja = [
  { imie: "Mariusz Lach", funkcja: "Redaktor naczelny", href: "/redakcja/mariusz-lach" },
  { imie: "[Ekspert 1]", funkcja: "[specjalizacja, np. prawo energetyczne]", href: "/redakcja" },
  { imie: "[Ekspert 2]", funkcja: "[specjalizacja, np. rynek hurtowy]", href: "/redakcja" },
  { imie: "[Ekspert 3]", funkcja: "[specjalizacja, np. OZE i magazyny]", href: "/redakcja" },
];

export const liczbyDlaFirm = [
  { wartosc: "[liczba]", opis: "zmian sprzedawcy prądu w I półroczu 2026 r. (URE) [DO WERYFIKACJI]" },
  { wartosc: "[liczba]", opis: "wyszukiwań „magazyn energii” miesięcznie (narzędzie SEO) [DO WERYFIKACJI]" },
  { wartosc: "[liczba]", opis: "czytelników newslettera (dane własne, gdy będą)" },
];
