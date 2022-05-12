import './typeset/typeset-interface.ts';
import './typeset/typeset-workflows.ts';

import { default as snippet } from './snippet/index.ts';
import { default as watcher } from './module/interface/interface-watcher.ts';
import { default as streams } from './module/interface/interface-streams.ts';

export async function* bundle({ source, output, hosted }: InterfaceOption): InterfaceGenerator {
  return {};
}

export async function* stream({ source, output, hosted }: InterfaceOption): InterfaceGenerator {
  yield {};

  return {};
}

// // ? initialize bundle or bundle and stream
// watcher.connectedCallback({ ...option });
// watcher.whenConnected().then(async () => {
//   if (!('stream' in optionInterface)) {
//     await watcher.disconnectedCallback();
//     Deno.exit();
//   }

//   // ---
//   streams.connectedCallback({ ...option });
//   // FIXME: find a better implementationl; disconnected has to run on deno close
//   // streams.disconnectedCallback();
//   // watcher.disconnectedCallback();
//   // ---
// });

export default { bundle, stream };
