import './typeset/typeset-interface.ts';
import './typeset/typeset-workflows.ts';

import { default as workers } from './mod.ts';
import { default as snippet } from './snippet/index.ts';

const flag = await snippet.flag
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

console.log({ flag });

const path = await (async () => {
  let path = flag['p'] as boolean | string | undefined;

  // ? try to use the repo name; when not path defind
  if (typeof path != 'string' && path) {
    const repo = await snippet.repo.requestConfig();
    if (repo && !repo.name.endsWith('github.io.git')) path = repo.name;
  }

  // ---
  // FIXME: better validate the path namespace
  if (typeof path != 'string') path = '';
  return `/${path.replace(/[^a-zA-Z0-9-_]/g, '')}/`.replace(/\/\//g, '/');
  // ---
})();

// ? confirm working directory
if ('v' in flag) {
  const plain = `reader 0.1.3-experimental`;

  snippet.print.info(plain);
  Deno.exit();
}

// ? confirm working directory
if ('h' in flag) {
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
      'bundle' in flag
        ? snippet.path.resolve('./.github/workflows-output') //
        : await Deno.makeTempDir({ prefix: 'workflows-output-' }),
  },
  hosted: {
    urn:
      'bundle' in flag
        ? snippet.path.resolve('./.github/workflows-hosted') //
        : await Deno.makeTempDir({ prefix: 'workflows-hosted-' }),

    path: path,
  },
};

// // ? remove temp dir; when terminated
// if (!('bundle' in flag)) {
//   const beforeClose = () => {
//     Deno.removeSync(output.urn, { recursive: true });
//     Deno.removeSync(hosted.urn, { recursive: true });
//   };

//   globalThis.addEventListener('unload', beforeClose);

//   // ---
//   // FIXME: Handling OS signals is currently not available on Windows.
//   // Deno.addSignalListener('SIGTERM', beforeClose);
//   // See: https://github.com/denoland/deno/pull/12512#issue-1032072995
//   // See: https://deno.land/manual/examples/os_signals#handle-os-signals
//   // ---
// }

// ? confirm working directory
if (!('f' in flag)) {
  snippet.print.info(`
You are about to initialize a reader for the directories –

  ${snippet.print.bold(snippet.path.resolve())}
`);

  if ('b' in flag)
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
const { worker } = { worker: 's' in flag ? workers.stream : workers.bundle };
for await (const res of worker({ source, output, hosted })) snippet.print.info('Bundle completed!');
