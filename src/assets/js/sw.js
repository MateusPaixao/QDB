
/*service worker*/
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js');

if (workbox) {

  /*vtex files*/
  workbox.routing.registerRoute(
    new RegExp(".*/arquivos|scripts/.*","ig"),
    new workbox.strategies.CacheFirst({
      cacheName: 'vtex-cache',
    })
  );

  /*css*/
  workbox.routing.registerRoute(
    new RegExp(".*\.(?:css).*"),
    new workbox.strategies.CacheFirst({
      cacheName: 'css-cache',
      plugins: [
        new workbox.expiration.Plugin({
          /* Cache for 7 days.*/
          maxAgeSeconds: 7 * 24 * 60 * 60,
        })
      ]
    })
  );

  /*fonts*/
  workbox.routing.registerRoute(
    new RegExp(".*\.(?:eot|svg|ttf|woff|woff2).*"),
    new workbox.strategies.CacheFirst({
      cacheName: 'font-cache',
      plugins: [
        new workbox.expiration.Plugin({
          /* Cache 365 days */
          //maxAgeSeconds: 365 * 24 * 60 * 60,
          maxAgeSeconds: 365 * 24 * 60 * 60,
        })
      ],
    })
  );

  /* Cache image files */
  workbox.routing.registerRoute(
    new RegExp(".*\.(?:png|jpg|jpeg|svg|gif|webp).*"),
    new workbox.strategies.CacheFirst({
      cacheName: 'image-cache',
      plugins: [
        new workbox.expiration.Plugin({
          /* Cache for 7 days.*/
          maxAgeSeconds: 7 * 24 * 60 * 60,
        })
      ],
    })
  );
}