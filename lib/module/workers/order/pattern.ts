import { default as snippet } from '../../snippet/index.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.request = async ({ locate }: any) => {
  const result: any = {};

  // ? document patterns
  const documentMap = await snippet.fetch.find({
    urn: locate.pattern.urn, //
    match: (ent: any) => ent.name === 'document.html',
  });

  for (const i in documentMap) {
    const node = await internal.resolve({ node: documentMap[i] });

    result[node.hash] = node;
    result[node.hash].role = 'pattern:document';
  }

  // ? fallback document patterns
  const fallbackMap = await snippet.fetch.find({
    urn: locate.pattern.urn, //
    match: (ent: any) => ent.name === 'fallback.html',
  });

  for (const i in fallbackMap) {
    const node = await internal.resolve({ node: fallbackMap[i] });

    result[node.hash] = node;
    result[node.hash].role = 'pattern:fallback';
  }

  return { ...result };
};

internal.resolve = async ({ node }: any) => {
  const path = await snippet.local.path({ urn: node.locate.urn });
  const hash = await snippet.write.hash({ val: path });

  return {
    path,
    hash,
    changed: node.changed,
    created: node.created,
  };
};

export default { ...fragment };
