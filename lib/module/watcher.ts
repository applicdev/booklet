import { default as publics } from './watcher/watcher-publics.ts';
import { default as statics } from './watcher/watcher-statics.ts';
import { default as helpers } from './helpers/index.ts';

import * as file from 'https://deno.land/std@0.132.0/fs/mod.ts';
import * as path from 'https://deno.land/std@0.132.0/path/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

internal.connect = new Promise((res) => (internal.resolveConnected = res));
fragment.whenConnected = (): Promise<void> => internal.connect;

fragment.connectedCallback = async ({ source, output }: any): Promise<void> => {
  // const option = { source, output };
  console.log('connectedCallback');

  // const whenChanged = async () => {
  //   // + create and clear output folder
  //   // console.log(option.output);
  //   // await file.emptyDir(path.resolve(option.output));
  //   // // + query data
  //   // const content = await internal.readContent({ urn: 'content' });
  //   // const pattern = await internal.readPattern({ urn: 'pattern' });
  //   // // + create files
  //   // await publics.create({ option, content, pattern });
  //   // await statics.create({ option, content, pattern });

  // helpers.audit('Watcher', 'bundle completed');
  // };

  // await whenChanged();

  // internal.watchDirectories({ urn: ['pattern', 'content'], whenChanged });
  // internal.resolveConnected();
};

fragment.disconnectedCallback = async () => {
  // ...
};

// internal.watchDirectories = async ({ urn, whenChanged }: any): Promise<void> => {
//   const watcher = Deno.watchFs(urn);
//   let willUpdate = null;
//   for await (const event of watcher) {
//     if (willUpdate != null) clearTimeout(willUpdate);
//     willUpdate = setTimeout(() => {
//       willUpdate = null;
//       whenChanged();
//     }, 1500);
//   }
// };

internal.readContent = async ({ urn }: any): Promise<any> => {
  return {
    // [...]
  };
};
internal.readPattern = async ({ urn }: any): Promise<any> => {
  return {
    // [...]
  };
};

export default { ...fragment };
