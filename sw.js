if ('serviceWorker' in navigator) {
  console.log('navigator', navigator);
  navigator.serviceWorker.register('/sw.js').then(function(registration) {
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }).catch(function(err) {
    console.log('ServiceWorker registration failed: ', err);
  });
}

var cacheName = 'shell-content';
var filesToCache = [
  '/',
  '/lib/f7/framework7.material.css',
  '/css/font-awesome.min.css',
  '/css/split-view.css',
  '/lib/angular/angular.min.js',
  '/lib/f7/framework7.min.js',
  '/lib/f7/framework7.material.css',
  '/css/font-awesome.min.css',
  '/js/config.js',
  '/js/services.js',
  '/js/services.js',
  '/js/controllers.js',
  '/lib/angular/ngstorage/ngStorage.min.js',
  '/css/main.css'
];

this.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install event');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      console.log('fetch event');
      return response || fetch(event.request);
    })
  );
});