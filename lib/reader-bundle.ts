import { default as watcher } from './module/watcher.ts';

export function initialize({ source, output, hosted }: InterfaceOption): void {
  watcher.connectedCallback({ source, output, hosted });

  watcher.whenConnected().then(async () => {
    await watcher.disconnectedCallback();

    Deno.exit();
  });
}
