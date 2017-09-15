'use strict';

var version$1 = "96e9b66ec07577114a593e298a44482c";
var assets = {"css":{"main.css":"main-c218a88cac.css"},"images":{"logo.png":"logo-85c8544418.png","me.jpg":"me-7277c38d00.jpg","xkcd.png":"xkcd-5dd975e045.png"}};
var revmap = {
	version: version$1,
	assets: assets
};

const toCache = [
  'offline.html',
];

Object.keys(revmap.assets).map((assetType) => {
  Object.values(revmap.assets[assetType]).map(asset => {
    toCache.push(`assets/dist/static/${assetType}/${asset}`);
  });
});

const version$$1 = revmap.version;
const staticCacheName = `static-${version$$1}`;

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
});

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
