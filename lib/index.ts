import './typeset/typeset-interface.ts';
import './typeset/typeset-workflows.ts';

import { default as workers } from './mod.ts';
import { default as snippet } from './snippet/index.ts';

const flag = await snippet.flag.resolve(Deno.args);

// ? confirm working directory
if ('v' in flag || 'version' in flag) {
  const plain = `v0.1.2-experimental`;

  snippet.print.info(plain);
  Deno.exit();
}

// ? confirm working directory
if ('h' in flag || 'help' in flag) {
  const plain = `Usage: reader [options]

Options:
  -v, --version       output the version number
  -h, --help          output usage information

  -s, --stream        start a local server for bundled assets
  -p                  use repository name as path namespace
  -w                  write bundled assets to the repository directory
  -f                  force file writes
`;

  snippet.print.info(plain);
  Deno.exit();
}

// ? confirm working directory
if (!('f' in flag || 'force' in flag)) {
  const paths = snippet.print.bold(snippet.path.resolve());
  const plain = `You're about to initialize in this directory:\n\n  ${paths}\n`;
  snippet.print.info(plain);

  // ? abort; in case of wrong working directory
  if (!(await snippet.input.confirm(`Are you ready to proceed?`))) {
    snippet.print.fail('Aborted by user.');
    Deno.exit();
  }
}

// ? initialize bundle or bundle and stream
const { worker } = { worker: 's' in flag || 'stream' in flag ? workers.stream : workers.bundle };
const { source, output, hosted } = {
  source: { urn: snippet.path.resolve('./') },
  output: { urn: snippet.path.resolve('./.github/workflows-output') },
  hosted: {
    urn: snippet.path.resolve('./.github/workflows-hosted'),
    path: await (async () => {
      let path = 'p' in flag ? (flag['p'] as any) : (flag['public-path'] as any);

      // ? try to use the repo name; when not path defind
      if (typeof path != 'string' && path) {
        const repo = await snippet.repo.requestConfig();
        if (repo && !repo.name.endsWith('github.io.git')) path = repo.name;
      }

      // ---
      // FIXME: better validate the hosted path
      if (typeof path != 'string') path = '';
      return `/${path.replace(/[^a-zA-Z0-9-_]/g, '')}/`.replace(/\/\//g, '/');
      // ---
    })(),
  },
};

for await (const res of worker({ source, output, hosted })) {
  // ?
}
