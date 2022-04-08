import { default as publics } from './watcher/watcher-publics.ts';
import { default as statics } from './watcher/watcher-statics.ts';
import { default as console } from './utils/console.ts';

import * as file from 'https://deno.land/std@0.133.0/fs/mod.ts';
import * as path from 'https://deno.land/std@0.133.0/path/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

internal.connect = new Promise((res) => (internal.resolveConnected = res));
fragment.whenConnected = (): Promise<void> => internal.connect;

fragment.connectedCallback = async ({ source, output, listen }: any): Promise<void> => {
  const option: any = { source, output, listen };

  const whenChanged = async () => {
    // + create and clear output folder
    await file.emptyDir(path.resolve(option.output));

    // + query data
    const content = await internal.readContent({ urn: 'content' });
    const pattern = await internal.readPattern({ urn: 'lib/pattern' });

    // + create files
    await publics.create({ option, content, pattern });
    await statics.create({ option, content, pattern });

    console.info(`Bundle completed!`);
  };

  await whenChanged();

  internal.resolveConnected();

  // + listen for changes in the source directory; when requested
  if (!option.listen) return;

  internal.watchDirectories({
    urn: [
      path.resolve(option.source, './content'), //
      path.resolve(option.source, './lib'),
    ],
    whenChanged,
  });
};

fragment.disconnectedCallback = async () => {
  internal.watcher.close();
};

internal.watchDirectories = async ({ urn, whenChanged }: any): Promise<void> => {
  internal.watcher = Deno.watchFs(urn);
  let willUpdate = null;

  for await (const event of internal.watcher) {
    if (willUpdate != null) clearTimeout(willUpdate);
    willUpdate = setTimeout(() => {
      willUpdate = null;
      whenChanged();
    }, 500);
  }
};

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
