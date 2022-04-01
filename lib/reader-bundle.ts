import { default as watcher } from './module/watcher.ts';

import { resolve } from 'https://deno.land/std@0.132.0/path/mod.ts';

watcher.connectedCallback({
  source: resolve('./'),
  output: resolve('./.github-pages'),
});

watcher.whenConnected().then(async () => {
  watcher.disconnectedCallback();
});
