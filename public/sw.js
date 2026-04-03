const CACHE_NAME = "lecodefashion-v2";

// Assets statiques à pré-cacher
const STATIC_ASSETS = [
  "/",
  "/shop",
  "/profile",
  "/contact",
  "/notifications",
  "/favicon.ico",
  "/globals.css",
  "/images/logo2.png",
  "/images/logo2.png",
];

// Intercepter les requêtes pour images produits Cloudinary
const CLOUDINARY_REGEX = /^https:\/\/res\.cloudinary\.com\/.*$/;

// Installer le SW et pré-cacher les fichiers statiques
self.addEventListener("install", (event) => {
  console.log("[SW] Install event");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activer et nettoyer les anciens caches
self.addEventListener("activate", (event) => {
  console.log("[SW] Activate event");
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Intercepter les requêtes fetch
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Priorité : cache statique
  if (STATIC_ASSETS.includes(new URL(request.url).pathname)) {
    event.respondWith(caches.match(request));
    return;
  }

  // Images Cloudinary
  if (CLOUDINARY_REGEX.test(request.url)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request)
          .then((res) => {
            const resClone = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, resClone));
            return res;
          })
          .catch(() => {
            return new Response(
              "Image indisponible offline",
              { status: 503, statusText: "Offline" }
            );
          });
      })
    );
    return;
  }

  // Pages dynamiques et autres fichiers
  event.respondWith(
    fetch(request)
      .then((res) => {
        // Mettre en cache les réponses valides
        if (res && res.status === 200 && res.type === "basic") {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, resClone));
        }
        return res;
      })
      .catch(() => {
        // fallback offline : si page HTML demandée
        if (request.destination === "document") {
          return caches.match("/") || new Response("Vous êtes offline", { status: 503 });
        }
      })
  );
});