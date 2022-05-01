import { default as snippet } from '../../snippet/index.ts';

import * as file from 'https://deno.land/std@0.134.0/fs/mod.ts';
import * as path from 'https://deno.land/std@0.134.0/path/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.request = async ({ locate, orderd, tasked }: any) => {
  const result: any = {
    public: {},
    figure: {},
    module: {},
  };

  for (const i in tasked.fetch) {
    const ord = tasked.fetch[i].orderd;
    const res = tasked.fetch[i].result;

    const pub = internal.parse({ ord, res, typ: 'public', cal: internal.parsePublic });
    const fig = internal.parse({ ord, res, typ: 'figure', cal: internal.parseFigure });
    const mod = internal.parse({ ord, res, typ: 'module', cal: internal.parseModule });

    for (const i in pub) result.public[i] = pub[i];
    for (const i in fig) result.figure[i] = fig[i];
    for (const i in mod) result.module[i] = mod[i];
  }

  tasked.parse = { ...result };
};

internal.parse = async ({ ord, res, typ, cal }: any) => {
  if (!(typ in res.read)) return;

  console.log({ typ, res });
};

internal.parsePublic = async ({ ord, res }: any) => {
  //...
  return {};
};

internal.parseFigure = async ({ ord, res }: any) => {
  //...
  return {};
};

internal.parseModule = async ({ ord, res }: any) => {
  //...
  return {};
};

export default { ...fragment };
