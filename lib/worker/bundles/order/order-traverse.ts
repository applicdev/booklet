import { default as snippet } from '../../snippet/index.ts';

// import puppeteer from 'https://deno.land/x/puppeteer@14.1.1/mod.ts';
import puppeteer from 'https://deno.land/x/puppeteer@9.0.2/mod.ts';
import { encodeUrl } from 'https://deno.land/x/encodeurl/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.request = async function* ({ bundle, option }: any): AsyncGenerator<any> {
  const filesMap = await internal.find({
    urn: snippet.path.resolve('./'), //
    match: (ent: any) => ent.name.endsWith('.md'),
  });

  for (const i in filesMap) {
    yield { role: 'content:document', ...(await internal.resolve({ node: filesMap[i] })) };
  }
};

internal.resolve = async ({ node }: any) => {
  const path = node.locate.urn.replace(snippet.path.resolve('./'), '.').replaceAll('\\', '/');
  const hash = await snippet.hash.sha1({ plain: path });

  return {
    path,
    hash,
    changed: node.changed,
    created: node.created,
  };
};

internal.find = async ({ urn, match }: any): Promise<any[]> => {
  const files: any[] = [];

  try {
    for await (const dirEntry of Deno.readDir(urn)) {
      const entryUrn = snippet.path.resolve(urn, `./${dirEntry.name}`);

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
  } catch (err) {
    return [];
  }

  return files;
};

export default { ...fragment };
