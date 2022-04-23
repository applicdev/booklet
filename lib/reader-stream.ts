import './module/typeset/index.ts';

import { default as watcher } from './module/watcher.ts';
import { default as streams } from './module/streams.ts';

export function initialize({ source, output, hosted }: InterfaceOption): void {
  source.listen = true;

  watcher.connectedCallback({ source, output, hosted });

  watcher.whenConnected().then(async () => {
    streams.connectedCallback({ output, hosted });

    // ---
    // FIXME: find a better implementationl; disconnected has to run on deno close
    // streams.disconnectedCallback();
    // watcher.disconnectedCallback();
    // ---
  });
}
