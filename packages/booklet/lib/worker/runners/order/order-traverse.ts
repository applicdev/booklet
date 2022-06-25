import { default as snippet } from '../../snippet/index.ts';

// import puppeteer from 'https://deno.land/x/puppeteer@14.1.1/mod.ts';
import puppeteer from 'https://deno.land/x/puppeteer@9.0.2/mod.ts';
import { encodeUrl } from 'https://deno.land/x/encodeurl/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.request = async function* ({ bundle, option }: any): AsyncGenerator<any> {
  for await (const node of internal.find({
    urn: snippet.path.resolve('./'), //
    match: (node: any) => {
      return node.name.endsWith('.md') && !node.name.startsWith('.');
    },
  })) {
    yield internal.resolve({ node });
  }
};

internal.resolve = async ({ node }: any) => {
  const path = node.urn.replace(snippet.path.resolve('./'), '.').replaceAll('\\', '/');
  const hash = await snippet.hash.sha1({ plain: path });

  return {
    path,
    hash,
    changed: node.changed,
    created: node.created,
  };
};

internal.find = async function* ({ urn, match }: any): AsyncGenerator<any> {
  for await (const dirEntry of Deno.readDir(urn)) {
    const entryUrn = snippet.path.resolve(urn, `./${dirEntry.name}`);

    // ? traverse directories
    if (dirEntry.isDirectory) {
      for await (const ent of internal.find({ urn: entryUrn, match })) {
        yield ent;
      }
    }

    // ? yield matching files
    if (!match || match(dirEntry)) {
      try {
        const entryState = await Deno.stat(entryUrn);

        yield {
          urn: entryUrn,
          changed: entryState.mtime,
          created: entryState.birthtime,
        };
      } catch (err) {}
    }
  }
};

export default { ...fragment };
