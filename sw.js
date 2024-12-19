const CACHE_NAME = "quote-generator-cache-v1";
const urlsToCache = [
    "./index.html",
    "./style.css",
    "./app.js",
    "./manifest.json",
    "https://zenquotes.io/api/random" // Cache the API response
];

// Install Service Worker
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Opened cache");
            return cache.addAll(urlsToCache);
        })
    );
});

// Fetch Requests
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Serve cached content if available; otherwise, fetch from network
            return response || fetch(event.request);
        })
    );
});

// Activate Service Worker
self.addEventListener("activate", (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            )
        )
    );
});
