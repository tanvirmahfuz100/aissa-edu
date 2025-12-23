const CACHE_NAME = 'aissa-edu-v1.1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './about.html',
    './contact.html',
    './course_materials.html',
    './publications.html',
    './blog.html',
    './podcast.html',
    './question_bank.html',
    './css/style.css',
    './js/main.js',
    './js/data.js',
    './js/question_data.js',
    './json/podcasts.json',
    './json/resources.json',
    './assets/images/logo.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    // Stale-while-revalidate strategy
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            const fetchPromise = fetch(event.request).then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return networkResponse;
            }).catch(() => {
                // Return cached response if original fetch fails
                return cachedResponse;
            });

            return cachedResponse || fetchPromise;
        })
    );
});
