import Link from "next/link";
import { Logo } from "./Logo";

export function Stopka() {
  return (
    <footer className="stopka">
      <div className="kontener stopka__wnetrze">
        <div style={{ display: "flex", flexDirection: "column", gap: 6, maxWidth: 340 }}>
          <Logo wysokosc={28} animowany={false} />
          <span>Energia bez tajemnic. Rozumiesz, porównujesz, oszczędzasz.</span>
          <span>Redaktor naczelny: Mariusz Lach</span>
        </div>
        <nav aria-label="Zaufanie">
          <Link href="/jak-pracujemy">Jak pracujemy</Link>
          <Link href="/jak-zarabiamy">Jak zarabiamy</Link>
          <Link href="/sprostowania">Sprostowania</Link>
          <Link href="/redakcja">Redakcja i eksperci</Link>
          <a href="https://www.google.com/preferences/source?q=energypedia.pl" target="_blank" rel="noopener">Dodaj nas w Google</a>
        </nav>
        <nav aria-label="Dla partnerów">
          <Link href="/reklama">Reklama i media kit</Link>
          <Link href="/prasa">Dla prasy</Link>
        </nav>
        <nav aria-label="Informacje prawne">
          <Link href="/regulamin">Regulamin</Link>
          <Link href="/prywatnosc">Prywatność i cookies</Link>
          <Link href="/dostepnosc">Dostępność</Link>
        </nav>
      </div>
    </footer>
  );
}
