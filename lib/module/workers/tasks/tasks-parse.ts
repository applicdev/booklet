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

    const pub = await internal.parse({ ord, res, typ: 'public' });
    const fig = await internal.parse({ ord, res, typ: 'figure' });
    const mod = await internal.parse({ ord, res, typ: 'module' });

    internal.apply({ obj: result.public, tas: pub, ord, res: [{ hash: res.hash }] });
    internal.apply({ obj: result.figure, tas: fig, ord, res: [{ hash: res.hash }] });
    internal.apply({ obj: result.module, tas: mod, ord, res: [{ hash: res.hash }] });
  }

  tasked.parse = { ...result };
};

internal.parse = async ({ ord, res, typ }: any) => {
  if (!(typ in res.read)) return;

  const val = res.read[typ];
  const tas: any = {};

  for (const i in val) {
    if (!val[i].urn) continue;

    const valRes: any = {};

    valRes.urn = val[i].urn || null;
    valRes.role = val[i].role || null;

    valRes.hash = await snippet.write.hash({ plain: JSON.stringify(valRes) });
    tas[valRes.hash] = valRes;
  }

  return tas;
};

internal.apply = async ({ obj, tas, ord, res }: any) => {
  for (const i in tas) {
    if (!(i in obj)) obj[i] = tas[i];

    console.log({ ord, res });

    obj[i].orderd = [...(obj[i].orderd || []), ...ord];
    obj[i].result = [...(obj[i].result || []), ...res];
  }
};

export default { ...fragment };
