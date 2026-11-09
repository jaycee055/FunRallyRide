// FunRallyRide offline support: keeps the app shell available; live data still needs internet.
const CACHE = 'funrallyride-v4';
const CORE = ['./', 'index.html', 'manifest.webmanifest', 'privacy.html', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/favicon.png',
  'https://cdn.jsdelivr.net/npm/maplibre-gl@4.7.1/dist/maplibre-gl.css',
  'https://cdn.jsdelivr.net/npm/maplibre-gl@4.7.1/dist/maplibre-gl.js',
  'https://cdn.jsdelivr.net/npm/firebase@10.14.1/firebase-app-compat.js',
  'https://cdn.jsdelivr.net/npm/firebase@10.14.1/firebase-auth-compat.js',
  'https://cdn.jsdelivr.net/npm/firebase@10.14.1/firebase-database-compat.js'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => Promise.all(CORE.map(u => c.add(u).catch(() => {})))).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // never cache live data, search, routing or map tiles
  if (/firebaseio|firebasedatabase|googleapis\.com\/identitytoolkit|securetoken|nominatim|photon\.komoot|project-osrm|tile\.openstreetmap|arcgisonline/.test(url.href)) return;
  if (req.mode === 'navigate') { // network first for the page so updates arrive immediately
    e.respondWith(fetch(req).then(r => { const cp = r.clone(); caches.open(CACHE).then(c => c.put('index.html', cp)); return r; }).catch(() => caches.match('index.html')));
    return;
  }
  if (url.origin === location.origin || /cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net|fonts\.(googleapis|gstatic)\.com/.test(url.host)) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => { if (r.ok || r.type === 'opaque') { const cp = r.clone(); caches.open(CACHE).then(c => c.put(req, cp)); } return r; })));
  }
});
