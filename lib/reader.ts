import Input from 'https://deno.land/x/input@2.0.3/index.ts';
import * as path from 'https://deno.land/std@0.132.0/path/mod.ts';

// + path check
console.clear();
if (Deno.args.indexOf('--force') == -1 && Deno.args.indexOf('-f') == -1) {
  console.log(`You're about to initialize a reader project in this directory:\n\n${path.resolve()}\n\n`);

  const input = new Input();
  await input.wait();

  console.clear();
}

// + run reader bundle and stream
const urn = Deno.args.indexOf('--stream') != -1 ? './reader-stream.ts' : './reader-bundle.ts';
const mod = await import(urn);

mod.initialize({
  source: path.resolve('./'),
  output: path.resolve('./.github/workflows-out'),
});
