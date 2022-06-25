import { defined } from './defined/index.ts';
import { snippet } from './snippet/index.ts';

export async function* watcher(option: defined['watcher:option']): defined['watcher*'] {
  const { source, hosted, output, module } = option;

  while (true) {
    let wat: any = Deno.watchFs([source.urn, module.urn]);
    let clo: any = null;

    for await (const res of wat) {
      if (res.paths[0].includes(hosted.urn)) continue;
      if (res.paths[0].includes(output.urn)) continue;

      clearTimeout(clo);
      clo = setTimeout(() => wat.close(), 1000);
    }

    yield {};
  }
}
