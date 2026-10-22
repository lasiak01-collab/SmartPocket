import Link from "next/link";

// Wersja podstawowa dolnego menu z makiety „Menu dolne”; panele wysuwane dojdą w kolejnym kroku.
export function DolneMenu() {
  return (
    <nav aria-label="Menu dolne" className="dolne-menu">
      <Link href="/" aria-current="page">
        <span className="dolne-menu__start" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 36 36"><rect width="9" height="36" rx="3" fill="#fff" /><rect width="36" height="9" rx="3" fill="#fff" /><rect x="13" y="13.5" width="20" height="9" rx="3" fill="#00C2A8" /><rect y="27" width="30" height="9" rx="3" fill="#fff" /></svg>
        </span>
        <span className="sr-only">Start</span>
      </Link>
      <a href="#pytanie"><Ikona d="M12 3a9 9 0 1 0 9 9M12 8v5M12 16.5v.5" />Zapytaj</a>
      <Link href="/dane"><Ikona d="M4 20V10M10 20V4M16 20v-7M22 20H2" />Dane</Link>
      <Link href="/wiadomosci"><Ikona d="M4 5h16M4 12h16M4 19h10" />Nowe</Link>
      <Link href="/mapa-serwisu"><Ikona d="M5 12h.01M12 12h.01M19 12h.01" />Więcej</Link>
    </nav>
  );
}

function Ikona({ d }: { d: string }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d={d} /></svg>;
}
