import './typeset/typeset-interface.ts';
import './typeset/typeset-workflows.ts';

import { modules } from './worker/worker-modules.ts';
import { streams } from './worker/worker-streams.ts';
import { watcher } from './worker/worker-watcher.ts';

// === Interface

export async function* bundle({ source, output, hosted }: InterfaceOption): InterfaceGenerator {
  // ? bundle once
  yield await requestBundle({ source, output, hosted });
}

export async function* stream({ source, output, hosted }: InterfaceOption): InterfaceGenerator {
  // ? bundle once before initializing streams and file watcher
  yield await requestBundle({ source, output, hosted });

  // ? steam bundled asset directory
  (async () => {
    for await (const res of streams({ output, hosted })) //
      await ouputStreamsResults({ res });
  })();

  // ? re-bundle on file changes
  let [yie, nex]: (null | Promise<{}>)[] = [null, null];
  for await (const res of watcher({ source })) {
    console.log({ yie, nex });

    await ouputWatcherResults({ res });

    // ? skip; when another request is waiting
    if (nex != null) continue;

    // ? re-bundle; when changed during bundle
    if (yie != null) {
      nex = yie;
      await yie;
      nex = null;
    }

    yie = requestBundle({ source, output, hosted });
    yield await yie;
    yie = null;
  }
}

// === Bundle

async function requestBundle({ source, output, hosted }: InterfaceOption): Promise<{}> {
  let bun: any = null;

  for await (const res of modules({ source, output, hosted })) {
    bun = res;
  }

  await ouputModulesResults({ res: bun });
  return bun;
}

// === Audit

async function ouputModulesResults({ res }: any): Promise<void> {
  // console.log({ type: 'modules', res });
}

async function ouputStreamsResults({ res }: any): Promise<void> {
  // console.log({ type: 'streams', res });
}

async function ouputWatcherResults({ res }: any): Promise<void> {
  // console.log({ type: 'watcher', res });
}

export default { bundle, stream };
