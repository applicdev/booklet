import * as path from 'https://deno.land/std@0.132.0/path/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.pattern = {};
internal.pattern = {};

internal.dir = path.dirname(path.fromFileUrl(import.meta.url));
console.log({ ...internal });

fragment.pattern['page:document'] = {
  render: async (params: any) => {
    const plainUrn = path.resolve(internal.dir, './page-document.html');
    console.log('READ', plainUrn);
    const plain = await Deno.readTextFile(plainUrn);
    return plain;
  },
};

fragment.pattern['page:fallback'] = {
  render: async (params: any) => {
    const plainUrn = path.resolve(internal.dir, './page-fallback.html');
    console.log('READ', plainUrn);
    const plain = await Deno.readTextFile(plainUrn);
    return plain;
  },
};

fragment.pattern['pwa-file:service-worker'] = {
  render: ({ page }: any) => `
    const PRECACHE = \`${Date.now()}\`;
    const RUNTIME = 'runtime';

    const PRECACHE_URLS = [
      '/'
    ];

    self.addEventListener('install', event => {
      event.waitUntil(
        caches.open(PRECACHE)
          .then(cache => cache.addAll(PRECACHE_URLS))
          .then(self.skipWaiting())
      );
    });

    self.addEventListener('activate', event => {
      const currentCaches = [PRECACHE, RUNTIME];
      event.waitUntil(
        caches.keys().then(cacheNames => {
          return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
        }).then(cachesToDelete => {
          return Promise.all(cachesToDelete.map(cacheToDelete => {
            return caches.delete(cacheToDelete);
          }));
        }).then(() => self.clients.claim())
      );
    });

    self.addEventListener('fetch', event => {
      if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(
          caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }

            return caches.open(RUNTIME).then(cache => {
              return fetch(event.request).then(response => {
                return cache.put(event.request, response.clone()).then(() => {
                  return response;
                });
              });
            });
          })
        );
      }
    });
  `,
};

fragment.pattern['pwa-file:webmanifest'] = {
  render: ({ page }: any) => `
  
  `,
};

fragment.pattern['pwa-file:sitemap'] = {
  render: ({ page }: any) => `
  
  `,
};

internal.pattern['service-worker:install'] = {
  render: ({ page }: any) => `
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js');
    }
  `,
};

export default { ...fragment.pattern };
