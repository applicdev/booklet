const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

import * as flag from 'https://deno.land/std@0.132.0/flags/mod.ts';

fragment.resolve = async (): Promise<{ [prop: string]: any }> => {
  return flag.parse(Deno.args);
};

export default { ...fragment };
