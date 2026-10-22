"use client";
import { useEffect, useState } from "react";

const SLOWA = ["umowę na prąd", "swój rachunek", "taryfę", "zmianę sprzedawcy"];

// Słowo zmienia się co 2,4 s; przy ograniczonym ruchu zostaje pierwsze.
export function SlowoKinetyczne() {
  const [i, ustaw] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => ustaw((x) => (x + 1) % SLOWA.length), 2400);
    return () => clearInterval(t);
  }, []);
  return <span key={i} className="hero__slowo" aria-hidden="true">{SLOWA[i]}</span>;
}
