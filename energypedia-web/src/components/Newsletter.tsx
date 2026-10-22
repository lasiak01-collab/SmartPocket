"use client";
import { useState, type FormEvent } from "react";

export function Newsletter() {
  const [komunikat, ustawKomunikat] = useState("Możesz wypisać się w każdej chwili.");
  async function wyslij(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    const r = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) }).catch(() => null);
    const dane = r ? ((await r.json()) as { komunikat: string }) : { komunikat: "Brak połączenia. Spróbuj ponownie." };
    ustawKomunikat(dane.komunikat);
  }
  return (
    <section id="newsletter" aria-labelledby="h-nl" className="newsletter">
      <div className="newsletter__tekst">
        <h2 id="h-nl" className="display" style={{ margin: 0, fontWeight: 650, fontSize: 28 }}>Energia w 5 minut</h2>
        <p>Codziennie o 7:30. Jedna zmiana na rynku, jedno wyjaśnienie, jedna rzecz do zrobienia.</p>
        <a href="https://www.google.com/preferences/source?q=energypedia.pl" target="_blank" rel="noopener" style={{ fontSize: 14, textDecoration: "underline" }}>Dodaj Energypedię do preferowanych źródeł w Google</a>
      </div>
      <form onSubmit={wyslij}>
        <div className="newsletter__pole">
          <label htmlFor="nl-email">Adres e-mail</label>
          <input id="nl-email" name="email" type="email" required autoComplete="email" placeholder="np. jan@firma.pl" />
        </div>
        <button type="submit" className="przycisk przycisk--glowny" style={{ borderRadius: 10 }}>Zapisz mnie</button>
        <span className="newsletter__komunikat" aria-live="polite">{komunikat} <a href="/prywatnosc" style={{ textDecoration: "underline" }}>Polityka prywatności</a></span>
      </form>
    </section>
  );
}
