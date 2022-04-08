import { default as watcher } from './module/watcher.ts';

export function initialize({ source, output }: { source: string; output: string }): void {
  watcher.connectedCallback({ source, output, listen: false });

  watcher.whenConnected().then(async () => {
    await watcher.disconnectedCallback();

    Deno.exit();
  });
}
