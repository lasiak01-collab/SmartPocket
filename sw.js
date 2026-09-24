// Service worker Smart Pocket: praca offline + odbiór zdjęć udostępnionych z galerii (Web Share Target).
const VERSION = 'sp-v1';
const SHELL = [
  './', 'index.html', 'css/app.css', 'manifest.webmanifest',
  'js/app.js', 'js/db.js', 'js/ocr.js', 'js/parser.js', 'js/utils.js',
  'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png',
];
const CDN = /^https:\/\/(cdn\.jsdelivr\.net|tessdata\.projectnaptha\.com)\//;

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== 'sp-cdn' && k !== 'smartpocket-share').map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  if (e.request.method === 'POST' && url.pathname.endsWith('/share-target')) {
    e.respondWith((async () => {
      const form = await e.request.formData();
      const cache = await caches.open('smartpocket-share');
      let i = 0;
      for (const f of form.getAll('images')) {
        if (typeof f === 'string') continue;
        await cache.put(`shared/${Date.now()}-${i++}-${f.name || 'zdjecie.jpg'}`, new Response(f, { headers: { 'content-type': f.type || 'image/jpeg' } }));
      }
      return Response.redirect('./?shared=1#/receipts', 303);
    })());
    return;
  }
  if (e.request.method !== 'GET') return;

  // Biblioteki z CDN (Tesseract, dane języka, JSZip, SDK): cache-first
  if (CDN.test(e.request.url)) {
    e.respondWith(caches.open('sp-cdn').then(async c => {
      const hit = await c.match(e.request);
      if (hit) return hit;
      const res = await fetch(e.request);
      if (res.ok) c.put(e.request, res.clone());
      return res;
    }));
    return;
  }

  // Pliki aplikacji: najpierw sieć (świeże wersje), offline – cache
  if (url.origin === location.origin) {
    e.respondWith(fetch(e.request).then(res => {
      if (res.ok) caches.open(VERSION).then(c => c.put(e.request, res.clone()));
      return res;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match('index.html'))));
  }
});
