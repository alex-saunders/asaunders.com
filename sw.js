const version     = require('static-version')();
const toCache     = require('static-assets')();
const shellPaths  = require('static-shell')();
const offlinePath = require('static-offline')();

const staticCacheName = `static-${version}`;

class IdentityStream {
  constructor() {
    let readableController;
    let writableController;

    this.readable = new ReadableStream({
      start(controller) {
        readableController = controller;
      },
      cancel(reason) {
        writableController.error(reason);
      }
    });

    this.writable = new WritableStream({
      start(controller) {
        writableController = controller;
      },
      write(chunk) {
        readableController.enqueue(chunk);
      },
      close() {
        readableController.close();
      },
      abort(reason) {
        readableController.error(reason);
      }
    });
  }
}

async function streamArticle(event, url) {
  const includeUrl = new URL(url);
  includeUrl.pathname = includeUrl.pathname.replace('/post/', '/include/');

  const parts = [
    caches.match(shellPaths.shellStartPath),
    fetch(includeUrl),
    caches.match(shellPaths.shellEndPath)
  ]

  const { readable, writable } = new IdentityStream();
  
  event.waitUntil(async function() {
    for (const responsePromise of parts) {
      const response = await responsePromise;
      await response.body.pipeTo(writable, { preventClose: true });
    }
    writable.getWriter().close();
  }());

  return new Response(readable, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  })
}

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
  const url = new URL(event.request.url);
  event.respondWith(async function () {

    if (url.origin === location.origin && 
        /^\/posts\/\d{4}\/\d{2}\/\d{2}\/[\w-]+\/post\/$/.test(url.pathname)) {
      return streamArticle(event, url);
    }

    const cachedResponse = await caches.match(event.request);

    if (cachedResponse)
      return cachedResponse;

    try {
      return await fetch(event.request);
    } catch (err) {
      return caches.match(offlinePath);
    }
  }());
});