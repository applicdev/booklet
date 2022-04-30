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
  const locate: any = {};
  const orderd: any = {};
  const tasked: any = {};
  const writes: any = {};

  // 🔍 locate the work directories
  locate.source = {
    urn: path.resolve(source.urn),

    pattern: { urn: path.resolve(source.urn, './lib/pattern') },
    content: { urn: path.resolve(source.urn, './content') },
  };

  locate.output = {
    urn: path.resolve(output.urn),
  };

  // 🏷️ index and order relevant files from the work directories
  await Promise.all([
    workers.order.pattern({ locate, orderd }), //
    workers.order.content({ locate, orderd }),
  ]);
  // ...

  // 🗂️ run all interlinked bundle tasks
  await workers.tasks.fetch({ locate, orderd, tasked });
  await workers.tasks.parse({ locate, orderd, tasked });
  // ...

  // ✔️ ensure, and clear out contents of, output directory
  await workers.write.clean({ locate, orderd, tasked });
  // ...

  // ✏️ write to output directory
  await workers.write.order({ locate, orderd, tasked, writes });
  await workers.write.apply({ locate, orderd, tasked, writes });
  // ...

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
