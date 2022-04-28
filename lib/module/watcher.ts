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
  // ? ensure, and clear out contents of, output folder
  await file.emptyDir(path.resolve(output.urn));

  // 🔍 locate work directories
  const locate: any = {};

  locate.pattern = { urn: path.resolve('./lib/pattern') };
  locate.content = { urn: path.resolve('./content') };

  // 🏷️ order and index given files
  const orderd: any = {};

  orderd.pattern = await workers.order.pattern({ locate });
  orderd.content = await workers.order.content({ locate });

  // 🗂️ tasks
  const tasked: any = {};

  tasked.fetched = await workers.tasks.fetch({ locate, orderd, tasked });
  // tasked.fetched = await workers.tasks.fetch({ locate, orderd, tasked });

  // // ✏️ write
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

// internal.readAll = async ({ dir, match }: any): Promise<string[]> => {
//   const files: any[] = [];

//   for await (const dirEntry of Deno.readDir(dir)) {
//     const urn = path.resolve(dir, `./${dirEntry.name}`);

//     // ? traverse directories
//     if (dirEntry.isDirectory) {
//       for (const ent of await internal.readAll({ dir: urn, match })) files.push(ent);
//       continue;
//     }

//     // ? append matching files
//     if (!match || match(dirEntry)) {
//       files.push({
//         dir: dir,
//         urn: urn,
//         name: dirEntry.name,
//       });
//     }
//   }

//   return files;
// };

// internal.readContent = async ({ dir }: any): Promise<any> => {
//   const files: any = await internal.readAll({ dir, match: (ent: any) => ent.name.endsWith('.md') });
//   const state: any = {};

//   for (const fil of files) {
//     const stats = await Deno.stat(fil.urn);

//     state[fil.urn] = fil;
//     state[fil.urn].plain = await Deno.readTextFile(fil.urn);
//     state[fil.urn].changed = stats.mtime;
//     state[fil.urn].created = stats.birthtime;
//   }

//   return state;
// };

// internal.readPattern = async ({ dir }: any): Promise<any> => {
//   return {
//     // [...]
//   };
// };

export default { ...fragment };
