import './worker/typeset/typeset-interface.ts';
import './worker/typeset/typeset-workflows.ts';

import { bundler } from './worker/worker-bundler.ts';
import { streams } from './worker/worker-streams.ts';
import { watcher } from './worker/worker-watcher.ts';

// === Interface

export async function* bundle({ source, output, hosted }: InterfaceOption): InterfaceGenerator {
  // ? stream bundled asset directory
  await requestStream({ source, output, hosted });

  // ? bundle once
  yield requestBundle({ source, output, hosted });
}

export async function* stream({ source, output, hosted }: InterfaceOption): InterfaceGenerator {
  // ? stream bundled asset directory
  await requestStream({ source, output, hosted });

  // ? bundle once before initializing watcher
  yield requestBundle({ source, output, hosted });

  // ? re-bundle on file changes
  for await (const res of watcher({ source, output, hosted })) {
    await ouputWatcherResults({ res });
    yield requestBundle({ source, output, hosted });
  }
}

// === Stream

async function requestStream({ source, output, hosted }: InterfaceOption): Promise<void> {
  (async () => {
    for await (const res of streams({ output, hosted })) {
      await ouputStreamsResults({ res });
    }
  })();

  return new Promise((res) => setTimeout(res, 500));
}

// === Bundle

async function requestBundle({ source, output, hosted }: InterfaceOption): Promise<{ [prop: string]: any }> {
  let res: any;

  for await (const ste of bundler({ source, output, hosted })) {
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
