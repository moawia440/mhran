const CACHE_NAME = "school-shop-v1";
const ASSETS = [
  "./",
  "./school.html",
  "./checkout.html",
  "./style.css",
  "./manifest.webmanifest",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  // أضف صور منتجاتك هنا لو تحب تتكاش
  // "./assets/p1.jpg",
  // "./assets/p2.jpg",
  // "./assets/p3.jpg",
  // "./assets/p4.jpg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((resp) => {
        // Cache same-origin GET requests
        try {
          const url = new URL(event.request.url);
          if (
            event.request.method === "GET" &&
            url.origin === location.origin
          ) {
            const clone = resp.clone();
            caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(event.request, clone));
          }
        } catch (_) {}
        return resp;
      });
    }),
  );
});
