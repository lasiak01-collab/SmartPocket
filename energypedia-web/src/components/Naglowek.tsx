import Link from "next/link";
import { Logo } from "./Logo";
import { PrzelacznikMotywu } from "./PrzelacznikMotywu";
import { dzisWarszawa, formatDniaTygodnia } from "@/lib/daty";

export function PasekDnia() {
  return (
    <div className="pasek-dnia">
      <div className="kontener pasek-dnia__wnetrze">
        <strong className="pasek-dnia__data">{formatDniaTygodnia(dzisWarszawa())}</strong>
        <a href="#temat" className="pasek-dnia__temat"><span className="na-zywo" aria-hidden="true" />Temat miesiąca: do kiedy wypowiedzieć umowę na prąd?</a>
        <Link href="/na-biezaco/taryfy-na-prad" className="pasek-dnia__drugi">Taryfy 2027: czekamy na decyzję URE</Link>
        <span className="pasek-dnia__odstep" />
        <Link href="/jak-pracujemy" className="pasek-dnia__drugi">Nowy serwis o energii · Jak pracujemy</Link>
      </div>
    </div>
  );
}

export function Naglowek() {
  return (
    <header className="naglowek">
      <div className="kontener naglowek__wnetrze">
        <Link href="/" aria-label="Energypedia.pl – strona główna"><Logo wysokosc={40} /></Link>
        <nav aria-label="Główna nawigacja" className="nawigacja">
          <Link href="/wiedza">Wiedza</Link>
          <Link href="/poradniki">Poradniki</Link>
          <Link href="/wiadomosci">Wiadomości</Link>
          <Link href="/dane">Dane</Link>
          <Link href="/sprzedawcy">Sprzedawcy</Link>
          <Link href="/regiony">Regiony</Link>
        </nav>
        <div className="naglowek__akcje">
          <PrzelacznikMotywu />
          <a href="#newsletter" className="przycisk przycisk--ciemny">Newsletter</a>
        </div>
      </div>
    </header>
  );
}
