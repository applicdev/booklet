const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

import { default as snippet } from '../index.ts';

fragment.create = async ({ urn, val, zip }: { urn: string; val: string; zip?: boolean }): Promise<any> => {
  const paths = [urn, urn + '.gz'];
  const plain = val;

  await Deno.writeTextFile(paths[0], plain);
  snippet.print.done('Wrote', `${snippet.local.path({ urn: paths[0] })}`);

  if (zip) {
    const gzipd = await snippet.write.gzip({ plain });

    await Deno.writeFile(paths[1], gzipd);
    snippet.print.done('Wrote', `${snippet.local.path({ urn: paths[1] })}`);
  }
};

export default { ...fragment };
