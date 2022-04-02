import { default as publics } from './watcher/watcher-publics.ts';
import { default as statics } from './watcher/watcher-statics.ts';
import { default as helpers } from './helpers/index.ts';

import * as file from 'https://deno.land/std@0.132.0/fs/mod.ts';
import * as path from 'https://deno.land/std@0.132.0/path/mod.ts';

// import dirname from 'https://x.nest.land/denoname@0.8.2/mod/dirname.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.whenConnected = (): Promise<void> => internal.connect;
internal.connect = new Promise((res) => (internal.resolveConnected = res));

fragment.connectedCallback = async ({ source, output }: any): Promise<void> => {
  const option = { source, output };

  const whenChanged = async () => {
    // + create and clear output folder
    await file.emptyDir(path.resolve(option.output));

    // + query data
    const content = await internal.readContent({ urn: 'content' });
    const pattern = await internal.readPattern({ urn: 'pattern' });

    // + create files
    await publics.create({ option, content, pattern });
    await statics.create({ option, content, pattern });

    helpers.audit('Watcher', 'bundle completed');
  };

  await whenChanged();
  internal.watchDirectories({ urn: ['pattern', 'content'], whenChanged });
  internal.resolveConnected();
};

fragment.disconnectedCallback = async () => {
  // ...
};

internal.watchDirectories = async ({ urn, whenChanged }: any): Promise<void> => {
  console.log('CI', Deno.env.get('CI'));

  if (Deno.env.get('CI') != undefined) return;

  const watcher = Deno.watchFs(urn);
  let willUpdate = null;

  for await (const event of watcher) {
    if (willUpdate != null) globalThis.clearTimeout(willUpdate);

    willUpdate = globalThis.setTimeout(() => {
      willUpdate = null;
      whenChanged();
    }, 1500);
  }
};

internal.readContent = async ({ urn }: any): Promise<any> => {
  // ...
};
internal.readPattern = async ({ urn }: any): Promise<any> => {
  // ...
};

export default { ...fragment };
