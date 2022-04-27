const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

import { default as snippet } from '../index.ts';

fragment.create = async ({ urn, val }: { urn: string; val: { [prop: string]: any } }): Promise<any> => {
  const paths = [urn];
  const plain = JSON.stringify(val);

  await Deno.writeTextFile(paths[0], plain);

  snippet.out.done('Wrote', `${snippet.local.path({ urn: paths[0] })}`);
};

export default { ...fragment };
