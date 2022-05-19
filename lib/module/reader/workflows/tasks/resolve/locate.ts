import { default as snippet } from '../../../../../snippet/index.ts';

import * as file from 'https://deno.land/std@0.134.0/fs/mod.ts';
import * as path from 'https://deno.land/std@0.134.0/path/mod.ts';

import { default as patternDocument } from '../../../../../pattern/document.ts';
import { default as patternFallback } from '../../../../../pattern/fallback.ts';
import { default as patternImprints } from '../../../../../pattern/imprints.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.request = async ({ locate, orderd, tasked }: any) => {
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
    for (const i in res.read.locate) {
      const loc = res.read.locate[i];
      const out: any = {
        typ: 'field' in loc && loc.field.role == 'forward' ? 'forward' : null,
      };

      out.trail = out.typ == 'forward' ? './404.html' : './index.html';
      out.plain =
        out.typ == 'forward' //
          ? await internal.renderFallback({ loc })
          : out.typ == 'landing' //
          ? await internal.renderLanding({ loc })
          : await internal.renderDocument({ loc });

      out.urn = path.resolve(locate.hosted.urn, loc.urn, out.trail);

      // console.log({ out });

      // ? write to hosted output
      await file.ensureFile(out.urn);
      await Deno.writeTextFile(out.urn, out.plain);
    }

    // console.log({ ord, res });
  }
};

internal.renderDocument = async ({ loc }: any) => {
  console.log(patternDocument);

  return `
renderDocument
  `;
};

internal.renderLanding = async ({ loc }: any) => {
  console.log(patternFallback);

  return `
renderLanding
  `;
};

internal.renderFallback = async ({ loc }: any) => {
  console.log(patternFallback);

  return `
renderFallback
  `;
};

internal.renderImprints = async ({ loc }: any) => {
  console.log(patternImprints);

  return `
renderImprints
  `;
};

export default { ...fragment };
