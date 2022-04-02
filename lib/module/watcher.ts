import { default as publics } from './watcher/watcher-publics.ts';
import { default as statics } from './watcher/watcher-statics.ts';

import * as style from 'https://deno.land/std@0.132.0/fmt/colors.ts';
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

    // + create files
    await publics.create({ option });
    await statics.create({ option });

    console.log(style.rgb24('Watcher', 0x5674e0), 'bundle completed');
  };

  await whenChanged();
  internal.watchDirectories({ urn: ['pattern', 'content'], whenChanged });
  internal.resolveConnected();
};

fragment.disconnectedCallback = async () => {
  // ...
};

internal.watchDirectories = async ({ urn, whenChanged }: any): Promise<void> => {
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

export default { ...fragment };
