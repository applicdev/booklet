import { default as watcher } from './module/watcher.ts';
import { default as streams } from './module/streams.ts';

export function initialize({ source, output }: { source: string; output: string }): void {
  watcher.connectedCallback({ source, output, listen: true });

  watcher.whenConnected().then(async () => {
    streams.connectedCallback({ output });

    // ---
    // FIXME: find a better implementationl; disconnected has to run on deno close
    // streams.disconnectedCallback();
    // watcher.disconnectedCallback();
    // ---
  });
}
