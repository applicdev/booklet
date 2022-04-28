import { default as snippet } from './snippet/index.ts';
import { default as workers } from './workers/index.ts';

import * as file from 'https://deno.land/std@0.134.0/fs/mod.ts';
import * as path from 'https://deno.land/std@0.134.0/path/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

internal.connect = new Promise((res) => (internal.resolveConnected = res));
fragment.whenConnected = (): Promise<void> => internal.connect;

fragment.connectedCallback = async ({ source, output, listen }: any): Promise<void> => {
  const option: any = { source, output, listen };

  // ? bundle once
  await internal.whenChanged({ ...option });
  internal.resolveConnected();

  // ? sync bundle for changes in the source directory; when requested
  if (!listen) return;

  internal.watchDirectories({
    urn: [
      path.resolve(option.source.urn, './content'), //
      path.resolve(option.source.urn, './lib'),
    ],
    whenChanged: internal.whenChanged.bind(null, { ...option }),
  });
};

fragment.disconnectedCallback = async () => {
  if (internal.fileObserver) internal.fileObserver.close();
};

internal.whenChanged = async ({ source, output, listen }: any): Promise<void> => {
  // 🔍 locate the work directories
  const locate: any = {};

  locate.pattern = { urn: path.resolve('./lib/pattern') };
  locate.content = { urn: path.resolve('./content') };

  // 🏷️ order relevant files from the work directories
  const orderd: any = {};

  orderd.pattern = await workers.order.pattern({ locate });
  orderd.content = await workers.order.content({ locate });

  // 🗂️ run all interlinked bundle tasks
  const tasked: any = {};

  tasked.fetched = await workers.tasks.fetch({ locate, orderd, tasked });
  // tasked.fetched = await workers.tasks.fetch({ locate, orderd, tasked });

  // ✔️ ensure, and clear out contents of, output directory
  await file.emptyDir(path.resolve(output.urn));

  // ✏️ write to output directory
  // const writes: any = {};
  // writes.content = await workers.tasks.write({ locate, orderd, tasked });

  snippet.out.info(`Bundle completed!`);
};

internal.watchDirectories = async ({ urn, whenChanged }: any): Promise<void> => {
  internal.fileObserver = Deno.watchFs(urn);
  let willUpdate = null;

  for await (const event of internal.fileObserver) {
    if (willUpdate != null) clearTimeout(willUpdate);

    willUpdate = setTimeout(() => {
      willUpdate = null;
      whenChanged();
    }, 500);
  }
};

export default { ...fragment };
