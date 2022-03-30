import { ensureDir } from 'https://deno.land/std@0.78.0/fs/mod.ts';
import * as path from 'https://deno.land/std@0.132.0/path/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.whenConnected = (): Promise<void> => internal.connect;
internal.connect = new Promise((res) => (internal.resolveConnected = res));

fragment.connectedCallback = async ({ option }: any): Promise<void> => {
  internal.option = option;

  // ...
  const ghReadme = `This branch is automated with [GitHub Actions](https://github.com/features/actions). Its content should not be manually edited.`;

  await Deno.remove(path.resolve(internal.option.public), { recursive: true }).catch((err) => {});
  await ensureDir(path.resolve(internal.option.public));
  await Deno.writeTextFile(path.resolve(internal.option.public, './README.md'), ghReadme);

  await ensureDir(path.resolve(internal.option.public, './outline'));
  await Deno.writeTextFile(path.resolve(internal.option.public, './outline/index.html'), `Hi from /outline/index.html`);
  await Deno.writeTextFile(path.resolve(internal.option.public, './404.html'), `Hi from /404.html`);
  // ...

  internal.resolveConnected();
};

fragment.disconnectedCallback = async () => {
  // ...
};

export default { ...fragment };
