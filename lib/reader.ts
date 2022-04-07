import Input from 'https://deno.land/x/input@2.0.3/index.ts';
import * as path from 'https://deno.land/std@0.132.0/path/mod.ts';

console.clear();
console.log(`You're about to initialize a reader project in this directory:\n\n${path.resolve()}\n\n`);

const input = new Input();
await input.wait();

Deno.stdout.write(new TextEncoder().encode('\r\x1b[K'));

import('--stream' == Deno.args[0] ? './reader-stream.ts' : './reader-bundle.ts');
