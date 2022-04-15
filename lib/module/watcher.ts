import { default as publics } from './watcher/watcher-publics.ts';
import { default as statics } from './watcher/watcher-statics.ts';
import { default as utilsConsole } from './utils/console.ts';

import * as file from 'https://deno.land/std@0.134.0/fs/mod.ts';
import * as path from 'https://deno.land/std@0.134.0/path/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

internal.connect = new Promise((res) => (internal.resolveConnected = res));
fragment.whenConnected = (): Promise<void> => internal.connect;

fragment.connectedCallback = async ({ source, output, listen }: any): Promise<void> => {
  const option: any = { source, output, listen };

  // + bundle once
  await internal.whenChanged({ ...option });
  internal.resolveConnected();

  // + listen for changes in the source directory; when requested
  if (!listen) return;

  internal.watchDirectories({
    urn: [
      path.resolve(option.source, './content'), //
      path.resolve(option.source, './lib'),
    ],
    whenChanged: internal.whenChanged.bind(null, { ...option }),
  });
};

fragment.disconnectedCallback = async () => {
  if (internal.watcher) internal.watcher.close();
};

internal.whenChanged = async ({ source, output, listen }: any): Promise<void> => {
  const option: any = { source, output, listen };

  // + create and clear output folder
  await file.emptyDir(path.resolve(option.output));

  // + query data
  const content = await internal.readContent({ urn: 'content' });
  const pattern = {
    ...(await internal.readPattern({ urn: 'lib/pattern' })),
    ...(await internal.readPattern({ urn: 'lib/pattern' })),
  };

  console.log({ content });
  console.log({ pattern });

  // + create files
  await publics.create({ option, content, pattern });
  await statics.create({ option, content, pattern });

  utilsConsole.info(`Bundle completed!`);
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
