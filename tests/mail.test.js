import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mailSubject, mailBody, pdfFileName, paymentLabel } from '../js/mail.js';

const settings = { employee: 'Kamil Gruszczyński', defaultPlate: 'D9CCC01', company: 'ACME S.A.' };
const fields = {
  date: '2026-09-11', startTime: '07:50', endTime: '18:09', durationMin: 619,
  city: 'Warszawa', location: 'Westfield Arkadia', operator: 'GSSM Warsaw Sp. z o.o.', nip: '527-263-58-96',
  receiptNo: '430011391', plate: 'D9CCC01', amount: 54, vat: 10.1, vatRate: 23,
  payment: 'Karta służbowa', cardLast4: '4111',
};

test('temat e-maila ma stały schemat', () => {
  assert.equal(mailSubject(fields, settings),
    'Kamil Gruszczyński | 11.09.2026 | Warszawa, Westfield Arkadia | D9CCC01 | Karta służbowa');
});

test('treść e-maila zawiera przywitanie i wszystkie dane', () => {
  const body = mailBody(fields, settings, 'plik.pdf');
  assert.match(body, /^Dzień dobry,/);
  for (const s of ['Kierowca: Kamil Gruszczyński', 'Data parkowania: 11.09.2026 (piątek), godz. 07:50–18:09',
    'Czas postoju: 10 h 19 min', 'Miasto: Warszawa', 'Miejsce postoju: Westfield Arkadia',
    'Wystawca paragonu: GSSM Warsaw Sp. z o.o., NIP 527-263-58-96', 'Nr paragonu / biletu: 430011391',
    'Nr rejestracyjny pojazdu: D9CCC01', 'Kwota brutto: 54,00 zł (w tym VAT 23%: 10,10 zł)',
    'Forma płatności: Karta służbowa (**** 4111)', '(plik.pdf)']) {
    assert.ok(body.includes(s), `brak: ${s}`);
  }
});

test('nazwa pliku PDF bez polskich znaków', () => {
  assert.equal(pdfFileName({ ...fields, city: 'Łódź', location: 'Manufaktura – parking P2' }, settings),
    'Parkowanie_2026-09-11_Lodz_Manufaktura-parking-P2_D9CCC01.pdf');
});

test('forma płatności z końcówką karty tylko dla kart', () => {
  assert.equal(paymentLabel({ payment: 'Gotówka', cardLast4: '4111' }), 'Gotówka');
  assert.equal(paymentLabel({ payment: 'Karta prywatna', cardLast4: '9999' }), 'Karta prywatna (**** 9999)');
});
