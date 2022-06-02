import '../typeset/typeset-interface.ts';
import '../typeset/typeset-workflows.ts';

import { default as snippet } from './snippet/index.ts';

import { readableStreamFromBooklet } from 'https://deno.land/std@0.134.0/streams/mod.ts';

export async function* streams({ output, hosted }: InterfaceOption): AsyncGenerator<
  { [prop: string]: any }, //
  void,
  void
> {
  // snippet.print.info(`Server active on http://localhost:8080${hosted!.path}`);

  for await (const con of Deno.listen({ port: 8080 })) {
    await handleHttp({ output, hosted }, con).catch((err: Error) => console.error(err));
    yield {};
  }
}

async function handleHttp({ output, hosted }: InterfaceOption, con: Deno.Conn) {
  for await (const requestEvent of Deno.serveHttp(con)) {
    try {
      const url = new URL(requestEvent.request.url);
      const uri = decodeURIComponent(url.pathname);

      let status = 200;
      let result = null;

      if (uri.startsWith(hosted!.path)) {
        result = await requestFile({
          urn: snippet.path.resolve(hosted!.urn, `./${uri.slice(hosted!.path.length)}`),
        });
      }

      // ? 404-file
      if (!result) {
        status = 404;
        result = await requestFile({
          urn: snippet.path.resolve(hosted!.urn, `./404.html`),
        });
      }

      // ? 404
      if (!result) {
        const notFoundResponse = new Response('404 Not Found', { status: 404 });
        await requestEvent.respondWith(notFoundResponse);

        return;
      }

      // ? 200
      const readableStream = readableStreamFromBooklet(result.file);
      const response = new Response(readableStream, {
        status,
        headers: result.type ? { 'content-type': result.type } : {},
      });

      await requestEvent.respondWith(response);
    } catch (err) {
      const notFoundResponse = new Response('500 Internal Server Error', { status: 500 });
      await requestEvent.respondWith(notFoundResponse);
    }
  }
}

async function requestFile({ urn }: { urn: string }): Promise<null | any> {
  const result: { file?: Deno.FsFile; type?: string } = {};

  try {
    if ((await Deno.stat(urn)).isDirectory) {
      return await requestFile({
        urn: snippet.path.resolve(urn, './index.html'),
      });
    }

    result.file = await Deno.open(urn, { read: true });
    result.type = snippet.mime.getType(urn);

    return result;
  } catch (err) {
    return null;
  }
}
