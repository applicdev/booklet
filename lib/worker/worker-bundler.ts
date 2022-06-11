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
  const img = { urn: snippet.path.resolve(option.hosted.urn, './images/') };

  await snippet.file.copy(snippet.path.resolve(fil.urn, '../assets/'), ass.urn);
  await snippet.file.copy(snippet.path.resolve(fil.urn, '../images/'), img.urn);

  // ? create previews and print pages
  const pri = { urn: snippet.path.resolve(option.hosted.urn, './output/') };
  const pre = { urn: snippet.path.resolve(option.hosted.urn, './output/') };

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
      start_url: `${option.hosted!.path}overview`,
      display: 'fullscreen',
      display_override: ['fullscreen', 'window-controls-overlay'],
      background_color: '#f8f8fa',
      theme_color: '#f8f8fa',
      icons: [
        ...[144].map((size) => ({
          src: `${option.hosted!.path}images/${size}w/booklet.png`,
          sizes: `${size}x${size}`,
          type: 'image/png',
        })),
        ...[72, 96, 128, 144, 152, 192, 384, 512].map((size) => ({
          src: `${option.hosted!.path}images/${size}w/booklet-maskable.png`,
          sizes: `${size}x${size}`,
          type: 'image/png',
          purpose: 'maskable',
        })),
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
    <link rel="manifest" href="${option.hosted!.path}booklet.webmanifest" />
    <!---->

    <!---->
    <link href="${option.hosted!.path}/images/192w/booklet.png" rel="icon" />
    <link href="${option.hosted!.path}assets/stylesheets/all.css" rel="stylesheet" />
    <!---->

    <!---->
    <script>
      if ('serviceWorker' in navigator) navigator.serviceWorker.register('${option.hosted!.path}booklet.service-worker.js');
    </script>
    <!---->
  </head>
  <body>
    <nav>
      <div>
        <!---->
        <a class="button" href="${option.hosted!.path}" target="_self">
          <span class="button-icon"> ${internal.debugRenderIcon({ name: 'booklet' })} </span>
        </a>

        <button class="button">
          <span class="button-icon"> ${internal.debugRenderIcon({ name: 'booklet:ankers' })} </span>
        </button>

        <button class="button" disabled>
          <span class="button-icon"> ${internal.debugRenderIcon({ name: 'booklet:search' })} </span>
        </button>
        <!---->
      </div>
      <div></div>
    </nav>

    <main>
      <!---->
      <header>
        <div></div>
        <div>
          <!---->
          <button class="button" disabled>
            <span class="button-text">Slideshow</span>
            <span class="button-icon"> ${internal.debugRenderIcon({ name: 'mardown:slides' })} </span>
          </button>

          <a class="button" href="${option.hosted!.path}output/booklet-starter-md-overview.pdf" target="_blank">
            <span class="button-text">Print</span>
            <span class="button-icon"> ${internal.debugRenderIcon({ name: 'mardown:prints' })} </span>
          </a>
          <!---->
        </div>
      </header>
      <!---->

      <!---->
      <section></section>
      <section></section>
      <section></section>
      <!---->
    </main>
  </body>
</html>
`;
};

internal.debugRenderIcon = ({ name }: { name: string }): string => {
  return `
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      stroke-width="2" 
      stroke="currentColor" 
      fill="none" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      ${
        {
          booklet: `
            <path class="st0" d="M20.1,16.2h-3.4c-1,0-1.8-0.8-1.8-1.8v-0.2c0-1,0.8-1.8,1.8-1.8h3.4c0.6,0,1,0.5,1,1v1.7
              C21.1,15.8,20.7,16.2,20.1,16.2z"/>
            <path class="st0" d="M18.8,7.7H6c-1.1,0-2-0.9-2-2V5.5c0-1.1,0.9-2.1,2.1-2.1h11.6c0.6,0,1.2,0.5,1.2,1.2V7.7z"/>
            <path class="st0" d="M20,16.2v3.2c0,0.7-0.5,1.2-1.2,1.2H6c-1.1,0-2-0.9-2-2l0-13"/>
            <path class="st0" d="M18.8,7.7c0.6,0,1.2,0.5,1.2,1.2v3.7"/>
          `,
          'booklet:ankers': `
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <circle cx="6" cy="19" r="2"></circle>
            <circle cx="18" cy="5" r="2"></circle>
            <path d="M12 19h4.5a3.5 3.5 0 0 0 0 -7h-8a3.5 3.5 0 0 1 0 -7h3.5"></path>
          `,
          'booklet:search': `
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <circle cx="10" cy="10" r="7"></circle>
            <line x1="21" y1="21" x2="15" y2="15"></line>
          `,
          'mardown:slides': `
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
          `,
          'mardown:prints': `
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2"></path>
            <path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4"></path>
            <rect x="7" y="13" width="10" height="8" rx="2"></rect>
          `,
        }[name]
      }
    </svg>
  `;
};
// ---
