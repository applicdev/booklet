import { defined } from './defined/index.ts';
import { snippet } from './snippet/index.ts';

// ---
// FIXME: move these to <snippet>
import { serve } from 'https://deno.land/std@0.130.0/http/server.ts';
import { urlParse } from 'https://deno.land/x/url_parse@1.1.0/mod.ts';
import { mime } from 'https://deno.land/x/mimetypes@v1.0.0/mod.ts';
// ---

export async function* streams({ output, hosted }: defined['streams:option']): AsyncGenerator<
  { [prop: string]: any }, //
  void,
  void
> {
  const handler = async (req: Request): Promise<Response> => {
    const loc = urlParse(req.url);
    return requestStatic({ output, hosted, req, loc });
  };

  snippet.print.info(`
HTTP webserver running. Access it at –

  ${snippet.print.bold(`http://localhost:8080${hosted!.path}`)}
`);

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
