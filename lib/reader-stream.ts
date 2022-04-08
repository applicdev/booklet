import { default as watcher } from './module/watcher.ts';
import { default as streams } from './module/streams.ts';

export function initialize({ source, output }: { source: string; output: string }): void {
  watcher.connectedCallback({ source, output, listen: true });

  watcher.whenConnected().then(async () => {
    streams.connectedCallback({ output });

    // ---
    // TODO: run disconnected on deno close
    // streams.disconnectedCallback();
    // watcher.disconnectedCallback();
    // ---
  });
}
