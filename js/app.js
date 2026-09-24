import { db, onChange, uid } from './db.js';
import { prepareImage, recognize } from './ocr.js';
import { validNip, diffMinutes, formatNip, PAYMENT_OPTIONS } from './parser.js';
import { buildSettlementPdf, pdfFileToImage, renderPdfPage } from './pdf.js';
import { mailSubject, mailBody, pdfFileName } from './mail.js';
import {
  STATUS, FIELD_LABELS, esc, money, fmtDate, fmtDuration, monthLabel, receiptMonth, timeRange, sum,
  toCSV, download, blobToDataURL, dataURLToBlob, debounce, findDuplicates,
} from './utils.js';

const JSZIP_URL = 'https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const view = $('#view');

const state = {
  settings: null,
  receipts: [],
  filter: { month: '', status: '', q: '' },
  selected: new Set(),
  progress: {}, // id -> 0..1
};

// ============ Kolejka przetwarzania (OCR) ============
const queue = [];
let busy = false;

async function addFiles(files) {
  const imgs = [...files].filter(f => f.type.startsWith('image/') || f.type === 'application/pdf' || /\.(jpe?g|png|webp|heic|heif|pdf)$/i.test(f.name));
  if (!imgs.length) return toast('Wybierz zdjęcia (JPG, PNG, WEBP) lub skany PDF.', 'warn');
  toast(imgs.length > 1 ? `Wgrywanie ${imgs.length} dokumentów…` : 'Wgrywanie dokumentu…');
  let firstId;
  for (const file of imgs) {
    try {
      const src = file.type === 'application/pdf' || /\.pdf$/i.test(file.name) ? await pdfFileToImage(file) : file;
      const img = await prepareImage(src);
      const id = uid();
      const imageId = `img-${id}`;
      await db.putImage(imageId, img.blob);
      const now = new Date().toISOString();
      await db.putReceipt({
        id, imageId, thumb: img.thumb, status: 'processing', createdAt: now,
        fileName: file.name, fields: {}, confidence: {}, history: [{ at: now, action: 'Wgrano dokument' }],
      });
      firstId ||= id;
      queue.push(id);
    } catch (e) {
      console.error(e);
      toast(`Nie udało się wczytać pliku ${file.name}: ${e.message}`, 'error');
    }
  }
  await refresh();
  runQueue();
  if (firstId && imgs.length === 1) go(`#/receipt/${firstId}`);
  else go('#/receipts');
}

async function runQueue() {
  if (busy) return;
  busy = true;
  while (queue.length) {
    const id = queue.shift();
    await processReceipt(id);
  }
  busy = false;
}

async function processReceipt(id, { engine } = {}) {
  const r = await db.getReceipt(id);
  if (!r) return;
  const blob = await db.getImage(r.imageId);
  const settings = { ...state.settings, ...(engine ? { ocrEngine: engine } : {}) };
  state.progress[id] = 0;
  const onProgress = debounce(p => { state.progress[id] = p; updateProgressUI(id); }, 60);
  try {
    const res = await recognize(blob, settings, onProgress);
    const fields = { ...res.fields, purpose: r.fields?.purpose || '', notes: r.fields?.notes || '' };
    if (!fields.currency) fields.currency = 'PLN';
    const keyOk = ['date', 'amount', 'startTime', 'city', 'location', 'payment'].every(k => res.confidence[k] === 'high') && !validate(fields).errors.length;
    const status = settings.autoApproveHigh && keyOk ? 'approved' : 'to_verify';
    Object.assign(r, {
      fields, confidence: res.confidence, status,
      ocr: { engine: res.engine, text: res.text, confidence: res.ocrConfidence, at: new Date().toISOString(), warning: res.warning || null },
    });
    r.history.push({ at: new Date().toISOString(), action: `Odczyt OCR (${res.engine === 'ai' ? 'AI' : 'lokalny'}, pewność ${res.ocrConfidence}%)` });
    if (status === 'approved') r.history.push({ at: new Date().toISOString(), action: 'Zatwierdzono automatycznie' });
    if (res.warning) toast(res.warning, 'warn');
  } catch (e) {
    console.error(e);
    r.status = 'error';
    r.error = e.message;
    r.history.push({ at: new Date().toISOString(), action: `Błąd OCR: ${e.message}` });
    toast(`Błąd odczytu: ${e.message}`, 'error');
  }
  delete state.progress[id];
  await db.putReceipt(r);
}

function updateProgressUI(id) {
  $$(`[data-progress="${id}"]`).forEach(el => { el.style.width = `${Math.round((state.progress[id] || 0) * 100)}%`; });
}

// ============ Routing ============
function go(hash) { if (location.hash !== hash) location.hash = hash; else render(); }

async function refresh() {
  state.receipts = await db.allReceipts();
  updateBadges();
}

function updateBadges() {
  const n = state.receipts.filter(r => r.status === 'to_verify' || r.status === 'error').length;
  const s = state.receipts.filter(r => r.status === 'approved').length;
  const b1 = $('#badge-verify'); b1.textContent = n; b1.hidden = !n;
  const b2 = $('#badge-send'); b2.textContent = s; b2.hidden = !s;
}

async function render() {
  const [route, arg] = location.hash.replace(/^#\/?/, '').split('/');
  $$('.nav a').forEach(a => a.classList.toggle('active', a.dataset.route === (route || 'home')));
  window.scrollTo(0, 0);
  switch (route) {
    case 'receipts': return renderList();
    case 'receipt': return renderReceipt(arg);
    case 'send': return renderSend();
    case 'report': return renderReport(arg);
    case 'mail': return renderMail(arg);
    case 'settings': return renderSettings();
    default: return renderHome();
  }
}

// ============ Widoki ============
function uploadButtons() {
  return `
    <div class="upload-actions">
      <label class="btn btn-primary btn-big">
        <svg class="ico"><use href="#i-camera"/></svg> Zrób zdjęcie
        <input type="file" accept="image/*" capture="environment" data-upload hidden>
      </label>
      <label class="btn btn-secondary btn-big">
        <svg class="ico"><use href="#i-image"/></svg> Z galerii
        <input type="file" accept="image/*,application/pdf" multiple data-upload hidden>
      </label>
    </div>`;
}

function renderHome() {
  const now = new Date();
  const ym = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const month = state.receipts.filter(r => receiptMonth(r) === ym && r.status !== 'error');
  const toVerify = state.receipts.filter(r => r.status === 'to_verify' || r.status === 'error');
  const processing = state.receipts.filter(r => r.status === 'processing');
  const toSend = state.receipts.filter(r => r.status === 'approved');

  // Ostatnie 6 miesięcy
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    months.push({ key, total: sum(state.receipts.filter(r => receiptMonth(r) === key && r.status !== 'error')) });
  }
  const max = Math.max(1, ...months.map(m => m.total));

  view.innerHTML = `
    <section class="hero">
      <div>
        <p class="eyebrow">${esc(monthLabel(ym))}</p>
        <h1 class="kpi-main">${money(sum(month))}</h1>
        <p class="muted">${month.length} ${plural(month.length, 'paragon', 'paragony', 'paragonów')} za parkowanie
          · ${fmtDuration(month.reduce((s, r) => s + (+r.fields.durationMin || 0), 0))} postoju</p>
      </div>
      ${uploadButtons()}
      <p class="hint">Możesz też przeciągnąć zdjęcia na okno lub wkleić je (Ctrl+V).</p>
    </section>

    <section class="steps">
      <a class="step ${processing.length ? 'active' : ''}" href="#/receipts" data-status="processing">
        <span class="step-l"><span class="step-n">1</span>Odczyt OCR</span><b>${processing.length}</b></a>
      <a class="step ${toVerify.length ? 'warn' : ''}" href="#/receipts" data-status="to_verify">
        <span class="step-l"><span class="step-n">2</span>Weryfikacja</span><b>${toVerify.length}</b></a>
      <a class="step ${toSend.length ? 'ok' : ''}" href="#/send">
        <span class="step-l"><span class="step-n">3</span>Do wysłania</span><b>${toSend.length}</b></a>
    </section>

    ${toVerify.length ? `<a class="cta" href="#/receipt/${toVerify[toVerify.length - 1].id}">
      <svg class="ico"><use href="#i-check"/></svg>
      <span><b>Sprawdź odczyty (${toVerify.length})</b><br><small>Zweryfikuj dane odczytane przez robota i zatwierdź</small></span>
      <svg class="ico"><use href="#i-chevron"/></svg></a>` : ''}

    <section class="card">
      <div class="card-head"><h2>Koszty parkowania – 6 miesięcy</h2></div>
      <div class="bars">
        ${months.map(m => `<a class="bar" href="#/receipts" data-month="${m.key}" title="${esc(monthLabel(m.key))}: ${money(m.total)}">
          <span class="bar-val">${m.total ? Math.round(m.total) : ''}</span>
          <span class="bar-fill" style="height:${Math.max(2, (m.total / max) * 100)}%"></span>
          <span class="bar-lbl">${monthLabel(m.key).slice(0, 3)}</span></a>`).join('')}
      </div>
    </section>

    <section class="card">
      <div class="card-head"><h2>Ostatnie dokumenty</h2><a href="#/receipts" class="link">Wszystkie</a></div>
      ${state.receipts.length ? `<ul class="rlist">${state.receipts.slice(0, 5).map(rowHTML).join('')}</ul>`
        : `<div class="empty"><svg class="ico ico-xl"><use href="#i-receipt"/></svg><p>Brak paragonów. Zrób zdjęcie pierwszego biletu parkingowego.</p></div>`}
    </section>`;

  $$('[data-status]', view).forEach(a => a.addEventListener('click', () => { state.filter = { month: '', status: a.dataset.status, q: '' }; }));
  $$('[data-month]', view).forEach(a => a.addEventListener('click', () => { state.filter = { month: a.dataset.month, status: '', q: '' }; }));
}

function plural(n, one, few, many) {
  if (n === 1) return one;
  const d = n % 10, dd = n % 100;
  return d >= 2 && d <= 4 && (dd < 12 || dd > 14) ? few : many;
}

function confidenceWarn(r) {
  const c = r.confidence || {};
  return ['date', 'amount', 'startTime', 'location'].filter(k => c[k] === 'low' || c[k] === 'missing').length;
}

function rowHTML(r) {
  const f = r.fields || {};
  const st = STATUS[r.status] || STATUS.to_verify;
  const warn = r.status === 'to_verify' ? confidenceWarn(r) : 0;
  const sel = state.selected.has(r.id);
  return `<li class="row ${sel ? 'selected' : ''}" data-id="${r.id}">
    <label class="row-check" title="Zaznacz"><input type="checkbox" data-select="${r.id}" ${sel ? 'checked' : ''}></label>
    <a class="row-link" href="#/receipt/${r.id}">
      <img class="thumb" src="${r.thumb}" alt="" loading="lazy">
      <div class="row-main">
        <div class="row-top"><b>${f.date ? fmtDate(f.date) : 'Data?'}</b> <span class="muted">${esc(timeRange(f))}</span></div>
        <div class="row-sub">${esc(f.location || f.operator || r.fileName || 'Dokument')}${f.city ? `, ${esc(f.city)}` : ''}</div>
        <div class="row-meta"><span class="badge ${st.cls}">${st.label}</span>
          ${warn ? `<span class="badge st-warn" title="Pola do sprawdzenia">⚠ ${warn}</span>` : ''}
          ${f.durationMin ? `<span class="muted">${fmtDuration(f.durationMin)}</span>` : ''}</div>
        ${r.status === 'processing' ? `<div class="progress"><span data-progress="${r.id}" style="width:${Math.round((state.progress[r.id] || 0) * 100)}%"></span></div>` : ''}
      </div>
      <div class="row-amount">${money(f.amount, f.currency)}</div>
    </a></li>`;
}

function filtered() {
  const { month, status, q } = state.filter;
  const qq = q.trim().toLowerCase();
  return state.receipts.filter(r => {
    if (month && receiptMonth(r) !== month) return false;
    if (status && r.status !== status && !(status === 'to_verify' && r.status === 'error')) return false;
    if (qq) {
      const hay = Object.values(r.fields || {}).join(' ').toLowerCase() + ' ' + (r.ocr?.text || '').toLowerCase();
      if (!hay.includes(qq)) return false;
    }
    return true;
  });
}

function renderList() {
  const months = [...new Set(state.receipts.map(receiptMonth))].filter(Boolean).sort().reverse();
  const list = filtered();
  const groups = {};
  list.forEach(r => { (groups[receiptMonth(r)] ||= []).push(r); });

  view.innerHTML = `
    <div class="page-head">
      <h1>Paragony</h1>
      ${uploadButtons().replace('upload-actions', 'upload-actions compact')}
    </div>
    <div class="filters">
      <input type="search" id="q" placeholder="Szukaj: miejsce, operator, kwota, nr…" value="${esc(state.filter.q)}">
      <select id="f-month"><option value="">Wszystkie miesiące</option>
        ${months.map(m => `<option value="${m}" ${m === state.filter.month ? 'selected' : ''}>${esc(monthLabel(m))}</option>`).join('')}</select>
      <div class="chips">
        ${[['', 'Wszystkie'], ['to_verify', 'Do weryfikacji'], ['approved', 'Zatwierdzone'], ['sent', 'Przesłane'], ['processing', 'W trakcie']]
          .map(([k, l]) => `<button class="chip ${state.filter.status === k ? 'on' : ''}" data-chip="${k}">${l}</button>`).join('')}
      </div>
    </div>
    <div class="summary-bar">
      <span>${list.length} ${plural(list.length, 'dokument', 'dokumenty', 'dokumentów')} · <b>${money(sum(list))}</b></span>
      <span class="spacer"></span>
      <button class="btn btn-ghost btn-sm" id="exp-csv"><svg class="ico"><use href="#i-download"/></svg> CSV</button>
      ${state.filter.month ? `<a class="btn btn-ghost btn-sm" href="#/report/${state.filter.month}"><svg class="ico"><use href="#i-doc"/></svg> Raport</a>` : ''}
    </div>
    ${state.selected.size ? `<div class="bulk">
      <span>Zaznaczono: ${state.selected.size}</span>
      <button class="btn btn-sm btn-primary" data-bulk="approve">Zatwierdź</button>
      <button class="btn btn-sm" data-bulk="csv">Eksport</button>
      <button class="btn btn-sm btn-danger" data-bulk="delete">Usuń</button>
      <button class="btn btn-sm btn-ghost" data-bulk="clear">Odznacz</button>
    </div>` : ''}
    ${list.length ? Object.entries(groups).map(([m, rs]) => `
      <section class="group">
        <div class="group-head"><h2>${esc(monthLabel(m))}</h2><span>${money(sum(rs))}</span>
          <label class="muted sel-all"><input type="checkbox" data-selall="${m}"> zaznacz</label></div>
        <ul class="rlist">${rs.map(rowHTML).join('')}</ul>
      </section>`).join('')
      : `<div class="empty"><svg class="ico ico-xl"><use href="#i-search"/></svg><p>Brak dokumentów spełniających kryteria.</p></div>`}`;

  $('#q').addEventListener('input', debounce(e => { state.filter.q = e.target.value; renderList(); $('#q').focus(); const v = $('#q').value; $('#q').setSelectionRange(v.length, v.length); }, 300));
  $('#f-month').addEventListener('change', e => { state.filter.month = e.target.value; renderList(); });
  $$('[data-chip]').forEach(b => b.addEventListener('click', () => { state.filter.status = b.dataset.chip; renderList(); }));
  $('#exp-csv').addEventListener('click', () => exportCSV(list));
  $$('[data-select]').forEach(cb => cb.addEventListener('change', () => {
    cb.checked ? state.selected.add(cb.dataset.select) : state.selected.delete(cb.dataset.select);
    renderList();
  }));
  $$('[data-selall]').forEach(cb => cb.addEventListener('change', () => {
    groups[cb.dataset.selall].forEach(r => cb.checked ? state.selected.add(r.id) : state.selected.delete(r.id));
    renderList();
  }));
  $$('[data-bulk]').forEach(b => b.addEventListener('click', () => bulk(b.dataset.bulk)));
}

async function bulk(action) {
  const items = state.receipts.filter(r => state.selected.has(r.id));
  if (action === 'clear') { state.selected.clear(); return renderList(); }
  if (action === 'csv') return exportCSV(items);
  if (action === 'delete') {
    if (!confirm(`Usunąć ${items.length} dokument(ów)? Tej operacji nie można cofnąć.`)) return;
    for (const r of items) await db.deleteReceipt(r.id);
    state.selected.clear();
    return toast('Usunięto.');
  }
  if (action === 'approve') {
    let ok = 0, skipped = 0;
    for (const r of items) {
      if (r.status !== 'to_verify' || validate(r.fields).errors.length) { skipped++; continue; }
      r.status = 'approved';
      r.history.push({ at: new Date().toISOString(), action: 'Zatwierdzono (zbiorczo)' });
      await db.putReceipt(r); ok++;
    }
    state.selected.clear();
    toast(`Zatwierdzono: ${ok}${skipped ? `, pominięto: ${skipped} (niekompletne lub inny status)` : ''}.`);
  }
}

function exportCSV(list) {
  if (!list.length) return toast('Brak danych do eksportu.', 'warn');
  const sorted = [...list].sort((a, b) => `${a.fields.date}${a.fields.startTime}`.localeCompare(`${b.fields.date}${b.fields.startTime}`));
  download(`smartpocket-parkowanie-${new Date().toISOString().slice(0, 10)}.csv`, toCSV(sorted), 'text/csv;charset=utf-8');
}

// ---------- Weryfikacja ----------
function validate(f) {
  const errors = [], warnings = [];
  if (!f.date) errors.push('Brak daty parkowania.');
  if (f.amount === '' || f.amount == null || Number.isNaN(+f.amount) || +f.amount <= 0) errors.push('Brak poprawnej kwoty.');
  if (!f.city) errors.push('Uzupełnij miasto, w którym parkowano.');
  if (!f.location) errors.push('Uzupełnij nazwę miejsca postoju (adres / galeria / wystawca paragonu).');
  if (!PAYMENT_OPTIONS.includes(f.payment)) errors.push('Wybierz formę płatności: karta służbowa, karta prywatna lub gotówka.');
  const s = state.settings || {};
  if (!s.employee) errors.push('Uzupełnij imię i nazwisko kierowcy w Ustawieniach.');
  if (!s.defaultPlate) errors.push('Uzupełnij numer rejestracyjny pojazdu w Ustawieniach.');
  if (!f.startTime) warnings.push('Brak godziny rozpoczęcia.');
  if (f.payment === 'Karta służbowa' && s.companyCardLast4 && f.cardLast4 && f.cardLast4 !== s.companyCardLast4) warnings.push(`Na paragonie jest karta **** ${f.cardLast4}, a karta służbowa w ustawieniach to **** ${s.companyCardLast4}.`);
  if (f.nip && !validNip(f.nip)) warnings.push('NIP ma niepoprawną sumę kontrolną.');
  if (f.date && f.date > new Date().toISOString().slice(0, 10)) warnings.push('Data jest z przyszłości.');
  if (f.vat && f.amount && +f.vat >= +f.amount) warnings.push('Kwota VAT nie może przekraczać kwoty brutto.');
  if (f.durationMin != null && f.durationMin !== '' && +f.durationMin > 60 * 24 * 14) warnings.push('Nietypowo długi czas postoju.');
  return { errors, warnings };
}

async function renderReceipt(id) {
  const r = await db.getReceipt(id);
  if (!r) { view.innerHTML = '<div class="empty"><p>Nie znaleziono dokumentu.</p><a href="#/receipts" class="btn">Wróć do listy</a></div>'; return; }
  const f = r.fields || {};
  const c = r.confidence || {};
  const locked = r.status === 'sent';
  const imgBlob = await db.getImage(r.imageId);
  const imgUrl = imgBlob ? URL.createObjectURL(imgBlob) : r.thumb;
  const dups = findDuplicates(r, state.receipts);
  const queueNext = state.receipts.filter(o => (o.status === 'to_verify' || o.status === 'error') && o.id !== r.id);
  const st = STATUS[r.status];

  const REQUIRED = ['date', 'startTime', 'endTime', 'amount', 'location', 'city'];
  const shown = k => (k === 'amount' || k === 'vat') && f[k] != null && f[k] !== '' ? String((+f[k]).toFixed(2)).replace('.', ',') : f[k];
  const input = (k, type = 'text', extra = '') => {
    let conf = c[k] || (f[k] ? 'manual' : 'missing');
    if (conf === 'missing' && !REQUIRED.includes(k)) conf = 'manual';
    const cls = { high: 'c-high', low: 'c-low', missing: 'c-missing', default: 'c-default', manual: '' }[conf] || '';
    const tip = { high: 'Odczytano z dużą pewnością', low: 'Niepewny odczyt – sprawdź', missing: 'Nie odczytano – uzupełnij', default: 'Wartość domyślna z ustawień' }[conf] || '';
    return `<label class="field ${cls}" title="${tip}"><span>${FIELD_LABELS[k]}${conf === 'low' ? ' <i class="dot dot-low"></i>' : conf === 'missing' ? ' <i class="dot dot-miss"></i>' : ''}</span>
      <input name="${k}" type="${type}" value="${esc(shown(k) ?? '')}" ${extra} ${locked ? 'disabled' : ''}></label>`;
  };

  view.innerHTML = `
    <div class="page-head">
      <a href="#/receipts" class="btn btn-ghost btn-sm"><svg class="ico"><use href="#i-back"/></svg> Lista</a>
      <span class="badge ${st.cls}">${st.label}</span>
      ${queueNext.length ? `<span class="muted small">Do sprawdzenia: ${queueNext.length + (r.status === 'to_verify' ? 1 : 0)}</span>` : ''}
    </div>
    <div class="verify">
      <div class="doc-pane">
        <div class="doc-img" id="doc-img"><img src="${imgUrl}" alt="Zdjęcie dokumentu" id="doc-photo"></div>
        <div class="doc-tools">
          <button class="btn btn-ghost btn-sm" id="zoom"><svg class="ico"><use href="#i-zoom"/></svg> Powiększ</button>
          ${!locked ? `<button class="btn btn-ghost btn-sm" id="rotate"><svg class="ico"><use href="#i-rotate"/></svg> Obróć</button>
          <button class="btn btn-ghost btn-sm" id="reocr"><svg class="ico"><use href="#i-refresh"/></svg> Odczytaj ponownie</button>
          ${state.settings.apiKey ? `<button class="btn btn-ghost btn-sm" id="reocr-ai"><svg class="ico"><use href="#i-spark"/></svg> Odczyt AI</button>` : ''}` : ''}
          <button class="btn btn-ghost btn-sm" id="dl-img"><svg class="ico"><use href="#i-download"/></svg> Zdjęcie</button>
          ${r.status === 'approved' || r.status === 'sent' ? `<a class="btn btn-ghost btn-sm" href="#/mail/${r.id}"><svg class="ico"><use href="#i-send"/></svg> PDF i e-mail</a>` : ''}
        </div>
        ${r.ocr ? `<details class="ocr-text"><summary>Tekst rozpoznany przez OCR (${r.ocr.engine === 'ai' ? 'AI' : 'lokalny'}, ${r.ocr.confidence}%)</summary><pre>${esc(r.ocr.text)}</pre></details>` : ''}
      </div>

      <form class="form-pane" id="rform" autocomplete="off">
        ${r.status === 'processing' ? `<div class="notice info"><div class="spinner"></div> Robot odczytuje dokument…<div class="progress"><span data-progress="${r.id}"></span></div></div>` : ''}
        ${r.status === 'error' ? `<div class="notice error">Nie udało się odczytać dokumentu: ${esc(r.error)}. Uzupełnij dane ręcznie lub spróbuj ponownie.</div>` : ''}
        ${r.status === 'to_verify' ? `<div class="notice info small">Sprawdź odczytane dane. Pola oznaczone <i class="dot dot-low"></i> są niepewne, <i class="dot dot-miss"></i> – nieodczytane.</div>` : ''}
        ${dups.length ? `<div class="notice warn">Możliwy duplikat: ${dups.map(d => `<a href="#/receipt/${d.id}">${fmtDate(d.fields.date)} ${money(d.fields.amount)}</a>`).join(', ')}</div>` : ''}
        <div id="val-msgs"></div>

        <fieldset><legend>Kiedy</legend>
          <div class="grid g3">${input('date', 'date')}${input('startTime', 'time')}${input('endTime', 'time')}</div>
          <div class="grid g2">${input('endDate', 'date')}
            <label class="field"><span>Czas postoju</span><output id="dur">${fmtDuration(f.durationMin)}</output>
            <input type="hidden" name="durationMin" value="${esc(f.durationMin ?? '')}"></label></div>
        </fieldset>

        <fieldset><legend>Gdzie</legend>
          ${input('location', 'text', 'list="dl-loc" placeholder="np. Westfield Arkadia / ul. Moliera 5" required')}
          <div class="grid g2">${input('city', 'text', 'list="dl-city" required')}${input('zone')}</div>
        </fieldset>

        <fieldset><legend>Koszt</legend>
          <div class="grid g3">${input('amount', 'text', 'inputmode="decimal" placeholder="0,00"')}${input('vat', 'text', 'inputmode="decimal"')}${input('vatRate', 'number', 'min="0" max="99" step="1"')}</div>
          <div class="grid g2">
            <label class="field ${c.payment === 'low' ? 'c-low' : !PAYMENT_OPTIONS.includes(f.payment) ? 'c-missing' : c.payment === 'high' ? 'c-high' : ''}"><span>${FIELD_LABELS.payment} *${c.payment === 'low' ? ' <i class="dot dot-low"></i>' : !PAYMENT_OPTIONS.includes(f.payment) ? ' <i class="dot dot-miss"></i>' : ''}</span>
              <select name="payment" required ${locked ? 'disabled' : ''}>${['', ...PAYMENT_OPTIONS, ...(f.payment && !PAYMENT_OPTIONS.includes(f.payment) ? [f.payment] : [])].map(p => `<option ${p === (f.payment || '') ? 'selected' : ''} value="${p}">${p || '— wybierz —'}</option>`).join('')}</select>
              <small class="field-hint">${paymentHint(f)}</small></label>
            <label class="field"><span>${FIELD_LABELS.currency}</span>
              <select name="currency" ${locked ? 'disabled' : ''}>${['PLN', 'EUR', 'CZK', 'USD'].map(p => `<option ${p === (f.currency || 'PLN') ? 'selected' : ''}>${p}</option>`).join('')}</select></label>
          </div>
        </fieldset>

        <fieldset><legend>Dokument i pojazd</legend>
          ${input('operator', 'text', 'list="dl-op"')}
          <div class="grid g2">${input('nip', 'text', 'inputmode="numeric"')}${input('receiptNo')}</div>
          <label class="field c-default"><span>${FIELD_LABELS.plate} <small>(z Ustawień)</small></span>
            <input name="plate" value="${esc(state.settings.defaultPlate || f.plate || '')}" readonly>
            ${f.platePrinted ? `<small class="field-hint">Na paragonie odczytano: ${esc(f.platePrinted)}</small>` : ''}</label>
          <input type="hidden" name="cardLast4" value="${esc(f.cardLast4 || '')}">
        </fieldset>

        <fieldset><legend>Rozliczenie</legend>
          ${input('purpose', 'text', 'list="dl-purpose" placeholder="np. spotkanie z klientem X"')}
          <label class="field"><span>${FIELD_LABELS.notes}</span><textarea name="notes" rows="2" ${locked ? 'disabled' : ''}>${esc(f.notes || '')}</textarea></label>
        </fieldset>

        ${datalists()}

        <div class="actions sticky">
          ${locked ? `<button type="button" class="btn" id="unlock">Przywróć do edycji</button>` : `
            <button type="button" class="btn btn-danger btn-ghost" id="del" title="Usuń"><svg class="ico"><use href="#i-trash"/></svg></button>
            <button type="submit" class="btn" name="act" value="save">Zapisz</button>
            <button type="submit" class="btn btn-primary" name="act" value="approve"><svg class="ico"><use href="#i-check"/></svg>
              ${r.status === 'approved' ? 'Zapisz i wyślij' : 'Zatwierdź i wyślij'}</button>`}
        </div>

        <details class="history"><summary>Historia dokumentu</summary>
          <ul>${(r.history || []).map(h => `<li><time>${new Date(h.at).toLocaleString('pl-PL')}</time> ${esc(h.action)}</li>`).join('')}</ul></details>
      </form>
    </div>`;

  const form = $('#rform');
  const readForm = () => {
    const fd = new FormData(form);
    const out = { ...f };
    for (const [k, v] of fd.entries()) out[k] = typeof v === 'string' ? v.trim() : v;
    for (const k of ['amount', 'vat']) out[k] = out[k] === '' ? null : parseMoney(out[k]);
    out.vatRate = out.vatRate === '' || out.vatRate == null ? null : +out.vatRate;
    out.plate = (out.plate || '').toUpperCase();
    if (out.nip) out.nip = formatNip(out.nip);
    out.durationMin = diffMinutes(out.date, out.startTime, out.endDate, out.endTime) ?? (out.durationMin === '' ? null : +out.durationMin);
    if (out.endDate === out.date) out.endDate = '';
    return out;
  };
  const showValidation = () => {
    const v = validate(readForm());
    $('#val-msgs').innerHTML = [...v.errors.map(e => `<div class="notice error small">${esc(e)}</div>`), ...v.warnings.map(w => `<div class="notice warn small">${esc(w)}</div>`)].join('');
    return v;
  };
  form.addEventListener('input', e => {
    const lbl = e.target.closest('.field');
    if (lbl) { lbl.classList.remove('c-low', 'c-missing', 'c-default'); lbl.querySelectorAll('.dot').forEach(d => d.remove()); }
    const nf = readForm();
    $('#dur').textContent = fmtDuration(nf.durationMin);
    form.elements.durationMin.value = nf.durationMin ?? '';
  });
  form.addEventListener('change', showValidation);
  if (r.status !== 'processing') showValidation();

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const act = e.submitter?.value || 'save';
    const nf = readForm();
    const v = validate(nf);
    const edited = Object.keys(nf).filter(k => String(nf[k] ?? '') !== String(f[k] ?? ''));
    const fresh = await db.getReceipt(id);
    fresh.fields = nf;
    edited.forEach(k => { fresh.confidence[k] = 'manual'; });
    if (edited.length) fresh.history.push({ at: new Date().toISOString(), action: `Poprawiono: ${edited.map(k => (FIELD_LABELS[k] || k).replace(/ \*$/, '')).join(', ')}` });
    if (act === 'approve') {
      if (v.errors.length) { showValidation(); toast(v.errors[0], 'error'); return; }
      if (fresh.status !== 'approved') {
        fresh.status = 'approved';
        fresh.history.push({ at: new Date().toISOString(), action: 'Zatwierdzono odczyt' });
      }
      await db.putReceipt(fresh);
      await refresh();
      toast('Zatwierdzono ✓ Przygotowuję PDF dla działu rozliczeń…');
      go(`#/mail/${id}`);
    } else {
      if (fresh.status === 'error') fresh.status = 'to_verify';
      await db.putReceipt(fresh);
      toast('Zapisano.');
    }
  });

  $('#zoom').addEventListener('click', () => openViewer(imgUrl));
  $('#doc-photo').addEventListener('click', () => openViewer(imgUrl));
  $('#dl-img').addEventListener('click', () => imgBlob && download(`paragon-${f.date || r.id}.jpg`, imgBlob));
  $('#del')?.addEventListener('click', async () => {
    if (!confirm('Usunąć ten dokument?')) return;
    await db.deleteReceipt(id);
    toast('Usunięto dokument.');
    go('#/receipts');
  });
  $('#unlock')?.addEventListener('click', async () => {
    if (!confirm('Dokument został już przesłany do systemu. Przywrócić go do edycji? Po zmianach trzeba będzie przesłać go ponownie.')) return;
    const fresh = await db.getReceipt(id);
    fresh.status = 'to_verify';
    fresh.history.push({ at: new Date().toISOString(), action: 'Przywrócono do edycji' });
    await db.putReceipt(fresh);
  });
  const rerun = async engine => {
    const fresh = await db.getReceipt(id);
    fresh.status = 'processing';
    await db.putReceipt(fresh);
    await processReceipt(id, { engine });
  };
  $('#reocr')?.addEventListener('click', () => rerun('local'));
  $('#reocr-ai')?.addEventListener('click', () => rerun('ai'));
  $('#rotate')?.addEventListener('click', async () => {
    const blob = await db.getImage(r.imageId);
    const img = await prepareImage(blob, 90);
    await db.putImage(r.imageId, img.blob);
    const fresh = await db.getReceipt(id);
    fresh.thumb = img.thumb;
    fresh.status = 'processing';
    fresh.history.push({ at: new Date().toISOString(), action: 'Obrócono zdjęcie' });
    await db.putReceipt(fresh);
    await processReceipt(id);
  });
}

function parseMoney(v) {
  const s = String(v).replace(/\s|zł|pln/gi, '');
  const n = parseFloat(s.includes(',') ? s.replace(/\./g, '').replace(',', '.') : s);
  return Number.isFinite(n) ? Math.round(n * 100) / 100 : null;
}

function datalists() {
  const uniq = k => [...new Set(state.receipts.map(r => r.fields?.[k]).filter(Boolean))].slice(0, 50);
  const dl = (id, vals) => `<datalist id="${id}">${vals.map(v => `<option value="${esc(v)}">`).join('')}</datalist>`;
  return dl('dl-loc', uniq('location')) + dl('dl-city', uniq('city')) + dl('dl-op', uniq('operator')) + dl('dl-purpose', uniq('purpose'));
}

function openViewer(url) {
  const v = $('#viewer');
  const img = $('#viewer-img');
  img.src = url;
  let scale = 1;
  img.style.transform = '';
  v.showModal();
  img.onclick = () => { scale = scale === 1 ? 2.2 : 1; img.style.transform = `scale(${scale})`; };
}

function paymentHint(f) {
  const s = state.settings;
  if (f.cardLast4 && s.companyCardLast4 && f.cardLast4 === s.companyCardLast4) return `Odczytano kartę służbową **** ${esc(f.cardLast4)}.`;
  if (f.cardLast4 && s.companyCardLast4) return `Odczytano kartę **** ${esc(f.cardLast4)} – inna niż służbowa (**** ${esc(s.companyCardLast4)}). Sprawdź.`;
  if (f.cardLast4) return `Odczytano kartę **** ${esc(f.cardLast4)}. Uzupełnij końcówkę karty służbowej w Ustawieniach, by rozpoznawać ją automatycznie.`;
  if (f.paymentMethod === 'card') return 'Na paragonie: płatność kartą (bez numeru karty) – wybierz, którą kartą płacono.';
  if (f.paymentMethod === 'cash') return 'Na paragonie wykryto płatność gotówką – potwierdź.';
  return 'Nie odczytano formy płatności – wybierz z listy.';
}

// ---------- PDF i e-mail do działu rozliczeń ----------
async function renderMail(id) {
  const r = await db.getReceipt(id);
  if (!r) { view.innerHTML = '<div class="empty"><p>Nie znaleziono dokumentu.</p></div>'; return; }
  const s = state.settings;
  const f = r.fields;
  if (r.status !== 'approved' && r.status !== 'sent') {
    view.innerHTML = `<div class="notice warn">Dokument nie jest jeszcze zatwierdzony. <a href="#/receipt/${id}">Zweryfikuj dane</a>, aby wygenerować PDF.</div>`;
    return;
  }
  const subject = mailSubject(f, s);
  const fileName = pdfFileName(f, s);
  const body = mailBody(f, s, fileName);
  const next = state.receipts.find(o => (o.status === 'to_verify' || o.status === 'error') && o.id !== id);

  view.innerHTML = `
    <div class="page-head">
      <a href="#/receipt/${id}" class="btn btn-ghost btn-sm"><svg class="ico"><use href="#i-back"/></svg> Dane</a>
      <h1>Wyślij do działu rozliczeń</h1>
      <span class="badge ${STATUS[r.status].cls}">${STATUS[r.status].label}</span>
    </div>
    ${r.status === 'sent' ? `<div class="notice ok">Wysłano ${r.batch ? new Date(r.batch.at).toLocaleString('pl-PL') : ''}${r.batch?.target ? ` (${esc(r.batch.target)})` : ''}. Możesz wysłać ponownie.</div>` : ''}
    <div class="mail">
      <section class="card pdf-card">
        <div class="card-head"><h2>Dokument PDF</h2><span class="muted small" id="pdf-size"></span></div>
        <div class="pdf-preview" id="pdf-preview"><div class="notice info"><div class="spinner"></div> Generowanie PDF…</div></div>
        <div class="actions wrap">
          <button class="btn" id="pdf-dl" disabled><svg class="ico"><use href="#i-download"/></svg> Pobierz PDF</button>
          <button class="btn btn-ghost" id="pdf-open" disabled><svg class="ico"><use href="#i-zoom"/></svg> Otwórz</button>
        </div>
      </section>

      <section class="card">
        <div class="card-head"><h2>Wiadomość e-mail</h2></div>
        <form id="mform" class="mail-form">
          <label class="field"><span>Do *</span><input name="to" type="email" required value="${esc(s.accountingEmail)}" placeholder="rozliczenia@firma.pl"></label>
          <label class="field"><span>DW</span><input name="cc" value="${esc(s.accountingCc)}"></label>
          <label class="field"><span>Temat</span>
            <div class="copy-row"><textarea name="subject" rows="2" readonly class="subject">${esc(subject)}</textarea><button type="button" class="btn btn-ghost btn-sm" data-copy="subject">Kopiuj</button></div></label>
          <label class="field"><span>Treść</span><textarea name="body" rows="14">${esc(body)}</textarea>
            <button type="button" class="btn btn-ghost btn-sm copy-body" data-copy="body">Kopiuj treść</button></label>
          <div class="attach"><svg class="ico"><use href="#i-doc"/></svg><span>${esc(fileName)}</span></div>
          <div class="actions wrap mail-actions">
            <button type="submit" class="btn btn-primary btn-big" id="send-mail" disabled><svg class="ico"><use href="#i-send"/></svg> Wyślij e-mail z PDF</button>
            <button type="button" class="btn" id="mailto" disabled hidden>Otwórz program pocztowy (bez załącznika)</button>
            ${s.webhookUrl ? `<button type="button" class="btn" id="send-api" disabled>Wyślij automatycznie (API)</button>` : ''}
            ${r.status !== 'sent' ? `<button type="button" class="btn btn-ghost" id="mark-sent">Oznacz jako wysłany</button>` : ''}
          </div>
          <p class="hint" id="mail-hint"></p>
        </form>
      </section>
    </div>
    ${next ? `<a class="cta" href="#/receipt/${next.id}"><svg class="ico"><use href="#i-check"/></svg><span><b>Następny paragon do weryfikacji</b><br><small>Pozostało: ${state.receipts.filter(o => o.status === 'to_verify' || o.status === 'error').length}</small></span><svg class="ico"><use href="#i-chevron"/></svg></a>` : ''}`;

  const form = $('#mform');
  const hint = $('#mail-hint');
  const canShareFiles = !!navigator.canShare && (() => { try { return navigator.canShare({ files: [new File(['x'], 'x.pdf', { type: 'application/pdf' })] }); } catch { return false; } })();
  // Link mailto: nie potrafi przenieść załącznika (ograniczenie systemów), dlatego na urządzeniach
  // z udostępnianiem plików e-mail z PDF-em tworzymy przez systemowe menu udostępniania.
  $('#mailto').hidden = canShareFiles;
  hint.innerHTML = canShareFiles
    ? 'Po naciśnięciu <b>Wyślij e-mail z PDF</b> wybierz aplikację <b>Mail</b> (lub Gmail/Outlook) – PDF zostanie dołączony, a treść wklejona. Temat kopiujemy do schowka: jeśli pole „Temat” będzie puste, wklej go. Adres działu rozliczeń wpisz w polu „Do”.'
    : 'Ta przeglądarka nie obsługuje wysyłania plików do aplikacji pocztowej. <b>Wyślij e-mail z PDF</b> pobierze plik PDF i otworzy program pocztowy z adresem, tematem i treścią – <b>dołącz pobrany PDF</b> do wiadomości.';

  let pdfBlob;
  try {
    const bytes = await buildSettlementPdf(r, await db.getImage(r.imageId), s);
    if (!form.isConnected) return; // użytkownik opuścił ekran w trakcie generowania
    pdfBlob = new Blob([bytes], { type: 'application/pdf' });
    $('#pdf-size').textContent = `${(pdfBlob.size / 1024).toFixed(0)} KB`;
    $$('#pdf-dl, #pdf-open, #send-mail, #mailto, #send-api').forEach(b => { b.disabled = false; });
    try {
      const canvas = await renderPdfPage(bytes, 1400);
      if (!form.isConnected) return;
      canvas.className = 'pdf-canvas';
      $('#pdf-preview').replaceChildren(canvas);
    } catch (e) {
      console.warn('Podgląd PDF niedostępny', e);
      $('#pdf-preview').innerHTML = '<p class="muted">Podgląd niedostępny – użyj „Otwórz”.</p>';
    }
  } catch (e) {
    console.error(e);
    if (form.isConnected) $('#pdf-preview').innerHTML = `<div class="notice error">Nie udało się wygenerować PDF: ${esc(e.message)}</div>`;
    return;
  }
  const pdfFile = new File([pdfBlob], fileName, { type: 'application/pdf' });
  const values = () => Object.fromEntries(new FormData(form).entries());
  const rememberRecipients = async () => {
    const v = values();
    if (v.to !== s.accountingEmail || v.cc !== s.accountingCc) {
      state.settings = { ...state.settings, accountingEmail: v.to.trim(), accountingCc: v.cc.trim() };
      await db.saveSettings(state.settings);
    }
  };
  const openMailto = () => {
    const v = values();
    const q = new URLSearchParams();
    if (v.cc) q.set('cc', v.cc);
    q.set('subject', v.subject);
    q.set('body', v.body);
    download(fileName, pdfBlob);
    setTimeout(() => { location.href = `mailto:${encodeURIComponent(v.to).replace(/%40/g, '@').replace(/%2C/g, ',')}?${q.toString().replace(/\+/g, '%20')}`; }, 400);
  };

  $('#pdf-dl').addEventListener('click', () => download(fileName, pdfBlob));
  $('#pdf-open').addEventListener('click', () => window.open(URL.createObjectURL(pdfBlob), '_blank'));
  $$('[data-copy]').forEach(b => b.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(form.elements[b.dataset.copy].value); toast('Skopiowano.'); } catch { form.elements[b.dataset.copy].select(); }
  }));

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const v = values();
    if (canShareFiles) {
      // Ważne: navigator.share musi zostać wywołane od razu po kliknięciu – bez wcześniejszego await
      // (Safari na iPhonie odrzuca udostępnianie, jeśli wcześniej czekamy np. na zapis do bazy).
      navigator.clipboard?.writeText(v.subject).catch(() => {});
      const sharing = navigator.share({ files: [pdfFile], title: v.subject, text: v.body });
      rememberRecipients();
      try {
        await sharing;
        showSentConfirm(v.to);
      } catch (err) {
        if (err.name === 'AbortError') return;
        console.warn('Udostępnianie nieudane', err);
        toast(`Nie udało się otworzyć udostępniania (${err.message}). Pobierz PDF i dołącz go ręcznie.`, 'error');
      }
      return;
    }
    await rememberRecipients();
    openMailto();
    showSentConfirm(v.to);
  });
  $('#mailto').addEventListener('click', async () => {
    if (!form.reportValidity()) return;
    await rememberRecipients();
    openMailto();
    showSentConfirm(values().to);
  });
  $('#mark-sent')?.addEventListener('click', () => markSent(id, `E-mail: ${values().to || 'ręcznie'}`));
  $('#send-api')?.addEventListener('click', async e => {
    if (!form.reportValidity()) return;
    await rememberRecipients();
    const btn = e.currentTarget;
    btn.disabled = true;
    try {
      const v = values();
      const res = await fetch(s.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(s.webhookToken ? { Authorization: `Bearer ${s.webhookToken}` } : {}) },
        body: JSON.stringify({
          source: 'SmartPocket', type: 'parking-settlement-email', sentAt: new Date().toISOString(), ...employeeInfo(),
          email: { to: v.to, cc: v.cc || null, subject: v.subject, body: v.body },
          attachment: { fileName, contentType: 'application/pdf', base64: (await blobToDataURL(pdfBlob)).split(',')[1] },
          receipt: payloadFor(r),
        }),
      });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      await markSent(id, `API: ${v.to}`);
    } catch (err) {
      toast(`Wysyłka przez API nieudana: ${err.message}`, 'error');
    } finally { btn.disabled = false; }
  });

  function showSentConfirm(to) {
    hint.innerHTML = `Po wysłaniu wiadomości z PDF-em potwierdź: <button type="button" class="btn btn-sm btn-primary" id="confirm-sent">Wiadomość wysłana</button>`;
    $('#confirm-sent').addEventListener('click', () => markSent(id, `E-mail: ${to}`));
  }
}

async function markSent(id, target) {
  const r = await db.getReceipt(id);
  const at = new Date().toISOString();
  r.status = 'sent';
  r.batch = { id: uid(), at, target };
  r.history.push({ at, action: `Wysłano do działu rozliczeń (${target})` });
  await db.putReceipt(r);
  toast('Wysłano do działu rozliczeń ✓');
  await refresh();
  renderMail(id);
}

// ---------- Wysyłka do systemu ----------
function renderSend() {
  const approved = state.receipts.filter(r => r.status === 'approved');
  const sent = state.receipts.filter(r => r.status === 'sent');
  const batches = {};
  sent.forEach(r => { if (r.batch) (batches[r.batch.id] ||= { ...r.batch, items: [] }).items.push(r); });
  const s = state.settings;
  const target = s.webhookUrl ? `system firmowy (${esc(new URL(s.webhookUrl).host)})` : 'paczka ZIP (CSV + JSON + zdjęcia) do pobrania / udostępnienia';

  view.innerHTML = `
    <div class="page-head"><h1>Przesyłanie do systemu</h1></div>
    <ol class="flow">
      <li class="done">Zdjęcie / wgranie</li><li class="done">Odczyt przez robota</li><li class="done">Weryfikacja i zatwierdzenie</li><li class="now">Przesłanie do systemu</li>
    </ol>
    <section class="card">
      <div class="card-head"><h2>Zatwierdzone – gotowe do wysłania</h2><span class="muted">${approved.length} · ${money(sum(approved))}</span></div>
      ${approved.length ? `
        <label class="sel-all"><input type="checkbox" id="send-all" checked> Zaznacz wszystkie</label>
        <ul class="rlist compact">${approved.map(r => `<li class="row"><label class="row-check"><input type="checkbox" data-send="${r.id}" checked></label>
          <a class="row-link" href="#/mail/${r.id}" title="PDF i e-mail do działu rozliczeń"><img class="thumb" src="${r.thumb}" alt="">
          <div class="row-main"><div class="row-top"><b>${fmtDate(r.fields.date)}</b> <span class="muted">${esc(timeRange(r.fields))}</span></div>
          <div class="row-sub">${esc(r.fields.location || r.fields.operator || '')}${r.fields.city ? `, ${esc(r.fields.city)}` : ''}</div></div>
          <div class="row-amount">${money(r.fields.amount, r.fields.currency)}<br><small class="link">E-mail ›</small></div></a></li>`).join('')}</ul>
        <p class="muted small">Cel: ${target}. <a href="#/settings">Zmień</a></p>
        <div class="actions">
          <button class="btn btn-primary btn-big" id="do-send"><svg class="ico"><use href="#i-send"/></svg> Prześlij do systemu</button>
        </div>` : `<div class="empty"><p>Brak zatwierdzonych dokumentów. Zweryfikuj odczyty na liście paragonów.</p><a class="btn" href="#/receipts">Przejdź do listy</a></div>`}
    </section>
    <section class="card">
      <div class="card-head"><h2>Historia wysyłek</h2></div>
      ${Object.values(batches).length ? `<ul class="batches">${Object.values(batches).sort((a, b) => b.at.localeCompare(a.at)).map(b => `
        <li><div><b>${new Date(b.at).toLocaleString('pl-PL')}</b><br><span class="muted small">${b.items.length} dok. · ${esc(b.target)}</span></div>
        <div class="row-amount">${money(sum(b.items))}</div>
        <button class="btn btn-ghost btn-sm" data-rezip="${b.id}" title="Pobierz ponownie paczkę"><svg class="ico"><use href="#i-download"/></svg></button></li>`).join('')}</ul>`
        : '<p class="muted">Jeszcze nic nie wysłano.</p>'}
    </section>`;

  $('#send-all')?.addEventListener('change', e => $$('[data-send]').forEach(cb => { cb.checked = e.target.checked; }));
  $('#do-send')?.addEventListener('click', async e => {
    const ids = $$('[data-send]').filter(cb => cb.checked).map(cb => cb.dataset.send);
    if (!ids.length) return toast('Zaznacz dokumenty do wysłania.', 'warn');
    const btn = e.currentTarget;
    btn.disabled = true;
    try { await sendBatch(ids); } catch (err) { toast(`Błąd wysyłki: ${err.message}`, 'error'); } finally { btn.disabled = false; }
  });
  $$('[data-rezip]').forEach(b => b.addEventListener('click', () => {
    const items = batches[b.dataset.rezip].items;
    buildPackage(items, batches[b.dataset.rezip]).then(({ zip, name }) => download(name, zip));
  }));
}

function payloadFor(r) {
  const { purpose, notes, ...rest } = r.fields;
  return { id: r.id, ...rest, purpose: purpose || null, notes: notes || null, category: 'Parkowanie – samochód służbowy', ocrEngine: r.ocr?.engine || null };
}

function employeeInfo() {
  const s = state.settings;
  return { employee: s.employee, employeeId: s.employeeId, company: s.company, department: s.department, costCenter: s.costCenter, vehicle: { plate: s.defaultPlate, model: s.carModel } };
}

async function loadJSZip() {
  if (window.JSZip) return window.JSZip;
  await new Promise((res, rej) => {
    const sc = document.createElement('script');
    sc.src = JSZIP_URL; sc.onload = res; sc.onerror = () => rej(new Error('Nie udało się pobrać biblioteki ZIP.'));
    document.head.appendChild(sc);
  });
  return window.JSZip;
}

async function buildPackage(items, batch) {
  const JSZip = await loadJSZip();
  const zip = new JSZip();
  const sorted = [...items].sort((a, b) => `${a.fields.date}${a.fields.startTime}`.localeCompare(`${b.fields.date}${b.fields.startTime}`));
  zip.file('zestawienie.csv', toCSV(sorted));
  zip.file('dane.json', JSON.stringify({ batchId: batch.id, createdAt: batch.at, ...employeeInfo(), total: sum(sorted), receipts: sorted.map(payloadFor) }, null, 2));
  const folder = zip.folder('paragony');
  let i = 1;
  for (const r of sorted) {
    const blob = await db.getImage(r.imageId);
    if (blob) folder.file(`${String(i).padStart(3, '0')}_${r.fields.date || 'bez-daty'}_${r.fields.amount != null ? (+r.fields.amount).toFixed(2).replace('.', ',') : 'brak'}zl.jpg`, blob);
    i++;
  }
  const name = `SmartPocket_parkowanie_${batch.at.slice(0, 10)}_${batch.id.slice(0, 6)}.zip`;
  return { zip: await zip.generateAsync({ type: 'blob' }), name };
}

async function sendBatch(ids) {
  const items = (await Promise.all(ids.map(id => db.getReceipt(id)))).filter(Boolean);
  const s = state.settings;
  const batch = { id: uid(), at: new Date().toISOString(), target: s.webhookUrl ? new URL(s.webhookUrl).host : 'Paczka ZIP' };

  if (s.webhookUrl) {
    toast('Wysyłanie do systemu…');
    const receipts = [];
    for (const r of items) {
      const p = payloadFor(r);
      if (s.sendImages) { const b = await db.getImage(r.imageId); if (b) p.image = await blobToDataURL(b); }
      receipts.push(p);
    }
    const res = await fetch(s.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(s.webhookToken ? { Authorization: `Bearer ${s.webhookToken}` } : {}) },
      body: JSON.stringify({ source: 'SmartPocket', batchId: batch.id, sentAt: batch.at, ...employeeInfo(), total: sum(items), count: items.length, receipts }),
    }).catch(e => ({ ok: false, statusText: e.message }));
    if (!res.ok) { toast(`Wysyłka nieudana: ${res.status || ''} ${res.statusText || ''}. Dokumenty pozostają zatwierdzone.`, 'error'); return; }
  } else {
    toast('Przygotowywanie paczki…');
    const { zip, name } = await buildPackage(items, batch);
    const file = new File([zip], name, { type: 'application/zip' });
    let shared = false;
    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: 'Rozliczenie parkowania – SmartPocket', text: `${items.length} paragonów, suma ${money(sum(items))}` });
        shared = true;
      } catch (e) { if (e.name === 'AbortError') return; }
    }
    if (!shared) download(name, zip);
  }
  for (const r of items) {
    r.status = 'sent';
    r.batch = batch;
    r.history.push({ at: batch.at, action: `Przesłano do systemu (${batch.target})` });
    await db.putReceipt(r);
  }
  toast(`Przesłano ${items.length} ${plural(items.length, 'dokument', 'dokumenty', 'dokumentów')} ✓`);
}

// ---------- Raport miesięczny ----------
function renderReport(ym) {
  const list = state.receipts.filter(r => receiptMonth(r) === ym && r.status !== 'error' && r.status !== 'processing')
    .sort((a, b) => `${a.fields.date}${a.fields.startTime}`.localeCompare(`${b.fields.date}${b.fields.startTime}`));
  const s = state.settings;
  const byCity = {};
  list.forEach(r => { const k = r.fields.city || 'inne'; byCity[k] = (byCity[k] || 0) + (+r.fields.amount || 0); });
  const pending = list.filter(r => r.status === 'to_verify').length;

  view.innerHTML = `
    <div class="page-head no-print">
      <a href="#/receipts" class="btn btn-ghost btn-sm"><svg class="ico"><use href="#i-back"/></svg> Wróć</a>
      <span class="spacer"></span>
      <button class="btn btn-sm" id="r-csv"><svg class="ico"><use href="#i-download"/></svg> CSV</button>
      <button class="btn btn-primary btn-sm" onclick="window.print()"><svg class="ico"><use href="#i-print"/></svg> Drukuj / PDF</button>
    </div>
    ${pending ? `<div class="notice warn no-print">${pending} dokument(ów) w tym miesiącu czeka na weryfikację.</div>` : ''}
    <article class="report">
      <header>
        <div><h1>Rozliczenie kosztów parkowania</h1><p>Samochód służbowy · <span class="cap">${esc(monthLabel(ym))}</span></p></div>
        <div class="report-meta">
          <div><span>Pracownik</span><b>${esc(s.employee || '—')}</b>${s.employeeId ? ` <small>(${esc(s.employeeId)})</small>` : ''}</div>
          <div><span>Firma / dział</span><b>${esc([s.company, s.department].filter(Boolean).join(' / ') || '—')}</b></div>
          <div><span>Pojazd</span><b>${esc([s.defaultPlate, s.carModel].filter(Boolean).join(' · ') || '—')}</b></div>
          <div><span>MPK</span><b>${esc(s.costCenter || '—')}</b></div>
        </div>
      </header>
      <table>
        <thead><tr><th>Lp.</th><th>Data</th><th>Godziny</th><th>Czas</th><th>Miejsce</th><th>Operator / nr dok.</th><th>Cel</th><th class="num">VAT</th><th class="num">Brutto</th></tr></thead>
        <tbody>${list.map((r, i) => {
          const f = r.fields;
          return `<tr><td>${i + 1}</td><td>${fmtDate(f.date)}</td><td>${esc(timeRange(f))}</td><td>${fmtDuration(f.durationMin)}</td>
            <td>${esc([f.location, f.city].filter(Boolean).join(', '))}${f.zone ? `<br><small>${esc(f.zone)}</small>` : ''}</td>
            <td>${esc(f.operator || '')}${f.receiptNo ? `<br><small>nr ${esc(f.receiptNo)}</small>` : ''}</td>
            <td>${esc(f.purpose || '')}</td><td class="num">${f.vat ? money(f.vat) : ''}</td><td class="num">${money(f.amount, f.currency)}</td></tr>`;
        }).join('') || '<tr><td colspan="9">Brak dokumentów w tym miesiącu.</td></tr>'}</tbody>
        <tfoot><tr><td colspan="7">Razem (${list.length} dok., ${fmtDuration(list.reduce((a, r) => a + (+r.fields.durationMin || 0), 0))})</td>
          <td class="num">${money(sum(list, 'vat'))}</td><td class="num"><b>${money(sum(list))}</b></td></tr></tfoot>
      </table>
      <div class="report-foot">
        <div><h3>Wg miasta</h3><ul>${Object.entries(byCity).sort((a, b) => b[1] - a[1]).map(([k, v]) => `<li>${esc(k)}: <b>${money(v)}</b></li>`).join('')}</ul></div>
        <div class="sign"><span>Data i podpis pracownika</span></div>
        <div class="sign"><span>Zatwierdził (przełożony)</span></div>
      </div>
      <p class="small muted">Wygenerowano w SmartPocket ${new Date().toLocaleString('pl-PL')}. Oryginały / zdjęcia paragonów w załączeniu.</p>
    </article>`;
  $('#r-csv').addEventListener('click', () => exportCSV(list));
}

// ---------- Ustawienia ----------
function renderSettings() {
  const s = state.settings;
  const inp = (k, label, type = 'text', extra = '') => `<label class="field"><span>${label}</span><input name="${k}" type="${type}" value="${esc(s[k] ?? '')}" ${extra}></label>`;
  view.innerHTML = `
    <div class="page-head"><h1>Ustawienia</h1></div>
    <form id="sform" class="settings">
      <fieldset><legend>Pracownik i pojazd</legend>
        <div class="grid g2">${inp('employee', 'Imię i nazwisko kierowcy *')}${inp('employeeId', 'Nr ewidencyjny')}</div>
        <div class="grid g2">${inp('company', 'Firma')}${inp('department', 'Dział')}</div>
        <div class="grid g3">${inp('defaultPlate', 'Nr rejestracyjny pojazdu *', 'text', 'style="text-transform:uppercase" placeholder="WX 12345"')}${inp('carModel', 'Model auta')}${inp('costCenter', 'MPK / centrum kosztów')}</div>
        <p class="hint">Numer rejestracyjny jest wpisywany automatycznie, jeśli nie zostanie odczytany z dokumentu.</p>
      </fieldset>

      <fieldset><legend>Silnik OCR</legend>
        <label class="radio"><input type="radio" name="ocrEngine" value="local" ${s.ocrEngine !== 'ai' ? 'checked' : ''}>
          <span><b>Lokalny (Tesseract, język polski)</b><br><small>Działa w telefonie, także offline po pierwszym pobraniu modelu (~15 MB). Zdjęcia nie opuszczają urządzenia.</small></span></label>
        <label class="radio"><input type="radio" name="ocrEngine" value="ai" ${s.ocrEngine === 'ai' ? 'checked' : ''}>
          <span><b>AI – Claude (wizja)</b><br><small>Najwyższa dokładność także dla pogniecionych i słabo oświetlonych paragonów. Wymaga klucza API Anthropic; zdjęcie jest wysyłane do API. Przy błędzie automatycznie używany jest OCR lokalny.</small></span></label>
        <div class="grid g2">
          ${inp('apiKey', 'Klucz API Anthropic', 'password', 'placeholder="sk-ant-…" autocomplete="off"')}
          <label class="field"><span>Model</span><select name="aiModel">
            ${[['claude-opus-5', 'Claude Opus 5 (najdokładniejszy)'], ['claude-sonnet-5', 'Claude Sonnet 5 (szybszy, tańszy)'], ['claude-haiku-4-5', 'Claude Haiku 4.5 (najtańszy)']]
              .map(([v, l]) => `<option value="${v}" ${s.aiModel === v ? 'selected' : ''}>${l}</option>`).join('')}</select></label>
        </div>
        <label class="check"><input type="checkbox" name="autoApproveHigh" ${s.autoApproveHigh ? 'checked' : ''}> Automatycznie zatwierdzaj dokumenty, gdy data, godzina i kwota odczytane są z wysoką pewnością</label>
      </fieldset>

      <fieldset><legend>Dział rozliczeń i karta służbowa</legend>
        <div class="grid g2">${inp('accountingEmail', 'E-mail działu rozliczeń', 'email', 'placeholder="rozliczenia@firma.pl"')}${inp('accountingCc', 'DW (opcjonalnie)', 'text', 'placeholder="przelozony@firma.pl"')}</div>
        ${inp('companyCardLast4', 'Ostatnie 4 cyfry karty służbowej', 'text', 'inputmode="numeric" maxlength="4" pattern="\\d{4}" placeholder="4111"')}
        <p class="hint">Gdy na paragonie zostanie odczytana ta karta (np. „****4111”), forma płatności zostanie ustawiona automatycznie na <b>Karta służbowa</b>. W pozostałych przypadkach wybierzesz ją przy zatwierdzaniu.</p>
      </fieldset>

      <fieldset><legend>Przesyłanie do systemu</legend>
        ${inp('webhookUrl', 'Adres API systemu (opcjonalnie)', 'url', 'placeholder="https://erp.firma.pl/api/expenses"')}
        ${inp('webhookToken', 'Token autoryzacji (Bearer)', 'password', 'autocomplete="off"')}
        <label class="check"><input type="checkbox" name="sendImages" ${s.sendImages ? 'checked' : ''}> Dołączaj zdjęcia dokumentów (base64)</label>
        <p class="hint">Bez adresu API „Prześlij do systemu” tworzy paczkę ZIP (zestawienie CSV, dane JSON, zdjęcia), którą można od razu udostępnić e-mailem lub komunikatorem.</p>
      </fieldset>

      <div class="actions"><button class="btn btn-primary" type="submit">Zapisz ustawienia</button></div>
    </form>

    <section class="card">
      <div class="card-head"><h2>Dane i kopia zapasowa</h2></div>
      <p class="muted small">Wszystkie dane są przechowywane wyłącznie na tym urządzeniu (${state.receipts.length} dokumentów). Regularnie wykonuj kopię.</p>
      <div class="actions wrap">
        <button class="btn" id="backup"><svg class="ico"><use href="#i-download"/></svg> Kopia zapasowa (JSON)</button>
        <label class="btn"><svg class="ico"><use href="#i-upload"/></svg> Przywróć z kopii<input type="file" accept="application/json,.json" id="restore" hidden></label>
        <button class="btn" id="csv-all">Eksport wszystkiego (CSV)</button>
        <button class="btn btn-danger" id="wipe">Usuń wszystkie dane</button>
      </div>
      <p class="small muted" id="storage-info"></p>
    </section>`;

  $('#sform').addEventListener('submit', async e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const next = { ...s };
    for (const k of ['employee', 'employeeId', 'company', 'department', 'defaultPlate', 'carModel', 'costCenter', 'ocrEngine', 'apiKey', 'aiModel', 'webhookUrl', 'webhookToken', 'accountingEmail', 'accountingCc', 'companyCardLast4']) next[k] = (fd.get(k) || '').toString().trim();
    next.defaultPlate = next.defaultPlate.toUpperCase();
    next.companyCardLast4 = next.companyCardLast4.replace(/\D/g, '').slice(-4);
    next.autoApproveHigh = fd.get('autoApproveHigh') === 'on';
    next.sendImages = fd.get('sendImages') === 'on';
    if (next.ocrEngine === 'ai' && !next.apiKey) toast('Wybrano OCR AI bez klucza API – używany będzie OCR lokalny.', 'warn');
    await db.saveSettings(next);
    state.settings = next;
    toast('Zapisano ustawienia.');
  });
  $('#backup').addEventListener('click', backup);
  $('#restore').addEventListener('change', e => e.target.files[0] && restore(e.target.files[0]));
  $('#csv-all').addEventListener('click', () => exportCSV(state.receipts.filter(r => r.status !== 'processing')));
  $('#wipe').addEventListener('click', async () => {
    if (!confirm('Usunąć WSZYSTKIE paragony i zdjęcia z tego urządzenia?')) return;
    if (prompt('Wpisz USUŃ, aby potwierdzić') !== 'USUŃ') return;
    await db.clearAll();
    toast('Dane usunięte.');
  });
  navigator.storage?.estimate?.().then(est => {
    $('#storage-info').textContent = `Zajęte miejsce: ${(est.usage / 1048576).toFixed(1)} MB z dostępnych ${(est.quota / 1048576 / 1024).toFixed(1)} GB.`;
  });
}

async function backup() {
  toast('Tworzenie kopii…');
  const receipts = await db.allReceipts();
  const images = {};
  for (const r of receipts) { const b = await db.getImage(r.imageId); if (b) images[r.imageId] = await blobToDataURL(b); }
  const { apiKey, webhookToken, ...safeSettings } = state.settings;
  const data = { app: 'SmartPocket', version: 1, exportedAt: new Date().toISOString(), settings: safeSettings, receipts, images };
  download(`smartpocket-kopia-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(data), 'application/json');
}

async function restore(file) {
  try {
    const data = JSON.parse(await file.text());
    if (data.app !== 'SmartPocket' || !Array.isArray(data.receipts)) throw new Error('To nie jest kopia SmartPocket.');
    const existing = new Set(state.receipts.map(r => r.id));
    let n = 0;
    for (const r of data.receipts) {
      if (existing.has(r.id)) continue;
      if (data.images?.[r.imageId]) await db.putImage(r.imageId, await dataURLToBlob(data.images[r.imageId]));
      if (r.status === 'processing') r.status = 'to_verify';
      await db.putReceipt(r); n++;
    }
    if (data.settings) {
      state.settings = { ...state.settings, ...data.settings, apiKey: state.settings.apiKey, webhookToken: state.settings.webhookToken };
      await db.saveSettings(state.settings);
    }
    toast(`Przywrócono ${n} dokumentów.`);
  } catch (e) { toast(`Błąd przywracania: ${e.message}`, 'error'); }
}

// ============ Toasty ============
function toast(msg, type = 'ok') {
  const el = document.createElement('div');
  el.className = `toast t-${type}`;
  el.textContent = msg;
  $('#toasts').appendChild(el);
  setTimeout(() => el.classList.add('out'), type === 'error' ? 6000 : 3200);
  setTimeout(() => el.remove(), type === 'error' ? 6500 : 3700);
}

// ============ Start ============
async function init() {
  state.settings = await db.getSettings();
  await refresh();

  // Dokumenty przerwane w trakcie OCR (np. zamknięta aplikacja) – wznów przetwarzanie
  state.receipts.filter(r => r.status === 'processing').forEach(r => queue.push(r.id));
  runQueue();

  document.addEventListener('change', e => {
    if (e.target.matches('[data-upload]') && e.target.files.length) { addFiles(e.target.files); e.target.value = ''; }
  });
  // Przeciągnij i upuść / wklej
  document.addEventListener('dragover', e => { e.preventDefault(); document.body.classList.add('dragging'); });
  document.addEventListener('dragleave', e => { if (!e.relatedTarget) document.body.classList.remove('dragging'); });
  document.addEventListener('drop', e => { e.preventDefault(); document.body.classList.remove('dragging'); if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files); });
  document.addEventListener('paste', e => {
    const files = [...(e.clipboardData?.files || [])];
    if (files.length && !e.target.matches('input, textarea')) addFiles(files);
  });
  $('#viewer').addEventListener('click', e => { if (e.target.id === 'viewer' || e.target.closest('[data-close]')) $('#viewer').close(); });

  // Udostępnianie zdjęć z innych aplikacji (Web Share Target) – pliki przekazuje service worker
  if (location.search.includes('shared=1') && 'caches' in window) {
    const cache = await caches.open('smartpocket-share');
    const keys = await cache.keys();
    const files = [];
    for (const k of keys) { const res = await cache.match(k); files.push(new File([await res.blob()], k.url.split('/').pop(), { type: res.headers.get('content-type') || 'image/jpeg' })); await cache.delete(k); }
    history.replaceState(null, '', location.pathname + location.hash);
    if (files.length) addFiles(files);
  }

  let lastRoute = location.hash;
  onChange(async () => {
    await refresh();
    // Nie przerysowuj formularza w trakcie edycji – tylko jeśli zmienił się status bieżącego dokumentu
    const [route, arg] = location.hash.replace(/^#\/?/, '').split('/');
    if (route === 'receipt') {
      const r = state.receipts.find(x => x.id === arg);
      const shown = $('.page-head .badge')?.textContent;
      if (r && STATUS[r.status]?.label !== shown) render();
      return;
    }
    if (route === 'settings' || route === 'report' || route === 'mail') return;
    render();
  });
  window.addEventListener('hashchange', () => { if (location.hash !== lastRoute) { lastRoute = location.hash; render(); } });
  render();

  if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('sw.js').catch(() => {});
}

init().catch(e => { console.error(e); view.innerHTML = `<div class="notice error">Błąd uruchamiania: ${esc(e.message)}</div>`; });
