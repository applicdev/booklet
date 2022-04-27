const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

import { default as snippet } from '../index.ts';

fragment.create = async ({ urn, val }: { urn: string; val: { [prop: string]: any } }): Promise<any> => {
  const paths = [urn, urn + '.gz'];
  const plain = JSON.stringify(val);

  const gzipd = await snippet.write.gzip({ plain });
  const gzipr = await snippet.fetch.gzip({ buffer: gzipd });

  await Deno.writeTextFile(paths[0], gzipr);
  await Deno.writeFile(paths[1], gzipd);

  snippet.out.done('Wrote', `${snippet.local.path({ urn: paths[0] })}`);
  snippet.out.done('Wrote', `${snippet.local.path({ urn: paths[1] })}`);
};

export default { ...fragment };
