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
  const result: {
    changed?: Date;
    created?: Date;
    title?: string;
    label?: string;

    field?: { [prop: string]: any };
    content?: string;

    module?: string[];
    module_inline?: string[];
  } = {};

  // ? search parameters
  result.changed = internal.isolateDate({ typ: 'changed', ent, parsed });
  result.created = internal.isolateDate({ typ: 'created', ent, parsed });
  result.title = internal.isolateText({ typ: 'title', fal: ent.name, parsed });
  result.label = internal.isolateText({ typ: 'label', fal: result.title });

  // ? custom parameters and markdown contents as html-plain
  result.field = parsed.field && typeof parsed.field === 'object' ? { ...parsed.field } : {};
  result.content = parsed.content || '';

  // ? typescript imports
  result.module = [...parsed.module] || [];
  result.module_inline = [...parsed.module_inline] || [];

  console.log({ parsed });
  console.log({ result });
  console.log('---');

  return result;
};

internal.isolateText = ({ typ, fal, parsed }: any) => {
  return parsed[typ] && typeof parsed[typ] === 'string' ? parsed[typ] : fal;
};

internal.isolateDate = ({ typ, ent, parsed }: any) => {
  const entDate = new Date(ent[typ]);
  const parDate = new Date(parsed[typ]);

  if (parDate.toString() !== 'Invalid Date') return parDate;
  else return entDate;
};

export default { ...fragment };
