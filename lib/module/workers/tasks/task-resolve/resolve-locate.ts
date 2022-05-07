import { default as snippet } from '../../../snippet/index.ts';

import * as path from 'https://deno.land/std@0.134.0/path/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.request = async ({ locate, orderd, tasked }: any) => {
  const result: any = {};

  for (const i in tasked.fetch) {
    const ord = tasked.fetch[i].orderd;
    const res = tasked.fetch[i].result[0];

    const urn = path.resolve(locate.output.urn, `./${res.hash}.json`);
    const write = {
      title: res.read.title,
      label: res.read.label,
      field: res.read.field,

      content: res.read.content,

      locate: {},
      module: {},
      figure: {},
    };

    // ? json
    await Deno.writeTextFile(urn, JSON.stringify(write, null, 2));

    // ? document
    for (const i in res.read.locate) {
      const loc = res.read.locate[i];
      console.log(loc);
    }

    // console.log({ ord, res });
  }
};

export default { ...fragment };
