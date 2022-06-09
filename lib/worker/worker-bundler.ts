import { default as snippet } from './snippet/index.ts';
import { default as bundles } from './bundles/index.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

export async function* bundler(option: InterfaceOption): AsyncGenerator<
  { [prop: string]: any }, //
  void,
  void
> {
  const bundle: any = { locate: {}, orderd: {}, tasked: {} };

  // ?
  await fragment.initialize({ bundle, option });
  yield { bundle, option };

  // ?
  await fragment.order({ bundle, option });
  yield { bundle, option };

  // ?
  await fragment.preps({ bundle, option });
  yield { bundle, option };

  // ?
  await fragment.tasks({ bundle, option });
  yield { bundle, option };

  // ---
  await fragment.debug({ bundle, option });
  // ---

  // ?
  await fragment.finalize({ bundle, option });
  yield { bundle, option };
}

fragment.initialize = async ({ bundle, option }: any): Promise<any> => {
  const { hosted, output } = option;

  // ? empty and ensure output directory
  await snippet.file.emptyDir(hosted.urn);
  await snippet.file.emptyDir(output.urn);
};

fragment.order = async ({ bundle, option }: any): Promise<any> => {
  const { hosted, output } = option;

  for await (const node of bundles.order.traverse({ bundle, option })) {
    bundles.order.manage({ bundle, option }, { node });
    // [...]
  }
};

fragment.preps = async ({ bundle, option }: any): Promise<any> => {
  const { hosted, output } = option;

  // [...]
};

fragment.tasks = async ({ bundle, option }: any): Promise<any> => {
  const { hosted, output } = option;

  // [...]
};

fragment.finalize = async ({ bundle, option }: any): Promise<any> => {
  const { hosted, output } = option;

  // ? ensure static files
  const fil = { urn: snippet.path.dirname(snippet.path.fromFileUrl(import.meta.url)) };
  const ass = { urn: snippet.path.resolve(option.hosted.urn, './assets/') };

  await snippet.file.copy(snippet.path.resolve(fil.urn, '../assets/'), ass.urn);

  // ? create previews and print pages
  const pri = { urn: snippet.path.resolve(option.hosted.urn, './~/printed/') };
  const pre = { urn: snippet.path.resolve(option.hosted.urn, './~/preview/') };

  snippet.file.emptyDir(pri.urn);
  snippet.file.emptyDir(pre.urn);

  for await (const dis of bundles.finalize.display({ bundle, option })) {
    await bundles.finalize.preview({ bundle, option }, { page: dis.page, urn: snippet.path.resolve(pre.urn, `./${dis.hash}.png`) });
    await bundles.finalize.printed({ bundle, option }, { page: dis.page, urn: snippet.path.resolve(pri.urn, `./${dis.hash}.pdf`) });
  }

  // ? create github configs
  const noj = { urn: './.nojekyll', plain: '' };
  const rea = { urn: './README.md', plain: 'This branch is automated with [GitHub Actions](https://github.com/features/actions). Its content should not be manually edited.' };

  await Promise.all([
    snippet.file.writeTextFile(snippet.path.resolve(hosted.urn, noj.urn), noj.plain), //
    snippet.file.writeTextFile(snippet.path.resolve(hosted.urn, rea.urn), rea.plain),
  ]);
};

// ---
fragment.debug = async ({ bundle, option }: any): Promise<any> => {
  const plain = await internal.debugRender({ bundle, option });
  const out = { urn: snippet.path.resolve(option.hosted!.urn, `./overview/index.html`) };
  const man = { urn: snippet.path.resolve(option.hosted!.urn, `./booklet.webmanifest`) };
  const ser = { urn: snippet.path.resolve(option.hosted!.urn, `./booklet.service-worker.js`) };

  await snippet.file.emptyDir(snippet.path.dirname(out.urn));
  await snippet.file.writeTextFile(out.urn, plain);
  await snippet.file.writeTextFile(ser.urn, `self.addEventListener('fetch', () => {});`);
  await snippet.file.writeTextFile(
    man.urn,
    JSON.stringify({
      name: 'Booklet',
      short_name: 'Booklet',
      start_url: `${option.hosted!.path}`,
      display: 'standalone',
      display_override: ['window-controls-overlay'],
      background_color: '#f8f8fa',
      theme_color: '#f8f8fa',
      icons: [
        {
          src: 'https://applic.dev/booklet/assets/firgure/192w/booklet-icon.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'https://applic.dev/booklet/assets/firgure/512w/booklet-icon.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    })
  );
};

internal.debugRender = async ({ bundle, option }: any): Promise<string> => {
  return `
<html lang="en-NL">
  <head>
    <meta charset="UTF-8" />
    <meta content="noarchive, notranslate, noindex" name="robots" />
    <meta content="width=device-width, initial-scale=1, user-scalable=no" name="viewport" />

    <!---->
    <title>Debugging-Document</title>
    <!---->

    <!---->
    <meta content="#f8f8fa" name="theme-color" />
    <meta content="#f8f8fa" name="theme-color" media="(prefers-color-scheme: light)" />
    <meta content="#171b22" name="theme-color" media="(prefers-color-scheme: dark)" />
    <!---->

    <!---->
    <link rel="manifest" href="${option.hosted!.path}booklet.webmanifest" crossorigin="use-credentials" />
    <!---->
    
    <!---->
    <script>
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('${option.hosted!.path}booklet.service-worker.js');
    </script>
    <!---->
    
    <!---->
    <link href="${option.hosted!.path}assets/pattern.css" rel="stylesheet" />
    <link href="${option.hosted!.path}assets/pattern-types.css" rel="stylesheet" />
    <link href="${option.hosted!.path}assets/fonts/BreezeSans.css" rel="stylesheet" />
    <!---->
  </head>
  <body>
    

    <nav>
      <!---->
      <div>
        <button>
          <span class="button-icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </span>
        </button>

        <button>
          <span class="button-icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
            </svg>
          </span>
        </button>

        <button disabled onclick="window.print();">
          <span class="button-icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </span>
        </button>
      </div>
      <!---->
      
      <!---->
      <div>
        <span></span>
      </div>
      <!---->
    </nav>

    <main>
      <header>
        <!---->
        <div> 
        </div>
        <!---->
          
        <!---->
        <div>
          <button disabled>
            <span class="button-text">Presentation</span>
            <span class="button-icon">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
              </svg>
            </span>
          </button>

          <button>
            <span class="button-text">Print</span>
            <span class="button-icon">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </span>
          </button>
        </div>
        <!---->
      </header>
      
      <section>
        <a id="000" href="#000" class="type anker">000</a>
        <h1 class="type watermark">Booklet</h1>
      </section>
      <section></section>
      <section></section>
    </main>
  </body>
</html>
`;
};
// ---
