import { default as snippet } from '../../../snippet/index.ts';

import * as file from 'https://deno.land/std@0.134.0/fs/mod.ts';
import * as path from 'https://deno.land/std@0.134.0/path/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.request = async ({ locate, orderd, tasked }: any) => {
  const result: any = {
    locate: {},
    figure: {},
    module: {},
  };

  for (const i in tasked.fetch) {
    const ord = tasked.fetch[i].orderd;
    const res = tasked.fetch[i].result;

    const loc = await internal.parse({ ord, res, typ: 'locate' });
    const fig = await internal.parse({ ord, res, typ: 'figure' });
    const mod = await internal.parse({ ord, res, typ: 'module' });

    internal.resolve({ obj: result.locate, tas: loc, ord, res: [{ hash: res.hash }] });
    internal.resolve({ obj: result.figure, tas: fig, ord, res: [{ hash: res.hash }] });
    internal.resolve({ obj: result.module, tas: mod, ord, res: [{ hash: res.hash }] });
  }

  tasked.parse = { ...result };
};

internal.parse = async ({ ord, res, typ }: any) => {
  if (!(typ in res[0].read)) return;

  const val = res[0].read[typ];
  const tas: any = {};

  for (const i in val) {
    if (!val[i].urn) continue;

    const valRes: any = {};

    valRes.urn = val[i].urn || null;
    valRes.field = val[i].field ? { ...val[i].field } : null;

    valRes.hash = await snippet.write.hash({ plain: JSON.stringify(valRes) });
    tas[valRes.hash] = valRes;
  }

  return tas;
};

internal.resolve = async ({ obj, tas, ord, res }: any) => {
  for (const i in tas) {
    if (!(i in obj)) obj[i] = tas[i];

    obj[i].orderd = [...(obj[i].orderd || []), ...ord];
    obj[i].result = [...(obj[i].result || []), ...res];
  }
};

export default { ...fragment };
