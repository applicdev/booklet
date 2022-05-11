import './typeset/typeset-interface.ts';
import './typeset/typeset-workflows.ts';

import { default as snippet } from './snippet/index.ts';
import { default as watcher } from './module/interface/interface-watcher.ts';
import { default as streams } from './module/interface/interface-streams.ts';

import * as path from 'https://deno.land/std@0.132.0/path/mod.ts';
import * as flag from 'https://deno.land/std@0.132.0/flags/mod.ts';

const optionInterface = flag.parse(Deno.args);
const option: InterfaceOption = {
  source: { urn: path.resolve('./') },
  output: { urn: path.resolve('./.github/workflows-output') },
  hosted: {
    urn: path.resolve('./.github/workflows-hosted'),

    // ? create public path
    path: await (async () => {
      let paths =
        'p' in optionInterface
          ? (optionInterface['p'] as any) //
          : (optionInterface['public-path'] as any);

      // ? when not path; try to use the repo name
      if (!!paths && paths === true) {
        try {
          const cmd = Deno.run({
            cmd: ['git', 'config', '--get', 'remote.origin.url'],
            stdout: 'piped',
            stderr: 'piped',
          });

          const output = await cmd.output();
          const outStr = new TextDecoder().decode(output);

          if (!outStr.endsWith('github.io.git')) {
            paths = outStr.split('/').pop()?.replace('.git', '');
          }
        } catch (err) {}
      }

      // ---
      // FIXME: better validate the path interface option
      if (!paths || paths instanceof String) paths = '';
      return `/${paths.replace(/[^a-zA-Z0-9-_]/g, '')}/`.replace(/\/\//g, '/');
      // ---
    })(),
  },
};

if (!('f' in optionInterface || 'force' in optionInterface)) {
  // ? check work directory
  const paths = snippet.print.bold(path.resolve());
  const plain = `You're about to initialize a reader project in this directory:\n\n  ${paths}\n`;
  snippet.print.info(plain);

  // ? abort; when in the wrong working directory
  if (!(await snippet.input.confirm(`Are you ready to proceed?`))) {
    snippet.print.fail('Aborted by user.');
    Deno.exit();
  }
}

// ? initialize bundle or bundle and stream
const { source, output, hosted } = option;

source.listen = 'stream' in optionInterface;

watcher.connectedCallback({ source, output, hosted });
watcher.whenConnected().then(async () => {
  if (!source.listen) {
    await watcher.disconnectedCallback();
    Deno.exit();
  }

  // ---
  streams.connectedCallback({ output, hosted });
  // FIXME: find a better implementationl; disconnected has to run on deno close
  // streams.disconnectedCallback();
  // watcher.disconnectedCallback();
  // ---
});
