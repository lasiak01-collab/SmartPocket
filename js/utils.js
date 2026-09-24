// Formatowanie, eksport CSV/JSON, pomocnicze funkcje UI.

export const STATUS = {
  processing: { label: 'Odczytywanie', cls: 'st-processing' },
  to_verify: { label: 'Do weryfikacji', cls: 'st-verify' },
  approved: { label: 'Zatwierdzony', cls: 'st-approved' },
  sent: { label: 'Przesłany', cls: 'st-sent' },
  error: { label: 'Błąd odczytu', cls: 'st-error' },
};

export const FIELD_LABELS = {
  date: 'Data',
  startTime: 'Godz. rozpoczęcia',
  endDate: 'Data zakończenia',
  endTime: 'Godz. zakończenia',
  durationMin: 'Czas postoju (min)',
  location: 'Miejsce / adres',
  city: 'Miasto',
  zone: 'Strefa / parkomat',
  operator: 'Operator / sprzedawca',
  nip: 'NIP sprzedawcy',
  plate: 'Nr rejestracyjny',
  amount: 'Kwota brutto',
  vat: 'Kwota VAT',
  vatRate: 'Stawka VAT %',
  currency: 'Waluta',
  payment: 'Forma płatności',
  receiptNo: 'Nr paragonu / biletu',
  purpose: 'Cel wyjazdu / projekt',
  notes: 'Uwagi',
};

export const esc = s => String(s ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

const moneyFmt = new Intl.NumberFormat('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const money = (v, cur = 'PLN') => v == null || v === '' ? '—' : `${moneyFmt.format(+v)} ${cur === 'PLN' ? 'zł' : cur}`;

export function fmtDate(iso, opts = { day: '2-digit', month: '2-digit', year: 'numeric' }) {
  if (!iso) return '—';
  const d = new Date(`${iso}T12:00:00`);
  return Number.isNaN(+d) ? iso : d.toLocaleDateString('pl-PL', opts);
}

export function fmtDuration(min) {
  if (min == null || min === '' || Number.isNaN(+min)) return '—';
  const h = Math.floor(min / 60), m = min % 60;
  if (!h) return `${m} min`;
  return m ? `${h} h ${m} min` : `${h} h`;
}

export const MONTHS = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];
export function monthLabel(ym) {
  if (!ym) return 'Bez daty';
  const [y, m] = ym.split('-');
  return `${MONTHS[+m - 1]} ${y}`;
}

export const receiptMonth = r => (r.fields?.date || r.createdAt || '').slice(0, 7);

export function timeRange(f) {
  if (!f.startTime && !f.endTime) return '';
  const end = f.endTime ? `${f.endDate && f.endDate !== f.date ? `${fmtDate(f.endDate, { day: '2-digit', month: '2-digit' })} ` : ''}${f.endTime}` : '…';
  return `${f.startTime || '…'}–${end}`;
}

export function sum(list, key = 'amount') {
  return Math.round(list.reduce((s, r) => s + (+r.fields?.[key] || 0), 0) * 100) / 100;
}

// ---------- CSV ----------
const CSV_COLS = [
  ['Lp.', (r, i) => i + 1],
  ['Data', r => r.fields.date],
  ['Godz. od', r => r.fields.startTime],
  ['Data do', r => r.fields.endDate || r.fields.date],
  ['Godz. do', r => r.fields.endTime],
  ['Czas postoju [min]', r => r.fields.durationMin],
  ['Miejsce', r => r.fields.location],
  ['Miasto', r => r.fields.city],
  ['Strefa/parkomat', r => r.fields.zone],
  ['Operator', r => r.fields.operator],
  ['NIP', r => r.fields.nip],
  ['Nr rejestracyjny', r => r.fields.plate],
  ['Nr dokumentu', r => r.fields.receiptNo],
  ['Kwota brutto', r => num(r.fields.amount)],
  ['VAT', r => num(r.fields.vat)],
  ['Stawka VAT', r => r.fields.vatRate],
  ['Waluta', r => r.fields.currency || 'PLN'],
  ['Płatność', r => r.fields.payment],
  ['Cel wyjazdu', r => r.fields.purpose],
  ['Uwagi', r => r.fields.notes],
  ['Status', r => STATUS[r.status]?.label],
  ['ID', r => r.id],
];
const num = v => (v == null || v === '' ? '' : String((+v).toFixed(2)).replace('.', ','));

export function toCSV(list) {
  const cell = v => {
    const s = String(v ?? '');
    return /[;"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const rows = [CSV_COLS.map(c => c[0]).join(';')];
  list.forEach((r, i) => rows.push(CSV_COLS.map(([, fn]) => cell(fn(r, i))).join(';')));
  // BOM, aby Excel poprawnie odczytał polskie znaki
  return `﻿${rows.join('\r\n')}`;
}

export function download(name, data, type = 'text/plain') {
  const blob = data instanceof Blob ? data : new Blob([data], { type });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
}

export function blobToDataURL(blob) {
  return new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = () => rej(fr.error);
    fr.readAsDataURL(blob);
  });
}

export async function dataURLToBlob(url) {
  return (await fetch(url)).blob();
}

export function debounce(fn, ms = 250) {
  let t;
  return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
}

export function findDuplicates(r, all) {
  const f = r.fields || {};
  if (!f.amount || !f.date) return [];
  return all.filter(o => o.id !== r.id && o.fields && +o.fields.amount === +f.amount && o.fields.date === f.date && (
    (f.receiptNo && o.fields.receiptNo === f.receiptNo) ||
    (f.startTime && o.fields.startTime === f.startTime) ||
    (!f.startTime && !f.receiptNo)
  ));
}
