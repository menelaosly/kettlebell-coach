/* Kettlebell Coach service worker: works offline, refreshes in the background. Bump VERSION after editing index.html. */
const VERSION = "kb-coach-v1";
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./icons/icon.svg", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-maskable-512.png", "./icons/apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
function refresh(cache, req, key) {
  return fetch(req).then(res => {
    if (res && (res.ok || res.type === "opaque")) cache.put(key || req, res.clone());
    return res;
  });
}
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (req.mode === "navigate") {
    e.respondWith(caches.open(VERSION).then(async c => {
      const hit = await c.match("./index.html");
      const net = refresh(c, req, "./index.html").catch(() => hit);
      return hit || net;
    }));
    return;
  }
  const fonts = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  if (url.origin !== location.origin && !fonts) return;
  e.respondWith(caches.open(VERSION).then(async c => {
    const hit = await c.match(req);
    const net = refresh(c, req).catch(() => hit);
    return hit || net;
  }));
});
