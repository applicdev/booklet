import { serve } from 'https://deno.land/std@0.130.0/http/server.ts';
import { urlParse } from 'https://deno.land/x/url_parse@1.1.0/mod.ts';
import { mime } from 'https://deno.land/x/mimetypes@v1.0.0/mod.ts';

import '../worker/typeset/typeset-interface.ts';
import '../worker/typeset/typeset-workflows.ts';

import { default as snippet } from './snippet/index.ts';

// import { readableStreamFromReader } from 'https://deno.land/std@0.134.0/streams/mod.ts';

export async function* streams({ output, hosted }: InterfaceOption): AsyncGenerator<
  { [prop: string]: any }, //
  void,
  void
> {
  const handler = async (req: Request): Promise<Response> => {
    const loc = urlParse(req.url);
    return requestStatic({ output, hosted, req, loc });
  };

  console.log(`HTTP webserver running. Access it at: http://localhost:8080${hosted!.path}`);
  serve(handler, { port: 8080 });
}

async function requestStatic({ output, hosted, req, loc }: { [prop: string]: any }) {
  let loa: Uint8Array | null = null;
  let typ = null;

  let pat = `/${loc.pathname}`.replace(hosted!.path, '');
  let fil: string[] = [
    snippet.path.resolve(hosted!.urn, `.${pat}`),
    snippet.path.resolve(hosted!.urn, `.${pat}/index.html`),
    snippet.path.resolve(hosted!.urn, `.${pat}index.html`),
    snippet.path.resolve(hosted!.urn, `./404.html`),
  ];

  for (const key in fil) {
    try {
      const file = await Deno.readFile(fil[key]);
      // const type = await Deno.stat(fil[key]);
      loa = file;
      typ = mime.getType(fil[key]);

      break;
    } catch (err) {}
  }

  return loa && typ
    ? new Response(loa, { headers: { 'content-type': typ }, status: 200 }) //
    : new Response(loa, { status: 404 });
}

// export async function* streams({ output, hosted }: InterfaceOption): AsyncGenerator<
//   { [prop: string]: any }, //
//   void,
//   void
// > {
//   // snippet.print.info(`Server active on http://localhost:8080${hosted!.path}`);

//   for await (const con of Deno.listen({ port: 8080 })) {
//     await handleHttp({ output, hosted }, con).catch((err: Error) => console.error(err));
//     yield {};
//   }
// }
//
// async function handleHttp({ output, hosted }: InterfaceOption, con: Deno.Conn) {
//   for await (const requestEvent of Deno.serveHttp(con)) {
//     try {
//       const url = new URL(requestEvent.request.url);
//       const uri = decodeURIComponent(url.pathname);

//       let status = 200;
//       let result = null;

//       if (uri.startsWith(hosted!.path)) {
//         result = await requestFile({
//           urn: snippet.path.resolve(hosted!.urn, `./${uri.slice(hosted!.path.length)}`),
//         });
//       }

//       // ? 404-file
//       if (!result) {
//         status = 404;
//         result = await requestFile({
//           urn: snippet.path.resolve(hosted!.urn, `./404.html`),
//         });
//       }

//       // ? 404
//       if (!result) {
//         const notFoundResponse = new Response('404 Not Found', { status: 404 });
//         await requestEvent.respondWith(notFoundResponse);

//         return;
//       }

//       // ? 200
//       const readableStream = readableStreamFromReader(result.file);
//       const response = new Response(readableStream, {
//         status,
//         headers: result.type ? { 'content-type': result.type } : {},
//       });

//       await requestEvent.respondWith(response);
//     } catch (err) {
//       const notFoundResponse = new Response('500 Internal Server Error', { status: 500 });
//       await requestEvent.respondWith(notFoundResponse);
//     }
//   }
// }

// async function requestFile({ urn }: { urn: string }): Promise<null | any> {
//   const result: { file?: Deno.FsFile; type?: string } = {};

//   try {
//     if ((await Deno.stat(urn)).isDirectory) {
//       return await requestFile({
//         urn: snippet.path.resolve(urn, './index.html'),
//       });
//     }

//     result.file = await Deno.open(urn, { read: true });
//     result.type = snippet.mime.getType(urn);

//     return result;
//   } catch (err) {
//     return null;
//   }
// }
