// Generowanie PDF dla działu rozliczeń (pdf-lib + czcionka Inter) oraz obsługa PDF-ów wejściowych (pdf.js).
import {
  plDate, plWeekday, plMoney, plDuration, hoursLabel, docNumber, nowPl, mailSubject,
} from './mail.js';

const PDFLIB_URL = 'https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js';
const FONTKIT_URL = 'https://cdn.jsdelivr.net/npm/@pdf-lib/fontkit@1.1.1/dist/fontkit.umd.min.js';
const PDFJS_URL = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.min.mjs';
const PDFJS_WORKER_URL = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs';

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = () => reject(new Error('Nie udało się pobrać biblioteki PDF (sprawdź połączenie z internetem).'));
    document.head.appendChild(s);
  });
}

let libsPromise;
function loadLibs() {
  libsPromise ||= (async () => {
    await loadScript(PDFLIB_URL);
    await loadScript(FONTKIT_URL);
    const font = async name => new Uint8Array(await (await fetch(new URL(`../fonts/${name}`, import.meta.url))).arrayBuffer());
    const [regular, semibold, bold] = await Promise.all([font('Inter-Regular.ttf'), font('Inter-SemiBold.ttf'), font('Inter-Bold.ttf')]);
    return { PDFLib: window.PDFLib, fontkit: window.fontkit, fonts: { regular, semibold, bold } };
  })().catch(e => { libsPromise = null; throw e; });
  return libsPromise;
}

const hex = (PDFLib, h) => {
  const n = parseInt(h.slice(1), 16);
  return PDFLib.rgb(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
};

const PAY_STYLE = {
  'Karta służbowa': { fill: '#0F5C4D', text: '#FFFFFF', border: '#0F5C4D' },
  'Karta prywatna': { fill: '#FFF1D6', text: '#7A4A00', border: '#E9B458' },
  Gotówka: { fill: '#EEF2F0', text: '#16201D', border: '#C9D3CF' },
};

/**
 * Buduje jednostronicowy PDF A4: po lewej skan paragonu, po prawej informacja dla działu rozliczeń.
 * @returns {Promise<Uint8Array>}
 */
export async function buildSettlementPdf(receipt, imageBlob, settings) {
  const { PDFLib, fontkit, fonts } = await loadLibs();
  const f = receipt.fields || {};
  const doc = await PDFLib.PDFDocument.create();
  doc.registerFontkit(fontkit);
  const R = await doc.embedFont(fonts.regular, { subset: true });
  const S = await doc.embedFont(fonts.semibold, { subset: true });
  const B = await doc.embedFont(fonts.bold, { subset: true });
  const c = h => hex(PDFLib, h);
  const C = {
    ink: c('#16201D'), muted: c('#5F6E69'), faint: c('#8A9893'), line: c('#E1E7E4'), brand: c('#0F5C4D'),
    brandSoft: c('#E8F3EF'), accent: c('#F0B44C'), paper: c('#F5F7F6'), white: c('#FFFFFF'), eu: c('#1F4AA8'),
  };

  const W = 595.28, H = 841.89, M = 34;
  const page = doc.addPage([W, H]);
  const text = (t, x, y, { font = R, size = 10, color = C.ink, spacing = 0 } = {}) => {
    const str = String(t ?? '');
    if (spacing) page.pushOperators(PDFLib.setCharacterSpacing(spacing));
    page.drawText(str, { x, y, size, font, color });
    if (spacing) page.pushOperators(PDFLib.setCharacterSpacing(0));
  };
  const width = (t, font, size, spacing = 0) => font.widthOfTextAtSize(String(t), size) + spacing * Math.max(0, [...String(t)].length - 1);
  const wrap = (t, font, size, maxW, spacing = 0) => {
    const out = [];
    for (const para of String(t ?? '').split('\n')) {
      let line = '';
      for (const word of para.split(/\s+/)) {
        const next = line ? `${line} ${word}` : word;
        if (width(next, font, size, spacing) <= maxW || !line) line = next;
        else { out.push(line); line = word; }
      }
      out.push(line);
    }
    return out;
  };
  const roundRect = (x, y, w, h, r, opts) => page.drawSvgPath(
    `M ${r} 0 H ${w - r} Q ${w} 0 ${w} ${r} V ${h - r} Q ${w} ${h} ${w - r} ${h} H ${r} Q 0 ${h} 0 ${h - r} V ${r} Q 0 0 ${r} 0 Z`,
    { x, y: y + h, ...opts },
  );

  // ---------- Nagłówek ----------
  const HH = 84;
  page.drawRectangle({ x: 0, y: H - HH, width: W, height: HH, color: C.brand });
  page.drawRectangle({ x: 0, y: H - HH - 3, width: W, height: 3, color: C.accent });
  text('SMART POCKET', M, H - 30, { font: S, size: 7.5, color: c('#A9D8CB'), spacing: 1.6 });
  text('Rozliczenie kosztu parkowania', M, H - 54, { font: B, size: 18, color: C.white });
  text(['Samochód służbowy', settings.company, settings.department].filter(Boolean).join('  ·  '), M, H - 70, { font: R, size: 9.5, color: c('#CDE9E1') });
  const metaX = W - M - 150;
  const meta = [['NR DOKUMENTU', docNumber(receipt)], ['DATA WYSTAWIENIA', nowPl()]];
  meta.forEach(([k, v], i) => {
    const y = H - 30 - i * 25;
    text(k, metaX, y, { font: S, size: 6.5, color: c('#A9D8CB'), spacing: 0.8 });
    text(v, metaX, y - 11, { font: S, size: 9.5, color: C.white });
  });

  // ---------- Stopka ----------
  const FY = M + 6;
  page.drawLine({ start: { x: M, y: FY + 14 }, end: { x: W - M, y: FY + 14 }, thickness: 0.6, color: C.line });
  text(`Wygenerowano w Smart Pocket · ${nowPl()} · ${docNumber(receipt)}`, M, FY, { size: 7, color: C.faint });
  const pg = 'Strona 1 z 1';
  text(pg, W - M - width(pg, R, 7), FY, { size: 7, color: C.faint });

  // ---------- Lewa kolumna: skan ----------
  const top = H - HH - 3 - 22;
  const LW = 238;
  text('SKAN PARAGONU', M, top - 8, { font: S, size: 7, color: C.muted, spacing: 1.1 });
  const boxTop = top - 18, boxBottom = FY + 26;
  const maxBoxH = boxTop - boxBottom;
  const pad = 10;
  if (imageBlob) {
    const bytes = new Uint8Array(await imageBlob.arrayBuffer());
    const img = /png/.test(imageBlob.type) ? await doc.embedPng(bytes) : await doc.embedJpg(bytes);
    const scale = Math.min((LW - pad * 2) / img.width, (maxBoxH - pad * 2) / img.height);
    const iw = img.width * scale, ih = img.height * scale;
    const boxH = ih + pad * 2;
    roundRect(M, boxTop - boxH, LW, boxH, 8, { color: C.paper, borderColor: C.line, borderWidth: 0.8 });
    const ix = M + (LW - iw) / 2, iy = boxTop - pad - ih;
    page.drawRectangle({ x: ix - 0.5, y: iy - 0.5, width: iw + 1, height: ih + 1, color: C.white, borderColor: c('#D5DDD9'), borderWidth: 0.5 });
    page.drawImage(img, { x: ix, y: iy, width: iw, height: ih });
  }

  // ---------- Prawa kolumna: informacja dla działu rozliczeń ----------
  const RX = M + LW + 22, RW = W - M - RX;
  let y = top - 8;
  text('INFORMACJA DLA DZIAŁU ROZLICZEŃ', RX, y, { font: B, size: 7, color: C.brand, spacing: 1.1 });
  y -= 14;

  // Karta z kwotą i formą płatności
  const cardH = f.vat ? 96 : 82;
  roundRect(RX, y - cardH, RW, cardH, 10, { color: C.brandSoft });
  text('KWOTA BRUTTO', RX + 16, y - 22, { font: S, size: 7, color: C.muted, spacing: 1 });
  const amount = plMoney(f.amount) || '—';
  text(amount, RX + 16, y - 54, { font: B, size: 30, color: C.ink });
  if (f.vat) text(`w tym VAT${f.vatRate ? ` ${f.vatRate}%` : ''}: ${plMoney(f.vat)}`, RX + 16, y - 74, { size: 8.5, color: C.muted });
  if (f.payment) {
    const st = PAY_STYLE[f.payment] || PAY_STYLE['Gotówka'];
    const label = f.payment.toUpperCase();
    const pw = width(label, B, 7.5, 0.6) + 22;
    roundRect(RX + RW - 16 - pw, y - 32, pw, 20, 10, { color: c(st.fill), borderColor: c(st.border), borderWidth: 0.8 });
    text(label, RX + RW - 16 - pw + 11, y - 25, { font: B, size: 7.5, color: c(st.text), spacing: 0.6 });
    if (f.cardLast4 && f.payment.startsWith('Karta')) {
      const cl = `karta **** ${f.cardLast4}`;
      text(cl, RX + RW - 16 - width(cl, R, 8), y - 46, { size: 8, color: C.muted });
    }
  }
  y -= cardH + 8;

  // Wiersze danych
  const rows = [
    { label: 'Kierowca', value: settings.employee },
    {
      label: 'Data parkowania',
      value: f.date ? `${plDate(f.date)}, ${plWeekday(f.date)}` : '',
      sub: [hoursLabel(f) ? `godz. ${hoursLabel(f)}` : '', f.durationMin ? `czas postoju: ${plDuration(f.durationMin)}` : ''].filter(Boolean),
    },
    { label: 'Miasto', value: f.city },
    { label: 'Miejsce postoju', value: f.location, sub: f.zone },
    { label: 'Wystawca paragonu', value: f.operator, sub: f.nip ? `NIP ${f.nip}` : '' },
    { label: 'Nr rejestracyjny pojazdu', plate: (f.plate || settings.defaultPlate || '').toUpperCase() },
    { label: 'Forma płatności', value: f.payment ? `${f.payment}${f.cardLast4 && f.payment.startsWith('Karta') ? `  ·  **** ${f.cardLast4}` : ''}` : '' },
    { label: 'Nr paragonu / biletu', value: f.receiptNo },
    f.purpose && { label: 'Cel wyjazdu', value: f.purpose },
    f.notes && { label: 'Uwagi', value: f.notes },
  ].filter(Boolean);

  const labelW = 100;
  const valW = RW - labelW - 4;
  for (const row of rows) {
    const vLines = row.plate ? [] : wrap(row.value || '—', S, 10.5, valW).slice(0, 3);
    const subs = [].concat(row.sub || []).filter(Boolean);
    const sLines = subs.flatMap(t => wrap(t, R, 8, valW)).slice(0, 3);
    const lLines = wrap(row.label.toUpperCase(), S, 6.5, labelW - 10, 0.7);
    const h = Math.max(row.plate ? 34 : 12 + vLines.length * 13.5 + sLines.length * 10.5 + 6, 12 + lLines.length * 9 + 8);
    const ry = y - 13;
    lLines.forEach((l, i) => text(l, RX, ry - i * 9, { font: S, size: 6.5, color: C.muted, spacing: 0.7 }));
    if (row.plate) {
      // Tablica rejestracyjna
      const pt = row.plate || '—';
      const pw = width(pt, B, 12, 1.2) + 30;
      roundRect(RX + labelW, ry - 16, pw, 24, 3, { color: C.white, borderColor: C.ink, borderWidth: 1 });
      page.drawRectangle({ x: RX + labelW + 1, y: ry - 15, width: 12, height: 22, color: C.eu });
      text('PL', RX + labelW + 2.6, ry - 11, { font: B, size: 6, color: C.white });
      text(pt, RX + labelW + 20, ry - 8.5, { font: B, size: 12, color: C.ink, spacing: 1.2 });
    } else {
      vLines.forEach((l, i) => text(l, RX + labelW, ry - i * 13.5, { font: S, size: 10.5, color: row.value ? C.ink : C.faint }));
      sLines.forEach((l, i) => text(l, RX + labelW, ry - vLines.length * 13.5 - 1 - i * 10.5, { size: 8, color: C.muted }));
    }
    y -= h;
    page.drawLine({ start: { x: RX, y }, end: { x: RX + RW, y }, thickness: 0.5, color: C.line });
  }

  // Potwierdzenie weryfikacji
  const approved = [...(receipt.history || [])].reverse().find(h => /Zatwierdzono/.test(h.action));
  if (approved && y > boxBottom + 40) {
    y -= 22;
    page.drawCircle({ x: RX + 6, y: y + 3, size: 6, color: C.brand });
    page.drawSvgPath('M -3 0 L -1 2.4 L 3.2 -2.2', { x: RX + 6, y: y + 3, borderColor: C.white, borderWidth: 1.3 });
    const d = new Date(approved.at);
    wrap(`Dane z paragonu zweryfikowane i zatwierdzone przez kierowcę ${nowPl(d)}.`, R, 7.5, RW - 18)
      .forEach((l, i) => text(l, RX + 18, y - i * 10, { size: 7.5, color: C.muted }));
  }

  doc.setTitle(mailSubject(f, settings));
  doc.setAuthor(settings.employee || 'Smart Pocket');
  doc.setSubject('Rozliczenie kosztu parkowania samochodu służbowego');
  doc.setCreator('Smart Pocket');
  doc.setProducer('Smart Pocket');
  doc.setLanguage('pl-PL');
  return doc.save();
}

// ---------- pdf.js: import PDF (skanów) i podgląd ----------
let pdfjsPromise;
async function pdfjs() {
  pdfjsPromise ||= import(PDFJS_URL).then(m => { m.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL; return m; })
    .catch(e => { pdfjsPromise = null; throw e; });
  return pdfjsPromise;
}

/** Renderuje pierwszą stronę PDF do canvasa (maks. `maxSide` px). */
export async function renderPdfPage(bytes, maxSide = 2200) {
  const lib = await pdfjs();
  const pdf = await lib.getDocument({ data: new Uint8Array(bytes).slice() }).promise;
  const pg = await pdf.getPage(1);
  const base = pg.getViewport({ scale: 1 });
  const viewport = pg.getViewport({ scale: maxSide / Math.max(base.width, base.height) });
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(viewport.width);
  canvas.height = Math.round(viewport.height);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  await pg.render({ canvasContext: ctx, viewport }).promise;
  pdf.destroy();
  return canvas;
}

/** Plik PDF (np. skan z drukarki) -> obraz JPEG pierwszej strony. */
export async function pdfFileToImage(file) {
  const canvas = await renderPdfPage(await file.arrayBuffer(), 2400);
  const blob = await new Promise(r => canvas.toBlob(r, 'image/jpeg', 0.9));
  return new File([blob], file.name.replace(/\.pdf$/i, '.jpg'), { type: 'image/jpeg' });
}
