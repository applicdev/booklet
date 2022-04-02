const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

import * as file from 'https://deno.land/std@0.78.0/fs/mod.ts';
import * as path from 'https://deno.land/std@0.132.0/path/mod.ts';

fragment.create = async (): Promise<void> => {
  // console.log('pattern –');
  // for await (const dirEntry of Deno.readDir('pattern')) {
  //   console.log(dirEntry);
  // }
  // console.log('content –');
  // for await (const dirEntry of Deno.readDir('content')) {
  //   console.log(dirEntry);
  // }
};

export default { ...fragment };
