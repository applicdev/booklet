import { createHash } from 'https://deno.land/std@0.77.0/hash/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.create = async ({ val }: { val: string }): Promise<string> => {
  const hash = createHash('md5');
  hash.update(val);
  return hash.toString();
};

export default { ...fragment };
