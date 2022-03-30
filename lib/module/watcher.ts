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
  await file.ensureDir(path.resolve(internal.option.output));
  await file.emptyDir(path.resolve(internal.option.output));

  // + create files
  await internal.createConfigs();
  await internal.createDocuments();

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
  const plainDocument = pattern['page:document'].render({ page: {} });
  const plainFallback = pattern['page:fallback'].render({ page: {} });

  await Deno.writeTextFile(path.resolve(internal.option.output, './index.html'), plainDocument);
  await Deno.writeTextFile(path.resolve(internal.option.output, './404.html'), plainFallback);
};

export default { ...fragment };
