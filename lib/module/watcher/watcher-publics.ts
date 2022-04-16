const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

import { Marked } from 'https://deno.land/x/markdown@v2.0.0/mod.ts';

import * as file from 'https://deno.land/std@0.78.0/fs/mod.ts';
import * as path from 'https://deno.land/std@0.132.0/path/mod.ts';

fragment.create = async ({ option, content, pattern }: any): Promise<void> => {
  for (const i in content) {
    const md = Marked.parse(content[i].plain);
    const parsed = internal.createParsed({
      ent: content[i],
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

internal.createParsed = ({ ent, parsed }: any) => {
  const resultText = ({ typ, fal }: { typ: string; fal: string }) => {
    return parsed[typ] && typeof parsed[typ] === 'string' ? parsed[typ] : fal;
  };

  const resultDate = ({ typ }: { typ: string }) => {
    const entDate = new Date(ent[typ]);
    const parDate = new Date(parsed[typ]);

    if (parDate.toString() !== 'Invalid Date') return parDate;
    else return entDate;
  };

  const result = {
    // ? search parameters
    changed: resultDate({ typ: 'changed' }),
    created: resultDate({ typ: 'created' }),

    title: resultText({ typ: 'title', fal: ent.name }),
    label: resultText({ typ: 'label', fal: resultText({ typ: 'title', fal: ent.name }) }),

    // ? custom parameters
    field: parsed.field && typeof parsed.field === 'object' ? { ...parsed.field } : {},

    // ? markdown contents as html-plain
    content: parsed.content || '',
  };

  console.log({ parsed });
  console.log({ result });
  console.log('---');

  return result;
};

export default { ...fragment };
