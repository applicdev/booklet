const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

import { Marked } from 'https://deno.land/x/markdown@v2.0.0/mod.ts';

import * as file from 'https://deno.land/std@0.78.0/fs/mod.ts';
import * as path from 'https://deno.land/std@0.132.0/path/mod.ts';

fragment.create = async ({ option, content, pattern }: any): Promise<void> => {
  for (const i in content) {
    const md = Marked.parse(content[i].plain);
    const parsed = internal.createParsed({
      parsed: { ...md.meta, content: md.content }, //
    });
  }

  // console.log('pattern –');
  // for await (const dirEntry of Deno.readDir('pattern')) {
  //   console.log(dirEntry);
  // }
  // console.log('content –');
  // for await (const dirEntry of Deno.readDir('content')) {
  //   console.log(dirEntry);
  // }
};

internal.createParsed = ({ parsed }: any) => {
  const result = {};

  console.log(parsed);

  return result;
};

export default { ...fragment };
