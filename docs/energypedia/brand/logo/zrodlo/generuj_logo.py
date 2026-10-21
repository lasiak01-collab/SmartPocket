"""Generator plików produkcyjnych logo Energypedia.pl (sygnet „E z danych” + logotyp Manrope ExtraBold w krzywych).

Użycie:
    python3 generuj_logo.py <manrope-800.woff2> <inter-500.woff2> <katalog_wyjściowy> [<inter-500-latin-ext.woff2>]

Wymaga: fonttools, brotli, uharfbuzz, cairosvg, pillow.
Logotyp jest zamieniany na krzywe, więc pliki wynikowe nie zależą od zainstalowanych fontów.
"""
import io
import os
import sys

import cairosvg
import uharfbuzz as hb
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.ttLib import TTFont
from PIL import Image

NAVY = "#0B1B33"
VOLT = "#00C2A8"
VOLT_INK = "#00796B"
MUTED = "#42526B"
WHITE = "#FFFFFF"
ON_NAVY_MUTED = "#C9D4E3"
BLACK = "#000000"

# Sygnet w siatce 36×36 (przycięty z projektu 48×48: wszystkie współrzędne −6).
SIGNET_PARTS = [
    ("spine", 0, 0, 9, 36, "ink"),
    ("top", 0, 0, 36, 9, "ink"),
    ("mid", 13, 13.5, 20, 9, "accent"),
    ("bot", 0, 27, 30, 9, "ink"),
]
RX = 3
# Wersja uproszczona do 16–32 px (grubsze słupki, większe przerwy).
FAVICON_PARTS = [
    ("spine", 0, 0, 12, 40, "ink"),
    ("top", 0, 0, 40, 12, "ink"),
    ("mid", 16, 14, 22, 12, "accent"),
    ("bot", 0, 28, 34, 12, "ink"),
]

ANIM_CSS = """
.ep-e rect{transform-box:fill-box}
.ep-e .spine{transform-origin:center bottom;animation:epGrowY .5s cubic-bezier(.2,.8,.2,1) both}
.ep-e .top{transform-origin:left center;animation:epGrowX .5s cubic-bezier(.2,.8,.2,1) .15s both}
.ep-e .mid{transform-origin:left center;animation:epGrowX .5s cubic-bezier(.2,.8,.2,1) .3s both,epRead 6s ease-in-out 1.4s infinite}
.ep-e .bot{transform-origin:left center;animation:epGrowX .5s cubic-bezier(.2,.8,.2,1) .45s both}
@keyframes epGrowY{from{transform:scaleY(0)}to{transform:scaleY(1)}}
@keyframes epGrowX{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes epRead{0%{transform:scaleX(1)}30%{transform:scaleX(1.12)}55%{transform:scaleX(.92)}80%{transform:scaleX(1.05)}100%{transform:scaleX(1)}}
@media (prefers-reduced-motion:reduce){.ep-e rect{animation:none!important}}
""".strip()


def load_font(path):
    f = TTFont(path)
    f.flavor = None
    buf = io.BytesIO()
    f.save(buf)
    return f, buf.getvalue()


class Shaper:
    def __init__(self, path, tracking_em=0.0):
        self.tt, data = load_font(path)
        self.upm = self.tt["head"].unitsPerEm
        self.hbfont = hb.Font(hb.Face(hb.Blob(data)))
        self.glyphset = self.tt.getGlyphSet()
        self.order = self.tt.getGlyphOrder()
        self.tracking = tracking_em * self.upm

    def has(self, ch):
        return ord(ch) in self.tt.getBestCmap()

    def outline(self, text, size, x0, baseline):
        """Ścieżka SVG tekstu w pikselach; zwraca (d, szerokość, bbox).
        Znaki, których brak w foncie (np. ą, ę w podzbiorze łacińskim), bierze z self.fallback."""
        fb = getattr(self, "fallback", None)
        if fb is not None and any(not self.has(ch) for ch in text):
            runs, cur, cur_main = [], "", None
            for ch in text:
                main = self.has(ch) or not fb.has(ch)
                if cur and main != cur_main:
                    runs.append((cur, cur_main)); cur = ""
                cur += ch; cur_main = main
            runs.append((cur, cur_main))
            ds, x, bounds = [], x0, None
            for chunk, main in runs:
                d, w, b = (self._outline(chunk, size, x, baseline) if main else fb._outline(chunk, size, x, baseline))
                ds.append(d); x += w
                if b:
                    bounds = b if bounds is None else (min(bounds[0], b[0]), min(bounds[1], b[1]), max(bounds[2], b[2]), max(bounds[3], b[3]))
            return " ".join(ds), x - x0, bounds
        return self._outline(text, size, x0, baseline)

    def _outline(self, text, size, x0, baseline):
        buf = hb.Buffer()
        buf.add_str(text)
        buf.guess_segment_properties()
        hb.shape(self.hbfont, buf, {"kern": True, "liga": True})
        s = size / self.upm
        pen = SVGPathPen(self.glyphset)
        bpen = BoundsPen(self.glyphset)
        x = 0.0
        n = len(buf.glyph_infos)
        for i, (info, pos) in enumerate(zip(buf.glyph_infos, buf.glyph_positions)):
            name = self.order[info.codepoint]
            t = (s, 0, 0, -s, x0 + (x + pos.x_offset) * s, baseline - pos.y_offset * s)
            self.glyphset[name].draw(TransformPen(pen, t))
            self.glyphset[name].draw(TransformPen(bpen, t))
            x += pos.x_advance + (self.tracking if i < n - 1 else 0)
        return pen.getCommands(), x * s, bpen.bounds

    def ascender_of(self, ch, size):
        gname = self.tt.getBestCmap()[ord(ch)]
        b = BoundsPen(self.glyphset)
        self.glyphset[gname].draw(b)
        return b.bounds[3] * size / self.upm


def signet_rects(x, y, scale, colors, parts=SIGNET_PARTS, cls=False):
    out = []
    for name, rx_, ry, w, h, role in parts:
        c = attrs = ""
        if cls:
            attrs = f' class="{name}"'
        out.append(
            f'<rect{attrs} x="{x + rx_ * scale:.2f}" y="{y + ry * scale:.2f}" width="{w * scale:.2f}" height="{h * scale:.2f}" rx="{RX * scale:.2f}" fill="{colors[role]}"/>'
        )
    return "".join(out)


def svg_doc(w, h, body, title, bg=None, style=None):
    bgrect = f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg else ""
    st = f"<style>{style}</style>" if style else ""
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{w:.0f}" height="{h:.0f}" viewBox="0 0 {w:.2f} {h:.2f}" role="img" aria-label="{title}">'
        f"<title>{title}</title>{st}{bgrect}{body}</svg>\n"
    )


def main():
    manrope, inter, out = sys.argv[1], sys.argv[2], sys.argv[3]
    inter_ext = sys.argv[4] if len(sys.argv) > 4 else None
    os.makedirs(out, exist_ok=True)
    for d in ("svg", "png", "pdf", "web", "animacja"):
        os.makedirs(os.path.join(out, d), exist_ok=True)
    wm = Shaper(manrope, tracking_em=-0.045)
    tag = Shaper(inter, tracking_em=0.0)
    if inter_ext:
        tag.fallback = Shaper(inter_ext, tracking_em=0.0)

    schemes = {
        "kolor": {"ink": NAVY, "accent": VOLT, "w1": NAVY, "w2": VOLT_INK, "w3": MUTED, "bg": None},
        "negatyw": {"ink": WHITE, "accent": VOLT, "w1": WHITE, "w2": VOLT, "w3": ON_NAVY_MUTED, "bg": None},
        "czarne": {"ink": BLACK, "accent": BLACK, "w1": BLACK, "w2": BLACK, "w3": BLACK, "bg": None},
        "biale": {"ink": WHITE, "accent": WHITE, "w1": WHITE, "w2": WHITE, "w3": WHITE, "bg": None},
    }

    # --- geometria logo poziomego (jednostki = px przy sygnecie 72 px) ---
    S = 72.0                      # wysokość sygnetu
    scale = S / 36.0
    FS = S * 0.8 * 48 / 36        # stopień pisma jak w zatwierdzonym projekcie (80 px przy sygnecie 100 px w siatce 48)
    GAP = S * 0.24 * 48 / 36
    asc = wm.ascender_of("d", FS)
    baseline = S / 2 + asc / 2 - FS * 0.02   # środek optyczny: między wierzchołkiem „d” a linią bazową
    pad = 9 * scale                           # pole ochronne = wysokość środkowego słupka

    def horizontal(sch, with_tld=True, animated=False):
        c = schemes[sch]
        x0 = pad + S + GAP
        d1, w1, b1 = wm.outline("energy", FS, x0, pad + baseline)
        d2, w2, b2 = wm.outline("pedia", FS, x0 + w1 + wm.tracking * FS / wm.upm, pad + baseline)
        width = x0 + w1 + w2 + wm.tracking * FS / wm.upm
        parts = [f'<path d="{d1}" fill="{c["w1"]}"/>', f'<path d="{d2}" fill="{c["w2"]}"/>']
        if with_tld:
            d3, w3, _ = wm.outline(".pl", FS, width + wm.tracking * FS / wm.upm, pad + baseline)
            parts.append(f'<path d="{d3}" fill="{c["w3"]}"/>')
            width += w3 + wm.tracking * FS / wm.upm
        bottom = max(pad + S, b1[3], b2[3])
        total_h = max(pad * 2 + S, bottom + pad)
        sig = f'<g class="ep-e">{signet_rects(pad, pad, scale, c, cls=animated)}</g>'
        return width + pad, total_h, sig + "".join(parts)

    def vertical(sch):
        c = schemes[sch]
        fs = FS * 0.62
        d, w, b = wm.outline("energypedia", fs, 0, 0)
        width = max(w, S) + 2 * pad
        sx = (width - S) / 2
        base = pad + S + GAP * 0.9 + wm.ascender_of("d", fs)
        d1, w1, _ = wm.outline("energy", fs, (width - w) / 2, base)
        d2, _, b2 = wm.outline("pedia", fs, (width - w) / 2 + w1 + wm.tracking * fs / wm.upm, base)
        h = b2[3] + pad
        body = signet_rects(sx, pad, scale, c) + f'<path d="{d1}" fill="{c["w1"]}"/><path d="{d2}" fill="{c["w2"]}"/>'
        return width, h, body

    files = []
    for sch in schemes:
        w, h, body = horizontal(sch)
        files.append((f"svg/energypedia-logo-poziome-{sch}.svg", svg_doc(w, h, body, "Energypedia.pl")))
        w, h, body = horizontal(sch, with_tld=False)
        files.append((f"svg/energypedia-logo-poziome-bez-domeny-{sch}.svg", svg_doc(w, h, body, "Energypedia")))
        w, h, body = vertical(sch)
        files.append((f"svg/energypedia-logo-pionowe-{sch}.svg", svg_doc(w, h, body, "Energypedia")))
        files.append((f"svg/energypedia-sygnet-{sch}.svg", svg_doc(36, 36, signet_rects(0, 0, 1, schemes[sch]), "Energypedia – sygnet")))
    # wersje z tłem (do podglądu i prostego użycia)
    w, h, body = horizontal("negatyw")
    files.append(("svg/energypedia-logo-poziome-na-granacie.svg", svg_doc(w, h, body, "Energypedia.pl", bg=NAVY)))
    # ikony
    icon_body = f'<rect width="48" height="48" rx="12" fill="{NAVY}"/>' + signet_rects(7.5, 7.5, 33 / 36, schemes["negatyw"])
    files.append(("svg/energypedia-ikona-aplikacji.svg", svg_doc(48, 48, icon_body, "Energypedia – ikona")))
    maskable = f'<rect width="48" height="48" fill="{NAVY}"/>' + signet_rects(13.5, 13.5, 21 / 36, schemes["negatyw"])
    files.append(("svg/energypedia-ikona-maskable.svg", svg_doc(48, 48, maskable, "Energypedia – ikona")))
    fav = f'<rect width="48" height="48" rx="10" fill="{NAVY}"/>' + signet_rects(6, 4, 1, {"ink": WHITE, "accent": VOLT}, parts=FAVICON_PARTS)
    files.append(("web/favicon.svg", svg_doc(48, 48, fav, "Energypedia")))
    # animacje (A: wejście, C: pętla „odczyt na żywo”)
    w, h, body = horizontal("kolor", animated=True)
    files.append(("animacja/energypedia-logo-animowane.svg", svg_doc(w, h, body, "Energypedia.pl", style=ANIM_CSS)))
    w2, h2, body2 = horizontal("negatyw", animated=True)
    files.append(("animacja/energypedia-logo-animowane-negatyw.svg", svg_doc(w2, h2, body2, "Energypedia.pl", style=ANIM_CSS)))
    files.append(("animacja/energypedia-sygnet-animowany.svg", svg_doc(36, 36, '<g class="ep-e">' + signet_rects(0, 0, 1, schemes["kolor"], cls=True) + "</g>", "Energypedia – sygnet", style=ANIM_CSS)))
    # obraz do udostępnień (Open Graph) 1200×630
    lw, lh, lbody = horizontal("negatyw")
    k = 860 / lw
    td, tw, _ = tag.outline("Energia bez tajemnic. Rozumiesz, porównujesz, oszczędzasz.", 30, 0, 0)
    og = (f'<rect width="1200" height="630" fill="{NAVY}"/><g transform="translate({(1200 - lw * k) / 2:.1f} {250 - lh * k / 2:.1f}) scale({k:.4f})">{lbody}</g>'
          f'<g transform="translate({(1200 - tw) / 2:.1f} 470)"><path d="{td}" fill="{ON_NAVY_MUTED}"/></g>')
    files.append(("svg/energypedia-og-image.svg", svg_doc(1200, 630, og, "Energypedia.pl – Energia bez tajemnic")))

    for rel, text in files:
        with open(os.path.join(out, rel), "w", encoding="utf-8") as f:
            f.write(text)

    def png(src, dst, width=None, height=None):
        cairosvg.svg2png(url=os.path.join(out, src), write_to=os.path.join(out, dst), output_width=width, output_height=height)

    for sch in ("kolor", "negatyw", "czarne", "biale"):
        for wpx in (600, 1200, 2400):
            png(f"svg/energypedia-logo-poziome-{sch}.svg", f"png/energypedia-logo-poziome-{sch}-{wpx}px.png", width=wpx)
        png(f"svg/energypedia-logo-pionowe-{sch}.svg", f"png/energypedia-logo-pionowe-{sch}-800px.png", width=800)
        for s in (512, 1024):
            png(f"svg/energypedia-sygnet-{sch}.svg", f"png/energypedia-sygnet-{sch}-{s}px.png", width=s)
    png("svg/energypedia-logo-poziome-na-granacie.svg", "png/energypedia-logo-poziome-na-granacie-1200px.png", width=1200)
    png("svg/energypedia-og-image.svg", "web/og-image-1200x630.png", width=1200)
    png("svg/energypedia-ikona-aplikacji.svg", "web/apple-touch-icon.png", width=180)
    png("svg/energypedia-ikona-aplikacji.svg", "web/icon-192.png", width=192)
    png("svg/energypedia-ikona-aplikacji.svg", "web/icon-512.png", width=512)
    png("svg/energypedia-ikona-maskable.svg", "web/icon-maskable-512.png", width=512)
    for s in (16, 32, 48):
        png("web/favicon.svg", f"web/favicon-{s}.png", width=s)
    imgs = [Image.open(os.path.join(out, f"web/favicon-{s}.png")).convert("RGBA") for s in (16, 32, 48)]
    imgs[2].save(os.path.join(out, "web/favicon.ico"), sizes=[(16, 16), (32, 32), (48, 48)], append_images=imgs[:2])

    for name in ("poziome-kolor", "poziome-czarne", "pionowe-kolor", "poziome-na-granacie"):
        cairosvg.svg2pdf(url=os.path.join(out, f"svg/energypedia-logo-{name}.svg"), write_to=os.path.join(out, f"pdf/energypedia-logo-{name}.pdf"))
    cairosvg.svg2pdf(url=os.path.join(out, "svg/energypedia-sygnet-kolor.svg"), write_to=os.path.join(out, "pdf/energypedia-sygnet-kolor.pdf"))

    with open(os.path.join(out, "animacja/logo-animacja.css"), "w", encoding="utf-8") as f:
        f.write("/* Animacja sygnetu Energypedia: A (wejście, raz) + C (odczyt na żywo, pętla). Klasy: .ep-e na <g> lub <svg>, prostokąty .spine .top .mid .bot */\n" + ANIM_CSS + "\n")
    print(len(files), "plików SVG zapisanych")


if __name__ == "__main__":
    main()
