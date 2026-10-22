import { Asystent } from "./Asystent";
import { SlowoKinetyczne } from "./SlowoKinetyczne";

export function Hero() {
  return (
    <section aria-labelledby="h-hero" className="hero">
      <svg className="hero__plama" aria-hidden="true" width="620" height="520" viewBox="0 0 620 520" style={{ right: -140, top: -120 }}><path d="M412 38C520 70 608 168 590 282C572 398 452 486 330 498C206 510 86 448 44 344C2 240 60 112 166 60C250 18 330 14 412 38Z" /></svg>
      <svg className="hero__plama" aria-hidden="true" width="360" height="300" viewBox="0 0 360 300" style={{ left: -120, bottom: -150 }}><path d="M210 18C292 34 350 104 334 180C318 258 236 296 158 288C78 280 14 226 10 152C6 78 72 6 150 6C170 6 190 12 210 18Z" /></svg>
      <div className="hero__wnetrze">
        <span className="etykieta hero__nadtytul">Energia bez tajemnic</span>
        <h1 id="h-hero" className="display hero__h1">Zrozum <span className="sr-only">umowę na prąd, swój rachunek i taryfę</span><SlowoKinetyczne /><br />w minutę. Ze źródłami.</h1>
        <p className="hero__lead">Rachunki, umowy, taryfy, fotowoltaika i prawa odbiorcy – wyjaśnione prosto, sprawdzone przez redakcję.</p>
        <Asystent />
      </div>
    </section>
  );
}
