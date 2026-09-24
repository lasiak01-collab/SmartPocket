// Lokalna baza danych (IndexedDB): paragony, zdjęcia, ustawienia.

const DB_NAME = 'smartpocket';
const DB_VERSION = 1;
let dbPromise;

function open() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains('receipts')) {
        const s = db.createObjectStore('receipts', { keyPath: 'id' });
        s.createIndex('status', 'status');
        s.createIndex('createdAt', 'createdAt');
      }
      if (!db.objectStoreNames.contains('images')) db.createObjectStore('images');
      if (!db.objectStoreNames.contains('settings')) db.createObjectStore('settings');
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
}

function tx(store, mode, fn) {
  return open().then(db => new Promise((resolve, reject) => {
    const t = db.transaction(store, mode);
    const s = t.objectStore(store);
    let result;
    Promise.resolve(fn(s)).then(r => { result = r; });
    t.oncomplete = () => resolve(result);
    t.onerror = () => reject(t.error);
    t.onabort = () => reject(t.error);
  }));
}

const req2p = r => new Promise((res, rej) => { r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });

export const uid = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`);

export const db = {
  async allReceipts() {
    const list = await tx('receipts', 'readonly', s => req2p(s.getAll()));
    return list.sort((a, b) => sortKey(b).localeCompare(sortKey(a)));
  },
  getReceipt: id => tx('receipts', 'readonly', s => req2p(s.get(id))),
  async putReceipt(r) {
    r.updatedAt = new Date().toISOString();
    await tx('receipts', 'readwrite', s => s.put(r));
    emit();
    return r;
  },
  async deleteReceipt(id) {
    const r = await this.getReceipt(id);
    await tx('receipts', 'readwrite', s => s.delete(id));
    if (r?.imageId) await tx('images', 'readwrite', s => s.delete(r.imageId));
    emit();
  },
  putImage: (id, blob) => tx('images', 'readwrite', s => s.put(blob, id)),
  getImage: id => tx('images', 'readonly', s => req2p(s.get(id))),
  async getSettings() {
    const v = await tx('settings', 'readonly', s => req2p(s.get('main')));
    return { ...DEFAULT_SETTINGS, ...(v || {}) };
  },
  async saveSettings(v) {
    await tx('settings', 'readwrite', s => s.put(v, 'main'));
    emit();
  },
  async clearAll() {
    for (const st of ['receipts', 'images']) await tx(st, 'readwrite', s => s.clear());
    emit();
  },
};

export const DEFAULT_SETTINGS = {
  employee: '',
  employeeId: '',
  company: '',
  department: '',
  costCenter: '',
  defaultPlate: '',
  carModel: '',
  ocrEngine: 'local', // 'local' | 'ai'
  aiModel: 'claude-opus-5',
  apiKey: '',
  webhookUrl: '',
  webhookToken: '',
  sendImages: true,
  autoApproveHigh: false,
  theme: 'auto',
};

function sortKey(r) {
  return `${r.fields?.date || r.createdAt?.slice(0, 10) || ''}T${r.fields?.startTime || ''}|${r.createdAt || ''}`;
}

const listeners = new Set();
export function onChange(fn) { listeners.add(fn); return () => listeners.delete(fn); }
let emitTimer;
function emit() {
  clearTimeout(emitTimer);
  emitTimer = setTimeout(() => listeners.forEach(fn => fn()), 30);
}
