import { ensureDir } from 'https://deno.land/std@0.78.0/fs/mod.ts';
import { resolve } from 'https://deno.land/std@0.132.0/path/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.whenConnected = (): Promise<void> => internal.connect;
internal.connect = new Promise((res) => (internal.resolveConnected = res));

fragment.connectedCallback = async ({ option }: any): Promise<void> => {
  console.log(option);
  // ...
  const ghReadme = `This branch is automate with [GitHub Actions](https://github.com/features/actions). Do not manually edit it's contents.`;
  await ensureDir(resolve(option.public));
  await Deno.writeTextFile(resolve(option.public, './README.md'), ghReadme);
  // ...

  internal.resolveConnected();
};

fragment.disconnectedCallback = () => {
  // ...
};

export default { ...fragment };
