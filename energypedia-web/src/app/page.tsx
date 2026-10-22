import { Naglowek, PasekDnia } from "@/components/Naglowek";
import { Hero } from "@/components/Hero";
import { TematMiesiaca } from "@/components/TematMiesiaca";
import { BarometrIAkademia, Dzialy, EnergiaDzis, Najnowsze, PasDlaFirm, Redakcja, SlotReklamy, SprawdzSytuacje, Sprzedawcy, Trackery } from "@/components/Sekcje";
import { DlaCiebie } from "@/components/DlaCiebie";
import { Newsletter } from "@/components/Newsletter";
import { Stopka } from "@/components/Stopka";
import { DolneMenu } from "@/components/DolneMenu";

// Strona odświeżana co godzinę (data w pasku i licznik tematu miesiąca).
export const revalidate = 3600;

const daneStrukturalne = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "NewsMediaOrganization", "@id": "https://energypedia.pl/#organizacja", name: "Energypedia.pl", url: "https://energypedia.pl", logo: "https://energypedia.pl/icon-512.png" },
    { "@type": "WebSite", "@id": "https://energypedia.pl/#serwis", name: "Energypedia.pl", url: "https://energypedia.pl", inLanguage: "pl-PL", publisher: { "@id": "https://energypedia.pl/#organizacja" } },
  ],
};

export default function StronaGlowna() {
  return (
    <>
      <a href="#tresc" className="przejdz">Przejdź do treści</a>
      <PasekDnia />
      <Naglowek />
      <Hero />
      <main id="tresc" className="tresc">
        <EnergiaDzis />
        <TematMiesiaca />
        <Najnowsze />
        <SprawdzSytuacje />
        <SlotReklamy id="EP_HP_BILLBOARD" rozmiar="970×250" tytul="Weź udział w pierwszym Barometrze Odbiorców Energii" wariant="billboard" />
        <Dzialy />
        <Trackery />
        <DlaCiebie />
        <Sprzedawcy />
        <BarometrIAkademia />
        <Redakcja />
        <Newsletter />
        <PasDlaFirm />
      </main>
      <Stopka />
      <DolneMenu />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(daneStrukturalne) }} />
    </>
  );
}
