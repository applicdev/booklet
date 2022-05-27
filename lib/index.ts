import './typeset/typeset-interface.ts';
import './typeset/typeset-workflows.ts';

import { default as workers } from './mod.ts';
import { default as snippet } from './worker/snippet/index.ts';

const internal: { [prop: string]: any } = {};

internal.flag = await snippet.flag
  .resolve({
    value: Deno.args,
    match: {
      v: { flag: ['v', 'version'], type: Boolean },
      h: { flag: ['h', 'help'], type: Boolean },

      s: { flag: ['s', 'stream'], type: Boolean },
      b: { flag: ['b', 'bundle'], type: Boolean },
      p: { flag: ['p'], type: Boolean },
      f: { flag: ['f'], type: Boolean },
    },
  })
  .catch((err: string) => {
    snippet.print.fail('Error:', err.toString().replace('Error: ', ''));
    Deno.exit();
  });

internal.path = await (async () => {
  // ? try to use the repo name; when not path defind
  const repo = await snippet.repo.requestConfig();

  return 'p' in internal.flag && repo && !repo.name.endsWith('github.io.git') //
    ? `/${repo.name.replace(/[^a-zA-Z0-9-_]/g, '')}/`.replace(/\/\//g, '/')
    : '/';
})();

// ? confirm working directory
if ('v' in internal.flag) {
  const plain = `reader 0.1.3-experimental`;

  snippet.print.info(plain);
  Deno.exit();
}

// ? confirm working directory
if ('h' in internal.flag) {
  const plain = `
Usage: reader [options]

Options:
  -v, --version       output the version number
  -h, --help          output usage information

  -s, --stream        start a local server for bundled assets
  -b, --bundle        write bundled assets to the repository workflows
  -p                  use repository name as path namespace
  -f                  force file writes
`;

  snippet.print.info(plain);
  Deno.exit();
}

// ?
const { source, output, hosted } = {
  source: { urn: snippet.path.resolve('./') },
  output: {
    urn:
      'b' in internal.flag
        ? snippet.path.resolve('./.github/workflows-output') //
        : await Deno.makeTempDir({ prefix: 'workflows-output-' }),
  },
  hosted: {
    urn:
      'b' in internal.flag
        ? snippet.path.resolve('./.github/workflows-hosted') //
        : await Deno.makeTempDir({ prefix: 'workflows-hosted-' }),

    path: internal.path,
  },
};

// ? remove any temp directories; when previous run faild to remove them
const tempRef = await Deno.makeTempDir();
const tempDir = snippet.path.resolve(tempRef, '../');

Deno.remove(tempRef, { recursive: true });
for await (const dirEntry of Deno.readDir(tempDir)) {
  if (
    dirEntry.name.includes('workflows-output') || //
    dirEntry.name.includes('workflows-hosted')
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
You are about to initialize a reader for the directories –

  ${snippet.print.bold(snippet.path.resolve())}
`);

  if ('b' in internal.flag)
    snippet.print.info(`and write bundled assets to the directories –

  ${snippet.print.bold(output.urn)}
  ${snippet.print.bold(hosted.urn)}
`);

  // ? abort; in case of wrong working directory
  if (!(await snippet.input.confirm(`Are you ready to proceed?`))) {
    snippet.print.fail('Error:', 'Aborted by user.');
    Deno.exit();
  }
}

// ? initialize bundle or bundle and stream
const worker = 's' in internal.flag ? workers.stream : workers.bundle;
for await (const res of worker({ source, output, hosted })) {
  // [...]
}
