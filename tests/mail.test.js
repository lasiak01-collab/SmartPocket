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

test('treść e-maila: krótkie przywitanie i podpis kierowcy', () => {
  assert.equal(mailBody(fields, settings, 'plik.pdf'),
    'Dzień dobry,\n\nW załączeniu podsyłam rozliczenie za parking.\nPozdrawiam,\nKamil Gruszczyński');
});

test('nazwa pliku PDF bez polskich znaków', () => {
  assert.equal(pdfFileName({ ...fields, city: 'Łódź', location: 'Manufaktura – parking P2' }, settings),
    'Parkowanie_2026-09-11_Lodz_Manufaktura-parking-P2_D9CCC01.pdf');
});

test('forma płatności z końcówką karty tylko dla kart', () => {
  assert.equal(paymentLabel({ payment: 'Gotówka', cardLast4: '4111' }), 'Gotówka');
  assert.equal(paymentLabel({ payment: 'Karta prywatna', cardLast4: '9999' }), 'Karta prywatna (**** 9999)');
});
