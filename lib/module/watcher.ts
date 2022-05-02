import { default as snippet } from './snippet/index.ts';
import { default as workers } from './workers/index.ts';

import * as file from 'https://deno.land/std@0.134.0/fs/mod.ts';
import * as path from 'https://deno.land/std@0.134.0/path/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

internal.connect = new Promise((res) => (internal.resolveConnected = res));
fragment.whenConnected = (): Promise<void> => internal.connect;

fragment.connectedCallback = async ({ source, output, listen }: any): Promise<void> => {
  const option: any = { source, output };

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

internal.whenChanged = async ({ source, output }: any): Promise<void> => {
  internal.watchActive = {
    hash: await snippet.write.hash({ plain: new Date().toISOString() }),
    done: false,
  };

  await internal.requestBundle({ source, output });
};

internal.requestBundle = async ({ source, output }: any): Promise<void> => {
  const change: any = { locate: {}, orderd: {}, tasked: {}, writes: {}, hash: internal.watchActive };

  const { locate, orderd, tasked, writes } = change;

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
    // ...
  ]);

  // 🗃️ run all interlinked tasks
  await workers.tasks.fetch({ locate, orderd, tasked });
  await workers.tasks.parse({ locate, orderd, tasked });
  // ...

  // 🗂️ run remaining tasks in parallel
  await Promise.all([
    // workers.tasks.___({ locate, orderd, tasked }),
    // ...
  ]);

  // ❌ stop write; when a new bundle request was instantiated
  if (change.hash != internal.watchActive.hash) return;

  // ✔️ ensure, and clear out contents of, output directory
  await workers.write.clear({ locate, orderd, tasked, writes });
  // ...

  // ✏️ write to output directory
  await workers.write.order({ locate, orderd, tasked, writes });
  await workers.write.apply({ locate, orderd, tasked, writes });
  // ...

  snippet.out.info(`Bundle completed!`);
  internal.watchActive.done = true;
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
