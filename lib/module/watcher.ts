import { default as pattern } from '../pattern/index.ts';

import * as file from 'https://deno.land/std@0.78.0/fs/mod.ts';
import * as path from 'https://deno.land/std@0.132.0/path/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.whenConnected = (): Promise<void> => internal.connect;
internal.connect = new Promise((res) => (internal.resolveConnected = res));

fragment.connectedCallback = async ({ source, output }: any): Promise<void> => {
  internal.option = { source, output };

  console.log(path.resolve(internal.option.output));

  // + create and clear output folder
  // await file.ensureDir(path.resolve(internal.option.output));
  await file.emptyDir(path.resolve(internal.option.output));

  // + create files
  await internal.createConfigs();
  await internal.createDocuments();
  await internal.createContents();

  internal.resolveConnected();
};

fragment.disconnectedCallback = async () => {
  // ...
};

internal.createConfigs = async (): Promise<void> => {
  const plainReadme = `
This branch is automated with [GitHub Actions][github-actions]. Its content should not be manually edited.

[github-actions]: https://github.com/features/actions
`;

  await Deno.writeTextFile(path.resolve(internal.option.output, './README.md'), plainReadme);
  await Deno.writeTextFile(path.resolve(internal.option.output, './.nojekyll'), '');
};

internal.createDocuments = async (): Promise<void> => {
  const writePattern = async ({ pat, urn }: any) => {
    const plain = await pattern[pat].render({ page: {} });
    await Deno.writeTextFile(path.resolve(internal.option.output, urn), plain);
  };

  await writePattern({ pat: 'page:fallback', urn: './404.html' });
  await writePattern({ pat: 'page:document', urn: './index.html' });
  await writePattern({ pat: 'pwa-file:webmanifest', urn: './index.webmanifest' });
  await writePattern({ pat: 'pwa-file:service-worker', urn: './service-worker.js' });
  await writePattern({ pat: 'pwa-file:sitemap', urn: './sitemap.xml' });
};

internal.createContents = async (): Promise<void> => {
  // const writePattern = async ({ pat, urn }: any) => {
  //   const plain = await pattern[pat].render({ page: {} });
  //   await Deno.writeTextFile(path.resolve(internal.option.output, urn), plain);
  // };
  // await writePattern({ pat: 'page:fallback', urn: './404.html' });
  // await writePattern({ pat: 'page:document', urn: './index.html' });
  // await writePattern({ pat: 'pwa-file:webmanifest', urn: './index.webmanifest' });
  // await writePattern({ pat: 'pwa-file:service-worker', urn: './service-worker.js' });
  // await writePattern({ pat: 'pwa-file:sitemap', urn: './sitemap.xml' });
};

export default { ...fragment };
