import './typeset/typeset-interface.ts';
import './typeset/typeset-workflows.ts';

import { bundle, stream } from './mod.ts';

import { default as snippet } from './snippet/index.ts';
import { default as watcher } from './module/interface/interface-watcher.ts';
import { default as streams } from './module/interface/interface-streams.ts';

const flag = await snippet.flag.resolve(Deno.args);

const option: InterfaceOption = {
  source: { urn: snippet.path.resolve('./') },
  output: { urn: snippet.path.resolve('./.github/workflows-output') },
  hosted: {
    urn: snippet.path.resolve('./.github/workflows-hosted'),

    // ? public path
    path: await (async () => {
      let path =
        'p' in flag
          ? (flag['p'] as any) //
          : (flag['public-path'] as any);

      // ? try to use the repo name; when not path defind
      if (!(path instanceof String)) {
        const repo = await snippet.repo.requestConfig();

        if (repo && !repo.name.endsWith('github.io.git')) {
          path = repo.name.split('/').pop()!.replace('.git', '');
        }
      }

      // ---
      // FIXME: better validate the path
      if (!path || !(path instanceof String)) path = '';
      return `/${path.replace(/[^a-zA-Z0-9-_]/g, '')}/`.replace(/\/\//g, '/');
      // ---
    })(),
  },
};

if (!('f' in flag || 'force' in flag)) {
  // ? confirm working directory
  const paths = snippet.print.bold(snippet.path.resolve());
  const plain = `You're about to initialize in this directory:\n\n  ${paths}\n`;
  snippet.print.info(plain);

  // ? abort; when wrong working directory path
  if (!(await snippet.input.confirm(`Are you ready to proceed?`))) {
    snippet.print.fail('Aborted by user.');
    Deno.exit();
  }
}

// ? initialize bundle or bundle and stream
watcher.connectedCallback({ ...option });
watcher.whenConnected().then(async () => {
  if (!('stream' in flag)) {
    await watcher.disconnectedCallback();
    Deno.exit();
  }

  // ---
  streams.connectedCallback({ ...option });
  // FIXME: find a better implementationl; disconnected has to run on deno close
  // streams.disconnectedCallback();
  // watcher.disconnectedCallback();
  // ---
});
