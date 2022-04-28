const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

import * as path from 'https://deno.land/std@0.134.0/path/mod.ts';

fragment.request = async ({ urn, match }: any): Promise<any[]> => {
  const files: any[] = [];

  for await (const dirEntry of Deno.readDir(urn)) {
    const entryUrn = path.resolve(urn, `./${dirEntry.name}`);

    // ? traverse directories
    if (dirEntry.isDirectory) {
      for (const ent of await fragment.request({ urn: entryUrn, match })) files.push(ent);
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
