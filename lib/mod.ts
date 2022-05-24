import './typeset/typeset-interface.ts';
import './typeset/typeset-workflows.ts';

import { modules } from './worker/worker-modules.ts';
import { streams } from './worker/worker-streams.ts';
import { watcher } from './worker/worker-watcher.ts';

async function whenBundle({ source, output, hosted }: InterfaceOption): Promise<{}> {
  const mod = modules({ source, output, hosted });

  for await (const res of mod) {
    console.log({ type: 'modules', res });
  }

  return {};
}

export async function* bundle({ source, output, hosted }: InterfaceOption): InterfaceGenerator {
  yield await whenBundle({ source, output, hosted });
}

export async function* stream({ source, output, hosted }: InterfaceOption): InterfaceGenerator {
  (async () => {
    for await (const res of streams({ output, hosted })) {
      console.log({ type: 'streams', res });
    }
  })();

  for await (const res of watcher({ source })) {
    console.log({ type: 'watcher', res });

    yield await whenBundle({ source, output, hosted });
  }
}

export default { bundle, stream };

// watcher.connectedCallback({ source, output, hosted });
// watcher.whenConnected().then(async () => {
//   streams.connectedCallback({ source, output, hosted });

//   // ---
//   // FIXME: find a better implementation; disconnected has to run before deno close
//   // globalThis.addEventListener('unload', async () => {
//   //   await streams.disconnectedCallback();
//   //   await watcher.disconnectedCallback();
//   // });
//   // ---
// });
