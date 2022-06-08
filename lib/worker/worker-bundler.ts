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
  snippet.print.area('Initialize');
  await fragment.initialize({ bundle, option });
  yield { bundle, option };

  // ?
  snippet.print.area('Order');
  await fragment.order({ bundle, option });
  yield { bundle, option };

  // ?
  snippet.print.area('Preps');
  await fragment.preps({ bundle, option });
  yield { bundle, option };

  // ?
  snippet.print.area('Tasks');
  await fragment.tasks({ bundle, option });
  yield { bundle, option };

  // ---
  await fragment.debug({ bundle, option });
  // ---

  // ?
  snippet.print.area('Finalize');
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

  for await (const fil of bundles.order.traverse({ bundle, option })) {
    console.log(fil);
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
    await bundles.finalize.preview({ page: dis.page, urn: snippet.path.resolve(pre.urn, `./${dis.hash}.png`) });
    await bundles.finalize.printed({ page: dis.page, urn: snippet.path.resolve(pri.urn, `./${dis.hash}.pdf`) });
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
      background_color: '#f2f2f2',
      theme_color: '#f2f2f2',
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
    <meta content="#f0f0f2" name="theme-color" />
    <meta content="#f0f0f2" name="theme-color" media="(prefers-color-scheme: light)" />
    <meta content="#171b22" name="theme-color" media="(prefers-color-scheme: dark)" />
    <!---->

    <!---->
    <link rel="manifest" href="${option.hosted!.path}booklet.webmanifest" crossorigin="use-credentials" />
    <link href="https://applic.dev/booklet/assets/fonts/BreezeSans.css" rel="stylesheet" />
    <!---->

    <!---->
    <script>
      if ('serviceWorker' in navigator) navigator.serviceWorker.register('${option.hosted!.path}booklet.service-worker.js');
    </script>
    <!---->

    <style>
      /* */

      html {
        font-size: 16px;

        --a4-wid: 52.5rem; /* 840px -> 40px/cm */
        --a4-hei: calc(52.5rem * (29.69 / 21));
        --a4-mar:  4.375rem 4.375rem;
      }

      /* */

      body,
      body * {
        all: unset;
        box-sizing: border-box;
      }

      body style,
      body script {
        display: none;
      }

      /* */

      body {
        background: #f0f0f2;

        overflow: hidden scroll;
        overflow: hidden overlay;

        -ms-overflow-style: none;
        scrollbar-width: none;
      }

      ::-webkit-scrollbar {
        display: none;
      }

      ::selection {
        color: #ffffff;
        background: #191919;
        text-decoration: none;
      }

      /* */

      main {
        display: grid;
        justify-content: center;

        grid-auto-flow: row;
        gap: 1.25rem;
        padding: 1.25rem;
 
        margin: 3.125rem 0rem;
      }

      /*main {
        width: calc(100vw - 20rem);
        margin-left: 20rem;
      }*/

      /* */

      nav {
        position: fixed;
        inset: 0rem aut 0rem 0rem;

        width: 20rem;
        background: green;
      }

      header {
        z-index: -1;

        position: fixed;
        inset: 0rem 0rem auto 0rem;

        display: flex;
        flex-direction: row;
        align-items: center;

        height: 3.125rem;
        padding: 0rem 2.5rem;
      }

      header::after {
        content: '';

        position: fixed;
        inset: 0rem 0rem auto 0rem;

        height: 0.625rem;

        -webkit-app-region: drag;
        app-region: drag;
      }

      /* */

      section {
        display: grid;
        grid-auto-rows: minmax(min-content, max-content);

        width: var(--a4-wid);
        height: var(--a4-hei);

        background: #fcfcfc;
        border-radius: 0.125rem;
        outline: 1px solid #e9e9e9;

        padding: var(--a4-mar);

        box-shadow: 0 1px 0 0.5px rgb(22 29 37 / 5%);
      }

      /* */

      @page {
        margin: 0rem 0rem;
      }
      
      @media print {
        html {
          font-size: calc(1cm / 40 * 16);
        }

        body, 
        body > main {
          padding: 0rem 0rem;
        }

        body, 
        body > main,
        body > main > section {
          margin: 0rem 0rem;
          
          background: white;
          border-radius: none;
          outline: none;
          box-shadow: none;
        }

        main {
          gap: 0rem;
          width: var(--a4-wid);
        }
      }

 

    </style>
    <style>
      /* */

      .type {
        font-family: 'Breeze Sans';
        font-variant-numeric: proportional-nums;

        line-height: 1em;

        margin: -0.22ex -0.15ch;
      }

      .type.anker {
        font-size: 0.825rem;
        color: #585b63;

        height: 1.25rem;
        margin-bottom:  1.25rem;

        cursor: pointer;
      }
      
      .type.watermark {
        font-size: 1.875rem;
        color: #252525;

        height: 2.5rem;
      }
    </style>
  </head>
  <body>
    <header></header>

    <nav>
    </nav>

    <main>
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
