import { snippet } from './lib/worker/snippet/index.ts';
import { defined } from './lib/worker/defined/index.ts';

import { bundler } from './lib/worker/worker-bundler.ts';
import { streams } from './lib/worker/worker-streams.ts';
import { watcher } from './lib/worker/worker-watcher.ts';

// === Interface

export async function* bundle(inputs: defined['interface:inputs']): defined['bundler*'] {
  // 📦 ensure correct property values and apply standard; when required
  const option: defined['interface:option'] = await filter(inputs);

  // 📦 fetch stable assets
  await requestAssets({ ...option });

  // ? stream bundled asset directory
  await requestStream({ ...option });

  // 📦 bundle once
  await requestBundle({ ...option });

  Deno.exit();
}

export async function* stream(inputs: defined['interface:inputs']): defined['bundler*'] {
  // 📦 ensure correct property values and apply standard; when required
  const option: defined['interface:option'] = await filter(inputs);
  const { source, output, hosted, module } = option;

  // 📦 fetch stable assets
  await requestAssets({ ...option });

  // ? stream bundled asset directory
  await requestStream({ ...option });

  // 📦 bundle once before initializing watcher
  await requestBundle({ ...option });

  // 📦 re-bundle on file changes
  for await (const res of watcher({ ...option })) {
    await ouputWatcherResults({ res });
    await requestBundle({ ...option });
  }
}

// === Input -> Option

async function filter(inputs: defined['interface:inputs']): Promise<defined['interface:option']> {
  // const module = { urn: snippet.path.dirname(snippet.path.fromFileUrl(import.meta.url)) };
  const module = { urn: snippet.path.resolve(inputs.stable!.urn, './') };

  return { ...(inputs as defined['interface:option']), module };
}

// === Stable assets

async function requestAssets({ ...option }: defined['interface:option']): Promise<void> {
  const des = { urn: snippet.path.resolve(option.stable.urn, './') };

  await snippet.file.emptyDir(des.urn);
  console.log('');
  await Deno.run({
    cmd: ['git', 'clone', 'https://github.com/applicdev/booklet.git', des.urn],
    // stdout: 'piped',
    // stderr: 'piped',
  }).status();
}

// === Stream

async function requestStream({ ...option }: defined['streams:option']): Promise<void> {
  (async () => {
    for await (const res of streams({ ...option })) {
      await ouputStreamsResults({ res });
    }
  })();
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
  // console.log({ type: 'runners', res });
}

async function ouputStreamsResults({ res }: any): Promise<void> {
  // console.log({ type: 'streams', res });
}

async function ouputWatcherResults({ res }: any): Promise<void> {
  // console.log({ type: 'watcher', res });
}

export default { bundle, stream };
