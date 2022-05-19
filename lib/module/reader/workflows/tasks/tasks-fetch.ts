import { default as snippet } from '../../../../snippet/index.ts';

import { Marked } from 'https://deno.land/x/markdown@v2.0.0/mod.ts';

import * as file from 'https://deno.land/std@0.134.0/fs/mod.ts';
import * as path from 'https://deno.land/std@0.134.0/path/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.request = async ({ locate, orderd, tasked }: any) => {
  const result: any = {};

  for (const i in orderd.content) {
    const ord = orderd.content[i];

    if (ord.role != 'content:document') continue;

    const res: any = {};
    const plain = await Deno.readTextFile(path.resolve(ord.path));

    res.hash = await snippet.write.hash({ plain: plain });
    res.read = await internal.parse({ plain: plain });

    result[res.hash] = result[res.hash] || {
      orderd: [],
      result: [{ hash: res.hash, read: res.read }],
    };

    result[res.hash].orderd.push({ hash: ord.hash });
  }

  tasked.fetch = { ...result };
};

internal.parse = async ({ plain }: { plain: string }): Promise<any> => {
  const md = Marked.parse(plain);
  return { ...md.meta, content: md.content };
};

export default { ...fragment };
