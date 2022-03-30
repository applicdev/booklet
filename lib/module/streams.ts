import * as path from 'https://deno.land/std@0.132.0/path/mod.ts';
import { readableStreamFromReader } from 'https://deno.land/std@0.132.0/streams/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.whenConnected = (): Promise<void> => internal.connect;
internal.connect = new Promise((res) => (internal.resolveConnected = res));

fragment.connectedCallback = async ({ output }: any): Promise<void> => {
  internal.option = { output };
  internal.server = Deno.listen({ port: 8080 });

  console.log('File server running on http://localhost:8080/');
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

    let status = 203;
    let file = null;

    file = await internal.requestFile({ urn: path.resolve(internal.option.output, `./${uri}`) });

    // 404-file
    if (!file) {
      status = 404;
      file = await internal.requestFile({ urn: path.resolve(internal.option.output, `./404.html`) });
    }

    // 404
    if (!file) {
      status = 404;
      const notFoundResponse = new Response('404 Not Found', { status });
      await requestEvent.respondWith(notFoundResponse);
      return;
    }

    // 203
    const readableStream = readableStreamFromReader(file);
    const response = new Response(readableStream, { status: status || 404 });
    await requestEvent.respondWith(response);
  }
};

internal.requestFile = async ({ urn }: { urn: string }) => {
  try {
    let stat = await Deno.stat(urn);
    let file = null;

    if (stat.isDirectory) {
      file = await internal.requestFile({ urn: path.resolve(urn, './index.html') });
    } else {
      file = await Deno.open(urn, { read: true });
    }

    return file;
  } catch {
    return null;
  }
};

export default { ...fragment };
