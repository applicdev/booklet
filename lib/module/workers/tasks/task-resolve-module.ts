import { default as snippet } from '../../snippet/index.ts';

import { rollup } from 'https://deno.land/x/drollup@2.58.0+0.20.0/mod.ts';

import * as path from 'https://deno.land/std@0.134.0/path/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.request = async ({ locate, orderd, tasked }: any) => {
  const result: any = {};
  const parsed = tasked.parse.module;

  for (const i in parsed) {
    const options = {
      input: parsed[i].urn,
      output: {
        file: path.resolve(locate.output.urn, `./module/${i}.js`),
        format: 'es' as const,
      },
    };

    const bundle = await rollup(options);
    await bundle.write(options.output);
    await bundle.close();
  }

  // console.log(parsed);
};

export default { ...fragment };
