const filesToCache = [
  '/',
  '/?lid=fd0cf8aa-27dd-4499-aa98-db6e666edbb6',
  '/arquivos/ids/169248/qdb_c10_1_BASE-AQUA-HIDRATANTE.jpg',
  '/arquivos/QA-QDBCommon-general.css',
  '/arquivos/QA-QDBCommon-general.js',
  '/arquivos/QA-QDBCommon-Home.css',
  '/arquivos/QA-QDBCommon-Home.js',
  'https://unpkg.com/react@16/umd/react.production.min.js',
  'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js'
];

const staticCacheName = 'pages-cache-v1';

self.addEventListener('install', event => {
  console.log('%cAttempting to install service worker and cache static assets 🕺🕺','font-family:"sans-serif"; padding: 10px; border-radius: 5px; background:#FCBE53; color: #FDFDFD;');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});
  
self.addEventListener('activate', event => {
  console.log('%cService worker active! 😎', 'font-family:"sans-serif"; padding: 10px; border-radius: 5px; background:#259FC4; color: #FDFDFD;');;
});
  
self.addEventListener('fetch', event => {
  console.log('%cFetch event for ' + event.request.url + ' 🤔', 'font-family:"sans-serif"; padding: 10px; border-radius: 5px; background:#FFE435; color: #FDFDFD;');
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) {
        console.log('%cFound ' + event.request.url + ' in cache 😍', 'font-family:"sans-serif"; padding: 10px; border-radius: 5px; background:#5FCC47; color: #FDFDFD;');
        return response;
      }
      console.log('%cNetwork request for ' + event.request.url + ' 🗺️' , 'font-family:"sans-serif"; padding: 10px; border-radius: 5px; background:#3877ED; color: #FDFDFD;');
      return fetch(event.request)
      .then(function(res) {
        return caches.open(staticCacheName)
          .then(function(cache) {
            cache.put(event.request.url, res.clone());    //save the response for future
            return res;   // return the fetched data
          })
      })
      .catch(function(err) {       // fallback mechanism
        return caches.open(CACHE_CONTAINING_ERROR_MESSAGES)
          .then(function(cache) {
            console.log("%cOffline", 'font-family:"sans-serif"; padding: 10px; border-radius: 5px; background:#FFE435; color: #FDFDFD;');
            return cache.match('/files/offline.html');
          });
      });

      // TODO 4 - Add fetched files to the cache

    }).catch(error => {
      console.log(error);
      console.log("%cOffline", 'font-family:"sans-serif"; padding: 10px; border-radius: 5px; background:#FC2626; color: #FDFDFD;');
      // TODO 6 - Respond with custom offline page

    })
  );
});