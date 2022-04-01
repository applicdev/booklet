import { default as pattern } from '../pattern/index.ts';

import * as file from 'https://deno.land/std@0.78.0/fs/mod.ts';
import * as path from 'https://deno.land/std@0.132.0/path/mod.ts';

import dirname from 'https://x.nest.land/denoname@0.8.2/mod/dirname.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.whenConnected = (): Promise<void> => internal.connect;
internal.connect = new Promise((res) => (internal.resolveConnected = res));

fragment.connectedCallback = async ({ source, output }: any): Promise<void> => {
  internal.option = { source, output };

  // console.log(path.resolve(internal.option.output));

  // + create and clear output folder
  // await file.ensureDir(path.resolve(internal.option.output));
  await file.emptyDir(path.resolve(internal.option.output));

  // + create files
  await internal.createStatics();
  await internal.createPublics();

  internal.resolveConnected();
};

fragment.disconnectedCallback = async () => {
  // ...
};

internal.createStatics = async (): Promise<void> => {
  // + configs
  const plainReadme = `
This branch is automated with [GitHub Actions][github-actions]. Its content should not be manually edited.

[github-actions]: https://github.com/features/actions
`;

  await Deno.writeTextFile(path.resolve(internal.option.output, './README.md'), plainReadme);
  await Deno.writeTextFile(path.resolve(internal.option.output, './.nojekyll'), '');

  // + files
  const writePattern = async ({ pat, urn }: any) => {
    const plain = await pattern[pat].render({ page: {} });
    await Deno.writeTextFile(path.resolve(internal.option.output, urn), plain);
  };

  await writePattern({ pat: 'page:document', urn: './index.html' });
  await writePattern({ pat: 'page:fallback', urn: './404.html' });
  await writePattern({ pat: 'pwa-file:webmanifest', urn: './index.webmanifest' });
  await writePattern({ pat: 'pwa-file:service-worker', urn: './service-worker.js' });
  await writePattern({ pat: 'pwa-file:sitemap', urn: './sitemap.xml' });

  // + assets

  const __dirname = dirname(import.meta);
  console.log({ dir: __dirname });

  // console.log(getFiles('./'));
  // await Deno.copyFile(
  //   new URL('../pattern/assets', import.meta.url).pathname, //
  //   path.resolve(internal.option.output, './assets')
  // );
};

internal.createPublics = async (): Promise<void> => {
  for await (const dirEntry of Deno.readDir('content')) {
    console.log(dirEntry);
  }
};

export default { ...fragment };
