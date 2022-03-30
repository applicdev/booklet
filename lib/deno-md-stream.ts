import { default as watcher } from './module/watcher.ts';
import { default as streams } from './module/streams.ts';

import { resolve } from 'https://deno.land/std@0.132.0/path/mod.ts';

watcher.connectedCallback({
  source: resolve('./'),
  output: resolve('./.github/gh-pages'),
});

watcher.whenConnected().then(async () => {
  streams.connectedCallback({
    output: resolve('./.github/gh-pages'),
  });

  // streams.disconnectedCallback();
  // watcher.disconnectedCallback();
});
