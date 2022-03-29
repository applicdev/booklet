const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

import * as flag from 'https://deno.land/std@0.132.0/flags/mod.ts';

type flagOptions = {
  value: string[];
  match: { [prop: string]: { flag: string[]; type: Boolean | String } };
};

fragment.resolve = async ({ value, match }: flagOptions): Promise<{ [prop: string]: any }> => {
  const flags = flag.parse(value) as { [prop: string]: string | boolean };
  const query: string[] = [];

  const result: { [prop: string]: boolean } = {};

  delete flags._;

  for (const i in match) {
    for (const j in match[i].flag) {
      const fla = match[i].flag[j];

      query.push(fla);
      if (fla in flags) result[i] = true;
    }
  }

  for (const i in flags) if (!query.includes(i)) throw new Error(`${i} is not a valid option`);

  return result;
};

export default { ...fragment };
