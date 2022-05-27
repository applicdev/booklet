// import { default as snippet } from './snippet/index.ts';
// import { default as runners } from './workflows/index.ts';

import * as file from 'https://deno.land/std@0.134.0/fs/mod.ts';
import * as path from 'https://deno.land/std@0.134.0/path/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

export async function* watcher({ source }: InterfaceOption): AsyncGenerator<{ [prop: string]: any }, void, void> {
  while (true) {
    let wat: any = Deno.watchFs(source!.urn);
    let clo: any = null;

    for await (const res of wat) {
      clearTimeout(clo);
      clo = setTimeout(() => wat.close(), 1000);
    }

    yield {
      //...
    };
  }
}

//   // ? bundle once
//   await internal.whenChanged({ source, output, hosted });
//   internal.resolveConnected();
//   // ? sync bundle for changes in the source directory; when requested
//   if (!listen) return;
//   internal.watchDirectories({
//     urn: [
//       path.resolve(source.urn, './content'), //
//       path.resolve(source.urn, './lib'),
//     ],
//     whenChanged: internal.whenChanged.bind(null, { source, output, hosted }),
//   });
// }

// internal.connect = new Promise((res) => (internal.resolveConnected = res));
// fragment.whenConnected = (): Promise<void> => internal.connect;

// fragment.connectedCallback = async ({ source, output, hosted, listen }: any): Promise<void> => {
//   // ? bundle once
//   await internal.whenChanged({ source, output, hosted });
//   internal.resolveConnected();

//   // ? sync bundle for changes in the source directory; when requested
//   if (!listen) return;

//   internal.watchDirectories({
//     urn: [
//       path.resolve(source.urn, './content'), //
//       path.resolve(source.urn, './lib'),
//     ],
//     whenChanged: internal.whenChanged.bind(null, { source, output, hosted }),
//   });
// };

// fragment.disconnectedCallback = async () => {
//   if (internal.fileObserver) internal.fileObserver.close();
// };

// internal.whenChanged = async ({ source, output, hosted }: any): Promise<void> => {
//   internal.watchActive = {
//     hash: await snippet.write.hash({ plain: new Date().toISOString() }),
//     done: false,
//   };

//   await internal.requestBundle({ source, output, hosted });
// };

// internal.requestBundle = async ({ source, output, hosted }: any): Promise<void> => {
//   const change: any = { locate: {}, orderd: {}, tasked: {}, hash: internal.watchActive.hash };
//   const { locate, orderd, tasked } = change;

//   // 🔍 locate the work directories
//   locate.source = {
//     urn: path.resolve(source.urn),

//     pattern: { urn: path.resolve(source.urn, './lib/pattern') },
//     content: { urn: path.resolve(source.urn, './content') },
//   };

//   locate.output = { urn: path.resolve(output.urn) };
//   locate.hosted = { urn: path.resolve(hosted.urn) };

//   // 📦 ensure correct property values and apply standard; when required
//   await runners.preps.ensureProperties({ locate, orderd, tasked });
//   // ...

//   // ✔️ ensure, and clear out contents of, output directory
//   await runners.preps.ensureWorkspaces({ locate, orderd, tasked });
//   // ...

//   // 🏷️ index and order relevant files from the work directories
//   await Promise.all([
//     runners.order.pattern({ locate, orderd, tasked }), //
//     runners.order.content({ locate, orderd, tasked }),
//     // ...
//   ]);

//   // 🗃️ run all interlinked tasks
//   await runners.tasks.fetch({ locate, orderd, tasked });
//   await runners.tasks.parse({ locate, orderd, tasked });
//   // ...

//   // 🗂️ run remaining tasks in parallel
//   await Promise.all([
//     runners.tasks.resolve.figure({ locate, orderd, tasked }),
//     runners.tasks.resolve.locate({ locate, orderd, tasked }),
//     runners.tasks.resolve.module({ locate, orderd, tasked }),
//     // ...
//   ]);

//   // ❌ stop write; when another change event was instantiated
//   if (change.hash != internal.watchActive.hash) return;

//   // ✏️ write to output directory
//   await runners.write.order({ locate, orderd, tasked });
//   await runners.write.apply({ locate, orderd, tasked });
//   // ...

//   // snippet.print.info(`Bundle completed!`);
//   internal.watchActive.done = true;
// };

// internal.watchDirectories = async ({ urn, whenChanged }: any): Promise<void> => {
//   const fileObserver = Deno.watchFs(urn);
//   let willUpdate = null;

//   for await (const event of fileObserver) {
//     if (willUpdate != null) clearTimeout(willUpdate);

//     willUpdate = setTimeout(() => {
//       willUpdate = null;
//       whenChanged();
//     }, 500);
//   }
// };

// export default { ...fragment };
