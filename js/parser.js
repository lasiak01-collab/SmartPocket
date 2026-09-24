// Parser tekstu OCR paragonów / biletów parkingowych (PL).
// Moduł czysty (bez DOM) – używany w przeglądarce i w testach Node.

export const FIELDS = [
  'date', 'startTime', 'endDate', 'endTime', 'durationMin',
  'location', 'city', 'zone', 'operator', 'nip', 'plate',
  'amount', 'vat', 'vatRate', 'currency', 'payment', 'receiptNo',
];

const PL_CITIES = [
  'Warszawa', 'Kraków', 'Łódź', 'Wrocław', 'Poznań', 'Gdańsk', 'Szczecin', 'Bydgoszcz',
  'Lublin', 'Białystok', 'Katowice', 'Gdynia', 'Częstochowa', 'Radom', 'Toruń', 'Sosnowiec',
  'Rzeszów', 'Kielce', 'Gliwice', 'Olsztyn', 'Zabrze', 'Bielsko-Biała', 'Bytom', 'Zielona Góra',
  'Rybnik', 'Ruda Śląska', 'Opole', 'Tychy', 'Gorzów Wielkopolski', 'Elbląg', 'Płock',
  'Dąbrowa Górnicza', 'Wałbrzych', 'Włocławek', 'Tarnów', 'Chorzów', 'Koszalin', 'Kalisz',
  'Legnica', 'Grudziądz', 'Słupsk', 'Jaworzno', 'Jastrzębie-Zdrój', 'Nowy Sącz', 'Jelenia Góra',
  'Siedlce', 'Mysłowice', 'Konin', 'Piła', 'Piotrków Trybunalski', 'Inowrocław', 'Lubin',
  'Ostrów Wielkopolski', 'Suwałki', 'Gniezno', 'Stargard', 'Głogów', 'Siemianowice Śląskie',
  'Pabianice', 'Leszno', 'Zamość', 'Łomża', 'Pruszków', 'Ełk', 'Tomaszów Mazowiecki',
  'Chełm', 'Mielec', 'Przemyśl', 'Stalowa Wola', 'Kędzierzyn-Koźle', 'Tczew', 'Biała Podlaska',
  'Sopot', 'Zakopane', 'Piaseczno', 'Otwock', 'Legionowo', 'Wieliczka', 'Oświęcim',
];

const KNOWN_OPERATORS = [
  [/apcoa/i, 'APCOA Parking Polska'],
  [/interparking/i, 'Interparking Polska'],
  [/q[\s-]?park/i, 'Q-Park Polska'],
  [/indigo/i, 'Indigo Polska'],
  [/skycash/i, 'SkyCash'],
  [/mobi\s?parking/i, 'mobiParking'],
  [/mo\s?bilet/i, 'moBILET'],
  [/an[yi]park/i, 'AnyPark'],
  [/e-?parking|epark/i, 'ePARKING'],
  [/park\s*&\s*ride|p\+r/i, 'Park & Ride'],
  [/lotnisk|airport/i, 'Parking lotniskowy'],
  [/pkp\s*(s\.?a\.?|intercity|pl)/i, 'PKP'],
  [/zarz[aą]d\s+dr[oó]g\s+miejskich|\bzdm\b/i, 'Zarząd Dróg Miejskich'],
  [/zarz[aą]d\s+transportu\s+miejskiego|\bztm\b/i, 'Zarząd Transportu Miejskiego'],
  [/miejski\s+zarz[aą]d\s+dr[oó]g|\bmzd\b/i, 'Miejski Zarząd Dróg'],
  [/strefa\s+p[lł]atnego\s+parkowania|\bspp\b|\bspps\b/i, 'Strefa Płatnego Parkowania'],
];

const START_KW = /(wjazd|pocz[aą]tek|rozpocz|start|od\s*godz|od\s*:|\bod\b|zakup|wydano|wydruk|data\s+wej|entry|\bin\b\s*:|przyjazd)/i;
const END_KW = /(wyjazd|koniec|zako[nń]cz|wa[zż]n[yea]\s*do|wa[zż]no[sś][cć]|termin|\bdo\s*godz|\bdo\s*:|\bdo\b|exit|\bout\b\s*:|opuszcz)/i;

const TOTAL_KW = [
  [/suma\s*(pln|z[lł])?\s*[:\-]?\s*\d/i, 10],
  [/\bsuma\b(?!.*ptu)/i, 9],
  [/do\s*zap[lł]aty/i, 9],
  [/razem/i, 8],
  [/zap[lł]acono|zap[lł]ata|nale[zż]no[sś][cć]/i, 7],
  [/(op[lł]ata|koszt)\s*(parkingowa|za\s*post[oó]j|postojowa)?/i, 7],
  [/kwota|brutto|total|cena/i, 5],
  [/karta|p[lł]atno[sś][cć]/i, 3],
];

const AMOUNT_RE = /(?<![\d,.])(\d{1,5}(?:[  ]\d{3})*)\s?[,.]\s?(\d{2})(?![\d%])/g;

export function normalizeText(raw) {
  return String(raw || '')
    .replace(/\r/g, '')
    .replace(/[‐‑‒–—]/g, '-')
    .replace(/[“”„]/g, '"')
    .replace(/\t/g, ' ')
    .split('\n')
    .map(l => l.replace(/ {2,}/g, ' ').trim())
    .filter(Boolean)
    .join('\n');
}

// Poprawki typowych pomyłek OCR w obrębie tokenów liczbowych (O→0, l/I→1, S→5, B→8).
function fixDigits(s) {
  return s.replace(/[0-9OoIlSB][0-9OoIlSB:.,\/-]*[0-9OoIlSB]/g, tok =>
    /\d/.test(tok) ? tok.replace(/[Oo]/g, '0').replace(/[Il]/g, '1').replace(/S/g, '5').replace(/B/g, '8') : tok);
}

function pad(n) { return String(n).padStart(2, '0'); }

function validDate(y, m, d) {
  if (y < 2000 || y > 2100 || m < 1 || m > 12 || d < 1) return false;
  return d <= new Date(y, m, 0).getDate();
}

export function findDates(line) {
  const out = [];
  const l = fixDigits(line);
  let m;
  const dmy = /(?<!\d)(\d{1,2})\s?[.\-\/]\s?(\d{1,2})\s?[.\-\/]\s?(\d{4}|\d{2})(?!\d)/g;
  while ((m = dmy.exec(l))) {
    let y = +m[3]; if (y < 100) y += 2000;
    if (validDate(y, +m[2], +m[1])) out.push({ iso: `${y}-${pad(m[2])}-${pad(m[1])}`, index: m.index, len: m[0].length });
  }
  const ymd = /(?<!\d)(\d{4})\s?[.\-\/]\s?(\d{1,2})\s?[.\-\/]\s?(\d{1,2})(?!\d)/g;
  while ((m = ymd.exec(l))) {
    if (validDate(+m[1], +m[2], +m[3])) out.push({ iso: `${m[1]}-${pad(m[2])}-${pad(m[3])}`, index: m.index, len: m[0].length });
  }
  // Nazwy miesięcy: "12 marca 2025"
  const months = ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'pa[zź]', 'lis', 'gru'];
  const named = new RegExp(`(?<!\\d)(\\d{1,2})\\s+(${months.join('|')})[a-ząćęłńóśźż]*\\.?\\s+(\\d{4})`, 'gi');
  while ((m = named.exec(l))) {
    const mi = months.findIndex(p => new RegExp(`^${p}`, 'i').test(m[2])) + 1;
    if (validDate(+m[3], mi, +m[1])) out.push({ iso: `${m[3]}-${pad(mi)}-${pad(m[1])}`, index: m.index, len: m[0].length });
  }
  return out.sort((a, b) => a.index - b.index);
}

export function findTimes(line, { allowDot = false } = {}) {
  const l = fixDigits(line);
  // Maskujemy daty, by "12.03.2025" nie było odczytane jako godzina.
  let masked = l;
  for (const d of findDates(l)) masked = masked.slice(0, d.index) + '#'.repeat(d.len) + masked.slice(d.index + d.len);
  const re = allowDot
    ? /(?<![\d,.])([01]?\d|2[0-3])\s?[:.]\s?([0-5]\d)(?:\s?[:.]\s?([0-5]\d))?(?![\d,]|\.\d)/g
    : /(?<![\d,.])([01]?\d|2[0-3])\s?:\s?([0-5]\d)(?:\s?:\s?([0-5]\d))?(?!\d)/g;
  const out = [];
  let m;
  while ((m = re.exec(masked))) out.push({ hm: `${pad(m[1])}:${m[2]}`, index: m.index });
  return out;
}

export function parseAmount(str) {
  if (str == null || str === '') return null;
  const s = String(str).replace(/[^\d,.\-]/g, '').replace(/\s/g, '');
  if (!s) return null;
  const norm = s.includes(',') ? s.replace(/\./g, '').replace(',', '.') : s;
  const v = parseFloat(norm);
  return Number.isFinite(v) ? Math.round(v * 100) / 100 : null;
}

function amountsIn(line) {
  const out = [];
  const l = fixDigits(line);
  let m;
  AMOUNT_RE.lastIndex = 0;
  while ((m = AMOUNT_RE.exec(l))) {
    const v = parseFloat(`${m[1].replace(/[  ]/g, '')}.${m[2]}`);
    if (Number.isFinite(v) && v > 0 && v < 100000) out.push(v);
  }
  return out;
}

export function validNip(nip) {
  const d = String(nip).replace(/\D/g, '');
  if (d.length !== 10) return false;
  const w = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  const sum = w.reduce((s, wi, i) => s + wi * +d[i], 0);
  return sum % 11 === +d[9];
}

export function formatNip(nip) {
  const d = String(nip || '').replace(/\D/g, '');
  return d.length === 10 ? `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6, 8)}-${d.slice(8)}` : nip || '';
}

export function normalizePlate(p) {
  return String(p || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
}

const PLATE_RE = /\b([BCDEFGKLNOPRSTWZ][A-Z]{1,2})[ \-]?([0-9][0-9A-Z]{3,4}|[A-Z][0-9][0-9A-Z]{2,3}|[0-9A-Z]{2}[0-9][0-9A-Z]{1,2})\b/g;

// Rodzaj zdarzenia wg słowa kluczowego występującego najwcześniej w linii.
function eventKind(line) {
  const s = line.search(START_KW);
  const e = line.search(END_KW);
  if (s < 0 && e < 0) return null;
  if (e < 0) return 'start';
  if (s < 0) return 'end';
  return s <= e ? 'start' : 'end';
}

export function diffMinutes(date, start, endDate, end) {
  if (!start || !end) return null;
  const d1 = date || '2000-01-01';
  const d2 = endDate || d1;
  const t1 = Date.parse(`${d1}T${start}:00Z`);
  let t2 = Date.parse(`${d2}T${end}:00Z`);
  if (!Number.isFinite(t1) || !Number.isFinite(t2)) return null;
  if (t2 < t1 && !endDate) t2 += 86400000; // przez północ
  const m = Math.round((t2 - t1) / 60000);
  return m >= 0 ? m : null;
}

export function addMinutes(date, hm, minutes) {
  const t = Date.parse(`${date || '2000-01-01'}T${hm}:00Z`) + minutes * 60000;
  const d = new Date(t);
  return { date: d.toISOString().slice(0, 10), time: d.toISOString().slice(11, 16) };
}

function parseDuration(text) {
  const re = /(czas\s*(postoju|parkowania|pobytu|op[lł]acony)?|post[oó]j|okres)\s*[:\-]?\s*(?:(\d{1,3})\s*(?:h|godz\.?|godzin[ay]?)\s*)?(?:(\d{1,3})\s*(?:min\.?|minut[ay]?|m)\b)?/i;
  for (const line of text.split('\n')) {
    const m = re.exec(line);
    if (m && (m[3] || m[4])) return (+(m[3] || 0)) * 60 + (+(m[4] || 0));
    const hm = /(czas\s*(postoju|parkowania|pobytu)|post[oó]j)\s*[:\-]?\s*(\d{1,2}):(\d{2})/i.exec(line);
    if (hm) return +hm[3] * 60 + +hm[4];
  }
  return null;
}

/**
 * Główna funkcja: tekst OCR -> ustrukturyzowane pola + poziomy pewności.
 * @returns {{fields: object, confidence: object}}
 */
export function parseReceipt(rawText, opts = {}) {
  const text = normalizeText(rawText);
  const lines = text.split('\n');
  const f = {};
  const c = {};
  const set = (k, v, conf) => { if (v !== null && v !== undefined && v !== '') { f[k] = v; c[k] = conf; } };

  // ---- Daty i godziny ----
  const events = []; // {date, time, kind, line}
  let firstDate = null;
  lines.forEach((line, i) => {
    const dates = findDates(line);
    const hasKw = START_KW.test(line) || END_KW.test(line);
    const times = findTimes(line, { allowDot: hasKw || dates.length > 0 });
    if (dates.length && !firstDate) firstDate = dates[0].iso;
    const prev = lines[i - 1] || '';
    const ctxLine = START_KW.test(line) || END_KW.test(line) ? line
      : (findTimes(prev).length || findDates(prev).length) ? line : `${prev} ${line}`;
    const kind = eventKind(ctxLine);
    if (times.length >= 2 && START_KW.test(ctxLine) && END_KW.test(ctxLine)) {
      // "od 10:15 do 12:30" w jednej linii
      events.push({ date: dates[0]?.iso, time: times[0].hm, kind: 'start', line: i });
      events.push({ date: dates[1]?.iso || dates[0]?.iso, time: times[1].hm, kind: 'end', line: i });
      return;
    }
    times.forEach((t, ti) => {
      const nearestDate = dates.length ? (dates[ti] || dates[dates.length - 1]).iso : null;
      events.push({ date: nearestDate, time: t.hm, kind, line: i });
    });
    if (!times.length && dates.length && kind) {
      events.push({ date: dates[0].iso, time: null, kind, line: i });
    }
  });

  const startEv = events.find(e => e.kind === 'start' && e.time);
  const endEv = [...events].reverse().find(e => e.kind === 'end' && e.time);
  const timed = events.filter(e => e.time);

  let date = startEv?.date || firstDate || timed[0]?.date || null;
  set('date', date, startEv?.date || firstDate ? 'high' : 'missing');
  if (startEv) set('startTime', startEv.time, 'high');
  if (endEv && endEv !== startEv) {
    set('endTime', endEv.time, 'high');
    if (endEv.date && endEv.date !== date) set('endDate', endEv.date, 'high');
  }
  if (!f.startTime && timed.length) {
    const cand = timed.filter(e => e !== endEv);
    if (cand.length) set('startTime', cand[0].time, 'low');
  }
  if (!f.endTime && timed.length >= 2) {
    const last = timed[timed.length - 1];
    if (last.time !== f.startTime) {
      set('endTime', last.time, 'low');
      if (last.date && last.date !== date) set('endDate', last.date, 'low');
    }
  }
  if (!f.date) {
    const endDateEv = events.find(e => e.date);
    if (endDateEv) set('date', endDateEv.date, 'low');
  }

  const dur = parseDuration(text);
  if (f.startTime && f.endTime) {
    set('durationMin', diffMinutes(f.date, f.startTime, f.endDate, f.endTime), 'high');
  } else if (dur != null) {
    set('durationMin', dur, 'high');
    if (f.startTime && !f.endTime) {
      const e = addMinutes(f.date, f.startTime, dur);
      set('endTime', e.time, 'low');
      if (f.date && e.date !== f.date) set('endDate', e.date, 'low');
    }
  }

  // ---- Kwoty ----
  let best = null;
  lines.forEach((line, i) => {
    if (/ptu|vat|reszta|wydano|rabat|sprzeda[zż]\s*opodatk/i.test(line) && !/suma\s*(pln|z[lł])?\s*\d/i.test(line.replace(/ptu.*/i, ''))) return;
    for (const [re, score] of TOTAL_KW) {
      if (re.test(line)) {
        let vals = amountsIn(line);
        if (!vals.length && lines[i + 1] && !/ptu|vat/i.test(lines[i + 1])) vals = amountsIn(lines[i + 1]);
        if (vals.length) {
          const v = vals[vals.length - 1];
          if (!best || score > best.score) best = { v, score };
        }
        break;
      }
    }
  });
  if (best) set('amount', best.v, best.score >= 7 ? 'high' : 'low');
  else {
    const all = lines.filter(l => !/nip|ptu|vat|reszta|tel|nr/i.test(l)).flatMap(amountsIn);
    if (all.length) set('amount', Math.max(...all), 'low');
  }

  // VAT
  for (const line of lines) {
    if (/(suma|kwota|razem)\s*ptu|ptu\s*(razem|suma)|kwota\s*vat|vat\s*razem|podatek\s*vat/i.test(line)) {
      const v = amountsIn(line); if (v.length) { set('vat', v[v.length - 1], 'high'); break; }
    }
  }
  for (const line of lines) {
    const r = /(ptu|vat|stawka)[^%\n]{0,12}?(\d{1,2})\s?%/i.exec(line) || /\b(A|B)\s*=?\s*(23|8|5)\s?%/.exec(line);
    if (r) {
      set('vatRate', +r[2], 'high');
      if (!f.vat) { const v = amountsIn(line.slice(r.index + r[0].length)); if (v.length) set('vat', v[v.length - 1], 'low'); }
      break;
    }
  }
  if (f.amount && f.vatRate && !f.vat) {
    set('vat', Math.round((f.amount * f.vatRate / (100 + f.vatRate)) * 100) / 100, 'low');
  }

  set('currency', /\beur\b|€/i.test(text) ? 'EUR' : 'PLN', /\bpln\b|z[lł]\b/i.test(text) ? 'high' : 'low');

  // ---- NIP ----
  const nipKw = /nip\s*(pl)?\s*[:.]?\s*((?:[\dOoIl][ \-]?){10})/i;
  for (const line of lines) {
    const m = nipKw.exec(fixDigits(line));
    if (m && validNip(m[2])) { set('nip', formatNip(m[2]), 'high'); break; }
    if (m) { set('nip', formatNip(m[2]), 'low'); }
  }
  if (!f.nip) {
    const m = /(?<!\d)(\d{3}-?\d{3}-?\d{2}-?\d{2}|\d{3}-?\d{2}-?\d{2}-?\d{3})(?!\d)/.exec(fixDigits(text));
    if (m && validNip(m[1])) set('nip', formatNip(m[1]), 'low');
  }

  // ---- Numer rejestracyjny ----
  const defPlate = normalizePlate(opts.defaultPlate);
  const plateKw = /(nr\.?\s*rej|rejestr|tablic|pojazd|samoch|plate|\bauto\b)/i;
  for (const line of lines) {
    if (!plateKw.test(line)) continue;
    const up = line.toUpperCase().replace(/^.*?(REJ[A-Z.]*|TABLIC[A-Z]*|POJAZD[A-Z]*|SAMOCH[A-Z]*|PLATE|AUTO)\s*[:.]?\s*/, '');
    PLATE_RE.lastIndex = 0;
    const m = PLATE_RE.exec(up);
    if (m) { set('plate', `${m[1]} ${m[2]}`, 'high'); break; }
  }
  if (!f.plate && defPlate && normalizePlate(text).includes(defPlate)) set('plate', opts.defaultPlate.toUpperCase(), 'high');
  if (!f.plate && defPlate) set('plate', opts.defaultPlate.toUpperCase(), 'default');

  // ---- Numer paragonu / biletu ----
  const rn = /(nr\s*(paragonu|biletu|transakcji|wydruku|dokumentu|potwierdzenia|kwitu)|paragon\s*(fiskalny)?\s*nr|bilet\s*(nr|numer)|numer\s*(biletu|paragonu|transakcji)|transakcja\s*nr|id\s*transakcji)\s*[:#.]?\s*([A-Z0-9][A-Z0-9\/\-]{2,})/i;
  const rm = rn.exec(text);
  if (rm) set('receiptNo', rm[6], 'high');
  else {
    const m2 = /(?:^|\s)#\s?(\d{3,})|\bnr\s*[:.]?\s*(\d{3,}[\/\-]?\d*)/i.exec(text);
    if (m2) set('receiptNo', m2[1] || m2[2], 'low');
  }

  // ---- Operator / sprzedawca ----
  for (const [re, name] of KNOWN_OPERATORS) {
    if (re.test(text)) { set('operator', name, 'high'); break; }
  }
  const headerLines = lines.slice(0, 6).filter(l =>
    /[a-ząćęłńóśźż]{3,}/i.test(l) &&
    !/paragon|fiskaln|nip|^ul\.|^al\.|\d{2}-\d{3}|tel|www|bilet|potwierdzenie|niefiskaln|parkomat|kasa/i.test(l));
  const company = headerLines.find(l => /(sp\.?\s*z\s*o\.?\s*o|s\.?\s*a\.?$|spółka|gmina|miasto|urz[aą]d|zarz[aą]d|parking|park)/i.test(l)) || headerLines[0];
  if (!f.operator && company) set('operator', company.replace(/\s+/g, ' ').slice(0, 80), 'low');
  else if (f.operator && company && !new RegExp(f.operator.split(' ')[0], 'i').test(company) && /sp\.?\s*z|s\.a/i.test(company)) {
    set('operator', company.slice(0, 80), 'high');
  }

  // ---- Lokalizacja ----
  const addrRe = /\b(ul\.?|ulica|al\.?|aleja|aleje|pl\.?|plac|os\.?|osiedle|rondo|skwer|bulw\.?)\s+[A-ZĄĆĘŁŃÓŚŹŻ0-9][^,\n]{1,50}/i;
  const addrLines = lines.map(l => addrRe.exec(l)).filter(Boolean).map(m => m[0].trim());
  const parkLine = lines.find(l => /(parking|lokalizacja|miejsce\s*post|adres|punkt\s*sprzeda)/i.test(l) && /[a-z]{4,}/i.test(l.replace(/(parking|lokalizacja|adres)/i, '')));
  // Preferuj adres, który nie jest adresem siedziby spółki (zwykle w nagłówku) – bierzemy ostatni.
  if (addrLines.length) set('location', addrLines[addrLines.length - 1].replace(/\s+/g, ' '), addrLines.length === 1 ? 'high' : 'low');
  else if (parkLine) set('location', parkLine.replace(/^(lokalizacja|miejsce\s*postoju|adres)\s*[:\-]?\s*/i, '').slice(0, 80), 'low');

  const postal = [...text.matchAll(/(?<![\d-])\d{2}-\d{3}(?!-)[ \t]+([A-ZĄĆĘŁŃÓŚŹŻ][A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ\- ]{2,30})/g)];
  if (postal.length) set('city', postal[postal.length - 1][1].trim().replace(/\s+\S*\d.*$/, ''), 'high');
  else {
    const low = text.toLowerCase();
    const city = PL_CITIES.find(ct => low.includes(ct.toLowerCase()));
    if (city) set('city', city, 'low');
  }
  if (f.city) f.city = f.city.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ').replace(/-(\p{L})/gu, (_, ch) => `-${ch.toUpperCase()}`);

  const zm = /(podstrefa|strefa|sektor|poziom|parkomat|parkometr)\s*(nr|numer)?\s*[:.\-]?\s*([A-Z]{1,2}\d{0,3}|\d{1,6})(?=[\s,;]|$)/im.exec(text);
  if (zm) set('zone', `${zm[1].charAt(0).toUpperCase()}${zm[1].slice(1).toLowerCase()} ${zm[3]}`, 'high');

  // ---- Płatność ----
  if (/blik/i.test(text)) set('payment', 'BLIK', 'high');
  else if (/skycash|mobi\s?parking|mo\s?bilet|aplikacj|an[yi]park|mpay|epark/i.test(text)) set('payment', 'Aplikacja mobilna', 'high');
  else if (/kart[aąyęe]|visa|master\s?card|maestro|zbli[zż]eni|contactless|debit|credit/i.test(text)) set('payment', 'Karta', 'high');
  else if (/got[oó]wk|reszta|monet/i.test(text)) set('payment', 'Gotówka', 'high');

  for (const k of FIELDS) if (!(k in c)) c[k] = 'missing';
  return { fields: f, confidence: c };
}
