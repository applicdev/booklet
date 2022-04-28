import { default as snippet } from '../../snippet/index.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.request = async ({ locate }: any) => {
  const result: any = {};

  const documentMap = await snippet.fetch.find({
    urn: locate.pattern.urn, //
    match: (ent: any) => ent.name === 'document.html',
  });

  const fallbackMap = await snippet.fetch.find({
    urn: locate.pattern.urn, //
    match: (ent: any) => ent.name === 'fallback.html',
  });

  console.log({ documentMap, fallbackMap });

  // for (const i in documentMap) {
  //   const path = await snippet.local.path({ urn: filesMap[i].locate.urn });
  //   const hash = await snippet.write.hash({ val: path });

  //   result[hash] = {
  //     path,
  //     hash,

  //     changed: filesMap[i].changed,
  //     created: filesMap[i].created,
  //   };
  // }

  return { ...result };
};

export default { ...fragment };
