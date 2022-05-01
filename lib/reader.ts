import './module/typeset/index.ts';

import { default as watcher } from './module/watcher.ts';
import { default as streams } from './module/streams.ts';

import Input from 'https://deno.land/x/input@2.0.3/index.ts';

// import * as file from 'https://deno.land/std@0.132.0/fs/mod.ts';
import * as path from 'https://deno.land/std@0.132.0/path/mod.ts';
import * as flag from 'https://deno.land/std@0.132.0/flags/mod.ts';

const optionInterface = flag.parse(Deno.args);
const option: InterfaceOption = {
  source: { urn: path.resolve('./') },
  output: { urn: path.resolve('./.github/workflows-out') },
  hosted: {
    // ? create public path
    path: await (async () => {
      let path =
        'p' in optionInterface
          ? (optionInterface['p'] as any) //
          : (optionInterface['public-path'] as any);

      // ? when not path; try to use the repo name
      if (!!path && path === true) {
        try {
          const cmd = Deno.run({
            cmd: ['git', 'config', '--get', 'remote.origin.url'],
            stdout: 'piped',
            stderr: 'piped',
          });

          const output = await cmd.output();
          const outStr = new TextDecoder().decode(output);

          if (!outStr.endsWith('github.io.git')) {
            path = outStr.split('/').pop()?.replace('.git', '');
          }
        } catch (err) {}
      }

      // ---
      // FIXME: better validate the path interface option
      if (!path || path instanceof String) path = '';
      return `/${path.replace(/[^a-zA-Z0-9-_]/g, '')}/`.replace(/\/\//g, '/');
      // ---
    })(),
  },
};

// ? check work directory
if (!('f' in optionInterface || 'force' in optionInterface)) {
  console.log(`You're about to initialize a reader project in this directory:\n\n${path.resolve()}\n\n`);

  await new Input().wait();
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

  streams.connectedCallback({ output, hosted });

  // ---
  // FIXME: find a better implementationl; disconnected has to run on deno close
  // streams.disconnectedCallback();
  // watcher.disconnectedCallback();
  // ---
});
