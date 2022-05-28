import './typeset/typeset-interface.ts';
import './typeset/typeset-workflows.ts';

import { modules } from './worker/worker-modules.ts';
import { streams } from './worker/worker-streams.ts';
import { watcher } from './worker/worker-watcher.ts';

// === Interface

export async function* bundle({ source, output, hosted }: InterfaceOption): InterfaceGenerator {
  // ? bundle once
  yield requestBundle({ source, output, hosted });
}

export async function* stream({ source, output, hosted }: InterfaceOption): InterfaceGenerator {
  // ? bundle once before initializing streams and file watcher
  yield requestBundle({ source, output, hosted });

  // ? steam bundled asset directory
  (async () => {
    for await (const res of streams({ output, hosted })) {
      await ouputStreamsResults({ res });
    }
  })();

  // ? re-bundle on file changes
  for await (const res of watcher({ source })) {
    await ouputWatcherResults({ res });
    yield requestBundle({ source, output, hosted });
  }
}

// === Bundle

async function requestBundle({ source, output, hosted }: InterfaceOption): Promise<{ [prop: string]: any }> {
  let res: any;

  for await (const ste of modules({ source, output, hosted })) {
    res = ste;
  }

  ouputWorkersResults({ res });
  return res;
}

// === Audit

async function ouputWorkersResults({ res }: any): Promise<void> {
  // console.log({ type: 'workers', res });
}

async function ouputStreamsResults({ res }: any): Promise<void> {
  // console.log({ type: 'streams', res });
}

async function ouputWatcherResults({ res }: any): Promise<void> {
  // console.log({ type: 'watcher', res });
}

export default { bundle, stream };
