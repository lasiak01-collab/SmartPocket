import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  parseReceipt, findDates, findTimes, parseAmount, validNip, diffMinutes, normalizePlate,
} from '../js/parser.js';

const PARKOMAT = `
ZARZĄD DRÓG MIEJSKICH
ul. Chmielna 120
00-801 Warszawa
NIP 525-15-75-083
STREFA PŁATNEGO PARKOWANIA
Parkomat nr 1234
Podstrefa A
Nr rej.: WX 12345
Data: 12.03.2025
Wjazd: 10:15
Ważny do: 12:45
Czas postoju: 2 h 30 min
Opłata: 11,70 zł
Płatność kartą
Nr biletu: 000123456
`;

const APCOA = `
APCOA Parking Polska Sp. z o.o.
ul. Grzybowska 5a, 00-132 Warszawa
NIP 5213019341
PARAGON FISKALNY
Parking Galeria Krakowska
ul. Pawia 5
31-154 Kraków
Wjazd 2025-06-02 08:03:11
Wyjazd 2025-06-02 17:48:02
Postój 9h 45min
Parking 1 szt x 45,00 45,00 A
SPRZEDAŻ OPODATK. A 45,00
PTU A 23% 8,41
SUMA PTU 8,41
SUMA PLN 45,00
Karta VISA 45,00
Nr paragonu: 4711/2025
`;

const OVERNIGHT = `
Q-PARK POLSKA
Parking Lotnisko Chopina
Wjazd: 30/09/2025 22:10
Wyjazd: 01/10/2025 06:40
DO ZAPŁATY: 64,00 PLN
Gotówka 100,00
Reszta 36,00
`;

test('findDates obsługuje różne formaty', () => {
  assert.deepEqual(findDates('Data 12.03.2025').map(d => d.iso), ['2025-03-12']);
  assert.deepEqual(findDates('2025-06-02 08:03').map(d => d.iso), ['2025-06-02']);
  assert.deepEqual(findDates('01/10/25').map(d => d.iso), ['2025-10-01']);
  assert.deepEqual(findDates('5 marca 2025').map(d => d.iso), ['2025-03-05']);
  assert.deepEqual(findDates('31.02.2025'), []);
});

test('findTimes nie myli daty z godziną', () => {
  assert.deepEqual(findTimes('12.03.2025 10:15').map(t => t.hm), ['10:15']);
  assert.deepEqual(findTimes('Wjazd 08:03:11').map(t => t.hm), ['08:03']);
  assert.deepEqual(findTimes('Kwota 12.50').map(t => t.hm), []);
});

test('parseAmount i NIP', () => {
  assert.equal(parseAmount('1 234,56 zł'), 1234.56);
  assert.equal(parseAmount('12.5'), 12.5);
  assert.equal(validNip('5251575083'), true);
  assert.equal(validNip('5251575084'), false);
  assert.equal(normalizePlate('wx 123-45'), 'WX12345');
});

test('diffMinutes przez północ', () => {
  assert.equal(diffMinutes('2025-09-30', '22:10', '2025-10-01', '06:40'), 510);
  assert.equal(diffMinutes('2025-09-30', '23:00', null, '01:00'), 120);
});

test('bilet z parkomatu SPP', () => {
  const { fields: f, confidence: c } = parseReceipt(PARKOMAT);
  assert.equal(f.date, '2025-03-12');
  assert.equal(f.startTime, '10:15');
  assert.equal(f.endTime, '12:45');
  assert.equal(f.durationMin, 150);
  assert.equal(f.amount, 11.7);
  assert.equal(c.amount, 'high');
  assert.equal(f.nip, '525-157-50-83');
  assert.equal(f.plate, 'WX 12345');
  assert.equal(f.city, 'Warszawa');
  assert.equal(f.location, 'ul. Chmielna 120');
  assert.equal(f.operator, 'Zarząd Dróg Miejskich');
  assert.equal(f.payment, 'Karta');
  assert.equal(f.receiptNo, '000123456');
  assert.match(f.zone, /Parkomat 1234|Podstrefa A/);
});

test('paragon fiskalny APCOA', () => {
  const { fields: f } = parseReceipt(APCOA);
  assert.equal(f.date, '2025-06-02');
  assert.equal(f.startTime, '08:03');
  assert.equal(f.endTime, '17:48');
  assert.equal(f.durationMin, 585);
  assert.equal(f.amount, 45);
  assert.equal(f.vat, 8.41);
  assert.equal(f.vatRate, 23);
  assert.equal(f.nip, '521-301-93-41');
  assert.equal(f.city, 'Kraków');
  assert.equal(f.location, 'ul. Pawia 5');
  assert.equal(f.receiptNo, '4711/2025');
  assert.equal(f.payment, 'Karta');
  assert.match(f.operator, /APCOA/);
});

test('postój przez noc, reszta nie jest kwotą', () => {
  const { fields: f } = parseReceipt(OVERNIGHT);
  assert.equal(f.date, '2025-09-30');
  assert.equal(f.endDate, '2025-10-01');
  assert.equal(f.startTime, '22:10');
  assert.equal(f.endTime, '06:40');
  assert.equal(f.durationMin, 510);
  assert.equal(f.amount, 64);
  assert.equal(f.payment, 'Gotówka');
  assert.equal(f.operator, 'Q-Park Polska');
});

test('domyślny numer rejestracyjny z ustawień', () => {
  const { fields: f, confidence: c } = parseReceipt('Parking\nSuma 5,00', { defaultPlate: 'po 1abc2' });
  assert.equal(f.plate, 'PO 1ABC2');
  assert.equal(c.plate, 'default');
  assert.equal(f.amount, 5);
});

test('pomyłki OCR w cyfrach (O zamiast 0)', () => {
  const { fields: f } = parseReceipt('Data: 1O.O4.2025\nOd 9:OO do 11:3O\nSUMA 7,5O');
  assert.equal(f.date, '2025-04-10');
  assert.equal(f.startTime, '09:00');
  assert.equal(f.endTime, '11:30');
  assert.equal(f.amount, 7.5);
});
