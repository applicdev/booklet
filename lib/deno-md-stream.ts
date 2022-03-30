import { default as watcher } from './module/watcher.ts';
import { default as streams } from './module/streams.ts';

import { resolve } from 'https://deno.land/std@0.132.0/path/mod.ts';

watcher.connectedCallback({
  option: {
    source: resolve('./'),
    public: resolve('./.github/gh-pages'),
  },
});

watcher.whenConnected().then(async () => {
  streams.connectedCallback({
    option: {
      public: resolve('./.github/gh-pages'),
    },
  });

  // streams.disconnectedCallback();
  // watcher.disconnectedCallback();
});
