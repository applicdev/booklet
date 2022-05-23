import { default as snippet } from '../../../../../snippet/index.ts';

import * as file from 'https://deno.land/std@0.134.0/fs/mod.ts';
import * as path from 'https://deno.land/std@0.134.0/path/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.request = async ({ locate, orderd, tasked }: any) => {
  // const dir = path.resolve(locate.output.urn, `./content/`);
  // await file.ensureDir(dir);
  // for (const i in tasked.fetch) {
  // }
};

export default { ...fragment };
