import { snippet } from './worker/snippet/index.ts';
import { defined } from './worker/defined/index.ts';

import { bundler } from './worker/worker-bundler.ts';
import { streams } from './worker/worker-streams.ts';
import { watcher } from './worker/worker-watcher.ts';

// === Interface

export async function* bundle(inputs: defined['interface:inputs']): defined['bundler*'] {
  // 📦 ensure correct property values and apply standard; when required
  const option: defined['interface:option'] = await filter(inputs);
  const { source, output, hosted, module } = option;

  // 📦 bundle once
  requestBundle({ source, output, hosted, module });
}

export async function* stream(inputs: defined['interface:inputs']): defined['bundler*'] {
  // 📦 ensure correct property values and apply standard; when required
  const option: defined['interface:option'] = await filter(inputs);
  const { source, output, hosted, module } = option;

  // 📦 bundle once before initializing watcher
  requestBundle({ source, output, hosted, module });

  // ? stream bundled asset directory
  await requestStream({ source, output, hosted, module });

  // 📦 re-bundle on file changes
  for await (const res of watcher({ source, output, hosted, module })) {
    await ouputWatcherResults({ res });
    requestBundle({ source, output, hosted, module });
  }
}

// === Input -> Option

async function filter(inputs: defined['interface:inputs']): Promise<defined['interface:option']> {
  const module = { urn: snippet.path.dirname(snippet.path.fromFileUrl(import.meta.url)) };

  return { ...(inputs as defined['interface:option']), module };
}

// === Stream

async function requestStream({ ...option }: defined['streams:option']): Promise<void> {
  (async () => {
    for await (const res of streams({ ...option })) {
      await ouputStreamsResults({ res });
    }
  })();

  return new Promise((resolve) => setTimeout(() => resolve, 200));
}

// === Bundle

async function requestBundle({ ...option }: defined['bundler:option']): Promise<void> {
  for await (const res of bundler({ ...option })) {
    ouputRunnersResults({ res });
    return;
  }
}

// === Audit

async function ouputRunnersResults({ res }: any): Promise<void> {
  console.log({ type: 'runners', res });
}

async function ouputStreamsResults({ res }: any): Promise<void> {
  console.log({ type: 'streams', res });
}

async function ouputWatcherResults({ res }: any): Promise<void> {
  console.log({ type: 'watcher', res });
}

export default { bundle, stream };
