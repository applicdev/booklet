import { default as snippet } from '../snippet/index.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

// import * as file from 'https://deno.land/std@0.78.0/fs/mod.ts';
import * as path from 'https://deno.land/std@0.132.0/path/mod.ts';

fragment.create = async ({ option, content, pattern }: any): Promise<void> => {
  const mapFiles: any = {};
  const mapIndex: any = {};

  for (const i in content) {
    const result = internal.createParsed({
      ent: content[i],
      par: await snippet.parse.md(content[i].plain),
    });

    const resultHash = await snippet.index.hash(JSON.stringify(result));
    const resultPublic = result.public.filter((pub: any) => !pub.role);

    mapFiles[resultHash] = { ...result };
    mapIndex[resultHash] = {
      // ?
      changed: result.changed,
      created: result.created,
      title: result.title,
      label: result.label,

      // ?
      public: resultPublic.length ? resultPublic : null,
      source: [{ urn: internal.toRelativePath({ urn: content[i].urn }) }],
    };
  }

  console.log(mapFiles);
  console.log(mapIndex);
};

internal.toRelativePath = ({ urn }: any) => {
  return `.${urn.replace(path.resolve('./'), '').replaceAll('\\', '/')}`;
};

internal.createParsed = ({ ent, par }: any) => {
  const result: {
    changed?: Date;
    created?: Date;
    title?: string;
    label?: string;

    field?: { [prop: string]: any };
    content?: string;

    public?: { urn: string; role?: 'forward' }[];

    figure?: { urn: string; role?: 'masked' | 'window' }[];
    module?: { urn: string; role?: 'inline' }[];
  } = {};

  // ? search parameters
  result.changed = internal.isolateDate({ typ: 'changed', ent, par });
  result.created = internal.isolateDate({ typ: 'created', ent, par });

  result.title = internal.isolateText({ typ: 'title', fal: ent.name, par });
  result.label = internal.isolateText({ typ: 'label', fal: result.title, par });

  // ? custom parameters and markdown contents as html-plain
  result.field = par.field && typeof par.field === 'object' ? { ...par.field } : {};
  result.content = par.content || '';

  // ? redirects
  result.public = internal.isolateArray({ typ: 'public', par });

  // ---
  // TODO: implement figure scalling
  // ? figures and other document images
  result.figure = internal.isolateArray({ typ: 'figure', par });
  // ---

  // ---
  // TODO: implement typscript imports
  // ? typescript imports
  result.module = internal.isolateArray({ typ: 'module', par });
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

  return parDate.toString() !== 'Invalid Date' ? parDate : entDate;
};

export default { ...fragment };
