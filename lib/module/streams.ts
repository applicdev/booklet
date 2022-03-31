import { readableStreamFromReader } from 'https://deno.land/std@0.132.0/streams/mod.ts';
import { mime } from 'https://deno.land/x/mimetypes@v1.0.0/mod.ts';

import * as file from 'https://deno.land/std@0.78.0/fs/mod.ts';
import * as path from 'https://deno.land/std@0.132.0/path/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.whenConnected = (): Promise<void> => internal.connect;
internal.connect = new Promise((res) => (internal.resolveConnected = res));

fragment.connectedCallback = async ({ output }: any): Promise<void> => {
  internal.option = { output };
  internal.server = Deno.listen({ port: 8080 });

  console.log('\nFile server running on http://localhost:8080/\n');
  for await (const conn of internal.server) internal.handleHttp(conn);

  internal.resolveConnected();
};

fragment.disconnectedCallback = async () => {
  internal.server.close();
};

internal.handleHttp = async (conn: Deno.Conn) => {
  const httpConn = Deno.serveHttp(conn);
  for await (const requestEvent of httpConn) {
    const url = new URL(requestEvent.request.url);
    const uri = decodeURIComponent(url.pathname);

    let status = 200;
    let result = null;

    result = await internal.requestFile({
      urn: path.resolve(internal.option.output, `./${uri}`),
    });

    // + 404-file
    if (!result) {
      status = 404;
      result = await internal.requestFile({
        urn: path.resolve(internal.option.output, `./404.html`),
      });
    }

    // + 404
    if (!result) {
      const notFoundResponse = new Response('404 Not Found', { status: 404 });
      await requestEvent.respondWith(notFoundResponse);

      return;
    }

    // + 203
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
      return await internal.requestFile({ urn: path.resolve(urn, './index.html') });
    }

    result.file = await Deno.open(urn, { read: true });
    result.type = mime.getType(urn);

    return result;
  } catch {
    return null;
  }
};

export default { ...fragment };
