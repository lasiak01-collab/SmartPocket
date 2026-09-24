// Obróbka zdjęć i silniki OCR: lokalny (Tesseract.js, j. polski) oraz AI (Claude, wizja).
import { parseReceipt, FIELDS } from './parser.js';

const TESSERACT_URL = 'https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js';
const ANTHROPIC_SDK_URL = 'https://cdn.jsdelivr.net/npm/@anthropic-ai/sdk/+esm';

// ---------- Obraz ----------

export async function loadBitmap(blob) {
  try {
    return await createImageBitmap(blob, { imageOrientation: 'from-image' });
  } catch {
    const url = URL.createObjectURL(blob);
    try {
      const img = new Image();
      img.src = url;
      await img.decode();
      return img;
    } finally { URL.revokeObjectURL(url); }
  }
}

function canvasFor(bmp, maxSide, rotate = 0) {
  const w0 = bmp.width, h0 = bmp.height;
  const scale = Math.min(1, maxSide / Math.max(w0, h0));
  const w = Math.round(w0 * scale), h = Math.round(h0 * scale);
  const swap = rotate % 180 !== 0;
  const cv = document.createElement('canvas');
  cv.width = swap ? h : w;
  cv.height = swap ? w : h;
  const ctx = cv.getContext('2d');
  ctx.translate(cv.width / 2, cv.height / 2);
  ctx.rotate((rotate * Math.PI) / 180);
  ctx.drawImage(bmp, -w / 2, -h / 2, w, h);
  return cv;
}

const toBlob = (cv, type = 'image/jpeg', q = 0.85) => new Promise(r => cv.toBlob(r, type, q));

/** Normalizuje wgrany plik: maks. 2200 px, JPEG, miniatura. */
export async function prepareImage(file, rotate = 0) {
  const bmp = await loadBitmap(file);
  const main = canvasFor(bmp, 2200, rotate);
  const thumb = canvasFor(bmp, 320, rotate);
  return {
    blob: await toBlob(main, 'image/jpeg', 0.86),
    thumb: thumb.toDataURL('image/jpeg', 0.7),
    width: main.width,
    height: main.height,
  };
}

/** Wstępna obróbka pod OCR: skala szarości + rozciągnięcie kontrastu + powiększenie małych zdjęć. */
async function preprocessForOcr(blob) {
  const bmp = await loadBitmap(blob);
  const target = Math.max(bmp.width, bmp.height) < 1400 ? 1800 : 2200;
  const scale = target / Math.max(bmp.width, bmp.height);
  const cv = document.createElement('canvas');
  cv.width = Math.round(bmp.width * scale);
  cv.height = Math.round(bmp.height * scale);
  const ctx = cv.getContext('2d', { willReadFrequently: true });
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(bmp, 0, 0, cv.width, cv.height);
  const img = ctx.getImageData(0, 0, cv.width, cv.height);
  const d = img.data;
  const hist = new Uint32Array(256);
  for (let i = 0; i < d.length; i += 4) {
    const g = (d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114) | 0;
    d[i] = g; hist[g]++;
  }
  // Odcięcie 1% skrajnych pikseli (auto-poziomy)
  const total = d.length / 4;
  let lo = 0, hi = 255, acc = 0;
  while (lo < 255 && (acc += hist[lo]) < total * 0.01) lo++;
  acc = 0;
  while (hi > 0 && (acc += hist[hi]) < total * 0.01) hi--;
  const range = Math.max(1, hi - lo);
  for (let i = 0; i < d.length; i += 4) {
    let v = ((d[i] - lo) * 255) / range;
    v = v < 0 ? 0 : v > 255 ? 255 : v;
    d[i] = d[i + 1] = d[i + 2] = v;
  }
  ctx.putImageData(img, 0, 0);
  return toBlob(cv, 'image/png');
}

// ---------- Tesseract ----------

let workerPromise;
function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement('script');
    s.src = src; s.async = true;
    s.onload = resolve;
    s.onerror = () => reject(new Error('Nie udało się pobrać silnika OCR (sprawdź połączenie przy pierwszym uruchomieniu).'));
    document.head.appendChild(s);
  });
}

let progressCb = () => {};
async function getWorker() {
  if (!workerPromise) {
    workerPromise = (async () => {
      await loadScript(TESSERACT_URL);
      const w = await window.Tesseract.createWorker('pol+eng', 1, {
        logger: m => { if (m.status === 'recognizing text') progressCb(m.progress); },
      });
      await w.setParameters({ preserve_interword_spaces: '1', user_defined_dpi: '300' });
      return w;
    })().catch(e => { workerPromise = null; throw e; });
  }
  return workerPromise;
}

export async function ocrLocal(blob, onProgress) {
  progressCb = onProgress || (() => {});
  const worker = await getWorker();
  const pre = await preprocessForOcr(blob);
  const { data } = await worker.recognize(pre);
  return { text: data.text || '', confidence: Math.round(data.confidence || 0) };
}

// ---------- Claude (OCR AI) ----------

const nullable = (t, description, extra = {}) => ({ anyOf: [{ type: t, ...extra }, { type: 'null' }], ...(description ? { description } : {}) });

const AI_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    raw_text: { type: 'string', description: 'Pełna transkrypcja tekstu z dokumentu, linia po linii.' },
    date: nullable('string', 'Data rozpoczęcia parkowania YYYY-MM-DD'),
    startTime: nullable('string', 'Godzina rozpoczęcia HH:MM'),
    endDate: nullable('string', 'Data zakończenia YYYY-MM-DD, tylko jeśli inna niż data rozpoczęcia'),
    endTime: nullable('string', 'Godzina zakończenia / ważności HH:MM'),
    durationMin: nullable('integer'),
    location: nullable('string', 'Adres lub nazwa parkingu (miejsce postoju, nie siedziba firmy)'),
    city: nullable('string'),
    zone: nullable('string', 'Strefa / podstrefa / nr parkomatu / poziom'),
    operator: nullable('string', 'Operator parkingu / sprzedawca'),
    nip: nullable('string', 'NIP sprzedawcy, same cyfry'),
    plate: nullable('string', 'Numer rejestracyjny pojazdu'),
    amount: nullable('number', 'Kwota brutto do zapłaty'),
    vat: nullable('number', 'Kwota podatku VAT/PTU'),
    vatRate: nullable('number', 'Stawka VAT w %'),
    currency: nullable('string'),
    payment: nullable('string', 'Forma płatności', { enum: ['Karta', 'Gotówka', 'BLIK', 'Aplikacja mobilna'] }),
    receiptNo: nullable('string', 'Numer paragonu / biletu / transakcji'),
    uncertain: { type: 'array', items: { type: 'string' }, description: 'Nazwy pól odczytanych z niepewnością' },
  },
  required: ['raw_text', 'date', 'startTime', 'endDate', 'endTime', 'durationMin', 'location', 'city', 'zone',
    'operator', 'nip', 'plate', 'amount', 'vat', 'vatRate', 'currency', 'payment', 'receiptNo', 'uncertain'],
};

async function blobToBase64(blob) {
  const buf = new Uint8Array(await blob.arrayBuffer());
  let bin = '';
  for (let i = 0; i < buf.length; i += 0x8000) bin += String.fromCharCode(...buf.subarray(i, i + 0x8000));
  return btoa(bin);
}

export async function ocrAI(blob, settings) {
  if (!settings.apiKey) throw new Error('Brak klucza API Anthropic – uzupełnij go w Ustawieniach.');
  const { default: Anthropic } = await import(ANTHROPIC_SDK_URL);
  const client = new Anthropic({ apiKey: settings.apiKey, dangerouslyAllowBrowser: true });
  const data = await blobToBase64(blob);
  const model = settings.aiModel || 'claude-opus-5';
  // Dla Claude Opus 5 włączamy serwerowy fallback na wypadek odmowy klasyfikatora.
  const fallback = model === 'claude-opus-5' ? { betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default' } : {};
  const api = fallback.betas ? client.beta.messages : client.messages;
  const msg = await api.create({
    model,
    ...fallback,
    max_tokens: 16000,
    output_config: { format: { type: 'json_schema', schema: AI_SCHEMA } },
    messages: [{
      role: 'user',
      content: [
        { type: 'image', source: { type: 'base64', media_type: blob.type || 'image/jpeg', data } },
        {
          type: 'text',
          text: 'To zdjęcie paragonu, biletu parkingowego lub potwierdzenia opłaty za parkowanie samochodu służbowego w Polsce. ' +
            'Odczytaj dokument i wypełnij pola. Jeśli pola nie ma na dokumencie, zwróć null – nie zgaduj. ' +
            'Kwoty jako liczby z kropką dziesiętną. Pola, których odczyt jest niepewny (nieczytelne, rozmyte, domyślone z kontekstu), wpisz do "uncertain".' +
            (settings.defaultPlate ? ` Numer rejestracyjny auta służbowego to ${settings.defaultPlate} (użyj go, jeśli pasuje do dokumentu).` : ''),
        },
      ],
    }],
  });
  if (msg.stop_reason === 'refusal') throw new Error('Model odmówił przetworzenia dokumentu.');
  const textBlock = msg.content.find(b => b.type === 'text');
  if (!textBlock) throw new Error('Pusta odpowiedź modelu.');
  const out = JSON.parse(textBlock.text);
  const fields = {};
  const confidence = {};
  const uncertain = new Set(out.uncertain || []);
  for (const k of FIELDS) {
    const v = out[k];
    if (v !== null && v !== undefined && v !== '') {
      fields[k] = v;
      confidence[k] = uncertain.has(k) ? 'low' : 'high';
    } else confidence[k] = 'missing';
  }
  if (fields.nip) fields.nip = formatNipLocal(fields.nip);
  return { text: out.raw_text || '', confidence: 95, parsed: { fields, confidence } };
}

function formatNipLocal(n) {
  const d = String(n).replace(/\D/g, '');
  return d.length === 10 ? `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6, 8)}-${d.slice(8)}` : n;
}

/** Pełny proces rozpoznania: OCR + ekstrakcja pól. */
export async function recognize(blob, settings, onProgress) {
  if (settings.ocrEngine === 'ai' && settings.apiKey) {
    try {
      const r = await ocrAI(blob, settings);
      // Uzupełnij domyślnym nr rejestracyjnym, jeśli brak
      if (!r.parsed.fields.plate && settings.defaultPlate) {
        r.parsed.fields.plate = settings.defaultPlate.toUpperCase();
        r.parsed.confidence.plate = 'default';
      }
      return { engine: 'ai', text: r.text, ocrConfidence: r.confidence, ...r.parsed };
    } catch (e) {
      console.warn('OCR AI nieudany, przełączam na lokalny:', e);
      const local = await recognizeLocal(blob, settings, onProgress);
      local.warning = `OCR AI niedostępny (${e.message}). Użyto OCR lokalnego.`;
      return local;
    }
  }
  return recognizeLocal(blob, settings, onProgress);
}

async function recognizeLocal(blob, settings, onProgress) {
  const r = await ocrLocal(blob, onProgress);
  const parsed = parseReceipt(r.text, { defaultPlate: settings.defaultPlate });
  // Przy słabej jakości OCR obniżamy pewność wszystkich pól
  if (r.confidence < 55) for (const k in parsed.confidence) if (parsed.confidence[k] === 'high') parsed.confidence[k] = 'low';
  return { engine: 'local', text: r.text, ocrConfidence: r.confidence, ...parsed };
}
