import revmap from './_data/revmap.json';

const toCache = [
  'offline.html',
]

Object.keys(revmap.assets).map((assetType) => {
  Object.values(revmap.assets[assetType]).map(asset => {
    toCache.push(`assets/dist/static/${assetType}/${asset}`);
  })
});

const version = revmap.version;
const staticCacheName = `static-${version}`;

addEventListener('install', event => {
  skipWaiting();

  event.waitUntil(async function () {
    const cache = await caches.open(staticCacheName);
    await cache.addAll(toCache);
  }());
});

addEventListener('activate', event => {
  event.waitUntil(async function () {
    const keys = await caches.keys();
    for (const key of keys) {
      if (key !== staticCacheName) await caches.delete(key);
    }
  }());
})

addEventListener('fetch', event => {

  event.respondWith(async function () {
    const cachedResponse = await caches.match(event.request);

    if (cachedResponse)
      return cachedResponse;

    try {
      return await fetch(event.request);
    } catch (err) {
      return caches.match('offline.html');
    }
  }());
});