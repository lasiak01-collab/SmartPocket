import { NextResponse } from "next/server";

// Zapis do newslettera: podłączenie narzędzia wysyłkowego i rejestru zgód (PLAN_MVP, zadanie 5.4).
// Do tego czasu nie zapisujemy adresów, żeby nie przetwarzać danych bez gotowej polityki prywatności.
export async function POST(req: Request) {
  const { email } = (await req.json().catch(() => ({}))) as { email?: unknown };
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ komunikat: "Podaj poprawny adres e-mail." }, { status: 400 });
  }
  return NextResponse.json({ komunikat: "Zapisy ruszą razem z serwisem. Adresu nie zapisaliśmy." }, { status: 503 });
}
