import '../typeset/typeset-interface.ts';
import '../typeset/typeset-workflows.ts';

import { default as snippet } from './snippet/index.ts';

import { readableStreamFromReader } from 'https://deno.land/std@0.134.0/streams/mod.ts';
import { mime } from 'https://deno.land/x/mimetypes@v1.0.0/mod.ts';

// import * as file from 'https://deno.land/std@0.132.0/fs/mod.ts';
import * as path from 'https://deno.land/std@0.134.0/path/mod.ts';

export async function* streams({ output, hosted }: InterfaceOption) {
  // ...
}

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

internal.connect = new Promise((res) => (internal.resolveConnected = res));
fragment.whenConnected = (): Promise<void> => internal.connect;

fragment.connectedCallback = async ({ output, hosted }: InterfaceOption): Promise<void> => {
  internal.option = { output, hosted };

  await internal.create();
  internal.resolveConnected();
};

fragment.disconnectedCallback = async () => {
  internal.server.close();
};

internal.create = async () => {
  const { output, hosted } = internal.option;

  internal.server = Deno.listen({ port: 8080 });

  snippet.print.info(`Server active on http://localhost:8080${hosted.path}`);

  for await (const conn of internal.server) {
    internal.handleHttp(conn).catch((err: Error) => console.log(err));
  }
};

internal.handleHttp = async (conn: Deno.Conn) => {
  const { output, hosted } = internal.option;

  const httpConn = Deno.serveHttp(conn);
  for await (const requestEvent of httpConn) {
    const url = new URL(requestEvent.request.url);
    const uri = decodeURIComponent(url.pathname);

    let status = 200;
    let result = null;

    if (uri.startsWith(hosted.path)) {
      result = await internal.requestFile({
        urn: path.resolve(hosted.urn, `./${uri.slice(hosted.path.length)}`),
      });
    }

    // + 404-file
    if (!result) {
      status = 404;
      result = await internal.requestFile({
        urn: path.resolve(hosted.urn, `./404.html`),
      });
    }

    // + 404
    if (!result) {
      const notFoundResponse = new Response('404 Not Found', { status: 404 });
      await requestEvent.respondWith(notFoundResponse);

      return;
    }

    // + 200
    const readableStream = readableStreamFromReader(result.file);
    const response = new Response(readableStream, {
      status,
      headers: result.type ? { 'content-type': result.type } : {},
    });

    await requestEvent.respondWith(response);
  }
};

internal.requestFile = async ({ urn }: { urn: string }) => {
  const result: { file?: Deno.FsFile; type?: string } = {};

  try {
    if ((await Deno.stat(urn)).isDirectory) {
      return await internal.requestFile({
        urn: path.resolve(urn, './index.html'),
      });
    }

    result.file = await Deno.open(urn, { read: true });
    result.type = mime.getType(urn);

    return result;
  } catch {
    return null;
  }
};

export default { ...fragment };
