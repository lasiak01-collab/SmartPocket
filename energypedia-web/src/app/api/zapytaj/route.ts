import { NextResponse } from "next/server";
import { konfiguracja } from "@/content/konfiguracja";
import { MAKS_DLUGOSC_PYTANIA, type OdpowiedzAsystenta } from "@/lib/asystent-typy";

// Punkt wejścia asystenta. Wyszukiwanie i generacja (RAG) powstają według
// ASYSTENT_AI_Energypedia.md, rozdz. 4; do czasu testu startowego asystent jest wyłączony.
export async function POST(req: Request) {
  let pytanie = "";
  try {
    const dane = (await req.json()) as { pytanie?: unknown };
    pytanie = typeof dane.pytanie === "string" ? dane.pytanie.trim() : "";
  } catch {
    return odpowiedz({ stan: "blad", komunikat: "Nie udało się odczytać pytania." }, 400);
  }
  if (!pytanie) return odpowiedz({ stan: "blad", komunikat: "Wpisz pytanie." }, 400);
  if (pytanie.length > MAKS_DLUGOSC_PYTANIA) return odpowiedz({ stan: "blad", komunikat: `Pytanie może mieć najwyżej ${MAKS_DLUGOSC_PYTANIA} znaków.` }, 400);

  if (!konfiguracja.asystentAktywny) {
    return odpowiedz({ stan: "niedostepny", komunikat: "Asystent ruszy razem z serwisem 16 listopada. Do tego czasu odpowiedzi znajdziesz w temacie miesiąca i poradnikach." }, 503);
  }
  return odpowiedz({ stan: "niedostepny", komunikat: "Asystent jest w trakcie testów. Spróbuj za chwilę." }, 503);
}

function odpowiedz(tresc: OdpowiedzAsystenta, status = 200) {
  return NextResponse.json(tresc, { status, headers: { "Cache-Control": "no-store" } });
}
