import { default as snippet } from '../../snippet/index.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.request = async ({ locate, orderd }: any) => {
  const result: any = {};

  const filesMap = await snippet.fetch.find({
    urn: locate.content.urn, //
    match: (ent: any) => ent.name.endsWith('.md'),
  });

  for (const i in filesMap) {
    const node = await internal.resolve({ node: filesMap[i] });

    result[node.hash] = node;
    result[node.hash].role = 'content:document';
  }

  orderd.content = { ...result };
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
