// Definisce il nome della cache e i file da salvare
const CACHE_NAME = 'progressive-load-calculator-v1';
const urlsToCache = [
  '/',
  '/index.html',
  // Aggiungi qui i percorsi alle tue icone se le hai
  // '/icon-192x192.png',
  // '/icon-512x512.png'
];

// Evento 'install': viene eseguito quando il service worker viene installato
self.addEventListener('install', event => {
  // Aspetta che la cache sia aperta e che tutti i file siano stati aggiunti
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aperta');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento 'fetch': intercetta le richieste di rete
self.addEventListener('fetch', event => {
  event.respondWith(
    // Cerca la risorsa nella cache
    caches.match(event.request)
      .then(response => {
        // Se la risorsa è nella cache, la restituisce
        if (response) {
          return response;
        }
        // Altrimenti, esegue la richiesta di rete originale
        return fetch(event.request);
      }
    )
  );
});

// Evento 'activate': pulisce le vecchie cache
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
