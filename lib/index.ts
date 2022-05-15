import './typeset/typeset-interface.ts';
import './typeset/typeset-workflows.ts';

import { default as workers } from './mod.ts';
import { default as snippet } from './snippet/index.ts';

const flag = await snippet.flag.resolve(Deno.args);

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

    path: await (async () => {
      let path = flag['p'] as boolean | string | undefined;

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
if ('v' in flag || 'version' in flag) {
  const plain = `reader 0.1.3-experimental (release)`;

  snippet.print.info(plain);
  Deno.exit();
}

// ? confirm working directory
if ('h' in flag || 'help' in flag) {
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

// ? confirm working directory
if (!('f' in flag)) {
  const paths = [
    snippet.print.bold(snippet.path.resolve()), //
    snippet.print.bold(output.urn),
    snippet.print.bold(hosted.urn),
  ];

  const plain = [
    `You are about to initialize a reader for the directories –\n\n  ${paths.shift()}`, //
    'bundle' in flag ? `\nand write bundled assets to the directories –\n\n  ${paths.join('\n  ')}\n` : '',
  ];

  snippet.print.info(plain.join('\n'));

  // ? abort; in case of wrong working directory
  if (!(await snippet.input.confirm(`Are you ready to proceed?`))) {
    snippet.print.fail('Aborted by user.');
    Deno.exit();
  }
}

// ? initialize bundle or bundle and stream
const { worker } = { worker: 's' in flag || 'stream' in flag ? workers.stream : workers.bundle };
for await (const res of worker({ source, output, hosted })) snippet.print.info('Bundle completed!');
