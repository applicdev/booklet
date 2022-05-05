import { default as snippet } from '../../snippet/index.ts';

import { rollup } from 'https://deno.land/x/drollup@2.58.0+0.20.0/mod.ts';

import * as path from 'https://deno.land/std@0.134.0/path/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.request = async ({ locate, orderd, tasked }: any) => {
  const result: any = {};
  const parsed = tasked.parse.module;

  console.log(locate.output.urn);
  const output = {
    urn: locate.output.urn,
  };

  for (const i in parsed) {
    // console.log(parsed[i].urn);

    const options = {
      input: parsed[i].urn,
      output: {
        dir: output.urn,
        format: 'es' as const,
        sourcemap: true,
      },
    };

    const bundle = await rollup(options);
    const detail = await bundle.write(options.output);

    console.log(detail.output);
    // console.log(bundle);
    await bundle.close();
  }

  // console.log(parsed);
};

export default { ...fragment };
