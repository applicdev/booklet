import * as path from 'https://deno.land/std@0.132.0/path/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.create = ({ urn }: { urn: string }) => {
  return urn.replace(path.resolve('./'), '.').replaceAll('\\', '/');
};

export default { ...fragment };
