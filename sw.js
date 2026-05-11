var CACHE_NAME = 'afrinova-v2';
var urlsToCache = [
    '/afrinova-site/',
    '/afrinova-site/index.html',
    '/afrinova-site/assets/css/style.css',
    '/afrinova-site/assets/js/main.js',
    '/afrinova-site/assets/images/logo.png'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request).catch(function() {
                if (event.request.mode === 'navigate') {
                    return caches.match('/afrinova-site/index.html');
                }
            });
        })
    );
});
