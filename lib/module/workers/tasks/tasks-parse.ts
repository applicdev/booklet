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
    const res = tasked.fetch[i].result;

    console.log(res);

    // ? create public-facing documents
    if ('public' in res.read) {
      result.public[res.hash] = {
        orderd: tasked.fetch[i].orderd,
        result: {
          hash: res.hash,
        },
      };
    }

    // ? resize images to usable sizes
    if ('public' in res.read) {
      result.figure[res.hash] = {
        orderd: tasked.fetch[i].orderd,
        result: {
          hash: res.hash,
        },
      };
    }

    // ? bundle and insert typescript modules
    if ('public' in res.read) {
      result.module[res.hash] = {
        orderd: tasked.fetch[i].orderd,
        result: {
          hash: res.hash,
        },
      };
    }
  }

  tasked.parse = { ...result };
};

export default { ...fragment };
