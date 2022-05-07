import { default as snippet } from '../../snippet/index.ts';

import * as file from 'https://deno.land/std@0.134.0/fs/mod.ts';
import * as path from 'https://deno.land/std@0.134.0/path/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.request = async ({ locate, orderd, tasked }: any) => {
  // ? empty and ensure output directories
  await file.emptyDir(path.resolve(locate.output.urn));
  await file.emptyDir(path.resolve(locate.hosted.urn));

  // ? write GitHub's hosting requisites
  await internal.createReadme({ locate });
  await internal.createJekyll({ locate });
};

internal.createReadme = async ({ locate }: any) => {
  const plain = `This branch is automated with [GitHub Actions][github-actions]. Its content should not be manually edited.

[github-actions]: https://github.com/features/actions
`;

  Deno.writeTextFile(path.resolve(locate.hosted.urn, './README.md'), plain);
};
internal.createJekyll = async ({ locate }: any) => {
  const plain = ``;
  Deno.writeTextFile(path.resolve(locate.hosted.urn, './.nojekyll'), plain);
};

export default { ...fragment };
