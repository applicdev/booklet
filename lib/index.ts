// import type {} './worker/typeset/typeset-interface.ts';
// import type {} './worker/typeset/typeset-workflows.ts';

import { default as workers } from './mod.ts';
import { default as snippet } from './worker/snippet/index.ts';

const internal: { [prop: string]: any } = {};

internal.flagConfig = {
  v: { flag: ['v', 'version'], type: Boolean, caption: 'output version number' },
  h: { flag: ['h', 'help'], type: Boolean, caption: 'output usage information' },

  s: { flag: ['s', 'stream'], type: Boolean, caption: 'start a local server for bundled assets' },
  b: { flag: ['b', 'bundle'], type: Boolean, caption: 'write bundled assets to the repository workflows' },
  // p: { flag: ['p'], type: Boolean, caption: 'use repository name as path namespace' },
  f: { flag: ['f'], type: Boolean, caption: 'force file writes' },
};

// ? determine flags
internal.flag = await snippet.flag
  .resolve({
    value: Deno.args,
    match: internal.flagConfig,
  })
  .catch((err: string) => {
    snippet.print.fail('Error:', err.toString().replace('Error: ', ''));
    Deno.exit();
  });

// ? determine path offset for gh-pages
internal.path = await (async () => {
  const repo = await snippet.repo
    .requestConfig() //
    .catch((err: string) => {
      snippet.print.fail('Error:', err.toString().replace('Error: ', ''));
      Deno.exit();
    });

  return repo && !repo.name.endsWith('github.io.git') //
    ? `/${repo.name.replace(/[^a-zA-Z0-9-_]/g, '')}/`.replace(/\/\//g, '/')
    : '/';
})();

// ? confirm working directory
if ('v' in internal.flag) {
  const plain = `booklet 0.1.3-experimental`;

  snippet.print.info(plain);
  Deno.exit();
}

// ? confirm working directory
if ('h' in internal.flag) {
  const plain = `
Usage: booklet [options]

Options:
${Object.values(internal.flagConfig) //
  .map((f: any) => `  ${f.flag.map((k: string) => (k.length == 1 ? `-${k}` : `--${k}`)).join(', ')}${' '.repeat(20)}`.slice(0, 22) + f.caption)
  .join('\n')}
`;

  snippet.print.info(plain);
  Deno.exit();
}

// ?
const { source, output, stable, hosted } = {
  source: { urn: snippet.path.resolve('./') },
  output: {
    urn: await Deno.makeTempDir({ prefix: 'booklet-output-' }),
  },
  stable: {
    urn: await Deno.makeTempDir({ prefix: 'booklet-stable-' }),
  },
  hosted: {
    urn: snippet.path.resolve('./docs/.booklet'),
    // 'b' in internal.flag
    //   ? snippet.path.resolve('./docs/.booklet') //
    //   : await Deno.makeTempDir({ prefix: 'booklet-hosted-' }),

    path: internal.path,
  },
};

// ? remove any temp directories; when previous run faild to remove them
const tempRef = await Deno.makeTempDir();
const tempDir = snippet.path.resolve(tempRef, '../');

Deno.remove(tempRef, { recursive: true });
for await (const dirEntry of Deno.readDir(tempDir)) {
  if (
    dirEntry.name.includes('booklet-output') || //
    dirEntry.name.includes('booklet-stable')
  ) {
    const urn = snippet.path.resolve(tempDir, `./${dirEntry.name}`);
    if (urn != output.urn && urn != hosted.urn) {
      Deno.remove(urn, { recursive: true });
    }
  }
}

// ? confirm working directory
if (!('f' in internal.flag)) {
  snippet.print.info(`
You are about to initialize the following directories as booklets –

  ${snippet.print.bold(snippet.path.resolve())}
`);

  // if ('b' in internal.flag)
  snippet.print.info(`Bundled assets are written to the directories –

  ${snippet.print.bold(hosted.urn)}
`);

  // ? abort; in case of wrong working directory
  if (!(await snippet.input.confirm(`Are you ready to proceed?`))) {
    snippet.print.fail('Error:', 'Aborted by user.');
    Deno.exit();
  }
}

// snippet.exit.whenClosed().then(() => {
//   snippet.print.fail('Error:', 'Aborted by user.');
//   Deno.exit();
// });

// ? initialize bundle or bundle and stream
const worker = 'b' in internal.flag ? workers.bundle : workers.stream;
for await (const res of worker({ source, output, stable, hosted })) {
  // [...]
}

Deno.exit();
