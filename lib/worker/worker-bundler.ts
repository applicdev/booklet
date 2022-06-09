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
