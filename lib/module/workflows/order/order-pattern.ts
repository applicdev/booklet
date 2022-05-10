import { default as snippet } from '../../../snippet/index.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.request = async ({ locate, orderd }: any) => {
  const result: any = {};

  // ? document patterns
  await internal.match({
    role: 'pattern:document',
    find: (ent: any) => ent.name === 'document.html',
    locate,
    result,
  });

  // ? fallback document patterns
  await internal.match({
    role: 'pattern:fallback',
    find: (ent: any) => ent.name === 'fallback.html',
    locate,
    result,
  });

  orderd.pattern = { ...result };
};

internal.match = async ({ locate, result, find, role }: any) => {
  const fallbackMap = await snippet.fetch.find({
    urn: locate.source.pattern.urn, //
    match: find,
  });

  for (const i in fallbackMap) {
    const node = await internal.resolve({ node: fallbackMap[i] });

    result[node.hash] = node;
    result[node.hash].role = role;
  }
};

internal.resolve = async ({ node }: any) => {
  const path = await snippet.local.path({ urn: node.locate.urn });
  const hash = await snippet.write.hash({ plain: path });

  return {
    path,
    hash,
    changed: node.changed,
    created: node.created,
  };
};

export default { ...fragment };
