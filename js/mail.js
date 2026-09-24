// Treść e-maila do działu rozliczeń i nazwy plików – moduł czysty (testowany w Node).

const pad = n => String(n).padStart(2, '0');

export function plDate(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${d}.${m}.${y}`;
}

export function plWeekday(iso) {
  if (!iso) return '';
  return new Date(`${iso}T12:00:00`).toLocaleDateString('pl-PL', { weekday: 'long' });
}

export function plMoney(v) {
  if (v == null || v === '' || Number.isNaN(+v)) return '';
  const [int, dec] = (+v).toFixed(2).split('.');
  return `${int.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')},${dec} zł`;
}

export function plDuration(min) {
  if (min == null || min === '' || Number.isNaN(+min)) return '';
  const h = Math.floor(min / 60), m = min % 60;
  return h ? (m ? `${h} h ${m} min` : `${h} h`) : `${m} min`;
}

export const placeLabel = f => [f.city, f.location].filter(Boolean).join(', ');

export function paymentLabel(f) {
  if (!f.payment) return '';
  return f.payment.startsWith('Karta') && f.cardLast4 ? `${f.payment} (**** ${f.cardLast4})` : f.payment;
}

export function hoursLabel(f) {
  if (!f.startTime && !f.endTime) return '';
  const end = f.endTime ? `${f.endDate && f.endDate !== f.date ? `${plDate(f.endDate)} ` : ''}${f.endTime}` : '…';
  return `${f.startTime || '…'}–${end}`;
}

/** Temat – zawsze ten sam schemat: imię i nazwisko | data | miasto, miejsce | nr rej. | forma płatności */
export function mailSubject(f, s) {
  return [s.employee, plDate(f.date), placeLabel(f), (f.plate || s.defaultPlate || '').toUpperCase(), f.payment]
    .map(v => String(v || '').trim() || '—')
    .join(' | ');
}

export function pdfFileName(f, s) {
  const slug = v => String(v || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ł/g, 'l').replace(/Ł/g, 'L')
    .replace(/[^A-Za-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return `Parkowanie_${f.date || 'bez-daty'}_${[slug(f.city), slug(f.location), slug(f.plate || s.defaultPlate)].filter(Boolean).join('_')}.pdf`;
}

export function mailBody(f, s, fileName) {
  const lines = [
    ['Kierowca', s.employee],
    ['Data parkowania', f.date ? `${plDate(f.date)} (${plWeekday(f.date)})${hoursLabel(f) ? `, godz. ${hoursLabel(f)}` : ''}` : ''],
    ['Czas postoju', plDuration(f.durationMin)],
    ['Miasto', f.city],
    ['Miejsce postoju', f.location],
    ['Strefa / parkomat', f.zone],
    ['Wystawca paragonu', [f.operator, f.nip ? `NIP ${f.nip}` : ''].filter(Boolean).join(', ')],
    ['Nr paragonu / biletu', f.receiptNo],
    ['Nr rejestracyjny pojazdu', (f.plate || s.defaultPlate || '').toUpperCase()],
    ['Kwota brutto', f.amount != null && f.amount !== '' ? `${plMoney(f.amount)}${f.vat ? ` (w tym VAT${f.vatRate ? ` ${f.vatRate}%` : ''}: ${plMoney(f.vat)})` : ''}` : ''],
    ['Forma płatności', paymentLabel(f)],
    ['Cel wyjazdu', f.purpose],
    ['Uwagi', f.notes],
  ].filter(([, v]) => v);
  const signature = [s.employee, [s.company, s.department].filter(Boolean).join(', ')].filter(Boolean);
  return [
    'Dzień dobry,',
    '',
    'przesyłam do rozliczenia paragon za parkowanie samochodu służbowego.',
    '',
    ...lines.map(([k, v]) => `${k}: ${v}`),
    '',
    `W załączniku plik PDF ze skanem paragonu i zestawieniem danych${fileName ? ` (${fileName})` : ''}.`,
    '',
    'Pozdrawiam',
    ...signature,
  ].join('\n');
}

export function docNumber(r) {
  const d = (r.fields?.date || r.createdAt || '').slice(0, 10).replace(/-/g, '');
  return `SP-${d}-${String(r.id || '').replace(/-/g, '').slice(0, 4).toUpperCase()}`;
}

export function nowPl(date = new Date()) {
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
