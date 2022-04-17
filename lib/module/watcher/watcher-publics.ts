const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

import { Marked } from 'https://deno.land/x/markdown@v2.0.0/mod.ts';

// import * as file from 'https://deno.land/std@0.78.0/fs/mod.ts';
// import * as path from 'https://deno.land/std@0.132.0/path/mod.ts';

fragment.create = async ({ option, content, pattern }: any): Promise<void> => {
  for (const i in content) {
    const md = Marked.parse(content[i].plain);
    const result = internal.createParsed({
      ent: content[i],
      par: { ...md.meta, content: md.content }, //
    });

    console.log(result);
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

internal.createParsed = ({ ent, par }: any) => {
  const result: {
    changed?: Date;
    created?: Date;
    title?: string;
    label?: string;

    field?: { [prop: string]: any };
    figure?: { [prop: string]: any };
    images?: { [prop: string]: any };
    content?: string;

    module?: string[];
    module_inline?: string[];
  } = {};

  // ? search parameters
  result.changed = internal.isolateDate({ typ: 'changed', ent, par });
  result.created = internal.isolateDate({ typ: 'created', ent, par });

  result.title = internal.isolateText({ typ: 'title', fal: ent.name, par });
  result.label = internal.isolateText({ typ: 'label', fal: result.title, par });

  // ? custom parameters and markdown contents as html-plain
  result.field = par.field && typeof par.field === 'object' ? { ...par.field } : {};
  result.content = par.content || '';

  // ? images
  // ---
  // TODO: implement images
  result.figure = {};
  result.images = {};
  // ---

  // ? typescript imports
  // ---
  // TODO: implement typscript imports
  result.module = internal.isolateArray({ typ: 'module', par });
  result.module_inline = internal.isolateArray({ typ: 'module_inline', par });
  // ---

  return result;
};

internal.isolateArray = ({ typ, par }: any) => {
  return par[typ] && Array.isArray(par[typ]) ? [...par[typ]] : [];
};

internal.isolateText = ({ typ, fal, par }: any) => {
  return par[typ] && typeof par[typ] === 'string' ? par[typ] : fal;
};

internal.isolateDate = ({ typ, ent, par }: any) => {
  const entDate = new Date(ent[typ]);
  const parDate = new Date(par[typ]);

  if (parDate.toString() !== 'Invalid Date') return parDate;
  else return entDate;
};

export default { ...fragment };
