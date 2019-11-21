const filesToCache = [
  '/arquivos/ids/169248/qdb_c10_1_BASE-AQUA-HIDRATANTE.jpg',
  '/arquivos/QDBCommon-general-H.css',
  '/arquivos/QDBCommon-General-H.js',
  '/arquivos/QDBCommon-home-H.css',
  '/arquivos/QDBCommon-Home-H.js',
];
  
const staticCache = 'staticCache';
const dynamicCache = 'dynamicCache';

self.addEventListener('install', event => {
  console.log('%cAttempting to install service worker and cache static assets 🕺🕺','font-family:"sans-serif"; padding: 10px; border-radius: 5px; background:#FCBE53; color: #FDFDFD;');
  event.waitUntil(
    caches.open(staticCache)
    .then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});
  
self.addEventListener('activate', event => {
  console.log('%cService worker active! 😎', 'font-family:"sans-serif"; padding: 10px; border-radius: 5px; background:#259FC4; color: #FDFDFD;');;
});
  
self.addEventListener('fetch', event => {
  // console.log('%cFetch event for ' + event.request.url + ' 🤔', 'font-family:"sans-serif"; padding: 10px; border-radius: 5px; background:#FFE435; color: #FDFDFD;');
  event.respondWith(
    fetch(event.request)
    .then(function(res) {
      // console.log('%cNetwork request for ' + event.request.url + ' 🗺️' , 'font-family:"sans-serif"; padding: 10px; border-radius: 5px; background:#3877ED; color: #FDFDFD;');
      return caches.open(dynamicCache)
        .then(function(cache) {
          cache.put(event.request.url, res.clone());    //save the response for future
          return res;   // return the fetched data
        })
    })
    .catch(function() {
      caches.match(event.request)
      .then(response => {
        if (response) {
          // console.log('%cFound ' + event.request.url + ' in cache 😍', 'font-family:"sans-serif"; padding: 10px; border-radius: 5px; background:#5FCC47; color: #FDFDFD;');
          return response;
        }
        // TODO 4 - Add fetched files to the cache

      }).catch(error => {
        console.log(error);
        console.log("%cOffline", 'font-family:"sans-serif"; padding: 10px; border-radius: 5px; background:#FC2626; color: #FDFDFD;');
        // TODO 6 - Respond with custom offline page

      })
    })
  );
});