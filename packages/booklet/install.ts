import * as flag from 'https://deno.land/std@0.132.0/flags/mod.ts';

const flags = flag.parse(Deno.args) as { [prop: string]: string | boolean };

await Deno.run({
  env: { PUPPETEER_PRODUCT: 'chrome' },
  cmd: [
    ...['deno', 'run', '-A', '--unstable'], //
    ...['https://deno.land/x/puppeteer@9.0.2/install.ts'],
  ],
}).status();

await Deno.run({
  env: {},
  cmd: [
    ...['deno', 'install', '-A', '--unstable', '-f'], //
    ...('upgrade' in flags ? ['--reload'] : ['']),
    ...['--name', 'booklet', './packages/booklet/bin/booklet.ts'],
  ],
}).status();
