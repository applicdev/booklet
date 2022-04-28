import { default as snippet } from '../../snippet/index.ts';

import * as file from 'https://deno.land/std@0.134.0/fs/mod.ts';
import * as path from 'https://deno.land/std@0.134.0/path/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.request = async ({ locate }: any) => {
  const result: any = {};

  const filesMap = await internal.readAll({
    urn: locate.content.urn, //
    match: (ent: any) => ent.name.endsWith('.md'),
  });

  for (const i in filesMap) {
    const path = await snippet.local.path({ urn: filesMap[i].locate.urn });
    const hash = await snippet.write.hash({ val: path });

    result[hash] = {
      path,
      hash,

      changed: filesMap[i].changed,
      created: filesMap[i].created,
    };
  }

  return { ...result };
};

internal.readAll = async ({ urn, match }: any): Promise<string[]> => {
  const files: any[] = [];

  for await (const dirEntry of Deno.readDir(urn)) {
    const entryUrn = path.resolve(urn, `./${dirEntry.name}`);

    // ? traverse directories
    if (dirEntry.isDirectory) {
      for (const ent of await internal.readAll({ urn: entryUrn, match })) files.push(ent);
      continue;
    }

    // ? append matching files
    if (!match || match(dirEntry)) {
      const entryState = await Deno.stat(entryUrn);

      files.push({
        locate: { urn: entryUrn },

        changed: entryState.mtime,
        created: entryState.birthtime,
      });
    }
  }

  return files;
};

export default { ...fragment };
