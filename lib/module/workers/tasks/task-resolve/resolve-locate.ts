import { default as snippet } from '../../../snippet/index.ts';

import * as file from 'https://deno.land/std@0.134.0/fs/mod.ts';
import * as path from 'https://deno.land/std@0.134.0/path/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.request = async ({ locate, orderd, tasked }: any) => {
  const result: any = {};

  const dir = path.resolve(locate.output.urn, `./content/`);
  await file.ensureDir(dir);

  for (const i in tasked.fetch) {
    const ord = tasked.fetch[i].orderd;
    const res = tasked.fetch[i].result[0];

    const urn = path.resolve(dir, `./${res.hash}.json`);

    const write = {
      title: res.read.title,
      label: res.read.label,
      field: res.read.field,

      content: res.read.content,

      locate: {},
      module: {},
      figure: {},
    };

    // ? document json
    await Deno.writeTextFile(urn, JSON.stringify(write, null, 2));

    // ? document
    // for (const i in res.read.locate) {
    //   const loc = res.read.locate[i];

    //   const plain =
    //     'field' in loc && loc.field.role == 'forward' //
    //       ? internal.resolveForward({ loc })
    //       : internal.resolve({ loc });

    //   await Deno.writeTextFile(path.resolve(locate.hosted.urn, `./index.html`), plain);
    // }

    // console.log({ ord, res });
  }
};

internal.resolve = ({ loc }: any) => {
  return ``;
};

internal.resolveForward = ({ loc }: any) => {
  return ``;
};

export default { ...fragment };
