import './typeset/typeset-interface.ts';
import './typeset/typeset-workflows.ts';

// import { default as snippet } from './snippet/index.ts';
import { default as watcher } from './module/interface/interface-watcher.ts';
import { default as streams } from './module/interface/interface-streams.ts';

export async function* bundle({ source, output, hosted }: InterfaceOption): InterfaceGenerator {
  watcher.connectedCallback({ source, output, hosted });
  watcher.whenConnected().then(async () => {
    await watcher.disconnectedCallback();
    Deno.exit();
  });

  yield {};
}

export async function* stream({ source, output, hosted }: InterfaceOption): InterfaceGenerator {
  watcher.connectedCallback({ source, output, hosted });
  watcher.whenConnected().then(async () => {
    streams.connectedCallback({ source, output, hosted });

    // ---
    // FIXME: find a better implementation; disconnected has to run before deno close
    globalThis.addEventListener('unload', async () => {
      await streams.disconnectedCallback();
      await watcher.disconnectedCallback();
    });
    // ---
  });

  yield {};
}

export default { bundle, stream };
