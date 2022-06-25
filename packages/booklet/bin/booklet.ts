import { default as workers } from '../mod.ts';

import { snippet } from '../lib/worker/snippet/index.ts';
import { defined } from '../lib/worker/defined/index.ts';

const flagConfig = {
  v: { flag: ['v', 'version'], type: Boolean, caption: 'output version number' },
  h: { flag: ['h', 'help'], type: Boolean, caption: 'output usage information' },

  // p: { flag: ['p'], type: Boolean, caption: 'use repository name as path namespace' },
  b: { flag: ['b', 'bundle'], type: Boolean, caption: 'write bundled assets to the repository docs' },
  // s: { flag: ['s', 'stream'], type: Boolean, caption: 'start a local server for bundled assets' },
  f: { flag: ['f'], type: Boolean, caption: 'force file writes' },
};

Promise.resolve().then(async function (): Promise<void> {
  const flag = await findFlag();
  const path = await findPath();

  const inputs: defined['interface:inputs'] = {
    source: { urn: snippet.path.resolve('./') },
    output: { urn: await Deno.makeTempDir({ prefix: 'booklet-output-' }) },
    stable: { urn: await Deno.makeTempDir({ prefix: 'booklet-stable-' }) },
    hosted: { urn: snippet.path.resolve('./docs/.booklet'), path },
  };

  ensureTempDirectories({ ...inputs });

  if (!('f' in flag)) await confirmWorkingDirectory({ ...inputs });

  if ('v' in flag) await whenOutputVersion().then(() => Deno.exit);
  if ('h' in flag) await whenOutputOptions().then(() => Deno.exit);

  // 📦 initialize bundle or bundle and stream
  const worker = 'b' in flag ? workers.bundle : workers.stream;
  for await (const res of worker({ ...inputs })) {
    // [...]
  }

  Deno.exit();
});

// === Version details and Usage-help

async function whenOutputVersion(): Promise<void> {
  snippet.print.info(`
booklet 0.1.3-experimental
`);
}

async function whenOutputOptions(): Promise<void> {
  snippet.print.info(`
Usage: booklet [options]

Options:
${Object.values(flagConfig) //
  .map((f: any) => `  ${f.flag.map((k: string) => (k.length == 1 ? `-${k}` : `--${k}`)).join(', ')}${' '.repeat(20)}`.slice(0, 22) + f.caption)
  .join('\n')}
`);
}

// === Determine flags and paths

async function findPath(): Promise<string> {
  const repo = await snippet.repo
    .requestConfig() //
    .catch((err: string) => {
      snippet.print.fail('Error:', err.toString().replace('Error: ', ''));
      Deno.exit();
    });

  return repo && !repo.name.endsWith('github.io.git') //
    ? `/${repo.name.replace(/[^a-zA-Z0-9-_]/g, '')}/`.replace(/\/\//g, '/')
    : '/';
}

async function findFlag(): Promise<{ [prop: string]: boolean | string }> {
  return await snippet.flag //
    .resolve({ value: Deno.args, match: flagConfig })
    .catch((err: string) => {
      snippet.print.fail('Error:', err.toString().replace('Error: ', ''));
      Deno.exit();
    });
}

// === Organize directories

async function ensureTempDirectories(inputs: defined['interface:inputs']) {
  const tempRef = await Deno.makeTempDir();
  const tempDir = snippet.path.resolve(tempRef, '../');

  // ? remove any temp directories; when previous run faild to remove them
  Deno.remove(tempRef, { recursive: true });
  for await (const dirEntry of Deno.readDir(tempDir)) {
    if (
      dirEntry.name.includes('booklet-output') || //
      dirEntry.name.includes('booklet-stable')
    ) {
      const urn = snippet.path.resolve(tempDir, `./${dirEntry.name}`);
      if (urn != inputs.output!.urn && urn != inputs.hosted!.urn) {
        Deno.remove(urn, { recursive: true });
      }
    }
  }
}

async function confirmWorkingDirectory(inputs: defined['interface:inputs']) {
  snippet.print.info(`
You are about to initialize the following directories as booklets –

  ${snippet.print.bold(snippet.path.resolve())}

Bundled assets are written to the directories –

  ${snippet.print.bold(inputs.hosted!.urn)}
`);

  // ? abort; in case of wrong working directory
  if (!(await snippet.input.confirm(`Are you ready to proceed?`))) {
    snippet.print.fail('Error:', 'Aborted by user.');
    Deno.exit();
  }
}
